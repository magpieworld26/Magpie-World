import { useEffect, useState } from "react";
import { useLocation } from "wouter";
import Navbar from "@/components/Navbar";
import { api, type Story, type StorySession } from "@/lib/api";
import { getAuthToken } from "@/lib/supabase";
import { useWindowWidth } from "@/hooks/use-mobile";

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

function BookCard({ story, onClick, cardWidth }: { story: Story; onClick: () => void; cardWidth?: string }) {
  const [hovered, setHovered] = useState(false);
  return (
    <div
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        flexShrink: 0,
        width: cardWidth || "240px",
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
        ...(story.coverImage ? {
          backgroundImage: `url(${story.coverImage})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        } : {}),
      }}>
        
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

function ContinueCard({ session, onClick, cardWidth }: { session: StorySession; onClick: () => void; cardWidth?: string }) {
  const pct = Math.min(100, Math.round((session.nodeCount / 20) * 100));
  return (
    <div
      onClick={onClick}
      style={{
        flexShrink: 0, width: cardWidth || "280px", background: "#0d1b2e",
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
      <div style={{
        width: "100%", aspectRatio: "16/9", position: "relative", overflow: "hidden",
        background: session.story.coverGradient,
        ...(session.story.coverImage ? {
          backgroundImage: `url(${session.story.coverImage})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        } : {}),
      }}>
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
  const { isMobile, isTablet } = useWindowWidth();

  useEffect(() => {
    getAuthToken().then(token => {
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
    });
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

  const GENRE_BUCKETS: { label: string; match: (g: string) => boolean }[] = [
    { label: "Fantasy", match: g => /fantasy|magic|dragon/i.test(g) },
    { label: "Mystery & Thriller", match: g => /mystery|thriller|detective|crime|noir/i.test(g) },
    { label: "Sci-Fi", match: g => /sci-fi|scifi|science fiction|space/i.test(g) },
    { label: "Comedy", match: g => /comedy|absurd|humou?r|satire/i.test(g) },
    { label: "Adventure", match: g => /adventure|survival|exploration/i.test(g) },
    { label: "Drama & Literary", match: g => /drama|literary|historical|slice/i.test(g) },
  ];

  const AGE_BUCKETS: { label: string; key: string }[] = [
    { label: "Kids (8–12)", key: "8–12" },
    { label: "Teens (13–18)", key: "13–18" },
    { label: "Adults (18+)", key: "18+" },
  ];

  const genreRows = GENRE_BUCKETS.map(bucket => ({
    label: bucket.label,
    stories: stories.filter(s => bucket.match(s.genre)),
  })).filter(row => row.stories.length > 0);

  const ageRows = AGE_BUCKETS.map(bucket => ({
    label: bucket.label,
    stories: stories.filter(s => s.audienceAge === bucket.key),
  })).filter(row => row.stories.length > 0);

  const bookCardWidth = isMobile ? "160px" : isTablet ? "200px" : "240px";
  const continueCardWidth = isMobile ? "200px" : isTablet ? "240px" : "280px";

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
        <div style={{
          position: "relative",
          height: isMobile ? "50vh" : "88vh",
          minHeight: isMobile ? "320px" : "580px",
          display: "flex",
          alignItems: "flex-end",
          padding: isMobile ? "0 16px 40px" : "0 4vw 90px",
          overflow: "hidden",
        }}>
          <div style={{
            position: "absolute", inset: 0,
            background: featured.coverGradient || "linear-gradient(135deg,#060d1f 0%,#0a2040 100%)",
            ...(featured.coverImage ? {
              backgroundImage: `url(${featured.coverImage})`,
              backgroundSize: "cover",
              backgroundPosition: "center top",
            } : {}),
          }} />
          <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to right, rgba(6,13,31,0.82) 0%, rgba(6,13,31,0.55) 50%, rgba(6,13,31,0.25) 100%)" }} />
          <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(6,13,31,0.95) 0%, rgba(6,13,31,0.3) 40%, transparent 70%)" }} />

          <div style={{ position: "relative", zIndex: 2, maxWidth: isMobile ? "100%" : "500px" }}>
            <div style={{ display: "inline-flex", alignItems: "center", gap: "8px", background: "rgba(0,229,200,.1)", border: "1px solid rgba(0,229,200,.3)", borderRadius: "20px", padding: "5px 14px", fontSize: "11px", letterSpacing: "3px", textTransform: "uppercase", color: "#00e5c8", marginBottom: "16px", fontFamily: "'Barlow Condensed', sans-serif" }}>
              <span style={{ width: "6px", height: "6px", borderRadius: "50%", background: "#00e5c8", animation: "pulse-dot 2s infinite" }} />
              Featured Story
            </div>
            <div style={{ fontFamily: "'Barlow Condensed', sans-serif", fontSize: "12px", letterSpacing: "4px", color: "rgba(255,255,255,.6)", textTransform: "uppercase", marginBottom: "8px" }}>{featured.genre}</div>
            <h1 style={{ fontFamily: "'Barlow Condensed', sans-serif", fontSize: isMobile ? "clamp(36px,9vw,52px)" : "clamp(52px,7vw,82px)", fontWeight: 900, lineHeight: 0.92, textTransform: "uppercase", marginBottom: "20px" }}>
              {featured.title.split(" ").map((word, i) => (
                <span key={i} style={i === 0 ? { color: "#00e5c8" } : {}}>{word} </span>
              ))}
            </h1>
            {!isMobile && (
              <div style={{ display: "flex", gap: "14px", alignItems: "center", marginBottom: "16px" }}>
                <div style={{ padding: "3px 10px", border: "1px solid rgba(0,229,200,.4)", borderRadius: "3px", fontSize: "11px", letterSpacing: "1px", color: "#00e5c8", fontFamily: "'Barlow Condensed', sans-serif" }}>{featured.rating}</div>
                <span style={{ color: "#b0bec5", fontSize: "13px" }}>{featured.chapterCount} Chapters · {featured.readingTime}</span>
              </div>
            )}
            {!isMobile && (
              <p style={{ fontSize: "15px", lineHeight: 1.7, color: "rgba(255,255,255,.7)", marginBottom: "28px", maxWidth: "420px" }}>{featured.description}</p>
            )}
            <div style={{ display: "flex", gap: "12px", flexWrap: "wrap" }}>
              <button
                onClick={() => handleReadStory(featured.id)}
                style={{
                  display: "flex", alignItems: "center", gap: "10px",
                  background: "#00e5c8", color: "#060d1f", border: "none",
                  padding: isMobile ? "11px 20px" : "14px 28px", borderRadius: "4px",
                  fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 700, fontSize: isMobile ? "13px" : "15px", letterSpacing: "1.5px", textTransform: "uppercase",
                  cursor: "pointer",
                }}
              >▶ Start Reading</button>
              <button
                onClick={() => setLocation(`/story/${featured.id}`)}
                style={{
                  display: "flex", alignItems: "center", gap: "10px",
                  background: "rgba(255,255,255,.1)", color: "#fff",
                  border: "1px solid rgba(255,255,255,.2)", padding: isMobile ? "11px 20px" : "14px 28px", borderRadius: "4px",
                  fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 700, fontSize: isMobile ? "13px" : "15px", letterSpacing: "1.5px", textTransform: "uppercase",
                  cursor: "pointer", backdropFilter: "blur(10px)",
                }}
              >More Info</button>
            </div>
          </div>
        </div>
      )}
      {/* CONTINUE READING */}
      {!q && activeSessions.length > 0 && (
        <div style={{ padding: isMobile ? "0 16px 36px" : "0 4vw 50px" }}>
          <div style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between", marginBottom: "20px" }}>
            <h2 style={{ fontFamily: "'Barlow Condensed', sans-serif", fontSize: "22px", fontWeight: 700, letterSpacing: "1px", textTransform: "uppercase" }}>
              Continue <span style={{ color: "#00e5c8" }}>Reading</span>
            </h2>
          </div>
          <div style={{ display: "flex", gap: "16px", overflowX: "auto", paddingTop: "12px", paddingBottom: "8px" }} className="scrollbar-hide">
            {activeSessions.map(session => (
              <ContinueCard
                key={session.id}
                session={session}
                cardWidth={continueCardWidth}
                onClick={() => setLocation(`/read/${session.id}`)}
              />
            ))}
          </div>
        </div>
      )}
      {/* NEW RELEASES */}
      {!q && <div style={{ padding: isMobile ? "0 16px 36px" : "0 4vw 50px" }}>
        <div style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between", marginBottom: "20px" }}>
          <h2 style={{ fontFamily: "'Barlow Condensed', sans-serif", fontSize: "22px", fontWeight: 700, letterSpacing: "1px", textTransform: "uppercase" }}>
            New <span style={{ color: "#00e5c8" }}>Releases</span>
          </h2>
        </div>
        <div style={{ display: "flex", gap: "14px", overflowX: "auto", paddingTop: "12px", paddingBottom: "8px" }} className="scrollbar-hide">
          {newReleases.map(story => (
            <BookCard key={story.id} story={story} cardWidth={bookCardWidth} onClick={() => setLocation(`/story/${story.id}`)} />
          ))}
        </div>
      </div>}
      {/* TOP 10 */}
      {!q && top10.length > 0 && (
        <div style={{ padding: isMobile ? "0 16px 36px" : "0 4vw 50px" }}>
          <div style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between", marginBottom: "20px" }}>
            <h2 style={{ fontFamily: "'Barlow Condensed', sans-serif", fontSize: "22px", fontWeight: 700, letterSpacing: "1px", textTransform: "uppercase" }}>
              Top 10 <span style={{ color: "#00e5c8" }}>This Week</span>
            </h2>
          </div>
          <div style={{ display: "flex", gap: "0", alignItems: "flex-end", overflowX: "auto", overflowY: "hidden", paddingTop: "20px", paddingBottom: "8px" }} className="scrollbar-hide">
            {top10.slice(0, 10).map((story, i) => (
              <div key={story.id} style={{ display: "flex", alignItems: "flex-end", flexShrink: 0 }}>
                <span style={{
                  fontFamily: "'Bebas Neue', sans-serif",
                  fontSize: isMobile ? "3rem" : "5rem",
                  lineHeight: 1,
                  WebkitTextStroke: "1.5px #68e6c5",
                  color: "transparent",
                  position: "relative",
                  zIndex: 2,
                  flexShrink: 0,
                  marginRight: "-6px",
                  marginBottom: "-4px",
                  userSelect: "none",
                  opacity: 0.85,
                }}>{i + 1}</span>
                <div
                  onClick={() => setLocation(`/story/${story.id}`)}
                  style={{
                    position: "relative",
                    borderRadius: "12px",
                    overflow: "hidden",
                    width: bookCardWidth,
                    flexShrink: 0,
                    aspectRatio: "16/9",
                    zIndex: 3,
                    border: "1px solid rgba(255,255,255,0.08)",
                    cursor: "pointer",
                    background: story.coverGradient || COVER_CLASSES[i % COVER_CLASSES.length],
                    ...(story.coverImage ? {
                      backgroundImage: `url(${story.coverImage})`,
                      backgroundSize: "cover",
                      backgroundPosition: "center",
                    } : {}),
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
                    padding: isMobile ? "16px 10px 10px" : "32px 16px 16px",
                    background: "linear-gradient(to top, rgba(0,0,0,0.85) 0%, transparent 100%)",
                  }}>
                    <div style={{
                      fontFamily: "'Bebas Neue', sans-serif",
                      fontSize: isMobile ? "0.8rem" : "clamp(1rem, 2vw, 1.35rem)",
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
      {/* SEARCH RESULTS */}
      {q && (
        <div style={{ padding: isMobile ? "0 16px 60px" : "0 4vw 80px" }}>
          <div style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between", marginBottom: "20px" }}>
            <h2 style={{ fontFamily: "'Barlow Condensed', sans-serif", fontSize: "22px", fontWeight: 700, letterSpacing: "1px", textTransform: "uppercase" }}>
              Search <span style={{ color: "#00e5c8" }}>Results</span>
            </h2>
          </div>
          {filteredStories.length === 0 ? (
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
            <div style={{
              display: "grid",
              gridTemplateColumns: isMobile ? "1fr" : isTablet ? "repeat(2, 1fr)" : "repeat(auto-fill, minmax(240px, 1fr))",
              gap: "20px",
            }}>
              {filteredStories.map(story => (
                <BookCard key={story.id} story={story} onClick={() => setLocation(`/story/${story.id}`)} />
              ))}
            </div>
          )}
        </div>
      )}
      {/* GENRE CAROUSELS */}
      {!q && genreRows.length > 0 && (
        <div style={{ padding: isMobile ? "0 0 20px" : "0 0 20px" }}>
          <div style={{ padding: isMobile ? "0 16px 16px" : "0 4vw 16px" }}>
            <h2 style={{ fontFamily: "'Barlow Condensed', sans-serif", fontSize: "22px", fontWeight: 700, letterSpacing: "1px", textTransform: "uppercase" }}>
              Browse by <span style={{ color: "#00e5c8" }}>Genre</span>
            </h2>
          </div>
          {genreRows.map(row => (
            <div key={row.label} style={{ padding: isMobile ? "0 16px 32px" : "0 4vw 40px" }}>
              <div style={{ marginBottom: "14px" }}>
                <span style={{ fontFamily: "'Barlow Condensed', sans-serif", fontSize: "16px", fontWeight: 700, letterSpacing: "2px", textTransform: "uppercase", color: "rgba(255,255,255,0.7)" }}>{row.label}</span>
              </div>
              <div style={{ display: "flex", gap: "14px", overflowX: "auto", paddingTop: "8px", paddingBottom: "8px" }} className="scrollbar-hide">
                {row.stories.map(story => (
                  <BookCard key={story.id} story={story} cardWidth={bookCardWidth} onClick={() => setLocation(`/story/${story.id}`)} />
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
      {/* AGE GROUP CAROUSELS */}
      {!q && ageRows.length > 0 && (
        <div style={{ padding: isMobile ? "0 0 60px" : "0 0 80px" }}>
          <div style={{ padding: isMobile ? "0 16px 16px" : "0 4vw 16px" }}>
            <h2 style={{ fontFamily: "'Barlow Condensed', sans-serif", fontSize: "22px", fontWeight: 700, letterSpacing: "1px", textTransform: "uppercase" }}>
              Browse by <span style={{ color: "#00e5c8" }}>Age Group</span>
            </h2>
          </div>
          {ageRows.map(row => (
            <div key={row.label} style={{ padding: isMobile ? "0 16px 32px" : "0 4vw 40px" }}>
              <div style={{ marginBottom: "14px" }}>
                <span style={{ fontFamily: "'Barlow Condensed', sans-serif", fontSize: "16px", fontWeight: 700, letterSpacing: "2px", textTransform: "uppercase", color: "rgba(255,255,255,0.7)" }}>{row.label}</span>
              </div>
              <div style={{ display: "flex", gap: "14px", overflowX: "auto", paddingTop: "8px", paddingBottom: "8px" }} className="scrollbar-hide">
                {row.stories.map(story => (
                  <BookCard key={story.id} story={story} cardWidth={bookCardWidth} onClick={() => setLocation(`/story/${story.id}`)} />
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
