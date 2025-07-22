import React from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart, registerables } from 'chart.js';
Chart.register(...registerables);

const formatBytes = (bytes, decimals = 2) => {
  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const dm = decimals < 0 ? 0 : decimals;
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
};

const DiskCard = ({ data }) => {
  if (!data || !data.disks || data.disks.length === 0) {
    return (
      <div className="card">
        <div className="card-header">Storage</div>
        <div className="no-data">No disk data available</div>
      </div>
    );
  }

  const validDisks = data.disks.filter(d => d.total > 0);

  if (validDisks.length === 0) {
    return (
      <div className="card">
        <div className="card-header">Storage</div>
        <div className="no-data">No valid disk data available</div>
      </div>
    );
  }

  const diskChartData = {
    labels: validDisks.map(d => d.mountpoint),
    datasets: [
      {
        label: 'Used',
        data: validDisks.map(d => d.used / (1024 ** 3)), // Convert to GB
        backgroundColor: 'rgba(255, 99, 132, 0.6)',
        borderColor: 'rgba(255, 99, 132, 1)',
        borderWidth: 1
      },
      {
        label: 'Free',
        data: validDisks.map(d => d.free / (1024 ** 3)), // Convert to GB
        backgroundColor: 'rgba(54, 162, 235, 0.6)',
        borderColor: 'rgba(54, 162, 235, 1)',
        borderWidth: 1
      }
    ]
  };

  return (
    <div className="card">
      <div className="card-header">Storage <span id="disk-agent-name">{data.agent_name}</span></div>
      <div id="disk-info">
        {validDisks.map((disk, index) => (
          <div key={index} className="disk-item">
            <div className="disk-name">{disk.mountpoint}</div>
            <div className="metric">
              <span className="metric-label">Usage:</span>
              <span className="metric-value">{disk.percent.toFixed(1)}%</span>
            </div>
            <div className="progress-bar">
              <div className="progress" style={{ width: `${disk.percent}%` }}></div>
            </div>
            <div className="metric">
              <span className="metric-label">Used:</span>
              <span className="metric-value">{formatBytes(disk.used)}</span>
            </div>
            <div className="metric">
              <span className="metric-label">Free:</span>
              <span className="metric-value">{formatBytes(disk.free)}</span>
            </div>
            <div className="metric">
              <span className="metric-label">Total:</span>
              <span className="metric-value">{formatBytes(disk.total)}</span>
            </div>
          </div>
        ))}
      </div>
      <div className="chart-container">
        <Bar 
          data={diskChartData} 
          options={{
            responsive: true,
            maintainAspectRatio: false,
            scales: {
              x: { stacked: true },
              y: { stacked: true, beginAtZero: true }
            }
          }}
        />
      </div>
    </div>
  );
};

export default DiskCard;