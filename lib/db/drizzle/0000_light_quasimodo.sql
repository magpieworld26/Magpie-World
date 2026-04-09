CREATE TABLE "magpie_users" (
	"id" text PRIMARY KEY NOT NULL,
	"email" text NOT NULL,
	"display_name" text NOT NULL,
	"avatar_url" text,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "magpie_users_email_unique" UNIQUE("email")
);
--> statement-breakpoint
CREATE TABLE "story_nodes" (
	"id" text PRIMARY KEY NOT NULL,
	"session_id" text NOT NULL,
	"parent_node_id" text,
	"choice_made" text,
	"narrative_text" text NOT NULL,
	"choices_json" text DEFAULT '[]' NOT NULL,
	"node_index" integer DEFAULT 0 NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "story_sessions" (
	"id" text PRIMARY KEY NOT NULL,
	"story_id" text NOT NULL,
	"user_id" text NOT NULL,
	"status" text DEFAULT 'active' NOT NULL,
	"current_node_id" text,
	"node_count" integer DEFAULT 0 NOT NULL,
	"total_word_count" integer DEFAULT 0 NOT NULL,
	"story_health_score" integer DEFAULT 0 NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "premium_memberships" (
	"id" text PRIMARY KEY NOT NULL,
	"user_id" text NOT NULL,
	"plan" text NOT NULL,
	"started_at" timestamp with time zone DEFAULT now() NOT NULL,
	"expires_at" timestamp with time zone NOT NULL,
	"razorpay_order_id" text,
	"razorpay_payment_id" text,
	"status" text DEFAULT 'active' NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "premium_pending_orders" (
	"id" text PRIMARY KEY NOT NULL,
	"user_id" text NOT NULL,
	"plan" text NOT NULL,
	"amount_paise" integer NOT NULL,
	"razorpay_order_id" text NOT NULL,
	"status" text DEFAULT 'pending' NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "premium_pending_orders_razorpay_order_id_unique" UNIQUE("razorpay_order_id")
);
