<script setup lang="ts">
import { computed } from 'vue';
import { useDashboardStore } from '../stores/dashboard';
import { useSettingsStore } from '../stores/settings';
import { useDataStream } from '../composables/useDataStream';

import MetricCard from '../components/widgets/MetricCard.vue';
import LineChart from '../components/charts/LineChart.vue';
import AreaChart from '../components/charts/AreaChart.vue';
import BarChart from '../components/charts/BarChart.vue';
import ActivityFeed from '../components/feed/ActivityFeed.vue';

const dashboard = useDashboardStore();
const settings = useSettingsStore();

// Initialize data stream
useDataStream();

const fleetTrend = computed(() => {
  const history = dashboard.metrics.history.activeVehicles;
  if (history.length < 2) return 0;
  const last = history[history.length - 1].value;
  const prev = history[history.length - 2].value;
  return Number(((last - prev) / (prev || 1) * 100).toFixed(1));
});

const successTrend = computed(() => {
  const history = dashboard.metrics.history.deliverySuccess;
  if (history.length < 2) return 0;
  return Number((history[history.length - 1].value - history[history.length - 2].value).toFixed(1));
});

const toggleStream = () => dashboard.toggleStreaming();
const clearLogs = () => dashboard.clearData();
</script>

<template>
  <main class="dashboard-page">
    <header class="dashboard-header">
      <div class="header-left">
        <h1>SYNTRA <span class="accent">LOGISTICS</span></h1>
        <p class="subtitle">Global Fleet Operations & Supply Chain Intelligence</p>
      </div>
      
      <div class="header-actions">
        <div class="status-indicator" :class="{ inactive: !dashboard.isStreaming }">
          <span class="dot"></span>
          {{ dashboard.isStreaming ? 'LIVE OPS' : 'STANDBY' }}
        </div>
        
        <div class="header-controls">
          <select v-model="settings.timeRange" class="select-input">
            <option value="live">Real-Time</option>
            <option value="1m">Last 1 min</option>
            <option value="5m">Last 5 mins</option>
            <option value="1h">Last 1 hour</option>
          </select>
          
          <div class="button-group">
            <button @click="toggleStream" class="btn btn-primary">
              {{ dashboard.isStreaming ? 'Pause' : 'Resume' }}
            </button>
            <button @click="clearLogs" class="btn btn-outline">Reset</button>
            <button @click="settings.setTheme(settings.theme === 'dark' ? 'light' : 'dark')" class="btn btn-icon">
              {{ settings.theme === 'dark' ? '☀️' : '🌙' }}
            </button>
          </div>
        </div>
      </div>
    </header>

    <div class="dashboard-grid">
      <!-- Top Row: Metrics -->
      <section class="metrics-row">
        <MetricCard 
          title="ACTIVE FLEET" 
          :value="dashboard.metrics.fleet.activeVehicles" 
          unit="UNITS" 
          :trend="fleetTrend"
          color="#00d4ff"
        />
        <MetricCard 
          title="DELIVERY SUCCESS" 
          :value="dashboard.metrics.fleet.deliverySuccess.toFixed(1)" 
          unit="%" 
          :trend="successTrend"
          color="#10b981"
        />
        <MetricCard 
          title="AVG TRANSIT" 
          :value="dashboard.metrics.fleet.avgTransitTime.toFixed(1)" 
          unit="HRS"
          :trend="-2.4"
          sentiment="negative"
          color="#8b5cf6"
        />
        <MetricCard 
          title="FUEL EFFICIENCY" 
          :value="dashboard.metrics.fleet.fuelEfficiency.toFixed(1)" 
          unit="MPG" 
          color="#f59e0b"
          :trend="1.2"
        />
      </section>

      <!-- Middle Row: Charts -->
      <section class="charts-row">
        <div class="chart-container span-2">
          <LineChart />
        </div>
        <div class="chart-container">
          <AreaChart />
        </div>
        <div class="chart-container">
          <BarChart />
        </div>
      </section>

      <!-- Bottom Row: Activity Feed -->
      <section class="feed-row">
        <ActivityFeed />
      </section>
    </div>
  </main>
