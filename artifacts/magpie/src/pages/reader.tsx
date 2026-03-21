import { useEffect, useState, useRef } from "react";
import { useParams, useLocation } from "wouter";
import { api, type StorySession, type StoryNode, type Choice } from "@/lib/api";
import { getAuthToken } from "@/lib/supabase";

function TypewriterText({ text, speed = 18, onDone }: { text: string; speed?: number; onDone?: () => void }) {
  const [displayed, setDisplayed] = useState("");
  const [idx, setIdx] = useState(0);
  const doneRef = useRef(false);

  useEffect(() => {
    setDisplayed("");
    setIdx(0);
    doneRef.current = false;
  }, [text]);

  useEffect(() => {
    if (idx >= text.length) {
      if (!doneRef.current) {
        doneRef.current = true;
        onDone?.();
      }
      return;
    }
    const timer = setTimeout(() => {
      setDisplayed(text.slice(0, idx + 1));
      setIdx(i => i + 1);
    }, speed);
    return () => clearTimeout(timer);
  }, [idx, text, speed, onDone]);

  return <>{displayed}</>;
}

export default function ReaderPage() {
  const { sessionId } = useParams<{ sessionId: string }>();
  const [, setLocation] = useLocation();

  const [session, setSession] = useState<StorySession | null>(null);
  const [nodes, setNodes] = useState<StoryNode[]>([]);
  const [currentNode, setCurrentNode] = useState<StoryNode | null>(null);
  const [loading, setLoading] = useState(true);
  const [choosing, setChoosing] = useState(false);
  const [chosenId, setChosenId] = useState<string | null>(null);
  const [textDone, setTextDone] = useState(false);
  const [showChoices, setShowChoices] = useState(false);
  const [storyComplete, setStoryComplete] = useState(false);
  const storyEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const token = getAuthToken();
    if (!token) { setLocation("/login"); return; }
    if (!sessionId) return;

    api.sessions.get(sessionId).then(data => {
      setSession(data.session);
      setNodes(data.nodes);
      setCurrentNode(data.currentNode);
      if (!data.currentNode || data.currentNode.choices.length === 0) {
        setStoryComplete(true);
      }
    }).catch(() => setLocation("/home")).finally(() => setLoading(false));
  }, [sessionId, setLocation]);

  const handleChoice = async (choice: Choice) => {
    if (!sessionId || choosing || chosenId) return;
    setChosenId(choice.id);
    setChoosing(true);
    setShowChoices(false);
    try {
      const newNode = await api.sessions.continue(sessionId, choice.id, choice.text);
      setNodes(prev => [...prev, newNode]);
      setCurrentNode(newNode);
      setTextDone(false);
      setChosenId(null);
      if (!newNode.choices || newNode.choices.length === 0) {
        setStoryComplete(true);
      }
    } catch {
      setChosenId(null);
    } finally {
      setChoosing(false);
    }
  };

  useEffect(() => {
    if (textDone && !storyComplete) {
      setTimeout(() => setShowChoices(true), 400);
    }
  }, [textDone, storyComplete]);

  useEffect(() => {
    if (storyEndRef.current) {
      storyEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [nodes, showChoices]);

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
        {/* Header */}
        <div style={{ padding: "20px 20px 16px", borderBottom: "1px solid rgba(0,229,200,0.1)" }}>
          <button
            onClick={() => setLocation("/home")}
            style={{ background: "none", border: "none", color: "#00e5c8", cursor: "pointer", fontSize: "12px", fontFamily: "'Barlow Condensed', sans-serif", letterSpacing: "2px", textTransform: "uppercase", padding: "0", marginBottom: "12px", display: "flex", alignItems: "center", gap: "6px" }}
          >
            ← HOME
          </button>
          <div style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: "22px", letterSpacing: "0.08em", lineHeight: 1.1, color: "#fff" }}>
            {session.story.title}
          </div>
          <div style={{ fontSize: "11px", color: "#00e5c8", letterSpacing: "2px", textTransform: "uppercase", marginTop: "4px", fontFamily: "'Barlow Condensed', sans-serif" }}>
            {session.story.genre}
          </div>
        </div>

        {/* Progress */}
        <div style={{ padding: "16px 20px", borderBottom: "1px solid rgba(0,229,200,0.08)" }}>
          <div style={{ display: "flex", justifyContent: "space-between", fontSize: "11px", marginBottom: "8px" }}>
            <span style={{ color: "rgba(255,255,255,0.4)", fontFamily: "'Barlow Condensed', sans-serif", letterSpacing: "1px", textTransform: "uppercase" }}>Progress</span>
            <span style={{ color: "#00e5c8" }}>{nodes.length} nodes</span>
          </div>
          <div style={{ height: "3px", background: "rgba(255,255,255,0.08)", borderRadius: "2px", overflow: "hidden" }}>
            <div style={{ height: "100%", width: `${Math.min(100, (nodes.length / 20) * 100)}%`, background: "linear-gradient(to right, #00b8a0, #00e5c8)", borderRadius: "2px", transition: "width 0.5s" }} />
          </div>
        </div>

        {/* Story path timeline */}
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
        {/* Top bar */}
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

        {/* Previous nodes */}
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

          {/* Divider before current */}
          {previousNodes.length > 0 && (
            <div style={{ margin: "28px auto 40px", display: "flex", alignItems: "center", gap: "14px" }}>
              <div style={{ flex: 1, height: "1px", background: "rgba(0,229,200,0.15)" }} />
              <span style={{ fontSize: "10px", color: "rgba(0,229,200,0.5)", letterSpacing: "2px", fontFamily: "'Barlow Condensed', sans-serif" }}>✦ ✦ ✦</span>
              <div style={{ flex: 1, height: "1px", background: "rgba(0,229,200,0.15)" }} />
            </div>
          )}

          {/* Current node choice made */}
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

          {/* CURRENT narrative — with typewriter */}
          <div style={{
            fontFamily: "'Lora', Georgia, serif",
            fontSize: "19px",
            lineHeight: 2,
            color: "rgba(255,255,255,0.92)",
            whiteSpace: "pre-line",
            minHeight: "200px",
          }}>
            <TypewriterText
              key={currentNode.id}
              text={currentNode.narrativeText}
              speed={14}
              onDone={() => setTextDone(true)}
            />
          </div>

          {/* Loading spinner when generating */}
          {choosing && (
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

          {storyComplete && !choosing && (
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

          <div ref={storyEndRef} style={{ height: "1px" }} />
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
        {/* Header */}
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

          {showChoices && currentNode.choices && currentNode.choices.length > 0 && (
            <div style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
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
                      e.currentTarget.style.transform = "translateX(4px)";
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
            </div>
          )}

          {storyComplete && (
            <div style={{ textAlign: "center", color: "rgba(0,229,200,0.6)", fontFamily: "'Barlow Condensed', sans-serif", fontSize: "14px", letterSpacing: "1px", textTransform: "uppercase" }}>
              Story Complete
            </div>
          )}
        </div>

        {/* Stats at bottom */}
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
