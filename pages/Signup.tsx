import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";

interface SignupProps {
  onLogin: (user: { name: string; age: string; country: string }) => void;
  onNavigate: (page: string) => void;
}

const countries = ["India","Pakistan","Bangladesh","United States","United Kingdom","Canada","Australia","UAE","Saudi Arabia","Germany","France","Japan","China","Brazil","South Africa","Other"];

export default function Signup({ onLogin, onNavigate }: SignupProps) {
  const [form, setForm] = useState({ name:"", email:"", age:"", country:"", password:"", confirm:"" });
  const [showPass, setShowPass] = useState(false);
  const [error, setError] = useState("");
  const set = (k: string) => (e: React.ChangeEvent<HTMLInputElement|HTMLSelectElement>) => setForm(f => ({ ...f, [k]: e.target.value }));

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name||!form.email||!form.age||!form.country||!form.password) { setError("Please fill in all fields."); return; }
    if (form.password !== form.confirm) { setError("Passwords do not match."); return; }
    localStorage.setItem("simon_user", JSON.stringify(form));
    onLogin({ name: form.name, age: form.age, country: form.country });
  };

  const inp: React.CSSProperties = {
    width:"100%", background:"rgba(255,255,255,0.1)", border:"1px solid rgba(255,255,255,0.18)",
    borderRadius:10, padding:"9px 12px", fontSize:12, color:"#fff", outline:"none", boxSizing:"border-box",
  };
  const lbl: React.CSSProperties = { fontSize:10, fontWeight:600, color:"rgba(255,255,255,0.7)", display:"block", marginBottom:4 };

  return (
    <div style={{ height:"100vh", display:"flex", alignItems:"center", justifyContent:"center", overflow:"hidden", position:"relative", background:"#1A0A3C" }}>
      <style>{`
        @keyframes blob1 { 0%,100%{transform:translate(0,0) scale(1)} 50%{transform:translate(25px,-18px) scale(1.07)} }
        @keyframes blob2 { 0%,100%{transform:translate(0,0) scale(1)} 50%{transform:translate(-22px,25px) scale(1.05)} }
        @keyframes blob3 { 0%,100%{transform:translate(0,0) scale(1)} 50%{transform:translate(18px,12px) scale(1.06)} }
        ::placeholder { color: rgba(255,255,255,0.3) !important; }
        .su-select option { background: #2D1060; color: #fff; }
      `}</style>

      {/* Blurred background blobs */}
      <div style={{ position:"absolute", width:500, height:500, borderRadius:"50%", background:"radial-gradient(circle, #7C3AED 0%, #4C1D95 55%, transparent 78%)", top:-140, left:-120, filter:"blur(90px)", opacity:.65, animation:"blob1 9s ease-in-out infinite" }} />
      <div style={{ position:"absolute", width:400, height:400, borderRadius:"50%", background:"radial-gradient(circle, #9333EA 0%, #6D28D9 55%, transparent 78%)", bottom:-100, right:-80, filter:"blur(80px)", opacity:.6, animation:"blob2 11s ease-in-out infinite" }} />
      <div style={{ position:"absolute", width:280, height:280, borderRadius:"50%", background:"radial-gradient(circle, #A855F7 0%, transparent 70%)", top:"35%", right:"25%", filter:"blur(65px)", opacity:.45, animation:"blob3 7s ease-in-out infinite" }} />

      {/* Glassmorphism card */}
      <div style={{ position:"relative", zIndex:2, width:"100%", maxWidth:440, margin:"0 16px", background:"rgba(255,255,255,0.07)", backdropFilter:"blur(28px)", WebkitBackdropFilter:"blur(28px)", borderRadius:24, border:"1px solid rgba(255,255,255,0.13)", padding:"28px 32px", boxShadow:"0 24px 80px rgba(0,0,0,0.45)", overflowY:"auto", maxHeight:"92vh" }}>

        {/* Logo */}
        <div style={{ display:"flex", alignItems:"center", gap:10, marginBottom:22 }}>
          <div style={{ background:"linear-gradient(135deg,#7C3AED,#A78BFA)", borderRadius:10, width:32, height:32, display:"flex", alignItems:"center", justifyContent:"center", fontSize:16 }}>🕯</div>
          <div>
            <div style={{ fontWeight:800, color:"#fff", fontSize:15 }}>SIMON AI</div>
            <div style={{ fontSize:9, color:"rgba(196,181,253,0.8)" }}>The Unburden</div>
          </div>
        </div>

        <h2 style={{ color:"#fff", fontSize:22, fontWeight:700, marginBottom:3 }}>Create your account</h2>
        <p style={{ color:"rgba(196,181,253,0.7)", fontSize:12, marginBottom:20 }}>A private sanctuary, just for you.</p>

        {error && <div style={{ background:"rgba(254,226,226,0.12)", border:"1px solid rgba(252,165,165,0.3)", color:"#FCA5A5", fontSize:11, borderRadius:8, padding:"7px 12px", marginBottom:12 }}>{error}</div>}

        <form onSubmit={handleSubmit} style={{ display:"flex", flexDirection:"column", gap:11 }}>
          <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:10 }}>
            <div><label style={lbl}>Full Name</label><input value={form.name} onChange={set("name")} placeholder="Armaan Khan" style={inp} /></div>
            <div><label style={lbl}>Age</label><input type="number" value={form.age} onChange={set("age")} placeholder="24" min="13" max="120" style={inp} /></div>
          </div>
          <div><label style={lbl}>Email Address</label><input type="email" value={form.email} onChange={set("email")} placeholder="your@email.com" style={inp} /></div>
          <div>
            <label style={lbl}>Country</label>
            <select className="su-select" value={form.country} onChange={set("country")} style={{ ...inp, cursor:"pointer" }}>
              <option value="">Select your country</option>
              {countries.map(c => <option key={c} value={c}>{c}</option>)}
            </select>
          </div>
          <div>
            <label style={lbl}>Password</label>
            <div style={{ position:"relative" }}>
              <input type={showPass ? "text" : "password"} value={form.password} onChange={set("password")} placeholder="Create a password" style={{ ...inp, paddingRight:34 }} />
              <button type="button" onClick={() => setShowPass(!showPass)} style={{ position:"absolute", right:10, top:"50%", transform:"translateY(-50%)", background:"none", border:"none", cursor:"pointer", color:"rgba(255,255,255,0.5)" }}>
                {showPass ? <EyeOff size={13} /> : <Eye size={13} />}
              </button>
            </div>
          </div>
          <div><label style={lbl}>Confirm Password</label><input type="password" value={form.confirm} onChange={set("confirm")} placeholder="Repeat your password" style={inp} /></div>

          <button type="submit" style={{ background:"linear-gradient(135deg,#7C3AED,#9333EA)", color:"#fff", border:"none", borderRadius:12, padding:"11px", fontSize:13, fontWeight:700, cursor:"pointer", marginTop:4, boxShadow:"0 4px 20px rgba(124,58,237,0.5)" }}>
            Create Account
          </button>
        </form>

        <p style={{ textAlign:"center", fontSize:11, color:"rgba(196,181,253,0.65)", marginTop:16 }}>
          Already have an account?{" "}
          <button onClick={() => onNavigate("login")} style={{ background:"none", border:"none", color:"#C4B5FD", fontWeight:700, cursor:"pointer", fontSize:11 }}>Sign in</button>
        </p>
        <p style={{ textAlign:"center", fontSize:10, color:"rgba(255,255,255,0.28)", marginTop:8, cursor:"pointer" }} onClick={() => onNavigate("home")}>← Back to home</p>
      </div>
    </div>
  );
}
