import HeroBanner from "@/components/HeroBanner";
import MoodChart from "@/components/MoodChart";
import PressureChart from "@/components/PressureChart";
import LetGoChamber from "@/components/LetGoChamber";
import WoundPouch from "@/components/WoundPouch";

interface DashboardProps { userName?: string; }

export default function Dashboard({ userName }: DashboardProps) {
  return (
    <div style={{ display: "flex", flexDirection: "column", width: "100%", height: "100%", padding: "10px 12px", gap: 8, background: "#F7F5FC", overflow: "hidden", boxSizing: "border-box" }}>

      {/* Row 1: Hero */}
      <div style={{ flexShrink: 0 }}>
        <HeroBanner userName={userName} />
      </div>

      {/* Row 2: Charts side by side */}
      <div style={{ display: "flex", gap: 8, height: 145, flexShrink: 0 }}>
        <MoodChart />
        <PressureChart />
      </div>

      {/* Row 3: Let-Go Chamber */}
      <div style={{ flex: 1, minHeight: 0 }}>
        <LetGoChamber />
      </div>

      {/* Row 4: Wound Pouch */}
      <div style={{ flex: 1, minHeight: 0 }}>
        <WoundPouch />
      </div>
    </div>
  );
}
