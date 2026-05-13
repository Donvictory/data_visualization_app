import { onMounted, onUnmounted } from 'vue';
import { useDashboardStore } from '../stores/dashboard';
import { useSettingsStore } from '../stores/settings';

export function useDataStream() {
  const dashboard = useDashboardStore();
  const settings = useSettingsStore();
  let intervalId: number | null = null;

  const startStream = () => {
    if (intervalId) return;
    intervalId = window.setInterval(() => {
      dashboard.updateData();
    }, settings.refreshRate);
  };

  const stopStream = () => {
    if (intervalId) {
      clearInterval(intervalId);
      intervalId = null;
    }
  };

  onMounted(() => {
    startStream();
  });

  onUnmounted(() => {
    stopStream();
  });

  return {
    startStream,
    stopStream,
  };
}
