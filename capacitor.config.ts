import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  "appId": "com.yourname.tempconverter",
  "appName": "TempConverter",
  "webDir": "build",
  "server": {
    "androidScheme": "https"
  },
  "plugins": {
    "LocalNotifications": {
      "smallIcon": "ic_stat_icon",
      "iconColor": "#488AFF"
    },
    "Geolocation": {
      "permissions": ["location"]
    }
  }
}

export default config;
