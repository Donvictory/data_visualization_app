<script setup lang="ts">
import { useDashboardStore } from '../../stores/dashboard';

const dashboard = useDashboardStore();

const formatTime = (timestamp: number) => {
  return new Intl.DateTimeFormat('en-US', {
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: false
  }).format(timestamp);
};
</script>

<template>
  <div class="bg-background-card border border-white/10 rounded-xl overflow-hidden flex flex-col h-full">
    <!-- Header -->
    <div class="flex justify-between items-center p-4 border-b border-white/5">
      <h3 class="text-sm font-medium tracking-wider uppercase text-text-primary">Global Logistics Feed</h3>
      <div class="flex items-center gap-2 text-[10px] font-medium text-text-secondary bg-white/5 px-2 py-1 rounded">
        <span class="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse"></span>
        LIVE UPDATES
      </div>
    </div>
    
    <!-- Table Container -->
    <div class="w-full overflow-x-auto overflow-y-auto flex-grow scrollbar-thin">
      <table class="w-full min-w-[800px] border-collapse text-xs md:text-sm">
        <thead class="sticky top-0 bg-background-card/95 backdrop-blur z-10">
          <tr class="text-text-muted border-b border-white/5 uppercase text-[10px] tracking-widest font-medium">
            <th class="text-left px-5 py-3">Time</th>
            <th class="text-left px-5 py-3">Status</th>
            <th class="text-left px-5 py-3">Type</th>
            <th class="text-left px-5 py-3">Vehicle</th>
            <th class="text-left px-5 py-3">Route</th>
            <th class="text-left px-5 py-3">Details</th>
          </tr>
        </thead>
        <tbody class="divide-y divide-white/5">
          <TransitionGroup name="list">
            <tr 
              v-for="event in dashboard.events" 
              :key="event.id"
              class="hover:bg-white/[0.02] transition-colors group"
            >
              <td class="px-5 py-3 text-text-muted font-mono whitespace-nowrap">{{ formatTime(event.timestamp) }}</td>
              <td class="px-5 py-3">
                <span 
                  class="px-2 py-0.5 rounded text-[10px] font-medium uppercase tracking-tighter"

                  :class="{
                    'bg-green-500/10 text-green-500': event.status === 'optimal',
                    'bg-yellow-500/10 text-yellow-500': event.status === 'delayed',
                    'bg-red-500/10 text-red-500': event.status === 'critical',
                    'bg-blue-500/10 text-blue-500': event.status === 'maintenance',
                    'bg-slate-500/10 text-slate-400': event.status === 'info',
                  }"
                >
                  {{ event.status }}
                </span>
              </td>
              <td class="px-5 py-3">
                <span class="text-accent-primary font-medium">{{ event.type }}</span>
              </td>
              <td class="px-5 py-3 font-mono text-text-secondary">{{ event.vehicleId }}</td>
              <td class="px-5 py-3 font-mono text-text-secondary">{{ event.route }}</td>
              <td class="px-5 py-3 text-text-primary/90 group-hover:text-text-primary transition-colors">
                {{ event.message }}
              </td>
            </tr>
          </TransitionGroup>
          
          <tr v-if="dashboard.events.length === 0">
            <td colspan="6" class="px-5 py-12 text-center text-text-muted italic">
              Waiting for transit data...
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<style scoped>
.list-enter-active,
.list-leave-active {
  transition: all 0.4s ease;
}
.list-enter-from {
  opacity: 0;
  transform: translateX(-10px);
}
.list-leave-to {
  opacity: 0;
  transform: translateX(10px);
}

/* Custom Scrollbar for better aesthetics */
.scrollbar-thin::-webkit-scrollbar {
  width: 4px;
  height: 4px;
}
.scrollbar-thin::-webkit-scrollbar-track {
  background: transparent;
}
.scrollbar-thin::-webkit-scrollbar-thumb {
  background: rgba(255, 255, 255, 0.1);
  border-radius: 10px;
}
.scrollbar-thin::-webkit-scrollbar-thumb:hover {
  background: rgba(255, 255, 255, 0.2);
}
</style>
