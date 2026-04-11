CREATE TABLE "story_purchases" (
        "id" text PRIMARY KEY NOT NULL,
        "user_id" text NOT NULL,
        "story_id" text NOT NULL,
        "amount_paise" integer NOT NULL,
        "razorpay_order_id" text,
        "razorpay_payment_id" text,
        "status" text DEFAULT 'pending' NOT NULL,
        "created_at" timestamp with time zone DEFAULT now() NOT NULL,
        "updated_at" timestamp with time zone DEFAULT now() NOT NULL
);