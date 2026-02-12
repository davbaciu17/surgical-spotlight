import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import { ProtectedRoute } from "@/components/auth/ProtectedRoute";
import Index from "./pages/Index";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Dashboard from "./pages/Dashboard";
import Scanner from "./pages/Scanner";
import ScanResults from "./pages/ScanResults";
import Companies from "./pages/Companies";
import Recommendations from "./pages/Recommendations";
import Settings from "./pages/Settings";
import NotFound from "./pages/NotFound";
import GDPR from "./pages/GDPR";
import Terms from "./pages/Terms";
import Privacy from "./pages/Privacy";
import GhidAEOGEO from "./pages/GhidAEOGEO";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <AuthProvider>
          <Routes>
            {/* Public routes */}
            <Route path="/" element={<Index />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/gdpr" element={<GDPR />} />
            <Route path="/terms" element={<Terms />} />
            <Route path="/privacy" element={<Privacy />} />
            <Route path="/ghid-aeo-geo" element={<GhidAEOGEO />} />

            {/* Protected routes */}
            <Route element={<ProtectedRoute />}>
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/scanner" element={<Scanner />} />
              <Route path="/scanner/results/:id" element={<ScanResults />} />
              <Route path="/companies" element={<Companies />} />
              <Route path="/recommendations" element={<Recommendations />} />
              <Route path="/settings" element={<Settings />} />
            </Route>

            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </AuthProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
