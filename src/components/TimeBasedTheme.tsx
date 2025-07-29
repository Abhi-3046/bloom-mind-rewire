import { useEffect, useState } from 'react';

const TimeBasedTheme = ({ children }: { children: React.ReactNode }) => {
  const [isDaytime, setIsDaytime] = useState(true);

  useEffect(() => {
    const updateTheme = () => {
      const hour = new Date().getHours();
      const isDay = hour >= 6 && hour < 20; // 6 AM to 8 PM is daytime
      setIsDaytime(isDay);
      
      // Apply theme to document
      if (isDay) {
        document.documentElement.classList.remove('dark');
      } else {
        document.documentElement.classList.add('dark');
      }
    };

    // Update immediately
    updateTheme();
    
    // Update every minute to catch theme changes
    const interval = setInterval(updateTheme, 60000);
    
    return () => clearInterval(interval);
  }, []);

  return <>{children}</>;
};

export default TimeBasedTheme;