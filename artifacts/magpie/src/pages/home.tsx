import { useEffect, useState } from "react";
import { useLocation } from "wouter";
import Navbar from "@/components/Navbar";
import { api, type Story, type StorySession } from "@/lib/api";
import { getAuthToken } from "@/lib/supabase";

const COVER_CLASSES = [
  "linear-gradient(160deg,#0d2a4a,#050f1e)",
  "linear-gradient(160deg,#1a0d3a,#0a0520)",
  "linear-gradient(160deg,#0d3a2a,#051a12)",
  "linear-gradient(160deg,#3a1a0d,#1a0805)",
  "linear-gradient(160deg,#1a2a0d,#0a1205)",
  "linear-gradient(160deg,#2a0d1a,#140508)",
  "linear-gradient(160deg,#0d1a3a,#050a1a)",
  "linear-gradient(160deg,#1a1a0d,#0a0a05)",
];

function BookCard({ story, onClick }: { story: Story; onClick: () => void }) {
  const [hovered, setHovered] = useState(false);
  return (
    <div
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        flexShrink: 0,
        width: "240px",
        cursor: "pointer",
        transition: "transform 0.25s",
        transform: hovered ? "scale(1.06) translateY(-5px)" : "scale(1)",
        position: "relative",
      }}
    >
      <div style={{
        width: "100%",
        aspectRatio: "16/9",
        borderRadius: "8px",
        overflow: "hidden",
        position: "relative",
        border: "1px solid rgba(255,255,255,0.07)",
        background: story.coverGradient || COVER_CLASSES[0],
      }}>
        <div style={{
          position: "absolute", top: "8px", left: "8px",
          width: "20px", height: "20px", background: "#00e5c8", borderRadius: "3px",
          display: "flex", alignItems: "center", justifyContent: "center",
          fontFamily: "'Barlow Condensed', sans-serif", fontSize: "12px", fontWeight: 900, color: "#060d1f",
          zIndex: 2,
        }}>M</div>
        <div style={{
          position: "absolute", bottom: 0, left: 0, right: 0, zIndex: 2,
          padding: "20px 12px 12px",
          background: "linear-gradient(to top, rgba(0,0,0,0.85) 0%, transparent 100%)",
        }}>
          <div style={{
            fontFamily: "'Barlow Condensed', sans-serif",
            fontSize: "15px", fontWeight: 800,
            lineHeight: 1.1, textTransform: "uppercase",
            textShadow: "0 2px 8px rgba(0,0,0,0.8)",
          }}>{story.title}</div>
          <div style={{ fontSize: "10px", color: "rgba(255,255,255,0.6)", letterSpacing: "1px", marginTop: "3px" }}>{story.genre}</div>
        </div>
        {hovered && (
          <div style={{
            position: "absolute", inset: 0, background: "rgba(0,229,200,0.12)", borderRadius: "8px",
            border: "2px solid #00e5c8", display: "flex", alignItems: "center", justifyContent: "center",
            fontSize: "28px", zIndex: 3,
          }}>▶</div>
        )}
      </div>
    </div>
  );
}

