import { Link, useLocation } from "react-router-dom";
import {
  LayoutDashboard,
  BarChart2,
  CalendarDays,
  Lightbulb,
  Settings,
  HelpCircle,
  LogOut,
} from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { ShareCTA } from "./ShareCTA";

interface AppSidebarProps {
  onNavClick?: () => void;
}

const mainNav = [
  { name: "Prezentare Generală", href: "/dashboard", icon: LayoutDashboard },
  { name: "Rezultate", href: "/dashboard/results", icon: BarChart2 },
  { name: "Plan Conținut", href: "/dashboard/content", icon: CalendarDays },
  { name: "Recomandări", href: "/dashboard/recommendations", icon: Lightbulb },
];

const secondaryNav = [
  { name: "Setări", href: "/dashboard/settings", icon: Settings },
  { name: "Ajutor", href: "/despre-aeo", icon: HelpCircle },
];

function NavItem({
  href,
  icon: Icon,
  name,
  active,
  onClick,
}: {
  href: string;
  icon: React.ElementType;
  name: string;
  active: boolean;
  onClick?: () => void;
}) {
  return (
    <Link
      to={href}
      onClick={onClick}
      className="flex items-center gap-3 px-3 py-2.5 rounded-lg mx-2 text-sm font-plex transition-colors relative group"
      style={{
        color: active ? "#F5F5F7" : "#6B6B75",
        background: active ? "rgba(0,229,160,0.08)" : "transparent",
        borderLeft: active ? "2px solid #00E5A0" : "2px solid transparent",
      }}
    >
      <Icon
        className="h-4 w-4 flex-shrink-0"
        style={{ color: active ? "#F5F5F7" : "#6B6B75" }}
      />
      <span>{name}</span>
    </Link>
  );
}

export function AppSidebar({ onNavClick }: AppSidebarProps) {
  const location = useLocation();
  const { user, profile, signOut } = useAuth();

  const isActive = (href: string) => {
    if (href === "/dashboard") return location.pathname === "/dashboard";
    return location.pathname.startsWith(href);
  };

  const initials = (profile?.full_name || user?.email || "U")
    .split(" ")
    .map((n: string) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);

  const displayName =
    profile?.full_name || user?.email?.split("@")[0] || "Utilizator";

  return (
    <div
      className="flex flex-col h-full"
      style={{
        background: "#0A0A0B",
        borderRight: "1px solid rgba(255,255,255,0.06)",
      }}
    >
      {/* Logo */}
      <div className="flex items-center gap-2.5 px-5 h-16 flex-shrink-0 border-b" style={{ borderColor: "rgba(255,255,255,0.06)" }}>
        <Link to="/dashboard" className="flex items-center gap-2.5" onClick={onNavClick}>
          <div
            className="flex h-8 w-8 items-center justify-center rounded-md"
            style={{
              background: "rgba(0,229,160,0.10)",
              border: "1px solid rgba(0,229,160,0.25)",
            }}
          >
            <span className="text-sm font-bold font-syne" style={{ color: "#00E5A0" }}>S</span>
          </div>
          <span className="text-base font-bold font-syne text-foreground">Surgical.AI</span>
        </Link>
      </div>

      {/* Main nav */}
      <nav className="flex-1 py-4 space-y-0.5 overflow-y-auto">
        {mainNav.map((item) => (
          <NavItem
            key={item.href}
            href={item.href}
            icon={item.icon}
            name={item.name}
            active={isActive(item.href)}
            onClick={onNavClick}
          />
        ))}

        {/* Separator */}
        <div className="mx-5 my-3" style={{ height: "1px", background: "rgba(255,255,255,0.06)" }} />

        {secondaryNav.map((item) => (
          <NavItem
            key={item.href}
            href={item.href}
            icon={item.icon}
            name={item.name}
            active={isActive(item.href)}
            onClick={onNavClick}
          />
        ))}
      </nav>

      {/* Share CTA card */}
      <ShareCTA />

      {/* User info */}
      <div
        className="flex items-center gap-3 px-4 py-4 flex-shrink-0"
        style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}
      >
        {/* Avatar */}
        <div
          className="h-8 w-8 rounded-full flex items-center justify-center flex-shrink-0 text-xs font-semibold font-plex"
          style={{
            background: "rgba(0,229,160,0.12)",
            color: "#00E5A0",
          }}
        >
          {initials}
        </div>

        {/* Name + plan */}
        <div className="flex-1 min-w-0">
          <p className="text-xs font-semibold font-plex text-foreground truncate">
            {displayName}
          </p>
          <span
            className="inline-block text-[10px] font-plex font-medium px-1.5 py-0.5 rounded-full mt-0.5"
            style={{
              background: "rgba(0,229,160,0.12)",
              color: "#00E5A0",
              border: "1px solid rgba(0,229,160,0.2)",
            }}
          >
            Tratament
          </span>
        </div>

        {/* Logout */}
        <button
          onClick={() => signOut()}
          aria-label="Deconectare"
          className="text-muted-foreground hover:text-foreground transition-colors flex-shrink-0"
        >
          <LogOut className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}
