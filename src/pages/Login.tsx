import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";

interface LoginProps {
  onLogin: (user: { name: string; age: string; country: string }) => void;
  onNavigate: (page: string) => void;
}

export default function Login({ onLogin, onNavigate }: LoginProps) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPass, setShowPass] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) { setError("Please fill in all fields."); return; }
    const stored = localStorage.getItem("simon_user");
    if (stored) {
      const u = JSON.parse(stored);
      if (u.email === email && u.password === password) { onLogin({ name: u.name, age: u.age, country: u.country }); }
      else setError("Invalid email or password.");
    } else setError("No account found. Please sign up first.");
  };

  const inp: React.CSSProperties = {
    width: "100%", background: "rgba(255,255,255,0.12)", border: "1px solid rgba(255,255,255,0.2)",
    borderRadius: 10, padding: "10px 14px", fontSize: 13, color: "#fff", outline: "none",
    boxSizing: "border-box",
  };
  const lbl: React.CSSProperties = { fontSize: 11, fontWeight: 600, color: "rgba(255,255,255,0.75)", display: "block", marginBottom: 5 };

  return (
    <div style={{ height: "100vh", display: "flex", alignItems: "center", justifyContent: "center", overflow: "hidden", position: "relative", background: "#1A0A3C" }}>
      <style>{`
        @keyframes blobFloat1 { 0%,100%{transform:translate(0,0) scale(1)} 50%{transform:translate(30px,-20px) scale(1.08)} }
        @keyframes blobFloat2 { 0%,100%{transform:translate(0,0) scale(1)} 50%{transform:translate(-20px,30px) scale(1.05)} }
        @keyframes blobFloat3 { 0%,100%{transform:translate(0,0) scale(1)} 50%{transform:translate(15px,15px) scale(1.06)} }
        ::placeholder { color: rgba(255,255,255,0.35) !important; }
      `}</style>

      {/* Blurred background blobs */}
      <div style={{ position:"absolute", width:400, height:400, borderRadius:"50%", background:"radial-gradient(circle, #7C3AED 0%, #4C1D95 60%, transparent 80%)", top:-80, left:-80, filter:"blur(80px)", opacity:.7, animation:"blobFloat1 8s ease-in-out infinite" }} />
      <div style={{ position:"absolute", width:350, height:350, borderRadius:"50%", background:"radial-gradient(circle, #9333EA 0%, #5B21B6 60%, transparent 80%)", bottom:-60, right:-60, filter:"blur(70px)", opacity:.65, animation:"blobFloat2 10s ease-in-out infinite" }} />
      <div style={{ position:"absolute", width:250, height:250, borderRadius:"50%", background:"radial-gradient(circle, #6D28D9 0%, transparent 70%)", top:"40%", right:"20%", filter:"blur(60px)", opacity:.5, animation:"blobFloat3 7s ease-in-out infinite" }} />

      {/* Glassmorphism card */}
      <div style={{ position:"relative", zIndex:2, width:"100%", maxWidth:420, margin:"0 16px", background:"rgba(255,255,255,0.08)", backdropFilter:"blur(24px)", WebkitBackdropFilter:"blur(24px)", borderRadius:24, border:"1px solid rgba(255,255,255,0.15)", padding:"36px 36px", boxShadow:"0 24px 80px rgba(0,0,0,0.4)" }}>

        {/* Logo */}
        <div style={{ display:"flex", alignItems:"center", gap:10, marginBottom:28 }}>
          <div style={{ background:"linear-gradient(135deg,#7C3AED,#A78BFA)", borderRadius:10, width:36, height:36, display:"flex", alignItems:"center", justifyContent:"center", fontSize:18 }}>🕯</div>
          <div>
            <div style={{ fontWeight:800, color:"#fff", fontSize:16 }}>SIMON AI</div>
            <div style={{ fontSize:10, color:"rgba(196,181,253,0.8)" }}>The Unburden</div>
          </div>
        </div>

        <h2 style={{ color:"#fff", fontSize:24, fontWeight:700, marginBottom:4 }}>Welcome back</h2>
        <p style={{ color:"rgba(196,181,253,0.75)", fontSize:12, marginBottom:24 }}>Your safe space is waiting for you.</p>

        {error && <div style={{ background:"rgba(254,226,226,0.15)", border:"1px solid rgba(252,165,165,0.3)", color:"#FCA5A5", fontSize:11, borderRadius:8, padding:"8px 12px", marginBottom:14 }}>{error}</div>}

        <form onSubmit={handleSubmit} style={{ display:"flex", flexDirection:"column", gap:14 }}>
          <div><label style={lbl}>Email Address</label><input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="your@email.com" style={inp} /></div>
          <div>
            <label style={lbl}>Password</label>
            <div style={{ position:"relative" }}>
              <input type={showPass ? "text" : "password"} value={password} onChange={e => setPassword(e.target.value)} placeholder="Enter your password" style={{ ...inp, paddingRight:36 }} />
              <button type="button" onClick={() => setShowPass(!showPass)} style={{ position:"absolute", right:12, top:"50%", transform:"translateY(-50%)", background:"none", border:"none", cursor:"pointer", color:"rgba(255,255,255,0.5)" }}>
                {showPass ? <EyeOff size={14} /> : <Eye size={14} />}
              </button>
            </div>
          </div>
          <button type="submit" style={{ background:"linear-gradient(135deg,#7C3AED,#9333EA)", color:"#fff", border:"none", borderRadius:12, padding:"12px", fontSize:14, fontWeight:700, cursor:"pointer", marginTop:4, boxShadow:"0 4px 20px rgba(124,58,237,0.5)", letterSpacing:"0.02em" }}>
            Sign In
          </button>
        </form>

        <p style={{ textAlign:"center", fontSize:12, color:"rgba(196,181,253,0.7)", marginTop:20 }}>
          Don't have an account?{" "}
          <button onClick={() => onNavigate("signup")} style={{ background:"none", border:"none", color:"#C4B5FD", fontWeight:700, cursor:"pointer", fontSize:12 }}>Sign up</button>
        </p>
        <p style={{ textAlign:"center", fontSize:11, color:"rgba(255,255,255,0.3)", marginTop:10, cursor:"pointer" }} onClick={() => onNavigate("home")}>← Back to home</p>
      </div>
    </div>
  );
}