function ContinueCard({ session, onClick }: { session: StorySession; onClick: () => void }) {
  const pct = Math.min(100, Math.round((session.nodeCount / 20) * 100));
  return (
    <div
      onClick={onClick}
      style={{
        flexShrink: 0, width: "280px", background: "#0d1b2e",
        border: "1px solid rgba(0,229,200,0.1)", borderRadius: "8px", overflow: "hidden",
        cursor: "pointer", transition: "transform 0.25s, border-color 0.25s, box-shadow 0.25s", position: "relative",
      }}
      onMouseEnter={e => {
        e.currentTarget.style.transform = "scale(1.04) translateY(-4px)";
        e.currentTarget.style.borderColor = "rgba(0,229,200,0.4)";
        e.currentTarget.style.boxShadow = "0 16px 40px rgba(0,0,0,0.5),0 0 20px rgba(0,229,200,0.1)";
      }}
      onMouseLeave={e => {
        e.currentTarget.style.transform = "";
        e.currentTarget.style.borderColor = "rgba(0,229,200,0.1)";
        e.currentTarget.style.boxShadow = "";
      }}
    >
      <div style={{ width: "100%", aspectRatio: "16/9", position: "relative", overflow: "hidden", background: session.story.coverGradient }}>
        <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: "60%", background: "linear-gradient(to top, #0d1b2e, transparent)" }} />
      </div>
      <div style={{ padding: "14px 16px 16px" }}>
        <div style={{ fontSize: "10px", letterSpacing: "2px", color: "#00e5c8", textTransform: "uppercase", marginBottom: "6px", fontFamily: "'Barlow Condensed', sans-serif" }}>{session.story.genre}</div>
        <div style={{ fontFamily: "'Barlow Condensed', sans-serif", fontSize: "18px", fontWeight: 700, marginBottom: "4px" }}>{session.story.title}</div>
        <div style={{ fontSize: "12px", color: "#b0bec5", marginBottom: "12px" }}>Chapter {session.nodeCount} · {session.status}</div>
        <div style={{ height: "3px", background: "rgba(255,255,255,0.1)", borderRadius: "2px", overflow: "hidden" }}>
          <div style={{ height: "100%", width: `${pct}%`, background: "linear-gradient(to right, #00b8a0, #00e5c8)", borderRadius: "2px" }} />
        </div>
        <div style={{ fontSize: "11px", color: "#b0bec5", marginTop: "6px" }}>{pct}% through</div>
      </div>
    </div>
  );
}

