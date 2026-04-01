import { useState, useEffect, useCallback, useRef } from "react";
import { useLocation } from "wouter";
import { supabase, setAuthToken } from "@/lib/supabase";

export default function LoginPage() {
  const [, setLocation] = useLocation();
  const [mode, setMode] = useState<"signin" | "signup">("signin");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);
  const [error, setError] = useState("");

  const [forgotOpen, setForgotOpen] = useState(false);
  const [forgotEmail, setForgotEmail] = useState("");
  const [forgotLoading, setForgotLoading] = useState(false);
  const [forgotFeedback, setForgotFeedback] = useState<{ type: "success" | "error"; msg: string } | null>(null);
  const attemptsRef = useRef<number[]>([]);
  const [blockedUntil, setBlockedUntil] = useState<number | null>(null);
  const [countdown, setCountdown] = useState(0);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session?.access_token) {
        setAuthToken(session.access_token);
        setLocation("/home");
      }
    });
  }, [setLocation]);

  const handleGoogleAuth = async () => {
    setGoogleLoading(true);
    setError("");
    try {
      const { error: err } = await supabase.auth.signInWithOAuth({
        provider: "google",
        options: {
          redirectTo: window.location.origin + "/login",
        },
      });
      if (err) throw err;
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Google sign-in failed");
    } finally {
      setGoogleLoading(false);
    }
  };

  useEffect(() => {
    if (blockedUntil === null) return;
    const tick = () => {
      const remaining = Math.ceil((blockedUntil - Date.now()) / 1000);
      if (remaining <= 0) {
        setBlockedUntil(null);
        setCountdown(0);
      } else {
        setCountdown(remaining);
      }
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, [blockedUntil]);

  const openForgotModal = useCallback(() => {
    setForgotEmail("");
    setForgotFeedback(null);
    setForgotOpen(true);
  }, []);

  const handleForgotSubmit = useCallback(async (e: React.FormEvent) => {
    e.preventDefault();
    const now = Date.now();
    attemptsRef.current = attemptsRef.current.filter(t => now - t < 60000);
    if (attemptsRef.current.length >= 3) {
      const oldest = attemptsRef.current[0];
      const unblockAt = oldest + 60000;
      setBlockedUntil(unblockAt);
      setForgotFeedback({ type: "error", msg: "Too many attempts. Please wait." });
      return;
    }
    attemptsRef.current.push(now);

    setForgotLoading(true);
    setForgotFeedback(null);
    try {
      const { error: err } = await supabase.auth.resetPasswordForEmail(forgotEmail, {
        redirectTo: window.location.origin + "/reset-password",
      });
      if (err) throw err;
      setForgotFeedback({ type: "success", msg: "Password reset email sent. Check your inbox." });
    } catch (err: unknown) {
      setForgotFeedback({ type: "error", msg: err instanceof Error ? err.message : "Failed to send reset email" });
    } finally {
      setForgotLoading(false);
    }
  }, [forgotEmail]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      if (mode === "signup") {
        const { data, error: err } = await supabase.auth.signUp({
          email,
          password,
          options: {
            data: {
              display_name: `${firstName} ${lastName}`.trim(),
            }
          }
        });
        if (err) throw err;
        if (data.session?.access_token) {
          setAuthToken(data.session.access_token);
          setLocation("/home");
        } else {
          setError("Account created! Please check your email to verify.");
        }
      } else {
        const { data, error: err } = await supabase.auth.signInWithPassword({ email, password });
        if (err) throw err;
        if (data.session?.access_token) {
          setAuthToken(data.session.access_token);
          setLocation("/home");
        }
      }
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Authentication failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ background: "#020617", minHeight: "100vh", display: "flex", flexDirection: "column" }}>
      {/* Background glows */}
      <div style={{ position: "fixed", inset: 0, zIndex: 0, overflow: "hidden" }}>
        <div style={{ position: "absolute", width: "700px", height: "700px", background: "radial-gradient(circle, rgba(104,230,197,0.08) 0%, transparent 70%)", top: "-180px", left: "-180px", borderRadius: "50%" }} />
        <div style={{ position: "absolute", width: "600px", height: "600px", background: "radial-gradient(circle, rgba(79,152,216,0.08) 0%, transparent 70%)", bottom: "-120px", right: "-120px", borderRadius: "50%" }} />
      </div>

      {/* Navbar */}
      <header style={{
        position: "fixed", top: 0, width: "100%", zIndex: 50,
        background: "rgba(2, 6, 23, 0.85)", backdropFilter: "blur(12px)",
        borderBottom: "1px solid rgba(255,255,255,0.10)",
      }}>
        <div style={{
          maxWidth: "1280px", margin: "0 auto", padding: "16px 24px",
          display: "flex", alignItems: "center", justifyContent: "center",
        }}>
          <a href="/" style={{ display: "flex", alignItems: "center", gap: "10px", textDecoration: "none" }}>
            <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
              <rect width="32" height="32" rx="6" fill="#00e5c8" opacity="0.15"/>
              <path d="M8 22 L16 8 L24 22" stroke="#00e5c8" strokeWidth="2.5" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
              <circle cx="16" cy="8" r="3" fill="#00e5c8"/>
            </svg>
            <span style={{
              fontFamily: "'Bebas Neue', sans-serif", fontSize: "1.875rem", letterSpacing: "0.16em",
              background: "linear-gradient(90deg, #68e6c5, #59ced1, #4f98d8)",
              WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text",
            }}>MAGPIE</span>
          </a>
        </div>
      </header>

      {/* Auth card */}
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
            {/* Header */}
            <div style={{ textAlign: "center", marginBottom: "24px" }}>
              <h1 style={{
                fontFamily: "'Bebas Neue', sans-serif",
                fontSize: "2.6rem", letterSpacing: "0.07em",
                color: "#fff", lineHeight: 1, marginBottom: "8px",
              }}>
                {mode === "signin" ? "Welcome Back" : "Join Magpie"}
              </h1>
              <p style={{ fontSize: "0.8125rem", color: "#64748b", fontWeight: 500, fontFamily: "'Montserrat', sans-serif" }}>
                {mode === "signin"
                  ? "Don't have an account? "
                  : "Already have an account? "}
                <button
                  onClick={() => { setMode(mode === "signin" ? "signup" : "signin"); setError(""); }}
                  style={{ background: "none", border: "none", color: "#68e6c5", fontWeight: 700, cursor: "pointer", fontFamily: "'Montserrat', sans-serif", fontSize: "0.8125rem" }}
                >
                  {mode === "signin" ? "Sign Up" : "Sign In"}
                </button>
              </p>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit}>
              {mode === "signup" && (
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px", marginBottom: "14px" }}>
                  <div>
                    <label style={{ display: "block", fontSize: "0.69rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.12em", color: "#8fa8c0", marginBottom: "6px", fontFamily: "'Montserrat', sans-serif" }}>First Name</label>
                    <div style={{ position: "relative" }}>
                      <span style={{ position: "absolute", left: "12px", top: "50%", transform: "translateY(-50%)", color: "#7ea3bf" }}>
                        <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>
                      </span>
                      <input
                        type="text"
                        value={firstName}
                        onChange={e => setFirstName(e.target.value)}
                        placeholder="John"
                        required
                        style={inputStyle}
                      />
                    </div>
                  </div>
                  <div>
                    <label style={{ display: "block", fontSize: "0.69rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.12em", color: "#8fa8c0", marginBottom: "6px", fontFamily: "'Montserrat', sans-serif" }}>Last Name</label>
                    <div style={{ position: "relative" }}>
                      <span style={{ position: "absolute", left: "12px", top: "50%", transform: "translateY(-50%)", color: "#7ea3bf" }}>
                        <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>
                      </span>
                      <input
                        type="text"
                        value={lastName}
                        onChange={e => setLastName(e.target.value)}
                        placeholder="Doe"
                        required
                        style={inputStyle}
                      />
                    </div>
                  </div>
                </div>
              )}

              <div style={{ marginBottom: "14px" }}>
                <label style={labelStyle}>Email</label>
                <div style={{ position: "relative" }}>
                  <span style={iconStyle}><svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg></span>
                  <input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="you@example.com" required style={inputStyle} />
                </div>
              </div>

              <div style={{ marginBottom: "18px" }}>
                <label style={labelStyle}>Password</label>
                <div style={{ position: "relative" }}>
                  <span style={iconStyle}><svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" /></svg></span>
                  <input
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    placeholder="••••••••"
                    required
                    minLength={6}
                    style={inputStyle}
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
                disabled={loading}
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
                  cursor: loading ? "not-allowed" : "pointer",
                  opacity: loading ? 0.7 : 1,
                  boxShadow: "0 4px 24px rgba(107,231,197,0.22)",
                  transition: "transform 0.25s, opacity 0.25s",
                  marginBottom: "16px",
                }}
              >
                {loading ? "Please wait..." : mode === "signin" ? "Sign In" : "Create Account"}
              </button>

              <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "16px" }}>
                <div style={{ flex: 1, height: "1px", background: "rgba(255,255,255,0.10)" }} />
                <span style={{ fontSize: "0.72rem", color: "#3a4e63", fontFamily: "'Montserrat', sans-serif", fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase" }}>or</span>
                <div style={{ flex: 1, height: "1px", background: "rgba(255,255,255,0.10)" }} />
              </div>

              <button
                type="button"
                onClick={handleGoogleAuth}
                disabled={googleLoading}
                style={{
                  width: "100%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "10px",
                  background: "rgba(8, 18, 40, 0.65)",
                  border: "1px solid rgba(255,255,255,0.12)",
                  borderRadius: "8px",
                  padding: "11px 24px",
                  color: "#e2e8f0",
                  fontFamily: "'Montserrat', sans-serif",
                  fontSize: "0.875rem",
                  fontWeight: 600,
                  cursor: googleLoading ? "not-allowed" : "pointer",
                  opacity: googleLoading ? 0.7 : 1,
                  transition: "border-color 0.2s, opacity 0.25s",
                  marginBottom: "16px",
                }}
              >
                <svg width="18" height="18" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                  <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                  <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" fill="#FBBC05"/>
                  <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                </svg>
                {googleLoading ? "Redirecting..." : "Continue with Google"}
              </button>

              {mode === "signin" && (
                <p style={{ textAlign: "center", marginBottom: "12px" }}>
                  <button
                    type="button"
                    onClick={openForgotModal}
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
                    Forgot Password?
                  </button>
                </p>
              )}

              <p style={{ textAlign: "center", fontSize: "0.7rem", color: "#3a4e63", fontFamily: "'Montserrat', sans-serif" }}>
                By continuing, you agree to our{" "}
                <a href="#" style={{ color: "#68e6c5", textDecoration: "none" }}>Terms of Service</a>
                {" "}and{" "}
                <a href="#" style={{ color: "#68e6c5", textDecoration: "none" }}>Privacy Policy</a>
              </p>
            </form>
          </div>
        </div>
      </div>

      <footer style={{ position: "relative", zIndex: 1, textAlign: "center", padding: "14px 24px 24px", borderTop: "1px solid rgba(255,255,255,0.04)" }}>
        <p style={{ fontSize: "0.72rem", color: "#1a2a3a", fontFamily: "'Montserrat', sans-serif" }}>
          © 2026 Magpie · <a href="#" style={{ color: "#253a4f", textDecoration: "none" }}>Privacy</a> · <a href="#" style={{ color: "#253a4f", textDecoration: "none" }}>Terms</a>
        </p>
      </footer>

      {forgotOpen && (
        <div
          onClick={() => setForgotOpen(false)}
          style={{
            position: "fixed", inset: 0, zIndex: 100,
            background: "rgba(0,0,0,0.6)", backdropFilter: "blur(6px)",
            display: "flex", alignItems: "center", justifyContent: "center",
            padding: "24px",
          }}
        >
          <div
            onClick={e => e.stopPropagation()}
            style={{
              width: "100%", maxWidth: "420px",
              background: "rgba(15, 23, 42, 0.92)",
              border: "1px solid rgba(255,255,255,0.10)",
              borderRadius: "18px",
              padding: "32px 36px",
              backdropFilter: "blur(20px)",
              boxShadow: "0 24px 64px rgba(0,0,0,0.55), 0 0 0 1px rgba(104,230,197,0.05)",
            }}
          >
            <h2 style={{
              fontFamily: "'Bebas Neue', sans-serif",
              fontSize: "2rem", letterSpacing: "0.07em",
              color: "#fff", lineHeight: 1, marginBottom: "8px", textAlign: "center",
            }}>
              Reset Password
            </h2>
            <p style={{
              fontSize: "0.8rem", color: "#64748b", fontWeight: 500,
              fontFamily: "'Montserrat', sans-serif", textAlign: "center", marginBottom: "20px",
            }}>
              Enter your email and we'll send you a reset link.
            </p>

            <form onSubmit={handleForgotSubmit}>
              <div style={{ marginBottom: "16px" }}>
                <label style={labelStyle}>Email</label>
                <div style={{ position: "relative" }}>
                  <span style={iconStyle}>
                    <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </span>
                  <input
                    type="email"
                    value={forgotEmail}
                    onChange={e => setForgotEmail(e.target.value)}
                    placeholder="you@example.com"
                    required
                    autoFocus
                    style={inputStyle}
                  />
                </div>
              </div>

              {forgotFeedback && (
                <div style={{
                  marginBottom: "14px", padding: "10px 14px",
                  background: forgotFeedback.type === "success" ? "rgba(104,230,197,0.1)" : "rgba(220,38,38,0.1)",
                  border: `1px solid ${forgotFeedback.type === "success" ? "rgba(104,230,197,0.3)" : "rgba(220,38,38,0.3)"}`,
                  borderRadius: "8px", fontSize: "0.8rem",
                  color: forgotFeedback.type === "success" ? "#68e6c5" : "#fca5a5",
                  fontFamily: "'Montserrat', sans-serif",
                }}>
                  {forgotFeedback.msg}
                </div>
              )}

              {blockedUntil !== null && countdown > 0 && (
                <div style={{
                  marginBottom: "14px", padding: "10px 14px",
                  background: "rgba(234,179,8,0.08)",
                  border: "1px solid rgba(234,179,8,0.25)",
                  borderRadius: "8px", fontSize: "0.8rem",
                  color: "#fbbf24",
                  fontFamily: "'Montserrat', sans-serif", textAlign: "center",
                }}>
                  Try again in {countdown}s
                </div>
              )}

              <button
                type="submit"
                disabled={forgotLoading || (blockedUntil !== null && countdown > 0)}
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
                  cursor: (forgotLoading || (blockedUntil !== null && countdown > 0)) ? "not-allowed" : "pointer",
                  opacity: (forgotLoading || (blockedUntil !== null && countdown > 0)) ? 0.5 : 1,
                  boxShadow: "0 4px 24px rgba(107,231,197,0.22)",
                  transition: "transform 0.25s, opacity 0.25s",
                  marginBottom: "12px",
                }}
              >
                {forgotLoading ? "Sending..." : "Send Reset Link"}
              </button>

              <button
                type="button"
                onClick={() => setForgotOpen(false)}
                style={{
                  width: "100%", background: "none", border: "1px solid rgba(255,255,255,0.10)",
                  borderRadius: "8px", padding: "10px 24px",
                  color: "#8fa8c0", fontFamily: "'Montserrat', sans-serif",
                  fontSize: "0.8rem", fontWeight: 600, cursor: "pointer",
                  transition: "border-color 0.2s",
                }}
              >
                Cancel
              </button>
            </form>
          </div>
        </div>
      )}
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
