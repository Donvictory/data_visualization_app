<script setup lang="ts">
import { computed } from 'vue';

interface Props {
  title: string;
  value: string | number;
  unit?: string;
  trend?: number;
  sentiment?: 'positive' | 'negative' | 'neutral';
  color?: string;
}

const props = withDefaults(defineProps<Props>(), {
  sentiment: 'positive',
  color: '#00d4ff'
});

const trendClass = computed(() => {
  if (!props.trend) return 'text-text-muted';
  
  const isPositive = props.trend > 0;
  const isGood = props.sentiment === 'positive' ? isPositive : !isPositive;
  
  return isGood ? 'text-green-500 bg-green-500/10' : 'text-red-500 bg-red-500/10';
});

// Use for dynamic color binding
const iconBgColor = computed(() => `${props.color}20`);
</script>

<template>
  <div class="bg-background-card border border-white/10 rounded-xl p-4 md:p-6 hover:border-white/20 transition-all group overflow-hidden">
    <div class="flex justify-between items-start mb-4">
      <h3 class="text-[10px] md:text-xs font-medium text-text-secondary uppercase tracking-widest truncate flex-1 pr-2">
        {{ title }}
      </h3>
      <div class="metric-icon-wrapper w-8 h-8 rounded-lg flex items-center justify-center transition-transform group-hover:scale-110 flex-shrink-0">
        <div class="metric-icon-dot w-2 h-2 rounded-full"></div>
      </div>
    </div>
    
    <div class="flex items-baseline gap-1 overflow-hidden">
      <span class="text-xl md:text-3xl font-medium tracking-tight truncate">
        {{ value }}
      </span>
      <span v-if="unit" class="text-[9px] md:text-xs text-text-secondary font-medium uppercase shrink-0">
        {{ unit }}
      </span>
    </div>

    
    <div v-if="trend !== undefined" class="mt-4 flex flex-wrap items-center gap-2">
      <span :class="['px-1.5 py-0.5 rounded text-[10px] md:text-xs font-medium flex items-center gap-1 shrink-0', trendClass]">
        <span>{{ trend > 0 ? '↑' : '↓' }}</span>
        {{ Math.abs(trend) }}%
      </span>
      <span class="text-[10px] text-text-muted font-medium truncate hidden sm:inline">vs last min</span>
    </div>

  </div>
</template>

<style scoped>
.metric-icon-wrapper {
  background-color: v-bind(iconBgColor);
}
.metric-icon-dot {
  background-color: v-bind(color);
}
</style>

