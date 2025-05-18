
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import Dashboard from "./components/dashboard/Dashboard";
import EmergencyAccess from "./components/emergency/EmergencyAccess";
import LoginForm from "./components/auth/LoginForm";
import SignupForm from "./components/auth/SignupForm";

// Create pages for routes we don't have components for yet
const Profile = () => (
  <div>
    <h1 className="text-3xl font-bold mb-4">User Profile</h1>
    <p className="text-muted-foreground">Profile page content coming soon.</p>
  </div>
);

const Settings = () => (
  <div>
    <h1 className="text-3xl font-bold mb-4">Settings</h1>
    <p className="text-muted-foreground">Settings page content coming soon.</p>
  </div>
);

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/login" element={
            <div className="min-h-screen flex items-center justify-center bg-muted/30 p-4">
              <LoginForm />
            </div>
          } />
          <Route path="/signup" element={
            <div className="min-h-screen flex items-center justify-center bg-muted/30 p-4">
              <SignupForm />
            </div>
          } />
          <Route path="/dashboard" element={<Layout><Dashboard /></Layout>} />
          <Route path="/emergency" element={<Layout><EmergencyAccess /></Layout>} />
          <Route path="/profile" element={<Layout><Profile /></Layout>} />
          <Route path="/settings" element={<Layout><Settings /></Layout>} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