</template>


<style scoped>
.dashboard-page {
  padding: 2rem;
  max-width: 1600px;
  margin: 0 auto;
  min-height: 100vh;
}

.dashboard-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 2rem;
}

.header-left h1 {
  font-size: 1.5rem;
  letter-spacing: 0.1em;
  color: var(--text-primary);
}

.header-left .accent {
  color: var(--accent-primary);
}

.subtitle {
  color: var(--text-secondary);
  font-size: 0.875rem;
}

.header-actions {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 1rem;
}

.header-controls {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.select-input {
  background: var(--bg-card);
  color: var(--text-primary);
  border: 1px solid var(--border-color);
  padding: 0.5rem 1rem;
  border-radius: 8px;
  font-size: 0.875rem;
  outline: none;
}

.status-indicator {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.7rem;
  font-weight: 800;
  color: #10b981;
  padding: 0.25rem 0.75rem;
  background: rgba(16, 185, 129, 0.1);
  border-radius: 20px;
  border: 1px solid rgba(16, 185, 129, 0.2);
}

.status-indicator.inactive {
  color: var(--text-muted);
  background: rgba(255, 255, 255, 0.05);
  border-color: var(--border-color);
}

.status-indicator .dot {
  width: 6px;
  height: 6px;
  background: currentColor;
  border-radius: 50%;
}

.status-indicator:not(.inactive) .dot {
  animation: pulse 2s infinite;
}

.button-group {
  display: flex;
  gap: 0.75rem;
}

.btn {
  padding: 0.5rem 1rem;
  border-radius: 8px;
  font-size: 0.875rem;
  font-weight: 600;
  transition: all 0.2s;
}

.btn-primary {
  background: var(--accent-primary);
  color: #000;
}

.btn-primary:hover {
  filter: brightness(1.1);
  transform: translateY(-1px);
}

.btn-outline {
  border: 1px solid var(--border-color);
  color: var(--text-primary);
}

.btn-outline:hover {
  background: rgba(255, 255, 255, 0.05);
}

.btn-icon {
  width: 40px;
  height: 40px;
  padding: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--bg-card);
  border: 1px solid var(--border-color);
}

.dashboard-grid {
  display: grid;
  gap: 1.5rem;
}

.metrics-row {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 1.25rem;
}

@media (max-width: 1200px) {
  .metrics-row {
    grid-template-columns: repeat(2, 1fr);
  }
}


.charts-row {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 1.25rem;
}

.chart-container {
  min-width: 0;
  min-height: 300px;
}

.chart-container.span-2 {
  grid-column: span 2;
}

.feed-row {
  min-height: 400px;
  height: 50vh;
}

/* Tablet / Medium Screens */
@media (max-width: 1400px) {
  .charts-row {
    grid-template-columns: repeat(2, 1fr);
  }
  .chart-container.span-2 {
    grid-column: span 2;
  }
}

/* Small Tablets / Large Phones */
@media (max-width: 1024px) {
  .dashboard-page {
    padding: 1rem;
  }
  
  .charts-row {
    grid-template-columns: 1fr;
  }
  
  .chart-container.span-2 {
    grid-column: span 1;
  }
}

@media (max-width: 768px) {
  .dashboard-header {
    flex-direction: column;
    align-items: stretch;
    gap: 1.5rem;
  }
  
  .header-actions {
    align-items: stretch;
    width: 100%;
  }
  
  .header-controls {
    flex-direction: column;
    align-items: stretch;
  }
  
  .button-group {
    width: 100%;
  }
  
  .btn {
    flex: 1;
  }

  .metrics-row {
    grid-template-columns: 1fr 1fr;
  }
}

@media (max-width: 480px) {
  .metrics-row {
    grid-template-columns: 1fr;
  }
  
  .header-left h1 {
    font-size: 1.25rem;
  }
  
  .feed-row {
    height: 500px;
  }
}
</style>

