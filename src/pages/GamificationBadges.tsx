import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Trophy, Star, Award, Target, Zap, Users, BookOpen, Code, Leaf, Calendar } from "lucide-react";

const GamificationBadges = () => {
  const userStats = {
    totalPoints: 2450,
    level: 8,
    nextLevelPoints: 2800,
    rank: "#47",
    totalBadges: 12,
    streakDays: 15,
    weeklyGoal: 200,
    weeklyProgress: 145
  };

  const earnedBadges = [
    {
      id: 1,
      name: "Top Coder",
      description: "Solved 50+ programming problems",
      icon: Code,
      category: "Academic",
      rarity: "Epic",
      points: 500,
      earnedDate: "Jan 10, 2024",
      progress: 100,
      color: "text-purple-500"
    },
    {
      id: 2,
      name: "Active Learner",
      description: "Maintained 7-day study streak",
      icon: BookOpen,
      category: "Learning",
      rarity: "Rare",
      points: 200,
      earnedDate: "Jan 8, 2024",
      progress: 100,
      color: "text-blue-500"
    },
    {
      id: 3,
      name: "Green Warrior",
      description: "Earned 1000 sustainability points",
      icon: Leaf,
      category: "Sustainability",
      rarity: "Legendary",
      points: 750,
      earnedDate: "Jan 5, 2024",
      progress: 100,
      color: "text-green-500"
    },
    {
      id: 4,
      name: "Event Enthusiast",
      description: "Attended 10+ campus events",
      icon: Calendar,
      category: "Social",
      rarity: "Common",
      points: 150,
      earnedDate: "Jan 3, 2024",
      progress: 100,
      color: "text-yellow-500"
    }
  ];

  const progressBadges = [
    {
      id: 1,
      name: "Study Master",
      description: "Study for 100 hours total",
      icon: BookOpen,
      category: "Academic",
      rarity: "Epic",
      points: 600,
      progress: 78,
      currentValue: 78,
      targetValue: 100,
      color: "text-blue-500"
    },
    {
      id: 2,
      name: "Community Helper",
      description: "Help 25 students with questions",
      icon: Users,
      category: "Social",
      rarity: "Rare",
      points: 300,
      progress: 64,
      currentValue: 16,
      targetValue: 25,
      color: "text-orange-500"
    },
    {
      id: 3,
      name: "Perfect Attendance",
      description: "Maintain 95% attendance for semester",
      icon: Target,
      category: "Academic",
      rarity: "Legendary",
      points: 800,
      progress: 92,
      currentValue: 92,
      targetValue: 95,
      color: "text-red-500"
    }
  ];

  const leaderboard = [
    { rank: 1, name: "Alex Johnson", points: 4250, level: 12, badge: "🏆" },
    { rank: 2, name: "Sarah Chen", points: 3890, level: 11, badge: "🥈" },
    { rank: 3, name: "Mike Rodriguez", points: 3560, level: 10, badge: "🥉" },
    { rank: 47, name: "You", points: 2450, level: 8, badge: "⭐", isCurrentUser: true },
    { rank: 48, name: "Emma Davis", points: 2430, level: 8, badge: "" },
    { rank: 49, name: "Tom Wilson", points: 2410, level: 8, badge: "" }
  ];

  const getRarityColor = (rarity: string) => {
    switch (rarity) {
      case 'Legendary': return 'bg-gradient-to-r from-yellow-400 to-orange-500';
      case 'Epic': return 'bg-gradient-to-r from-purple-400 to-pink-500';
      case 'Rare': return 'bg-gradient-to-r from-blue-400 to-cyan-500';
      default: return 'bg-gradient-to-r from-gray-400 to-gray-500';
    }
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Header */}
      <header className="border-b border-border bg-gradient-card backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Trophy className="h-8 w-8 text-primary" />
              <div>
                <h1 className="text-2xl font-bold text-foreground">Gamification & Badges</h1>
                <p className="text-muted-foreground">Earn points, unlock achievements, climb leaderboards</p>
              </div>
            </div>
            <Button variant="outline" onClick={() => window.history.back()}>
              Back to Home
            </Button>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-6 py-8">
        {/* User Stats */}
        <Card className="mb-8 bg-gradient-hero border-primary/20">
          <CardHeader>
            <div className="flex items-center justify-between text-white">
              <div>
                <CardTitle className="text-2xl text-white">Level {userStats.level}</CardTitle>
                <CardDescription className="text-white/80">
                  {userStats.totalPoints} total points • Rank {userStats.rank}
                </CardDescription>
              </div>
              <div className="text-right">
                <div className="text-3xl font-bold text-white">{userStats.totalBadges}</div>
                <p className="text-sm text-white/80">Badges earned</p>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between text-sm text-white/80 mb-2">
                  <span>Progress to Level {userStats.level + 1}</span>
                  <span>{userStats.totalPoints} / {userStats.nextLevelPoints}</span>
                </div>
                <Progress 
                  value={(userStats.totalPoints / userStats.nextLevelPoints) * 100} 
                  className="bg-white/20"
                />
              </div>
              
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-white">
                <div className="text-center">
                  <Zap className="h-6 w-6 mx-auto mb-1" />
                  <div className="font-bold">{userStats.streakDays}</div>
                  <p className="text-xs text-white/80">Day Streak</p>
                </div>
                <div className="text-center">
                  <Target className="h-6 w-6 mx-auto mb-1" />
                  <div className="font-bold">{userStats.weeklyProgress}/{userStats.weeklyGoal}</div>
                  <p className="text-xs text-white/80">Weekly Goal</p>
                </div>
                <div className="text-center">
                  <Trophy className="h-6 w-6 mx-auto mb-1" />
                  <div className="font-bold">{userStats.rank}</div>
                  <p className="text-xs text-white/80">Campus Rank</p>
                </div>
                <div className="text-center">
                  <Star className="h-6 w-6 mx-auto mb-1" />
                  <div className="font-bold">{userStats.totalPoints}</div>
                  <p className="text-xs text-white/80">Total Points</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Earned Badges */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Your Badge Collection</CardTitle>
            <CardDescription>Achievements you've unlocked</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {earnedBadges.map((badge) => (
                <Card key={badge.id} className="relative overflow-hidden">
                  <div className={`absolute top-0 left-0 right-0 h-1 ${getRarityColor(badge.rarity)}`} />
                  <CardHeader className="pb-2">
                    <div className="flex items-center justify-between">
                      <badge.icon className={`h-8 w-8 ${badge.color}`} />
                      <Badge variant="outline">{badge.rarity}</Badge>
                    </div>
                    <CardTitle className="text-lg">{badge.name}</CardTitle>
                    <CardDescription className="text-sm">{badge.description}</CardDescription>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">Earned {badge.earnedDate}</span>
                      <span className="font-bold text-primary">+{badge.points} pts</span>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Progress Badges */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Badges in Progress</CardTitle>
            <CardDescription>Keep working towards these achievements</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {progressBadges.map((badge) => (
                <Card key={badge.id} className="p-4">
                  <div className="flex items-start gap-4">
                    <badge.icon className={`h-10 w-10 ${badge.color} mt-1`} />
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="font-semibold text-lg">{badge.name}</h3>
                        <div className="flex items-center gap-2">
                          <Badge variant="outline">{badge.rarity}</Badge>
                          <span className="text-sm font-bold text-primary">+{badge.points} pts</span>
                        </div>
                      </div>
                      <p className="text-muted-foreground text-sm mb-3">{badge.description}</p>
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>Progress: {badge.currentValue} / {badge.targetValue}</span>
                          <span>{badge.progress}%</span>
                        </div>
                        <Progress value={badge.progress} />
                      </div>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Leaderboard */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Trophy className="h-6 w-6 text-yellow-500" />
              Campus Leaderboard
            </CardTitle>
            <CardDescription>See how you stack up against other students</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {leaderboard.map((player) => (
                <div 
                  key={player.rank} 
                  className={`flex items-center justify-between p-3 rounded-lg ${
                    player.isCurrentUser ? 'bg-primary/10 border border-primary/20' : 'hover:bg-muted/50'
                  }`}
                >
                  <div className="flex items-center gap-4">
                    <div className="w-8 text-center">
                      {player.badge || `#${player.rank}`}
                    </div>
                    <div>
                      <div className={`font-semibold ${player.isCurrentUser ? 'text-primary' : ''}`}>
                        {player.name}
                      </div>
                      <div className="text-sm text-muted-foreground">Level {player.level}</div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="font-bold">{player.points.toLocaleString()}</div>
                    <div className="text-sm text-muted-foreground">points</div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Challenge of the Week */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Zap className="h-6 w-6 text-yellow-500" />
              Weekly Challenge
            </CardTitle>
            <CardDescription>Special challenges for bonus points</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="p-4 bg-gradient-card border border-accent/20 rounded-lg">
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="font-semibold text-lg mb-2">Green Campus Initiative</h3>
                  <p className="text-muted-foreground mb-4">
                    Use eco-friendly transportation methods for a week. 
                    Walk, bike, or use public transport instead of cars.
                  </p>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Progress: 4 / 7 days</span>
                      <span>57%</span>
                    </div>
                    <Progress value={57} />
                  </div>
                </div>
                <div className="text-right">
                  <Badge className="bg-green-500 mb-2">+500 pts</Badge>
                  <p className="text-sm text-muted-foreground">Bonus reward</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <Card>
          <CardHeader>
            <CardTitle>Earn More Points</CardTitle>
            <CardDescription>Quick ways to boost your score</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <Button variant="outline" className="h-auto flex-col gap-2 p-6">
                <BookOpen className="h-6 w-6" />
                <span>Study Session</span>
                <span className="text-xs text-muted-foreground">+10 pts</span>
              </Button>
              <Button variant="outline" className="h-auto flex-col gap-2 p-6">
                <Users className="h-6 w-6" />
                <span>Help Others</span>
                <span className="text-xs text-muted-foreground">+25 pts</span>
              </Button>
              <Button variant="outline" className="h-auto flex-col gap-2 p-6">
                <Calendar className="h-6 w-6" />
                <span>Attend Event</span>
                <span className="text-xs text-muted-foreground">+50 pts</span>
              </Button>
              <Button variant="outline" className="h-auto flex-col gap-2 p-6">
                <Leaf className="h-6 w-6" />
                <span>Green Action</span>
                <span className="text-xs text-muted-foreground">+20 pts</span>
              </Button>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
};

export default GamificationBadges;