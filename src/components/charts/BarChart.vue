<script setup lang="ts">
import { computed } from 'vue'
import BaseChart from './BaseChart.vue'
import { useDashboardStore } from '../../stores/dashboard'
import type { EChartsOption } from 'echarts'
import { useSettingsStore } from '@/stores/settings'

const dashboard = useDashboardStore()
const settings = useSettingsStore()

const options = computed<EChartsOption>(() => {
  const counts = {
    optimal: 0,
    delayed: 0,
    critical: 0,
    maintenance: 0,
    info: 0,
  }

  dashboard.events.forEach((e) => {
    if (counts.hasOwnProperty(e.status)) {
      counts[e.status as keyof typeof counts]++
    }
  })

  return {
    backgroundColor: 'transparent',
    tooltip: { trigger: 'item' },
    grid: { left: '5%', right: '5%', bottom: '15%', containLabel: true },
    xAxis: {
      type: 'category',
      data: ['Optimal', 'Delayed', 'Alert', 'Maint.', 'Info'],
      axisLabel: { color: '#6b7280', fontSize: 10, hideOverlap: true },
    },
    yAxis: {
      type: 'value',
      splitLine: { lineStyle: { color: '#1f2937' } },
    },
    series: [
      {
        type: 'bar',
        data: [
          { value: counts.optimal, itemStyle: { color: '#10b981' } },
          { value: counts.delayed, itemStyle: { color: '#f59e0b' } },
          { value: counts.critical, itemStyle: { color: '#ef4444' } },
          { value: counts.maintenance, itemStyle: { color: '#8b5cf6' } },
          { value: counts.info, itemStyle: { color: '#6b7280' } },
        ],
        barWidth: '60%',
        itemStyle: {
          borderRadius: [4, 4, 0, 0],
        },
      },
    ],
  }
})
</script>

<template>
  <div class="flex flex-col h-full w-full">
    <div class="flex justify-between items-center mb-4">
      <h4 class="text-[10px] md:text-xs font-medium text-text-secondary uppercase tracking-widest">
        Event Distribution
      </h4>
    </div>

    <div class="flex-grow min-h-0">
      <BaseChart :options="options" :theme="settings.theme" />
    </div>
  </div>
</template>

<style scoped>
/* Pure Tailwind used */
</style>
