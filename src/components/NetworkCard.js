import React from "react";
import { Line } from "react-chartjs-2";
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

const NetworkCard = ({ data, history }) => {
  if (!data || !data.network) {
    return (
      <div className="card">
        <div className="card-header">Network</div>
        <div>No network data available</div>
      </div>
    );
  }

  const networkData = data.network;

  // Prepare network speed history data
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
  const sentSpeeds = history.map((item) => item?.network?.sent_speed_mbps || 0);
  const recvSpeeds = history.map((item) => item?.network?.recv_speed_mbps || 0);

  const networkChartData = {
    labels: timeLabels,
    datasets: [
      {
        label: "Upload (Mbps)",
        data: sentSpeeds,
        borderColor: "rgba(255, 99, 132, 1)",
        backgroundColor: "rgba(255, 99, 132, 0.2)",
        borderWidth: 2,
        tension: 0.1,
        fill: true,
      },
      {
        label: "Download (Mbps)",
        data: recvSpeeds,
        borderColor: "rgba(54, 162, 235, 1)",
        backgroundColor: "rgba(54, 162, 235, 0.2)",
        borderWidth: 2,
        tension: 0.1,
        fill: true,
      },
    ],
  };

  return (
    <div className="card">
      <div className="card-header">
        Network <span id="net-agent-name">{data.agent_name}</span>
      </div>
      <div className="metric">
        <span className="metric-label">Sent:</span>
        <span className="metric-value" id="net-sent">
          {(networkData.bytes_sent / 1024 ** 2).toFixed(2)} MB
        </span>
      </div>
      <div className="metric">
        <span className="metric-label">Received:</span>
        <span className="metric-value" id="net-recv">
          {(networkData.bytes_recv / 1024 ** 2).toFixed(2)} MB
        </span>
      </div>
      <div className="metric">
        <span className="metric-label">Speed:</span>
        <span className="metric-value" id="net-speed">
          ↑ {networkData.sent_speed_mbps?.toFixed(2) || "0"} Mbps ↓{" "}
          {networkData.recv_speed_mbps?.toFixed(2) || "0"} Mbps
        </span>
      </div>
      <div className="chart-container">
        <Line
          data={networkChartData}
          options={{
            responsive: true,
            maintainAspectRatio: false,
            scales: {
              y: { beginAtZero: true },
            },
          }}
        />
      </div>
    </div>
  );
};

export default NetworkCard;
