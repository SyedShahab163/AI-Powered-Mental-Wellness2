import { ClipboardList } from "lucide-react";

const metrics = [
  { label: "Mood",     value: "Good",     emoji: "😌", badge: { background: "#DCFCE7", color: "#166534", border: "1px solid #BBF7D0" } },
  { label: "Stress",   value: "Moderate", emoji: "🔥", badge: { background: "#FEF3C7", color: "#92400E", border: "1px solid #FDE68A" } },
  { label: "Progress", value: "72% ↑",    emoji: "📈", badge: { background: "#DCFCE7", color: "#166534", border: "1px solid #BBF7D0" } },
];

export default function MirrorOfNow() {
  return (
    <div style={{ background: "#fff", border: "1px solid #E5E0F0", borderRadius: 10, padding: "10px 12px", height: "100%", boxSizing: "border-box" }}>
      <div style={{ display: "flex", alignItems: "center", gap: 5, marginBottom: 5 }}>
        <ClipboardList size={12} style={{ color: "#7B5EA7" }} />
        <span style={{ fontWeight: 600, color: "#2D1F60", fontSize: 12 }}>Mirror of Now</span>
      </div>
      <p style={{ color: "#8A7AB0", fontSize: 10, lineHeight: 1.5, marginBottom: 10 }}>
        You've faced conflict, but your focus is shifting.
      </p>
      <div style={{ display: "flex", flexDirection: "column", gap: 7 }}>
        {metrics.map(m => (
          <div key={m.label} style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
              <span style={{ fontSize: 13 }}>{m.emoji}</span>
              <span style={{ color: "#5A4A8A", fontSize: 11 }}>{m.label}</span>
            </div>
            <span style={{ ...m.badge, fontSize: 9, padding: "2px 7px", borderRadius: 5, fontWeight: 600 }}>{m.value}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
