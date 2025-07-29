import { useState, useEffect } from 'react';

const MeditationAvatar = () => {
  const [isBreathing, setIsBreathing] = useState(true);

  return (
    <div className="relative flex items-center justify-center">
      {/* Breathing Circle Background */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className={`w-32 h-32 rounded-full bg-gradient-meditation border-2 border-meditation-primary/30 ${isBreathing ? 'breathing-pulse' : ''}`} />
      </div>
      
      {/* Main Avatar Circle */}
      <div className={`relative w-24 h-24 rounded-full bg-gradient-primary border-2 border-white/20 shadow-lg flex items-center justify-center ${isBreathing ? 'breathing-circle' : ''}`}>
        {/* Meditation Figure */}
        <div className="w-8 h-8 rounded-full bg-white/80 relative">
          {/* Simple meditation pose representation */}
          <div className="absolute -bottom-2 -left-1 w-2 h-3 bg-white/60 rounded-t-full transform -rotate-12" />
          <div className="absolute -bottom-2 -right-1 w-2 h-3 bg-white/60 rounded-t-full transform rotate-12" />
        </div>
      </div>
      
      {/* Breathing Guidance Text */}
      <div className="absolute -bottom-16 text-center">
        <p className="text-meditation-primary/80 text-sm font-medium">
          {isBreathing ? 'Breathe with the circle' : 'Focus on your breath'}
        </p>
      </div>
    </div>
  );
};

export default MeditationAvatar;