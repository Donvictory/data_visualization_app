<script setup lang="ts">
import { computed } from 'vue';
import BaseChart from './BaseChart.vue';
import { useDashboardStore } from '../../stores/dashboard';
import { useSettingsStore } from '../../stores/settings';

const dashboard = useDashboardStore();
const settings = useSettingsStore();

const options = computed(() => {
  const fleetData = dashboard.metrics.history.activeVehicles.map(p => [p.timestamp, p.value]);
  const successData = dashboard.metrics.history.deliverySuccess.map(p => [p.timestamp, p.value]);

  return {
    backgroundColor: 'transparent',
    tooltip: {
      trigger: 'axis',
      backgroundColor: 'rgba(17, 24, 39, 0.8)',
      borderColor: 'rgba(255, 255, 255, 0.1)',
      textStyle: { color: '#fff' },
      axisPointer: { type: 'cross' }
    },
    legend: {
      data: ['Active Fleet', 'Success Rate'],
      textStyle: { color: '#9ca3af' },
      top: 0
    },
    grid: {
      left: '3%',
      right: '4%',
      bottom: '3%',
      containLabel: true
    },
    xAxis: {
      type: 'time',
      boundaryGap: false,
      axisLine: { lineStyle: { color: '#374151' } },
      axisLabel: { color: '#6b7280' },
      splitLine: { show: false }
    },
    yAxis: [
      {
        type: 'value',
        name: 'Vehicles',
        axisLine: { lineStyle: { color: '#374151' } },
        axisLabel: { color: '#6b7280' },
        splitLine: { lineStyle: { color: '#1f2937' } }
      },
      {
        type: 'value',
        name: 'Success %',
        min: 0,
        max: 100,
        axisLine: { lineStyle: { color: '#374151' } },
        axisLabel: { color: '#6b7280' },
        splitLine: { show: false }
      }
    ],
    series: [
      {
        name: 'Active Fleet',
        type: 'line',
        showSymbol: false,
        data: fleetData,
        itemStyle: { color: '#00d4ff' },
        lineStyle: { width: 2 },
        areaStyle: {
          color: {
            type: 'linear',
            x: 0, y: 0, x2: 0, y2: 1,
            colorStops: [
              { offset: 0, color: 'rgba(0, 212, 255, 0.2)' },
              { offset: 1, color: 'rgba(0, 212, 255, 0)' }
            ]
          }
        }
      },
      {
        name: 'Success Rate',
        type: 'line',
        yAxisIndex: 1,
        showSymbol: false,
        data: successData,
        itemStyle: { color: '#10b981' },
        lineStyle: { width: 2, type: 'dashed' },
      }
    ]
  };
});
</script>

<template>
  <div class="chart-card">
    <div class="chart-header">
      <h4>Fleet Activity & Reliability</h4>
      <div class="header-actions">
        <span class="refresh-indicator"></span>
      </div>
    </div>
    <BaseChart :options="options" height="320px" :theme="settings.theme" />
  </div>
</template>


<style scoped>
.chart-card {
  background: var(--bg-card);
  border: 1px solid var(--border-color);
  border-radius: 12px;
  padding: 1.25rem;
  box-shadow: var(--card-shadow);
}

.chart-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
}

h4 {
  color: var(--text-secondary);
  font-size: 0.9rem;
  font-weight: 600;
  text-transform: uppercase;
}
</style>
