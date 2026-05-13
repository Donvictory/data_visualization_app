<script setup lang="ts">
import { computed } from 'vue';
import BaseChart from './BaseChart.vue';
import { useDashboardStore } from '../../stores/dashboard';
import { useSettingsStore } from '../../stores/settings';

const dashboard = useDashboardStore();
const settings = useSettingsStore();

const options = computed(() => {
  // Aggregate events by status
  const counts = {
    optimal: 0,
    delayed: 0,
    critical: 0,
    maintenance: 0,
    info: 0
  };
  
  dashboard.events.forEach(e => {
    if (counts.hasOwnProperty(e.status)) {
      counts[e.status as keyof typeof counts]++;
    }
  });

  return {
    backgroundColor: 'transparent',
    tooltip: { trigger: 'item' },
    grid: { left: '3%', right: '4%', bottom: '3%', containLabel: true },
    xAxis: {
      type: 'category',
      data: ['Optimal', 'Delayed', 'Alert', 'Maint.', 'Info'],
      axisLabel: { color: '#6b7280', fontSize: 10 }
    },
    yAxis: {
      type: 'value',
      splitLine: { lineStyle: { color: '#1f2937' } }
    },
    series: [
      {
        type: 'bar',
        data: [
          { value: counts.optimal, itemStyle: { color: '#10b981' } },
          { value: counts.delayed, itemStyle: { color: '#f59e0b' } },
          { value: counts.critical, itemStyle: { color: '#ef4444' } },
          { value: counts.maintenance, itemStyle: { color: '#6366f1' } },
          { value: counts.info, itemStyle: { color: '#94a3b8' } }
        ],
        barWidth: '60%',
        itemStyle: {
          borderRadius: [4, 4, 0, 0]
        }
      }
    ]
  };
});
</script>

<template>
  <div class="chart-card">
    <div class="chart-header">
      <h4>Status Distribution</h4>
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
