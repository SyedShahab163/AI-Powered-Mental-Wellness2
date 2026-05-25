import { useState } from "react";
import { Lock, Plus, Trash2, Eye, EyeOff, Save } from "lucide-react";

interface Note { id: number; title: string; body: string; date: string; }

function getNotes(): Note[] {
  try { return JSON.parse(localStorage.getItem("fortress_notes") || "[]"); } catch { return []; }
}
function saveNotes(n: Note[]) { localStorage.setItem("fortress_notes", JSON.stringify(n)); }

const affirmations = [
  "Tum kafi ho — waise hi jaise ho. 🌸",
  "Teri strength unhe nazar nahi aati jo tumhare saath nahi hain.",
  "Har mushkil raat ki subah hoti hay. Thehra raho.",
  "Tum ne jo sahe hay — woh proof hay tum kitne mazboot ho.",
  "Apne aap se pyar karna bhi ibaadat hay. 🕯",
  "Teri kahani abhi khatam nahi hui.",
  "Jo kal se guzrna — sirf tum ne jhela. Proud of you.",
];

export default function MyFortress() {
  const [notes, setNotes] = useState<Note[]>(getNotes);
  const [active, setActive] = useState<Note | null>(null);
  const [isNew, setIsNew] = useState(false);
  const [showBody, setShowBody] = useState(true);
  const [saved, setSaved] = useState(false);
  const aff = affirmations[new Date().getDay() % affirmations.length];

  const newNote = () => {
    const n: Note = { id: Date.now(), title: "", body: "", date: new Date().toLocaleDateString("en-PK", { day: "numeric", month: "short" }) };
    setActive(n); setIsNew(true); setShowBody(true);
  };

  const save = () => {
    if (!active) return;
    const updated = isNew ? [...notes, active] : notes.map(n => n.id === active.id ? active : n);
    setNotes(updated); saveNotes(updated); setIsNew(false);
    setSaved(true); setTimeout(() => setSaved(false), 2000);
  };

  const del = (id: number) => {
    const updated = notes.filter(n => n.id !== id);
    setNotes(updated); saveNotes(updated);
    if (active?.id === id) setActive(null);
  };

  return (
    <div style={{ display: "flex", width: "100%", height: "100%", background: "#F7F5FC", overflow: "hidden" }}>
      <style>{`
        @media (max-width: 640px) { .fortress-sidebar { display: none !important; } }
      `}</style>

      {/* Left sidebar — percentage width */}
      <div className="fortress-sidebar" style={{ width: "22%", minWidth: 170, maxWidth: 230, background: "#fff", borderRight: "1px solid #E5E0F0", display: "flex", flexDirection: "column", flexShrink: 0 }}>
        {/* Daily shield */}
        <div style={{ margin: 8, padding: "10px 12px", background: "linear-gradient(135deg,#2A1B4A,#5A3090)", borderRadius: 10, flexShrink: 0 }}>
          <div style={{ fontSize: 9, color: "#C9A0DC", fontWeight: 700, marginBottom: 4, textTransform: "uppercase", letterSpacing: "0.08em" }}>Today's Shield</div>
          <div style={{ fontSize: 11, color: "#fff", lineHeight: 1.6 }}>{aff}</div>
        </div>

        <div style={{ padding: "6px 12px 6px", borderBottom: "1px solid #E5E0F0", display: "flex", justifyContent: "space-between", alignItems: "center", flexShrink: 0 }}>
          <span style={{ fontWeight: 700, color: "#2D1F60", fontSize: 12 }}>🛡 My Notes</span>
          <button onClick={newNote} style={{ background: "#4A3080", border: "none", borderRadius: 6, padding: "3px 8px", cursor: "pointer", color: "#fff", fontSize: 10, display: "flex", alignItems: "center", gap: 3 }}>
            <Plus size={9} />New
          </button>
        </div>

        <div style={{ flex: 1, overflowY: "auto", padding: "6px 8px", display: "flex", flexDirection: "column", gap: 4 }}>
          {notes.length === 0 && <p style={{ color: "#B0A4D0", fontSize: 11, padding: "8px", textAlign: "center", lineHeight: 1.6 }}>Your fortress is empty. Add your first private note.</p>}
          {[...notes].reverse().map(n => (
            <button key={n.id} onClick={() => { setActive(n); setIsNew(false); setShowBody(true); }}
              style={{ textAlign: "left", background: active?.id === n.id ? "#F0EBF8" : "transparent", border: active?.id === n.id ? "1px solid #D0C0F0" : "1px solid transparent", borderRadius: 8, padding: "8px 10px", cursor: "pointer", width: "100%" }}>
              <div style={{ display: "flex", alignItems: "center", gap: 5 }}>
                <Lock size={10} style={{ color: "#9B7EC8", flexShrink: 0 }} />
                <span style={{ fontWeight: 600, color: "#2D1F60", fontSize: 11, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap", flex: 1 }}>{n.title || "Untitled"}</span>
              </div>
              <div style={{ color: "#B0A4D0", fontSize: 9, marginTop: 2 }}>{n.date}</div>
            </button>
          ))}
        </div>
      </div>

      {/* Editor — full remaining width */}
      <div style={{ flex: 1, display: "flex", flexDirection: "column", padding: "14px 20px", overflow: "hidden", minWidth: 0 }}>
        {!active && (
          <div style={{ marginBottom: 10, display: "flex", alignItems: "center", gap: 8, flexShrink: 0 }}>
            <span style={{ fontWeight: 700, color: "#2D1F60", fontSize: 15 }}>🛡 My Fortress</span>
            <button onClick={newNote} style={{ marginLeft: "auto", background: "#4A3080", border: "none", borderRadius: 8, padding: "7px 16px", color: "#fff", fontSize: 12, fontWeight: 600, cursor: "pointer", display: "flex", alignItems: "center", gap: 5 }}>
              <Plus size={13} /> New Note
            </button>
          </div>
        )}

        {active ? (
          <>
            <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 10, flexShrink: 0, flexWrap: "wrap" }}>
              <button onClick={() => setShowBody(b => !b)} style={{ background: "#F0EBF8", border: "1px solid #D0C0F0", borderRadius: 8, padding: "5px 12px", cursor: "pointer", display: "flex", alignItems: "center", gap: 5, fontSize: 11, color: "#5A4A8A" }}>
                {showBody ? <EyeOff size={12} /> : <Eye size={12} />}{showBody ? "Hide" : "Show"}
              </button>
              <div style={{ flex: 1 }} />
              <button onClick={() => del(active.id)} style={{ background: "#FEE2E2", border: "none", borderRadius: 7, padding: "5px 10px", cursor: "pointer", color: "#e57373" }}><Trash2 size={13} /></button>
              <button onClick={save} style={{ background: saved ? "#34D399" : "#4A3080", border: "none", borderRadius: 8, padding: "7px 18px", color: "#fff", fontSize: 12, fontWeight: 600, cursor: "pointer", display: "flex", alignItems: "center", gap: 5, transition: "background .3s" }}>
                <Save size={12} />{saved ? "Saved!" : "Save"}
              </button>
            </div>
            <input value={active.title} onChange={e => setActive(a => a ? {...a, title: e.target.value} : a)}
              placeholder="Note title…"
              style={{ background: "transparent", border: "none", outline: "none", fontSize: 22, fontWeight: 700, color: "#2D1F60", marginBottom: 12, flexShrink: 0, width: "100%" }} />
            {showBody
              ? <textarea value={active.body} onChange={e => setActive(a => a ? {...a, body: e.target.value} : a)}
                  placeholder="Yeh jagah sirf tumhari hay. Koi nahi padhhega. Likho jo dil chahaye…"
                  style={{ flex: 1, background: "#fff", border: "1px solid #E5E0F0", borderRadius: 12, padding: "14px 16px", fontSize: 14, color: "#2D1F60", resize: "none", outline: "none", lineHeight: 1.85, fontFamily: "inherit", width: "100%", boxSizing: "border-box" }} />
              : <div style={{ flex: 1, background: "#F0EBF8", border: "1px solid #D0C0F0", borderRadius: 12, display: "flex", alignItems: "center", justifyContent: "center", flexDirection: "column", gap: 8 }}>
                  <Lock size={32} style={{ color: "#9B7EC8" }} />
                  <p style={{ color: "#7B5EA7", fontSize: 13 }}>Hidden for privacy</p>
                </div>
            }
          </>
        ) : (
          <div style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 12 }}>
            <div style={{ fontSize: 48 }}>🛡</div>
            <p style={{ color: "#9B8FC0", fontSize: 14, textAlign: "center", maxWidth: 320, lineHeight: 1.7 }}>This is your fortress. Private, safe, and only yours. No one else can see what you write here.</p>
            <button onClick={newNote} style={{ background: "#4A3080", border: "none", borderRadius: 10, padding: "10px 24px", color: "#fff", fontSize: 13, fontWeight: 600, cursor: "pointer" }}>Create Private Note</button>
          </div>
        )}
      </div>
    </div>
  );
}
