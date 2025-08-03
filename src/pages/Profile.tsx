import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { BarChart3, Clock, Target, TrendingUp, User, Settings, Trophy, Calendar } from "lucide-react";
import RewardSystem from "@/components/RewardSystem";

const Profile = () => {
  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-3xl font-light text-foreground">Profile</h1>
        <p className="text-muted-foreground mt-2">Manage your meditation journey and track progress</p>
      </div>

      <Tabs defaultValue="overview" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="stats">Stats</TabsTrigger>
          <TabsTrigger value="rewards">Rewards</TabsTrigger>
          <TabsTrigger value="settings">Settings</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          {/* Profile Header */}
          <Card className="border-meditation-primary/20">
            <CardContent className="pt-6">
              <div className="flex items-center space-x-6">
                <Avatar className="h-20 w-20">
                  <AvatarImage src="" alt="Profile" />
                  <AvatarFallback className="bg-meditation-primary/10 text-meditation-primary text-lg">
                    <User className="h-8 w-8" />
                  </AvatarFallback>
                </Avatar>
                <div className="space-y-2">
                  <h2 className="text-2xl font-medium">Meditation Practitioner</h2>
                  <p className="text-muted-foreground">Your mindfulness journey awaits</p>
                  <div className="flex items-center space-x-3">
                    <Badge variant="secondary" className="bg-meditation-primary/10 text-meditation-primary">
                      <Trophy className="h-3 w-3 mr-1" />
                      Level 1
                    </Badge>
                    <Badge variant="outline">
                      <Calendar className="h-3 w-3 mr-1" />
                      Joined Today
                    </Badge>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Quick Stats */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card className="border-meditation-primary/20">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Sessions</CardTitle>
                <BarChart3 className="h-4 w-4 text-meditation-primary" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-meditation-primary">23</div>
                <p className="text-xs text-muted-foreground">+2 from last week</p>
              </CardContent>
            </Card>

            <Card className="border-meditation-primary/20">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Time Meditated</CardTitle>
                <Clock className="h-4 w-4 text-meditation-primary" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-meditation-primary">4.2h</div>
                <p className="text-xs text-muted-foreground">This week</p>
              </CardContent>
            </Card>

            <Card className="border-meditation-primary/20">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Streak</CardTitle>
                <Target className="h-4 w-4 text-meditation-primary" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-meditation-primary">7 days</div>
                <p className="text-xs text-muted-foreground">Personal best!</p>
              </CardContent>
            </Card>

            <Card className="border-meditation-primary/20">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Focus Score</CardTitle>
                <TrendingUp className="h-4 w-4 text-meditation-primary" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-meditation-primary">85%</div>
                <p className="text-xs text-muted-foreground">+12% this month</p>
              </CardContent>
            </Card>
          </div>

          {/* Recent Activity */}
          <Card className="border-meditation-primary/20">
            <CardHeader>
              <CardTitle>Recent Activity</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center space-x-4">
                  <div className="w-2 h-2 bg-meditation-primary rounded-full"></div>
                  <div className="flex-1">
                    <p className="text-sm font-medium">Completed 10-minute breathing session</p>
                    <p className="text-xs text-muted-foreground">2 hours ago</p>
                  </div>
                  <Badge variant="secondary">+10 XP</Badge>
                </div>
                <Separator />
                <div className="flex items-center space-x-4">
                  <div className="w-2 h-2 bg-meditation-primary rounded-full"></div>
                  <div className="flex-1">
                    <p className="text-sm font-medium">Achieved 7-day meditation streak</p>
                    <p className="text-xs text-muted-foreground">Yesterday</p>
                  </div>
                  <Badge variant="secondary">+30 XP</Badge>
                </div>
                <Separator />
                <div className="flex items-center space-x-4">
                  <div className="w-2 h-2 bg-meditation-primary rounded-full"></div>
                  <div className="flex-1">
                    <p className="text-sm font-medium">Unlocked new meditation guide</p>
                    <p className="text-xs text-muted-foreground">3 days ago</p>
                  </div>
                  <Badge variant="secondary">Level Up!</Badge>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="stats" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card className="border-meditation-primary/20">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Sessions</CardTitle>
                <BarChart3 className="h-4 w-4 text-meditation-primary" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-meditation-primary">23</div>
                <p className="text-xs text-muted-foreground">+2 from last week</p>
              </CardContent>
            </Card>

            <Card className="border-meditation-primary/20">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Time Meditated</CardTitle>
                <Clock className="h-4 w-4 text-meditation-primary" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-meditation-primary">4.2h</div>
                <p className="text-xs text-muted-foreground">This week</p>
              </CardContent>
            </Card>

            <Card className="border-meditation-primary/20">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Streak</CardTitle>
                <Target className="h-4 w-4 text-meditation-primary" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-meditation-primary">7 days</div>
                <p className="text-xs text-muted-foreground">Personal best!</p>
              </CardContent>
            </Card>

            <Card className="border-meditation-primary/20">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Focus Score</CardTitle>
                <TrendingUp className="h-4 w-4 text-meditation-primary" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-meditation-primary">85%</div>
                <p className="text-xs text-muted-foreground">+12% this month</p>
              </CardContent>
            </Card>
          </div>

          <Card className="border-meditation-primary/20">
            <CardHeader>
              <CardTitle>Weekly Progress</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-64 flex items-center justify-center text-muted-foreground">
                Chart visualization coming soon...
              </div>
            </CardContent>
          </Card>

          <Card className="border-meditation-primary/20">
            <CardHeader>
              <CardTitle>Meditation History</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-sm">Today</span>
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 bg-meditation-primary rounded-full"></div>
                    <span className="text-sm text-muted-foreground">10 min breathing</span>
                  </div>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm">Yesterday</span>
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 bg-meditation-primary rounded-full"></div>
                    <span className="text-sm text-muted-foreground">15 min mindfulness</span>
                  </div>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm">2 days ago</span>
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 bg-meditation-primary rounded-full"></div>
                    <span className="text-sm text-muted-foreground">5 min quick session</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="rewards">
          <RewardSystem />
        </TabsContent>

        <TabsContent value="settings" className="space-y-6">
          <Card className="border-meditation-primary/20">
            <CardHeader>
              <CardTitle>Account Settings</CardTitle>
              <p className="text-muted-foreground">Manage your account preferences</p>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <h4 className="text-sm font-medium">Profile Information</h4>
                <Button variant="outline" className="w-full justify-start">
                  <User className="h-4 w-4 mr-2" />
                  Edit Profile
                </Button>
              </div>
              <Separator />
              <div className="space-y-2">
                <h4 className="text-sm font-medium">Preferences</h4>
                <div className="space-y-2">
                  <Button variant="outline" className="w-full justify-start">
                    <Settings className="h-4 w-4 mr-2" />
                    Notification Settings
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    <Clock className="h-4 w-4 mr-2" />
                    Session Reminders
                  </Button>
                </div>
              </div>
              <Separator />
              <div className="space-y-2">
                <h4 className="text-sm font-medium">Data & Privacy</h4>
                <Button variant="outline" className="w-full justify-start">
                  Export Data
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Profile;