import { useState, useRef } from "react";
import { Home, MessageCircle, BookOpen, HeartPulse, Shield, Lamp, LogOut, Camera } from "lucide-react";

interface SidebarProps {
  activePage: string;
  onNavigate: (page: string) => void;
  user?: { name: string; age: string; country: string } | null;
  onLogout?: () => void;
}

const navItems = [
  { id: "overview",  label: "Overview",           icon: Home },
  { id: "dialogue",  label: "Unburden Dialogue",  icon: MessageCircle },
  { id: "deep-well", label: "The Deep Well",       icon: BookOpen },
  { id: "pulse",     label: "Pulse Monitor",       icon: HeartPulse },
];

const bottomItems = [
  { id: "fortress",  label: "My Fortress",     icon: Shield },
  { id: "step-back", label: "Step Back Light", icon: Lamp },
];

function getStoredPhoto(): string {
  return localStorage.getItem("simon_profile_photo") || "https://i.pravatar.cc/150?img=68";
}

export default function Sidebar({ activePage, onNavigate, user, onLogout }: SidebarProps) {
  const [photo, setPhoto] = useState<string>(getStoredPhoto);
  const [hoveringPhoto, setHoveringPhoto] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);

  const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => {
      const dataUrl = ev.target?.result as string;
      setPhoto(dataUrl);
      localStorage.setItem("simon_profile_photo", dataUrl);
    };
    reader.readAsDataURL(file);
  };

  return (
    <aside style={{ width: 200, background: "#F7F5FC", borderRight: "1px solid #E5E0F0", display: "flex", flexDirection: "column", height: "100vh", flexShrink: 0 }}>
      {/* Logo */}
      <div style={{ padding: "14px 14px 10px", borderBottom: "1px solid #E5E0F0", display: "flex", alignItems: "center", gap: 8 }}>
        <img src="/candle-real.png" alt="candle"
          style={{ width: 22, height: 22, objectFit: "cover", borderRadius: 4 }} />
        <span style={{ fontWeight: 700, color: "#3A2070", fontSize: 15, letterSpacing: "0.03em" }}>SIMON AI</span>
      </div>

      {/* Profile */}
      <div style={{ padding: "12px 14px", borderBottom: "1px solid #E5E0F0", textAlign: "center" }}>
        {/* Clickable photo with camera overlay */}
        <div
          style={{ position: "relative", width: 62, height: 62, margin: "0 auto 8px", cursor: "pointer" }}
          onMouseEnter={() => setHoveringPhoto(true)}
          onMouseLeave={() => setHoveringPhoto(false)}
          onClick={() => fileRef.current?.click()}
          title="Upload profile photo"
        >
          <img
            src={photo}
            alt={user?.name || "User"}
            style={{ width: 62, height: 62, borderRadius: "50%", objectFit: "cover", border: "2px solid #9B7EC8", display: "block" }}
          />
          {/* Hover overlay */}
          <div style={{
            position: "absolute", inset: 0, borderRadius: "50%",
            background: "rgba(74,48,128,0.55)",
            display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
            opacity: hoveringPhoto ? 1 : 0,
            transition: "opacity .2s",
          }}>
            <Camera size={16} style={{ color: "#fff" }} />
            <span style={{ color: "#fff", fontSize: 8, marginTop: 2, fontWeight: 600 }}>Upload</span>
          </div>
        </div>

        {/* Hidden file input */}
        <input
          ref={fileRef}
          type="file"
          accept="image/*"
          style={{ display: "none" }}
          onChange={handlePhotoChange}
        />

        <div style={{ fontWeight: 700, color: "#2D1F60", fontSize: 13 }}>{user?.name || "Armaan Khan"}</div>
        <div style={{ color: "#8A7AB0", fontSize: 11, marginTop: 2 }}>Age: {user?.age || "24"}</div>
        <div style={{ color: "#8A7AB0", fontSize: 11 }}>
          {user?.country || "India"} {(!user?.country || user.country === "India") ? "🇮🇳" : "🌍"}
        </div>

        {/* Upload button below info */}
        <button
          onClick={() => fileRef.current?.click()}
          style={{
            marginTop: 8, display: "inline-flex", alignItems: "center", gap: 4,
            background: "#EDE8F8", border: "1px solid #D0C0F0", borderRadius: 16,
            padding: "3px 10px", fontSize: 10, color: "#5A4A8A", cursor: "pointer",
          }}
        >
          <Camera size={10} /> Change Photo
        </button>
      </div>

      {/* Nav */}
      <nav style={{ flex: 1, padding: "10px 10px 0", display: "flex", flexDirection: "column", gap: 2 }}>
        {navItems.map(({ id, label, icon: Icon }) => (
          <button key={id} onClick={() => onNavigate(id)}
            style={{
              display: "flex", alignItems: "center", gap: 9, padding: "8px 10px",
              borderRadius: 8, border: "none", cursor: "pointer", width: "100%", textAlign: "left",
              background: activePage === id ? "#4A3080" : "transparent",
              color: activePage === id ? "#fff" : "#6B5A9B",
              fontSize: 12, fontWeight: activePage === id ? 600 : 400,
              transition: "all .15s",
            }}>
            <Icon size={14} style={{ color: activePage === id ? "#fff" : "#9B7EC8" }} />
            {label}
          </button>
        ))}
      </nav>

      {/* Bottom nav + logout */}
      <div style={{ padding: "8px 10px", borderTop: "1px solid #E5E0F0", display: "flex", flexDirection: "column", gap: 2 }}>
        {bottomItems.map(({ id, label, icon: Icon }) => (
          <button key={id} onClick={() => onNavigate(id)}
            style={{ display: "flex", alignItems: "center", gap: 9, padding: "7px 10px", borderRadius: 8, border: "none", cursor: "pointer", background: "transparent", color: "#6B5A9B", fontSize: 12 }}>
            <Icon size={14} style={{ color: "#9B7EC8" }} />{label}
          </button>
        ))}
        {onLogout && (
          <button onClick={onLogout}
            style={{ display: "flex", alignItems: "center", gap: 9, padding: "7px 10px", borderRadius: 8, border: "none", cursor: "pointer", background: "transparent", color: "#e57373", fontSize: 12, marginTop: 2 }}>
            <LogOut size={14} />Logout
          </button>
        )}
      </div>

      <div style={{ padding: "6px 10px", borderTop: "1px solid #E5E0F0", textAlign: "center" }}>
        <p style={{ fontSize: 9, color: "#B0A4D0", lineHeight: 1.5 }}>© 2024 SIMON AI. All rights reserved.</p>
      </div>
    </aside>
  );
}
