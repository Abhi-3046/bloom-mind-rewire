import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Play, Pause, RotateCcw } from "lucide-react";

const Breathing = () => {
  const [isActive, setIsActive] = useState(false);
  const [selectedPattern, setSelectedPattern] = useState("4-7-8");

  const patterns = [
    { name: "4-7-8", description: "Inhale 4, Hold 7, Exhale 8", duration: "Relaxation" },
    { name: "Box Breathing", description: "4-4-4-4 pattern", duration: "Focus" },
    { name: "Triangle", description: "Inhale 4, Hold 4, Exhale 4", duration: "Balance" },
    { name: "Quick Reset", description: "2-2-4 pattern", duration: "Energy" },
  ];

  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-3xl font-light text-foreground">Breathing</h1>
        <p className="text-muted-foreground mt-2">Focused breathing exercises for instant calm</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Breathing Visualizer */}
        <div className="space-y-6">
          <Card className="border-meditation-primary/20">
            <CardHeader>
              <CardTitle>Breathing Guide</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col items-center space-y-6">
              {/* Breathing Circle */}
              <div className="relative w-48 h-48 flex items-center justify-center">
                <div 
                  className={`w-32 h-32 rounded-full bg-gradient-to-br from-meditation-primary/30 to-meditation-secondary/30 border-2 border-meditation-primary/50 transition-all duration-4000 ${
                    isActive ? 'animate-breathe scale-150' : 'scale-100'
                  }`}
                />
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-meditation-primary font-medium">
                    {isActive ? "Breathe" : "Ready"}
                  </span>
                </div>
              </div>

              {/* Pattern Info */}
              <div className="text-center">
                <h3 className="font-medium text-meditation-primary">{selectedPattern}</h3>
                <p className="text-sm text-muted-foreground">
                  {patterns.find(p => p.name === selectedPattern)?.description}
                </p>
              </div>

              {/* Controls */}
              <div className="flex space-x-4">
                <Button
                  onClick={() => setIsActive(!isActive)}
                  variant={isActive ? "outline" : "default"}
                  className={isActive ? "border-meditation-primary text-meditation-primary" : "bg-meditation-primary hover:bg-meditation-primary/90"}
                >
                  {isActive ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
                  {isActive ? "Pause" : "Start"}
                </Button>
                <Button
                  onClick={() => setIsActive(false)}
                  variant="outline"
                  className="border-meditation-primary/30 text-meditation-primary"
                >
                  <RotateCcw className="h-4 w-4" />
                  Reset
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Pattern Selection */}
        <div className="space-y-6">
          <Card className="border-meditation-primary/20">
            <CardHeader>
              <CardTitle>Breathing Patterns</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {patterns.map((pattern) => (
                <div
                  key={pattern.name}
                  onClick={() => setSelectedPattern(pattern.name)}
                  className={`p-4 rounded-lg border-2 cursor-pointer transition-all ${
                    selectedPattern === pattern.name
                      ? "border-meditation-primary bg-meditation-primary/10"
                      : "border-border/20 hover:border-meditation-primary/50"
                  }`}
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-medium text-foreground">{pattern.name}</h3>
                      <p className="text-sm text-muted-foreground">{pattern.description}</p>
                    </div>
                    <span className="text-xs bg-meditation-primary/20 text-meditation-primary px-2 py-1 rounded">
                      {pattern.duration}
                    </span>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          <Card className="border-meditation-primary/20">
            <CardHeader>
              <CardTitle>Quick Tips</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="text-sm space-y-2">
                <p>• Find a comfortable position</p>
                <p>• Focus on slow, deep breaths</p>
                <p>• Let thoughts pass without judgment</p>
                <p>• Start with 2-3 minutes daily</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Breathing;