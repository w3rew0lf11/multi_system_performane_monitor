import React from "react";
import { Line, Bar } from "react-chartjs-2";
import { Chart, registerables } from "chart.js";
Chart.register(...registerables);

const CpuCard = ({ data, history }) => {
  if (!data || !data.cpu)
    return (
      <div className="card">
        <div className="card-header">CPU</div>
        <div>No CPU data available</div>
      </div>
    );

  const cpuData = data.cpu;
  const perCpuData = cpuData.per_cpu || [];

  // Prepare time series data
  const formatTime = (date) => {
    return date.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: true,
    });
  };

  // Then use it like this:
  const timeLabels = history.map((item) =>
    item ? formatTime(new Date(item.timestamp)) : ""
  );
  const cpuUsageData = history.map((item) => item?.cpu?.percent || 0);

  const cpuChartData = {
    labels: timeLabels,
    datasets: [
      {
        label: "CPU Usage %",
        data: cpuUsageData,
        borderColor: "rgba(255, 159, 64, 1)",
        backgroundColor: "rgba(255, 159, 64, 0.2)",
        borderWidth: 2,
        tension: 0.1,
        fill: true,
      },
    ],
  };

  const perCpuChartData = {
    labels: perCpuData.map((_, i) => `Core ${i + 1}`),
    datasets: [
      {
        label: `Per-Core Usage (${perCpuData.length} cores)`,
        data: perCpuData,
        backgroundColor: "rgba(54, 162, 235, 0.6)",
        borderColor: "rgba(54, 162, 235, 1)",
        borderWidth: 1,
      },
    ],
  };

  return (
    <div className="card">
      <div className="card-header">
        CPU <span id="cpu-agent-name">{data.agent_name}</span>
      </div>
      <div className="metric">
        <span className="metric-label">Total Usage:</span>
        <span className="metric-value" id="cpu-percent">
          {cpuData.percent.toFixed(1)}%
        </span>
      </div>
      <div className="progress-bar">
        <div
          className="progress"
          id="cpu-progress"
          style={{ width: `${cpuData.percent}%` }}
        ></div>
      </div>
      <div className="metric">
        <span className="metric-label">Frequency:</span>
        <span className="metric-value" id="cpu-freq">
          {Math.round(cpuData.freq)} MHz
        </span>
      </div>
      <div className="metric">
        <span className="metric-label">Cores:</span>
        <span className="metric-value" id="cpu-cores">
          {cpuData.cores} physical, {cpuData.logical_cores} logical
        </span>
      </div>
      <div className="metric">
        <span className="metric-label">Temperature:</span>
        <span className="metric-value" id="cpu-temp">
          {cpuData.temperature ? `${cpuData.temperature}°C` : "N/A"}
        </span>
      </div>
      <div className="chart-container">
        <Line
          data={cpuChartData}
          options={{
            responsive: true,
            maintainAspectRatio: false,
            scales: {
              y: { beginAtZero: true, max: 100 },
              x: { display: true, title: { display: true, text: "Time" } },
            },
          }}
        />
      </div>
      <div className="chart-container">
        <Bar
          data={perCpuChartData}
          options={{
            responsive: true,
            maintainAspectRatio: false,
            scales: {
              y: { beginAtZero: true, max: 100 },
            },
          }}
        />
      </div>
    </div>
  );
};

export default CpuCard;
