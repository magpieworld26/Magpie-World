import { useEffect, useState } from "react";
import { useParams, useLocation } from "wouter";
import { api, type StorySession, type StoryNode, type Choice } from "@/lib/api";
import { getAuthToken } from "@/lib/supabase";
import { useWindowWidth } from "@/hooks/use-mobile";

export default function ReaderPage() {
  const { sessionId } = useParams<{ sessionId: string }>();
  const [, setLocation] = useLocation();
  const { isMobile, isTablet } = useWindowWidth();
  const isCompact = isMobile || isTablet;

  const [session, setSession] = useState<StorySession | null>(null);
  const [nodes, setNodes] = useState<StoryNode[]>([]);
  const [currentNode, setCurrentNode] = useState<StoryNode | null>(null);
  const [loading, setLoading] = useState(true);
  const [choosing, setChoosing] = useState(false);
  const [chosenId, setChosenId] = useState<string | null>(null);
  const [showChoices, setShowChoices] = useState(false);
  const [storyComplete, setStoryComplete] = useState(false);
  const [generationError, setGenerationError] = useState<string | null>(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [streamingText, setStreamingText] = useState<string | null>(null);

  useEffect(() => {
    if (!sessionId) return;
    getAuthToken().then(token => {
      if (!token) { setLocation("/login"); return; }
      api.sessions.get(sessionId).then(data => {
        setSession(data.session);
        setNodes(data.nodes);
        setCurrentNode(data.currentNode);
        if (!data.currentNode || data.currentNode.choices.length === 0) {
          setStoryComplete(true);
        } else {
          setShowChoices(true);
        }
      }).catch(() => setLocation("/home")).finally(() => setLoading(false));
    });
  }, [sessionId, setLocation]);

  const handleChoice = async (choice: Choice) => {
    if (!sessionId || choosing || chosenId) return;
    setChosenId(choice.id);
    setChoosing(true);
    setShowChoices(false);
    setGenerationError(null);
    setStreamingText("");
    try {
      const newNode = await api.sessions.continueStream(
        sessionId,
        choice.id,
        choice.text,
        (chunk) => setStreamingText(prev => (prev ?? "") + chunk),
      );
      setStreamingText(null);
      setNodes(prev => [...prev, newNode]);
      setCurrentNode(newNode);
      setChosenId(null);
      if (!newNode.choices || newNode.choices.length === 0) {
        setStoryComplete(true);
      } else {
        setShowChoices(true);
      }
    } catch (err) {
      setStreamingText(null);
      const msg = err instanceof Error ? err.message : "Something went wrong generating the next scene.";
      if (
        msg.toLowerCase().includes("invalid or expired token") ||
        msg.toLowerCase().includes("invalid token") ||
        msg.toLowerCase().includes("jwt expired") ||
        msg.toLowerCase().includes("not authenticated") ||
        msg.toLowerCase().includes("unauthorized")
      ) {
        setLocation("/login?reason=session_expired");
        return;
      }
      setGenerationError(msg);
      setChosenId(null);
      setShowChoices(true);
    } finally {
      setChoosing(false);
    }
  };

  if (loading) {
    return (
      <div style={{ background: "#060d1f", minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center" }}>
        <div style={{ textAlign: "center" }}>
          <div style={{ color: "#00e5c8", fontFamily: "'Barlow Condensed', sans-serif", fontSize: "22px", letterSpacing: "4px", marginBottom: "12px" }}>LOADING STORY</div>
          <div style={{ display: "flex", gap: "8px", justifyContent: "center" }}>
            {[0, 1, 2].map(i => (
              <div key={i} style={{ width: "8px", height: "8px", borderRadius: "50%", background: "#00e5c8", opacity: 0.6, animation: `pulse-dot 1.4s ${i * 0.2}s infinite` }} />
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (!session || !currentNode) return null;

  const previousNodes = nodes.filter(n => n.id !== currentNode.id);

  const choicesPanel = (
    <div style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
      {showChoices && currentNode.choices && currentNode.choices.length > 0 && (
        <>
          <div style={{ fontSize: "11px", letterSpacing: "2px", color: "#00e5c8", textTransform: "uppercase", marginBottom: "8px", fontFamily: "'Barlow Condensed', sans-serif" }}>
            What do you do?
          </div>
          {currentNode.choices.map((choice, i) => (
            <button
              key={choice.id}
              onClick={() => handleChoice(choice)}
              disabled={choosing || !!chosenId}
              style={{
                background: chosenId === choice.id
                  ? "rgba(0,229,200,0.2)"
                  : "rgba(0,229,200,0.04)",
                border: chosenId === choice.id
                  ? "1.5px solid #00e5c8"
                  : "1.5px solid rgba(0,229,200,0.2)",
                borderRadius: "6px",
                padding: "14px 16px",
                color: "#fff",
                textAlign: "left",
                cursor: choosing ? "not-allowed" : "pointer",
                fontFamily: "'Barlow', sans-serif",
                fontSize: "14px",
                lineHeight: 1.5,
                width: "100%",
                transition: "background 0.2s, border-color 0.2s, transform 0.2s",
                opacity: (choosing && chosenId !== choice.id) ? 0.4 : 1,
                display: "flex",
                gap: "10px",
                alignItems: "flex-start",
              }}
              onMouseEnter={e => {
                if (!choosing) {
                  e.currentTarget.style.background = "rgba(0,229,200,0.1)";
                  e.currentTarget.style.borderColor = "rgba(0,229,200,0.5)";
                  if (!isCompact) e.currentTarget.style.transform = "translateX(4px)";
                }
              }}
              onMouseLeave={e => {
                if (!choosing) {
                  e.currentTarget.style.background = "rgba(0,229,200,0.04)";
                  e.currentTarget.style.borderColor = "rgba(0,229,200,0.2)";
                  e.currentTarget.style.transform = "";
                }
              }}
            >
              <span style={{
                width: "22px", height: "22px", borderRadius: "50%", flexShrink: 0,
                background: "rgba(0,229,200,0.15)", border: "1px solid rgba(0,229,200,0.4)",
                display: "flex", alignItems: "center", justifyContent: "center",
                fontFamily: "'Bebas Neue', sans-serif", fontSize: "12px", color: "#00e5c8",
                marginTop: "1px",
              }}>{String.fromCharCode(65 + i)}</span>
              <span>{choice.text}</span>
            </button>
          ))}
        </>
      )}
    </div>
  );

  if (isCompact) {
    return (
      <div style={{ display: "flex", flexDirection: "column", minHeight: "100vh", background: "#060d1f", color: "#fff" }}>
        {/* Top bar */}
        <div style={{
          position: "sticky", top: 0, zIndex: 20,
          background: "rgba(6,13,31,0.96)", backdropFilter: "blur(12px)",
          borderBottom: "1px solid rgba(0,229,200,0.1)",
          padding: "14px 16px",
          display: "flex", alignItems: "center", justifyContent: "space-between",
          gap: "12px",
        }}>
          <button
            onClick={() => setSidebarOpen(v => !v)}
            style={{ background: "none", border: "1px solid rgba(0,229,200,0.3)", color: "#00e5c8", cursor: "pointer", borderRadius: "4px", padding: "6px 12px", fontFamily: "'Barlow Condensed', sans-serif", fontSize: "11px", letterSpacing: "2px", textTransform: "uppercase", flexShrink: 0 }}
          >
            {sidebarOpen ? "Close Map" : "Book Map"}
          </button>
          <div style={{ fontFamily: "'Barlow Condensed', sans-serif", fontSize: "13px", letterSpacing: "2px", color: "rgba(255,255,255,0.5)", textTransform: "uppercase", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap", flex: 1, textAlign: "center" }}>
            Chapter {nodes.length}
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: "6px", flexShrink: 0 }}>
            <div style={{ width: "6px", height: "6px", borderRadius: "50%", background: "#00e5c8", boxShadow: "0 0 8px rgba(0,229,200,0.8)" }} />
            <span style={{ fontSize: "10px", color: "rgba(255,255,255,0.4)", fontFamily: "'Barlow Condensed', sans-serif", letterSpacing: "1px", textTransform: "uppercase" }}>Live</span>
          </div>
        </div>

        {/* Sidebar overlay */}
        {sidebarOpen && (
          <div style={{
            position: "fixed", top: 0, left: 0, right: 0, bottom: 0, zIndex: 50,
            background: "rgba(0,0,0,0.7)",
          }} onClick={() => setSidebarOpen(false)}>
            <div
              onClick={e => e.stopPropagation()}
              style={{
                width: "min(300px, 85vw)",
                height: "100vh",
                background: "#060d1f",
                borderRight: "1px solid rgba(0,229,200,0.15)",
                display: "flex",
                flexDirection: "column",
                overflow: "hidden",
              }}
            >
              <div style={{ padding: "20px 20px 16px", borderBottom: "1px solid rgba(0,229,200,0.1)" }}>
                <button
                  onClick={() => { setSidebarOpen(false); setLocation("/home"); }}
                  style={{ background: "none", border: "none", color: "#00e5c8", cursor: "pointer", fontSize: "12px", fontFamily: "'Barlow Condensed', sans-serif", letterSpacing: "2px", textTransform: "uppercase", padding: "0", marginBottom: "12px", display: "flex", alignItems: "center", gap: "6px" }}
                >← Back to Home</button>
                <div style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: "22px", letterSpacing: "0.08em", lineHeight: 1.1, color: "#fff" }}>
                  {session.story.title}
                </div>
                <div style={{ fontSize: "11px", color: "#00e5c8", letterSpacing: "2px", textTransform: "uppercase", marginTop: "4px", fontFamily: "'Barlow Condensed', sans-serif" }}>
                  {session.story.genre}
                </div>
              </div>
              <div style={{ padding: "16px 20px", borderBottom: "1px solid rgba(0,229,200,0.08)" }}>
                <div style={{ display: "flex", justifyContent: "space-between", fontSize: "11px", marginBottom: "8px" }}>
                  <span style={{ color: "rgba(255,255,255,0.4)", fontFamily: "'Barlow Condensed', sans-serif", letterSpacing: "1px", textTransform: "uppercase" }}>Progress</span>
                  <span style={{ color: "#00e5c8" }}>{nodes.length} nodes</span>
                </div>
                <div style={{ height: "3px", background: "rgba(255,255,255,0.08)", borderRadius: "2px", overflow: "hidden" }}>
                  <div style={{ height: "100%", width: `${Math.min(100, (nodes.length / 20) * 100)}%`, background: "linear-gradient(to right, #00b8a0, #00e5c8)", borderRadius: "2px", transition: "width 0.5s" }} />
                </div>
              </div>
              <div style={{ flex: 1, overflow: "auto", padding: "16px 20px 20px" }} className="scrollbar-hide">
                <div style={{ fontSize: "10px", letterSpacing: "2px", color: "rgba(255,255,255,0.3)", marginBottom: "12px", fontFamily: "'Barlow Condensed', sans-serif", textTransform: "uppercase" }}>Your Path</div>
                <div style={{ display: "flex", flexDirection: "column", gap: "0" }}>
                  {nodes.map((node, i) => (
                    <div key={node.id} style={{ display: "flex", gap: "12px", alignItems: "flex-start" }}>
                      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", flexShrink: 0 }}>
                        <div style={{
                          width: "8px", height: "8px", borderRadius: "50%", flexShrink: 0, marginTop: "4px",
                          background: node.id === currentNode.id ? "#00e5c8" : i < nodes.indexOf(currentNode) ? "#00e5c8" : "rgba(255,255,255,0.2)",
                          boxShadow: node.id === currentNode.id ? "0 0 10px rgba(0,229,200,0.8)" : undefined,
                        }} />
                        {i < nodes.length - 1 && (
                          <div style={{ width: "1px", height: "30px", background: "rgba(0,229,200,0.15)", marginTop: "4px" }} />
                        )}
                      </div>
                      <div style={{ paddingBottom: "16px" }}>
                        <div style={{ fontSize: "10px", color: "rgba(255,255,255,0.35)", fontFamily: "'Barlow Condensed', sans-serif" }}>
                          {node.choiceMade ? (
                            <span style={{ color: "rgba(0,229,200,0.6)", fontSize: "10px" }}>"{node.choiceMade.slice(0, 40)}{node.choiceMade.length > 40 ? "..." : ""}"</span>
                          ) : (
                            <span style={{ color: "rgba(255,255,255,0.2)", fontStyle: "italic" }}>Opening</span>
                          )}
                        </div>
                        {node.id === currentNode.id && (
                          <div style={{ fontSize: "9px", color: "#00e5c8", letterSpacing: "1px", textTransform: "uppercase", fontFamily: "'Barlow Condensed', sans-serif", marginTop: "2px" }}>Current</div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Story content */}
        <div style={{ flex: 1, overflowY: "auto", padding: "24px 16px" }} className="scrollbar-hide">
          {previousNodes.map((node, i) => (
            <div key={node.id} style={{ marginBottom: "40px", opacity: 0.55 }}>
              {node.choiceMade && (
                <div style={{
                  marginBottom: "24px",
                  padding: "12px 16px",
                  background: "rgba(0,229,200,0.06)",
                  border: "1px solid rgba(0,229,200,0.15)",
                  borderLeft: "3px solid #00e5c8",
                  borderRadius: "0 6px 6px 0",
                  fontFamily: "'Barlow Condensed', sans-serif",
                  fontSize: "13px",
                  letterSpacing: "0.5px",
                  color: "rgba(0,229,200,0.8)",
                }}>
                  You chose: "{node.choiceMade}"
                </div>
              )}
              <div style={{
                fontFamily: "'Lora', Georgia, serif",
                fontSize: "16px",
                lineHeight: 1.9,
                color: "rgba(255,255,255,0.55)",
                whiteSpace: "pre-line",
              }}>
                {node.narrativeText}
              </div>
              {i < previousNodes.length - 1 && (
                <div style={{ margin: "28px auto 0", display: "flex", alignItems: "center", gap: "14px" }}>
                  <div style={{ flex: 1, height: "1px", background: "rgba(0,229,200,0.1)" }} />
                  <span style={{ fontSize: "10px", color: "rgba(0,229,200,0.3)", letterSpacing: "2px", fontFamily: "'Barlow Condensed', sans-serif" }}>✦</span>
                  <div style={{ flex: 1, height: "1px", background: "rgba(0,229,200,0.1)" }} />
                </div>
              )}
            </div>
          ))}

          {previousNodes.length > 0 && (
            <div style={{ margin: "28px auto 40px", display: "flex", alignItems: "center", gap: "14px" }}>
              <div style={{ flex: 1, height: "1px", background: "rgba(0,229,200,0.15)" }} />
              <span style={{ fontSize: "10px", color: "rgba(0,229,200,0.5)", letterSpacing: "2px", fontFamily: "'Barlow Condensed', sans-serif" }}>✦ ✦ ✦</span>
              <div style={{ flex: 1, height: "1px", background: "rgba(0,229,200,0.15)" }} />
            </div>
          )}

          {currentNode.choiceMade && (
            <div style={{
              marginBottom: "28px",
              padding: "12px 16px",
              background: "rgba(0,229,200,0.08)",
              border: "1px solid rgba(0,229,200,0.2)",
              borderLeft: "3px solid #00e5c8",
              borderRadius: "0 6px 6px 0",
              fontFamily: "'Barlow Condensed', sans-serif",
              fontSize: "14px",
              letterSpacing: "0.5px",
              color: "#00e5c8",
            }}>
              You chose: "{currentNode.choiceMade}"
            </div>
          )}

          <div style={{
            fontFamily: "'Lora', Georgia, serif",
            fontSize: "17px",
            lineHeight: 2,
            color: "rgba(255,255,255,0.92)",
            whiteSpace: "pre-line",
            minHeight: "160px",
          }}>
            {streamingText !== null ? streamingText : currentNode.narrativeText}
          </div>

          {choosing && streamingText === null && (
            <div style={{ display: "flex", alignItems: "center", gap: "12px", marginTop: "40px" }}>
              <div style={{ display: "flex", gap: "6px" }}>
                {[0, 1, 2].map(i => (
                  <div key={i} style={{ width: "8px", height: "8px", borderRadius: "50%", background: "#00e5c8", opacity: 0.6, animation: `pulse-dot 1.2s ${i * 0.18}s infinite` }} />
                ))}
              </div>
              <span style={{ fontFamily: "'Barlow Condensed', sans-serif", fontSize: "13px", letterSpacing: "2px", color: "rgba(0,229,200,0.7)", textTransform: "uppercase" }}>
                Writing your story…
              </span>
            </div>
          )}

          {storyComplete && !choosing && streamingText === null && (
            <div style={{ marginTop: "60px", textAlign: "center" }}>
              <div style={{ marginBottom: "24px", display: "flex", alignItems: "center", gap: "14px" }}>
                <div style={{ flex: 1, height: "1px", background: "rgba(0,229,200,0.2)" }} />
                <span style={{ fontSize: "18px", color: "#00e5c8" }}>✦</span>
                <div style={{ flex: 1, height: "1px", background: "rgba(0,229,200,0.2)" }} />
              </div>
              <div style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: "28px", letterSpacing: "4px", color: "#fff", marginBottom: "12px" }}>STORY COMPLETE</div>
              <div style={{ fontSize: "14px", color: "rgba(255,255,255,0.55)", marginBottom: "28px" }}>Your journey has reached its conclusion.</div>
              <div style={{ display: "flex", gap: "12px", justifyContent: "center", flexWrap: "wrap" }}>
                <button
                  onClick={() => setLocation(`/story/${session.story.id}`)}
                  style={{ background: "#00e5c8", color: "#060d1f", border: "none", padding: "12px 24px", borderRadius: "4px", fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 700, fontSize: "14px", letterSpacing: "2px", textTransform: "uppercase", cursor: "pointer" }}
                >New Story</button>
                <button
                  onClick={() => setLocation("/home")}
                  style={{ background: "rgba(255,255,255,0.1)", color: "#fff", border: "1px solid rgba(255,255,255,0.2)", padding: "12px 24px", borderRadius: "4px", fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 700, fontSize: "14px", letterSpacing: "2px", textTransform: "uppercase", cursor: "pointer" }}
                >Browse Stories</button>
              </div>
            </div>
          )}
        </div>

        {/* Choices below narrative on mobile */}
        {(showChoices || generationError || choosing) && !storyComplete && (
          <div style={{
            borderTop: "1px solid rgba(0,229,200,0.12)",
            padding: "20px 16px 28px",
            background: "#060d1f",
          }}>
            {generationError && !choosing && (
              <div style={{
                background: "rgba(255,80,80,0.08)",
                border: "1px solid rgba(255,80,80,0.25)",
                borderRadius: "6px",
                padding: "14px 16px",
                marginBottom: "16px",
              }}>
                <div style={{ fontSize: "11px", color: "rgba(255,120,120,0.9)", fontFamily: "'Barlow Condensed', sans-serif", letterSpacing: "1.5px", textTransform: "uppercase", marginBottom: "6px" }}>
                  Generation failed
                </div>
                <div style={{ fontSize: "13px", color: "rgba(255,255,255,0.55)", fontFamily: "'Barlow', sans-serif", lineHeight: 1.5 }}>
                  {generationError}
                </div>
                <button
                  onClick={() => setGenerationError(null)}
                  style={{ marginTop: "10px", background: "none", border: "1px solid rgba(255,120,120,0.3)", borderRadius: "4px", padding: "6px 12px", color: "rgba(255,120,120,0.8)", fontFamily: "'Barlow Condensed', sans-serif", fontSize: "11px", letterSpacing: "1px", textTransform: "uppercase", cursor: "pointer" }}
                >
                  Dismiss
                </button>
              </div>
            )}

            {choosing && (
              <div style={{ textAlign: "center", padding: "12px 0" }}>
                <div style={{ display: "flex", gap: "6px", justifyContent: "center", marginBottom: "8px" }}>
                  {[0, 1, 2].map(i => (
                    <div key={i} style={{ width: "8px", height: "8px", borderRadius: "50%", background: "#00e5c8", opacity: 0.5, animation: `pulse-dot 1.2s ${i * 0.2}s infinite` }} />
                  ))}
                </div>
                <div style={{ fontSize: "12px", color: "rgba(255,255,255,0.35)", fontFamily: "'Barlow Condensed', sans-serif", letterSpacing: "1px", textTransform: "uppercase" }}>Generating…</div>
              </div>
            )}

            {choicesPanel}
          </div>
        )}
      </div>
    );
  }

  return (
    <div style={{ display: "flex", height: "100vh", background: "#060d1f", color: "#fff", overflow: "hidden" }}>
      {/* LEFT SIDEBAR — Book Map & Progress */}
      <div style={{
        width: "260px",
        flexShrink: 0,
        height: "100vh",
        overflow: "hidden auto",
        background: "#060d1f",
        borderRight: "1px solid rgba(0,229,200,0.1)",
        display: "flex",
        flexDirection: "column",
      }} className="scrollbar-hide">
        <div style={{ padding: "20px 20px 16px", borderBottom: "1px solid rgba(0,229,200,0.1)" }}>
          <button
            onClick={() => setLocation("/home")}
            style={{ background: "none", border: "none", color: "#00e5c8", cursor: "pointer", fontSize: "12px", fontFamily: "'Barlow Condensed', sans-serif", letterSpacing: "2px", textTransform: "uppercase", padding: "0", marginBottom: "12px", display: "flex", alignItems: "center", gap: "6px" }}
            className="text-[15px] font-bold">← </button>
          <div style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: "22px", letterSpacing: "0.08em", lineHeight: 1.1, color: "#fff" }}>
            {session.story.title}
          </div>
          <div style={{ fontSize: "11px", color: "#00e5c8", letterSpacing: "2px", textTransform: "uppercase", marginTop: "4px", fontFamily: "'Barlow Condensed', sans-serif" }}>
            {session.story.genre}
          </div>
        </div>

        <div style={{ padding: "16px 20px", borderBottom: "1px solid rgba(0,229,200,0.08)" }}>
          <div style={{ display: "flex", justifyContent: "space-between", fontSize: "11px", marginBottom: "8px" }}>
            <span style={{ color: "rgba(255,255,255,0.4)", fontFamily: "'Barlow Condensed', sans-serif", letterSpacing: "1px", textTransform: "uppercase" }}>Progress</span>
            <span style={{ color: "#00e5c8" }}>{nodes.length} nodes</span>
          </div>
          <div style={{ height: "3px", background: "rgba(255,255,255,0.08)", borderRadius: "2px", overflow: "hidden" }}>
            <div style={{ height: "100%", width: `${Math.min(100, (nodes.length / 20) * 100)}%`, background: "linear-gradient(to right, #00b8a0, #00e5c8)", borderRadius: "2px", transition: "width 0.5s" }} />
          </div>
        </div>

        <div style={{ flex: 1, overflow: "auto", padding: "16px 20px 20px" }} className="scrollbar-hide">
          <div style={{ fontSize: "10px", letterSpacing: "2px", color: "rgba(255,255,255,0.3)", marginBottom: "12px", fontFamily: "'Barlow Condensed', sans-serif", textTransform: "uppercase" }}>Your Path</div>
          <div style={{ display: "flex", flexDirection: "column", gap: "0" }}>
            {nodes.map((node, i) => (
              <div key={node.id} style={{ display: "flex", gap: "12px", alignItems: "flex-start" }}>
                <div style={{ display: "flex", flexDirection: "column", alignItems: "center", flexShrink: 0 }}>
                  <div style={{
                    width: "8px", height: "8px", borderRadius: "50%", flexShrink: 0, marginTop: "4px",
                    background: node.id === currentNode.id ? "#00e5c8" : i < nodes.indexOf(currentNode) ? "#00e5c8" : "rgba(255,255,255,0.2)",
                    boxShadow: node.id === currentNode.id ? "0 0 10px rgba(0,229,200,0.8)" : undefined,
                  }} />
                  {i < nodes.length - 1 && (
                    <div style={{ width: "1px", height: "30px", background: "rgba(0,229,200,0.15)", marginTop: "4px" }} />
                  )}
                </div>
                <div style={{ paddingBottom: "16px" }}>
                  <div style={{ fontSize: "10px", color: "rgba(255,255,255,0.35)", fontFamily: "'Barlow Condensed', sans-serif" }}>
                    {node.choiceMade ? (
                      <span style={{ color: "rgba(0,229,200,0.6)", fontSize: "10px" }}>"{node.choiceMade.slice(0, 40)}{node.choiceMade.length > 40 ? "..." : ""}"</span>
                    ) : (
                      <span style={{ color: "rgba(255,255,255,0.2)", fontStyle: "italic" }}>Opening</span>
                    )}
                  </div>
                  {node.id === currentNode.id && (
                    <div style={{ fontSize: "9px", color: "#00e5c8", letterSpacing: "1px", textTransform: "uppercase", fontFamily: "'Barlow Condensed', sans-serif", marginTop: "2px" }}>Current</div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      {/* CENTER — Story Text */}
      <div style={{ flex: 1, height: "100vh", overflow: "hidden auto", display: "flex", flexDirection: "column" }} className="scrollbar-hide">
        <div style={{
          position: "sticky", top: 0, zIndex: 20,
          background: "rgba(6,13,31,0.92)", backdropFilter: "blur(12px)",
          borderBottom: "1px solid rgba(0,229,200,0.1)",
          padding: "14px 32px",
          display: "flex", alignItems: "center", justifyContent: "space-between",
        }}>
          <div style={{ fontFamily: "'Barlow Condensed', sans-serif", fontSize: "13px", letterSpacing: "2px", color: "rgba(255,255,255,0.5)", textTransform: "uppercase" }}>
            Chapter {nodes.length}
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
            <div style={{ width: "6px", height: "6px", borderRadius: "50%", background: "#00e5c8", boxShadow: "0 0 8px rgba(0,229,200,0.8)" }} />
            <span style={{ fontSize: "11px", color: "rgba(255,255,255,0.4)", fontFamily: "'Barlow Condensed', sans-serif", letterSpacing: "1px", textTransform: "uppercase" }}>Live Narrative</span>
          </div>
        </div>

        <div style={{ padding: "40px 48px", flex: 1 }}>
          {previousNodes.map((node, i) => (
            <div key={node.id} style={{ marginBottom: "40px", opacity: 0.55 }}>
              {node.choiceMade && (
                <div style={{
                  marginBottom: "24px",
                  padding: "12px 20px",
                  background: "rgba(0,229,200,0.06)",
                  border: "1px solid rgba(0,229,200,0.15)",
                  borderLeft: "3px solid #00e5c8",
                  borderRadius: "0 6px 6px 0",
                  fontFamily: "'Barlow Condensed', sans-serif",
                  fontSize: "13px",
                  letterSpacing: "0.5px",
                  color: "rgba(0,229,200,0.8)",
                }}>
                  You chose: "{node.choiceMade}"
                </div>
              )}
              <div style={{
                fontFamily: "'Lora', Georgia, serif",
                fontSize: "17px",
                lineHeight: 1.9,
                color: "rgba(255,255,255,0.55)",
                whiteSpace: "pre-line",
              }}>
                {node.narrativeText}
              </div>
              {i < previousNodes.length - 1 && (
                <div style={{ margin: "28px auto 0", display: "flex", alignItems: "center", gap: "14px" }}>
                  <div style={{ flex: 1, height: "1px", background: "rgba(0,229,200,0.1)" }} />
                  <span style={{ fontSize: "10px", color: "rgba(0,229,200,0.3)", letterSpacing: "2px", fontFamily: "'Barlow Condensed', sans-serif" }}>✦</span>
                  <div style={{ flex: 1, height: "1px", background: "rgba(0,229,200,0.1)" }} />
                </div>
              )}
            </div>
          ))}

          {previousNodes.length > 0 && (
            <div style={{ margin: "28px auto 40px", display: "flex", alignItems: "center", gap: "14px" }}>
              <div style={{ flex: 1, height: "1px", background: "rgba(0,229,200,0.15)" }} />
              <span style={{ fontSize: "10px", color: "rgba(0,229,200,0.5)", letterSpacing: "2px", fontFamily: "'Barlow Condensed', sans-serif" }}>✦ ✦ ✦</span>
              <div style={{ flex: 1, height: "1px", background: "rgba(0,229,200,0.15)" }} />
            </div>
          )}

          {currentNode.choiceMade && (
            <div style={{
              marginBottom: "28px",
              padding: "12px 20px",
              background: "rgba(0,229,200,0.08)",
              border: "1px solid rgba(0,229,200,0.2)",
              borderLeft: "3px solid #00e5c8",
              borderRadius: "0 6px 6px 0",
              fontFamily: "'Barlow Condensed', sans-serif",
              fontSize: "14px",
              letterSpacing: "0.5px",
              color: "#00e5c8",
            }}>
              You chose: "{currentNode.choiceMade}"
            </div>
          )}

          <div style={{
            fontFamily: "'Lora', Georgia, serif",
            fontSize: "19px",
            lineHeight: 2,
            color: "rgba(255,255,255,0.92)",
            whiteSpace: "pre-line",
            minHeight: "200px",
          }}>
            {streamingText !== null ? streamingText : currentNode.narrativeText}
          </div>

          {choosing && streamingText === null && (
            <div style={{ display: "flex", alignItems: "center", gap: "12px", marginTop: "40px" }}>
              <div style={{ display: "flex", gap: "6px" }}>
                {[0, 1, 2].map(i => (
                  <div key={i} style={{ width: "8px", height: "8px", borderRadius: "50%", background: "#00e5c8", opacity: 0.6, animation: `pulse-dot 1.2s ${i * 0.18}s infinite` }} />
                ))}
              </div>
              <span style={{ fontFamily: "'Barlow Condensed', sans-serif", fontSize: "13px", letterSpacing: "2px", color: "rgba(0,229,200,0.7)", textTransform: "uppercase" }}>
                Writing your story…
              </span>
            </div>
          )}

          {storyComplete && !choosing && streamingText === null && (
            <div style={{ marginTop: "60px", textAlign: "center" }}>
              <div style={{ marginBottom: "24px", display: "flex", alignItems: "center", gap: "14px" }}>
                <div style={{ flex: 1, height: "1px", background: "rgba(0,229,200,0.2)" }} />
                <span style={{ fontSize: "18px", color: "#00e5c8" }}>✦</span>
                <div style={{ flex: 1, height: "1px", background: "rgba(0,229,200,0.2)" }} />
              </div>
              <div style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: "36px", letterSpacing: "4px", color: "#fff", marginBottom: "12px" }}>STORY COMPLETE</div>
              <div style={{ fontSize: "15px", color: "rgba(255,255,255,0.55)", marginBottom: "28px" }}>Your journey has reached its conclusion.</div>
              <div style={{ display: "flex", gap: "14px", justifyContent: "center" }}>
                <button
                  onClick={() => setLocation(`/story/${session.story.id}`)}
                  style={{ background: "#00e5c8", color: "#060d1f", border: "none", padding: "12px 28px", borderRadius: "4px", fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 700, fontSize: "14px", letterSpacing: "2px", textTransform: "uppercase", cursor: "pointer" }}
                >New Story</button>
                <button
                  onClick={() => setLocation("/home")}
                  style={{ background: "rgba(255,255,255,0.1)", color: "#fff", border: "1px solid rgba(255,255,255,0.2)", padding: "12px 28px", borderRadius: "4px", fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 700, fontSize: "14px", letterSpacing: "2px", textTransform: "uppercase", cursor: "pointer" }}
                >Browse Stories</button>
              </div>
            </div>
          )}
        </div>
      </div>
      {/* RIGHT SIDEBAR — Choices */}
      <div style={{
        width: "300px",
        flexShrink: 0,
        height: "100vh",
        overflow: "hidden auto",
        background: "#060d1f",
        borderLeft: "1px solid rgba(0,229,200,0.1)",
        display: "flex",
        flexDirection: "column",
      }} className="scrollbar-hide">
        <div style={{ padding: "18px 20px 16px", borderBottom: "1px solid rgba(0,229,200,0.1)" }}>
          <div style={{ fontSize: "11px", letterSpacing: "3px", color: "rgba(255,255,255,0.3)", textTransform: "uppercase", fontFamily: "'Barlow Condensed', sans-serif" }}>Your Choices</div>
        </div>

        <div style={{ flex: 1, padding: "20px 16px", display: "flex", flexDirection: "column", justifyContent: "center" }}>
          {!showChoices && !storyComplete && !choosing && (
            <div style={{ textAlign: "center", color: "rgba(255,255,255,0.2)", fontFamily: "'Barlow Condensed', sans-serif", fontSize: "13px", letterSpacing: "1px" }}>
              Reading...
            </div>
          )}

          {choosing && (
            <div style={{ textAlign: "center" }}>
              <div style={{ display: "flex", gap: "6px", justifyContent: "center", marginBottom: "12px" }}>
                {[0, 1, 2].map(i => (
                  <div key={i} style={{ width: "8px", height: "8px", borderRadius: "50%", background: "#00e5c8", opacity: 0.5, animation: `pulse-dot 1.2s ${i * 0.2}s infinite` }} />
                ))}
              </div>
              <div style={{ fontSize: "12px", color: "rgba(255,255,255,0.35)", fontFamily: "'Barlow Condensed', sans-serif", letterSpacing: "1px", textTransform: "uppercase" }}>Generating…</div>
            </div>
          )}

          {generationError && !choosing && (
            <div style={{
              background: "rgba(255,80,80,0.08)",
              border: "1px solid rgba(255,80,80,0.25)",
              borderRadius: "6px",
              padding: "14px 16px",
              marginBottom: "16px",
            }}>
              <div style={{ fontSize: "11px", color: "rgba(255,120,120,0.9)", fontFamily: "'Barlow Condensed', sans-serif", letterSpacing: "1.5px", textTransform: "uppercase", marginBottom: "6px" }}>
                Generation failed
              </div>
              <div style={{ fontSize: "13px", color: "rgba(255,255,255,0.55)", fontFamily: "'Barlow', sans-serif", lineHeight: 1.5 }}>
                {generationError}
              </div>
              <button
                onClick={() => setGenerationError(null)}
                style={{ marginTop: "10px", background: "none", border: "1px solid rgba(255,120,120,0.3)", borderRadius: "4px", padding: "6px 12px", color: "rgba(255,120,120,0.8)", fontFamily: "'Barlow Condensed', sans-serif", fontSize: "11px", letterSpacing: "1px", textTransform: "uppercase", cursor: "pointer" }}
              >
                Dismiss
              </button>
            </div>
          )}

          {choicesPanel}

          {storyComplete && (
            <div style={{ textAlign: "center", color: "rgba(0,229,200,0.6)", fontFamily: "'Barlow Condensed', sans-serif", fontSize: "14px", letterSpacing: "1px", textTransform: "uppercase" }}>
              Story Complete
            </div>
          )}
        </div>

        <div style={{ padding: "16px 20px", borderTop: "1px solid rgba(0,229,200,0.1)" }}>
          <div style={{ display: "flex", justifyContent: "space-between", fontSize: "11px", color: "rgba(255,255,255,0.3)", fontFamily: "'Barlow Condensed', sans-serif", letterSpacing: "1px", textTransform: "uppercase" }}>
            <span>Choices Made</span>
            <span style={{ color: "#00e5c8" }}>{nodes.length - 1}</span>
          </div>
          <div style={{ display: "flex", justifyContent: "space-between", fontSize: "11px", color: "rgba(255,255,255,0.3)", fontFamily: "'Barlow Condensed', sans-serif", letterSpacing: "1px", textTransform: "uppercase", marginTop: "8px" }}>
            <span>Story Nodes</span>
            <span style={{ color: "#00e5c8" }}>{nodes.length}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
