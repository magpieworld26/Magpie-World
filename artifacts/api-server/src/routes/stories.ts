import { Router, type IRouter } from "express";
import { storiesData, getStoryById } from "../lib/stories-data";
import { ListStoriesResponse, GetStoryResponse } from "@workspace/api-zod";

const router: IRouter = Router();

router.get("/stories", async (_req, res): Promise<void> => {
  res.json(ListStoriesResponse.parse({ stories: storiesData }));
});

router.get("/stories/:storyId", async (req, res): Promise<void> => {
  const { storyId } = req.params;
  const id = Array.isArray(storyId) ? storyId[0] : storyId;
  const story = getStoryById(id);

  if (!story) {
    res.status(404).json({ message: "Story not found" });
    return;
  }

  res.json(GetStoryResponse.parse(story));
});

export default router;
