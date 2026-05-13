# NEXUS COMMAND — Real-Time Data Visualization Platform

A high-performance real-time analytics dashboard built with **Vue 3**, **TypeScript**, and **Apache ECharts**.

## 🚀 Features

- **Real-Time Data Streaming**: Simulates live cybersecurity/DevOps telemetry with sub-second updates.
- **Dynamic Charts**:
  - **System Load**: Multi-series line chart with gradients (CPU & Memory).
  - **Network Throughput**: Area chart showing inbound/outbound traffic.
  - **Event Distribution**: Bar chart aggregating security events by severity.
- **Interactive Controls**:
  - Global Pause/Resume for streaming.
  - Live data clearing.
  - Dark/Light mode support.
- **Live Activity Feed**: Animated, color-coded event table with real-time severity indicators.
- **Performance Optimized**: Uses throttled updates, bounded history buffers, and shallow reactivity for charts.

## 🛠 Tech Stack

- **Framework**: Vue 3 (Composition API)
- **State Management**: Pinia
- **Charts**: Apache ECharts (`vue-echarts`)
- **Styling**: Vanilla CSS with Design Tokens
- **Language**: TypeScript

## 🏗 Architecture & Design Decisions

### Data Streaming Approach
The platform uses a custom `useDataStream` composable that drives a centralized Pinia store. It uses a synthetic data generator to emit typed payloads every 1000ms.

### Rendering Optimization
1. **Bounded Buffers**: History arrays are capped at 100 points to prevent memory leaks over time.
2. **Shallow Reactivity**: Large chart option objects are computed to prevent Vue from performing deep recursive tracking on heavy ECharts configurations.
3. **Throttled Updates**: The dashboard updates at a fixed interval to balance visual smoothness with CPU usage.
4. **Transition Groups**: The activity feed uses Vue's `<TransitionGroup>` for efficient DOM manipulation during live item injection.

### State Management Strategy
- **Dashboard Store**: Handles the "hot" streaming data, history buffering, and event logs.
- **Settings Store**: Persists user preferences like theme and refresh rates.

### Resilience
- The UI gracefully handles empty states and provides feedback when the stream is paused.
- Data models are strictly typed to prevent runtime errors from malformed synthetic data.

## 🏁 Setup Instructions

1. **Install Dependencies**:
   ```bash
   pnpm install
   ```

2. **Run Development Server**:
   ```bash
   pnpm run dev
   ```

3. **Build for Production**:
   ```bash
   pnpm run build
   ```

---
Built by Antigravity
