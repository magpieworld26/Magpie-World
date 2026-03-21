import { useState } from "react";
import { useLocation } from "wouter";
import { supabase, clearAuthToken } from "@/lib/supabase";

interface NavbarProps {
  showSearch?: boolean;
  variant?: "landing" | "home" | "auth";
}

export default function Navbar({ showSearch = false, variant = "landing" }: NavbarProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [mobileOpen, setMobileOpen] = useState(false);
  const [, setLocation] = useLocation();

  const handleSignIn = () => setLocation("/login");

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    clearAuthToken();
    setLocation("/");
  };

  return (
    <header
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 100,
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "0 4vw",
        height: "72px",
        background: "#060d1f",
        borderBottom: "1px solid rgba(0,229,200,0.12)",
      }}
    >
      {/* Brand */}
      <span
        onClick={() => setLocation("/")}
        style={{ display: "flex", alignItems: "center", gap: "10px", cursor: "pointer" }}
      >
        <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
          <rect width="32" height="32" rx="6" fill="#00e5c8" opacity="0.15"/>
          <path d="M8 22 L16 8 L24 22" stroke="#00e5c8" strokeWidth="2.5" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
          <circle cx="16" cy="8" r="3" fill="#00e5c8"/>
        </svg>
        <span style={{
          fontFamily: "'Bebas Neue', sans-serif",
          fontSize: "1.875rem",
          letterSpacing: "0.16em",
          background: "linear-gradient(90deg, #68e6c5, #59ced1, #4f98d8)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          backgroundClip: "text",
        }}>MAGPIE</span>
      </span>

      {/* Center nav links for landing */}
      {variant === "landing" && (
        <nav style={{ display: "flex", alignItems: "center", gap: "32px" }}>
          {["Home", "Trending", "About", "Vision"].map(link => (
            <a
              key={link}
              href={`#${link.toLowerCase()}`}
              style={{
                fontSize: "0.8125rem",
                fontWeight: 600,
                textTransform: "uppercase",
                letterSpacing: "0.2em",
                color: "#cbd5e1",
                textDecoration: "none",
                fontFamily: "'Barlow Condensed', sans-serif",
              }}
            >{link}</a>
          ))}
        </nav>
      )}

      {/* Search bar for home */}
      {showSearch && (
        <div style={{ flex: 1, maxWidth: "400px", margin: "0 40px", position: "relative" }}>
          <input
            type="text"
            placeholder="SEARCH STORIES"
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            style={{
              width: "100%",
              background: "transparent",
              border: "none",
              borderBottom: "1px solid rgba(0,229,200,0.25)",
              borderRadius: 0,
              padding: "8px 36px 8px 0",
              color: "#fff",
              fontFamily: "'Barlow Condensed', sans-serif",
              fontSize: "13px",
              fontWeight: 600,
              letterSpacing: "0.15em",
              textTransform: "uppercase",
              outline: "none",
              caretColor: "#00e5c8",
            }}
          />
          <svg
            style={{
              position: "absolute",
              right: 0,
              top: "50%",
              transform: "translateY(-50%)",
              color: "rgba(0,229,200,0.45)",
              width: 15,
              height: 15,
              pointerEvents: "none",
            }}
            fill="none" stroke="currentColor" viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div>
      )}

      {/* Actions */}
      <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
        {variant === "home" ? (
          <button
            onClick={handleSignOut}
            style={{
              background: "transparent",
              border: "1.5px solid #00e5c8",
              color: "#00e5c8",
              padding: "8px 22px",
              borderRadius: "4px",
              fontFamily: "'Barlow Condensed', sans-serif",
              fontWeight: 700,
              fontSize: "13px",
              letterSpacing: "2px",
              textTransform: "uppercase",
              cursor: "pointer",
              whiteSpace: "nowrap",
            }}
          >Sign Out</button>
        ) : (
          <button
            onClick={handleSignIn}
            style={{
              background: "transparent",
              border: "1.5px solid #00e5c8",
              color: "#00e5c8",
              padding: "8px 22px",
              borderRadius: "4px",
              fontFamily: "'Barlow Condensed', sans-serif",
              fontWeight: 700,
              fontSize: "13px",
              letterSpacing: "2px",
              textTransform: "uppercase",
              cursor: "pointer",
              whiteSpace: "nowrap",
            }}
          >Sign In</button>
        )}
      </div>
    </header>
  );
}
