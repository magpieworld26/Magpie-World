import { useEffect, useState } from "react";
import { useLocation } from "wouter";
import { supabase } from "@/lib/supabase";
import birdLogo from "@assets/image_1774626827305.png";

export default function SignupPage() {
  const [, setLocation] = useLocation();
  const [status, setStatus] = useState<"loading" | "success" | "error">("loading");
  const [errorMsg, setErrorMsg] = useState("");

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const error = params.get("error");
    const errorDescription = params.get("error_description");
    const tokenHash = params.get("token_hash");
    const type = params.get("type");

    if (error) {
      setStatus("error");
      setErrorMsg(errorDescription || error);
      return;
    }

    if (!tokenHash || type !== "signup") {
      setStatus("error");
      setErrorMsg("Invalid or missing confirmation link. Please sign up again.");
      return;
    }

    supabase.auth
      .verifyOtp({ token_hash: tokenHash, type: "signup" })
      .then(({ error: verifyError }) => {
        if (verifyError) {
          setStatus("error");
          setErrorMsg(verifyError.message || "Email confirmation failed. The link may have expired.");
        } else {
          setStatus("success");
          setTimeout(() => setLocation("/home"), 2500);
        }
      });
  }, [setLocation]);

  return (
    <div style={{ background: "#020617", minHeight: "100vh", display: "flex", flexDirection: "column" }}>
      <div style={{ position: "fixed", inset: 0, zIndex: 0, overflow: "hidden" }}>
        <div style={{ position: "absolute", width: "700px", height: "700px", background: "radial-gradient(circle, rgba(104,230,197,0.08) 0%, transparent 70%)", top: "-180px", left: "-180px", borderRadius: "50%" }} />
        <div style={{ position: "absolute", width: "600px", height: "600px", background: "radial-gradient(circle, rgba(79,152,216,0.08) 0%, transparent 70%)", bottom: "-120px", right: "-120px", borderRadius: "50%" }} />
      </div>

      <header style={{
        position: "fixed", top: 0, width: "100%", zIndex: 50,
        background: "rgba(2, 6, 23, 0.85)", backdropFilter: "blur(12px)",
        borderBottom: "1px solid rgba(255,255,255,0.10)",
      }}>
        <div style={{ maxWidth: "1280px", margin: "0 auto", padding: "16px 24px", display: "flex", alignItems: "center" }}>
          <a href="/" style={{ display: "flex", alignItems: "center", gap: "10px", textDecoration: "none" }}>
            <img src={birdLogo} alt="Magpie logo" style={{ height: "38px", width: "auto" }} />
            <span style={{
              fontFamily: "'Bebas Neue', sans-serif", fontSize: "1.875rem", letterSpacing: "0.16em",
              background: "linear-gradient(90deg, #68e6c5, #59ced1, #4f98d8)",
              WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text",
            }}>MAGPIE</span>
          </a>
        </div>
      </header>

      <div style={{
        position: "relative", zIndex: 1, flex: 1,
        display: "flex", alignItems: "center", justifyContent: "center",
        padding: "90px 24px 40px",
      }}>
        <div style={{ width: "100%", maxWidth: "480px" }}>
          <div style={{
            width: "100%",
            background: "rgba(15, 23, 42, 0.72)",
            border: "1px solid rgba(255,255,255,0.10)",
            borderRadius: "18px",
            padding: "44px 44px",
            backdropFilter: "blur(20px)",
            boxShadow: "0 24px 64px rgba(0,0,0,0.45), 0 0 0 1px rgba(104,230,197,0.05)",
            textAlign: "center",
          }}>
            {status === "loading" && (
              <>
                <div style={{
                  width: "48px", height: "48px", borderRadius: "50%",
                  border: "3px solid rgba(104,230,197,0.2)",
                  borderTopColor: "#68e6c5",
                  animation: "spin 0.9s linear infinite",
                  margin: "0 auto 20px",
                }} />
                <h1 style={{
                  fontFamily: "'Bebas Neue', sans-serif",
                  fontSize: "2.2rem", letterSpacing: "0.07em",
                  color: "#fff", lineHeight: 1, marginBottom: "10px",
                }}>Confirming Email</h1>
                <p style={{ fontSize: "0.82rem", color: "#64748b", fontFamily: "'Montserrat', sans-serif", fontWeight: 500 }}>
                  Please wait while we verify your email address…
                </p>
              </>
            )}

            {status === "success" && (
              <>
                <div style={{
                  width: "52px", height: "52px", borderRadius: "50%",
                  background: "rgba(104,230,197,0.12)",
                  border: "1px solid rgba(104,230,197,0.3)",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  margin: "0 auto 20px",
                }}>
                  <svg width="26" height="26" fill="none" stroke="#68e6c5" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h1 style={{
                  fontFamily: "'Bebas Neue', sans-serif",
                  fontSize: "2.2rem", letterSpacing: "0.07em",
                  color: "#fff", lineHeight: 1, marginBottom: "10px",
                }}>Email Confirmed!</h1>
                <p style={{ fontSize: "0.82rem", color: "#64748b", fontFamily: "'Montserrat', sans-serif", fontWeight: 500 }}>
                  Your account is ready. Redirecting you now…
                </p>
              </>
            )}

            {status === "error" && (
              <>
                <div style={{
                  width: "52px", height: "52px", borderRadius: "50%",
                  background: "rgba(220,38,38,0.1)",
                  border: "1px solid rgba(220,38,38,0.3)",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  margin: "0 auto 20px",
                }}>
                  <svg width="26" height="26" fill="none" stroke="#f87171" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </div>
                <h1 style={{
                  fontFamily: "'Bebas Neue', sans-serif",
                  fontSize: "2.2rem", letterSpacing: "0.07em",
                  color: "#fff", lineHeight: 1, marginBottom: "10px",
                }}>Confirmation Failed</h1>
                <p style={{
                  fontSize: "0.82rem", color: "#fca5a5",
                  fontFamily: "'Montserrat', sans-serif", fontWeight: 500,
                  marginBottom: "20px",
                }}>
                  {errorMsg}
                </p>
                <a
                  href="/login"
                  style={{
                    display: "inline-block",
                    background: "linear-gradient(90deg, #6be7c5, #4ea7d8)",
                    color: "#07111e",
                    fontFamily: "'Montserrat', sans-serif",
                    fontSize: "0.85rem",
                    fontWeight: 800,
                    textTransform: "uppercase",
                    letterSpacing: "0.1em",
                    padding: "10px 28px",
                    borderRadius: "8px",
                    textDecoration: "none",
                    boxShadow: "0 4px 24px rgba(107,231,197,0.22)",
                  }}
                >
                  Back to Login
                </a>
              </>
            )}
          </div>
        </div>
      </div>

      <style>{`
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
}
