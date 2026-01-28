import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import SmartAttendance from "./pages/SmartAttendance";
import DigitalNoticeBoard from "./pages/DigitalNoticeBoard";
import SmartTimetable from "./pages/SmartTimetable";
import LostAndFound from "./pages/LostAndFound";
import AINotesAndTutor from "./pages/AINotesAndTutor";
import PerformanceInsights from "./pages/PerformanceInsights";
import CampusMarketplace from "./pages/CampusMarketplace";
import GamificationBadges from "./pages/GamificationBadges";
import CommunityPolls from "./pages/CommunityPolls";
import GreenCredits from "./pages/GreenCredits";
import Login from "./pages/Login";
import AdminPanel from "./pages/AdminPanel";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/login" element={<Login />} />
          <Route path="/admin" element={<AdminPanel />} />
          <Route path="/smart-attendance" element={<SmartAttendance />} />
          <Route path="/digital-notice-board" element={<DigitalNoticeBoard />} />
          <Route path="/smart-timetable" element={<SmartTimetable />} />
          <Route path="/lost-and-found" element={<LostAndFound />} />
          <Route path="/ai-notes-tutor" element={<AINotesAndTutor />} />
          <Route path="/performance-insights" element={<PerformanceInsights />} />
          <Route path="/campus-marketplace" element={<CampusMarketplace />} />
          <Route path="/gamification-badges" element={<GamificationBadges />} />
          <Route path="/community-polls" element={<CommunityPolls />} />
          <Route path="/green-credits" element={<GreenCredits />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