export default function HomePage() {
  const [, setLocation] = useLocation();
  const [stories, setStories] = useState<Story[]>([]);
  const [sessions, setSessions] = useState<StorySession[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const token = getAuthToken();
    if (!token) {
      setLocation("/login");
      return;
    }

    Promise.all([
      api.stories.list(),
      api.sessions.list().catch(() => ({ sessions: [] })),
    ]).then(([storiesData, sessionsData]) => {
      setStories(storiesData.stories);
      setSessions(sessionsData.sessions);
    }).finally(() => setLoading(false));
  }, [setLocation]);

  const q = searchQuery.trim().toLowerCase();
  const filteredStories = q
    ? stories.filter(s =>
        s.title.toLowerCase().includes(q) ||
        s.genre.toLowerCase().includes(q) ||
        (s.description ?? "").toLowerCase().includes(q) ||
        (s.tags ?? []).some((t: string) => t.toLowerCase().includes(q))
      )
    : stories;

  const featured = filteredStories.find(s => s.featured) || filteredStories[0];
  const top10 = filteredStories.filter(s => s.rank !== null && s.rank !== undefined).sort((a, b) => (a.rank ?? 99) - (b.rank ?? 99));
  const newReleases = filteredStories.slice(0, 8);
  const activeSessions = sessions.filter(s => s.status === "active");

  const handleReadStory = async (storyId: string) => {
    const existing = sessions.find(s => s.storyId === storyId && s.status === "active");
    if (existing) {
      setLocation(`/read/${existing.id}`);
    } else {
      setLocation(`/story/${storyId}`);
    }
  };

  if (loading) {
    return (
      <div style={{ background: "#060d1f", minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center" }}>
        <div style={{ color: "#00e5c8", fontFamily: "'Barlow Condensed', sans-serif", fontSize: "20px", letterSpacing: "2px" }}>LOADING...</div>
      </div>
    );
  }

  return (
    <div style={{ background: "#060d1f", color: "#fff", minHeight: "100vh", overflowX: "hidden", paddingTop: "72px" }}>
      <Navbar showSearch variant="home" searchQuery={searchQuery} onSearchChange={setSearchQuery} />

      {/* HERO */}
      {!q && featured && (
        <div style={{ position: "relative", height: "88vh", minHeight: "580px", display: "flex", alignItems: "flex-end", padding: "0 4vw 90px", overflow: "hidden" }}>
          <div style={{
            position: "absolute", inset: 0,
            background: `radial-gradient(ellipse 60% 70% at 70% 40%, rgba(0,229,200,0.07) 0%,transparent 60%), linear-gradient(135deg,#060d1f 0%,#071526 40%,#0a2040 100%)`,
          }} />
          {/* Book art */}
          <div style={{ position: "absolute", right: 0, top: 0, bottom: 0, width: "55%", display: "flex", alignItems: "center", justifyContent: "center", overflow: "hidden" }}>
            <div style={{ position: "relative", width: "480px", height: "600px", transform: "perspective(1000px) rotateY(-12deg) rotateX(3deg)" }}>
              {[3, 2, 1].map(i => (
                <div key={i} style={{
                  position: "absolute",
                  width: "340px", height: "500px",
                  top: `${50 + (3 - i) * 10}px`,
                  left: `${60 + (3 - i) * 10}px`,
                  background: i === 1 ? `linear-gradient(160deg,#071a35 0%,#030e1f 100%)` : `linear-gradient(160deg,#${i === 2 ? "112545" : "142a4a"},#0${i === 2 ? "a1e38" : "d2240"})`,
                  borderRadius: "4px 12px 12px 4px",
                  border: "1px solid rgba(0,229,200,0.15)",
                  boxShadow: i === 1 ? "30px 30px 80px rgba(0,0,0,0.8),inset 0 0 40px rgba(0,229,200,0.03)" : "20px 20px 60px rgba(0,0,0,0.6)",
                  opacity: i === 1 ? 1 : i === 2 ? 0.8 : 0.6,
                  display: i === 1 ? "flex" : undefined,
                  flexDirection: i === 1 ? "column" as const : undefined,
                  alignItems: i === 1 ? "center" : undefined,
                  justifyContent: i === 1 ? "center" : undefined,
                  gap: i === 1 ? "16px" : undefined,
                  padding: i === 1 ? "30px" : undefined,
                  overflow: i === 1 ? "hidden" : undefined,
                }}>
                  {i === 1 && (
                    <>
                      <div style={{ fontFamily: "'Barlow Condensed', sans-serif", fontSize: "11px", letterSpacing: "4px", color: "#00e5c8", textTransform: "uppercase" }}>Featured Story</div>
                      <div style={{ fontFamily: "'Barlow Condensed', sans-serif", fontSize: "42px", fontWeight: 900, lineHeight: 1, textAlign: "center", textTransform: "uppercase" }}>{featured.title}</div>
                      <div style={{ width: "60px", height: "2px", background: "linear-gradient(to right, transparent, #00e5c8, transparent)" }} />
                      <div style={{ fontSize: "12px", color: "rgba(255,255,255,.5)", textAlign: "center", lineHeight: 1.6 }}>{featured.genre}</div>
                    </>
                  )}
                </div>
              ))}
            </div>
          </div>
          {/* Fade overlays */}
          <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to right,#060d1f 25%,transparent 55%,#060d1f 100%)" }} />
          <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top,#060d1f 0%,transparent 30%)" }} />

          {/* Content */}
          <div style={{ position: "relative", zIndex: 2, maxWidth: "500px" }}>
            <div style={{ display: "inline-flex", alignItems: "center", gap: "8px", background: "rgba(0,229,200,.1)", border: "1px solid rgba(0,229,200,.3)", borderRadius: "20px", padding: "5px 14px", fontSize: "11px", letterSpacing: "3px", textTransform: "uppercase", color: "#00e5c8", marginBottom: "16px", fontFamily: "'Barlow Condensed', sans-serif" }}>
              <span style={{ width: "6px", height: "6px", borderRadius: "50%", background: "#00e5c8", animation: "pulse-dot 2s infinite" }} />
              Featured Story
            </div>
            <div style={{ fontFamily: "'Barlow Condensed', sans-serif", fontSize: "12px", letterSpacing: "4px", color: "rgba(255,255,255,.6)", textTransform: "uppercase", marginBottom: "8px" }}>{featured.genre}</div>
            <h1 style={{ fontFamily: "'Barlow Condensed', sans-serif", fontSize: "clamp(52px,7vw,82px)", fontWeight: 900, lineHeight: 0.92, textTransform: "uppercase", marginBottom: "20px" }}>
              {featured.title.split(" ").map((word, i) => (
                <span key={i} style={i === 0 ? { color: "#00e5c8" } : {}}>{word} </span>
              ))}
            </h1>
            <div style={{ display: "flex", gap: "14px", alignItems: "center", marginBottom: "16px" }}>
              <div style={{ padding: "3px 10px", border: "1px solid rgba(0,229,200,.4)", borderRadius: "3px", fontSize: "11px", letterSpacing: "1px", color: "#00e5c8", fontFamily: "'Barlow Condensed', sans-serif" }}>{featured.rating}</div>
              <span style={{ color: "#b0bec5", fontSize: "13px" }}>{featured.chapterCount} Chapters · {featured.readingTime}</span>
            </div>
            <p style={{ fontSize: "15px", lineHeight: 1.7, color: "rgba(255,255,255,.7)", marginBottom: "28px", maxWidth: "420px" }}>{featured.description}</p>
            <div style={{ display: "flex", gap: "14px", flexWrap: "wrap" }}>
              <button
                onClick={() => handleReadStory(featured.id)}
                style={{
                  display: "flex", alignItems: "center", gap: "10px",
                  background: "#00e5c8", color: "#060d1f", border: "none",
                  padding: "14px 28px", borderRadius: "4px",
                  fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 700, fontSize: "15px", letterSpacing: "1.5px", textTransform: "uppercase",
                  cursor: "pointer",
                }}
              >▶ Start Reading</button>
              <button
                onClick={() => setLocation(`/story/${featured.id}`)}
                style={{
                  display: "flex", alignItems: "center", gap: "10px",
                  background: "rgba(255,255,255,.1)", color: "#fff",
                  border: "1px solid rgba(255,255,255,.2)", padding: "14px 28px", borderRadius: "4px",
                  fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 700, fontSize: "15px", letterSpacing: "1.5px", textTransform: "uppercase",
                  cursor: "pointer", backdropFilter: "blur(10px)",
                }}
              >ⓘ More Info</button>
            </div>
          </div>
        </div>
      )}

      {/* CONTINUE READING */}
      {!q && activeSessions.length > 0 && (
        <div style={{ padding: "0 4vw 50px" }}>
          <div style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between", marginBottom: "20px" }}>
            <h2 style={{ fontFamily: "'Barlow Condensed', sans-serif", fontSize: "22px", fontWeight: 700, letterSpacing: "1px", textTransform: "uppercase" }}>
              Continue <span style={{ color: "#00e5c8" }}>Reading</span>
            </h2>
          </div>
          <div style={{ display: "flex", gap: "16px", overflowX: "auto", paddingBottom: "8px" }} className="scrollbar-hide">
            {activeSessions.map(session => (
              <ContinueCard
                key={session.id}
                session={session}
                onClick={() => setLocation(`/read/${session.id}`)}
              />
            ))}
          </div>
        </div>
      )}

      {/* NEW RELEASES */}
      {!q && <div style={{ padding: "0 4vw 50px" }}>
        <div style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between", marginBottom: "20px" }}>
          <h2 style={{ fontFamily: "'Barlow Condensed', sans-serif", fontSize: "22px", fontWeight: 700, letterSpacing: "1px", textTransform: "uppercase" }}>
            New <span style={{ color: "#00e5c8" }}>Releases</span>
          </h2>
        </div>
        <div style={{ display: "flex", gap: "14px", overflowX: "auto", paddingBottom: "8px" }} className="scrollbar-hide">
          {newReleases.map(story => (
            <BookCard key={story.id} story={story} onClick={() => setLocation(`/story/${story.id}`)} />
          ))}
        </div>
      </div>}

      {/* TOP 10 */}
      {!q && top10.length > 0 && (
        <div style={{ padding: "0 4vw 50px" }}>
          <div style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between", marginBottom: "20px" }}>
            <h2 style={{ fontFamily: "'Barlow Condensed', sans-serif", fontSize: "22px", fontWeight: 700, letterSpacing: "1px", textTransform: "uppercase" }}>
              Top 10 <span style={{ color: "#00e5c8" }}>This Week</span>
            </h2>
          </div>
          <div style={{ display: "flex", gap: "0", alignItems: "flex-end", overflowX: "auto", paddingBottom: "8px" }} className="scrollbar-hide">
            {top10.slice(0, 10).map((story, i) => (
              <div key={story.id} style={{ display: "flex", alignItems: "flex-end", flex: 1, minWidth: "220px", position: "relative" }}>
                <span style={{
                  fontFamily: "'Bebas Neue', sans-serif",
                  fontSize: "clamp(7rem, 12vw, 11rem)",
                  lineHeight: 1,
                  WebkitTextStroke: "2px #68e6c5",
                  color: "transparent",
                  position: "relative",
                  zIndex: 2,
                  flexShrink: 0,
                  marginRight: "-18px",
                  marginBottom: "-8px",
                  userSelect: "none",
                  opacity: 0.85,
                }}>{i + 1}</span>
                <div
                  onClick={() => setLocation(`/story/${story.id}`)}
                  style={{
                    position: "relative",
                    borderRadius: "12px",
                    overflow: "hidden",
                    flex: 1,
                    aspectRatio: "16/9",
                    zIndex: 3,
                    border: "1px solid rgba(255,255,255,0.08)",
                    cursor: "pointer",
                    background: story.coverGradient || COVER_CLASSES[i % COVER_CLASSES.length],
                    transition: "transform 0.35s cubic-bezier(0.22,1,0.36,1), box-shadow 0.35s",
                  }}
                  onMouseEnter={e => {
                    e.currentTarget.style.transform = "translateY(-8px) scale(1.025)";
                    e.currentTarget.style.boxShadow = "0 20px 50px rgba(0,0,0,0.6), 0 0 0 1px rgba(104,230,197,0.2)";
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.transform = "";
                    e.currentTarget.style.boxShadow = "";
                  }}
                >
                  <div style={{
                    position: "absolute", inset: 0,
                    background: "radial-gradient(ellipse at 30% 30%, rgba(255,255,255,0.06) 0%, transparent 60%)",
                    zIndex: 1,
                  }} />
                  <div style={{
                    position: "absolute", bottom: 0, left: 0, right: 0, zIndex: 4,
                    padding: "32px 16px 16px",
                    background: "linear-gradient(to top, rgba(0,0,0,0.85) 0%, transparent 100%)",
                  }}>
                    <div style={{
                      fontFamily: "'Bebas Neue', sans-serif",
                      fontSize: "clamp(1rem, 2vw, 1.35rem)",
                      letterSpacing: "0.08em",
                      color: "#fff", lineHeight: 1.1, textTransform: "uppercase",
                    }}>{story.title}</div>
                    <div style={{ fontSize: "0.7rem", color: "rgba(255,255,255,0.55)", marginTop: "5px" }}>{story.genre}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ALL STORIES */}
      <div style={{ padding: "0 4vw 80px" }}>
        <div style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between", marginBottom: "20px" }}>
          <h2 style={{ fontFamily: "'Barlow Condensed', sans-serif", fontSize: "22px", fontWeight: 700, letterSpacing: "1px", textTransform: "uppercase" }}>
            {q ? <>Search <span style={{ color: "#00e5c8" }}>Results</span></> : <>All <span style={{ color: "#00e5c8" }}>Stories</span></>}
          </h2>
        </div>
        {filteredStories.length === 0 && q ? (
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "80px 20px", gap: "16px" }}>
            <div style={{ fontSize: "48px", opacity: 0.3 }}>🔍</div>
            <div style={{ fontFamily: "'Barlow Condensed', sans-serif", fontSize: "22px", fontWeight: 700, letterSpacing: "1px", textTransform: "uppercase", color: "rgba(255,255,255,0.5)" }}>
              No stories found
            </div>
            <div style={{ fontSize: "14px", color: "rgba(255,255,255,0.35)", textAlign: "center", maxWidth: "320px" }}>
              No stories match "<span style={{ color: "rgba(0,229,200,0.7)" }}>{searchQuery.trim()}</span>". Try a different title, genre, or tag.
            </div>
          </div>
        ) : (
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))", gap: "20px" }}>
            {filteredStories.map(story => (
              <BookCard key={story.id} story={story} onClick={() => setLocation(`/story/${story.id}`)} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
