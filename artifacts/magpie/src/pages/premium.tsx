import { useState } from "react";
import { useLocation } from "wouter";
import { api } from "@/lib/api";
import { useToast } from "@/hooks/use-toast";
import birdLogo from "@assets/image_1774626827305.png";

declare global {
  interface Window {
    Razorpay: new (options: RazorpayOptions) => RazorpayInstance;
  }
}

interface RazorpayOptions {
  key: string;
  amount: number;
  currency: string;
  name: string;
  description: string;
  order_id: string;
  handler: (response: { razorpay_order_id: string; razorpay_payment_id: string; razorpay_signature: string }) => void;
  prefill?: Record<string, string>;
  theme?: { color: string };
  modal?: { ondismiss: () => void };
}

interface RazorpayInstance {
  open: () => void;
}

const PLANS = [
  {
    id: "weekly",
    label: "Weekly",
    duration: "7 Days",
    price: "₹89",
    priceNote: "per week",
    highlight: false,
  },
  {
    id: "monthly",
    label: "Monthly",
    duration: "30 Days",
    price: "₹299",
    priceNote: "per month",
    highlight: true,
  },
  {
    id: "yearly",
    label: "Yearly",
    duration: "365 Days",
    price: "₹999",
    priceNote: "per year",
    highlight: false,
  },
];

function loadRazorpayScript(): Promise<boolean> {
  return new Promise(resolve => {
    if (window.Razorpay) {
      resolve(true);
      return;
    }
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.onload = () => resolve(true);
    script.onerror = () => resolve(false);
    document.body.appendChild(script);
  });
}

