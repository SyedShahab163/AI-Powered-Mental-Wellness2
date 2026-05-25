import { useState } from "react";

const moods = [
  { id: "happy",   label: "Happy",   sub: "Elated",    emoji: "😊", selBg: "rgba(34,197,94,.12)",  selBorder: "rgba(34,197,94,.55)"  },
  { id: "sad",     label: "Sad",     sub: "Heavy",     emoji: "😢", selBg: "rgba(59,130,246,.12)", selBorder: "rgba(59,130,246,.55)" },
  { id: "angry",   label: "Angry",   sub: "Fuming",    emoji: "😡", selBg: "rgba(239,68,68,.12)",  selBorder: "rgba(239,68,68,.55)"  },
  { id: "neutral", label: "Neutral", sub: "Steadfast", emoji: "😐", selBg: "rgba(234,179,8,.12)",  selBorder: "rgba(234,179,8,.55)"  },
];

export default function HonestyDrop() {
  const [sel, setSel] = useState<string|null>(null);
  return (
    <div style={{ background: "#fff", border: "1px solid #E5E0F0", borderRadius: 10, padding: "10px 12px", height: "100%", boxSizing: "border-box" }}>
      <div style={{ fontWeight: 600, color: "#2D1F60", fontSize: 12, marginBottom: 2 }}>Honesty Dro feel today?</div>
      <div style={{ color: "#9B8FC0", fontSize: 10, marginBottom: 8 }}>Honesty Drop</div>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 6 }}>
        {moods.map(m => (
          <button key={m.id} onClick={() => setSel(sel === m.id ? null : m.id)}
            style={{ display: "flex", flexDirection: "column", alignItems: "center", padding: "8px 4px", borderRadius: 9, border: `1px solid ${sel===m.id ? m.selBorder : "#E5E0F0"}`, background: sel===m.id ? m.selBg : "#F7F5FC", cursor: "pointer", transition: "all .15s", gap: 2 }}>
            <span style={{ fontSize: 17 }}>{m.emoji}</span>
            <span style={{ color: "#2D1F60", fontSize: 10, fontWeight: 500 }}>{m.label}</span>
            <span style={{ color: "#9B8FC0", fontSize: 9 }}>({m.sub})</span>
          </button>
        ))}
      </div>
    </div>
  );
}
