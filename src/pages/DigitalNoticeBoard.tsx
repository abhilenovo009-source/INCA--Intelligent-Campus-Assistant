import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { MessageSquare, Bell, Search, Filter, Pin, Calendar, AlertCircle } from "lucide-react";

const DigitalNoticeBoard = () => {
  const notices = [
    {
      id: 1,
      title: "Mid-term Examination Schedule Released",
      content: "The mid-term examination schedule for all departments has been released. Please check your respective department portals.",
      category: "Academic",
      priority: "high",
      date: "2024-01-15",
      department: "All Departments",
      isPinned: true,
      isRead: false
    },
    {
      id: 2,
      title: "Library Hours Extended",
      content: "The central library will now remain open until 11 PM on weekdays to support students during exam season.",
      category: "Facility",
      priority: "medium",
      date: "2024-01-14",
      department: "All Departments",
      isPinned: false,
      isRead: true
    },
    {
      id: 3,
      title: "Workshop on AI & Machine Learning",
      content: "Join us for an exclusive workshop on AI and Machine Learning fundamentals. Limited seats available.",
      category: "Event",
      priority: "medium",
      date: "2024-01-13",
      department: "Computer Science",
      isPinned: false,
      isRead: false
    },
    {
      id: 4,
      title: "Fee Payment Deadline - Final Notice",
      content: "This is the final reminder for semester fee payment. Deadline: January 20, 2024.",
      category: "Finance",
      priority: "high",
      date: "2024-01-12",
      department: "All Departments",
      isPinned: true,
      isRead: false
    }
  ];

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-red-500/10 border-red-500/20 text-red-500';
      case 'medium': return 'bg-yellow-500/10 border-yellow-500/20 text-yellow-500';
      default: return 'bg-blue-500/10 border-blue-500/20 text-blue-500';
    }
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Header */}
      <header className="border-b border-border bg-gradient-card backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <MessageSquare className="h-8 w-8 text-primary" />
              <div>
                <h1 className="text-2xl font-bold text-foreground">Digital Notice Board</h1>
                <p className="text-muted-foreground">Stay updated with campus announcements</p>
              </div>
            </div>
            <Button variant="outline" onClick={() => window.history.back()}>
              Back to Home
            </Button>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-6 py-8">
        {/* Stats and Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="bg-gradient-card border-accent/20">
            <CardHeader className="pb-3">
              <CardTitle className="text-lg flex items-center gap-2">
                <Bell className="h-5 w-5 text-primary" />
                Unread Notices
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-primary">5</div>
              <p className="text-sm text-muted-foreground">Requires attention</p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-card border-accent/20">
            <CardHeader className="pb-3">
              <CardTitle className="text-lg flex items-center gap-2">
                <Pin className="h-5 w-5 text-yellow-500" />
                Pinned
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-yellow-500">2</div>
              <p className="text-sm text-muted-foreground">Important notices</p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-card border-accent/20">
            <CardHeader className="pb-3">
              <CardTitle className="text-lg flex items-center gap-2">
                <AlertCircle className="h-5 w-5 text-red-500" />
                High Priority
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-red-500">3</div>
              <p className="text-sm text-muted-foreground">Urgent items</p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-card border-accent/20">
            <CardHeader className="pb-3">
              <CardTitle className="text-lg flex items-center gap-2">
                <Calendar className="h-5 w-5 text-green-500" />
                This Week
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-green-500">12</div>
              <p className="text-sm text-muted-foreground">New notices</p>
            </CardContent>
          </Card>
        </div>

        {/* Search and Filter */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Search & Filter</CardTitle>
            <CardDescription>Find notices quickly with smart filters</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex gap-4 flex-wrap">
              <div className="flex-1 min-w-[300px]">
                <div className="relative">
                  <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input placeholder="Search notices..." className="pl-10" />
                </div>
              </div>
              <Button variant="outline" className="flex items-center gap-2">
                <Filter className="h-4 w-4" />
                Category
              </Button>
              <Button variant="outline" className="flex items-center gap-2">
                <Bell className="h-4 w-4" />
                Priority
              </Button>
              <Button variant="outline" className="flex items-center gap-2">
                <Calendar className="h-4 w-4" />
                Date
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Notice List */}
        <div className="space-y-4">
          {notices.map((notice) => (
            <Card key={notice.id} className={`${!notice.isRead ? 'border-primary/50' : ''} ${notice.isPinned ? 'bg-gradient-card' : ''}`}>
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      {notice.isPinned && <Pin className="h-4 w-4 text-yellow-500" />}
                      {!notice.isRead && <div className="w-2 h-2 bg-primary rounded-full" />}
                      <Badge variant="outline">{notice.category}</Badge>
                      <Badge className={getPriorityColor(notice.priority)}>
                        {notice.priority.toUpperCase()}
                      </Badge>
                    </div>
                    <CardTitle className="text-lg">{notice.title}</CardTitle>
                    <CardDescription className="flex items-center gap-4 mt-1">
                      <span>{notice.department}</span>
                      <span>•</span>
                      <span>{new Date(notice.date).toLocaleDateString()}</span>
                    </CardDescription>
                  </div>
                  <Button size="sm" variant="ghost">
                    <Bell className="h-4 w-4" />
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">{notice.content}</p>
                <div className="flex gap-2">
                  <Button size="sm">Read More</Button>
                  <Button size="sm" variant="outline">Remind Me</Button>
                  <Button size="sm" variant="ghost">Share</Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Quick Actions */}
        <Card className="mt-8">
          <CardHeader>
            <CardTitle>Notification Preferences</CardTitle>
            <CardDescription>Customize how you receive notice alerts</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <Button variant="outline" className="h-auto flex-col gap-2 p-6">
                <Bell className="h-6 w-6" />
                <span>Push Notifications</span>
              </Button>
              <Button variant="outline" className="h-auto flex-col gap-2 p-6">
                <MessageSquare className="h-6 w-6" />
                <span>Email Alerts</span>
              </Button>
              <Button variant="outline" className="h-auto flex-col gap-2 p-6">
                <Calendar className="h-6 w-6" />
                <span>Calendar Sync</span>
              </Button>
              <Button variant="outline" className="h-auto flex-col gap-2 p-6">
                <Filter className="h-6 w-6" />
                <span>Filter Settings</span>
              </Button>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
};

export default DigitalNoticeBoard;