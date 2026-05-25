interface HomeProps { onNavigate: (page: string) => void; }

export default function Home({ onNavigate }: HomeProps) {
  return (
    <div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 20, background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)" }}>
      <h1 style={{ color: "white", fontSize: 48, margin: 0 }}>SIMON AI</h1>
      <p style={{ color: "rgba(255,255,255,0.8)", fontSize: 18 }}>Your personal wellness companion</p>
      <div style={{ display: "flex", gap: 20 }}>
        <button onClick={() => onNavigate("login")} style={{ padding: "12px 30px", fontSize: 16, background: "white", border: "none", borderRadius: 8, cursor: "pointer", fontWeight: 600 }}>Login</button>
        <button onClick={() => onNavigate("signup")} style={{ padding: "12px 30px", fontSize: 16, background: "rgba(255,255,255,0.2)", color: "white", border: "2px solid white", borderRadius: 8, cursor: "pointer", fontWeight: 600 }}>Sign Up</button>
      </div>
    </div>
  );
}