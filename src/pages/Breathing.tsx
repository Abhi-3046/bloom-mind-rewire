import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { Play, Pause, RotateCcw, ChevronDown, ChevronUp, AlertTriangle } from "lucide-react";

const Breathing = () => {
  const [isActive, setIsActive] = useState(false);
  const [selectedPattern, setSelectedPattern] = useState("4-7-8");
  const [isGuidanceOpen, setIsGuidanceOpen] = useState(false);

  const patterns = [
    { 
      name: "4-7-8", 
      description: "Inhale 4, Hold 7, Exhale 8", 
      duration: "Relaxation",
      purpose: "Rapid downshift for anxiety, pre-sleep, or arousal spikes. Lengthened exhale stimulates parasympathetic activity and relaxes the upper chest.",
      voiceScript: "Find a comfortable position. Spine tall, shoulders soft. Seal your lips lightly. Inhale through your nose for 4… [1…2…3…4]. Hold your breath for 7… [1…2…3…4…5…6…7]. Exhale through pursed lips with a gentle whoosh for 8… [1…2…3…4…5…6…7…8]. That's one cycle. Again. Inhale 4… Hold 7… Exhale 8. Repeat for 4 cycles. Final breath: let the exhale be slow, easy, complete. Release the technique. Breathe normally.",
      tips: "Use a quiet 'whoosh' to keep the exhale long without strain. If dizzy, scale to 3–5–6 or 4–4–6 for a week, then build up. Best used evening or any time you feel 'wired.'"
    },
    { 
      name: "Box Breathing", 
      description: "4-4-4-4 pattern", 
      duration: "Focus",
      purpose: "Smooths breath rhythm and steadies attention—great before studying, meetings, or a competitive attempt.",
      voiceScript: "Sit upright, chin level, hands relaxed. Inhale through your nose for 4… [1…2…3…4]. Hold for 4… [1…2…3…4]. Exhale through your nose for 4… [1…2…3…4]. Hold for 4… [1…2…3…4]. That's one box. Trace the box again—Inhale 4, Hold 4, Exhale 4, Hold 4. Complete 4 to 6 boxes at a calm pace. Soften your shoulders. Unclench the jaw. Finish with one easy inhale… and a gentle exhale.",
      tips: "Imagine drawing a square with your breath: up, across, down, across. If holds feel tense, reduce to 3–3–3–3 or skip the top/bottom holds for a round. Maintain nasal breathing for quieter, calmer airflow."
    },
    { 
      name: "Triangle", 
      description: "Inhale 4, Hold 4, Exhale 6", 
      duration: "Balance",
      purpose: "Focus + calm in one pattern. The slightly longer exhale offers a gentle relaxation tilt without sleepiness.",
      voiceScript: "Visualize a triangle. Inhale gently up the first side for 4… [1…2…3…4]. Hold across the top for 4… [1…2…3…4]. Exhale down the long side for 6… [1…2…3…4…5…6]. That's one triangle. Again—Inhale 4, Hold 4, Exhale 6. Keep the exhale silky and unforced. Repeat for 5 cycles. On the last round, lengthen the exhale if comfortable. Return to an easy, natural breath.",
      tips: "If the hold triggers tension, use an open triangle: In 4 — Out 6 — Rest 2. Keep ribs expanding low and wide; avoid lifting the shoulders. Perfect between sets or before a demanding task."
    },
    { 
      name: "Quick Reset", 
      description: "Physiological Sigh", 
      duration: "Energy",
      purpose: "Fast relief from chest tightness and mental tunnel vision; ideal mid-task, between rounds, or after a stressful moment.",
      voiceScript: "Stand or sit tall. Eyes soft, jaw unclenched. Take a normal inhale through the nose. Add a quick second sip-in at the top—just enough to gently stretch the lungs. Now slow, long exhale through the mouth—like fogging a mirror—until empty. That's one reset. Repeat 1 to 3 times: Inhale… small top-up… long, slow exhale. Feel the chest soften. Vision widens. Mind clears. Resume natural breathing.",
      tips: "Keep the second sip small; don't gasp. Make the exhale longer than the inhale. Great paired with a physical posture reset: roll shoulders down and back."
    },
    { 
      name: "Wim Hof", 
      description: "30 breaths + holds (3 rounds)", 
      duration: "Advanced",
      purpose: "Trains breath awareness and CO₂ tolerance; many report increased energy and resilience. The hold on empty heightens calm and focus afterwards.",
      voiceScript: "Lie down or sit supported. Body safe and still. We begin Round One— Thirty breaths at a relaxed but full rhythm: Inhale deeply through the nose or mouth—belly, ribs, chest. Exhale without force—just let go. Like waves: In—let go. In—let go. I'll count a few: 1… 2… 3… 4… keep flowing to 30. On the final breath, inhale fully… then exhale to a comfortable empty… Now hold on empty. Stay relaxed. If you feel strong urges to breathe, a warm buzz, or tingles—that can be normal. Hold until your body asks for air. When ready: Big inhale, fill completely… Hold for 15 seconds… and release. That completes round one. Repeat for 2 or 3 rounds in total. After the final round, breathe normally and rest.",
      tips: "Keep the 30 breaths deep but unforced—full in, relaxed out. Stop if you feel unwell, dizzy, or anxious. New to this? Start with 20 breaths × 2 rounds, then progress.",
      safety: "⚠️ SAFETY FIRST: Do not practice while driving, standing, or in/near water. Sit or lie down. Avoid if pregnant or with significant cardiovascular/neurological issues. If unsure, consult a clinician."
    },
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

      {/* Detailed Guidance Section */}
      <Card className="border-meditation-primary/20">
        <Collapsible open={isGuidanceOpen} onOpenChange={setIsGuidanceOpen}>
          <CollapsibleTrigger asChild>
            <CardHeader className="cursor-pointer hover:bg-meditation-primary/5 transition-colors">
              <div className="flex items-center justify-between">
                <CardTitle className="text-meditation-primary">
                  Detailed Guidance for {selectedPattern}
                </CardTitle>
                {isGuidanceOpen ? 
                  <ChevronUp className="h-5 w-5 text-meditation-primary" /> : 
                  <ChevronDown className="h-5 w-5 text-meditation-primary" />
                }
              </div>
            </CardHeader>
          </CollapsibleTrigger>
          <CollapsibleContent>
            <CardContent className="space-y-6 pt-0">
              {(() => {
                const currentPattern = patterns.find(p => p.name === selectedPattern);
                if (!currentPattern) return null;

                return (
                  <>
                    {/* Safety Warning for Wim Hof */}
                    {currentPattern.safety && (
                      <div className="bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-800 rounded-lg p-4">
                        <div className="flex items-start space-x-3">
                          <AlertTriangle className="h-5 w-5 text-amber-600 dark:text-amber-400 mt-0.5 flex-shrink-0" />
                          <div>
                            <h4 className="font-medium text-amber-800 dark:text-amber-200 mb-2">Safety Guidelines</h4>
                            <p className="text-sm text-amber-700 dark:text-amber-300">{currentPattern.safety}</p>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Purpose */}
                    <div className="space-y-3">
                      <h3 className="font-semibold text-foreground flex items-center">
                        <span className="w-2 h-2 bg-meditation-primary rounded-full mr-3"></span>
                        Purpose
                      </h3>
                      <p className="text-muted-foreground leading-relaxed">{currentPattern.purpose}</p>
                    </div>

                    {/* Voice Script */}
                    <div className="space-y-3">
                      <h3 className="font-semibold text-foreground flex items-center">
                        <span className="w-2 h-2 bg-meditation-primary rounded-full mr-3"></span>
                        Guided Instructions
                      </h3>
                      <div className="bg-meditation-primary/5 rounded-lg p-4 border border-meditation-primary/20">
                        <p className="text-foreground leading-relaxed italic">{currentPattern.voiceScript}</p>
                      </div>
                    </div>

                    {/* Tips */}
                    <div className="space-y-3">
                      <h3 className="font-semibold text-foreground flex items-center">
                        <span className="w-2 h-2 bg-meditation-primary rounded-full mr-3"></span>
                        Pro Tips
                      </h3>
                      <p className="text-muted-foreground leading-relaxed">{currentPattern.tips}</p>
                    </div>

                    {/* Universal Tips */}
                    <div className="space-y-3">
                      <h3 className="font-semibold text-foreground flex items-center">
                        <span className="w-2 h-2 bg-meditation-primary rounded-full mr-3"></span>
                        Universal Technique Tips
                      </h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-muted-foreground">
                        <div className="space-y-2">
                          <p><strong>Posture:</strong> Tall spine, soft shoulders, tongue resting on the roof of the mouth</p>
                          <p><strong>Low & Wide:</strong> Let the belly and lower ribs expand; keep neck and traps quiet</p>
                        </div>
                        <div className="space-y-2">
                          <p><strong>Pace:</strong> If you feel strain, shorten counts or take an easy nose-breath break</p>
                          <p><strong>Environment:</strong> Quiet space, dim light, minimal distractions</p>
                        </div>
                      </div>
                    </div>
                  </>
                );
              })()}
            </CardContent>
          </CollapsibleContent>
        </Collapsible>
      </Card>
    </div>
  );
};

export default Breathing;