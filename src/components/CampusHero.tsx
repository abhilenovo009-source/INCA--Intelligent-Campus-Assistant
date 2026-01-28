import { Button } from "@/components/ui/button";
import heroImage from "@/assets/hero-campus.jpg";
import { BookOpen, Brain, Users, Zap } from "lucide-react";

const CampusHero = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <img 
          src={heroImage} 
          alt="Smart Campus AI Interface" 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-background/95 via-background/80 to-background/60" />
      </div>
      
      {/* Animated Background Elements */}
      <div className="absolute inset-0 z-10">
        <div className="absolute top-20 left-10 w-32 h-32 bg-primary/20 rounded-full blur-xl animate-pulse" />
        <div className="absolute bottom-32 right-16 w-24 h-24 bg-accent/20 rounded-full blur-lg animate-bounce" />
        <div className="absolute top-1/2 left-1/3 w-16 h-16 bg-tertiary/20 rounded-full blur-md" style={{animation: 'float 6s ease-in-out infinite'}} />
      </div>

      {/* Content */}
      <div className="relative z-20 container mx-auto px-6 text-center">
        <div className="max-w-4xl mx-auto">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 bg-gradient-card backdrop-blur-sm border border-border rounded-full px-6 py-2 mb-8 shadow-glow">
            <Zap className="w-4 h-4 text-accent" />
            <span className="text-sm font-medium bg-gradient-primary bg-clip-text text-transparent">
              AI-Powered Campus Revolution
            </span>
          </div>

          {/* Main Headline */}
          <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
            <span className="bg-gradient-hero bg-clip-text text-transparent">
              INCA
            </span>
            <br />
            <span className="text-foreground">Intelligent Campus Assistant</span>
          </h1>

          {/* Subtitle */}
          <p className="text-xl md:text-2xl text-muted-foreground mb-12 max-w-3xl mx-auto leading-relaxed">
            One intelligent app for attendance tracking, AI tutoring, lost & found, 
            campus marketplace, and everything you need for academic excellence.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
            <Button variant="hero" size="lg" className="group">
              <Brain className="w-5 h-5 mr-2 group-hover:animate-spin" />
              Explore AI Features
            </Button>
            <Button variant="secondary-outline" size="lg">
              <Users className="w-5 h-5 mr-2" />
              Join Campus Community
            </Button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { icon: BookOpen, label: "Smart Features", value: "11+" },
              { icon: Brain, label: "AI Models", value: "5+" },
              { icon: Users, label: "Universities", value: "100+" },
              { icon: Zap, label: "Active Users", value: "50K+" }
            ].map((stat, index) => (
              <div 
                key={index}
                className="bg-gradient-card backdrop-blur-sm border border-border rounded-xl p-6 shadow-card hover:shadow-elevated transition-all duration-300 hover:scale-105"
              >
                <stat.icon className="w-8 h-8 text-primary mx-auto mb-3" />
                <div className="text-3xl font-bold text-foreground mb-1">{stat.value}</div>
                <div className="text-sm text-muted-foreground">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default CampusHero;