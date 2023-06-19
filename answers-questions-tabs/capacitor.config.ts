import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'io.ionic.starter',
  appName: 'answers-questions-tabs',
  webDir: 'dist',
  server: {
    androidScheme: 'https'
  }
};

export default config;
