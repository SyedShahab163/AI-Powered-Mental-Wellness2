'use client'

import { useState, useEffect } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Menu, X } from "lucide-react";
import Sidebar from "@/components/Sidebar";
import TopBar from "@/components/TopBar";
import RightPanel from "@/components/RightPanel";
import FooterBar from "@/components/FooterBar";
import Dashboard from "@/pages/Dashboard";
import Home from "@/pages/Home";
import Login from "@/pages/Login";
import Signup from "@/pages/Signup";
import UnburdenDialogue from "@/pages/UnburdenDialogue";
import DeepWell from "@/pages/DeepWell";
import PulseMonitor from "@/pages/PulseMonitor";
import MyFortress from "@/pages/MyFortress";
import StepBackLight from "@/pages/StepBackLight";

const queryClient = new QueryClient();

type Page = "home"|"login"|"signup"|"overview"|"dialogue"|"deep-well"|"pulse"|"fortress"|"step-back";
interface User { name: string; age: string; country: string; }

function App() {
  const [page, setPage] = useState<Page>("home");
  const [user, setUser] = useState<User | null>(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem("simon_user");
    if (stored) {
      const u = JSON.parse(stored);
      if (u.name) { setUser({ name: u.name, age: u.age, country: u.country }); setPage("overview"); }
    }
  }, []);

  const handleLogin = (u: User) => { setUser(u); setPage("overview"); };
  const handleLogout = () => { setUser(null); setPage("home"); };
  const navigate = (p: string) => { setPage(p as Page); setSidebarOpen(false); };

  if (page === "home") return <Home onNavigate={p => setPage(p as Page)} />;
  if (page === "login") return <Login onLogin={handleLogin} onNavigate={p => setPage(p as Page)} />;
  if (page === "signup") return <Signup onLogin={handleLogin} onNavigate={p => setPage(p as Page)} />;

  const centerPage = () => {
    if (page === "overview")  return <Dashboard userName={user?.name?.split(" ")[0]} />;
    if (page === "dialogue")  return <UnburdenDialogue />;
    if (page === "deep-well") return <DeepWell />;
    if (page === "pulse")     return <PulseMonitor />;
    if (page === "fortress")  return <MyFortress />;
    if (page === "step-back") return <StepBackLight />;
    return null;
  };

  const showRightPanel = page === "overview";

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <style>{`
          @media (max-width: 768px) {
            .app-sidebar-desktop { display: none !important; }
            .app-right-panel { display: none !important; }
            .hamburger-btn { display: flex !important; }
          }
          @media (min-width: 769px) {
            .app-sidebar-mobile-overlay { display: none !important; }
            .hamburger-btn { display: none !important; }
          }
        `}</style>

        <div style={{ display: "flex", height: "100vh", overflow: "hidden", background: "#F7F5FC", position: "relative" }}>

          {/* Desktop sidebar */}
          <div className="app-sidebar-desktop">
            <Sidebar activePage={page} onNavigate={navigate} user={user} onLogout={handleLogout} />
          </div>

          {/* Mobile sidebar overlay */}
          {sidebarOpen && (
            <div className="app-sidebar-mobile-overlay" style={{ position: "fixed", inset: 0, zIndex: 100, display: "flex" }}>
              <div style={{ position: "absolute", inset: 0, background: "rgba(0,0,0,0.4)" }} onClick={() => setSidebarOpen(false)} />
              <div style={{ position: "relative", zIndex: 101 }}>
                <Sidebar activePage={page} onNavigate={navigate} user={user} onLogout={handleLogout} />
              </div>
              <button onClick={() => setSidebarOpen(false)} style={{ position: "absolute", top: 12, right: 12, background: "rgba(255,255,255,0.9)", border: "none", borderRadius: "50%", width: 32, height: 32, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 102 }}>
                <X size={16} />
              </button>
            </div>
          )}

          <div style={{ flex: 1, display: "flex", flexDirection: "column", overflow: "hidden", minWidth: 0 }}>
            {/* TopBar with hamburger */}
            <div style={{ display: "flex", alignItems: "center", borderBottom: "1px solid #E5E0F0", background: "#fff", flexShrink: 0 }}>
              <button className="hamburger-btn" onClick={() => setSidebarOpen(true)}
                style={{ display: "none", padding: "0 14px", height: 52, alignItems: "center", background: "none", border: "none", cursor: "pointer", color: "#4A3080" }}>
                <Menu size={20} />
              </button>
              <div style={{ flex: 1 }}>
                <TopBar />
              </div>
            </div>

            <div style={{ flex: 1, display: "flex", overflow: "hidden" }}>
              <main style={{ flex: 1, overflow: "hidden", display: "flex", minWidth: 0 }}>
                {centerPage()}
              </main>
              {showRightPanel && (
                <div className="app-right-panel">
                  <RightPanel />
                </div>
              )}
            </div>
            <FooterBar />
          </div>
        </div>
        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
