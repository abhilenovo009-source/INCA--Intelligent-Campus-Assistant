import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Leaf, Recycle, Car, Lightbulb, Award, TrendingUp, Users, Target, TreePine, Droplets } from "lucide-react";

const GreenCredits = () => {
  const userStats = {
    totalCredits: 1247,
    monthlyGoal: 500,
    monthlyProgress: 345,
    rank: "#23",
    level: "Eco Warrior",
    carbonSaved: "127 kg",
    treesEquivalent: 8,
    streak: 12
  };

  const ecoActivities = [
    {
      id: 1,
      name: "Bike to Campus",
      description: "Use bicycle instead of motorized transport",
      credits: 25,
      icon: Car,
      category: "Transportation",
      frequency: "Daily",
      totalEarned: 325,
      color: "text-green-500"
    },
    {
      id: 2,
      name: "Recycle Materials",
      description: "Properly sort and recycle waste materials",
      credits: 15,
      icon: Recycle,
      category: "Waste Management",
      frequency: "Per action",
      totalEarned: 180,
      color: "text-blue-500"
    },
    {
      id: 3,
      name: "Energy Conservation",
      description: "Turn off lights and electronics when not in use",
      credits: 10,
      icon: Lightbulb,
      category: "Energy",
      frequency: "Daily",
      totalEarned: 120,
      color: "text-yellow-500"
    },
    {
      id: 4,
      name: "Water Conservation",
      description: "Use water-saving practices in dorms and facilities",
      credits: 12,
      icon: Droplets,
      category: "Water",
      frequency: "Daily",
      totalEarned: 96,
      color: "text-cyan-500"
    },
    {
      id: 5,
      name: "Plant a Tree",
      description: "Participate in campus tree planting initiatives",
      credits: 100,
      icon: TreePine,
      category: "Reforestation",
      frequency: "Per tree",
      totalEarned: 200,
      color: "text-green-600"
    }
  ];

  const recentActivities = [
    {
      id: 1,
      activity: "Biked to campus",
      credits: 25,
      date: "Today",
      impact: "Saved 2.3 kg CO₂"
    },
    {
      id: 2,
      activity: "Recycled 5 bottles",
      credits: 15,
      date: "Yesterday",
      impact: "Diverted 0.5 kg from landfill"
    },
    {
      id: 3,
      activity: "Energy conservation streak",
      credits: 30,
      date: "2 days ago",
      impact: "Saved 12 kWh energy"
    },
    {
      id: 4,
      activity: "Participated in campus cleanup",
      credits: 50,
      date: "3 days ago",
      impact: "Cleaned 200m² area"
    }
  ];

  const challenges = [
    {
      id: 1,
      title: "Green Week Challenge",
      description: "Complete all eco-activities for 7 consecutive days",
      progress: 57,
      current: 4,
      target: 7,
      reward: 500,
      timeLeft: "3 days left",
      status: "active"
    },
    {
      id: 2,
      title: "Zero Waste Campus",
      description: "Help achieve zero waste goal for the month",
      progress: 78,
      current: 234,
      target: 300,
      reward: 750,
      timeLeft: "2 weeks left",
      status: "active"
    },
    {
      id: 3,
      title: "Carbon Neutral Commute",
      description: "Use only eco-friendly transport for a month",
      progress: 100,
      current: 30,
      target: 30,
      reward: 600,
      timeLeft: "Completed",
      status: "completed"
    }
  ];

  const rewards = [
    {
      id: 1,
      name: "Free Coffee for a Week",
      cost: 200,
      description: "Redeemable at campus cafeterias",
      available: true
    },
    {
      id: 2,
      name: "Eco-Warrior T-Shirt",
      cost: 350,
      description: "Made from recycled materials",
      available: true
    },
    {
      id: 3,
      name: "Campus Parking Pass",
      cost: 500,
      description: "One month free parking pass",
      available: false
    },
    {
      id: 4,
      name: "Plant a Tree in Your Name",
      cost: 750,
      description: "We'll plant a tree on campus in your honor",
      available: true
    }
  ];

  const leaderboard = [
    { rank: 1, name: "Emma Green", credits: 2450, level: "Eco Champion", badge: "🏆" },
    { rank: 2, name: "Alex Nature", credits: 2180, level: "Eco Warrior", badge: "🥈" },
    { rank: 3, name: "Sam Earth", credits: 1890, level: "Eco Warrior", badge: "🥉" },
    { rank: 23, name: "You", credits: 1247, level: "Eco Warrior", badge: "🌱", isCurrentUser: true }
  ];

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Header */}
      <header className="border-b border-border bg-gradient-card backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Leaf className="h-8 w-8 text-primary" />
              <div>
                <h1 className="text-2xl font-bold text-foreground">Green Credits System</h1>
                <p className="text-muted-foreground">Earn rewards for sustainable actions</p>
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
        <Card className="mb-8 bg-gradient-to-r from-green-500/10 to-blue-500/10 border-green-500/20">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-2xl flex items-center gap-2">
                  <Leaf className="h-8 w-8 text-green-500" />
                  {userStats.totalCredits} Green Credits
                </CardTitle>
                <CardDescription>
                  {userStats.level} • Rank {userStats.rank} • {userStats.streak} day streak
                </CardDescription>
              </div>
              <div className="text-right">
                <div className="text-3xl font-bold text-green-500">{userStats.treesEquivalent}</div>
                <p className="text-sm text-muted-foreground">Trees saved equivalent</p>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between text-sm text-muted-foreground mb-2">
                  <span>Monthly Goal Progress</span>
                  <span>{userStats.monthlyProgress} / {userStats.monthlyGoal} credits</span>
                </div>
                <Progress value={(userStats.monthlyProgress / userStats.monthlyGoal) * 100} />
              </div>
              
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="text-center">
                  <TreePine className="h-6 w-6 mx-auto mb-1 text-green-500" />
                  <div className="font-bold text-green-500">{userStats.treesEquivalent}</div>
                  <p className="text-xs text-muted-foreground">Trees Equivalent</p>
                </div>
                <div className="text-center">
                  <Car className="h-6 w-6 mx-auto mb-1 text-blue-500" />
                  <div className="font-bold text-blue-500">{userStats.carbonSaved}</div>
                  <p className="text-xs text-muted-foreground">Carbon Saved</p>
                </div>
                <div className="text-center">
                  <Award className="h-6 w-6 mx-auto mb-1 text-yellow-500" />
                  <div className="font-bold text-yellow-500">{userStats.rank}</div>
                  <p className="text-xs text-muted-foreground">Campus Rank</p>
                </div>
                <div className="text-center">
                  <TrendingUp className="h-6 w-6 mx-auto mb-1 text-purple-500" />
                  <div className="font-bold text-purple-500">{userStats.streak}</div>
                  <p className="text-xs text-muted-foreground">Day Streak</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Eco Activities */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Eco Activities</CardTitle>
            <CardDescription>Earn credits for sustainable actions</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {ecoActivities.map((activity) => (
                <Card key={activity.id} className="p-4 hover:shadow-md transition-shadow">
                  <div className="flex items-start justify-between mb-3">
                    <activity.icon className={`h-8 w-8 ${activity.color}`} />
                    <Badge variant="outline">{activity.category}</Badge>
                  </div>
                  <h3 className="font-semibold mb-2">{activity.name}</h3>
                  <p className="text-sm text-muted-foreground mb-3">{activity.description}</p>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Credits per {activity.frequency.toLowerCase()}</span>
                      <span className="font-bold text-green-500">+{activity.credits}</span>
                    </div>
                    <div className="flex justify-between text-sm text-muted-foreground">
                      <span>Total earned</span>
                      <span>{activity.totalEarned} credits</span>
                    </div>
                  </div>
                  <Button className="w-full mt-3" size="sm">
                    Log Activity
                  </Button>
                </Card>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Active Challenges */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Active Challenges</CardTitle>
            <CardDescription>Special challenges for bonus credits</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {challenges.map((challenge) => (
                <Card key={challenge.id} className="p-4">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <h3 className="font-semibold">{challenge.title}</h3>
                        <Badge variant={challenge.status === 'completed' ? 'default' : 'secondary'}>
                          {challenge.status}
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground mb-3">{challenge.description}</p>
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>Progress: {challenge.current} / {challenge.target}</span>
                          <span>{challenge.progress}%</span>
                        </div>
                        <Progress value={challenge.progress} />
                      </div>
                    </div>
                    <div className="text-right ml-4">
                      <div className="font-bold text-green-500 text-xl">+{challenge.reward}</div>
                      <p className="text-sm text-muted-foreground">credits</p>
                      <p className="text-xs text-muted-foreground mt-1">{challenge.timeLeft}</p>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Recent Activity & Leaderboard */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Recent Activity */}
          <Card>
            <CardHeader>
              <CardTitle>Recent Activity</CardTitle>
              <CardDescription>Your latest eco-friendly actions</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {recentActivities.map((activity) => (
                  <div key={activity.id} className="flex items-center justify-between p-3 border border-border rounded-lg">
                    <div>
                      <div className="font-semibold text-sm">{activity.activity}</div>
                      <div className="text-xs text-muted-foreground">{activity.impact}</div>
                    </div>
                    <div className="text-right">
                      <div className="font-bold text-green-500">+{activity.credits}</div>
                      <div className="text-xs text-muted-foreground">{activity.date}</div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Leaderboard */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="h-5 w-5 text-green-500" />
                Green Leaderboard
              </CardTitle>
              <CardDescription>Top eco-warriors on campus</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {leaderboard.map((player) => (
                  <div 
                    key={player.rank} 
                    className={`flex items-center justify-between p-3 rounded-lg ${
                      player.isCurrentUser ? 'bg-green-500/10 border border-green-500/20' : 'hover:bg-muted/50'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-8 text-center">
                        {player.badge || `#${player.rank}`}
                      </div>
                      <div>
                        <div className={`font-semibold ${player.isCurrentUser ? 'text-green-500' : ''}`}>
                          {player.name}
                        </div>
                        <div className="text-sm text-muted-foreground">{player.level}</div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="font-bold text-green-500">{player.credits.toLocaleString()}</div>
                      <div className="text-sm text-muted-foreground">credits</div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Rewards Store */}
        <Card>
          <CardHeader>
            <CardTitle>Rewards Store</CardTitle>
            <CardDescription>Redeem your green credits for awesome rewards</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {rewards.map((reward) => (
                <Card key={reward.id} className={`p-4 ${!reward.available ? 'opacity-50' : ''}`}>
                  <div className="text-center">
                    <div className="text-4xl mb-2">🎁</div>
                    <h3 className="font-semibold mb-2">{reward.name}</h3>
                    <p className="text-sm text-muted-foreground mb-3">{reward.description}</p>
                    <div className="font-bold text-xl text-green-500 mb-3">
                      {reward.cost} credits
                    </div>
                    <Button 
                      size="sm" 
                      className="w-full" 
                      disabled={!reward.available || userStats.totalCredits < reward.cost}
                    >
                      {userStats.totalCredits >= reward.cost ? 'Redeem' : 'Not Enough Credits'}
                    </Button>
                  </div>
                </Card>
              ))}
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
};

export default GreenCredits;