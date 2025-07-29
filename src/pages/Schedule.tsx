import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar, Clock, Plus, Bell } from "lucide-react";

const Schedule = () => {
  const [selectedDay, setSelectedDay] = useState(new Date().getDay());

  const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const scheduledSessions = [
    {
      id: 1,
      time: "07:00",
      title: "Morning Mindfulness",
      duration: "10 min",
      type: "Focus",
      enabled: true
    },
    {
      id: 2,
      time: "12:30",
      title: "Midday Reset",
      duration: "5 min",
      type: "Breathing",
      enabled: true
    },
    {
      id: 3,
      time: "18:00",
      title: "Stress Relief",
      duration: "15 min",
      type: "Guided",
      enabled: false
    },
    {
      id: 4,
      time: "22:00",
      title: "Sleep Preparation",
      duration: "20 min",
      type: "Sleep",
      enabled: true
    }
  ];

  const upcomingSessions = [
    { time: "Today, 6:00 PM", title: "Stress Relief", duration: "15 min" },
    { time: "Today, 10:00 PM", title: "Sleep Preparation", duration: "20 min" },
    { time: "Tomorrow, 7:00 AM", title: "Morning Mindfulness", duration: "10 min" }
  ];

  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-3xl font-light text-foreground">Schedule</h1>
        <p className="text-muted-foreground mt-2">Plan your meditation practice</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Calendar View */}
        <div className="space-y-6">
          <Card className="border-meditation-primary/20">
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span className="flex items-center">
                  <Calendar className="h-5 w-5 text-meditation-primary mr-2" />
                  Weekly Schedule
                </span>
                <Button
                  variant="outline"
                  size="sm"
                  className="border-meditation-primary/30 text-meditation-primary"
                >
                  <Plus className="h-4 w-4 mr-1" />
                  Add Session
                </Button>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Day Selector */}
              <div className="flex space-x-1">
                {days.map((day, index) => (
                  <button
                    key={day}
                    onClick={() => setSelectedDay(index)}
                    className={`flex-1 py-2 px-3 rounded text-sm font-medium transition-colors ${
                      selectedDay === index
                        ? "bg-meditation-primary text-white"
                        : "text-muted-foreground hover:text-meditation-primary hover:bg-meditation-primary/10"
                    }`}
                  >
                    {day}
                  </button>
                ))}
              </div>

              {/* Sessions for Selected Day */}
              <div className="space-y-3">
                {scheduledSessions.map((session) => (
                  <div
                    key={session.id}
                    className={`p-3 rounded-lg border-2 transition-all ${
                      session.enabled
                        ? "border-meditation-primary/30 bg-meditation-primary/5"
                        : "border-border/20 bg-muted/20"
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <div className={`w-3 h-3 rounded-full ${
                          session.enabled ? "bg-meditation-primary" : "bg-muted-foreground"
                        }`} />
                        <div>
                          <div className="flex items-center space-x-2">
                            <span className="font-medium text-foreground">{session.time}</span>
                            <span className="text-xs bg-meditation-primary/20 text-meditation-primary px-2 py-1 rounded">
                              {session.type}
                            </span>
                          </div>
                          <p className="text-sm text-muted-foreground">{session.title}</p>
                        </div>
                      </div>
                      <div className="text-sm text-muted-foreground">
                        {session.duration}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Upcoming Sessions */}
        <div className="space-y-6">
          <Card className="border-meditation-primary/20">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Bell className="h-5 w-5 text-meditation-primary mr-2" />
                Upcoming Sessions
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {upcomingSessions.map((session, index) => (
                <div
                  key={index}
                  className="p-4 bg-meditation-primary/5 rounded-lg border border-meditation-primary/20"
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium text-foreground">{session.title}</p>
                      <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                        <Clock className="h-3 w-3" />
                        <span>{session.time}</span>
                        <span>•</span>
                        <span>{session.duration}</span>
                      </div>
                    </div>
                    <Button
                      variant="outline"
                      size="sm"
                      className="border-meditation-primary/30 text-meditation-primary"
                    >
                      Start Now
                    </Button>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          <Card className="border-meditation-primary/20">
            <CardHeader>
              <CardTitle>Meditation Streaks</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center p-4 bg-meditation-primary/5 rounded-lg">
                  <div className="text-2xl font-bold text-meditation-primary">7</div>
                  <div className="text-sm text-muted-foreground">Current Streak</div>
                </div>
                <div className="text-center p-4 bg-meditation-primary/5 rounded-lg">
                  <div className="text-2xl font-bold text-meditation-primary">21</div>
                  <div className="text-sm text-muted-foreground">Best Streak</div>
                </div>
              </div>
              
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Weekly Goal</span>
                  <span className="text-meditation-primary">5/7 sessions</span>
                </div>
                <div className="w-full bg-muted/20 rounded-full h-2">
                  <div className="bg-meditation-primary h-2 rounded-full" style={{ width: "71%" }} />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Schedule;