import { Router, type IRouter } from "express";
import { db, storySessionsTable, storyNodesTable, premiumMembershipsTable } from "@workspace/db";
import { eq, and, asc, gt, desc } from "drizzle-orm";
import { randomUUID } from "crypto";
import { type AuthenticatedRequest, requireAuth } from "../lib/auth-middleware";
import { getStoryById, getInitialStoryNode } from "../lib/stories-data";
import { generateStorySegmentStream } from "../lib/ai-story";
import {
  ListSessionsResponse,
  CreateSessionBody,
  GetSessionResponse,
  ContinueSessionBody,
  ContinueSessionResponse,
} from "@workspace/api-zod";

const router: IRouter = Router();

function parseChoices(choicesJson: string): Array<{ id: string; text: string; consequence?: string }> {
  try {
    return JSON.parse(choicesJson);
  } catch {
    return [];
  }
}

function buildSessionResponse(session: {
  id: string;
  storyId: string;
  userId: string;
  status: string;
  currentNodeId: string | null;
  nodeCount: number;
  createdAt: Date;
  updatedAt: Date;
}) {
  const story = getStoryById(session.storyId);
  if (!story) return null;
  return {
    ...session,
    story
  };
}

router.get("/sessions", requireAuth, async (req: AuthenticatedRequest, res): Promise<void> => {
  const userId = req.userId!;
  const sessions = await db
    .select()
    .from(storySessionsTable)
    .where(eq(storySessionsTable.userId, userId))
    .orderBy(asc(storySessionsTable.updatedAt));

  const sessionsWithStories = sessions
    .map(buildSessionResponse)
    .filter(Boolean);

  res.json(ListSessionsResponse.parse({ sessions: sessionsWithStories }));
});

router.post("/sessions", requireAuth, async (req: AuthenticatedRequest, res): Promise<void> => {
  const userId = req.userId!;
  const parsed = CreateSessionBody.safeParse(req.body);

  if (!parsed.success) {
    res.status(400).json({ message: "Invalid request body" });
    return;
  }

  const now = new Date();
  const [activeMembership] = await db
    .select()
    .from(premiumMembershipsTable)
    .where(
      and(
        eq(premiumMembershipsTable.userId, userId),
        eq(premiumMembershipsTable.status, "active"),
        gt(premiumMembershipsTable.expiresAt, now)
      )
    )
    .orderBy(desc(premiumMembershipsTable.expiresAt))
    .limit(1);

  if (!activeMembership) {
    res.status(403).json({ message: "Premium membership required to start a reading session", code: "PREMIUM_REQUIRED" });
    return;
  }

  const { storyId } = parsed.data;
  const story = getStoryById(storyId);

  if (!story) {
    res.status(404).json({ message: "Story not found" });
    return;
  }

  const sessionId = randomUUID();
  const nodeId = randomUUID();

  const initialNode = getInitialStoryNode(storyId);

  const [session] = await db
    .insert(storySessionsTable)
    .values({
      id: sessionId,
      storyId,
      userId,
      status: "active",
      currentNodeId: nodeId,
      nodeCount: 1,
    })
    .returning();

  await db.insert(storyNodesTable).values({
    id: nodeId,
    sessionId,
    parentNodeId: null,
    choiceMade: null,
    narrativeText: initialNode.narrativeText,
    choicesJson: JSON.stringify(initialNode.choices),
    nodeIndex: 0,
  });

  const sessionWithStory = buildSessionResponse(session);
  res.status(201).json(sessionWithStory);
});

