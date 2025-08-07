import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'app.lovable.cec2f17965af4d03b381b34c93309892',
  appName: 'bloom-mind-rewire',
  webDir: 'dist',
  server: {
    url: 'https://cec2f179-65af-4d03-b381-b34c93309892.lovableproject.com?forceHideBadge=true',
    cleartext: true
  },
  android: {
    allowMixedContent: true
  }
};

export default config;