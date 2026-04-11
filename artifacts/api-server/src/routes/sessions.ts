import { Router, type IRouter } from "express";
import { db, storySessionsTable, storyNodesTable, premiumMembershipsTable, usersTable } from "@workspace/db";
import { eq, and, asc, gt, desc, sql } from "drizzle-orm";
import { randomUUID } from "crypto";
import { type AuthenticatedRequest, requireAuth } from "../lib/auth-middleware";
import { getStoryById, getInitialStoryNode } from "../lib/stories-data";
import { generateStorySegmentStream, healthScoreDelta } from "../lib/ai-story";
import {
  ListSessionsResponse,
  CreateSessionBody,
  GetSessionResponse,
  ContinueSessionBody,
  ContinueSessionResponse,
} from "@workspace/api-zod";

const router: IRouter = Router();

const MAX_STORY_WORDS = 50000;
const FORCE_ENDING_THRESHOLD = 47000;

function parseChoices(choicesJson: string): Array<{ id: string; text: string; consequence?: string; consequenceType?: string }> {
  try {
    return JSON.parse(choicesJson);
  } catch {
    return [];
  }
}

function countWords(text: string): number {
  return text.trim().split(/\s+/).filter(Boolean).length;
}

function buildSessionResponse(session: {
  id: string;
  storyId: string;
  userId: string;
  status: string;
  currentNodeId: string | null;
  nodeCount: number;
  totalWordCount: number;
  storyHealthScore: number;
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

  const FREE_TRIALS_MAX = 2;

  const { storyId } = parsed.data;
  const story = getStoryById(storyId);

  if (!story) {
    res.status(404).json({ message: "Story not found" });
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

  let isFreeTrial = false;
  let freeTrialsUsed = 0;

  const sessionId = randomUUID();
  const nodeId = randomUUID();
  const initialNode = getInitialStoryNode(storyId);
  const initialWordCount = countWords(initialNode.narrativeText);

  let session: typeof storySessionsTable.$inferSelect;

  if (activeMembership) {
    const [inserted] = await db.transaction(async (tx) => {
      const [s] = await tx
        .insert(storySessionsTable)
        .values({
          id: sessionId,
          storyId,
          userId,
          status: "active",
          currentNodeId: nodeId,
          nodeCount: 1,
          totalWordCount: initialWordCount,
          storyHealthScore: 0,
        })
        .returning();
      await tx.insert(storyNodesTable).values({
        id: nodeId,
        sessionId,
        parentNodeId: null,
        choiceMade: null,
        narrativeText: initialNode.narrativeText,
        choicesJson: JSON.stringify(initialNode.choices),
        nodeIndex: 0,
      });
      return [s];
    });
    session = inserted;
  } else {
    const result = await db.transaction(async (tx) => {
      const userEmail = `user-${userId}@magpie.app`;
      await tx
        .insert(usersTable)
        .values({ id: userId, email: userEmail, displayName: userEmail.split("@")[0] })
        .onConflictDoNothing();

      const [updatedUser] = await tx
        .update(usersTable)
        .set({ freeTrialsUsed: sql`${usersTable.freeTrialsUsed} + 1` })
        .where(
          and(
            eq(usersTable.id, userId),
            sql`${usersTable.freeTrialsUsed} < ${FREE_TRIALS_MAX}`
          )
        )
        .returning({ freeTrialsUsed: usersTable.freeTrialsUsed });

      if (!updatedUser) {
        return null;
      }

      const [s] = await tx
        .insert(storySessionsTable)
        .values({
          id: sessionId,
          storyId,
          userId,
          status: "active",
          currentNodeId: nodeId,
          nodeCount: 1,
          totalWordCount: initialWordCount,
          storyHealthScore: 0,
        })
        .returning();

      await tx.insert(storyNodesTable).values({
        id: nodeId,
        sessionId,
        parentNodeId: null,
        choiceMade: null,
        narrativeText: initialNode.narrativeText,
        choicesJson: JSON.stringify(initialNode.choices),
        nodeIndex: 0,
      });

      return { session: s, freeTrialsUsed: updatedUser.freeTrialsUsed };
    });

    if (!result) {
      res.status(403).json({ message: "Premium membership required to start a reading session", code: "PREMIUM_REQUIRED" });
      return;
    }

    session = result.session;
    freeTrialsUsed = result.freeTrialsUsed;
    isFreeTrial = true;
  }

  const sessionWithStory = buildSessionResponse(session);
  res.status(201).json({
    ...sessionWithStory,
    ...(isFreeTrial ? {
      isFreeTrial: true,
      freeTrialsUsed,
      freeTrialsRemaining: Math.max(0, FREE_TRIALS_MAX - freeTrialsUsed),
    } : {}),
  });
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

  if (session.status === "completed") {
    res.status(400).json({ message: "This story session has already concluded" });
    return;
  }

  // Hard cap: if already at or over 50k words, mark completed and reject continuation
  const currentTotalWordCount = session.totalWordCount ?? 0;
  if (currentTotalWordCount >= MAX_STORY_WORDS) {
    await db
      .update(storySessionsTable)
      .set({ status: "completed" })
      .where(eq(storySessionsTable.id, id));
    res.status(400).json({ message: "Story has reached the maximum length and has concluded", code: "STORY_MAX_LENGTH" });
    return;
  }

  const parsed = ContinueSessionBody.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ message: "Invalid request body" });
    return;
  }

  const { choiceId, choiceText } = parsed.data;

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

  // Derive consequenceType server-side from the current node's stored choices
  // This prevents client tampering with health score values
  let serverDerivedConsequenceType: "good" | "neutral" | "bad" | "catastrophic" | undefined;
  if (choiceId !== "free-will" && session.currentNodeId) {
    const currentNode = allNodes.find(n => n.id === session.currentNodeId);
    if (currentNode) {
      const choices = parseChoices(currentNode.choicesJson);
      const matchedChoice = choices.find(c => c.id === choiceId);
      if (matchedChoice?.consequenceType) {
        const ct = matchedChoice.consequenceType;
        if (ct === "good" || ct === "neutral" || ct === "bad" || ct === "catastrophic") {
          serverDerivedConsequenceType = ct;
        }
      }
    }
  }

  const lastFewNodes = allNodes.slice(-4);
  const previousContext = lastFewNodes
    .map(n => `${n.narrativeText}\n[Choice made: ${n.choiceMade || "story began"}]`)
    .join("\n\n---\n\n");

  const newNodeIndex = session.nodeCount;
  const currentHealthScore = session.storyHealthScore ?? 0;

  // Apply health score delta from the chosen consequence type
  const healthDelta = healthScoreDelta(serverDerivedConsequenceType);
  const updatedHealthScore = currentHealthScore + healthDelta;

  let currentStoryState: import("../lib/ai-story.js").StoryState;
  if (session.storyStateJson) {
    try {
      const raw = JSON.parse(session.storyStateJson);
      currentStoryState = {
        turn: typeof raw?.turn === "number" ? raw.turn : newNodeIndex,
        storyHealthScore: updatedHealthScore,
        choicesMade: Array.isArray(raw?.choicesMade) ? raw.choicesMade : [],
        relationshipStates: (raw?.relationshipStates && typeof raw.relationshipStates === "object" && !Array.isArray(raw.relationshipStates)) ? raw.relationshipStates : {},
        worldStateChanges: Array.isArray(raw?.worldStateChanges) ? raw.worldStateChanges : [],
        plantedThreads: Array.isArray(raw?.plantedThreads) ? raw.plantedThreads : [],
        activeTensions: Array.isArray(raw?.activeTensions) ? raw.activeTensions : [],
        narrativeSummary: Array.isArray(raw?.narrativeSummary) ? raw.narrativeSummary : [],
      };
    } catch {
      currentStoryState = {
        turn: newNodeIndex,
        storyHealthScore: updatedHealthScore,
        choicesMade: [],
        relationshipStates: {},
        worldStateChanges: [],
        plantedThreads: [],
        activeTensions: [],
        narrativeSummary: [],
      };
    }
  } else {
    currentStoryState = {
      turn: newNodeIndex,
      storyHealthScore: updatedHealthScore,
      choicesMade: [],
      relationshipStates: {},
      worldStateChanges: [],
      plantedThreads: [],
      activeTensions: [],
      narrativeSummary: [],
    };
  }

  const forceEnding = currentTotalWordCount >= FORCE_ENDING_THRESHOLD;

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
      choiceId,
      choiceText,
      newNodeIndex,
      (chunk) => sendEvent("chunk", { text: chunk }),
      currentStoryState,
      currentTotalWordCount,
      // Pass undefined here: health delta is already applied above (updatedHealthScore).
      // buildGeneratedSegment would double-apply if we passed consequenceType again.
      undefined,
    );

    let narrativeText = generated.narrativeText;
    let newWordCount = countWords(narrativeText);
    const remainingWordBudget = MAX_STORY_WORDS - currentTotalWordCount;

    // Hard cap: truncate narrative to fit within the 50k word limit
    if (newWordCount > remainingWordBudget) {
      const words = narrativeText.trim().split(/\s+/);
      narrativeText = words.slice(0, remainingWordBudget).join(" ");
      newWordCount = remainingWordBudget;
    }

    const updatedTotalWordCount = currentTotalWordCount + newWordCount;

    // Force ending if we've now hit the cap or AI decided to end
    const isEnding = generated.isEnding || forceEnding || updatedTotalWordCount >= MAX_STORY_WORDS;

    const newNodeId = randomUUID();
    const [newNode] = await db
      .insert(storyNodesTable)
      .values({
        id: newNodeId,
        sessionId: id,
        parentNodeId: session.currentNodeId,
        choiceMade: choiceText,
        narrativeText,
        // If forced ending, store empty choices so reader UI shows completion
        choicesJson: isEnding ? JSON.stringify([]) : JSON.stringify(generated.choices),
        nodeIndex: newNodeIndex,
      })
      .returning();

    await db
      .update(storySessionsTable)
      .set({
        currentNodeId: newNodeId,
        nodeCount: newNodeIndex + 1,
        totalWordCount: updatedTotalWordCount,
        storyHealthScore: updatedHealthScore,
        storyStateJson: JSON.stringify(generated.storyState),
        status: isEnding ? "completed" : "active",
      })
      .where(eq(storySessionsTable.id, id));

    sendEvent("done", ContinueSessionResponse.parse({
      id: newNode.id,
      sessionId: newNode.sessionId,
      parentNodeId: newNode.parentNodeId,
      choiceMade: newNode.choiceMade,
      narrativeText: newNode.narrativeText,
      choices: isEnding ? [] : parseChoices(newNode.choicesJson),
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
