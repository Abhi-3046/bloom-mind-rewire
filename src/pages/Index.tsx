import { useState, useEffect } from 'react';
import MeditationAvatar from '@/components/MeditationAvatar';
import MeditationControls from '@/components/MeditationControls';
import SessionSelector from '@/components/SessionSelector';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import heroImage from '@/assets/meditation-hero.jpg';

const Index = () => {
  const [currentView, setCurrentView] = useState<'home' | 'session' | 'meditation'>('home');
  const [selectedSession, setSelectedSession] = useState<string>('');
  const [isPlaying, setIsPlaying] = useState(false);
  const [duration, setDuration] = useState(600); // 10 minutes default
  const [timeLeft, setTimeLeft] = useState(duration);

  // Timer logic
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isPlaying && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            setIsPlaying(false);
            return duration; // Reset
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isPlaying, timeLeft, duration]);

  const handleSessionSelect = (sessionId: string) => {
    setSelectedSession(sessionId);
    setCurrentView('meditation');
    
    // Set duration based on session
    const durations: Record<string, number> = {
      focus: 600,     // 10 min
      recharge: 300,  // 5 min
      sleep: 1200,    // 20 min
      rewire: 900     // 15 min
    };
    
    const newDuration = durations[sessionId] || 600;
    setDuration(newDuration);
    setTimeLeft(newDuration);
  };

  const handleStart = () => setIsPlaying(true);
  const handlePause = () => setIsPlaying(false);
  const handleStop = () => {
    setIsPlaying(false);
    setTimeLeft(duration);
  };

  const handleBack = () => {
    setCurrentView('home');
    setIsPlaying(false);
    setTimeLeft(duration);
  };

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-20"
        style={{ backgroundImage: `url(${heroImage})` }}
      />
      
      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-meditation" />
      
      {/* Content */}
      <div className="relative z-10 min-h-screen flex flex-col">
        {currentView === 'home' && (
          <div className="flex-1 flex flex-col items-center justify-center p-6 space-y-12">
            {/* Header */}
            <div className="text-center space-y-4 animate-fade-in">
              <h1 className="text-5xl md:text-6xl font-light text-foreground">
                Neuro<span className="text-meditation-primary font-medium">Bloom</span>
              </h1>
              <p className="text-lg text-muted-foreground max-w-md">
                Guided meditation for neural rewiring and mindful living
              </p>
            </div>

            {/* Session Selection */}
            <div className="w-full max-w-4xl animate-fade-in">
              <h2 className="text-2xl font-light text-center mb-8 text-foreground">
                Choose Your Journey
              </h2>
              <SessionSelector onSessionSelect={handleSessionSelect} />
            </div>

            {/* Quick Start */}
            <div className="text-center animate-fade-in">
              <p className="text-sm text-muted-foreground mb-4">
                Or start with a quick 5-minute session
              </p>
              <Button 
                onClick={() => handleSessionSelect('recharge')}
                variant="outline"
                className="border-meditation-primary/30 text-meditation-primary hover:bg-meditation-primary/10"
              >
                Quick Start
              </Button>
            </div>
          </div>
        )}

        {currentView === 'meditation' && (
          <div className="flex-1 flex flex-col items-center justify-center p-6 space-y-12">
            {/* Back Button */}
            <div className="absolute top-6 left-6">
              <Button
                variant="ghost"
                onClick={handleBack}
                className="text-meditation-primary hover:bg-meditation-primary/10"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back
              </Button>
            </div>

            {/* Session Title */}
            <div className="text-center animate-fade-in">
              <h2 className="text-3xl font-light text-foreground capitalize">
                {selectedSession.replace(/([A-Z])/g, ' $1').trim()}
              </h2>
              <p className="text-muted-foreground mt-2">
                Find your center and breathe
              </p>
            </div>

            {/* Meditation Avatar */}
            <div className="animate-fade-in">
              <MeditationAvatar />
            </div>

            {/* Controls */}
            <div className="animate-fade-in">
              <MeditationControls
                onStart={handleStart}
                onPause={handlePause}
                onStop={handleStop}
                isPlaying={isPlaying}
                duration={timeLeft}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Index;
