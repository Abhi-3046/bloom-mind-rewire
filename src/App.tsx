import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AppLayout } from "@/components/AppLayout";
import Index from "./pages/Index";
import Stats from "./pages/Stats";
import Profile from "./pages/Profile";
import AIGuide from "./pages/AIGuide";
import Breathing from "./pages/Breathing";
import Soundscapes from "./pages/Soundscapes";
import Podcasts from "./pages/Podcasts";
import Schedule from "./pages/Schedule";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <AppLayout>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/stats" element={<Stats />} />
            <Route path="/ai-guide" element={<AIGuide />} />
            <Route path="/breathing" element={<Breathing />} />
            <Route path="/soundscapes" element={<Soundscapes />} />
            <Route path="/podcasts" element={<Podcasts />} />
            <Route path="/schedule" element={<Schedule />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </AppLayout>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
