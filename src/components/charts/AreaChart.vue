<script setup lang="ts">
import { computed } from 'vue'
import BaseChart from './BaseChart.vue'
import { useDashboardStore } from '../../stores/dashboard'
import type { EChartsOption } from 'echarts'
import { useSettingsStore } from '@/stores/settings'

const dashboard = useDashboardStore()
const settings = useSettingsStore()

const options = computed<EChartsOption>(() => {
  const fuelData = dashboard.metrics.history.fuelEfficiency.map((p) => [p.timestamp, p.value])

  const transitData = dashboard.metrics.history.avgTransitTime.map((p) => [p.timestamp, p.value])

  return {
    backgroundColor: 'transparent',
    tooltip: { trigger: 'axis' },
    legend: {
      data: ['Fuel (MPG)', 'Transit (Hrs)'],
      textStyle: { color: '#9ca3af', fontSize: 10 },
      bottom: 0,
      type: 'scroll',
      left: 'center',
    },
    grid: { left: 45, right: 20, bottom: 60, top: 20, containLabel: true },

    xAxis: {
      type: 'time',
      boundaryGap: [0, 0],
      splitLine: { show: false },
      axisLabel: { color: '#6b7280', fontSize: 10, hideOverlap: true },
    },

    yAxis: { type: 'value', splitLine: { lineStyle: { color: '#1f2937' } } },
    series: [
      {
        name: 'Fuel (MPG)',
        type: 'line',
        smooth: true,
        showSymbol: false,
        areaStyle: { opacity: 0.2 },
        data: fuelData,
        itemStyle: { color: '#f59e0b' },
      },
      {
        name: 'Transit (Hrs)',
        type: 'line',
        smooth: true,
        showSymbol: false,
        areaStyle: { opacity: 0.2 },
        data: transitData,
        itemStyle: { color: '#8b5cf6' },
      },
    ],
  }
})
</script>

<template>
  <div class="flex flex-col h-full w-full">
    <div class="flex justify-between items-center mb-4">
      <h4 class="text-[10px] md:text-xs font-medium text-text-secondary uppercase tracking-widest">
        Efficiency Metrics
      </h4>
    </div>

    <div class="flex-grow min-h-0">
      <BaseChart :options="options" :theme="settings.theme" />
    </div>
  </div>
</template>

<style scoped>
</style>

