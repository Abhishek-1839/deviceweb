// StatusBar.js
import React from 'react';
import './StatusBar.css';

const StatusBar = ({ products }) => {
  const statusCounts = products.reduce(
    (acc, product) => {
      if (product.deviceStatus) {
        acc.deviceStatus[product.deviceStatus.toLowerCase()] =
          (acc.deviceStatus[product.deviceStatus.toLowerCase()] || 0) + 1;
      }
      if (product.downloadStatus) {
        acc.downloadStatus[product.downloadStatus.toLowerCase()] =
          (acc.downloadStatus[product.downloadStatus.toLowerCase()] || 0) + 1;
      }
      return acc;
    },
    { deviceStatus: {}, downloadStatus: {} }
  );

  return (
    <div className="status-bar">
      <div className="status-section">
        <h4>Device Status</h4>
        {Object.entries(statusCounts.deviceStatus).map(([status, count]) => (
          <div key={status} className="status-item">
            {status.charAt(0).toUpperCase() + status.slice(1)}: {count}
          </div>
        ))}
      </div>
      <div className="status-section">
        <h4>Download Status</h4>
        {Object.entries(statusCounts.downloadStatus).map(([status, count]) => (
          <div key={status} className="status-item">
            {status.charAt(0).toUpperCase() + status.slice(1)}: {count}
          </div>
        ))}
      </div>
    </div>
  );
};

export default StatusBar;