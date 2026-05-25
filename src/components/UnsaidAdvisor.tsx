import { useState } from "react";
import { Sparkles } from "lucide-react";

const aiResponses = [
  "Break into 5-minute steps. Then breathe. Do one now.",
  "One breath. Then one word. You've got this.",
  "Let the feeling pass through you. It won't last.",
  "The problem shrinks when you name it out loud.",
  "You've survived harder days. Today is manageable.",
];

export default function UnsaidAdvisor() {
  const [input, setInput] = useState("");
  const [response, setResponse] = useState("Break into 5-minute steps. Then breathe. Do one now.");

  const send = () => {
    if (!input.trim()) return;
    setResponse(aiResponses[Math.floor(Math.random() * aiResponses.length)]);
    setInput("");
  };

  return (
    <div style={{ background: "#fff", border: "1px solid #E5E0F0", borderRadius: 10, padding: "10px 12px", position: "relative", height: "100%", boxSizing: "border-box" }}>
      <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 8 }}>
        <img src="/candle-real.png" alt="candle"
          style={{ width: 14, height: 14, objectFit: "cover", borderRadius: 3 }} />
        <span style={{ fontWeight: 600, color: "#2D1F60", fontSize: 12 }}>The Unsaid Advisor</span>
      </div>
      <textarea value={input} onChange={e => setInput(e.target.value)}
        onKeyDown={e => e.key === "Enter" && !e.shiftKey && (e.preventDefault(), send())}
        placeholder="*Job ki tension kaise kam karun?*"
        style={{ width: "100%", background: "#F7F5FC", border: "1px solid #E5E0F0", borderRadius: 7, padding: "6px 8px", fontSize: 10, color: "#5A4A8A", fontStyle: "italic", resize: "none", outline: "none", height: 34, fontFamily: "inherit", boxSizing: "border-box" }} />
      <div style={{ background: "#F0EBF8", border: "1px solid #D8C8F0", borderRadius: 7, padding: "6px 8px", marginTop: 6, fontSize: 10, color: "#3A2070", lineHeight: 1.6, paddingRight: 28 }}>
        {response}
      </div>
      <button onClick={send}
        style={{ position: "absolute", bottom: 16, right: 16, background: "#4A3080", border: "none", borderRadius: "50%", width: 22, height: 22, display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer" }}>
        <Sparkles size={11} style={{ color: "#fff" }} />
      </button>
    </div>
  );
}
