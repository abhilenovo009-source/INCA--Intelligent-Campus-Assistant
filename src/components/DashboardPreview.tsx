import dashboardImage from "@/assets/dashboard-preview.jpg";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { 
  Bell, 
  TrendingUp, 
  Users, 
  BookOpen, 
  CheckCircle2, 
  Clock,
  Brain,
  Award
} from "lucide-react";

const DashboardPreview = () => {
  return (
    <section className="py-24 px-6 bg-gradient-to-b from-background to-muted/20">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left Content */}
          <div className="order-2 lg:order-1">
            <div className="inline-flex items-center gap-2 bg-gradient-card backdrop-blur-sm border border-border rounded-full px-6 py-2 mb-8">
              <Brain className="w-4 h-4 text-tertiary" />
              <span className="text-sm font-medium">Intelligent Dashboard</span>
            </div>
            
            <h2 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
              <span className="text-foreground">Your </span>
              <span className="bg-gradient-tertiary bg-clip-text text-transparent">
                AI-Powered
              </span>
              <br />
              <span className="text-foreground">Command Center</span>
            </h2>
            
            <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
              Get real-time insights, predictive analytics, and personalized recommendations 
              all in one beautiful, intuitive dashboard designed for student success.
            </p>

            {/* Feature Highlights */}
            <div className="space-y-4 mb-8">
              {[
                { icon: TrendingUp, text: "AI-powered attendance predictions and alerts" },
                { icon: Bell, text: "Smart notifications for deadlines and events" },
                { icon: BookOpen, text: "Personalized study recommendations" },
                { icon: Award, text: "Progress tracking and achievement badges" }
              ].map((item, index) => (
                <div key={index} className="flex items-center gap-3 group">
                  <div className="w-10 h-10 rounded-lg bg-gradient-tertiary flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <item.icon className="w-5 h-5 text-tertiary-foreground" />
                  </div>
                  <span className="text-foreground font-medium">{item.text}</span>
                </div>
              ))}
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button variant="tertiary" size="lg">
                <Brain className="w-5 h-5 mr-2" />
                Try Dashboard Demo
              </Button>
              <Button variant="outline" size="lg">
                Watch Tutorial
              </Button>
            </div>
          </div>

          {/* Right - Dashboard Preview */}
          <div className="order-1 lg:order-2 relative">
            {/* Main Dashboard Image */}
            <div className="relative bg-gradient-card border border-border rounded-2xl p-6 shadow-elevated hover:shadow-glow transition-all duration-500">
              <img 
                src={dashboardImage} 
                alt="AI Campus Dashboard Interface" 
                className="w-full rounded-xl shadow-lg"
              />
              
              {/* Floating Stats Cards */}
              <div className="absolute -top-4 -left-4 hidden lg:block">
                <Card className="bg-gradient-secondary border-0 p-4 shadow-elevated hover:scale-105 transition-all duration-300">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-full bg-secondary-glow/20 flex items-center justify-center">
                      <CheckCircle2 className="w-6 h-6 text-secondary" />
                    </div>
                    <div>
                      <div className="text-lg font-bold text-secondary-foreground">92%</div>
                      <div className="text-xs text-secondary-foreground/80">Attendance</div>
                    </div>
                  </div>
                </Card>
              </div>
              
              <div className="absolute -bottom-4 -right-4 hidden lg:block">
                <Card className="bg-gradient-accent border-0 p-4 shadow-elevated hover:scale-105 transition-all duration-300">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-full bg-accent-glow/20 flex items-center justify-center">
                      <Clock className="w-6 h-6 text-accent-foreground" />
                    </div>
                    <div>
                      <div className="text-lg font-bold text-accent-foreground">4</div>
                      <div className="text-xs text-accent-foreground/80">Pending Tasks</div>
                    </div>
                  </div>
                </Card>
              </div>

              <div className="absolute top-1/2 -left-8 hidden lg:block transform -translate-y-1/2">
                <Card className="bg-gradient-primary border-0 p-4 shadow-glow hover:scale-105 transition-all duration-300">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-full bg-primary-glow/20 flex items-center justify-center">
                      <Users className="w-6 h-6 text-primary-foreground" />
                    </div>
                    <div>
                      <div className="text-lg font-bold text-primary-foreground">156</div>
                      <div className="text-xs text-primary-foreground/80">Connections</div>
                    </div>
                  </div>
                </Card>
              </div>
            </div>

            {/* Animated Background Elements */}
            <div className="absolute inset-0 -z-10">
              <div className="absolute top-10 right-10 w-20 h-20 bg-primary/10 rounded-full blur-xl animate-pulse" />
              <div className="absolute bottom-16 left-8 w-16 h-16 bg-accent/10 rounded-full blur-lg animate-float" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DashboardPreview;