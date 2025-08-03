import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart3, Clock, Target, TrendingUp } from "lucide-react";
import RewardSystem from "@/components/RewardSystem";

const Stats = () => {
  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-3xl font-light text-foreground">Stats</h1>
        <p className="text-muted-foreground mt-2">Track your meditation progress</p>
      </div>

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

      <RewardSystem />

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
    </div>
  );
};

export default Stats;