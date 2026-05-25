interface HeroBannerProps { userName?: string; }

export default function HeroBanner({ userName }: HeroBannerProps) {
  return (
    <div style={{
      borderRadius: 12, overflow: "hidden", height: 90, display: "flex", alignItems: "center", padding: "0 20px",
      background: "linear-gradient(135deg,#2A1B4A 0%,#4A2878 50%,#1E1535 100%)",
      border: "1px solid #3D2A5D", position: "relative", flexShrink: 0,
    }}>
      {/* Real candle */}
      <img src="/candle-real.png" alt="candle"
        style={{ width: 56, height: 74, objectFit: "cover", borderRadius: 6, flexShrink: 0, marginRight: 14, boxShadow: "0 0 16px rgba(255,140,0,0.3)" }} />

      <div>
        <div style={{ fontSize: 18, fontWeight: 700, color: "#fff", lineHeight: 1.25 }}>Find Your Deep Calm,</div>
        <div style={{ fontSize: 18, fontWeight: 700, color: "#C9A0DC" }}>{userName || "Armaan"}!</div>
      </div>

      {/* Meditating figure */}
      <div style={{ position: "absolute", right: 16, bottom: 0 }}>
        <svg width="90" height="88" viewBox="0 0 90 88" fill="none">
          <ellipse cx="65" cy="28" rx="18" ry="9" fill="white" opacity="0.08"/>
          <circle cx="45" cy="36" r="10" fill="#C9A0DC"/>
          <ellipse cx="45" cy="52" rx="14" ry="10" fill="#9B5EC8"/>
          <ellipse cx="31" cy="63" rx="10" ry="4" fill="#9B5EC8" style={{transform:"rotate(-10deg)",transformOrigin:"31px 63px"}}/>
          <ellipse cx="59" cy="63" rx="10" ry="4" fill="#9B5EC8" style={{transform:"rotate(10deg)",transformOrigin:"59px 63px"}}/>
          <ellipse cx="28" cy="55" rx="4" ry="11" fill="#9B5EC8" style={{transform:"rotate(-20deg)",transformOrigin:"28px 55px"}}/>
          <ellipse cx="62" cy="55" rx="4" ry="11" fill="#9B5EC8" style={{transform:"rotate(20deg)",transformOrigin:"62px 55px"}}/>
          <circle cx="27" cy="67" r="3" fill="#C9A0DC"/>
          <circle cx="63" cy="67" r="3" fill="#C9A0DC"/>
          <ellipse cx="45" cy="74" rx="18" ry="4" fill="#2D1F55" opacity="0.5"/>
        </svg>
      </div>
    </div>
  );
}
