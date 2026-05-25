import { useState, useEffect, useRef } from "react";

type Mode = "idle" | "running" | "done";
type Exercise = "478" | "box" | "calm";

const exercises = {
  "478": { name: "4-7-8 Breathing", desc: "Inhale 4s → Hold 7s → Exhale 8s", phases: ["Inhale", "Hold", "Exhale"], durations: [4, 7, 8], rounds: 4, color: "#7B5EA7" },
  box:   { name: "Box Breathing",   desc: "Inhale 4s → Hold 4s → Exhale 4s → Hold 4s", phases: ["Inhale", "Hold", "Exhale", "Hold"], durations: [4, 4, 4, 4], rounds: 4, color: "#34D399" },
  calm:  { name: "Calm Down",       desc: "Inhale 5s → Exhale 7s (repeat)", phases: ["Inhale", "Exhale"], durations: [5, 7], rounds: 5, color: "#60A5FA" },
};

const grounding = [
  { n: 5, sense: "things you can SEE",   icon: "👀" },
  { n: 4, sense: "things you can TOUCH", icon: "🤚" },
  { n: 3, sense: "things you can HEAR",  icon: "👂" },
  { n: 2, sense: "things you can SMELL", icon: "👃" },
  { n: 1, sense: "thing you can TASTE",  icon: "👅" },
];

