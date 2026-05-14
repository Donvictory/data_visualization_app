<script setup lang="ts">
import { computed } from 'vue'
import BaseChart from './BaseChart.vue'
import { useDashboardStore } from '../../stores/dashboard'
import type { EChartsOption } from 'echarts'
import { useSettingsStore } from '@/stores/settings'

const dashboard = useDashboardStore()
const settings = useSettingsStore()

const options = computed<EChartsOption>(() => {
  const fleetData = dashboard.metrics.history.activeVehicles.map((p) => [p.timestamp, p.value])
  const successData = dashboard.metrics.history.deliverySuccess.map((p) => [p.timestamp, p.value])

  return {
    backgroundColor: 'transparent',
    tooltip: {
      trigger: 'axis',
      backgroundColor: 'rgba(17, 24, 39, 0.8)',
      borderColor: 'rgba(255, 255, 255, 0.1)',
      textStyle: { color: '#fff' },
      axisPointer: { type: 'cross' },
    },
    legend: {
      data: ['Active Fleet', 'Success Rate'],
      textStyle: { color: '#9ca3af', fontSize: 10 },
      top: 0,
      type: 'scroll',
      left: 'center',
    },
    grid: {
      left: 45,
      right: 20,
      bottom: 40,
      top: 40,
      containLabel: true,
    },

    xAxis: {
      type: 'time',
      boundaryGap: [0, 0],

      axisLine: { lineStyle: { color: '#374151' } },
      axisLabel: {
        color: '#6b7280',
        hideOverlap: true,
        fontSize: 10,
      },
      splitLine: { show: false },
    },
    yAxis: [
      {
        type: 'value',
        name: 'Vehicles',
        axisLine: { lineStyle: { color: '#374151' } },
        axisLabel: { color: '#6b7280' },
        splitLine: { lineStyle: { color: '#1f2937' } },
      },
      {
        type: 'value',
        name: 'Success %',
        min: 0,
        max: 100,
        axisLine: { lineStyle: { color: '#374151' } },
        axisLabel: { color: '#6b7280' },
        splitLine: { show: false },
      },
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
            x: 0,
            y: 0,
            x2: 0,
            y2: 1,
            colorStops: [
              { offset: 0, color: 'rgba(0, 212, 255, 0.2)' },
              { offset: 1, color: 'rgba(0, 212, 255, 0)' },
            ],
          },
        },
      },
      {
        name: 'Success Rate',
        type: 'line',
        yAxisIndex: 1,
        showSymbol: false,
        data: successData,
        itemStyle: { color: '#10b981' },
        lineStyle: { width: 2, type: 'dashed' },
      },
    ],
  }
})
</script>

<template>
  <div class="flex flex-col h-full w-full">
    <div class="flex justify-between items-center mb-4">
      <h4 class="text-[10px] md:text-xs font-medium text-text-secondary uppercase tracking-widest">
        Fleet Activity & Reliability
      </h4>

      <div class="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse"></div>
    </div>
    <div class="flex-grow min-h-0">
      <BaseChart :options="options" :theme="settings.theme" />
    </div>
  </div>
</template>

<style scoped></style>
