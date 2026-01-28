import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ClipboardCheck, TrendingUp, AlertTriangle, Calendar, Users, BarChart3 } from "lucide-react";

const SmartAttendance = () => {
  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Header */}
      <header className="border-b border-border bg-gradient-card backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <ClipboardCheck className="h-8 w-8 text-primary" />
              <div>
                <h1 className="text-2xl font-bold text-foreground">Smart Attendance System</h1>
                <p className="text-muted-foreground">AI-powered attendance tracking</p>
              </div>
            </div>
            <Button variant="outline" onClick={() => window.history.back()}>
              Back to Home
            </Button>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-6 py-8">
        {/* Overview Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card className="bg-gradient-card border-accent/20">
            <CardHeader className="pb-3">
              <CardTitle className="text-lg flex items-center gap-2">
                <BarChart3 className="h-5 w-5 text-primary" />
                Overall Attendance
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-primary">87%</div>
              <p className="text-sm text-muted-foreground">This semester</p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-card border-accent/20">
            <CardHeader className="pb-3">
              <CardTitle className="text-lg flex items-center gap-2">
                <AlertTriangle className="h-5 w-5 text-yellow-500" />
                At Risk Subjects
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-yellow-500">2</div>
              <p className="text-sm text-muted-foreground">Below 75% threshold</p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-card border-accent/20">
            <CardHeader className="pb-3">
              <CardTitle className="text-lg flex items-center gap-2">
                <TrendingUp className="h-5 w-5 text-green-500" />
                Trend
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-green-500">↗ +5%</div>
              <p className="text-sm text-muted-foreground">From last month</p>
            </CardContent>
          </Card>
        </div>

        {/* Subject-wise Attendance */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Subject-wise Attendance</CardTitle>
            <CardDescription>Track your attendance across all subjects</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { subject: "Computer Networks", attendance: 92, total: 25, present: 23, status: "safe" },
                { subject: "Machine Learning", attendance: 88, total: 24, present: 21, status: "safe" },
                { subject: "Software Engineering", attendance: 72, total: 23, present: 16, status: "warning" },
                { subject: "Database Systems", attendance: 68, total: 22, present: 15, status: "danger" },
                { subject: "Web Development", attendance: 95, total: 20, present: 19, status: "excellent" }
              ].map((item, index) => (
                <div key={index} className="flex items-center justify-between p-4 rounded-lg border border-border bg-card">
                  <div className="flex-1">
                    <h3 className="font-semibold text-foreground">{item.subject}</h3>
                    <p className="text-sm text-muted-foreground">{item.present}/{item.total} classes attended</p>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="text-right">
                      <div className="font-bold text-lg">{item.attendance}%</div>
                    </div>
                    <Badge variant={
                      item.status === 'excellent' ? 'default' :
                      item.status === 'safe' ? 'secondary' :
                      item.status === 'warning' ? 'outline' : 'destructive'
                    }>
                      {item.status === 'excellent' ? 'Excellent' :
                       item.status === 'safe' ? 'Safe' :
                       item.status === 'warning' ? 'Warning' : 'Critical'}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* AI Predictions */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <AlertTriangle className="h-5 w-5 text-yellow-500" />
              AI Attendance Predictions
            </CardTitle>
            <CardDescription>Smart alerts to help you maintain required attendance</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="p-4 rounded-lg bg-yellow-500/10 border border-yellow-500/20">
                <div className="flex items-start gap-3">
                  <AlertTriangle className="h-5 w-5 text-yellow-500 mt-0.5" />
                  <div>
                    <h4 className="font-semibold text-foreground">Software Engineering Alert</h4>
                    <p className="text-sm text-muted-foreground mb-2">
                      You need to attend the next 3 consecutive classes to maintain 75% attendance.
                    </p>
                    <Button size="sm" variant="outline">View Details</Button>
                  </div>
                </div>
              </div>

              <div className="p-4 rounded-lg bg-red-500/10 border border-red-500/20">
                <div className="flex items-start gap-3">
                  <AlertTriangle className="h-5 w-5 text-red-500 mt-0.5" />
                  <div>
                    <h4 className="font-semibold text-foreground">Database Systems Critical</h4>
                    <p className="text-sm text-muted-foreground mb-2">
                      You cannot miss any more classes. Current attendance: 68%
                    </p>
                    <Button size="sm" variant="destructive">Take Action</Button>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
            <CardDescription>Manage your attendance efficiently</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <Button className="h-auto flex-col gap-2 p-6">
                <Calendar className="h-6 w-6" />
                <span>Mark Attendance</span>
              </Button>
              <Button variant="outline" className="h-auto flex-col gap-2 p-6">
                <Users className="h-6 w-6" />
                <span>View Classmates</span>
              </Button>
              <Button variant="outline" className="h-auto flex-col gap-2 p-6">
                <BarChart3 className="h-6 w-6" />
                <span>Download Report</span>
              </Button>
              <Button variant="outline" className="h-auto flex-col gap-2 p-6">
                <AlertTriangle className="h-6 w-6" />
                <span>Set Alerts</span>
              </Button>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
};

export default SmartAttendance;