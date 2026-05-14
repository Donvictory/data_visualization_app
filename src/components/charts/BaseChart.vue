<script setup lang="ts">
import { use } from 'echarts/core';
import { CanvasRenderer } from 'echarts/renderers';
import { LineChart, BarChart, PieChart, HeatmapChart } from 'echarts/charts';
import {
  GridComponent,
  TooltipComponent,
  LegendComponent,
  TitleComponent,
  VisualMapComponent,
  DataZoomComponent
} from 'echarts/components';
import VChart from 'vue-echarts';

// Register ECharts modules
use([
  CanvasRenderer,
  LineChart,
  BarChart,
  PieChart,
  HeatmapChart,
  GridComponent,
  TooltipComponent,
  LegendComponent,
  TitleComponent,
  VisualMapComponent,
  DataZoomComponent
]);

defineProps<{
  options: any;
  theme?: string;
}>();
</script>

<template>
  <div class="w-full h-full min-h-inherit relative">
    <v-chart 
      :option="options" 
      :theme="theme" 

      autoresize 
      class="w-full h-full"
    />
  </div>
</template>

<style scoped>
/* Pure Tailwind used */
</style>

