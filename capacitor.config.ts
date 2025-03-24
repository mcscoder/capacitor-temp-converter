import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  "appId": "com.yourname.temperatureconverter",
  "appName": "Temperature Converter",
  "webDir": "build",
  "plugins": {
    "LocalNotifications": {
      "smallIcon": "ic_stat_icon_config_sample",
      "iconColor": "#488AFF",
      "sound": "beep.wav"
    },
    "Geolocation": {
      "permissions": ["location"]
    }
  }
}

export default config;
