import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface MoodOption {
  emoji: string;
  label: string;
  value: string;
}

interface MoodSelectorProps {
  title: string;
  onMoodSelect: (mood: string) => void;
  onSkip?: () => void;
  className?: string;
}

const MoodSelector = ({ title, onMoodSelect, onSkip, className }: MoodSelectorProps) => {
  const [selectedMood, setSelectedMood] = useState<string>('');

  const moods: MoodOption[] = [
    { emoji: '😊', label: 'Happy', value: 'happy' },
    { emoji: '😌', label: 'Calm', value: 'calm' },
    { emoji: '😟', label: 'Anxious', value: 'anxious' },
    { emoji: '😢', label: 'Sad', value: 'sad' },
    { emoji: '😴', label: 'Tired', value: 'tired' },
    { emoji: '😤', label: 'Stressed', value: 'stressed' },
    { emoji: '🙂', label: 'Neutral', value: 'neutral' },
    { emoji: '😁', label: 'Excited', value: 'excited' }
  ];

  const handleMoodClick = (mood: string) => {
    setSelectedMood(mood);
  };

  const handleConfirm = () => {
    if (selectedMood) {
      onMoodSelect(selectedMood);
    }
  };

  return (
    <Card className={cn("p-6 bg-card/80 backdrop-blur-sm border-meditation-primary/20", className)}>
      <div className="text-center space-y-6">
        <h3 className="text-xl font-medium text-foreground">{title}</h3>
        
        {/* Mood Grid */}
        <div className="grid grid-cols-4 gap-4 max-w-md mx-auto">
          {moods.map((mood) => (
            <button
              key={mood.value}
              onClick={() => handleMoodClick(mood.value)}
              className={cn(
                "flex flex-col items-center p-3 rounded-lg transition-all duration-200 hover:scale-105",
                "border-2 border-transparent hover:border-meditation-primary/30",
                selectedMood === mood.value 
                  ? "border-meditation-primary bg-meditation-primary/10 scale-105" 
                  : "hover:bg-meditation-primary/5"
              )}
            >
              <span className="text-2xl mb-1">{mood.emoji}</span>
              <span className="text-xs text-muted-foreground">{mood.label}</span>
            </button>
          ))}
        </div>

        {/* Action Buttons */}
        <div className="flex gap-3 justify-center">
          {onSkip && (
            <Button 
              variant="ghost" 
              onClick={onSkip}
              className="text-muted-foreground hover:text-foreground"
            >
              Skip
            </Button>
          )}
          <Button 
            onClick={handleConfirm}
            disabled={!selectedMood}
            className="bg-meditation-primary hover:bg-meditation-primary/90 text-white min-w-24"
          >
            Continue
          </Button>
        </div>
      </div>
    </Card>
  );
};

export default MoodSelector;