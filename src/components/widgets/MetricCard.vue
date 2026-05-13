<script setup lang="ts">
import { computed } from 'vue';

interface Props {
  title: string;
  value: string | number;
  unit?: string;
  trend?: number;
  sentiment?: 'positive' | 'negative' | 'neutral';
  icon?: string;
  color?: string;
}

const props = withDefaults(defineProps<Props>(), {
  sentiment: 'positive'
});

const trendClass = computed(() => {
  if (!props.trend) return '';
  const isUp = props.trend > 0;
  const isPositive = props.sentiment === 'positive' ? isUp : !isUp;
  return isPositive ? 'trend-good' : 'trend-bad';
});

const trendIcon = computed(() => {
  if (!props.trend) return '';
  return props.trend > 0 ? '↑' : '↓';
});
</script>

<template>
  <div class="metric-card">
    <div class="metric-header">
      <span class="metric-title">{{ title }}</span>
      <div v-if="icon" class="metric-icon" :style="{ color: color || 'var(--accent-primary)' }">
        <span v-html="icon"></span>
      </div>
    </div>
    <div class="metric-body">
      <span class="metric-value">{{ value }}</span>
      <span v-if="unit" class="metric-unit">{{ unit }}</span>
    </div>
    <div v-if="trend !== undefined" class="metric-footer">
      <span :class="['metric-trend', trendClass]">
        {{ trendIcon }} {{ Math.abs(trend) }}%
      </span>
      <span class="metric-period">vs last min</span>
    </div>
  </div>
</template>

<style scoped>
.metric-card {
  background: var(--bg-card);
  border: 1px solid var(--border-color);
  border-radius: 12px;
  padding: 1.25rem;
  box-shadow: var(--card-shadow);
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.metric-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.3);
}

.metric-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.metric-title {
  color: var(--text-secondary);
  font-size: 0.75rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  flex: 1;
}

.metric-icon {
  flex-shrink: 0;
  margin-left: 0.5rem;
}


.metric-value {
  font-size: 1.875rem;
  font-weight: 700;
  color: var(--text-primary);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

@media (max-width: 480px) {
  .metric-value {
    font-size: 1.5rem;
  }
}


.metric-unit {
  font-size: 1rem;
  color: var(--text-secondary);
  margin-left: 0.25rem;
}

.metric-trend {
  font-size: 0.875rem;
  font-weight: 600;
  padding: 0.125rem 0.375rem;
  border-radius: 4px;
}

.trend-good {
  color: #10b981;
  background: rgba(16, 185, 129, 0.1);
}

.trend-bad {
  color: #ef4444;
  background: rgba(239, 68, 68, 0.1);
}

.metric-period {
  color: var(--text-muted);
  font-size: 0.75rem;
  margin-left: 0.5rem;
}
</style>

