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
import { ref, onMounted, onUnmounted } from 'vue';

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

interface Props {
  options: any;
  height?: string;
  theme?: string;
}

defineProps<{
  options: any;
  height?: string;
  theme?: string;
}>();

const chartRef = ref<any>(null);

// Handle window resize
const handleResize = () => {
  chartRef.value?.resize();
};

onMounted(() => {
  window.addEventListener('resize', handleResize);
});

onUnmounted(() => {
  window.removeEventListener('resize', handleResize);
});
</script>

<template>
  <div class="chart-wrapper" :style="{ height: height || '300px' }">
    <v-chart ref="chartRef" :option="options" :theme="theme || 'dark'" autoresize />
  </div>
</template>

<style scoped>
.chart-wrapper {
  width: 100%;
  position: relative;
}
</style>
