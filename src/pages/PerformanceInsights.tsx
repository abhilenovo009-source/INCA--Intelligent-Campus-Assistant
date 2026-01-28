import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { BarChart3, TrendingUp, Target, AlertTriangle, Award, Calendar, Brain, BookOpen } from "lucide-react";

const PerformanceInsights = () => {
  const subjectPerformance = [
    {
      subject: "Machine Learning",
      currentGrade: "A",
      trend: "up",
      progress: 92,
      prediction: "A",
      strengths: ["Theory", "Implementation"],
      weaknesses: ["Optimization"],
      nextExam: "Feb 15",
      studyHours: 18,
      confidence: 95
    },
    {
      subject: "Database Systems",
      currentGrade: "B+",
      trend: "stable",
      progress: 85,
      prediction: "A-",
      strengths: ["SQL", "Design"],
      weaknesses: ["Performance Tuning"],
      nextExam: "Feb 12",
      studyHours: 22,
      confidence: 78
    },
    {
      subject: "Software Engineering",
      currentGrade: "B",
      trend: "up",
      progress: 78,
      prediction: "B+",
      strengths: ["Testing", "Documentation"],
      weaknesses: ["Architecture Design"],
      nextExam: "Feb 18",
      studyHours: 15,
      confidence: 82
    },
    {
      subject: "Computer Networks",
      currentGrade: "C+",
      trend: "down",
      progress: 65,
      prediction: "B-",
      strengths: ["Protocols"],
      weaknesses: ["Security", "Performance"],
      nextExam: "Feb 20",
      studyHours: 28,
      confidence: 68
    }
  ];

  const learningMetrics = {
    totalStudyHours: 83,
    averageSessionLength: 45,
    conceptsMastered: 156,
    practiceProblems: 89,
    weeklyGoal: 20,
    weeklyActual: 18,
    streakDays: 12,
    predictedGPA: 3.4
  };

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case 'up': return <TrendingUp className="h-4 w-4 text-green-500" />;
      case 'down': return <AlertTriangle className="h-4 w-4 text-red-500" />;
      default: return <BarChart3 className="h-4 w-4 text-blue-500" />;
    }
  };

  const getGradeColor = (grade: string) => {
    if (grade.startsWith('A')) return 'text-green-500';
    if (grade.startsWith('B')) return 'text-blue-500';
    if (grade.startsWith('C')) return 'text-yellow-500';
    return 'text-red-500';
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Header */}
      <header className="border-b border-border bg-gradient-card backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <BarChart3 className="h-8 w-8 text-primary" />
              <div>
                <h1 className="text-2xl font-bold text-foreground">Performance Insights</h1>
                <p className="text-muted-foreground">AI-powered analytics and predictions</p>
              </div>
            </div>
            <Button variant="outline" onClick={() => window.history.back()}>
              Back to Home
            </Button>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-6 py-8">
        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="bg-gradient-card border-accent/20">
            <CardHeader className="pb-3">
              <CardTitle className="text-lg flex items-center gap-2">
                <Target className="h-5 w-5 text-primary" />
                Predicted GPA
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-primary">{learningMetrics.predictedGPA}</div>
              <p className="text-sm text-muted-foreground">Based on current trends</p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-card border-accent/20">
            <CardHeader className="pb-3">
              <CardTitle className="text-lg flex items-center gap-2">
                <BookOpen className="h-5 w-5 text-blue-500" />
                Study Hours
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-blue-500">{learningMetrics.totalStudyHours}</div>
              <p className="text-sm text-muted-foreground">This month</p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-card border-accent/20">
            <CardHeader className="pb-3">
              <CardTitle className="text-lg flex items-center gap-2">
                <Brain className="h-5 w-5 text-purple-500" />
                Concepts Mastered
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-purple-500">{learningMetrics.conceptsMastered}</div>
              <p className="text-sm text-muted-foreground">Learning progress</p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-card border-accent/20">
            <CardHeader className="pb-3">
              <CardTitle className="text-lg flex items-center gap-2">
                <Award className="h-5 w-5 text-yellow-500" />
                Study Streak
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-yellow-500">{learningMetrics.streakDays}</div>
              <p className="text-sm text-muted-foreground">Days in a row</p>
            </CardContent>
          </Card>
        </div>

        {/* Weekly Goal Progress */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Weekly Study Goal</CardTitle>
            <CardDescription>Track your progress toward weekly study targets</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Study Hours Goal</span>
                <span className="text-sm text-muted-foreground">
                  {learningMetrics.weeklyActual} / {learningMetrics.weeklyGoal} hours
                </span>
              </div>
              <Progress value={(learningMetrics.weeklyActual / learningMetrics.weeklyGoal) * 100} />
              
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
                <div className="text-center">
                  <div className="text-2xl font-bold text-primary">{learningMetrics.averageSessionLength}m</div>
                  <p className="text-sm text-muted-foreground">Avg Session</p>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-500">{learningMetrics.practiceProblems}</div>
                  <p className="text-sm text-muted-foreground">Problems Solved</p>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-blue-500">85%</div>
                  <p className="text-sm text-muted-foreground">Goal Achievement</p>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-purple-500">+12%</div>
                  <p className="text-sm text-muted-foreground">Weekly Improvement</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Subject-wise Performance */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Subject-wise Analytics</CardTitle>
            <CardDescription>Detailed performance breakdown with AI predictions</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {subjectPerformance.map((subject, index) => (
                <div key={index} className="p-4 border border-border rounded-lg bg-card">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <h3 className="font-semibold text-lg">{subject.subject}</h3>
                      <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        <span>Current: <span className={`font-semibold ${getGradeColor(subject.currentGrade)}`}>{subject.currentGrade}</span></span>
                        <span>Predicted: <span className={`font-semibold ${getGradeColor(subject.prediction)}`}>{subject.prediction}</span></span>
                        <span className="flex items-center gap-1">
                          {getTrendIcon(subject.trend)}
                          Trend
                        </span>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-2xl font-bold text-primary">{subject.progress}%</div>
                      <p className="text-sm text-muted-foreground">Progress</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                    <div>
                      <label className="text-sm font-medium text-muted-foreground">Strengths</label>
                      <div className="flex gap-1 mt-1">
                        {subject.strengths.map((strength, i) => (
                          <Badge key={i} variant="default" className="text-xs">
                            {strength}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-muted-foreground">Areas to Improve</label>
                      <div className="flex gap-1 mt-1">
                        {subject.weaknesses.map((weakness, i) => (
                          <Badge key={i} variant="destructive" className="text-xs">
                            {weakness}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-muted-foreground">Next Exam</label>
                      <div className="flex items-center gap-2 mt-1">
                        <Calendar className="h-4 w-4 text-muted-foreground" />
                        <span className="text-sm">{subject.nextExam}</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4 text-sm">
                      <span>Study Hours: <span className="font-semibold">{subject.studyHours}h</span></span>
                      <span>Confidence: <span className="font-semibold text-primary">{subject.confidence}%</span></span>
                    </div>
                    <div className="flex gap-2">
                      <Button size="sm" variant="outline">Study Plan</Button>
                      <Button size="sm">View Details</Button>
                    </div>
                  </div>

                  <Progress value={subject.progress} className="mt-3" />
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* AI Recommendations */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Brain className="h-6 w-6 text-primary" />
              AI Recommendations
            </CardTitle>
            <CardDescription>Personalized suggestions to improve your performance</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="p-4 bg-blue-500/10 border border-blue-500/20 rounded-lg">
                <div className="flex items-start gap-3">
                  <Target className="h-5 w-5 text-blue-500 mt-0.5" />
                  <div>
                    <h4 className="font-semibold text-foreground">Focus on Computer Networks</h4>
                    <p className="text-sm text-muted-foreground mb-2">
                      Your performance in Computer Networks is declining. Dedicate 2-3 extra hours this week to security and performance topics.
                    </p>
                    <Button size="sm" variant="outline">Create Study Plan</Button>
                  </div>
                </div>
              </div>

              <div className="p-4 bg-green-500/10 border border-green-500/20 rounded-lg">
                <div className="flex items-start gap-3">
                  <Award className="h-5 w-5 text-green-500 mt-0.5" />
                  <div>
                    <h4 className="font-semibold text-foreground">Excellent Progress in Machine Learning</h4>
                    <p className="text-sm text-muted-foreground mb-2">
                      You're on track for an A grade! Consider exploring advanced topics like deep learning architectures.
                    </p>
                    <Button size="sm" variant="outline">Advanced Topics</Button>
                  </div>
                </div>
              </div>

              <div className="p-4 bg-yellow-500/10 border border-yellow-500/20 rounded-lg">
                <div className="flex items-start gap-3">
                  <AlertTriangle className="h-5 w-5 text-yellow-500 mt-0.5" />
                  <div>
                    <h4 className="font-semibold text-foreground">Optimize Study Schedule</h4>
                    <p className="text-sm text-muted-foreground mb-2">
                      Your study sessions are shorter than average. Try increasing session length to 60-75 minutes for better retention.
                    </p>
                    <Button size="sm" variant="outline">Adjust Schedule</Button>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <Card>
          <CardHeader>
            <CardTitle>Performance Tools</CardTitle>
            <CardDescription>Analyze and improve your academic performance</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <Button variant="outline" className="h-auto flex-col gap-2 p-6">
                <BarChart3 className="h-6 w-6" />
                <span>Detailed Report</span>
              </Button>
              <Button variant="outline" className="h-auto flex-col gap-2 p-6">
                <Target className="h-6 w-6" />
                <span>Set Goals</span>
              </Button>
              <Button variant="outline" className="h-auto flex-col gap-2 p-6">
                <Brain className="h-6 w-6" />
                <span>Study Plan</span>
              </Button>
              <Button variant="outline" className="h-auto flex-col gap-2 p-6">
                <Calendar className="h-6 w-6" />
                <span>Schedule Review</span>
              </Button>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
};

export default PerformanceInsights;