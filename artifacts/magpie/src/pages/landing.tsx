import { useEffect, useState } from "react";
import { useLocation } from "wouter";
import Navbar from "@/components/Navbar";
import { api, type Story } from "@/lib/api";
import { useWindowWidth } from "@/hooks/use-mobile";

const TOP5_GRADIENTS = [
  "linear-gradient(145deg, #0d4a47 0%, #0a2a2e 60%, #061a25 100%)",
  "linear-gradient(145deg, #0b2535 0%, #091c2a 50%, #071218 100%)",
  "linear-gradient(145deg, #1a0a3d 0%, #2a0f5a 40%, #0d062b 100%)",
  "linear-gradient(145deg, #1a1a0f 0%, #2a2410 50%, #111008 100%)",
  "linear-gradient(145deg, #3d1205 0%, #6b2208 40%, #c44a10 70%, #e8621a 100%)",
];

export default function LandingPage() {
  const [, setLocation] = useLocation();
  const [stories, setStories] = useState<Story[]>([]);
  const { isMobile, isTablet } = useWindowWidth();

  useEffect(() => {
    api.stories.list().then(d => setStories(d.stories)).catch(() => {});
  }, []);

  const top5 = stories.filter(s => s.rank !== null && s.rank !== undefined).sort((a, b) => (a.rank ?? 99) - (b.rank ?? 99)).slice(0, 5);
  const aboutCards = [
    { icon: "📖", title: "Breathing Stories", desc: "Every story evolves based on your choices. No two readers follow the same path. Your decisions create a unique narrative that belongs to you alone." },
    { icon: "🤖", title: "AI-Powered Narratives", desc: "Our advanced AI generates rich, contextually aware story continuations that maintain consistency, tone, and character voice across your entire journey." },
    { icon: "🔖", title: "Save & Continue", desc: "Life gets busy. Every choice is saved automatically. Pick up exactly where you left off, whether that's tomorrow or months from now." },
  ];

  const sectionPadding = isMobile ? "48px 0" : "96px 0";
  const containerPadding = isMobile ? "0 16px" : "0 24px";

  return (
    <div style={{ background: "#020617", color: "#fff", minHeight: "100vh", overflowX: "hidden" }}>
      <Navbar variant="landing" />

      {/* HERO */}
      <section id="home" style={{ position: "relative", minHeight: isMobile ? "70vh" : "85vh", overflow: "hidden", paddingTop: "96px" }}>
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to bottom, #020617, #03112d, #020617)" }} />
        <div style={{
          position: "relative",
          maxWidth: "1280px",
          margin: "0 auto",
          padding: isMobile ? "24px 16px 48px" : "32px 24px 80px",
          minHeight: isMobile ? "60vh" : "78vh",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          textAlign: "center",
          gap: "24px",
        }}>
          <h1 style={{
            fontFamily: "'Bebas Neue', sans-serif",
            fontSize: isMobile ? "clamp(2.5rem, 12vw, 3.5rem)" : "clamp(3rem, 10vw, 5.5rem)",
            lineHeight: 0.88,
            color: "#fff",
            filter: "drop-shadow(0 25px 25px rgba(0,0,0,0.5))",
            margin: 0,
          }}>
            THE HOME OF<br/>
            <span style={{
              display: "block",
              marginTop: "8px",
              background: "linear-gradient(90deg, #68e6c5, #59ced1, #4f98d8)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}>BREATHING BOOKS</span>
          </h1>

          <p style={{
            maxWidth: "640px",
            fontSize: isMobile ? "0.95rem" : "1.125rem",
            color: "#e2e8f0",
            lineHeight: 1.7,
            margin: 0,
            fontFamily: "'Barlow', sans-serif",
            padding: isMobile ? "0 8px" : "0",
          }}>
            Step into stories that breathe, evolve, and respond to you. Make choices that matter.
            Shape narratives that are uniquely yours. Experience literature that lives.
          </p>

          <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", justifyContent: "center", gap: "16px" }}>
            <button
              onClick={() => setLocation("/home")}
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "8px",
                background: "linear-gradient(90deg, #6be7c5, #4ea7d8)",
                color: "#0f172a",
                fontFamily: "'Montserrat', sans-serif",
                fontSize: isMobile ? "0.9rem" : "1rem",
                fontWeight: 700,
                padding: isMobile ? "12px 28px" : "14px 36px",
                borderRadius: "6px",
                border: "none",
                cursor: "pointer",
                transition: "transform 0.3s, opacity 0.3s",
              }}
              onMouseEnter={e => (e.currentTarget.style.transform = "scale(1.05)")}
              onMouseLeave={e => (e.currentTarget.style.transform = "scale(1)")}
            >
              ▶ Start Your Journey
            </button>
          </div>
        </div>
      </section>

      {/* TRENDING */}
      <section id="trending" style={{ padding: sectionPadding, borderTop: "1px solid rgba(255,255,255,0.05)" }}>
        <div style={{ maxWidth: "1280px", margin: "0 auto", padding: containerPadding }}>
          <h2 style={{
            fontFamily: "'Bebas Neue', sans-serif",
            fontSize: "clamp(1.75rem, 4vw, 2.5rem)",
            letterSpacing: "0.14em",
            color: "#fff",
            marginBottom: isMobile ? "24px" : "40px",
          }}>
            TOP 5 <span style={{ background: "linear-gradient(90deg, #68e6c5, #4f98d8)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>THIS WEEK</span>
          </h2>

          <div style={{ display: "flex", gap: "0", alignItems: "flex-end", overflowX: "auto", overflowY: "hidden", paddingTop: "20px", paddingBottom: "8px" }} className="scrollbar-hide">
            {top5.map((story, i) => (
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
                    width: isMobile ? "160px" : isTablet ? "200px" : "240px",
                    flexShrink: 0,
                    aspectRatio: "16/9",
                    zIndex: 3,
                    border: "1px solid rgba(255,255,255,0.08)",
                    cursor: "pointer",
                    background: story.coverGradient || TOP5_GRADIENTS[i % TOP5_GRADIENTS.length],
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
                    position: "absolute",
                    inset: 0,
                    background: "radial-gradient(ellipse at 30% 30%, rgba(255,255,255,0.06) 0%, transparent 60%)",
                    zIndex: 1,
                  }} />
                  <div style={{
                    position: "absolute",
                    bottom: 0,
                    left: 0,
                    right: 0,
                    zIndex: 4,
                    padding: isMobile ? "20px 10px 10px" : "32px 16px 16px",
                    background: "linear-gradient(to top, rgba(0,0,0,0.85) 0%, transparent 100%)",
                  }}>
                    <div style={{
                      fontFamily: "'Bebas Neue', sans-serif",
                      fontSize: isMobile ? "0.85rem" : "clamp(1rem, 2vw, 1.35rem)",
                      letterSpacing: "0.08em",
                      color: "#fff",
                      lineHeight: 1.1,
                      textTransform: "uppercase",
                    }}>{story.title}</div>
                    <div style={{ fontSize: "0.7rem", color: "rgba(255,255,255,0.55)", marginTop: "5px" }}>{story.genre}</div>
                    {!isMobile && (
                      <div style={{
                        display: "inline-block",
                        marginTop: "10px",
                        fontSize: "0.62rem",
                        fontWeight: 700,
                        textTransform: "uppercase",
                        letterSpacing: "0.14em",
                        color: "#0f172a",
                        background: "linear-gradient(90deg, #6be7c5, #4ea7d8)",
                        padding: "5px 12px",
                        borderRadius: "4px",
                      }}>Read Now</div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ABOUT */}
      <section id="about" style={{
        padding: sectionPadding,
        borderTop: "1px solid rgba(255,255,255,0.05)",
        borderBottom: "1px solid rgba(255,255,255,0.05)",
        background: "rgba(15,23,42,0.35)",
      }}>
        <div style={{ maxWidth: "1280px", margin: "0 auto", padding: containerPadding }}>
          <div style={{ marginBottom: isMobile ? "28px" : "48px" }}>
            <h2 style={{
              fontFamily: "'Bebas Neue', sans-serif",
              fontSize: "clamp(2.25rem, 6vw, 3.25rem)",
              letterSpacing: "0.04em",
              color: "#fff",
              marginBottom: "12px",
            }}>About Magpie</h2>
            <p style={{ fontSize: "0.875rem", color: "#cbd5e1", lineHeight: 1.7, maxWidth: "640px" }}>
              The world's first AI-powered interactive reading platform. We combine the immersion of great literature with the freedom of choice-driven narrative.
            </p>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : isTablet ? "1fr 1fr" : "repeat(auto-fit, minmax(280px, 1fr))", gap: "20px" }}>
            {aboutCards.map(card => (
              <div
                key={card.title}
                style={{
                  borderRadius: "14px",
                  border: "1px solid rgba(255,255,255,0.1)",
                  background: "rgba(15,23,42,0.55)",
                  padding: "28px 24px",
                  backdropFilter: "blur(8px)",
                  transition: "border-color 0.3s, transform 0.3s",
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.borderColor = "rgba(104,230,197,0.3)";
                  e.currentTarget.style.transform = "translateY(-5px)";
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.borderColor = "rgba(255,255,255,0.1)";
                  e.currentTarget.style.transform = "";
                }}
              >
                <div style={{
                  width: "42px",
                  height: "42px",
                  borderRadius: "8px",
                  marginBottom: "18px",
                  background: "rgba(104,230,197,0.1)",
                  border: "1px solid rgba(104,230,197,0.2)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "20px",
                }}>{card.icon}</div>
                <h3 style={{
                  fontFamily: "'Bebas Neue', sans-serif",
                  fontSize: "1.3rem",
                  letterSpacing: "0.06em",
                  color: "#fff",
                  marginBottom: "10px",
                }}>{card.title}</h3>
                <p style={{ fontSize: "0.85rem", color: "#94a3b8", lineHeight: 1.65 }}>{card.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* VISION */}
      <section id="vision" style={{ padding: sectionPadding }}>
        <div style={{ maxWidth: "1280px", margin: "0 auto", padding: containerPadding, textAlign: "center" }}>
          <h2 style={{
            fontFamily: "'Bebas Neue', sans-serif",
            fontSize: "clamp(2.25rem, 6vw, 3.25rem)",
            letterSpacing: "0.04em",
            color: "#fff",
            marginBottom: "24px",
          }}>Our Vision</h2>
          <p style={{
            fontSize: isMobile ? "0.95rem" : "1.1rem",
            color: "#cbd5e1",
            lineHeight: 1.8,
            maxWidth: "720px",
            margin: "0 auto 40px",
          }}>
            We believe every reader deserves to be the hero of their own story. Magpie is building the future of literature — where books breathe, respond, and grow with you. Where every story is a collaboration between human imagination and artificial intelligence.
          </p>
          <button
            onClick={() => setLocation("/home")}
            style={{
              background: "linear-gradient(90deg, #6be7c5, #4ea7d8)",
              color: "#0f172a",
              fontFamily: "'Montserrat', sans-serif",
              fontSize: isMobile ? "0.9rem" : "1rem",
              fontWeight: 700,
              padding: isMobile ? "12px 28px" : "14px 40px",
              borderRadius: "6px",
              border: "none",
              cursor: "pointer",
            }}
          >
            Start Reading
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer style={{
        textAlign: "center",
        padding: "24px",
        borderTop: "1px solid rgba(255,255,255,0.05)",
        color: "rgba(255,255,255,0.3)",
        fontSize: "0.8rem",
      }}>
        © 2026 Magpie. The Home of Breathing Books.
      </footer>
    </div>
  );
}
