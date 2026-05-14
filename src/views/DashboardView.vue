<script setup lang="ts">
import { computed } from 'vue';
import { useDashboardStore } from '../stores/dashboard';
import { useSettingsStore } from '../stores/settings';
import { useDataStream } from '../composables/useDataStream';
import { Sun, Moon, Play, Pause, RotateCcw } from 'lucide-vue-next';

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
  const last = history[history.length - 1]?.value ?? 0;
  const prev = history[history.length - 2]?.value ?? 1;
  return Number(((last - prev) / (prev || 1) * 100).toFixed(1));
});

const successTrend = computed(() => {
  const history = dashboard.metrics.history.deliverySuccess;
  if (history.length < 2) return 0;
  const last = history[history.length - 1]?.value ?? 0;
  const prev = history[history.length - 2]?.value ?? 0;
  return Number((last - prev).toFixed(1));
});

const toggleStream = () => dashboard.toggleStreaming();
const clearLogs = () => dashboard.clearData();
</script>

<template>
  <main class="min-h-screen bg-background-primary text-text-primary overflow-x-hidden">
    <!-- Centered Container with consistent side padding -->
    <div class="w-full max-w-[1400px] mx-auto px-4 py-6 sm:px-6 lg:px-8 md:py-8 space-y-6 md:space-y-8 box-border">
      <!-- Header -->
      <header class="flex flex-col lg:flex-row justify-between items-center lg:items-center gap-6 text-center lg:text-left">
        <div class="space-y-1 w-full lg:w-auto">
          <h1 class="text-xl md:text-2xl font-black tracking-tighter">
            SYNTRA <span class="text-accent-primary">LOGISTICS</span>
          </h1>
          <p class="text-[10px] md:text-sm text-text-secondary font-medium uppercase tracking-widest opacity-80">Global Fleet Operations & Supply Chain Intelligence</p>
        </div>
        
        <div class="flex flex-col sm:flex-row items-center gap-4 w-full lg:w-auto">
          <div 
            class="flex items-center justify-center gap-2 px-3 py-1.5 rounded-full text-[9px] font-black border transition-colors duration-300"
            :class="dashboard.isStreaming ? 'text-green-500 bg-green-500/10 border-green-500/20' : 'text-text-muted bg-white/5 border-border-color'"
          >
            <span class="w-1.5 h-1.5 rounded-full bg-current" :class="{ 'animate-pulse': dashboard.isStreaming }"></span>
            {{ dashboard.isStreaming ? 'LIVE OPS' : 'STANDBY' }}
          </div>
          
          <div class="flex flex-wrap items-center justify-center gap-2 w-full sm:w-auto">
            <div class="relative min-w-[90px]">
              <select v-model="settings.timeRange" class="w-full bg-background-card text-text-primary border border-white/10 px-2 py-1.5 rounded-lg text-[10px] font-black outline-none focus:border-accent-primary transition-colors cursor-pointer appearance-none text-center">
                <option value="live">REAL-TIME</option>
                <option value="1m">1 MIN</option>
                <option value="5m">5 MIN</option>
                <option value="1h">1 HOUR</option>
              </select>
            </div>
            
            <div class="flex gap-1.5">
              <button @click="toggleStream" class="flex items-center justify-center gap-1.5 bg-accent-primary hover:brightness-110 text-black px-3 py-1.5 rounded-lg text-[10px] font-black transition-all active:scale-95 shadow-lg shadow-accent-primary/10">
                <component :is="dashboard.isStreaming ? Pause : Play" class="w-3 h-3" />
                <span>{{ dashboard.isStreaming ? 'PAUSE' : 'RESUME' }}</span>
              </button>
              
              <button @click="clearLogs" class="flex items-center justify-center p-1.5 border border-white/10 hover:bg-white/5 text-text-primary rounded-lg transition-colors active:scale-95" title="Reset">
                <RotateCcw class="w-4 h-4" />
              </button>
              
              <button @click="settings.setTheme(settings.theme === 'dark' ? 'light' : 'dark')" class="flex items-center justify-center p-1.5 bg-background-card border border-white/10 hover:bg-white/5 rounded-lg transition-colors active:scale-95">
                <Sun v-if="settings.theme === 'dark'" class="w-4 h-4 text-yellow-400" />
                <Moon v-else class="w-4 h-4 text-blue-400" />
              </button>
            </div>
          </div>
        </div>
      </header>

      <!-- Content Grid -->
      <div class="grid gap-6">
        <!-- Top Row: Metrics -->
        <section class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
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
        <section class="grid grid-cols-1 lg:grid-cols-4 gap-6">
          <div class="lg:col-span-2 h-[350px] md:h-[450px] bg-background-card/30 rounded-xl border border-white/5 p-4">
            <LineChart />
          </div>
          <div class="lg:col-span-1 h-[350px] bg-background-card/30 rounded-xl border border-white/5 p-4">
            <AreaChart />
          </div>
          <div class="lg:col-span-1 h-[350px] bg-background-card/30 rounded-xl border border-white/5 p-4">
            <BarChart />
          </div>
        </section>


        <!-- Bottom Row: Activity Feed -->
        <section class="h-[450px] md:h-[550px] overflow-hidden">
          <ActivityFeed />
        </section>
      </div>
    </div>
  </main>
</template>



<style>
/* No scoped styles - pure Tailwind used above */
</style>
