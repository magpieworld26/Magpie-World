import { Switch, Route, Router as WouterRouter } from "wouter";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/not-found";
import LandingPage from "@/pages/landing";
import LoginPage from "@/pages/login";
import SignupPage from "@/pages/signup";
import RecoverPage from "@/pages/recover";
import VerifyOtpPage from "@/pages/verify-otp";
import HomePage from "@/pages/home";
import StoryDetailPage from "@/pages/story-detail";
import ReaderPage from "@/pages/reader";
import PremiumPage from "@/pages/premium";

const queryClient = new QueryClient();

function Router() {
  return (
    <Switch>
      <Route path="/" component={LandingPage} />
      <Route path="/login" component={LoginPage} />
      <Route path="/signup" component={SignupPage} />
      <Route path="/recover" component={RecoverPage} />
      <Route path="/verify-otp" component={VerifyOtpPage} />
      <Route path="/home" component={HomePage} />
      <Route path="/story/:storyId" component={StoryDetailPage} />
      <Route path="/read/:sessionId" component={ReaderPage} />
      <Route path="/premium" component={PremiumPage} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, "")}>
          <Router />
        </WouterRouter>
        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
