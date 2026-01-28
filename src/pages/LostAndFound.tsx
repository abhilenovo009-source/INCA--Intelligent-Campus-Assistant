import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Package, Camera, Search, MapPin, Clock, Tag, Upload, Eye } from "lucide-react";

const LostAndFound = () => {
  const recentItems = [
    {
      id: 1,
      title: "iPhone 14 Pro",
      type: "lost",
      description: "Space Gray iPhone 14 Pro with blue case",
      location: "Library 2nd Floor",
      date: "2 hours ago",
      status: "active",
      aiTags: ["smartphone", "apple", "blue case", "electronics"],
      matchConfidence: 95,
      contact: "Anonymous"
    },
    {
      id: 2,
      title: "Black Leather Wallet",
      type: "found",
      description: "Found near cafeteria, contains student ID",
      location: "Cafeteria Area",
      date: "5 hours ago",
      status: "matched",
      aiTags: ["wallet", "leather", "black", "student id"],
      matchConfidence: 88,
      contact: "John Doe"
    },
    {
      id: 3,
      title: "Red Backpack",
      type: "lost",
      description: "Red Nike backpack with laptop inside",
      location: "Parking Lot B",
      date: "1 day ago",
      status: "active",
      aiTags: ["backpack", "red", "nike", "laptop"],
      matchConfidence: 0,
      contact: "Sarah Wilson"
    },
    {
      id: 4,
      title: "AirPods Pro",
      type: "found",
      description: "White AirPods Pro found in gym locker",
      location: "Sports Complex",
      date: "2 days ago",
      status: "claimed",
      aiTags: ["airpods", "white", "apple", "wireless"],
      matchConfidence: 92,
      contact: "Mike Johnson"
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'matched': return 'bg-green-500';
      case 'active': return 'bg-blue-500';
      case 'claimed': return 'bg-gray-500';
      default: return 'bg-yellow-500';
    }
  };

  const getTypeColor = (type: string) => {
    return type === 'lost' ? 'bg-red-500/10 border-red-500/20' : 'bg-green-500/10 border-green-500/20';
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Header */}
      <header className="border-b border-border bg-gradient-card backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Package className="h-8 w-8 text-primary" />
              <div>
                <h1 className="text-2xl font-bold text-foreground">AI-Powered Lost & Found</h1>
                <p className="text-muted-foreground">Smart matching with computer vision</p>
              </div>
            </div>
            <Button variant="outline" onClick={() => window.history.back()}>
              Back to Home
            </Button>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-6 py-8">
        {/* Stats Dashboard */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="bg-gradient-card border-accent/20">
            <CardHeader className="pb-3">
              <CardTitle className="text-lg flex items-center gap-2">
                <Package className="h-5 w-5 text-red-500" />
                Lost Items
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-red-500">23</div>
              <p className="text-sm text-muted-foreground">Active reports</p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-card border-accent/20">
            <CardHeader className="pb-3">
              <CardTitle className="text-lg flex items-center gap-2">
                <Search className="h-5 w-5 text-green-500" />
                Found Items
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-green-500">18</div>
              <p className="text-sm text-muted-foreground">Waiting for owners</p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-card border-accent/20">
            <CardHeader className="pb-3">
              <CardTitle className="text-lg flex items-center gap-2">
                <Eye className="h-5 w-5 text-blue-500" />
                AI Matches
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-blue-500">7</div>
              <p className="text-sm text-muted-foreground">Potential matches found</p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-card border-accent/20">
            <CardHeader className="pb-3">
              <CardTitle className="text-lg flex items-center gap-2">
                <Package className="h-5 w-5 text-purple-500" />
                Success Rate
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-purple-500">84%</div>
              <p className="text-sm text-muted-foreground">Items reunited</p>
            </CardContent>  
          </Card>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <Card className="bg-gradient-hero border-primary/20">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-white">
                <Camera className="h-6 w-6" />
                Report Lost Item
              </CardTitle>
              <CardDescription className="text-white/80">
                Upload a photo and let AI help find your item
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button className="w-full bg-white text-primary hover:bg-white/90">
                <Upload className="h-4 w-4 mr-2" />
                Upload Photo & Report
              </Button>
            </CardContent>
          </Card>

          <Card className="bg-gradient-accent border-accent/20">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-white">
                <Search className="h-6 w-6" />
                Report Found Item
              </CardTitle>
              <CardDescription className="text-white/80">
                Help others by reporting items you've found
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button className="w-full bg-white text-accent hover:bg-white/90">
                <Camera className="h-4 w-4 mr-2" />
                Take Photo & Report
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Search Bar */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Search Items</CardTitle>
            <CardDescription>Use AI-powered search to find lost or found items</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex gap-4">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input placeholder="Describe the item (e.g., 'blue iPhone with cracked screen')" className="pl-10" />
                </div>
              </div>
              <Button>Search with AI</Button>
            </div>
          </CardContent>
        </Card>

        {/* Recent Items */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Items</CardTitle>
            <CardDescription>Latest lost and found reports with AI matching</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentItems.map((item) => (
                <div key={item.id} className={`p-4 rounded-lg border ${getTypeColor(item.type)}`}>
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <Badge variant={item.type === 'lost' ? 'destructive' : 'default'}>
                          {item.type.toUpperCase()}
                        </Badge>
                        <Badge className={getStatusColor(item.status)}>
                          {item.status.toUpperCase()}
                        </Badge>
                        {item.matchConfidence > 0 && (
                          <Badge variant="outline" className="bg-blue-500/10 border-blue-500/20">
                            {item.matchConfidence}% AI Match
                          </Badge>
                        )}
                      </div>
                      
                      <h3 className="font-semibold text-lg text-foreground">{item.title}</h3>
                      <p className="text-muted-foreground mb-2">{item.description}</p>
                      
                      <div className="flex items-center gap-4 text-sm text-muted-foreground mb-3">
                        <span className="flex items-center gap-1">
                          <MapPin className="h-4 w-4" />
                          {item.location}
                        </span>
                        <span className="flex items-center gap-1">
                          <Clock className="h-4 w-4" />
                          {item.date}
                        </span>
                      </div>

                      <div className="flex items-center gap-1 mb-2">
                        <Tag className="h-4 w-4 text-muted-foreground" />
                        <div className="flex gap-1 flex-wrap">
                          {item.aiTags.map((tag, index) => (
                            <Badge key={index} variant="secondary" className="text-xs">
                              {tag}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex flex-col gap-2 ml-4">
                      <Button size="sm">View Details</Button>
                      {item.status === 'matched' && (
                        <Button size="sm" variant="outline">Contact Owner</Button>
                      )}
                      {item.status === 'active' && item.type === 'lost' && (
                        <Button size="sm" variant="outline">I Found This</Button>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* AI Features Info */}
        <Card className="mt-8">
          <CardHeader>
            <CardTitle>How AI Helps</CardTitle>
            <CardDescription>Advanced computer vision and matching technology</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center">
                <Camera className="h-12 w-12 mx-auto mb-4 text-primary" />
                <h3 className="font-semibold mb-2">Image Recognition</h3>
                <p className="text-sm text-muted-foreground">
                  AI automatically identifies objects, colors, and brands from photos
                </p>
              </div>
              <div className="text-center">
                <Search className="h-12 w-12 mx-auto mb-4 text-primary" />
                <h3 className="font-semibold mb-2">Smart Matching</h3>
                <p className="text-sm text-muted-foreground">
                  Intelligent matching between lost and found items with confidence scores
                </p>
              </div>
              <div className="text-center">
                <Tag className="h-12 w-12 mx-auto mb-4 text-primary" />
                <h3 className="font-semibold mb-2">Auto-Tagging</h3>
                <p className="text-sm text-muted-foreground">
                  Automatic tagging and categorization for better searchability
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
};

export default LostAndFound;