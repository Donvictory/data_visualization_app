import type { FleetMetrics, LogisticsEvent, DeliveryMetric, LogisticsStatus } from '../types';

const EVENT_TYPES = ['Arrival', 'Departure', 'Delay', 'Maintenance', 'Alert'] as const;
const LOCATIONS = ['Hamburg Hub', 'Rotterdam Port', 'Berlin Center', 'Munich Logistics Park', 'Antwerp Terminal', 'Dover Crossing'];
const ROUTES = ['EU-901', 'EU-442', 'SEA-77', 'AIR-55', 'TR-102'];
const VEHICLES = ['TRK-88', 'TRK-12', 'SHP-01', 'VAN-99', 'TRK-45'];
const STATUSES: LogisticsStatus[] = ['optimal', 'delayed', 'critical', 'maintenance', 'info'];

export const generateFleetMetrics = (prev?: FleetMetrics): FleetMetrics => {
  const walk = (val: number, min: number, max: number, step: number) => {
    const change = (Math.random() - 0.5) * step;
    return Math.min(Math.max(val + change, min), max);
  };

  return {
    activeVehicles: Math.floor(walk(prev?.activeVehicles ?? 85, 50, 150, 5)),
    fuelEfficiency: walk(prev?.fuelEfficiency ?? 32, 20, 45, 1.5),
    deliverySuccess: walk(prev?.deliverySuccess ?? 98.2, 85, 100, 0.5),
    avgTransitTime: walk(prev?.avgTransitTime ?? 14.5, 8, 24, 1),
  };
};

export const generateDeliveryMetric = (): DeliveryMetric => {
  return {
    timestamp: Date.now(),
    completed: Math.floor(Math.random() * 40) + 10,
    pending: Math.floor(Math.random() * 15),
    efficiency: Math.floor(Math.random() * 15) + 85,
  };
};

export const generateLogisticsEvent = (): LogisticsEvent => {
  const id = Math.random().toString(36).substring(2, 9);
  const type = EVENT_TYPES[Math.floor(Math.random() * EVENT_TYPES.length)] as LogisticsEvent['type'];
  const location = LOCATIONS[Math.floor(Math.random() * LOCATIONS.length)]!;
  const vehicleId = VEHICLES[Math.floor(Math.random() * VEHICLES.length)]!;
  const route = ROUTES[Math.floor(Math.random() * ROUTES.length)]!;
  
  let status: LogisticsStatus = 'optimal';
  if (type === 'Delay') status = 'delayed';
  if (type === 'Alert') status = 'critical';
  if (type === 'Maintenance') status = 'maintenance';

  const messages: Record<LogisticsEvent['type'], string> = {
    Arrival: `${vehicleId} arrived at ${location} via ${route}`,
    Departure: `${vehicleId} departed from ${location} on route ${route}`,
    Delay: `${vehicleId} delayed at ${location} due to traffic/weather`,
    Maintenance: `${vehicleId} scheduled for maintenance at ${location}`,
    Alert: `Cargo temperature alert for ${vehicleId} at ${location}`,
  };

  return {
    id,
    timestamp: Date.now(),
    status,
    type,
    vehicleId,
    route,
    location,
    message: messages[type],
  };
};


