import { defineStore } from 'pinia';

export const useSettingsStore = defineStore('settings', {
  state: () => ({
    theme: 'light' as 'dark' | 'light',
    refreshRate: 1000,
    showAnimations: true,
    timeRange: 'live' as 'live' | '1m' | '5m' | '1h',
  }),

  actions: {
    setTheme(theme: 'dark' | 'light') {
      this.theme = theme;
      document.documentElement.setAttribute('data-theme', theme);
    },
    setTimeRange(range: 'live' | '1m' | '5m' | '1h') {
      this.timeRange = range;
    }
  },
});
