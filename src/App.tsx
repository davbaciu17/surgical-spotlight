import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";

// Public pages
import Index from "./pages/Index";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Analyze from "./pages/Analyze";
import ScanResults from "./pages/ScanResults";
import NotFound from "./pages/NotFound";
import GDPR from "./pages/GDPR";
import Terms from "./pages/Terms";
import Privacy from "./pages/Privacy";
import DespreAEO from "./pages/DespreAEO";

// Authenticated / dashboard pages
import Onboarding from "./pages/Onboarding";
import DashboardOverview from "./pages/DashboardOverview";
import DashboardResults from "./pages/DashboardResults";
import ContentPlan from "./pages/ContentPlan";
import DashboardRecommendations from "./pages/DashboardRecommendations";
import Settings from "./pages/Settings";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <AuthProvider>
          <Routes>
            {/* ── Public routes ── */}
            <Route path="/" element={<Index />} />
            <Route path="/analyze" element={<Analyze />} />
            <Route path="/results/:requestId" element={<ScanResults />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/gdpr" element={<GDPR />} />
            <Route path="/terms" element={<Terms />} />
            <Route path="/privacy" element={<Privacy />} />
            <Route path="/despre-aeo" element={<DespreAEO />} />

            {/* ── Authenticated dashboard routes ── */}
            {/* Auth guard is inside AppLayout — each page just uses AppLayout */}
            <Route path="/onboarding" element={<Onboarding />} />
            <Route path="/dashboard" element={<DashboardOverview />} />
            <Route path="/dashboard/results" element={<DashboardResults />} />
            <Route path="/dashboard/content" element={<ContentPlan />} />
            <Route path="/dashboard/recommendations" element={<DashboardRecommendations />} />
            <Route path="/dashboard/settings" element={<Settings />} />

            {/* ── Legacy redirects ── */}
            <Route path="/scanner" element={<Navigate to="/dashboard" replace />} />
            <Route path="/companies" element={<Navigate to="/dashboard" replace />} />
            <Route path="/recommendations" element={<Navigate to="/dashboard/recommendations" replace />} />

            {/* ── Fallback ── */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </AuthProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
