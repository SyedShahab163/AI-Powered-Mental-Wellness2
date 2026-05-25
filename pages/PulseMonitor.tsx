import { useState } from "react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from "recharts";

interface LogEntry { date: string; mood: number; stress: number; energy: number; note: string; }

function getLogs(): LogEntry[] {
  try { return JSON.parse(localStorage.getItem("pulse_logs") || "[]"); } catch { return []; }
}
function saveLogs(l: LogEntry[]) { localStorage.setItem("pulse_logs", JSON.stringify(l)); }

const defaultLogs: LogEntry[] = [
  { date: "May 10", mood: 2, stress: 80, energy: 3, note: "" },
  { date: "May 11", mood: 3, stress: 65, energy: 4, note: "" },
  { date: "May 12", mood: 2, stress: 72, energy: 2, note: "" },
  { date: "May 13", mood: 4, stress: 50, energy: 4, note: "" },
  { date: "May 14", mood: 3, stress: 45, energy: 3, note: "" },
  { date: "May 15", mood: 4, stress: 30, energy: 5, note: "" },
  { date: "May 16", mood: 5, stress: 25, energy: 5, note: "" },
];

export default function PulseMonitor() {
  const stored = getLogs();
  const [logs, setLogs] = useState<LogEntry[]>(stored.length ? stored : defaultLogs);
  const [form, setForm] = useState({ mood: 3, stress: 50, energy: 3, note: "" });
  const [saved, setSaved] = useState(false);

  const addLog = () => {
    const entry: LogEntry = { date: new Date().toLocaleDateString("en-GB", { day: "numeric", month: "short" }), ...form };
    const updated = [...logs, entry];
    setLogs(updated); saveLogs(updated); setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const avg = (key: keyof LogEntry) => {
    const nums = logs.map(l => l[key] as number);
    return (nums.reduce((a, b) => a + b, 0) / nums.length).toFixed(1);
  };

  const sliderRow = (label: string, key: "mood"|"stress"|"energy", min: number, max: number, color: string) => (
    <div style={{ marginBottom: 14 }}>
      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 5 }}>
        <span style={{ fontSize: 12, color: "#5A4A8A", fontWeight: 600 }}>{label}</span>
        <span style={{ fontSize: 13, color: color, fontWeight: 700 }}>{form[key]}</span>
      </div>
      <input type="range" min={min} max={max} value={form[key]}
        onChange={e => setForm(f => ({ ...f, [key]: Number(e.target.value) }))}
        style={{ width: "100%", accentColor: color }} />
    </div>
  );

  return (
    <div style={{ display: "flex", width: "100%", height: "100%", background: "#F7F5FC", overflow: "hidden", padding: "14px 16px", gap: 12, boxSizing: "border-box" }}>
      <style>{`
        @media (max-width: 768px) {
          .pm-layout { flex-direction: column !important; }
          .pm-right { width: 100% !important; }
        }
      `}</style>

      {/* LEFT: Charts — takes all remaining space */}
      <div className="pm-layout" style={{ flex: 1, display: "flex", flexDirection: "column", gap: 10, minWidth: 0, overflow: "hidden" }}>
        <div style={{ fontWeight: 700, color: "#2D1F60", fontSize: 15, flexShrink: 0, marginBottom: 2 }}>📊 Pulse Monitor</div>

        <div style={{ flex: 1, background: "#fff", border: "1px solid #E5E0F0", borderRadius: 12, padding: "12px 16px", display: "flex", flexDirection: "column" }}>
          <div style={{ fontWeight: 700, color: "#2D1F60", fontSize: 12, marginBottom: 8 }}>💜 Mood Over Time (1–5)</div>
          <div style={{ flex: 1 }}>
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={logs} margin={{ top: 4, right: 8, left: -18, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#F0EBF8" vertical={false} />
                <XAxis dataKey="date" tick={{ fill: "#B0A4D0", fontSize: 9 }} axisLine={false} tickLine={false} interval={0} />
                <YAxis domain={[1,5]} ticks={[1,2,3,4,5]} tick={{ fill: "#B0A4D0", fontSize: 9 }} axisLine={false} tickLine={false} />
                <Tooltip contentStyle={{ fontSize: 11, borderRadius: 8, border: "1px solid #E5E0F0" }} />
                <Line type="monotone" dataKey="mood" stroke="#7B5EA7" strokeWidth={2.5} dot={{ r: 4, fill: "#7B5EA7", strokeWidth: 0 }} activeDot={{ r: 6 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div style={{ flex: 1, background: "#fff", border: "1px solid #E5E0F0", borderRadius: 12, padding: "12px 16px", display: "flex", flexDirection: "column" }}>
          <div style={{ fontWeight: 700, color: "#2D1F60", fontSize: 12, marginBottom: 8 }}>🔥 Stress Level (0–100)</div>
          <div style={{ flex: 1 }}>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={logs} margin={{ top: 4, right: 8, left: -18, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#F0EBF8" vertical={false} />
                <XAxis dataKey="date" tick={{ fill: "#B0A4D0", fontSize: 9 }} axisLine={false} tickLine={false} interval={0} />
                <YAxis domain={[0,100]} tick={{ fill: "#B0A4D0", fontSize: 9 }} axisLine={false} tickLine={false} />
                <Tooltip contentStyle={{ fontSize: 11, borderRadius: 8, border: "1px solid #E5E0F0" }} />
                <Bar dataKey="stress" fill="#F472B6" radius={[5,5,0,0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* RIGHT: Stats + Log form */}
      <div className="pm-right" style={{ width: "26%", minWidth: 200, maxWidth: 260, display: "flex", flexDirection: "column", gap: 10, flexShrink: 0 }}>
        {/* Averages */}
        <div style={{ background: "#fff", border: "1px solid #E5E0F0", borderRadius: 12, padding: "12px 14px" }}>
          <div style={{ fontWeight: 700, color: "#2D1F60", fontSize: 13, marginBottom: 10 }}>📊 Averages</div>
          {[
            { label: "Avg Mood",   val: avg("mood"),   color: "#7B5EA7", icon: "💜" },
            { label: "Avg Stress", val: avg("stress"), color: "#F472B6", icon: "🔥" },
            { label: "Avg Energy", val: avg("energy"), color: "#34D399", icon: "⚡" },
          ].map(s => (
            <div key={s.label} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 9 }}>
              <span style={{ fontSize: 12, color: "#5A4A8A" }}>{s.icon} {s.label}</span>
              <span style={{ fontWeight: 800, color: s.color, fontSize: 15 }}>{s.val}</span>
            </div>
          ))}
        </div>

        {/* Log today */}
        <div style={{ background: "#fff", border: "1px solid #E5E0F0", borderRadius: 12, padding: "12px 14px", flex: 1 }}>
          <div style={{ fontWeight: 700, color: "#2D1F60", fontSize: 13, marginBottom: 12 }}>📝 Log Today</div>
          {sliderRow("Mood", "mood", 1, 5, "#7B5EA7")}
          {sliderRow("Stress", "stress", 0, 100, "#F472B6")}
          {sliderRow("Energy", "energy", 1, 5, "#34D399")}
          <textarea value={form.note} onChange={e => setForm(f => ({ ...f, note: e.target.value }))}
            placeholder="Optional note…"
            style={{ width: "100%", background: "#F7F5FC", border: "1px solid #E5E0F0", borderRadius: 9, padding: "7px 10px", fontSize: 12, color: "#2D1F60", resize: "none", outline: "none", height: 56, boxSizing: "border-box", fontFamily: "inherit" }} />
          <button onClick={addLog}
            style={{ width: "100%", marginTop: 10, background: saved ? "#34D399" : "#4A3080", border: "none", borderRadius: 9, padding: "9px", color: "#fff", fontSize: 13, fontWeight: 600, cursor: "pointer", transition: "background .3s" }}>
            {saved ? "✓ Saved!" : "Save Today's Log"}
          </button>
        </div>
      </div>
    </div>
  );
}
