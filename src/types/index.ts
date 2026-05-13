export type LogisticsStatus = 'optimal' | 'delayed' | 'critical' | 'maintenance' | 'info';

export interface MetricPoint {
  timestamp: number;
  value: number;
}

export interface FleetMetrics {
  activeVehicles: number;
  fuelEfficiency: number;
  deliverySuccess: number;
  avgTransitTime: number;
}

export interface DeliveryMetric {
  timestamp: number;
  completed: number;
  pending: number;
  efficiency: number;
}

export interface LogisticsEvent {
  id: string;
  timestamp: number;
  status: LogisticsStatus;
  type: 'Arrival' | 'Departure' | 'Delay' | 'Maintenance' | 'Alert';
  vehicleId: string;
  route: string;
  location: string;
  message: string;
}

export interface DashboardState {
  isStreaming: boolean;
  metrics: {
    fleet: FleetMetrics;
    history: {
      activeVehicles: MetricPoint[];
      fuelEfficiency: MetricPoint[];
      deliverySuccess: MetricPoint[];
      avgTransitTime: MetricPoint[];
    };
  };
  events: LogisticsEvent[];
  deliveryHistory: DeliveryMetric[];
}

