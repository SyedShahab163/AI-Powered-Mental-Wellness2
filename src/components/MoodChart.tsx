import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { TrendingUp } from "lucide-react";

const data = [
  { date: "May 10", value: 2 },{ date: "May 11", value: 2.8 },{ date: "May 12", value: 2.5 },
  { date: "May 13", value: 3 },{ date: "May 14", value: 3.2 },{ date: "May 15", value: 3.8 },{ date: "May 16", value: 4.5 },
];

export default function MoodChart() {
  return (
    <div style={{ flex: 1, background: "#fff", border: "1px solid #E5E0F0", borderRadius: 10, padding: "10px 12px", display: "flex", flexDirection: "column" }}>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 6 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
          <TrendingUp size={12} style={{ color: "#7B5EA7" }} />
          <span style={{ fontWeight: 600, color: "#2D1F60", fontSize: 12 }}>Invisible Path</span>
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
            <YAxis domain={[1,5]} ticks={[1,2,3,4,5]} tick={{ fill: "#B0A4D0", fontSize: 8 }} axisLine={false} tickLine={false}
              label={{ value: "Mood", angle: -90, position: "insideLeft", fill: "#B0A4D0", fontSize: 7, dx: 14 }} />
            <Tooltip contentStyle={{ background: "#fff", border: "1px solid #E5E0F0", borderRadius: 8, fontSize: 10 }}
              labelStyle={{ color: "#7B5EA7" }} itemStyle={{ color: "#7B5EA7" }} />
            <Line type="monotone" dataKey="value" stroke="#7B5EA7" strokeWidth={2} dot={{ fill: "#7B5EA7", r: 2.5, strokeWidth: 0 }} activeDot={{ r: 4 }} />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
