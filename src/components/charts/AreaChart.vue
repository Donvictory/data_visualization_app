<script setup lang="ts">
import { computed } from 'vue';
import BaseChart from './BaseChart.vue';
import { useDashboardStore } from '../../stores/dashboard';
import { useSettingsStore } from '../../stores/settings';

const dashboard = useDashboardStore();
const settings = useSettingsStore();

const options = computed(() => {
  const fuelData = dashboard.metrics.history.fuelEfficiency.map(p => [p.timestamp, p.value]);
  const transitData = dashboard.metrics.history.avgTransitTime.map(p => [p.timestamp, p.value]);

  return {
    backgroundColor: 'transparent',
    tooltip: { trigger: 'axis' },
    legend: {
      data: ['Fuel (MPG)', 'Transit (Hrs)'],
      textStyle: { color: '#9ca3af' },
      bottom: 0
    },
    grid: { left: '3%', right: '4%', bottom: '15%', containLabel: true },
    xAxis: { type: 'time', splitLine: { show: false } },
    yAxis: { type: 'value', splitLine: { lineStyle: { color: '#1f2937' } } },
    series: [
      {
        name: 'Fuel (MPG)',
        type: 'line',
        smooth: true,
        showSymbol: false,
        areaStyle: { opacity: 0.2 },
        data: fuelData,
        itemStyle: { color: '#f59e0b' }
      },
      {
        name: 'Transit (Hrs)',
        type: 'line',
        smooth: true,
        showSymbol: false,
        areaStyle: { opacity: 0.2 },
        data: transitData,
        itemStyle: { color: '#8b5cf6' }
      }
    ]
  };
});
</script>

<template>
  <div class="chart-card">
    <div class="chart-header">
      <h4>Efficiency & Transit Trends</h4>
    </div>
    <BaseChart :options="options" height="280px" :theme="settings.theme" />
  </div>
</template>


<style scoped>
.chart-card {
  background: var(--bg-card);
  border: 1px solid var(--border-color);
  border-radius: 12px;
  padding: 1.25rem;
}
.chart-header h4 {
  color: var(--text-secondary);
  font-size: 0.9rem;
  margin-bottom: 1rem;
}
</style>
