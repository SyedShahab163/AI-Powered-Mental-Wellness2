export default function FooterBar() {
  return (
    <footer style={{ borderTop: "1px solid #E5E0F0", background: "#fff", flexShrink: 0, padding: "5px 16px", textAlign: "center", display: "flex", alignItems: "center", justifyContent: "center", gap: 6 }}>
      <img src="/candle-real.png" alt="" style={{ width: 13, height: 13, objectFit: "cover", borderRadius: 2, opacity: 0.7 }} />
      <p style={{ fontSize: 10, color: "#9B8FC0" }}>Your words die here. No one else reads. Not even us.</p>
    </footer>
  );
}
