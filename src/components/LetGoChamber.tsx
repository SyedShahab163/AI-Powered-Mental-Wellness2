import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

export default function LetGoChamber() {
  const [text, setText] = useState("");
  const [burning, setBurning] = useState(false);
  const { toast } = useToast();

  const handleBurn = () => {
    if (!text.trim()) return;
    setBurning(true);
    setTimeout(() => { setText(""); setBurning(false); toast({ title: "Released 🕯", description: "Your words have vanished." }); }, 600);
  };

  return (
    <div style={{ background: "#fff", border: "1px solid #E5E0F0", borderRadius: 10, padding: "10px 12px", height: "100%", display: "flex", flexDirection: "column", boxSizing: "border-box" }}>
      <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 6 }}>
        <img src="/candle-real.png" alt="candle"
          style={{ width: 16, height: 16, objectFit: "cover", borderRadius: 3 }} />
        <span style={{ fontWeight: 600, color: "#2D1F60", fontSize: 12 }}>The Let-Go Chamber</span>
        <span style={{ fontSize: 10, color: "#9B8FC0" }}>— Write everything. Then watch it vanish.</span>
      </div>

      <div style={{ display: "flex", gap: 10, flex: 1 }}>
        <div style={{ flex: 1, display: "flex", flexDirection: "column" }}>
          <textarea value={text} onChange={e => setText(e.target.value)} placeholder="Youn here..."
            className={burning ? "burn-vanish" : ""}
            style={{ flex: 1, background: "#F7F5FC", border: "1px solid #E5E0F0", borderRadius: 8, padding: "8px 10px", fontSize: 12, color: "#2D1F60", resize: "none", outline: "none", fontFamily: "inherit" }} />
          <div style={{ display: "flex", gap: 8, marginTop: 8 }}>
            <button onClick={() => text.trim() && toast({ title: "Saved!", description: "Draft saved." })}
              style={{ border: "1px solid #D8C8F0", color: "#5A4A8A", fontSize: 11, background: "#fff", borderRadius: 7, padding: "5px 12px", cursor: "pointer" }}>
              Save as Draft
            </button>
            <button onClick={handleBurn}
              style={{ background: "linear-gradient(to right,#C05A2A,#8B3A8B)", color: "#fff", fontSize: 11, border: "none", borderRadius: 7, padding: "5px 12px", cursor: "pointer", fontWeight: 600 }}>
              Burn & Release
            </button>
          </div>
        </div>

        {/* Real candle + papers */}
        <div style={{ width: 80, position: "relative", flexShrink: 0 }}>
          <img src="/candle-real.png" alt="candle"
            style={{ width: 80, height: "100%", objectFit: "cover", objectPosition: "center", borderRadius: 8, opacity: 0.9 }} />
          {/* Floating papers */}
          <div className="paper-float-1" style={{ position: "absolute", bottom: 20, left: -8, zIndex: 5 }}>
            <div style={{ width: 28, height: 36, background: "linear-gradient(135deg,#F5F0E8,#EDE8DC)", borderRadius: 3, boxShadow: "1px 1px 4px rgba(0,0,0,0.25)", padding: "4px 5px", transform: "rotate(-8deg)" }}>
              {[0,1,2,3].map(i => <div key={i} style={{ height: 2, background: "#C0B0A0", borderRadius: 1, marginBottom: 3, width: i===3?"55%":"100%" }} />)}
            </div>
          </div>
          <div className="paper-float-2" style={{ position: "absolute", bottom: 10, right: -6, zIndex: 5 }}>
            <div style={{ width: 24, height: 30, background: "linear-gradient(135deg,#EDE8DC,#E8E0D0)", borderRadius: 3, boxShadow: "1px 1px 3px rgba(0,0,0,0.2)", padding: "3px 4px", transform: "rotate(12deg)" }}>
              {[0,1,2].map(i => <div key={i} style={{ height: 2, background: "#B8A890", borderRadius: 1, marginBottom: 3 }} />)}
            </div>
          </div>
          <div className="paper-float-3" style={{ position: "absolute", bottom: 5, left: 14, zIndex: 5 }}>
            <div style={{ width: 22, height: 26, background: "linear-gradient(135deg,#F0EBE0,#E8E2D5)", borderRadius: 2, boxShadow: "1px 1px 3px rgba(0,0,0,0.18)", padding: "3px 3px", transform: "rotate(-4deg)" }}>
              {[0,1].map(i => <div key={i} style={{ height: 2, background: "#C0B0A0", borderRadius: 1, marginBottom: 3 }} />)}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
