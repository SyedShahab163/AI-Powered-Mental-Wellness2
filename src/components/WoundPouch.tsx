import { useState } from "react";
import { MoreVertical, Plus, X } from "lucide-react";

const initialWounds = [
  { id: 1, title: "Career Conflict", addedAt: "2 days ago" },
  { id: 2, title: "Close Calls", addedAt: "2 days ago" },
  { id: 3, title: "Interpersonal Strife", addedAt: "2 days ago" },
];

export default function WoundPouch() {
  const [wounds, setWounds] = useState(initialWounds);
  const [showInput, setShowInput] = useState(false);
  const [newWound, setNewWound] = useState("");
  const [openMenu, setOpenMenu] = useState<number | null>(null);

  const addWound = () => {
    if (!newWound.trim()) return;
    setWounds(p => [...p, { id: Date.now(), title: newWound.trim(), addedAt: "Just now" }]);
    setNewWound(""); setShowInput(false);
  };

  return (
    <div style={{ background: "#fff", border: "1px solid #E5E0F0", borderRadius: 10, padding: "10px 12px", height: "100%", display: "flex", flexDirection: "column", overflow: "hidden", boxSizing: "border-box" }}>
      <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 6, flexShrink: 0 }}>
        <span style={{ fontSize: 13 }}>🩹</span>
        <span style={{ fontWeight: 600, color: "#2D1F60", fontSize: 12 }}>Wound Pouch</span>
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: 4, overflowY: "auto", flex: 1 }}>
        {wounds.map(w => (
          <div key={w.id} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", background: "#F7F5FC", border: "1px solid #E5E0F0", borderRadius: 7, padding: "6px 10px" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
              <span style={{ fontSize: 11 }}>🩹</span>
              <span style={{ color: "#2D1F60", fontSize: 11, fontWeight: 500 }}>{w.title}</span>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
              <span style={{ color: "#B0A4D0", fontSize: 10, borderLeft: "1px solid #E5E0F0", paddingLeft: 8 }}>Added {w.addedAt}</span>
              <div style={{ position: "relative" }}>
                <button onClick={() => setOpenMenu(openMenu === w.id ? null : w.id)} style={{ background: "none", border: "none", cursor: "pointer", color: "#B0A4D0", padding: 2 }}>
                  <MoreVertical size={12} />
                </button>
                {openMenu === w.id && (
                  <div style={{ position: "absolute", right: 0, top: 18, background: "#fff", border: "1px solid #E5E0F0", borderRadius: 7, padding: "3px 0", zIndex: 20, width: 90, boxShadow: "0 4px 12px rgba(0,0,0,0.1)" }}>
                    <button onClick={() => { setWounds(p => p.filter(x => x.id !== w.id)); setOpenMenu(null); }}
                      style={{ display: "flex", alignItems: "center", gap: 5, padding: "5px 10px", width: "100%", background: "none", border: "none", cursor: "pointer", color: "#e57373", fontSize: 11 }}>
                      <X size={10} /> Remove
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {showInput ? (
        <div style={{ display: "flex", gap: 6, marginTop: 6, flexShrink: 0 }}>
          <input autoFocus value={newWound} onChange={e => setNewWound(e.target.value)} onKeyDown={e => e.key === "Enter" && addWound()}
            placeholder="Name this wound…"
            style={{ flex: 1, background: "#F7F5FC", border: "1px solid #7B5EA7", borderRadius: 7, padding: "5px 8px", fontSize: 11, color: "#2D1F60", outline: "none" }} />
          <button onClick={addWound} style={{ background: "#4A3080", color: "#fff", border: "none", borderRadius: 7, padding: "5px 10px", fontSize: 11, cursor: "pointer" }}>Add</button>
          <button onClick={() => setShowInput(false)} style={{ background: "#fff", border: "1px solid #E5E0F0", borderRadius: 7, padding: "5px 10px", fontSize: 11, cursor: "pointer", color: "#6B5A9B" }}>✕</button>
        </div>
      ) : (
        <button onClick={() => setShowInput(true)}
          style={{ marginTop: 6, width: "100%", display: "flex", alignItems: "center", justifyContent: "center", gap: 5, padding: "6px", borderRadius: 7, border: "1px dashed #D8C8F0", background: "transparent", color: "#9B8FC0", fontSize: 11, cursor: "pointer", flexShrink: 0 }}>
          <Plus size={12} /> Pack New Wound
        </button>
      )}
    </div>
  );
}
