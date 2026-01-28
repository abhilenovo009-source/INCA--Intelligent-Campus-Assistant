import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { GraduationCap, BookOpen, Shield } from "lucide-react";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loginIdentifier, setLoginIdentifier] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [selectedRole, setSelectedRole] = useState<"student" | "faculty" | "admin" | null>(null);
  const [showRoleDialog, setShowRoleDialog] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    const handleAuthCallback = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      
      if (session) {
        const { data: profile } = await supabase
          .from("profiles")
          .select("*")
          .eq("user_id", session.user.id)
          .maybeSingle();

        if (!profile) {
          const storedRole = localStorage.getItem("pending_role") as "student" | "faculty" | "admin" | null;
          
          if (storedRole) {
            const { error: profileError } = await supabase
              .from("profiles")
              .insert({
                user_id: session.user.id,
                full_name: session.user.user_metadata.full_name || session.user.email?.split('@')[0] || "User",
                email: session.user.email!,
              });

            if (profileError) {
              console.error("Profile creation error:", profileError);
            }

            const { error: roleError } = await supabase
              .from("user_roles")
              .insert({
                user_id: session.user.id,
                role: storedRole,
              });

            if (roleError) {
              console.error("Role assignment error:", roleError);
            }

            localStorage.removeItem("pending_role");
            
            toast({
              title: "Welcome!",
              description: "Your account has been created successfully.",
            });
          }
        }
        
        navigate("/");
      }
    };

    handleAuthCallback();
  }, [navigate, toast]);

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      let emailToUse = loginIdentifier;

      if (!loginIdentifier.includes('@')) {
        const { data: profile, error: profileError } = await supabase
          .from("profiles")
          .select("email")
          .eq("roll_no", loginIdentifier)
          .maybeSingle();

        if (profileError || !profile) {
          throw new Error("Roll number not found");
        }

        emailToUse = profile.email;
      }

      const { error } = await supabase.auth.signInWithPassword({
        email: emailToUse,
        password,
      });

      if (error) throw error;

      toast({
        title: "Welcome back!",
        description: "Successfully logged in.",
      });

      navigate("/");
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleSignIn = async (role?: "student" | "faculty" | "admin") => {
    const roleToUse = role || selectedRole;
    
    if (!roleToUse) {
      setShowRoleDialog(true);
      return;
    }

    try {
      localStorage.setItem("pending_role", roleToUse);
      
      const { error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: `${window.location.origin}/`,
        },
      });

      if (error) throw error;
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  const roleCards = [
    {
      role: "student" as const,
      icon: GraduationCap,
      title: "Student",
      description: "Access your attendance, marks, and campus features",
      color: "from-primary to-primary-glow",
    },
    {
      role: "faculty" as const,
      icon: BookOpen,
      title: "Faculty",
      description: "Manage attendance, marks, and student records",
      color: "from-accent to-accent/80",
    },
    {
      role: "admin" as const,
      icon: Shield,
      title: "Admin",
      description: "Full access to manage campus operations",
      color: "from-secondary to-secondary/80",
    },
  ];

  return (
    <>
      <Dialog open={showRoleDialog} onOpenChange={setShowRoleDialog}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Select Your Role</DialogTitle>
            <DialogDescription>
              Choose your role to continue with Google Sign-in
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            {roleCards.map((card) => {
              const Icon = card.icon;
              return (
                <button
                  key={card.role}
                  onClick={() => {
                    setShowRoleDialog(false);
                    handleGoogleSignIn(card.role);
                  }}
                  className="flex items-center gap-4 p-4 border rounded-lg hover:border-primary transition-colors text-left"
                >
                  <div className={`p-3 rounded-lg bg-gradient-to-br ${card.color}`}>
                    <Icon className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <h4 className="font-semibold">{card.title}</h4>
                    <p className="text-sm text-muted-foreground">{card.description}</p>
                  </div>
                </button>
              );
            })}
          </div>
        </DialogContent>
      </Dialog>

      <div className="min-h-screen bg-gradient-subtle flex items-center justify-center p-4">
        <Card className="w-full max-w-5xl shadow-elegant">
          <CardHeader className="text-center">
            <CardTitle className="text-3xl font-bold">Campus Connect</CardTitle>
            <CardDescription>Access your campus management system</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="w-full">
              <div className="mb-6 text-center">
                <h3 className="text-xl font-semibold mb-2">Sign In to Your Account</h3>
                <p className="text-sm text-muted-foreground">
                  Your credentials are provided by the administrator
                </p>
              </div>
              
              <form onSubmit={handleSignIn} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="signin-identifier">Email or Roll Number</Label>
                  <Input
                    id="signin-identifier"
                    type="text"
                    placeholder="email@example.com or roll number"
                    value={loginIdentifier}
                    onChange={(e) => setLoginIdentifier(e.target.value)}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="signin-password">Password</Label>
                  <Input
                    id="signin-password"
                    type="password"
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>
                <Button type="submit" className="w-full" disabled={isLoading}>
                  {isLoading ? "Signing in..." : "Sign In"}
                </Button>
                <div className="relative my-4">
                  <div className="absolute inset-0 flex items-center">
                    <span className="w-full border-t" />
                  </div>
                  <div className="relative flex justify-center text-xs uppercase">
                    <span className="bg-background px-2 text-muted-foreground">Or continue with</span>
                  </div>
                </div>
                <Button
                  type="button"
                  variant="outline"
                  className="w-full"
                  onClick={() => handleGoogleSignIn()}
                >
                  <svg className="mr-2 h-4 w-4" viewBox="0 0 24 24">
                    <path
                      d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                      fill="#4285F4"
                    />
                    <path
                      d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                      fill="#34A853"
                    />
                    <path
                      d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                      fill="#FBBC05"
                    />
                    <path
                      d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                      fill="#EA4335"
                    />
                  </svg>
                  Sign in with Google
                </Button>
              </form>
            </div>
          </CardContent>
        </Card>
      </div>
    </>
  );
};

export default Login;
