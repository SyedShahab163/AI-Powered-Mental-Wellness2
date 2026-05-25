import { Search, Bell } from "lucide-react";

export default function TopBar() {
  return (
    <header style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "0 18px", height: 52, background: "#fff", flexShrink: 0, width: "100%" }}>
      <div>
        <div style={{ fontWeight: 700, color: "#2D1F60", fontSize: 16, letterSpacing: "0.04em" }}>THE UNBURDEN</div>
        <div style={{ fontSize: 10, color: "#9B8FC0", marginTop: 1 }}>Your feelings die here. Your peace begins here.</div>
      </div>
      <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 6, background: "#F7F5FC", border: "1px solid #E5E0F0", borderRadius: 8, padding: "5px 10px", width: 170 }}>
          <Search size={12} style={{ color: "#9B8FC0" }} />
          <input type="text" placeholder="Search" style={{ background: "transparent", border: "none", outline: "none", fontSize: 12, color: "#2D1F60", width: "100%" }} />
        </div>
        <div style={{ position: "relative" }}>
          <Bell size={17} style={{ color: "#7B5EA7", cursor: "pointer" }} />
          <span style={{ position: "absolute", top: -4, right: -4, background: "#ef4444", color: "#fff", fontSize: 8, fontWeight: 700, borderRadius: "50%", width: 13, height: 13, display: "flex", alignItems: "center", justifyContent: "center" }}>1</span>
        </div>
      </div>
    </header>
  );
}
