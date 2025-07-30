import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Brain, MessageCircle, Sparkles } from "lucide-react";
import ChatInterface from "@/components/ChatInterface";

const AIGuide = () => {
  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-3xl font-light text-foreground">AI Guide</h1>
        <p className="text-muted-foreground mt-2">Personalized meditation guidance powered by AI</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="border-meditation-primary/20">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Brain className="h-5 w-5 text-meditation-primary mr-2" />
              Neural Insights
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-sm text-muted-foreground">
              Based on your meditation patterns, our AI has identified areas for improvement:
            </p>
            <div className="space-y-2">
              <div className="p-3 bg-meditation-primary/5 rounded-lg">
                <p className="text-sm">
                  💡 Try focusing on breath awareness during morning sessions
                </p>
              </div>
              <div className="p-3 bg-meditation-primary/5 rounded-lg">
                <p className="text-sm">
                  🎯 Your evening sessions show better focus - consider longer durations
                </p>
              </div>
            </div>
            <Button variant="outline" className="w-full border-meditation-primary/30 text-meditation-primary">
              Get More Insights
            </Button>
          </CardContent>
        </Card>

        <Card className="border-meditation-primary/20">
          <CardHeader>
            <CardTitle className="flex items-center">
              <MessageCircle className="h-5 w-5 text-meditation-primary mr-2" />
              Chat with AI
            </CardTitle>
          </CardHeader>
          <ChatInterface />
        </Card>
      </div>

      <Card className="border-meditation-primary/20">
        <CardHeader>
          <CardTitle className="flex items-center">
            <Sparkles className="h-5 w-5 text-meditation-primary mr-2" />
            Personalized Recommendations
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 bg-meditation-primary/5 rounded-lg text-center">
              <h3 className="font-medium text-meditation-primary">Morning Routine</h3>
              <p className="text-sm text-muted-foreground mt-2">
                5-minute energizing breath work
              </p>
            </div>
            <div className="p-4 bg-meditation-primary/5 rounded-lg text-center">
              <h3 className="font-medium text-meditation-primary">Midday Reset</h3>
              <p className="text-sm text-muted-foreground mt-2">
                Quick stress release technique
              </p>
            </div>
            <div className="p-4 bg-meditation-primary/5 rounded-lg text-center">
              <h3 className="font-medium text-meditation-primary">Evening Wind-down</h3>
              <p className="text-sm text-muted-foreground mt-2">
                15-minute sleep preparation
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AIGuide;