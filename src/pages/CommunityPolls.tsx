import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { BarChart3, Users, MessageSquare, TrendingUp, Plus, Vote, Eye, Share } from "lucide-react";

const CommunityPolls = () => {
  const activePolls = [
    {
      id: 1,
      title: "Should the library extend weekend hours?",
      description: "Vote on whether the central library should stay open later on weekends.",
      category: "Campus Facilities",
      totalVotes: 1247,
      timeLeft: "2 days left",
      hasVoted: false,
      isAnonymous: true,
      options: [
        { text: "Yes, until 11 PM", votes: 687, percentage: 55 },
        { text: "Yes, until 9 PM", votes: 312, percentage: 25 },
        { text: "No, current hours are fine", votes: 248, percentage: 20 }
      ]
    },
    {
      id: 2,
      title: "Best location for new food truck?",
      description: "Help us decide where to place the new healthy food truck on campus.",
      category: "Food & Dining",
      totalVotes: 892,
      timeLeft: "5 days left",
      hasVoted: true,
      isAnonymous: false,
      options: [
        { text: "Near the library", votes: 356, percentage: 40 },
        { text: "Student center plaza", votes: 267, percentage: 30 },
        { text: "Engineering building", votes: 178, percentage: 20 },
        { text: "Sports complex", votes: 91, percentage: 10 }
      ]
    },
    {
      id: 3,
      title: "Rate the new AI tutoring system",
      description: "Anonymous feedback on the recently launched AI tutoring system.",
      category: "Academic Services",
      totalVotes: 634,
      timeLeft: "1 week left",
      hasVoted: false,
      isAnonymous: true,
      options: [
        { text: "Excellent - very helpful", votes: 285, percentage: 45 },
        { text: "Good - mostly useful", votes: 190, percentage: 30 },
        { text: "Average - could improve", votes: 127, percentage: 20 },
        { text: "Poor - not helpful", votes: 32, percentage: 5 }
      ]
    }
  ];

  const recentResults = [
    {
      id: 1,
      title: "Preferred study environment improvements",
      category: "Academic",
      totalVotes: 1856,
      winner: "More quiet study spaces",
      winnerPercentage: 42,
      completedDate: "3 days ago"
    },
    {
      id: 2,
      title: "Campus sustainability initiatives",
      category: "Environment",
      totalVotes: 1234,
      winner: "Solar panel installation",
      winnerPercentage: 38,
      completedDate: "1 week ago"
    }
  ];

  const pollCategories = [
    { name: "Campus Facilities", count: 12, icon: "🏢" },
    { name: "Food & Dining", count: 8, icon: "🍕" },
    { name: "Academic Services", count: 15, icon: "📚" },
    { name: "Events & Activities", count: 6, icon: "🎉" },
    { name: "Environment", count: 9, icon: "🌱" },
    { name: "Technology", count: 11, icon: "💻" }
  ];

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Header */}
      <header className="border-b border-border bg-gradient-card backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <BarChart3 className="h-8 w-8 text-primary" />
              <div>
                <h1 className="text-2xl font-bold text-foreground">Community Polls</h1>
                <p className="text-muted-foreground">Voice your opinion, shape campus decisions</p>
              </div>
            </div>
            <div className="flex gap-2">
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                Create Poll
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
                <Vote className="h-5 w-5 text-primary" />
                Active Polls
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-primary">23</div>
              <p className="text-sm text-muted-foreground">Open for voting</p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-card border-accent/20">
            <CardHeader className="pb-3">
              <CardTitle className="text-lg flex items-center gap-2">
                <Users className="h-5 w-5 text-blue-500" />
                Your Votes
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-blue-500">47</div>
              <p className="text-sm text-muted-foreground">Polls participated</p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-card border-accent/20">
            <CardHeader className="pb-3">
              <CardTitle className="text-lg flex items-center gap-2">
                <TrendingUp className="h-5 w-5 text-green-500" />
                Participation
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-green-500">78%</div>
              <p className="text-sm text-muted-foreground">Campus engagement</p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-card border-accent/20">
            <CardHeader className="pb-3">
              <CardTitle className="text-lg flex items-center gap-2">
                <MessageSquare className="h-5 w-5 text-purple-500" />
                Impact Made
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-purple-500">12</div>
              <p className="text-sm text-muted-foreground">Changes implemented</p>
            </CardContent>
          </Card>
        </div>

        {/* Poll Categories */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Poll Categories</CardTitle>
            <CardDescription>Browse polls by topic</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
              {pollCategories.map((category, index) => (
                <Button key={index} variant="outline" className="h-auto flex-col gap-2 p-4">
                  <span className="text-2xl">{category.icon}</span>
                  <span className="font-semibold text-sm">{category.name}</span>
                  <span className="text-xs text-muted-foreground">{category.count} polls</span>
                </Button>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Active Polls */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Active Polls</CardTitle>
            <CardDescription>Vote on current campus issues and improvements</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {activePolls.map((poll) => (
                <Card key={poll.id} className="p-4 border border-border">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <Badge variant="outline">{poll.category}</Badge>
                        {poll.isAnonymous && <Badge variant="secondary">Anonymous</Badge>}
                        {poll.hasVoted && <Badge className="bg-green-500">Voted</Badge>}
                      </div>
                      <h3 className="font-semibold text-lg mb-2">{poll.title}</h3>
                      <p className="text-muted-foreground text-sm mb-3">{poll.description}</p>
                      <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        <span className="flex items-center gap-1">
                          <Users className="h-4 w-4" />
                          {poll.totalVotes} votes
                        </span>
                        <span>{poll.timeLeft}</span>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button size="sm" variant="outline">
                        <Share className="h-4 w-4" />
                      </Button>
                      <Button size="sm" variant="outline">
                        <Eye className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>

                  <div className="space-y-3">
                    {poll.options.map((option, index) => (
                      <div key={index} className="space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="text-sm font-medium">{option.text}</span>
                          <span className="text-sm text-muted-foreground">
                            {option.votes} votes ({option.percentage}%)
                          </span>
                        </div>
                        <div className="relative">
                          <Progress value={option.percentage} />
                          {!poll.hasVoted && (
                            <Button
                              size="sm"
                              className="absolute -top-8 right-0 h-6 text-xs"
                              onClick={() => console.log(`Voted for: ${option.text}`)}
                            >
                              Vote
                            </Button>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>

                  {!poll.hasVoted && (
                    <div className="mt-4 p-3 bg-muted/30 rounded-lg">
                      <p className="text-sm text-muted-foreground mb-2">
                        💡 Your vote matters! Help make campus decisions.
                      </p>
                    </div>
                  )}
                </Card>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Recent Results */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Recent Results</CardTitle>
            <CardDescription>See what the community decided</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentResults.map((result) => (
                <div key={result.id} className="p-4 border border-border rounded-lg">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <Badge variant="outline">{result.category}</Badge>
                        <span className="text-sm text-muted-foreground">{result.completedDate}</span>
                      </div>
                      <h4 className="font-semibold">{result.title}</h4>
                      <p className="text-sm text-muted-foreground">
                        Winner: <span className="font-medium text-foreground">{result.winner}</span> ({result.winnerPercentage}%)
                      </p>
                    </div>
                    <div className="text-right">
                      <div className="text-sm text-muted-foreground">{result.totalVotes} total votes</div>
                      <Button size="sm" variant="outline" className="mt-2">View Results</Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Create Poll Section */}
        <Card>
          <CardHeader>
            <CardTitle>Create Your Own Poll</CardTitle>
            <CardDescription>Start a discussion on topics that matter to you</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium mb-2 block">Poll Question</label>
                <Input placeholder="What would you like to ask the community?" />
              </div>
              
              <div>
                <label className="text-sm font-medium mb-2 block">Description</label>
                <Textarea 
                  placeholder="Provide more context about your poll..." 
                  className="min-h-[100px]"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium mb-2 block">Category</label>
                  <Input placeholder="e.g., Campus Facilities" />
                </div>
                <div>
                  <label className="text-sm font-medium mb-2 block">Duration</label>
                  <Input placeholder="e.g., 7 days" />
                </div>
              </div>

              <div className="flex gap-2">
                <Button>Create Poll</Button>
                <Button variant="outline">Save as Draft</Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
};

export default CommunityPolls;