export default function StepBackLight() {
  const [ex, setEx]         = useState<Exercise>("478");
  const [mode, setMode]     = useState<Mode>("idle");
  const [phase, setPhase]   = useState(0);
  const [timeLeft, setTimeLeft] = useState(0);
  const [round, setRound]   = useState(1);
  const [scale, setScale]   = useState(1);
  const timerRef = useRef<number | null>(null);
  const cfg = exercises[ex];

  const stop = () => { if (timerRef.current) clearInterval(timerRef.current); setMode("idle"); setPhase(0); setRound(1); setScale(1); };

  const start = () => {
    setMode("running"); setPhase(0); setRound(1);
    setTimeLeft(cfg.durations[0]);
    setScale(cfg.phases[0] === "Inhale" ? 1.4 : 0.7);
  };

  useEffect(() => {
    if (mode !== "running") return;
    timerRef.current = window.setInterval(() => {
      setTimeLeft(t => {
        if (t > 1) return t - 1;
        setPhase(p => {
          const next = (p + 1) % cfg.phases.length;
          const isNewRound = next === 0;
          if (isNewRound) {
            setRound(r => {
              if (r >= cfg.rounds) { clearInterval(timerRef.current!); setMode("done"); return r; }
              return r + 1;
            });
          }
          setTimeLeft(cfg.durations[next]);
          setScale(cfg.phases[next] === "Inhale" ? 1.4 : cfg.phases[next] === "Hold" ? (p > 0 ? 1.4 : 1) : 0.7);
          return next;
        });
        return cfg.durations[0];
      });
    }, 1000);
    return () => { if (timerRef.current) clearInterval(timerRef.current); };
  }, [mode, ex]);

  return (
    <div style={{ display: "flex", width: "100%", height: "100%", background: "#F7F5FC", overflow: "hidden" }}>
      <style>{`
        @media (max-width: 680px) { .sbl-right { display: none !important; } }
      `}</style>

      {/* LEFT: breathing — full remaining width */}
      <div style={{ flex: 1, display: "flex", flexDirection: "column", padding: "14px 20px", overflow: "hidden", minWidth: 0 }}>
        <div style={{ fontWeight: 700, color: "#2D1F60", fontSize: 15, marginBottom: 2, flexShrink: 0 }}>🌬 Step Back Light</div>
        <div style={{ color: "#9B8FC0", fontSize: 11, marginBottom: 14, flexShrink: 0 }}>Take a breath. Everything can wait for 2 minutes.</div>

        {/* Exercise tabs */}
        <div style={{ display: "flex", gap: 8, marginBottom: 14, flexShrink: 0, flexWrap: "wrap" }}>
          {(Object.keys(exercises) as Exercise[]).map(k => (
            <button key={k} onClick={() => { setEx(k); stop(); }}
              style={{ flex: 1, minWidth: 100, padding: "8px 10px", borderRadius: 10, border: ex === k ? `2px solid ${exercises[k].color}` : "1px solid #E5E0F0", background: ex === k ? `${exercises[k].color}18` : "#fff", cursor: "pointer", fontSize: 11, fontWeight: ex === k ? 700 : 400, color: ex === k ? exercises[k].color : "#5A4A8A", transition: "all .2s" }}>
              {exercises[k].name}
            </button>
          ))}
        </div>

        {/* Breathing circle */}
        <div style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
          {mode === "done" ? (
            <div style={{ textAlign: "center" }}>
              <div style={{ fontSize: 56, marginBottom: 12 }}>✨</div>
              <div style={{ fontWeight: 700, color: "#2D1F60", fontSize: 22, marginBottom: 8 }}>Well done!</div>
              <div style={{ color: "#9B8FC0", fontSize: 14, marginBottom: 20 }}>Tumhara dil thoda halka hua hoga.</div>
              <button onClick={stop} style={{ background: "#4A3080", border: "none", borderRadius: 10, padding: "10px 28px", color: "#fff", fontSize: 13, fontWeight: 600, cursor: "pointer" }}>Go Again</button>
            </div>
          ) : (
            <>
              <div style={{ position: "relative", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 24 }}>
                <div style={{ position: "absolute", width: 200, height: 200, borderRadius: "50%", border: `2px solid ${cfg.color}25`, transform: `scale(${scale * 1.18})`, transition: `transform ${cfg.durations[phase]}s ease-in-out` }} />
                <div style={{ position: "absolute", width: 200, height: 200, borderRadius: "50%", border: `1px solid ${cfg.color}15`, transform: `scale(${scale * 1.35})`, transition: `transform ${cfg.durations[phase]}s ease-in-out` }} />
                <div style={{ width: 160, height: 160, borderRadius: "50%", background: `radial-gradient(circle, ${cfg.color}45, ${cfg.color}18)`, border: `3px solid ${cfg.color}`, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", transform: `scale(${scale})`, transition: `transform ${cfg.durations[phase]}s ease-in-out`, boxShadow: `0 0 40px ${cfg.color}30` }}>
                  {mode === "running" && <>
                    <div style={{ fontWeight: 700, color: cfg.color, fontSize: 14 }}>{cfg.phases[phase]}</div>
                    <div style={{ fontWeight: 800, color: "#2D1F60", fontSize: 36 }}>{timeLeft}</div>
                  </>}
                  {mode === "idle" && <div style={{ fontSize: 40 }}>🌬</div>}
                </div>
              </div>

              <div style={{ color: "#9B8FC0", fontSize: 12, marginBottom: 6, textAlign: "center" }}>{cfg.desc}</div>
              {mode === "running" && <div style={{ color: "#B0A4D0", fontSize: 11, marginBottom: 16 }}>Round {round} of {cfg.rounds}</div>}

              {mode === "idle"
                ? <button onClick={start} style={{ background: "#4A3080", border: "none", borderRadius: 10, padding: "10px 32px", color: "#fff", fontSize: 14, fontWeight: 600, cursor: "pointer", boxShadow: "0 4px 16px rgba(74,48,128,0.28)" }}>Begin</button>
                : <button onClick={stop}  style={{ background: "transparent", border: "1px solid #D0C0F0", borderRadius: 10, padding: "8px 24px", color: "#7B5EA7", fontSize: 13, cursor: "pointer" }}>Stop</button>
              }
            </>
          )}
        </div>
      </div>

      {/* RIGHT: grounding — percentage-based width */}
      <div className="sbl-right" style={{ width: "26%", minWidth: 200, maxWidth: 270, background: "#fff", borderLeft: "1px solid #E5E0F0", padding: "14px 14px", flexShrink: 0, overflowY: "auto" }}>
        <div style={{ fontWeight: 700, color: "#2D1F60", fontSize: 13, marginBottom: 4 }}>🌿 5-4-3-2-1 Grounding</div>
        <div style={{ color: "#9B8FC0", fontSize: 10, marginBottom: 14, lineHeight: 1.6 }}>Anxiety ka signal hay ke tum present nahi. Yeh technique tumhein wapas laati hay.</div>
        <div style={{ display: "flex", flexDirection: "column", gap: 9 }}>
          {grounding.map(g => (
            <div key={g.n} style={{ background: "#F7F5FC", border: "1px solid #E5E0F0", borderRadius: 10, padding: "10px 12px" }}>
              <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 6 }}>
                <span style={{ fontSize: 15 }}>{g.icon}</span>
                <span style={{ fontWeight: 700, color: "#4A3080", fontSize: 13 }}>{g.n}</span>
                <span style={{ color: "#5A4A8A", fontSize: 11 }}>{g.sense}</span>
              </div>
              <input placeholder={`Name ${g.n}…`}
                style={{ width: "100%", background: "#fff", border: "1px solid #E5E0F0", borderRadius: 7, padding: "6px 10px", fontSize: 12, color: "#2D1F60", outline: "none", boxSizing: "border-box" }} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
