import { Router, type IRouter } from "express";
import crypto from "crypto";
import { createRequire } from "module";
import { db, premiumMembershipsTable, premiumPendingOrdersTable } from "@workspace/db";
import { eq, and, gt, desc } from "drizzle-orm";
import { type AuthenticatedRequest, requireAuth } from "../lib/auth-middleware";

const require = createRequire(import.meta.url);
const Razorpay = require("razorpay");

const router: IRouter = Router();

const PLANS = {
  weekly: { days: 7, amountPaise: 8900 },
  monthly: { days: 30, amountPaise: 29900 },
  yearly: { days: 365, amountPaise: 99900 },
} as const;

type PlanKey = keyof typeof PLANS;

function getRazorpayClient() {
  const keyId = process.env.RAZORPAY_KEY_ID;
  const keySecret = process.env.RAZORPAY_KEY_SECRET;
  if (!keyId || !keySecret) {
    throw new Error("Razorpay credentials not configured");
  }
  return { client: new Razorpay({ key_id: keyId, key_secret: keySecret }), keyId };
}

router.get("/premium/status", requireAuth, async (req: AuthenticatedRequest, res): Promise<void> => {
  const userId = req.userId!;
  const now = new Date();

  const [membership] = await db
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

  if (membership) {
    res.json({ isPremium: true, expiresAt: membership.expiresAt, plan: membership.plan });
  } else {
    res.json({ isPremium: false });
  }
});

router.post("/premium/create-order", requireAuth, async (req: AuthenticatedRequest, res): Promise<void> => {
  const userId = req.userId!;
  const { plan } = req.body as { plan: string };

  if (!plan || !Object.hasOwn(PLANS, plan)) {
    res.status(400).json({ message: "Invalid plan. Must be weekly, monthly, or yearly." });
    return;
  }

  const planKey = plan as PlanKey;
  const planDetails = PLANS[planKey];

  try {
    const { client: razorpay, keyId } = getRazorpayClient();

    const order = await razorpay.orders.create({
      amount: planDetails.amountPaise,
      currency: "INR",
      receipt: `premium-${planKey}-${userId.substring(0, 8)}-${Date.now()}`.substring(0, 40),
      notes: {
        userId,
        plan: planKey,
      },
    });

    const pendingOrderId = `po_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`;
    await db.insert(premiumPendingOrdersTable).values({
      id: pendingOrderId,
      userId,
      plan: planKey,
      amountPaise: planDetails.amountPaise,
      razorpayOrderId: order.id,
      status: "pending",
    });

    res.json({
      orderId: order.id,
      amount: order.amount,
      currency: order.currency,
      keyId,
      plan: planKey,
    });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Failed to create order";
    res.status(500).json({ message });
  }
});

router.post("/premium/verify-payment", requireAuth, async (req: AuthenticatedRequest, res): Promise<void> => {
  const userId = req.userId!;
  const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body as {
    razorpay_order_id: string;
    razorpay_payment_id: string;
    razorpay_signature: string;
  };

  if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature) {
    res.status(400).json({ message: "Missing required payment verification fields" });
    return;
  }

  const [pendingOrder] = await db
    .select()
    .from(premiumPendingOrdersTable)
    .where(
      and(
        eq(premiumPendingOrdersTable.razorpayOrderId, razorpay_order_id),
        eq(premiumPendingOrdersTable.userId, userId),
        eq(premiumPendingOrdersTable.status, "pending")
      )
    )
    .limit(1);

  if (!pendingOrder) {
    res.status(400).json({ message: "Order not found or already processed" });
    return;
  }

  const keySecret = process.env.RAZORPAY_KEY_SECRET;
  if (!keySecret) {
    res.status(500).json({ message: "Payment verification not configured" });
    return;
  }

  const expectedSignature = crypto
    .createHmac("sha256", keySecret)
    .update(`${razorpay_order_id}|${razorpay_payment_id}`)
    .digest("hex");

  if (expectedSignature !== razorpay_signature) {
    res.status(400).json({ message: "Payment signature verification failed" });
    return;
  }

  try {
    const planKey = pendingOrder.plan as PlanKey;
    const planDetails = PLANS[planKey];
    const now = new Date();
    const expiresAt = new Date(now.getTime() + planDetails.days * 24 * 60 * 60 * 1000);
    const membershipId = `mem_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`;

    await db.transaction(async (tx) => {
      const [updated] = await tx
        .update(premiumPendingOrdersTable)
        .set({ status: "completed" })
        .where(
          and(
            eq(premiumPendingOrdersTable.id, pendingOrder.id),
            eq(premiumPendingOrdersTable.status, "pending")
          )
        )
        .returning();

      if (!updated) {
        throw new Error("Order already processed");
      }

      await tx.insert(premiumMembershipsTable).values({
        id: membershipId,
        userId,
        plan: planKey,
        startedAt: now,
        expiresAt,
        razorpayOrderId: razorpay_order_id,
        razorpayPaymentId: razorpay_payment_id,
        status: "active",
      });
    });

    res.json({ success: true, expiresAt, plan: planKey });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Payment verification failed";
    if (message === "Order already processed") {
      res.status(409).json({ message: "Payment already verified for this order" });
    } else {
      res.status(500).json({ message });
    }
  }
});

export default router;
