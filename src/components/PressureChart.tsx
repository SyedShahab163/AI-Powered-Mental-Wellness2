import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { Activity } from "lucide-react";

const data = [
  { date: "May 10", value: 80 },{ date: "May 11", value: 72 },{ date: "May 12", value: 65 },
  { date: "May 13", value: 55 },{ date: "May 14", value: 50 },{ date: "May 15", value: 28 },{ date: "May 16", value: 38 },
];

export default function PressureChart() {
  return (
    <div style={{ flex: 1, background: "#fff", border: "1px solid #E5E0F0", borderRadius: 10, padding: "10px 12px", display: "flex", flexDirection: "column" }}>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 6 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
          <Activity size={12} style={{ color: "#8A8899" }} />
          <span style={{ fontWeight: 600, color: "#2D1F60", fontSize: 12 }}>Pressure Exit</span>
        </div>
        <select style={{ background: "#F7F5FC", border: "1px solid #E5E0F0", color: "#6B5A9B", fontSize: 10, borderRadius: 6, padding: "2px 6px", outline: "none" }}>
          <option>Last 7 Days</option><option>Last 30 Days</option>
        </select>
      </div>
      <div style={{ flex: 1 }}>
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data} margin={{ top: 2, right: 4, left: -24, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#F0EBF8" vertical={false} />
            <XAxis dataKey="date" tick={{ fill: "#B0A4D0", fontSize: 8 }} axisLine={false} tickLine={false} interval={0} />
            <YAxis domain={[0,100]} ticks={[0,25,50,75,100]} tick={{ fill: "#B0A4D0", fontSize: 8 }} axisLine={false} tickLine={false} />
            <Tooltip contentStyle={{ background: "#fff", border: "1px solid #E5E0F0", borderRadius: 8, fontSize: 10 }} labelStyle={{ color: "#666" }} itemStyle={{ color: "#888" }} />
            <Line type="monotone" dataKey="value" stroke="#9B8FC0" strokeWidth={2} dot={{ fill: "#9B8FC0", r: 2.5, strokeWidth: 0 }} activeDot={{ r: 4 }} />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
