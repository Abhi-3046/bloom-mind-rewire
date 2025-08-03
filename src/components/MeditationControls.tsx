import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Play, Pause, Square } from 'lucide-react';
import { useRewardSystem } from "@/hooks/useRewardSystem";

interface MeditationControlsProps {
  onStart: () => void;
  onPause: () => void;
  onStop: () => void;
  isPlaying: boolean;
  duration: number;
  timeLeft: number;
  totalDuration: number;
}

const MeditationControls = ({ onStart, onPause, onStop, isPlaying, duration, timeLeft, totalDuration }: MeditationControlsProps) => {
  const { addMeditationXP } = useRewardSystem();
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const handleStop = () => {
    // Award XP if session was completed (timeLeft is 0) or mostly completed (>80%)
    const completionPercentage = ((totalDuration - timeLeft) / totalDuration) * 100;
    if (timeLeft === 0 || completionPercentage >= 80) {
      addMeditationXP();
    }
    onStop();
  };

  return (
    <div className="flex flex-col items-center space-y-6">
      {/* Timer Display */}
      <div className="text-3xl font-light text-meditation-primary tabular-nums">
        {formatTime(duration)}
      </div>
      
      {/* Control Buttons */}
      <div className="flex items-center space-x-4">
        <Button
          variant="outline"
          size="icon"
          onClick={handleStop}
          className="w-12 h-12 rounded-full border-meditation-primary/30 hover:border-meditation-primary hover:bg-meditation-primary/10"
        >
          <Square className="w-5 h-5" />
        </Button>
        
        <Button
          onClick={isPlaying ? onPause : onStart}
          className="w-16 h-16 rounded-full bg-gradient-primary hover:scale-105 transform transition-all duration-200 shadow-lg"
        >
          {isPlaying ? (
            <Pause className="w-6 h-6" />
          ) : (
            <Play className="w-6 h-6 ml-1" />
          )}
        </Button>
        
        <div className="w-12 h-12" /> {/* Spacer for symmetry */}
      </div>
      
      {/* Status Text */}
      <p className="text-meditation-primary/70 text-sm">
        {isPlaying ? 'Meditation in progress' : 'Ready to begin'}
      </p>
    </div>
  );
};

export default MeditationControls;