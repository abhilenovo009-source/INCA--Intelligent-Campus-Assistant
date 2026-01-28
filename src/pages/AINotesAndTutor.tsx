import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Brain, FileText, MessageCircle, Lightbulb, BookOpen, Download, Upload, Sparkles } from "lucide-react";

const AINotesAndTutor = () => {
  const recentSessions = [
    {
      id: 1,
      subject: "Machine Learning",
      topic: "Neural Networks Basics",
      duration: "25 mins",
      date: "Today",
      type: "explanation",
      difficulty: "Intermediate"
    },
    {
      id: 2,
      subject: "Database Systems",
      topic: "SQL Query Optimization",
      duration: "18 mins",
      date: "Yesterday",
      type: "problem-solving",
      difficulty: "Advanced"
    },
    {
      id: 3,
      subject: "Data Structures",
      topic: "Binary Trees Traversal",
      duration: "30 mins",
      date: "2 days ago",
      type: "concept-review",
      difficulty: "Beginner"
    }
  ];

  const generatedNotes = [
    {
      id: 1,
      title: "Introduction to React Hooks",
      subject: "Web Development",
      pages: 8,
      date: "Jan 15, 2024",
      status: "completed",
      downloadUrl: "#"
    },
    {
      id: 2,
      title: "Machine Learning Algorithms Overview",
      subject: "Artificial Intelligence",
      pages: 12,
      date: "Jan 14, 2024",
      status: "completed",
      downloadUrl: "#"
    },
    {
      id: 3,
      title: "Database Normalization Explained",
      subject: "Database Systems",
      pages: 6,
      date: "Jan 13, 2024",
      status: "processing",
      downloadUrl: null
    }
  ];

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Beginner': return 'bg-green-500';
      case 'Intermediate': return 'bg-yellow-500';
      case 'Advanced': return 'bg-red-500';
      default: return 'bg-blue-500';
    }
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Header */}
      <header className="border-b border-border bg-gradient-card backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Brain className="h-8 w-8 text-primary" />
              <div>
                <h1 className="text-2xl font-bold text-foreground">AI Notes & Tutor</h1>
                <p className="text-muted-foreground">Intelligent learning companion and note generator</p>
              </div>
            </div>
            <Button variant="outline" onClick={() => window.history.back()}>
              Back to Home
            </Button>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-6 py-8">
        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="bg-gradient-card border-accent/20">
            <CardHeader className="pb-3">
              <CardTitle className="text-lg flex items-center gap-2">
                <MessageCircle className="h-5 w-5 text-primary" />
                Tutor Sessions
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-primary">47</div>
              <p className="text-sm text-muted-foreground">This month</p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-card border-accent/20">
            <CardHeader className="pb-3">
              <CardTitle className="text-lg flex items-center gap-2">
                <FileText className="h-5 w-5 text-blue-500" />
                Notes Generated
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-blue-500">23</div>
              <p className="text-sm text-muted-foreground">AI-powered summaries</p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-card border-accent/20">
            <CardHeader className="pb-3">
              <CardTitle className="text-lg flex items-center gap-2">
                <Lightbulb className="h-5 w-5 text-yellow-500" />
                Concepts Mastered
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-yellow-500">156</div>
              <p className="text-sm text-muted-foreground">Learning progress</p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-card border-accent/20">
            <CardHeader className="pb-3">
              <CardTitle className="text-lg flex items-center gap-2">
                <BookOpen className="h-5 w-5 text-green-500" />
                Study Streak
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-green-500">12</div>
              <p className="text-sm text-muted-foreground">Days in a row</p>
            </CardContent>
          </Card>
        </div>

        {/* AI Tutor Chat */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Sparkles className="h-6 w-6 text-primary" />
              AI Tutor Chat
            </CardTitle>
            <CardDescription>Ask questions and get explanations in simple terms</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {/* Sample Chat Messages */}
              <div className="space-y-3 bg-muted/30 rounded-lg p-4 max-h-60 overflow-y-auto">
                <div className="flex gap-3">
                  <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                    <Brain className="h-4 w-4 text-primary" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm">
                      Hello! I'm your AI tutor. I can help explain complex topics in simple words, 
                      solve problems step-by-step, and generate comprehensive notes. What would you like to learn today?
                    </p>
                  </div>
                </div>
                
                <div className="flex gap-3 justify-end">
                  <div className="bg-primary text-primary-foreground rounded-lg p-3 max-w-xs">
                    <p className="text-sm">
                      Can you explain how neural networks work in simple terms?
                    </p>
                  </div>
                </div>

                <div className="flex gap-3">
                  <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                    <Brain className="h-4 w-4 text-primary" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm">
                      Think of neural networks like your brain! Just as your brain has neurons that connect and pass messages, 
                      artificial neural networks have nodes that process information. They learn patterns by adjusting 
                      connections based on examples, similar to how you learn from experience.
                    </p>
                  </div>
                </div>
              </div>

              {/* Chat Input */}
              <div className="flex gap-2">
                <Textarea 
                  placeholder="Ask me anything about your subjects..." 
                  className="flex-1 min-h-[100px]"
                />
                <div className="flex flex-col gap-2">
                  <Button>
                    <MessageCircle className="h-4 w-4 mr-2" />
                    Send
                  </Button>
                  <Button variant="outline" size="sm">
                    <Upload className="h-4 w-4 mr-2" />
                    Upload
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Notes Generator */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileText className="h-6 w-6 text-blue-500" />
              AI Notes Generator
            </CardTitle>
            <CardDescription>Generate comprehensive notes from lectures, textbooks, or topics</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium mb-2 block">Subject</label>
                  <Input placeholder="e.g., Machine Learning" />
                </div>
                <div>
                  <label className="text-sm font-medium mb-2 block">Topic</label>
                  <Input placeholder="e.g., Supervised Learning Algorithms" />
                </div>
              </div>
              
              <div>
                <label className="text-sm font-medium mb-2 block">Content Source</label>
                <Textarea 
                  placeholder="Paste lecture content, upload files, or describe the topic you want notes for..." 
                  className="min-h-[120px]"
                />
              </div>

              <div className="flex gap-2">
                <Button className="flex-1">
                  <Sparkles className="h-4 w-4 mr-2" />
                  Generate Notes
                </Button>
                <Button variant="outline">
                  <Upload className="h-4 w-4 mr-2" />
                  Upload Files
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Recent Tutor Sessions */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          <Card>
            <CardHeader>
              <CardTitle>Recent Tutor Sessions</CardTitle>
              <CardDescription>Your learning history with AI tutor</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {recentSessions.map((session) => (
                  <div key={session.id} className="p-3 border border-border rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-semibold text-sm">{session.topic}</h4>
                      <Badge className={getDifficultyColor(session.difficulty)}>
                        {session.difficulty}
                      </Badge>
                    </div>
                    <div className="flex items-center gap-4 text-xs text-muted-foreground">
                      <span>{session.subject}</span>
                      <span>•</span>
                      <span>{session.duration}</span>
                      <span>•</span>
                      <span>{session.date}</span>
                    </div>
                    <Button size="sm" variant="ghost" className="mt-2 h-8">
                      Continue Session
                    </Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Generated Notes</CardTitle>
              <CardDescription>AI-created study materials</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {generatedNotes.map((note) => (
                  <div key={note.id} className="p-3 border border-border rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-semibold text-sm">{note.title}</h4>
                      <Badge variant={note.status === 'completed' ? 'default' : 'secondary'}>
                        {note.status}
                      </Badge>
                    </div>
                    <div className="flex items-center gap-4 text-xs text-muted-foreground mb-2">
                      <span>{note.subject}</span>
                      <span>•</span>
                      <span>{note.pages} pages</span>
                      <span>•</span>
                      <span>{note.date}</span>
                    </div>
                    <div className="flex gap-2">
                      {note.downloadUrl && (
                        <Button size="sm" variant="outline" className="h-8">
                          <Download className="h-3 w-3 mr-1" />
                          Download
                        </Button>
                      )}
                      <Button size="sm" variant="ghost" className="h-8">
                        View
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Learning Preferences */}
        <Card>
          <CardHeader>
            <CardTitle>Learning Preferences</CardTitle>
            <CardDescription>Customize your AI tutor experience</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <Button variant="outline" className="h-auto flex-col gap-2 p-6">
                <Brain className="h-6 w-6" />
                <span>Simple Explanations</span>
              </Button>
              <Button variant="outline" className="h-auto flex-col gap-2 p-6">
                <Lightbulb className="h-6 w-6" />
                <span>Visual Examples</span>
              </Button>
              <Button variant="outline" className="h-auto flex-col gap-2 p-6">
                <BookOpen className="h-6 w-6" />
                <span>Step-by-Step</span>
              </Button>
              <Button variant="outline" className="h-auto flex-col gap-2 p-6">
                <MessageCircle className="h-6 w-6" />
                <span>Interactive Mode</span>
              </Button>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
};

export default AINotesAndTutor;