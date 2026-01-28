import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, Clock, MapPin, Users, Bell, Navigation, QrCode } from "lucide-react";

const SmartTimetable = () => {
  const todaySchedule = [
    {
      id: 1,
      subject: "Machine Learning",
      time: "9:00 AM - 10:30 AM",
      room: "CS-301",
      professor: "Dr. Sarah Johnson",
      type: "Lecture",
      status: "upcoming",
      building: "Computer Science Block"
    },
    {
      id: 2,
      subject: "Database Systems Lab",
      time: "11:00 AM - 1:00 PM",
      room: "CS-Lab-2",
      professor: "Prof. Michael Chen",
      type: "Lab",
      status: "current",
      building: "Computer Science Block"
    },
    {
      id: 3,
      subject: "Software Engineering",
      time: "2:00 PM - 3:30 PM",
      room: "CS-201",
      professor: "Dr. Emily Davis",
      type: "Lecture",
      status: "upcoming",
      building: "Computer Science Block"
    },
    {
      id: 4,
      subject: "AI Workshop",
      time: "4:00 PM - 6:00 PM",
      room: "Auditorium",
      professor: "Industry Expert",
      type: "Workshop",
      status: "upcoming",
      building: "Main Building"
    }
  ];

  const upcomingEvents = [
    {
      id: 1,
      title: "Tech Fest 2024",
      date: "Jan 25, 2024",
      time: "10:00 AM",
      location: "Main Campus",
      type: "Event",
      rsvp: false
    },
    {
      id: 2,
      title: "Career Fair",
      date: "Jan 28, 2024",
      time: "9:00 AM",
      location: "Exhibition Hall",
      type: "Career",
      rsvp: true
    },
    {
      id: 3,
      title: "Alumni Meetup",
      date: "Feb 2, 2024",
      time: "6:00 PM",
      location: "Alumni Hall",
      type: "Networking",
      rsvp: false
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'current': return 'bg-green-500/10 border-green-500/20';
      case 'upcoming': return 'bg-blue-500/10 border-blue-500/20';
      case 'completed': return 'bg-gray-500/10 border-gray-500/20';
      default: return 'bg-card';
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'current': return <Badge className="bg-green-500">Live Now</Badge>;
      case 'upcoming': return <Badge variant="outline">Upcoming</Badge>;
      case 'completed': return <Badge variant="secondary">Completed</Badge>;
      default: return null;
    }
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Header */}
      <header className="border-b border-border bg-gradient-card backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Calendar className="h-8 w-8 text-primary" />
              <div>
                <h1 className="text-2xl font-bold text-foreground">Smart Timetable & Events</h1>
                <p className="text-muted-foreground">Your personalized schedule with AR navigation</p>
              </div>
            </div>
            <Button variant="outline" onClick={() => window.history.back()}>
              Back to Home
            </Button>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-6 py-8">
        {/* Today's Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="bg-gradient-card border-accent/20">
            <CardHeader className="pb-3">
              <CardTitle className="text-lg flex items-center gap-2">
                <Clock className="h-5 w-5 text-primary" />
                Today's Classes
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-primary">4</div>
              <p className="text-sm text-muted-foreground">2 lectures, 1 lab, 1 workshop</p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-card border-accent/20">
            <CardHeader className="pb-3">
              <CardTitle className="text-lg flex items-center gap-2">
                <Bell className="h-5 w-5 text-green-500" />
                Next Class
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-lg font-bold text-green-500">in 15 mins</div>
              <p className="text-sm text-muted-foreground">Database Systems Lab</p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-card border-accent/20">
            <CardHeader className="pb-3">
              <CardTitle className="text-lg flex items-center gap-2">
                <Users className="h-5 w-5 text-blue-500" />
                Events This Week
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-blue-500">3</div>
              <p className="text-sm text-muted-foreground">2 pending RSVPs</p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-card border-accent/20">
            <CardHeader className="pb-3">
              <CardTitle className="text-lg flex items-center gap-2">
                <Navigation className="h-5 w-5 text-purple-500" />
                AR Navigation
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-lg font-bold text-purple-500">Ready</div>
              <p className="text-sm text-muted-foreground">Tap to navigate to class</p>
            </CardContent>
          </Card>
        </div>

        {/* Today's Schedule */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              Today's Schedule
              <Button size="sm" variant="outline">
                <QrCode className="h-4 w-4 mr-2" />
                QR Attendance
              </Button>
            </CardTitle>
            <CardDescription>Monday, January 15, 2024</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {todaySchedule.map((item) => (
                <div key={item.id} className={`p-4 rounded-lg border ${getStatusColor(item.status)}`}>
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        {getStatusBadge(item.status)}
                        <Badge variant="outline">{item.type}</Badge>
                      </div>
                      <h3 className="font-semibold text-lg text-foreground">{item.subject}</h3>
                      <div className="flex items-center gap-4 text-sm text-muted-foreground mt-1">
                        <span className="flex items-center gap-1">
                          <Clock className="h-4 w-4" />
                          {item.time}
                        </span>
                        <span className="flex items-center gap-1">
                          <MapPin className="h-4 w-4" />
                          {item.room}, {item.building}
                        </span>
                        <span className="flex items-center gap-1">
                          <Users className="h-4 w-4" />
                          {item.professor}
                        </span>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button size="sm" variant="outline">
                        <Navigation className="h-4 w-4 mr-1" />
                        Navigate
                      </Button>
                      <Button size="sm" variant="ghost">
                        <Bell className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Upcoming Events */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Upcoming Events</CardTitle>
            <CardDescription>Discover and RSVP to campus events</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {upcomingEvents.map((event) => (
                <Card key={event.id} className="bg-gradient-card border-accent/20">
                  <CardHeader className="pb-3">
                    <div className="flex items-center justify-between">
                      <Badge variant="outline">{event.type}</Badge>
                      {event.rsvp && <Badge className="bg-green-500">RSVP'd</Badge>}
                    </div>
                    <CardTitle className="text-lg">{event.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2 text-sm text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <Calendar className="h-4 w-4" />
                        {event.date} at {event.time}
                      </div>
                      <div className="flex items-center gap-1">
                        <MapPin className="h-4 w-4" />
                        {event.location}
                      </div>
                    </div>
                    <div className="flex gap-2 mt-4">
                      {!event.rsvp ? (
                        <Button size="sm" className="flex-1">RSVP</Button>
                      ) : (
                        <Button size="sm" variant="outline" className="flex-1">Cancel RSVP</Button>
                      )}
                      <Button size="sm" variant="ghost">
                        <Navigation className="h-4 w-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
            <CardDescription>Manage your schedule efficiently</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <Button className="h-auto flex-col gap-2 p-6">
                <Calendar className="h-6 w-6" />
                <span>Add Event</span>
              </Button>
              <Button variant="outline" className="h-auto flex-col gap-2 p-6">
                <Bell className="h-6 w-6" />
                <span>Set Reminders</span>
              </Button>
              <Button variant="outline" className="h-auto flex-col gap-2 p-6">
                <Navigation className="h-6 w-6" />
                <span>AR Navigation</span>
              </Button>
              <Button variant="outline" className="h-auto flex-col gap-2 p-6">
                <QrCode className="h-6 w-6" />
                <span>QR Attendance</span>
              </Button>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
};

export default SmartTimetable;