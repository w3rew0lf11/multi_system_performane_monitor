import React from "react";
import { Line, Pie } from "react-chartjs-2";
import { Chart, registerables } from "chart.js";
Chart.register(...registerables);

const formatBytes = (bytes, decimals = 2) => {
  if (bytes === 0) return "0 Bytes";
  const k = 1024;
  const dm = decimals < 0 ? 0 : decimals;
  const sizes = ["Bytes", "KB", "MB", "GB", "TB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + " " + sizes[i];
};

const MemoryCard = ({ data, history }) => {
  if (!data || !data.ram)
    return (
      <div className="card">
        <div className="card-header">Memory (RAM)</div>
        <div>No memory data available</div>
      </div>
    );

  const ramData = data.ram;

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
  const ramUsageData = history.map((item) => item?.ram?.percent || 0);

  const ramChartData = {
    labels: timeLabels,
    datasets: [
      {
        label: "RAM Usage %",
        data: ramUsageData,
        borderColor: "rgba(75, 192, 192, 1)",
        backgroundColor: "rgba(75, 192, 192, 0.2)",
        borderWidth: 2,
        tension: 0.1,
        fill: true,
      },
    ],
  };

  const ramPieData = {
    labels: ["Used", "Free"],
    datasets: [
      {
        data: [
          ((ramData.used / ramData.total) * 100).toFixed(1),
          ((ramData.free / ramData.total) * 100).toFixed(1),
        ],
        backgroundColor: ["rgba(255, 99, 132, 0.7)", "rgba(54, 162, 235, 0.7)"],
        borderWidth: 1,
      },
    ],
  };

  return (
    <div className="card">
      <div className="card-header">
        Memory (RAM) <span id="ram-agent-name">{data.agent_name}</span>
      </div>
      <div className="metric">
        <span className="metric-label">Usage:</span>
        <span className="metric-value" id="ram-percent">
          {ramData.percent.toFixed(1)}%
        </span>
      </div>
      <div className="progress-bar">
        <div
          className="progress"
          id="ram-progress"
          style={{ width: `${ramData.percent}%` }}
        ></div>
      </div>
      <div className="metric">
        <span className="metric-label">Used:</span>
        <span className="metric-value" id="ram-used">
          {formatBytes(ramData.used)}
        </span>
      </div>
      <div className="metric">
        <span className="metric-label">Free:</span>
        <span className="metric-value" id="ram-free">
          {formatBytes(ramData.free)}
        </span>
      </div>
      <div className="metric">
        <span className="metric-label">Total:</span>
        <span className="metric-value" id="ram-total">
          {formatBytes(ramData.total)}
        </span>
      </div>
      <div className="chart-container">
        <Line
          data={ramChartData}
          options={{
            responsive: true,
            maintainAspectRatio: false,
            scales: {
              y: { beginAtZero: true, max: 100 },
            },
          }}
        />
      </div>
      <div className="chart-container">
        <Pie
          data={ramPieData}
          options={{ responsive: true, maintainAspectRatio: false }}
        />
      </div>
    </div>
  );
};

export default MemoryCard;
