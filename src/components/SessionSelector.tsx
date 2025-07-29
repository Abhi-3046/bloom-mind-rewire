import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Sun, Moon, Zap, Bed } from 'lucide-react';

interface SessionType {
  id: string;
  title: string;
  subtitle: string;
  duration: string;
  icon: React.ReactNode;
  gradient: string;
}

interface SessionSelectorProps {
  onSessionSelect: (sessionId: string) => void;
}

const SessionSelector = ({ onSessionSelect }: SessionSelectorProps) => {
  const sessions: SessionType[] = [
    {
      id: 'focus',
      title: 'Focus & Clarity',
      subtitle: 'Sharpen your mind',
      duration: '10 min',
      icon: <Sun className="w-6 h-6" />,
      gradient: 'bg-gradient-primary'
    },
    {
      id: 'recharge',
      title: 'Recharge Energy',
      subtitle: 'Boost your vitality',
      duration: '5 min',
      icon: <Zap className="w-6 h-6" />,
      gradient: 'bg-gradient-secondary'
    },
    {
      id: 'sleep',
      title: 'Deep Sleep',
      subtitle: 'Prepare for rest',
      duration: '20 min',
      icon: <Moon className="w-6 h-6" />,
      gradient: 'bg-gradient-primary'
    },
    {
      id: 'rewire',
      title: 'Neural Rewiring',
      subtitle: 'Transform thought patterns',
      duration: '15 min',
      icon: <Bed className="w-6 h-6" />,
      gradient: 'bg-gradient-secondary'
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-2xl mx-auto">
      {sessions.map((session) => (
        <Card 
          key={session.id}
          className="p-6 cursor-pointer transition-all duration-300 hover:scale-105 hover:shadow-lg border-meditation-primary/20 bg-card/80 backdrop-blur-sm"
          onClick={() => onSessionSelect(session.id)}
        >
          <div className="flex items-center space-x-4">
            <div className={`w-12 h-12 rounded-full ${session.gradient} flex items-center justify-center text-white`}>
              {session.icon}
            </div>
            <div className="flex-1">
              <h3 className="font-semibold text-foreground">{session.title}</h3>
              <p className="text-sm text-muted-foreground">{session.subtitle}</p>
            </div>
            <div className="text-right">
              <span className="text-sm font-medium text-meditation-primary">{session.duration}</span>
            </div>
          </div>
        </Card>
      ))}
    </div>
  );
};

export default SessionSelector;