export default function PremiumPage() {
  const [, setLocation] = useLocation();
  const { toast } = useToast();
  const [loadingPlan, setLoadingPlan] = useState<string | null>(null);

  const handleSelectPlan = async (planId: string) => {
    setLoadingPlan(planId);
    try {
      const loaded = await loadRazorpayScript();
      if (!loaded) {
        toast({ title: "Error", description: "Failed to load payment module. Please try again.", variant: "destructive" });
        setLoadingPlan(null);
        return;
      }

      const order = await api.premium.createOrder(planId);

      const options: RazorpayOptions = {
        key: order.keyId,
        amount: order.amount,
        currency: order.currency,
        name: "Magpie",
        description: `${PLANS.find(p => p.id === planId)?.label} Premium Membership`,
        order_id: order.orderId,
        handler: async (response) => {
          try {
            await api.premium.verifyPayment({
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature,
            });
            setLoadingPlan(null);
            toast({ title: "Welcome to Premium!", description: "Your membership is now active. Enjoy unlimited reading!" });
            setLocation("/home");
          } catch {
            setLoadingPlan(null);
            toast({ title: "Verification Error", description: "Payment received but verification failed. Please contact support.", variant: "destructive" });
          }
        },
        theme: { color: "#00e5c8" },
        modal: {
          ondismiss: () => setLoadingPlan(null),
        },
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (err) {
      const message = err instanceof Error ? err.message : "Failed to initiate payment";
      toast({ title: "Error", description: message, variant: "destructive" });
      setLoadingPlan(null);
    }
  };

  return (
    <div style={{
      background: "#060d1f",
      color: "#fff",
      minHeight: "100vh",
      display: "flex",
      flexDirection: "column",
    }}>
      {/* Header */}
      <header style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "0 4vw",
        height: "72px",
        background: "#060d1f",
        borderBottom: "1px solid rgba(0,229,200,0.12)",
        flexShrink: 0,
      }}>
        <span
          onClick={() => setLocation("/home")}
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
        <button
          onClick={() => setLocation("/home")}
          style={{
            background: "transparent",
            border: "none",
            color: "rgba(255,255,255,0.5)",
            fontFamily: "'Barlow Condensed', sans-serif",
            fontSize: "13px",
            letterSpacing: "2px",
            textTransform: "uppercase",
            cursor: "pointer",
          }}
        >← Back</button>
      </header>

      {/* Main content */}
      <div style={{
        flex: 1,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        padding: "60px 4vw 80px",
      }}>
        {/* Hero text */}
        <div style={{ textAlign: "center", marginBottom: "60px", maxWidth: "600px" }}>
          <div style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "8px",
            background: "rgba(0,229,200,0.1)",
            border: "1px solid rgba(0,229,200,0.3)",
            borderRadius: "20px",
            padding: "5px 14px",
            fontSize: "11px",
            letterSpacing: "3px",
            textTransform: "uppercase",
            color: "#00e5c8",
            marginBottom: "24px",
            fontFamily: "'Barlow Condensed', sans-serif",
          }}>
            <span style={{ width: "6px", height: "6px", borderRadius: "50%", background: "#00e5c8" }} />
            Unlimited Access
          </div>
          <h1 style={{
            fontFamily: "'Barlow Condensed', sans-serif",
            fontSize: "clamp(42px, 6vw, 72px)",
            fontWeight: 900,
            lineHeight: 0.95,
            textTransform: "uppercase",
            marginBottom: "20px",
          }}>
            <span style={{ color: "#00e5c8" }}>Go</span> Premium
          </h1>
          <p style={{
            fontSize: "16px",
            lineHeight: 1.7,
            color: "rgba(255,255,255,0.65)",
            fontFamily: "'Barlow', sans-serif",
          }}>
            Unlock unlimited access to every story in our library. Read as much as you want, whenever you want.
          </p>
        </div>

        {/* Plan cards */}
        <div style={{
          display: "flex",
          gap: "24px",
          flexWrap: "wrap",
          justifyContent: "center",
          width: "100%",
          maxWidth: "900px",
        }}>
          {PLANS.map(plan => (
            <div
              key={plan.id}
              style={{
                background: plan.highlight ? "linear-gradient(160deg, #0d2a3a, #0a1e2e)" : "#0d1b2e",
                border: plan.highlight ? "1.5px solid #00e5c8" : "1px solid rgba(0,229,200,0.18)",
                borderRadius: "12px",
                padding: "36px 32px",
                minWidth: "240px",
                flex: "1 1 240px",
                maxWidth: "280px",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                position: "relative",
                boxShadow: plan.highlight ? "0 0 40px rgba(0,229,200,0.12)" : "none",
              }}
            >
              {plan.highlight && (
                <div style={{
                  position: "absolute",
                  top: "-14px",
                  left: "50%",
                  transform: "translateX(-50%)",
                  background: "#00e5c8",
                  color: "#060d1f",
                  fontFamily: "'Barlow Condensed', sans-serif",
                  fontSize: "11px",
                  fontWeight: 800,
                  letterSpacing: "2px",
                  textTransform: "uppercase",
                  padding: "4px 14px",
                  borderRadius: "20px",
                }}>Most Popular</div>
              )}
              <div style={{
                fontFamily: "'Barlow Condensed', sans-serif",
                fontSize: "13px",
                letterSpacing: "3px",
                textTransform: "uppercase",
                color: plan.highlight ? "#00e5c8" : "rgba(255,255,255,0.5)",
                marginBottom: "8px",
              }}>{plan.label}</div>
              <div style={{
                fontFamily: "'Bebas Neue', sans-serif",
                fontSize: "52px",
                lineHeight: 1,
                color: "#fff",
                marginBottom: "4px",
              }}>{plan.price}</div>
              <div style={{
                fontFamily: "'Barlow Condensed', sans-serif",
                fontSize: "13px",
                color: "rgba(255,255,255,0.4)",
                marginBottom: "24px",
              }}>{plan.priceNote}</div>
              <div style={{
                width: "100%",
                padding: "14px 0",
                borderTop: "1px solid rgba(255,255,255,0.07)",
                borderBottom: "1px solid rgba(255,255,255,0.07)",
                marginBottom: "28px",
              }}>
                <div style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                  marginBottom: "10px",
                }}>
                  <span style={{ color: "#00e5c8", fontSize: "14px" }}>✓</span>
                  <span style={{ fontFamily: "'Barlow Condensed', sans-serif", fontSize: "14px", color: "rgba(255,255,255,0.85)" }}>
                    Unlimited access to all books
                  </span>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "10px" }}>
                  <span style={{ color: "#00e5c8", fontSize: "14px" }}>✓</span>
                  <span style={{ fontFamily: "'Barlow Condensed', sans-serif", fontSize: "14px", color: "rgba(255,255,255,0.85)" }}>
                    {plan.duration} of access
                  </span>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                  <span style={{ color: "#00e5c8", fontSize: "14px" }}>✓</span>
                  <span style={{ fontFamily: "'Barlow Condensed', sans-serif", fontSize: "14px", color: "rgba(255,255,255,0.85)" }}>
                    All genres & new releases
                  </span>
                </div>
              </div>
              <button
                onClick={() => handleSelectPlan(plan.id)}
                disabled={loadingPlan !== null}
                style={{
                  width: "100%",
                  background: plan.highlight ? "#00e5c8" : "transparent",
                  border: "1.5px solid #00e5c8",
                  color: plan.highlight ? "#060d1f" : "#00e5c8",
                  padding: "13px 0",
                  borderRadius: "4px",
                  fontFamily: "'Barlow Condensed', sans-serif",
                  fontWeight: 700,
                  fontSize: "14px",
                  letterSpacing: "2px",
                  textTransform: "uppercase",
                  cursor: loadingPlan !== null ? "not-allowed" : "pointer",
                  opacity: loadingPlan !== null && loadingPlan !== plan.id ? 0.5 : 1,
                  transition: "opacity 0.2s",
                }}
              >
                {loadingPlan === plan.id ? "Loading..." : `Choose ${plan.label}`}
              </button>
            </div>
          ))}
        </div>

        {/* Footer note */}
        <p style={{
          marginTop: "48px",
          fontFamily: "'Barlow Condensed', sans-serif",
          fontSize: "13px",
          color: "rgba(255,255,255,0.3)",
          letterSpacing: "0.5px",
          textAlign: "center",
        }}>
          Secure payment via Razorpay · No recurring charges · Cancel anytime
        </p>
      </div>
    </div>
  );
}
