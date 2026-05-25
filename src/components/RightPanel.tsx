import HonestyDrop from "./HonestyDrop";
import MirrorOfNow from "./MirrorOfNow";
import UnsaidAdvisor from "./UnsaidAdvisor";

export default function RightPanel() {
  return (
    <aside style={{ width: 252, background: "#F7F5FC", borderLeft: "1px solid #E5E0F0", flexShrink: 0, display: "flex", flexDirection: "column", height: "100%", overflow: "hidden" }}>
      <div style={{ padding: "10px", display: "flex", flexDirection: "column", gap: 8, height: "100%", boxSizing: "border-box" }}>
        <div style={{ flex: 1, minHeight: 0 }}><HonestyDrop /></div>
        <div style={{ flex: 1, minHeight: 0 }}><MirrorOfNow /></div>
        <div style={{ flex: 1, minHeight: 0 }}><UnsaidAdvisor /></div>
      </div>
    </aside>
  );
}
