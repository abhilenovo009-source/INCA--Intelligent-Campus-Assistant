import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { 
  ClipboardCheck, 
  MessageSquare, 
  Calendar, 
  Package, 
  Brain, 
  TrendingUp,
  ShoppingCart,
  Trophy,
  MessageCircle,
  CheckCircle,
  Navigation
} from "lucide-react";

const features = [
  {
    id: 1,
    icon: ClipboardCheck,
    title: "Smart Attendance System",
    description: "AI-powered attendance tracking with predictive alerts to keep you on track.",
    category: "Academic",
    color: "primary",
    comingSoon: false
  },
  {
    id: 2,
    icon: MessageSquare,
    title: "Digital Notice Board",
    description: "Centralized notices with smart reminders for deadlines and important dates.",
    category: "Communication",
    color: "secondary",
    comingSoon: false
  },
  {
    id: 3,
    icon: Calendar,
    title: "Smart Timetable & Events",
    description: "Personalized schedules with AR navigation and automatic event reminders.",
    category: "Organization",
    color: "accent",
    comingSoon: false
  },
  {
    id: 4,
    icon: Package,
    title: "AI-Powered Lost & Found",
    description: "Upload photos of lost items - AI automatically tags and matches with found items.",
    category: "Utility",
    color: "tertiary",
    comingSoon: false
  },
  {
    id: 5,
    icon: Brain,
    title: "AI Notes & Tutor",
    description: "Intelligent tutoring system that explains complex topics in simple terms.",
    category: "Academic",
    color: "primary",
    comingSoon: false
  },
  {
    id: 6,
    icon: TrendingUp,
    title: "Performance Insights",
    description: "AI analytics for academic predictions and personalized improvement suggestions.",
    category: "Analytics",
    color: "secondary",
    comingSoon: false
  },
  {
    id: 7,
    icon: ShoppingCart,
    title: "Campus Marketplace",
    description: "Buy, sell, and exchange books, electronics, and more within your campus.",
    category: "Marketplace",
    color: "accent",
    comingSoon: false
  },
  {
    id: 8,
    icon: Trophy,
    title: "Gamification & Badges",
    description: "Earn badges like Top Coder, Active Learner, and Green Warrior for achievements.",
    category: "Engagement",
    color: "tertiary",
    comingSoon: false
  },
  {
    id: 9,
    icon: MessageCircle,
    title: "Community Polls",
    description: "Anonymous feedback system with AI-powered survey analysis and insights.",
    category: "Community",
    color: "primary",
    comingSoon: false
  },
  {
    id: 10,
    icon: Navigation,
    title: "AR Campus Navigation",
    description: "Augmented reality wayfinding to help you navigate campus efficiently.",
    category: "Navigation",
    color: "secondary",
    comingSoon: true
  },
  {
    id: 11,
    icon: CheckCircle,
    title: "Green Credits System",
    description: "Sustainability tracking with rewards for eco-friendly campus activities.",
    category: "Sustainability",
    color: "accent",
    comingSoon: false
  }
];

const getColorClasses = (color: string) => {
  switch (color) {
    case 'primary':
      return 'bg-gradient-primary text-primary-foreground shadow-glow';
    case 'secondary':
      return 'bg-gradient-secondary text-secondary-foreground';
    case 'accent':
      return 'bg-gradient-accent text-accent-foreground';
    case 'tertiary':
      return 'bg-gradient-tertiary text-tertiary-foreground';
    default:
      return 'bg-gradient-primary text-primary-foreground';
  }
};

const getFeatureRoute = (featureId: number) => {
  const routes: { [key: number]: string } = {
    1: '/smart-attendance',
    2: '/digital-notice-board',
    3: '/smart-timetable',
    4: '/lost-and-found',
    5: '/ai-notes-tutor',
    6: '/performance-insights',
    7: '/campus-marketplace',
    8: '/gamification-badges',
    9: '/community-polls',
    11: '/green-credits'
  };
  return routes[featureId] || '#';
};

const FeatureGrid = () => {
  return (
    <section className="py-24 px-6">
      <div className="container mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-gradient-card backdrop-blur-sm border border-border rounded-full px-6 py-2 mb-6">
            <Brain className="w-4 h-4 text-primary" />
            <span className="text-sm font-medium">Comprehensive Campus Solution</span>
          </div>
          
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            <span className="bg-gradient-primary bg-clip-text text-transparent">
              Everything You Need
            </span>
            <br />
            <span className="text-foreground">In One Smart App</span>
          </h2>
          
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            From AI-powered academics to campus life management - discover how our intelligent 
            features transform your university experience.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {features.map((feature) => (
            <Card 
              key={feature.id}
              className="relative bg-gradient-card backdrop-blur-sm border-border hover:border-primary/50 transition-all duration-300 hover:scale-105 hover:shadow-elevated group overflow-hidden"
            >
              {/* Coming Soon Badge */}
              {feature.comingSoon && (
                <div className="absolute top-4 right-4 bg-accent/20 text-accent text-xs px-2 py-1 rounded-full backdrop-blur-sm">
                  Coming Soon
                </div>
              )}

              <div className="p-6">
                {/* Icon */}
                <div className={`w-14 h-14 rounded-xl ${getColorClasses(feature.color)} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                  <feature.icon className="w-7 h-7" />
                </div>

                {/* Content */}
                <div className="mb-4">
                  <div className="flex items-center gap-2 mb-2">
                    <h3 className="text-xl font-semibold text-foreground">{feature.title}</h3>
                  </div>
                  <div className="text-xs text-muted-foreground mb-3 bg-muted/30 px-2 py-1 rounded-full inline-block">
                    {feature.category}
                  </div>
                  <p className="text-muted-foreground leading-relaxed">{feature.description}</p>
                </div>

                {/* Action Button */}
                {feature.comingSoon ? (
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    className="w-full justify-start text-primary hover:text-primary-foreground hover:bg-primary/20 group/btn"
                    disabled={true}
                  >
                    Coming Soon
                    <span className="ml-auto group-hover/btn:translate-x-1 transition-transform">→</span>
                  </Button>
                ) : (
                  <Link to={getFeatureRoute(feature.id)} className="w-full">
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      className="w-full justify-start text-primary hover:text-primary-foreground hover:bg-primary/20 group/btn"
                    >
                      Learn More
                      <span className="ml-auto group-hover/btn:translate-x-1 transition-transform">→</span>
                    </Button>
                  </Link>
                )}
              </div>
            </Card>
          ))}
        </div>

        {/* CTA Section */}
        <div className="text-center">
          <div className="bg-gradient-card backdrop-blur-sm border border-border rounded-2xl p-8 shadow-elevated">
            <h3 className="text-2xl font-bold mb-4">Ready to Transform Your Campus Experience?</h3>
            <p className="text-muted-foreground mb-6">
              Join thousands of students already using AI-powered tools for academic success.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button variant="hero" size="lg">
                Get Started Free
              </Button>
              <Button variant="outline" size="lg">
                Schedule Demo
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeatureGrid;