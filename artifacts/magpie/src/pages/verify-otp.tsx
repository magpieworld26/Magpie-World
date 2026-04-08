import { useState, useEffect, useRef } from "react";
import { useLocation } from "wouter";
import { supabase, setAuthToken } from "@/lib/supabase";
import birdLogo from "@assets/image_1774626827305.png";
import { useWindowWidth } from "@/hooks/use-mobile";

const RESEND_COOLDOWN = 60;

export default function VerifyOtpPage() {
  const [, setLocation] = useLocation();
  const { isMobile } = useWindowWidth();

  const params = new URLSearchParams(window.location.search);
  const email = params.get("email") || "";
  const rawType = params.get("type");
  const type = (rawType === "signup" || rawType === "recovery" ? rawType : null) as "signup" | "recovery" | null;

  useEffect(() => {
    if (!email || !type) {
      setLocation("/login");
    }
  }, [email, type, setLocation]);

  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [secondsLeft, setSecondsLeft] = useState(RESEND_COOLDOWN);
  const [resendLoading, setResendLoading] = useState(false);
  const [resendMsg, setResendMsg] = useState("");

  useEffect(() => {
    if (secondsLeft <= 0) return;
    const id = setInterval(() => {
      setSecondsLeft(s => {
        if (s <= 1) { clearInterval(id); return 0; }
        return s - 1;
      });
    }, 1000);
    return () => clearInterval(id);
  }, [secondsLeft]);

  const handleOtpChange = (index: number, value: string) => {
    const digit = value.replace(/\D/g, "").slice(-1);
    const next = [...otp];
    next[index] = digit;
    setOtp(next);
    setError("");
    if (digit && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    const pasted = e.clipboardData.getData("text").replace(/\D/g, "").slice(0, 6);
    if (pasted.length === 6) {
      setOtp(pasted.split(""));
      setError("");
      inputRefs.current[5]?.focus();
    }
    e.preventDefault();
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const token = otp.join("");
    if (token.length < 6) {
      setError("Please enter all 6 digits.");
      return;
    }
    setError("");
    setLoading(true);
    try {
      const verifyType = type ?? "signup";
      const { data, error: err } = await supabase.auth.verifyOtp({ email, token, type: verifyType });
      if (err) {
        setError("Incorrect OTP. Please try again.");
        return;
      }
      if (data.session?.access_token) {
        setAuthToken(data.session.access_token);
      }
      if (verifyType === "signup") {
        setLocation("/home");
      } else {
        setLocation("/recover");
      }
    } catch {
      setError("Incorrect OTP. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleResend = async () => {
    setResendMsg("");
    setResendLoading(true);
    try {
      if ((type ?? "signup") === "signup") {
        const { error: err } = await supabase.auth.resend({ type: "signup", email });
        if (err) throw err;
      } else {
        const { error: err } = await supabase.auth.resetPasswordForEmail(email);
        if (err) throw err;
      }
      setResendMsg("A new code has been sent.");
      setSecondsLeft(RESEND_COOLDOWN);
    } catch {
      setResendMsg("Failed to resend. Please try again.");
    } finally {
      setResendLoading(false);
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
            <div style={{ textAlign: "center", marginBottom: "24px" }}>
              <div style={{
                width: "52px", height: "52px", borderRadius: "50%",
                background: "rgba(104,230,197,0.10)",
                border: "1px solid rgba(104,230,197,0.25)",
                display: "flex", alignItems: "center", justifyContent: "center",
                margin: "0 auto 16px",
              }}>
                <svg width="24" height="24" fill="none" stroke="#68e6c5" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <h1 style={{
                fontFamily: "'Bebas Neue', sans-serif",
                fontSize: "2.4rem", letterSpacing: "0.07em",
                color: "#fff", lineHeight: 1, marginBottom: "8px",
              }}>
                Check Your Email
              </h1>
              <p style={{ fontSize: "0.8125rem", color: "#64748b", fontWeight: 500, fontFamily: "'Montserrat', sans-serif", lineHeight: 1.5 }}>
                We sent a 6-digit code to
              </p>
              <p style={{ fontSize: "0.85rem", color: "#8fa8c0", fontWeight: 700, fontFamily: "'Montserrat', sans-serif", marginTop: "2px" }}>
                {email || "your email"}
              </p>
            </div>

            <form onSubmit={handleSubmit}>
              <div style={{ marginBottom: "20px" }}>
                <label style={{
                  display: "block",
                  fontSize: "0.69rem",
                  fontWeight: 700,
                  textTransform: "uppercase",
                  letterSpacing: "0.12em",
                  color: "#8fa8c0",
                  marginBottom: "12px",
                  fontFamily: "'Montserrat', sans-serif",
                  textAlign: "center",
                }}>
                  Enter Verification Code
                </label>
                <div style={{ display: "flex", gap: isMobile ? "6px" : "10px", justifyContent: "center" }}>
                  {otp.map((digit, i) => (
                    <input
                      key={i}
                      ref={el => { inputRefs.current[i] = el; }}
                      type="text"
                      inputMode="numeric"
                      maxLength={1}
                      value={digit}
                      onChange={e => handleOtpChange(i, e.target.value)}
                      onKeyDown={e => handleKeyDown(i, e)}
                      onPaste={handlePaste}
                      autoFocus={i === 0}
                      style={{
                        width: isMobile ? "40px" : "48px",
                        height: isMobile ? "48px" : "56px",
                        background: "rgba(8, 18, 40, 0.65)",
                        border: `1px solid ${digit ? "rgba(104,230,197,0.4)" : "rgba(255,255,255,0.12)"}`,
                        borderRadius: "10px",
                        color: "#e2e8f0",
                        fontFamily: "'Montserrat', sans-serif",
                        fontSize: "1.4rem",
                        fontWeight: 700,
                        textAlign: "center",
                        outline: "none",
                        transition: "border-color 0.2s",
                        caretColor: "#68e6c5",
                      }}
                    />
                  ))}
                </div>
              </div>

              {error && (
                <div style={{
                  marginBottom: "16px", padding: "10px 14px",
                  background: "rgba(220,38,38,0.1)",
                  border: "1px solid rgba(220,38,38,0.3)",
                  borderRadius: "8px", fontSize: "0.8rem",
                  color: "#fca5a5", fontFamily: "'Montserrat', sans-serif",
                  textAlign: "center",
                }}>
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
                {loading ? "Verifying…" : "Verify OTP"}
              </button>
            </form>

            <div style={{ textAlign: "center" }}>
              {resendMsg && (
                <p style={{
                  fontSize: "0.78rem",
                  color: resendMsg.startsWith("Failed") ? "#fca5a5" : "#68e6c5",
                  fontFamily: "'Montserrat', sans-serif",
                  marginBottom: "10px",
                }}>
                  {resendMsg}
                </p>
              )}

              <button
                type="button"
                onClick={handleResend}
                disabled={secondsLeft > 0 || resendLoading}
                style={{
                  background: "none",
                  border: "none",
                  color: secondsLeft > 0 ? "#3a4e63" : "#68e6c5",
                  fontWeight: 600,
                  cursor: (secondsLeft > 0 || resendLoading) ? "not-allowed" : "pointer",
                  fontFamily: "'Montserrat', sans-serif",
                  fontSize: "0.8rem",
                  padding: 0,
                  transition: "color 0.2s",
                }}
              >
                {resendLoading
                  ? "Sending…"
                  : secondsLeft > 0
                    ? `Resend OTP (${secondsLeft}s)`
                    : "Resend OTP"}
              </button>
            </div>

            <p style={{ textAlign: "center", marginTop: "20px" }}>
              <a
                href="/login"
                style={{
                  color: "#64748b",
                  fontFamily: "'Montserrat', sans-serif",
                  fontSize: "0.75rem",
                  fontWeight: 500,
                  textDecoration: "none",
                }}
              >
                Back to Login
              </a>
            </p>
          </div>
        </div>
      </div>

      <footer style={{ position: "relative", zIndex: 1, textAlign: "center", padding: "14px 24px 24px", borderTop: "1px solid rgba(255,255,255,0.04)" }}>
        <p style={{ fontSize: "0.72rem", color: "#1a2a3a", fontFamily: "'Montserrat', sans-serif" }}>
          © 2026 Magpie · <a href="#" style={{ color: "#253a4f", textDecoration: "none" }}>Privacy</a> · <a href="#" style={{ color: "#253a4f", textDecoration: "none" }}>Terms</a>
        </p>
      </footer>
    </div>
  );
}
