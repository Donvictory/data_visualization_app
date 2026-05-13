import { defineStore } from 'pinia';
import type { DashboardState, FleetMetrics, MetricPoint, LogisticsEvent, DeliveryMetric } from '../types';
import { generateFleetMetrics, generateDeliveryMetric, generateLogisticsEvent } from '../services/dataGenerator';

const MAX_HISTORY = 100;
const MAX_EVENTS = 500;

export const useDashboardStore = defineStore('dashboard', {
  state: (): DashboardState => ({
    isStreaming: true,
    metrics: {
      fleet: generateFleetMetrics(),
      history: {
        activeVehicles: [],
        fuelEfficiency: [],
        deliverySuccess: [],
        avgTransitTime: [],
      },
    },
    events: [],
    deliveryHistory: [],
  }),

  actions: {
    toggleStreaming() {
      this.isStreaming = !this.isStreaming;
    },

    updateData() {
      if (!this.isStreaming) return;

      const now = Date.now();
      
      // Update fleet metrics
      const nextFleet = generateFleetMetrics(this.metrics.fleet);
      this.metrics.fleet = nextFleet;

      // Update history buffers
      const pushMetric = (arr: MetricPoint[], val: number) => {
        arr.push({ timestamp: now, value: val });
        if (arr.length > MAX_HISTORY) arr.shift();
      };

      pushMetric(this.metrics.history.activeVehicles, nextFleet.activeVehicles);
      pushMetric(this.metrics.history.fuelEfficiency, nextFleet.fuelEfficiency);
      pushMetric(this.metrics.history.deliverySuccess, nextFleet.deliverySuccess);
      pushMetric(this.metrics.history.avgTransitTime, nextFleet.avgTransitTime);

      // Deliveries
      this.deliveryHistory.push(generateDeliveryMetric());
      if (this.deliveryHistory.length > MAX_HISTORY) this.deliveryHistory.shift();

      // Events
      if (Math.random() > 0.7) {
        this.events.unshift(generateLogisticsEvent());
        if (this.events.length > MAX_EVENTS) this.events.pop();
      }
    },

    clearData() {
      this.metrics.history.activeVehicles = [];
      this.metrics.history.fuelEfficiency = [];
      this.metrics.history.deliverySuccess = [];
      this.metrics.history.avgTransitTime = [];
      this.events = [];
      this.deliveryHistory = [];
    }
  },
});

