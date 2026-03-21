import { Router, type IRouter } from "express";
import { db, usersTable } from "@workspace/db";
import { eq } from "drizzle-orm";
import { type AuthenticatedRequest, requireAuth } from "../lib/auth-middleware";
import { GetProfileResponse, UpdateProfileBody, UpdateProfileResponse } from "@workspace/api-zod";

const router: IRouter = Router();

router.get("/auth/profile", requireAuth, async (req: AuthenticatedRequest, res): Promise<void> => {
  const userId = req.userId!;

  let [user] = await db.select().from(usersTable).where(eq(usersTable.id, userId));

  if (!user) {
    const email = req.userEmail || `user-${userId}@magpie.app`;
    const displayName = email.split("@")[0];
    [user] = await db
      .insert(usersTable)
      .values({ id: userId, email, displayName })
      .returning();
  }

  res.json(GetProfileResponse.parse({
    id: user.id,
    email: user.email,
    displayName: user.displayName,
    avatarUrl: user.avatarUrl,
    createdAt: user.createdAt
  }));
});

router.put("/auth/profile", requireAuth, async (req: AuthenticatedRequest, res): Promise<void> => {
  const userId = req.userId!;
  const parsed = UpdateProfileBody.safeParse(req.body);

  if (!parsed.success) {
    res.status(400).json({ message: "Invalid request body" });
    return;
  }

  const [user] = await db
    .update(usersTable)
    .set({
      ...(parsed.data.displayName && { displayName: parsed.data.displayName }),
      ...(parsed.data.avatarUrl !== undefined && { avatarUrl: parsed.data.avatarUrl }),
    })
    .where(eq(usersTable.id, userId))
    .returning();

  if (!user) {
    res.status(404).json({ message: "User not found" });
    return;
  }

  res.json(UpdateProfileResponse.parse({
    id: user.id,
    email: user.email,
    displayName: user.displayName,
    avatarUrl: user.avatarUrl,
    createdAt: user.createdAt
  }));
});

export default router;
