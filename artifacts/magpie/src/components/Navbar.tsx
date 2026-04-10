import React, { useState, useRef, useEffect } from "react";
import { useLocation } from "wouter";
import { supabase, clearAuthToken } from "@/lib/supabase";
import birdLogo from "@assets/LOGO 3.png";
import { api } from "@/lib/api";
import { getAuthToken } from "@/lib/supabase";
import { useWindowWidth } from "@/hooks/use-mobile";

interface NavbarProps {
  showSearch?: boolean;
  variant?: "landing" | "home" | "auth";
  searchQuery?: string;
  onSearchChange?: (query: string) => void;
}

function NavLink({ href, children }: { href: string; children: React.ReactNode }) {
  const [hovered, setHovered] = useState(false);
  return (
    <a
      href={href}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        fontSize: "0.8125rem",
        fontWeight: 600,
        textTransform: "uppercase",
        letterSpacing: "0.2em",
        color: hovered ? "#00e5c8" : "#cbd5e1",
        textDecoration: "none",
        fontFamily: "'Barlow Condensed', sans-serif",
        transition: "color 0.2s ease",
      }}
      className="text-[16px] font-bold">{children}</a>
  );
}

export default function Navbar({ showSearch = false, variant = "landing", searchQuery = "", onSearchChange }: NavbarProps) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [isPremium, setIsPremium] = useState<boolean | null>(null);
  const [, setLocation] = useLocation();
  const dropdownRef = useRef<HTMLDivElement>(null);
  const { isMobile } = useWindowWidth();
  const isCompact = isMobile;

  useEffect(() => {
    if (variant === "home") {
      getAuthToken().then(token => {
        if (token) {
          api.premium.status().then(s => setIsPremium(s.isPremium)).catch(() => setIsPremium(false));
        }
      });
    }
  }, [variant]);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setDropdownOpen(false);
      }
    }
    if (dropdownOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [dropdownOpen]);

  useEffect(() => {
    if (!isCompact) {
      setMobileOpen(false);
    }
  }, [isCompact]);

  const handleSignIn = () => setLocation("/login");

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    clearAuthToken();
    setLocation("/");
  };

  const buttonStyle: React.CSSProperties = {
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
  };

  return (
    <>
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
          <img src={birdLogo} alt="Magpie logo" style={{ height: "38px", width: "auto" }} />
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

        {/* Center nav links for landing — tablet and desktop */}
        {variant === "landing" && !isCompact && (
          <nav style={{ display: "flex", alignItems: "center", gap: "32px" }}>
            {["Trending", "About", "Vision"].map(link => (
              <NavLink key={link} href={`#${link.toLowerCase()}`}>{link}</NavLink>
            ))}
          </nav>
        )}

        {/* Search bar for home — desktop/tablet only */}
        {showSearch && !isMobile && (
          <div style={{ flex: 1, maxWidth: "400px", margin: "0 40px", position: "relative" }}>
            <input
              type="text"
              placeholder="SEARCH STORIES"
              value={searchQuery}
              onChange={e => onSearchChange?.(e.target.value)}
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
          {isCompact ? (
            /* Hamburger button */
            <button
              onClick={() => setMobileOpen(prev => !prev)}
              style={{
                background: "transparent",
                border: "none",
                color: "#00e5c8",
                cursor: "pointer",
                padding: "8px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
              aria-label="Toggle menu"
            >
              {mobileOpen ? (
                <svg width="24" height="24" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg width="24" height="24" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </button>
          ) : (
            variant === "home" ? (
              <div ref={dropdownRef} style={{ position: "relative" }}>
                <button
                  onClick={() => setDropdownOpen(prev => !prev)}
                  style={buttonStyle}
                >Profile</button>
                {dropdownOpen && (
                  <div style={{
                    position: "absolute",
                    top: "calc(100% + 8px)",
                    right: 0,
                    background: "#0d1b2e",
                    border: "1px solid rgba(0,229,200,0.25)",
                    borderRadius: "6px",
                    minWidth: "180px",
                    overflow: "hidden",
                    boxShadow: "0 8px 32px rgba(0,0,0,0.5)",
                    zIndex: 200,
                  }}>
                    {isPremium ? (
                      <div style={{
                        padding: "12px 18px",
                        fontFamily: "'Barlow Condensed', sans-serif",
                        fontSize: "12px",
                        letterSpacing: "1.5px",
                        textTransform: "uppercase",
                        color: "#00e5c8",
                        background: "rgba(0,229,200,0.08)",
                        borderBottom: "1px solid rgba(0,229,200,0.15)",
                        display: "flex",
                        alignItems: "center",
                        gap: "8px",
                      }}>
                        <span style={{ fontSize: "14px" }}>★</span> Premium Member
                      </div>
                    ) : (
                      <button
                        onClick={() => { setDropdownOpen(false); setLocation("/premium"); }}
                        style={{
                          display: "block",
                          width: "100%",
                          padding: "12px 18px",
                          background: "transparent",
                          border: "none",
                          borderBottom: "1px solid rgba(0,229,200,0.1)",
                          color: "#00e5c8",
                          fontFamily: "'Barlow Condensed', sans-serif",
                          fontSize: "13px",
                          letterSpacing: "1.5px",
                          textTransform: "uppercase",
                          textAlign: "left",
                          cursor: "pointer",
                        }}
                        onMouseEnter={e => (e.currentTarget.style.background = "rgba(0,229,200,0.08)")}
                        onMouseLeave={e => (e.currentTarget.style.background = "transparent")}
                      >Get Premium</button>
                    )}
                    <button
                      onClick={() => { setDropdownOpen(false); handleSignOut(); }}
                      style={{
                        display: "block",
                        width: "100%",
                        padding: "12px 18px",
                        background: "transparent",
                        border: "none",
                        color: "#cbd5e1",
                        fontFamily: "'Barlow Condensed', sans-serif",
                        fontSize: "13px",
                        letterSpacing: "1.5px",
                        textTransform: "uppercase",
                        textAlign: "left",
                        cursor: "pointer",
                      }}
                      onMouseEnter={e => (e.currentTarget.style.background = "rgba(255,255,255,0.05)")}
                      onMouseLeave={e => (e.currentTarget.style.background = "transparent")}
                    >Sign Out</button>
                  </div>
                )}
              </div>
            ) : (
              <button
                onClick={handleSignIn}
                style={buttonStyle}
              >Sign In</button>
            )
          )}
        </div>
      </header>

      {/* Mobile drawer */}
      {isCompact && mobileOpen && (
        <div style={{
          position: "fixed",
          top: "72px",
          left: 0,
          right: 0,
          zIndex: 99,
          background: "#060d1f",
          borderBottom: "1px solid rgba(0,229,200,0.15)",
          boxShadow: "0 8px 24px rgba(0,0,0,0.5)",
          padding: "20px 24px 28px",
          display: "flex",
          flexDirection: "column",
          gap: "16px",
        }}>
          {/* Search bar for home variant on mobile */}
          {showSearch && (
            <div style={{ position: "relative", marginBottom: "8px" }}>
              <input
                type="text"
                placeholder="SEARCH STORIES"
                value={searchQuery}
                onChange={e => onSearchChange?.(e.target.value)}
                style={{
                  width: "100%",
                  background: "rgba(255,255,255,0.04)",
                  border: "1px solid rgba(0,229,200,0.25)",
                  borderRadius: "4px",
                  padding: "10px 36px 10px 14px",
                  color: "#fff",
                  fontFamily: "'Barlow Condensed', sans-serif",
                  fontSize: "13px",
                  fontWeight: 600,
                  letterSpacing: "0.15em",
                  textTransform: "uppercase",
                  outline: "none",
                  caretColor: "#00e5c8",
                  boxSizing: "border-box",
                }}
              />
              <svg
                style={{
                  position: "absolute",
                  right: "12px",
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

          {/* Nav links for landing variant */}
          {variant === "landing" && (
            <nav style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
              {["Trending", "About", "Vision"].map(link => (
                <a
                  key={link}
                  href={`#${link.toLowerCase()}`}
                  onClick={() => setMobileOpen(false)}
                  style={{
                    fontFamily: "'Barlow Condensed', sans-serif",
                    fontSize: "1rem",
                    fontWeight: 700,
                    textTransform: "uppercase",
                    letterSpacing: "0.2em",
                    color: "#cbd5e1",
                    textDecoration: "none",
                    padding: "12px 0",
                    borderBottom: "1px solid rgba(255,255,255,0.06)",
                  }}
                >{link}</a>
              ))}
            </nav>
          )}

          {/* Action buttons */}
          {variant === "home" ? (
            <div style={{ display: "flex", flexDirection: "column", gap: "10px", paddingTop: "4px" }}>
              {!isPremium && (
                <button
                  onClick={() => { setMobileOpen(false); setLocation("/premium"); }}
                  style={{
                    ...buttonStyle,
                    width: "100%",
                    padding: "12px",
                    textAlign: "center",
                    background: "rgba(0,229,200,0.08)",
                  }}
                >Get Premium</button>
              )}
              {isPremium && (
                <div style={{
                  padding: "12px",
                  fontFamily: "'Barlow Condensed', sans-serif",
                  fontSize: "13px",
                  letterSpacing: "1.5px",
                  textTransform: "uppercase",
                  color: "#00e5c8",
                  background: "rgba(0,229,200,0.08)",
                  border: "1px solid rgba(0,229,200,0.2)",
                  borderRadius: "4px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "8px",
                }}>
                  <span>★</span> Premium Member
                </div>
              )}
              <button
                onClick={() => { setMobileOpen(false); handleSignOut(); }}
                style={{
                  background: "transparent",
                  border: "1px solid rgba(255,255,255,0.15)",
                  color: "#cbd5e1",
                  padding: "12px",
                  borderRadius: "4px",
                  fontFamily: "'Barlow Condensed', sans-serif",
                  fontWeight: 700,
                  fontSize: "13px",
                  letterSpacing: "2px",
                  textTransform: "uppercase",
                  cursor: "pointer",
                  width: "100%",
                }}
              >Sign Out</button>
            </div>
          ) : (
            <button
              onClick={() => { setMobileOpen(false); handleSignIn(); }}
              style={{ ...buttonStyle, width: "100%", padding: "12px", textAlign: "center" }}
            >Sign In</button>
          )}
        </div>
      )}
    </>
  );
}
