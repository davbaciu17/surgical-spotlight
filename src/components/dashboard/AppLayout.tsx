import { useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { AppSidebar } from "./AppSidebar";
import { Loader2 } from "lucide-react";

interface AppLayoutProps {
  children: React.ReactNode;
}

export function AppLayout({ children }: AppLayoutProps) {
  const { user, isLoading } = useAuth();
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

  if (isLoading) {
    return (
      <div
        className="min-h-screen flex items-center justify-center"
        style={{ background: "#0A0A0B" }}
      >
        <Loader2 className="h-8 w-8 animate-spin" style={{ color: "#00E5A0" }} />
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return (
    <div className="min-h-screen bg-background flex">
      {/* Desktop sidebar — fixed, 260px */}
      <aside className="hidden lg:flex flex-col fixed inset-y-0 left-0 z-30 w-[260px]">
        <AppSidebar />
      </aside>

      {/* Mobile sidebar overlay */}
      {mobileSidebarOpen && (
        <div
          className="fixed inset-0 z-40 lg:hidden"
          onClick={() => setMobileSidebarOpen(false)}
          style={{ background: "rgba(0,0,0,0.6)", backdropFilter: "blur(4px)" }}
        />
      )}

      {/* Mobile sidebar drawer */}
      <aside
        className="fixed inset-y-0 left-0 z-50 w-[260px] lg:hidden transition-transform duration-300 ease-in-out"
        style={{
          transform: mobileSidebarOpen ? "translateX(0)" : "translateX(-100%)",
        }}
      >
        <AppSidebar onNavClick={() => setMobileSidebarOpen(false)} />
      </aside>

      {/* Main content */}
      <div className="flex-1 lg:ml-[260px] flex flex-col min-h-screen">
        {/* Mobile top bar */}
        <header
          className="lg:hidden sticky top-0 z-20 flex items-center justify-between h-14 px-4"
          style={{
            background: "rgba(10,10,11,0.92)",
            backdropFilter: "blur(12px)",
            borderBottom: "1px solid rgba(255,255,255,0.06)",
          }}
        >
          <button
            onClick={() => setMobileSidebarOpen(!mobileSidebarOpen)}
            aria-label="Meniu"
            className="text-muted-foreground hover:text-foreground transition-colors"
          >
            {mobileSidebarOpen ? (
              <X className="h-5 w-5" />
            ) : (
              <Menu className="h-5 w-5" />
            )}
          </button>

          {/* Mobile logo */}
          <div className="flex items-center gap-2">
            <div
              className="flex h-7 w-7 items-center justify-center rounded-md"
              style={{
                background: "rgba(0,229,160,0.10)",
                border: "1px solid rgba(0,229,160,0.25)",
              }}
            >
              <span className="text-xs font-bold font-syne" style={{ color: "#00E5A0" }}>S</span>
            </div>
            <span className="text-sm font-bold font-syne">Surgical.AI</span>
          </div>

          <div className="w-8" />
        </header>

        {/* Page content */}
        <main className="flex-1">{children}</main>
      </div>
    </div>
  );
}
