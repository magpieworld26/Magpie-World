import { useEffect, useState } from "react";
import { useParams, useLocation } from "wouter";
import {
  api,
  type Story,
  type StorySession,
  type PremiumStatus,
} from "@/lib/api";
import { getAuthToken } from "@/lib/supabase";
import { useWindowWidth } from "@/hooks/use-mobile";
import { useToast } from "@/hooks/use-toast";

function loadRazorpayScript(): Promise<boolean> {
  return new Promise(resolve => {
    if (window.Razorpay) { resolve(true); return; }
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.onload = () => resolve(true);
    script.onerror = () => resolve(false);
    document.body.appendChild(script);
  });
}

export default function StoryDetailPage() {
  const { storyId } = useParams<{ storyId: string }>();
  const [, setLocation] = useLocation();
  const [story, setStory] = useState<Story | null>(null);
  const [existingSession, setExistingSession] = useState<StorySession | null>(
    null,
  );
  const [premiumStatus, setPremiumStatus] = useState<PremiumStatus | null>(
    null,
  );
  const [loading, setLoading] = useState(true);
  const [starting, setStarting] = useState(false);
  const [buyingStory, setBuyingStory] = useState(false);
  const { isMobile, isTablet } = useWindowWidth();
  const { toast } = useToast();

  useEffect(() => {
    if (!storyId) return;
    getAuthToken().then((token) => {
      Promise.all([
        api.stories.get(storyId),
        token
          ? api.sessions.list().catch(() => ({ sessions: [] }))
          : Promise.resolve({ sessions: [] }),
        token
          ? api.premium.status().catch(() => ({ isPremium: false }))
          : Promise.resolve({ isPremium: false }),
      ])
        .then(([storyData, sessionsData, premiumData]) => {
          setStory(storyData);
          const existing = sessionsData.sessions.find(
            (s: StorySession) => s.storyId === storyId && s.status === "active",
          );
          setExistingSession(existing || null);
          setPremiumStatus(premiumData);
        })
        .catch(() => setLocation("/home"))
        .finally(() => setLoading(false));
    });
  }, [storyId, setLocation]);

  const handleRead = async () => {
    if (!story) return;
    if (existingSession) {
      setLocation(`/read/${existingSession.id}`);
      return;
    }
    setStarting(true);
    try {
      const session = await api.sessions.create(story.id);
      setLocation(`/read/${session.id}`);
    } catch (err) {
      setStarting(false);
    }
  };

  const handleBuyStory = async () => {
    if (!story || !storyId) return;
    const token = await getAuthToken();
    if (!token) { setLocation("/login"); return; }
    setBuyingStory(true);
    try {
      const loaded = await loadRazorpayScript();
      if (!loaded) {
        toast({ title: "Error", description: "Failed to load payment module. Please try again.", variant: "destructive" });
        setBuyingStory(false);
        return;
      }
      const order = await api.premium.buyStory(storyId);
      const options = {
        key: order.keyId,
        amount: order.amount,
        currency: order.currency,
        name: "Magpie",
        description: `Single Story: ${story.title}`,
        order_id: order.orderId,
        handler: async (response: { razorpay_order_id: string; razorpay_payment_id: string; razorpay_signature: string }) => {
          try {
            await api.premium.verifyStoryPurchase({
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature,
            });
            setBuyingStory(false);
            toast({ title: "Story Purchased!", description: "You can now start reading this story." });
            setPremiumStatus(prev => prev ? {
              ...prev,
              purchasedStoryIds: [...(prev.purchasedStoryIds || []), storyId],
            } : prev);
          } catch {
            setBuyingStory(false);
            toast({ title: "Verification Error", description: "Payment received but verification failed. Please contact support.", variant: "destructive" });
          }
        },
        theme: { color: "#00e5c8" },
        modal: { ondismiss: () => setBuyingStory(false) },
      };
      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (err) {
      const message = err instanceof Error ? err.message : "Failed to initiate payment";
      toast({ title: "Error", description: message, variant: "destructive" });
      setBuyingStory(false);
    }
  };

  if (loading) {
    return (
      <div
        style={{
          background: "#060d1f",
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <div
          style={{
            color: "#00e5c8",
            fontFamily: "'Barlow Condensed', sans-serif",
            fontSize: "20px",
            letterSpacing: "2px",
          }}
        >
          LOADING...
        </div>
      </div>
    );
  }

  if (!story) return null;

  const heroPadding = isMobile ? "0 16px 28px" : "0 6vw 40px";
  const contentPadding = isMobile ? "28px 16px 60px" : "40px 6vw 80px";

  return (
    <div style={{ background: "#060d1f", color: "#fff", minHeight: "100vh" }}>
      {/* Back button */}
      <button
        onClick={() => setLocation("/home")}
        style={{
          position: "fixed", top: "24px", left: "24px", zIndex: 100,
          background: "#0c1730",
          border: "1px solid rgba(80, 120, 255, 0.2)",
          color: "#e2e8f0",
          borderRadius: "50%",
          width: "44px", height: "44px",
          display: "flex", alignItems: "center", justifyContent: "center",
          cursor: "pointer",
          boxShadow: "0 0 16px rgba(80, 120, 255, 0.1)",
          transition: "transform 0.2s ease"
        }}
        aria-label="Go back"
      >
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M19 12H5M12 19l-7-7 7-7"/>
        </svg>
      </button>
      {/* Hero Banner */}
      <div
        style={{
          position: "relative",
          height: isMobile ? "45vh" : "60vh",
          minHeight: isMobile ? "260px" : "320px",
          overflow: "hidden",
          display: "flex",
          alignItems: "flex-end",
        }}
      >
        <div
          style={{
            position: "absolute",
            inset: 0,
            background: story.coverGradient,
            ...(story.coverImage
              ? {
                  backgroundImage: `url(${story.coverImage})`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                }
              : {}),
          }}
        />
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "radial-gradient(ellipse at 30% 30%, rgba(255,255,255,0.06) 0%, transparent 60%)",
          }}
        />
        <div
          style={{
            position: "absolute",
            bottom: 0,
            left: 0,
            right: 0,
            height: "70%",
            background: "linear-gradient(to top, #060d1f 0%, transparent 100%)",
          }}
        />

        <div
          style={{
            position: "relative",
            zIndex: 2,
            padding: heroPadding,
            width: "100%",
            maxWidth: "800px",
            boxSizing: "border-box",
          }}
        >
          <div
            style={{
              display: "flex",
              gap: "8px",
              flexWrap: "wrap",
              marginBottom: "10px",
            }}
          >
            {story.tags.map((tag) => (
              <span
                key={tag}
                style={{
                  padding: "3px 10px",
                  border: "1px solid rgba(0,229,200,.4)",
                  borderRadius: "3px",
                  fontSize: "11px",
                  letterSpacing: "1px",
                  color: "#00e5c8",
                  fontFamily: "'Barlow Condensed', sans-serif",
                }}
              >
                {tag}
              </span>
            ))}
          </div>
          <h1
            style={{
              fontFamily: "'Barlow Condensed', sans-serif",
              fontSize: isMobile
                ? "clamp(28px,8vw,46px)"
                : "clamp(40px,6vw,70px)",
              fontWeight: 900,
              lineHeight: 0.95,
              textTransform: "uppercase",
              marginBottom: "12px",
            }}
          >
            {story.title}
          </h1>
          <div
            style={{
              display: "flex",
              gap: "12px",
              alignItems: "center",
              flexWrap: "wrap",
            }}
          >
            <span
              style={{
                padding: "3px 10px",
                border: "1px solid rgba(0,229,200,.3)",
                borderRadius: "3px",
                fontSize: "11px",
                color: "#00e5c8",
                fontFamily: "'Barlow Condensed', sans-serif",
              }}
            >
              {story.genre}
            </span>
          </div>
        </div>
      </div>
      {/* Content */}
      <div style={{ padding: contentPadding, maxWidth: "900px" }}>
        {/* Action buttons */}
        <div
          style={{
            display: "flex",
            gap: "12px",
            marginBottom: "32px",
            flexWrap: "wrap",
          }}
        >
            <>
              <button
                onClick={handleRead}
                disabled={starting}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "10px",
                  background: "#00e5c8",
                  color: "#060d1f",
                  border: "none",
                  padding: isMobile ? "12px 24px" : "14px 32px",
                  borderRadius: "4px",
                  fontFamily: "'Barlow Condensed', sans-serif",
                  fontWeight: 700,
                  fontSize: isMobile ? "14px" : "16px",
                  letterSpacing: "1.5px",
                  textTransform: "uppercase",
                  cursor: starting ? "not-allowed" : "pointer",
                  opacity: starting ? 0.7 : 1,
                  flex: isMobile ? "1" : "unset",
                }}
              >
                ▶{" "}
                {starting
                  ? "Starting..."
                  : existingSession
                    ? "Continue Reading"
                    : "Read Now"}
              </button>
              {existingSession && (
                <button
                  onClick={async () => {
                    setStarting(true);
                    try {
                      const session = await api.sessions.create(story.id);
                      setLocation(`/read/${session.id}`);
                    } catch {
                      setStarting(false);
                    }
                  }}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "10px",
                    background: "rgba(255,255,255,.1)",
                    color: "#fff",
                    border: "1px solid rgba(255,255,255,.2)",
                    padding: isMobile ? "12px 24px" : "14px 32px",
                    borderRadius: "4px",
                    fontFamily: "'Barlow Condensed', sans-serif",
                    fontWeight: 700,
                    fontSize: isMobile ? "14px" : "16px",
                    letterSpacing: "1.5px",
                    textTransform: "uppercase",
                    cursor: "pointer",
                    flex: isMobile ? "1" : "unset",
                  }}
                >
                  + New Story
                </button>
              )}
            </>
        </div>

        {existingSession && (
          <div
            style={{
              padding: "14px 16px",
              background: "rgba(0,229,200,0.08)",
              border: "1px solid rgba(0,229,200,0.3)",
              borderRadius: "8px",
              marginBottom: "28px",
              fontFamily: "'Barlow Condensed', sans-serif",
              fontSize: "14px",
              color: "#00e5c8",
            }}
          >
            📖 You have an active session · Chapter {existingSession.nodeCount}{" "}
            · Click "Continue Reading" to resume
          </div>
        )}

        {/* Description */}
        <div style={{ marginBottom: "36px" }}>
          <h2
            style={{
              fontFamily: "'Barlow Condensed', sans-serif",
              fontSize: "14px",
              letterSpacing: "3px",
              color: "rgba(255,255,255,0.5)",
              textTransform: "uppercase",
              marginBottom: "16px",
            }}
          >
            About This Story
          </h2>
          <p
            style={{
              fontSize: isMobile ? "15px" : "16px",
              lineHeight: 1.8,
              color: "rgba(255,255,255,0.85)",
              fontFamily: "'Barlow', sans-serif",
            }}
          >
            {story.longDescription}
          </p>
        </div>

        {/* Details */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: isMobile
              ? "repeat(2, 1fr)"
              : isTablet
                ? "repeat(2, 1fr)"
                : "repeat(auto-fill, minmax(180px, 1fr))",
            gap: "12px",
            marginBottom: "40px",
          }}
        >
          {[
            { label: "Genre", value: story.genre },
          ].map((item) => (
            <div
              key={item.label}
              style={{
                background: "#0d1b2e",
                border: "1px solid rgba(0,229,200,0.1)",
                borderRadius: "8px",
                padding: "14px",
              }}
            >
              <div
                style={{
                  fontSize: "10px",
                  letterSpacing: "2px",
                  color: "#00e5c8",
                  textTransform: "uppercase",
                  marginBottom: "6px",
                  fontFamily: "'Barlow Condensed', sans-serif",
                }}
              >
                {item.label}
              </div>
              <div
                style={{
                  fontFamily: "'Barlow Condensed', sans-serif",
                  fontSize: "15px",
                  fontWeight: 700,
                }}
              >
                {item.value}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
