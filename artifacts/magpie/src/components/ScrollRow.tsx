import { useCallback, useEffect, useRef, useState } from "react";

interface ScrollRowProps {
  children: React.ReactNode;
  style?: React.CSSProperties;
  className?: string;
}

export default function ScrollRow({ children, style, className }: ScrollRowProps) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);

  const updateButtons = useCallback(() => {
    const el = scrollRef.current;
    if (!el) return;
    setCanScrollLeft(el.scrollLeft > 4);
    setCanScrollRight(el.scrollLeft + el.clientWidth < el.scrollWidth - 4);
  }, []);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    updateButtons();
    el.addEventListener("scroll", updateButtons, { passive: true });

    const ro = new ResizeObserver(updateButtons);
    ro.observe(el);

    const mo = new MutationObserver(updateButtons);
    mo.observe(el, { childList: true, subtree: true });

    return () => {
      el.removeEventListener("scroll", updateButtons);
      ro.disconnect();
      mo.disconnect();
    };
  }, [updateButtons]);

  useEffect(() => {
    updateButtons();
  }, [children, updateButtons]);

  const scroll = useCallback((dir: "left" | "right") => {
    const el = scrollRef.current;
    if (!el) return;
    const amount = el.clientWidth * 0.8;
    el.scrollBy({ left: dir === "left" ? -amount : amount, behavior: "smooth" });
  }, []);

  const btnBase: React.CSSProperties = {
    position: "absolute",
    top: "50%",
    transform: "translateY(-50%)",
    zIndex: 10,
    width: "40px",
    height: "40px",
    borderRadius: "50%",
    border: "none",
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    background: "rgba(0,0,0,0.65)",
    backdropFilter: "blur(4px)",
    color: "#fff",
    boxShadow: "0 2px 12px rgba(0,0,0,0.5)",
    transition: "opacity 0.2s, background 0.2s",
    padding: 0,
    flexShrink: 0,
  };

  return (
    <div style={{ position: "relative" }}>
      {canScrollLeft && (
        <button
          aria-label="Scroll left"
          onClick={() => scroll("left")}
          style={{ ...btnBase, left: "6px" }}
          onMouseEnter={(e) => {
            (e.currentTarget as HTMLButtonElement).style.background = "rgba(0,229,200,0.25)";
          }}
          onMouseLeave={(e) => {
            (e.currentTarget as HTMLButtonElement).style.background = "rgba(0,0,0,0.65)";
          }}
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="15 18 9 12 15 6" />
          </svg>
        </button>
      )}
      <div
        ref={scrollRef}
        style={{
          display: "flex",
          overflowX: "auto",
          ...style,
        }}
        className={className}
      >
        {children}
      </div>
      {canScrollRight && (
        <button
          aria-label="Scroll right"
          onClick={() => scroll("right")}
          style={{ ...btnBase, right: "6px" }}
          onMouseEnter={(e) => {
            (e.currentTarget as HTMLButtonElement).style.background = "rgba(0,229,200,0.25)";
          }}
          onMouseLeave={(e) => {
            (e.currentTarget as HTMLButtonElement).style.background = "rgba(0,0,0,0.65)";
          }}
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="9 18 15 12 9 6" />
          </svg>
        </button>
      )}
    </div>
  );
}
