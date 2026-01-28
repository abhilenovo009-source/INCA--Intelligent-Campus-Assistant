import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { ShoppingBag, Search, Filter, Star, MapPin, Clock, Plus, Heart, MessageCircle, Share } from "lucide-react";

const CampusMarketplace = () => {
  const featuredItems = [
    {
      id: 1,
      title: "MacBook Pro 2022 - M2 Chip",
      price: "$1,200",
      originalPrice: "$1,800",
      category: "Electronics",
      condition: "Like New",
      seller: "John Smith",
      rating: 4.8,
      location: "CS Building",
      timePosted: "2 hours ago",
      images: 4,
      description: "Barely used MacBook Pro with M2 chip, perfect for coding and design work.",
      isFavorite: false,
      isVerified: true
    },
    {
      id: 2,
      title: "Data Structures & Algorithms Textbook",
      price: "$45",
      originalPrice: "$120",
      category: "Books",
      condition: "Good",
      seller: "Sarah Johnson",
      rating: 4.9,
      location: "Library Area",
      timePosted: "5 hours ago",
      images: 3,
      description: "Classic CLRS textbook, highlighted but in great condition.",
      isFavorite: true,
      isVerified: true
    },
    {
      id: 3,
      title: "Mountain Bike - Trek X-Caliber",
      price: "$350",
      originalPrice: "$600",
      category: "Sports",
      condition: "Very Good",
      seller: "Mike Chen",
      rating: 4.7,
      location: "Sports Complex",
      timePosted: "1 day ago",
      images: 6,
      description: "Great bike for campus commuting and weekend trails.",
      isFavorite: false,
      isVerified: false
    }
  ];

  const categories = [
    { name: "Books", count: 156, icon: "📚" },
    { name: "Electronics", count: 89, icon: "💻" },
    { name: "Furniture", count: 67, icon: "🪑" },
    { name: "Sports", count: 43, icon: "⚽" },
    { name: "Clothing", count: 78, icon: "👕" },
    { name: "Stationery", count: 124, icon: "✏️" }
  ];

  const getConditionColor = (condition: string) => {
    switch (condition) {
      case 'Like New': return 'bg-green-500';
      case 'Very Good': return 'bg-blue-500';
      case 'Good': return 'bg-yellow-500';
      case 'Fair': return 'bg-orange-500';
      default: return 'bg-gray-500';
    }
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Header */}
      <header className="border-b border-border bg-gradient-card backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <ShoppingBag className="h-8 w-8 text-primary" />
              <div>
                <h1 className="text-2xl font-bold text-foreground">Campus Marketplace</h1>
                <p className="text-muted-foreground">Buy, sell & exchange within campus community</p>
              </div>
            </div>
            <div className="flex gap-2">
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                Sell Item
              </Button>
              <Button variant="outline" onClick={() => window.history.back()}>
                Back to Home
              </Button>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-6 py-8">
        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="bg-gradient-card border-accent/20">
            <CardHeader className="pb-3">
              <CardTitle className="text-lg flex items-center gap-2">
                <ShoppingBag className="h-5 w-5 text-primary" />
                Active Listings
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-primary">567</div>
              <p className="text-sm text-muted-foreground">Items available</p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-card border-accent/20">
            <CardHeader className="pb-3">
              <CardTitle className="text-lg flex items-center gap-2">
                <Star className="h-5 w-5 text-yellow-500" />
                This Week
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-yellow-500">89</div>
              <p className="text-sm text-muted-foreground">New items posted</p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-card border-accent/20">
            <CardHeader className="pb-3">
              <CardTitle className="text-lg flex items-center gap-2">
                <MessageCircle className="h-5 w-5 text-blue-500" />
                Success Rate
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-blue-500">94%</div>
              <p className="text-sm text-muted-foreground">Successful trades</p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-card border-accent/20">
            <CardHeader className="pb-3">
              <CardTitle className="text-lg flex items-center gap-2">
                <Heart className="h-5 w-5 text-red-500" />
                Saved Items
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-red-500">12</div>
              <p className="text-sm text-muted-foreground">In your wishlist</p>
            </CardContent>
          </Card>
        </div>

        {/* Search and Categories */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Find What You Need</CardTitle>
            <CardDescription>Search across all campus listings</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex gap-4 mb-6">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input placeholder="Search books, electronics, furniture..." className="pl-10" />
                </div>
              </div>
              <Button variant="outline">
                <Filter className="h-4 w-4 mr-2" />
                Filters
              </Button>
              <Button>Search</Button>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
              {categories.map((category, index) => (
                <Button key={index} variant="outline" className="h-auto flex-col gap-2 p-4">
                  <span className="text-2xl">{category.icon}</span>
                  <span className="font-semibold">{category.name}</span>
                  <span className="text-sm text-muted-foreground">{category.count} items</span>
                </Button>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Featured Items */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Featured Items</CardTitle>
            <CardDescription>Hand-picked deals from verified sellers</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {featuredItems.map((item) => (
                <Card key={item.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                  <div className="relative">
                    <div className="aspect-video bg-muted flex items-center justify-center">
                      <ShoppingBag className="h-12 w-12 text-muted-foreground" />
                    </div>
                    <Button
                      size="sm"
                      variant="ghost"
                      className="absolute top-2 right-2 h-8 w-8 p-0"
                    >
                      <Heart className={`h-4 w-4 ${item.isFavorite ? 'fill-red-500 text-red-500' : ''}`} />
                    </Button>
                    <Badge className="absolute top-2 left-2">{item.category}</Badge>
                    {item.isVerified && (
                      <Badge className="absolute bottom-2 left-2 bg-green-500">Verified</Badge>
                    )}
                    <div className="absolute bottom-2 right-2 bg-black/50 text-white text-xs px-2 py-1 rounded">
                      {item.images} photos
                    </div>
                  </div>

                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg line-clamp-1">{item.title}</CardTitle>
                    <div className="flex items-center gap-2">
                      <span className="text-2xl font-bold text-primary">{item.price}</span>
                      <span className="text-sm text-muted-foreground line-through">{item.originalPrice}</span>
                      <Badge className={getConditionColor(item.condition)}>
                        {item.condition}
                      </Badge>
                    </div>
                  </CardHeader>

                  <CardContent className="pt-0">
                    <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
                      {item.description}
                    </p>

                    <div className="space-y-2 text-sm">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-1">
                          <Star className="h-4 w-4 text-yellow-500 fill-yellow-500" />
                          <span className="font-semibold">{item.rating}</span>
                          <span className="text-muted-foreground">• {item.seller}</span>
                        </div>
                      </div>

                      <div className="flex items-center gap-4 text-muted-foreground">
                        <span className="flex items-center gap-1">
                          <MapPin className="h-4 w-4" />
                          {item.location}
                        </span>
                        <span className="flex items-center gap-1">
                          <Clock className="h-4 w-4" />
                          {item.timePosted}
                        </span>
                      </div>
                    </div>

                    <div className="flex gap-2 mt-4">
                      <Button size="sm" className="flex-1">Contact Seller</Button>
                      <Button size="sm" variant="outline">
                        <Share className="h-4 w-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Safety Tips */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Marketplace Safety</CardTitle>
            <CardDescription>Tips for safe buying and selling on campus</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="p-4 border border-border rounded-lg text-center">
                <div className="text-2xl mb-2">🔒</div>
                <h4 className="font-semibold mb-1">Meet Safely</h4>
                <p className="text-sm text-muted-foreground">Use public campus locations</p>
              </div>
              <div className="p-4 border border-border rounded-lg text-center">
                <div className="text-2xl mb-2">✅</div>
                <h4 className="font-semibold mb-1">Verify Items</h4>
                <p className="text-sm text-muted-foreground">Check condition before buying</p>
              </div>
              <div className="p-4 border border-border rounded-lg text-center">
                <div className="text-2xl mb-2">💬</div>
                <h4 className="font-semibold mb-1">Use Chat</h4>
                <p className="text-sm text-muted-foreground">Keep conversations in-app</p>
              </div>
              <div className="p-4 border border-border rounded-lg text-center">
                <div className="text-2xl mb-2">⭐</div>
                <h4 className="font-semibold mb-1">Rate Sellers</h4>
                <p className="text-sm text-muted-foreground">Help build community trust</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
            <CardDescription>Manage your marketplace activity</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <Button className="h-auto flex-col gap-2 p-6">
                <Plus className="h-6 w-6" />
                <span>Sell Item</span>
              </Button>
              <Button variant="outline" className="h-auto flex-col gap-2 p-6">
                <Heart className="h-6 w-6" />
                <span>My Wishlist</span>
              </Button>
              <Button variant="outline" className="h-auto flex-col gap-2 p-6">
                <MessageCircle className="h-6 w-6" />
                <span>My Chats</span>
              </Button>
              <Button variant="outline" className="h-auto flex-col gap-2 p-6">
                <ShoppingBag className="h-6 w-6" />
                <span>My Listings</span>
              </Button>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
};

export default CampusMarketplace;