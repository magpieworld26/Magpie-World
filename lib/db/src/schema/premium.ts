import { pgTable, text, timestamp, integer } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod/v4";

export const premiumMembershipsTable = pgTable("premium_memberships", {
  id: text("id").primaryKey(),
  userId: text("user_id").notNull(),
  plan: text("plan").notNull(),
  startedAt: timestamp("started_at", { withTimezone: true }).notNull().defaultNow(),
  expiresAt: timestamp("expires_at", { withTimezone: true }).notNull(),
  razorpayOrderId: text("razorpay_order_id"),
  razorpayPaymentId: text("razorpay_payment_id"),
  status: text("status").notNull().default("active"),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
  updatedAt: timestamp("updated_at", { withTimezone: true }).notNull().defaultNow().$onUpdate(() => new Date()),
});

export const premiumPendingOrdersTable = pgTable("premium_pending_orders", {
  id: text("id").primaryKey(),
  userId: text("user_id").notNull(),
  plan: text("plan").notNull(),
  amountPaise: integer("amount_paise").notNull(),
  razorpayOrderId: text("razorpay_order_id").notNull().unique(),
  status: text("status").notNull().default("pending"),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
});

export const storyPurchasesTable = pgTable("story_purchases", {
  id: text("id").primaryKey(),
  userId: text("user_id").notNull(),
  storyId: text("story_id").notNull(),
  amountPaise: integer("amount_paise").notNull(),
  razorpayOrderId: text("razorpay_order_id"),
  razorpayPaymentId: text("razorpay_payment_id"),
  status: text("status").notNull().default("pending"),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
  updatedAt: timestamp("updated_at", { withTimezone: true }).notNull().defaultNow().$onUpdate(() => new Date()),
});

export const insertPremiumMembershipSchema = createInsertSchema(premiumMembershipsTable).omit({ createdAt: true, updatedAt: true });
export const insertPremiumPendingOrderSchema = createInsertSchema(premiumPendingOrdersTable).omit({ createdAt: true });
export const insertStoryPurchaseSchema = createInsertSchema(storyPurchasesTable).omit({ createdAt: true, updatedAt: true });
export type InsertPremiumMembership = z.infer<typeof insertPremiumMembershipSchema>;
export type InsertPremiumPendingOrder = z.infer<typeof insertPremiumPendingOrderSchema>;
export type InsertStoryPurchase = z.infer<typeof insertStoryPurchaseSchema>;
export type PremiumMembership = typeof premiumMembershipsTable.$inferSelect;
export type PremiumPendingOrder = typeof premiumPendingOrdersTable.$inferSelect;
export type StoryPurchase = typeof storyPurchasesTable.$inferSelect;