router.get("/sessions/:sessionId", requireAuth, async (req: AuthenticatedRequest, res): Promise<void> => {
  const userId = req.userId!;
  const { sessionId } = req.params;
  const id = Array.isArray(sessionId) ? sessionId[0] : sessionId;

  const [session] = await db
    .select()
    .from(storySessionsTable)
    .where(and(eq(storySessionsTable.id, id), eq(storySessionsTable.userId, userId)));

  if (!session) {
    res.status(404).json({ message: "Session not found" });
    return;
  }

  const nodes = await db
    .select()
    .from(storyNodesTable)
    .where(eq(storyNodesTable.sessionId, id))
    .orderBy(asc(storyNodesTable.nodeIndex));

  const mappedNodes = nodes.map(n => ({
    ...n,
    choices: parseChoices(n.choicesJson),
  }));

  const currentNode = session.currentNodeId
    ? mappedNodes.find(n => n.id === session.currentNodeId) || null
    : null;

  const sessionWithStory = buildSessionResponse(session);

  if (!sessionWithStory) {
    res.status(410).json({ message: "Story no longer available" });
    return;
  }

  res.json(GetSessionResponse.parse({
    session: sessionWithStory,
    nodes: mappedNodes,
    currentNode,
  }));
});

router.post("/sessions/:sessionId/continue", requireAuth, async (req: AuthenticatedRequest, res): Promise<void> => {
  const userId = req.userId!;
  const { sessionId } = req.params;
  const id = Array.isArray(sessionId) ? sessionId[0] : sessionId;

  const [session] = await db
    .select()
    .from(storySessionsTable)
    .where(and(eq(storySessionsTable.id, id), eq(storySessionsTable.userId, userId)));

  if (!session) {
    res.status(404).json({ message: "Session not found" });
    return;
  }

  const parsed = ContinueSessionBody.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ message: "Invalid request body" });
    return;
  }

  const { choiceText } = parsed.data;

  const story = getStoryById(session.storyId);
  if (!story) {
    res.status(404).json({ message: "Story not found" });
    return;
  }

  const allNodes = await db
    .select()
    .from(storyNodesTable)
    .where(eq(storyNodesTable.sessionId, id))
    .orderBy(asc(storyNodesTable.nodeIndex));

  const lastFewNodes = allNodes.slice(-4);
  const previousContext = lastFewNodes
    .map(n => `${n.narrativeText}\n[Choice made: ${n.choiceMade || "story began"}]`)
    .join("\n\n---\n\n");

  const newNodeIndex = session.nodeCount;

  res.setHeader("Content-Type", "text/event-stream");
  res.setHeader("Cache-Control", "no-cache");
  res.setHeader("Connection", "keep-alive");
  res.flushHeaders();

  const sendEvent = (event: string, data: unknown) => {
    res.write(`event: ${event}\ndata: ${JSON.stringify(data)}\n\n`);
  };

  try {
    const generated = await generateStorySegmentStream(
      story.id,
      story.genre,
      previousContext,
      choiceText,
      newNodeIndex,
      (chunk) => sendEvent("chunk", { text: chunk }),
    );

    const newNodeId = randomUUID();
    const [newNode] = await db
      .insert(storyNodesTable)
      .values({
        id: newNodeId,
        sessionId: id,
        parentNodeId: session.currentNodeId,
        choiceMade: choiceText,
        narrativeText: generated.narrativeText,
        choicesJson: JSON.stringify(generated.choices),
        nodeIndex: newNodeIndex,
      })
      .returning();

    await db
      .update(storySessionsTable)
      .set({
        currentNodeId: newNodeId,
        nodeCount: newNodeIndex + 1,
        status: generated.isEnding ? "completed" : "active",
      })
      .where(eq(storySessionsTable.id, id));

    sendEvent("done", ContinueSessionResponse.parse({
      id: newNode.id,
      sessionId: newNode.sessionId,
      parentNodeId: newNode.parentNodeId,
      choiceMade: newNode.choiceMade,
      narrativeText: newNode.narrativeText,
      choices: parseChoices(newNode.choicesJson),
      nodeIndex: newNode.nodeIndex,
      createdAt: newNode.createdAt,
    }));
  } catch (err) {
    const message = err instanceof Error ? err.message : "Generation failed";
    sendEvent("error", { message });
  } finally {
    res.end();
  }
});

export default router;
