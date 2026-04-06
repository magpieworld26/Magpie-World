import { useEffect, useState } from "react";
import { useLocation } from "wouter";
import { supabase } from "@/lib/supabase";
import birdLogo from "@assets/image_1774626827305.png";

export default function RecoverPage() {
  const [, setLocation] = useLocation();
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [sessionReady, setSessionReady] = useState(false);
  const [sessionError, setSessionError] = useState("");

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const tokenHash = params.get("token_hash");
    const typeParam = params.get("type");

    const hashParams = new URLSearchParams(window.location.hash.replace(/^#/, ""));
    const hashAccessToken = hashParams.get("access_token");
    const hashRefreshToken = hashParams.get("refresh_token");
    const hashType = hashParams.get("type");

    if (tokenHash && typeParam === "recovery") {
      supabase.auth
        .verifyOtp({ token_hash: tokenHash, type: "recovery" })
        .then(({ error }) => {
          if (error) {
            setSessionError(error.message || "Recovery link is invalid or expired.");
          } else {
            setSessionReady(true);
          }
        });
    } else if (hashType === "recovery" && hashAccessToken && hashRefreshToken) {
      supabase.auth
        .setSession({ access_token: hashAccessToken, refresh_token: hashRefreshToken })
        .then(({ error }) => {
          if (error) {
            setSessionError(error.message || "Recovery link is invalid or expired.");
          } else {
            setSessionReady(true);
          }
        });
    } else {
      supabase.auth.getSession().then(({ data: { session } }) => {
        if (session) {
          setSessionReady(true);
        } else {
          setSessionError("No valid recovery session found. Please request a new password reset.");
        }
      });
    }
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (password.length < 6) {
      setError("Password must be at least 6 characters.");
      return;
    }
    setError("");
    setLoading(true);
    try {
      const { error: err } = await supabase.auth.updateUser({ password });
      if (err) throw err;
      setSuccess(true);
      setTimeout(() => setLocation("/login"), 2500);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Failed to update password.");
    } finally {
      setLoading(false);
    }
  };

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
            padding: "36px 44px",
            backdropFilter: "blur(20px)",
            boxShadow: "0 24px 64px rgba(0,0,0,0.45), 0 0 0 1px rgba(104,230,197,0.05)",
          }}>
            {sessionError ? (
              <div style={{ textAlign: "center" }}>
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
                }}>Link Expired</h1>
                <p style={{ fontSize: "0.82rem", color: "#fca5a5", fontFamily: "'Montserrat', sans-serif", fontWeight: 500, marginBottom: "20px" }}>
                  {sessionError}
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
              </div>
            ) : success ? (
              <div style={{ textAlign: "center" }}>
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
                }}>Password Updated</h1>
                <p style={{ fontSize: "0.82rem", color: "#64748b", fontFamily: "'Montserrat', sans-serif", fontWeight: 500 }}>
                  Your password has been changed. Redirecting to login…
                </p>
              </div>
            ) : (
              <>
                <div style={{ textAlign: "center", marginBottom: "24px" }}>
                  <h1 style={{
                    fontFamily: "'Bebas Neue', sans-serif",
                    fontSize: "2.6rem", letterSpacing: "0.07em",
                    color: "#fff", lineHeight: 1, marginBottom: "8px",
                  }}>Set New Password</h1>
                  <p style={{ fontSize: "0.8125rem", color: "#64748b", fontWeight: 500, fontFamily: "'Montserrat', sans-serif" }}>
                    Choose a strong password for your account.
                  </p>
                </div>

                {!sessionReady && !sessionError && (
                  <div style={{ textAlign: "center", marginBottom: "20px" }}>
                    <div style={{
                      width: "36px", height: "36px", borderRadius: "50%",
                      border: "3px solid rgba(104,230,197,0.2)",
                      borderTopColor: "#68e6c5",
                      animation: "spin 0.9s linear infinite",
                      margin: "0 auto",
                    }} />
                  </div>
                )}

                <form onSubmit={handleSubmit}>
                  <div style={{ marginBottom: "18px" }}>
                    <label style={labelStyle}>New Password</label>
                    <div style={{ position: "relative" }}>
                      <span style={iconStyle}>
                        <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                        </svg>
                      </span>
                      <input
                        type={showPassword ? "text" : "password"}
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                        placeholder="••••••••"
                        required
                        minLength={6}
                        disabled={!sessionReady}
                        style={{
                          ...inputStyle,
                          opacity: sessionReady ? 1 : 0.5,
                        }}
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        style={{ position: "absolute", right: "11px", top: "50%", transform: "translateY(-50%)", background: "none", border: "none", color: "#4a6278", cursor: "pointer" }}
                      >
                        {showPassword ? "👁" : "👁‍🗨"}
                      </button>
                    </div>
                  </div>

                  {error && (
                    <div style={{ marginBottom: "16px", padding: "10px 14px", background: "rgba(220,38,38,0.1)", border: "1px solid rgba(220,38,38,0.3)", borderRadius: "8px", fontSize: "0.8rem", color: "#fca5a5", fontFamily: "'Montserrat', sans-serif" }}>
                      {error}
                    </div>
                  )}

                  <button
                    type="submit"
                    disabled={loading || !sessionReady}
                    style={{
                      width: "100%",
                      background: "linear-gradient(90deg, #6be7c5, #4ea7d8)",
                      color: "#07111e",
                      fontFamily: "'Montserrat', sans-serif",
                      fontSize: "0.9rem",
                      fontWeight: 800,
                      textTransform: "uppercase",
                      letterSpacing: "0.1em",
                      padding: "12px 24px",
                      borderRadius: "8px",
                      border: "none",
                      cursor: (loading || !sessionReady) ? "not-allowed" : "pointer",
                      opacity: (loading || !sessionReady) ? 0.7 : 1,
                      boxShadow: "0 4px 24px rgba(107,231,197,0.22)",
                      transition: "transform 0.25s, opacity 0.25s",
                      marginBottom: "16px",
                    }}
                  >
                    {loading ? "Updating…" : "Update Password"}
                  </button>

                  <p style={{ textAlign: "center", marginTop: "4px" }}>
                    <a
                      href="/login"
                      style={{
                        background: "none",
                        border: "none",
                        color: "#68e6c5",
                        fontWeight: 600,
                        cursor: "pointer",
                        fontFamily: "'Montserrat', sans-serif",
                        fontSize: "0.78rem",
                        textDecoration: "none",
                      }}
                    >
                      Back to Login
                    </a>
                  </p>
                </form>
              </>
            )}
          </div>
        </div>
      </div>

      <footer style={{ position: "relative", zIndex: 1, textAlign: "center", padding: "14px 24px 24px", borderTop: "1px solid rgba(255,255,255,0.04)" }}>
        <p style={{ fontSize: "0.72rem", color: "#1a2a3a", fontFamily: "'Montserrat', sans-serif" }}>
          © 2026 Magpie · <a href="#" style={{ color: "#253a4f", textDecoration: "none" }}>Privacy</a> · <a href="#" style={{ color: "#253a4f", textDecoration: "none" }}>Terms</a>
        </p>
      </footer>

      <style>{`
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
}

const inputStyle: React.CSSProperties = {
  width: "100%",
  background: "rgba(8, 18, 40, 0.65)",
  border: "1px solid rgba(255,255,255,0.12)",
  borderRadius: "8px",
  padding: "10px 42px 10px 40px",
  color: "#e2e8f0",
  fontFamily: "'Montserrat', sans-serif",
  fontSize: "0.855rem",
  fontWeight: 500,
  outline: "none",
};

const labelStyle: React.CSSProperties = {
  display: "block",
  fontSize: "0.69rem",
  fontWeight: 700,
  textTransform: "uppercase",
  letterSpacing: "0.12em",
  color: "#8fa8c0",
  marginBottom: "6px",
  fontFamily: "'Montserrat', sans-serif",
};

const iconStyle: React.CSSProperties = {
  position: "absolute",
  left: "12px",
  top: "50%",
  transform: "translateY(-50%)",
  color: "#7ea3bf",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
};
