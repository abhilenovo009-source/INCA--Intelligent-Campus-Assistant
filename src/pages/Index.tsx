import { useState, useEffect } from "react";
import CampusHero from "@/components/CampusHero";
import FeatureGrid from "@/components/FeatureGrid";
import DashboardPreview from "@/components/DashboardPreview";
import NoticeBoard from "@/components/NoticeBoard";
import PollsList from "@/components/PollsList";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Link, useNavigate } from "react-router-dom";
import { LogIn, Shield, LogOut, User } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

const Index = () => {
  const [user, setUser] = useState<any>(null);
  const [userRole, setUserRole] = useState<string | null>(null);
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    checkUser();
    
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      if (session) {
        setUser(session.user);
        fetchUserRole(session.user.id);
      } else {
        setUser(null);
        setUserRole(null);
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  const checkUser = async () => {
    const { data: { session } } = await supabase.auth.getSession();
    if (session) {
      setUser(session.user);
      await fetchUserRole(session.user.id);
    }
  };

  const fetchUserRole = async (userId: string) => {
    const { data: roles } = await supabase
      .from("user_roles")
      .select("role")
      .eq("user_id", userId)
      .maybeSingle();
    
    if (roles) {
      setUserRole(roles.role);
    }
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    setUser(null);
    setUserRole(null);
    toast({
      title: "Logged out",
      description: "You have been successfully logged out.",
    });
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden">
      {/* Navigation Bar */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
        <div className="container mx-auto px-6 py-4 flex items-center justify-between">
          <Link to="/" className="text-2xl font-bold bg-gradient-hero bg-clip-text text-transparent">
            INCA: Intelligent Campus Assistant
          </Link>
          <div className="flex items-center gap-4">
            {user ? (
              <>
                {userRole && (
                  <Badge variant="secondary" className="text-sm capitalize">
                    <User className="w-3 h-3 mr-1" />
                    {userRole}
                  </Badge>
                )}
                {userRole === "admin" && (
                  <Link to="/admin">
                    <Button variant="hero" size="sm">
                      <Shield className="w-4 h-4 mr-2" />
                      Admin Panel
                    </Button>
                  </Link>
                )}
                <Button variant="outline" size="sm" onClick={handleLogout}>
                  <LogOut className="w-4 h-4 mr-2" />
                  Logout
                </Button>
              </>
            ) : (
              <Link to="/login">
                <Button variant="outline" size="sm">
                  <LogIn className="w-4 h-4 mr-2" />
                  Login
                </Button>
              </Link>
            )}
          </div>
        </div>
      </nav>
      
      <CampusHero />
      <NoticeBoard />
      <PollsList />
      <FeatureGrid />
      <DashboardPreview />
      
      {/* Footer */}
      <footer className="border-t border-border bg-gradient-card backdrop-blur-sm">
        <div className="container mx-auto px-6 py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="col-span-1 md:col-span-2">
              <h3 className="text-2xl font-bold bg-gradient-hero bg-clip-text text-transparent mb-4">
                INCA: Intelligent Campus Assistant
              </h3>
              <p className="text-muted-foreground mb-4 max-w-md">
                The most comprehensive AI-powered campus app, designed to transform 
                the way students learn, connect, and succeed in their academic journey.
              </p>
              <div className="flex gap-4">
                <Button variant="hero" size="sm">Get Started</Button>
                <Button variant="outline" size="sm">Contact Us</Button>
              </div>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4 text-foreground">Features</h4>
              <div className="space-y-2 text-sm text-muted-foreground">
                <p>AI Attendance System</p>
                <p>Smart Tutoring</p>
                <p>Campus Marketplace</p>
                <p>Lost & Found AI</p>
              </div>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4 text-foreground">Support</h4>
              <div className="space-y-2 text-sm text-muted-foreground">
                <p>Help Center</p>
                <p>Contact Support</p>
                <p>Privacy Policy</p>
                <p>Terms of Service</p>
              </div>
            </div>
          </div>
          
          <div className="border-t border-border mt-8 pt-8 text-center text-sm text-muted-foreground">
            <p>&copy; 2025 INCA. Empowering campus life with AI innovation.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
