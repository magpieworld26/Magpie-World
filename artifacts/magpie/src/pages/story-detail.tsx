import { useEffect, useState } from "react";
import { useParams, useLocation } from "wouter";
import { api, type Story, type StorySession } from "@/lib/api";
import { getAuthToken } from "@/lib/supabase";

export default function StoryDetailPage() {
  const { storyId } = useParams<{ storyId: string }>();
  const [, setLocation] = useLocation();
  const [story, setStory] = useState<Story | null>(null);
  const [existingSession, setExistingSession] = useState<StorySession | null>(null);
  const [loading, setLoading] = useState(true);
  const [starting, setStarting] = useState(false);

  useEffect(() => {
    if (!storyId) return;
    Promise.all([
      api.stories.get(storyId),
      getAuthToken() ? api.sessions.list().catch(() => ({ sessions: [] })) : Promise.resolve({ sessions: [] }),
    ]).then(([storyData, sessionsData]) => {
      setStory(storyData);
      const existing = sessionsData.sessions.find((s: StorySession) => s.storyId === storyId && s.status === "active");
      setExistingSession(existing || null);
    }).catch(() => setLocation("/home")).finally(() => setLoading(false));
  }, [storyId, setLocation]);

  const handleRead = async () => {
    if (!story) return;
    const token = getAuthToken();
    if (!token) {
      setLocation("/login");
      return;
    }
    if (existingSession) {
      setLocation(`/read/${existingSession.id}`);
      return;
    }
    setStarting(true);
    try {
      const session = await api.sessions.create(story.id);
      setLocation(`/read/${session.id}`);
    } catch {
      setStarting(false);
    }
  };

  if (loading) {
    return (
      <div style={{ background: "#060d1f", minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center" }}>
        <div style={{ color: "#00e5c8", fontFamily: "'Barlow Condensed', sans-serif", fontSize: "20px", letterSpacing: "2px" }}>LOADING...</div>
      </div>
    );
  }

  if (!story) return null;

  return (
    <div style={{ background: "#060d1f", color: "#fff", minHeight: "100vh" }}>
      {/* Back button */}
      <button
        onClick={() => setLocation("/home")}
        style={{
          position: "fixed", top: "20px", left: "20px", zIndex: 100,
          background: "rgba(0,0,0,0.6)", border: "1px solid rgba(255,255,255,0.2)",
          color: "#fff", borderRadius: "50%", width: "44px", height: "44px",
          display: "flex", alignItems: "center", justifyContent: "center",
          cursor: "pointer", fontSize: "18px", backdropFilter: "blur(10px)",
        }}
      >←</button>

      {/* Hero Banner */}
      <div style={{
        position: "relative",
        height: "60vh",
        overflow: "hidden",
        display: "flex",
        alignItems: "flex-end",
      }}>
        <div style={{ position: "absolute", inset: 0, background: story.coverGradient }} />
        <div style={{
          position: "absolute", inset: 0,
          background: "radial-gradient(ellipse at 30% 30%, rgba(255,255,255,0.06) 0%, transparent 60%)",
        }} />
        <div style={{
          position: "absolute", bottom: 0, left: 0, right: 0, height: "70%",
          background: "linear-gradient(to top, #060d1f 0%, transparent 100%)",
        }} />

        {/* Title overlay */}
        <div style={{ position: "relative", zIndex: 2, padding: "0 6vw 40px", width: "100%", maxWidth: "800px" }}>
          <div style={{ display: "flex", gap: "10px", flexWrap: "wrap", marginBottom: "12px" }}>
            {story.tags.map(tag => (
              <span key={tag} style={{
                padding: "3px 10px", border: "1px solid rgba(0,229,200,.4)", borderRadius: "3px",
                fontSize: "11px", letterSpacing: "1px", color: "#00e5c8",
                fontFamily: "'Barlow Condensed', sans-serif",
              }}>{tag}</span>
            ))}
          </div>
          <h1 style={{
            fontFamily: "'Barlow Condensed', sans-serif",
            fontSize: "clamp(40px,6vw,70px)",
            fontWeight: 900,
            lineHeight: 0.95,
            textTransform: "uppercase",
            marginBottom: "12px",
          }}>{story.title}</h1>
          <div style={{ display: "flex", gap: "20px", alignItems: "center" }}>
            <span style={{ color: "#00e5c8", fontSize: "14px" }}>{story.rating}</span>
            <span style={{ color: "#b0bec5", fontSize: "13px" }}>{story.chapterCount} Chapters</span>
            <span style={{ color: "#b0bec5", fontSize: "13px" }}>{story.readingTime}</span>
            <span style={{
              padding: "3px 10px", border: "1px solid rgba(0,229,200,.3)", borderRadius: "3px",
              fontSize: "11px", color: "#00e5c8", fontFamily: "'Barlow Condensed', sans-serif",
            }}>{story.genre}</span>
          </div>
        </div>
      </div>

      {/* Content */}
      <div style={{ padding: "40px 6vw 80px", maxWidth: "900px" }}>
        {/* Action buttons */}
        <div style={{ display: "flex", gap: "16px", marginBottom: "40px", flexWrap: "wrap" }}>
          <button
            onClick={handleRead}
            disabled={starting}
            style={{
              display: "flex", alignItems: "center", gap: "10px",
              background: "#00e5c8", color: "#060d1f", border: "none",
              padding: "14px 32px", borderRadius: "4px",
              fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 700, fontSize: "16px", letterSpacing: "1.5px", textTransform: "uppercase",
              cursor: starting ? "not-allowed" : "pointer",
              opacity: starting ? 0.7 : 1,
            }}
          >
            ▶ {starting ? "Starting..." : existingSession ? "Continue Reading" : "Read Now"}
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
                display: "flex", alignItems: "center", gap: "10px",
                background: "rgba(255,255,255,.1)", color: "#fff",
                border: "1px solid rgba(255,255,255,.2)", padding: "14px 32px", borderRadius: "4px",
                fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 700, fontSize: "16px", letterSpacing: "1.5px", textTransform: "uppercase",
                cursor: "pointer",
              }}
            >+ New Story</button>
          )}
        </div>

        {existingSession && (
          <div style={{
            padding: "16px 20px",
            background: "rgba(0,229,200,0.08)",
            border: "1px solid rgba(0,229,200,0.3)",
            borderRadius: "8px",
            marginBottom: "32px",
            fontFamily: "'Barlow Condensed', sans-serif",
            fontSize: "14px",
            color: "#00e5c8",
          }}>
            📖 You have an active session · Chapter {existingSession.nodeCount} · Click "Continue Reading" to resume
          </div>
        )}

        {/* Description */}
        <div style={{ marginBottom: "40px" }}>
          <h2 style={{
            fontFamily: "'Barlow Condensed', sans-serif",
            fontSize: "14px", letterSpacing: "3px", color: "rgba(255,255,255,0.5)",
            textTransform: "uppercase", marginBottom: "16px",
          }}>About This Story</h2>
          <p style={{
            fontSize: "16px", lineHeight: 1.8, color: "rgba(255,255,255,0.85)",
            fontFamily: "'Barlow', sans-serif",
          }}>{story.longDescription}</p>
        </div>

        {/* Details */}
        <div style={{
          display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(180px, 1fr))",
          gap: "16px", marginBottom: "40px",
        }}>
          {[
            { label: "Genre", value: story.genre },
            { label: "Rating", value: story.rating },
            { label: "Chapters", value: `${story.chapterCount} chapters` },
            { label: "Reading Time", value: story.readingTime },
          ].map(item => (
            <div key={item.label} style={{
              background: "#0d1b2e", border: "1px solid rgba(0,229,200,0.1)",
              borderRadius: "8px", padding: "16px",
            }}>
              <div style={{ fontSize: "10px", letterSpacing: "2px", color: "#00e5c8", textTransform: "uppercase", marginBottom: "6px", fontFamily: "'Barlow Condensed', sans-serif" }}>{item.label}</div>
              <div style={{ fontFamily: "'Barlow Condensed', sans-serif", fontSize: "16px", fontWeight: 700 }}>{item.value}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
