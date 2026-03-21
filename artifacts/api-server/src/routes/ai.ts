import { Router, type IRouter } from "express";
import { type AuthenticatedRequest, requireAuth } from "../lib/auth-middleware";
import { generateStorySegment } from "../lib/ai-story";
import { GenerateStorySegmentBody, GenerateStorySegmentResponse } from "@workspace/api-zod";

const router: IRouter = Router();

router.post("/ai/generate", requireAuth, async (req: AuthenticatedRequest, res): Promise<void> => {
  const parsed = GenerateStorySegmentBody.safeParse(req.body);

  if (!parsed.success) {
    res.status(400).json({ message: "Invalid request body" });
    return;
  }

  const { storyTitle, genre, previousContext, choiceMade, nodeIndex } = parsed.data;

  const generated = await generateStorySegment(
    storyTitle,
    genre,
    previousContext,
    choiceMade,
    nodeIndex
  );

  res.json(GenerateStorySegmentResponse.parse(generated));
});

export default router;
