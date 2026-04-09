import { pgTable, text, timestamp, integer } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod/v4";

export const storySessionsTable = pgTable("story_sessions", {
  id: text("id").primaryKey(),
  storyId: text("story_id").notNull(),
  userId: text("user_id").notNull(),
  status: text("status").notNull().default("active"),
  currentNodeId: text("current_node_id"),
  nodeCount: integer("node_count").notNull().default(0),
  totalWordCount: integer("total_word_count").notNull().default(0),
  storyHealthScore: integer("story_health_score").notNull().default(0),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
  updatedAt: timestamp("updated_at", { withTimezone: true }).notNull().defaultNow().$onUpdate(() => new Date()),
});

export const storyNodesTable = pgTable("story_nodes", {
  id: text("id").primaryKey(),
  sessionId: text("session_id").notNull(),
  parentNodeId: text("parent_node_id"),
  choiceMade: text("choice_made"),
  narrativeText: text("narrative_text").notNull(),
  choicesJson: text("choices_json").notNull().default("[]"),
  nodeIndex: integer("node_index").notNull().default(0),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
});

export const insertStorySessionSchema = createInsertSchema(storySessionsTable).omit({ createdAt: true, updatedAt: true });
export const insertStoryNodeSchema = createInsertSchema(storyNodesTable).omit({ createdAt: true });
export type InsertStorySession = z.infer<typeof insertStorySessionSchema>;
export type InsertStoryNode = z.infer<typeof insertStoryNodeSchema>;
export type StorySession = typeof storySessionsTable.$inferSelect;
export type StoryNode = typeof storyNodesTable.$inferSelect;
