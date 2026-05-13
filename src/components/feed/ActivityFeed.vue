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
  <div class="activity-feed">
    <div class="feed-header">
      <h3>Global Logistics Feed</h3>
      <div class="feed-status">
        <span class="status-dot animate-pulse"></span>
        LIVE UPDATES
      </div>
    </div>
    
    <div class="feed-container">
      <table class="feed-table">
        <thead>
          <tr>
            <th>Time</th>
            <th>Status</th>
            <th>Type</th>
            <th>Vehicle</th>
            <th>Route</th>
            <th>Details</th>
          </tr>
        </thead>
        <tbody>
          <TransitionGroup name="list">
            <tr v-for="event in dashboard.events" :key="event.id">
              <td class="time-cell">{{ formatTime(event.timestamp) }}</td>
              <td>
                <span :class="['badge', event.status]">
                  {{ event.status.toUpperCase() }}
                </span>
              </td>
              <td class="event-type">
                <span class="type-indicator">{{ event.type }}</span>
              </td>
              <td class="mono">{{ event.vehicleId }}</td>
              <td class="mono">{{ event.route }}</td>
              <td class="message-cell">{{ event.message }}</td>
            </tr>
          </TransitionGroup>
          <tr v-if="dashboard.events.length === 0">
            <td colspan="6" class="empty-state">Waiting for transit data...</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<style scoped>
.activity-feed {
  background: var(--bg-card);
  border: 1px solid var(--border-color);
  border-radius: 12px;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  height: 100%;
}

.feed-header {
  padding: 1rem 1.25rem;
  border-bottom: 1px solid var(--border-color);
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: rgba(255, 255, 255, 0.02);
}

.feed-header h3 {
  font-size: 1.1rem;
  font-weight: 700;
  color: var(--text-primary);
}

.feed-status {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.75rem;
  font-weight: 700;
  color: #10b981;
}

.status-dot {
  width: 8px;
  height: 8px;
  background: currentColor;
  border-radius: 50%;
  box-shadow: 0 0 8px currentColor;
}

.feed-container {
  overflow-x: auto;
  overflow-y: auto;
  flex-grow: 1;
  -webkit-overflow-scrolling: touch;
}

.feed-table {
  width: 100%;
  min-width: 800px; /* Ensure table doesn't get too squished on mobile */
  border-collapse: collapse;
  font-size: 0.875rem;
}


th {
  text-align: left;
  padding: 0.75rem 1.25rem;
  background: var(--bg-secondary);
  color: var(--text-secondary);
  font-weight: 600;
  position: sticky;
  top: 0;
  z-index: 10;
  text-transform: uppercase;
  font-size: 0.75rem;
  letter-spacing: 0.05em;
}

td {
  padding: 0.75rem 1.25rem;
  border-bottom: 1px solid var(--border-color);
  color: var(--text-primary);
}

.time-cell {
  color: var(--text-muted);
  font-family: 'JetBrains Mono', monospace;
  white-space: nowrap;
}

.mono {
  font-family: 'JetBrains Mono', monospace;
  color: var(--accent-primary);
  font-size: 0.8rem;
}

.message-cell {
  color: var(--text-secondary);
  max-width: 300px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.badge {
  padding: 0.125rem 0.5rem;
  border-radius: 4px;
  font-size: 0.7rem;
  font-weight: 700;
  border: 1px solid transparent;
}

.optimal { background: rgba(16, 185, 129, 0.1); color: #10b981; border-color: rgba(16, 185, 129, 0.2); }
.delayed { background: rgba(245, 158, 11, 0.1); color: #f59e0b; border-color: rgba(245, 158, 11, 0.2); }
.critical { background: rgba(239, 68, 68, 0.1); color: #ef4444; border-color: rgba(239, 68, 68, 0.2); }
.maintenance { background: rgba(99, 102, 241, 0.1); color: #6366f1; border-color: rgba(99, 102, 241, 0.2); }
.info { background: rgba(148, 163, 184, 0.1); color: #94a3b8; border-color: rgba(148, 163, 184, 0.2); }

.type-indicator {
  font-weight: 600;
  color: var(--text-primary);
}

.empty-state {
  text-align: center;
  padding: 3rem;
  color: var(--text-muted);
}

/* Animations */
.list-enter-active,
.list-leave-active {
  transition: all 0.4s ease;
}
.list-enter-from {
  opacity: 0;
  transform: translateX(-30px);
}
.list-leave-to {
  opacity: 0;
  transform: translateX(30px);
}
</style>

