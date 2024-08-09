// StatusIndicator.js
import React from 'react';
import './StatusIndicator.css';

const statusClassMap = {
  deviceStatus: {
    online: 'deviceStatus-active',
    offline: 'deviceStatus-inactive'
  },
  downloadStatus: {
    downloaded: 'downloadStatus-completed',
    downloading: 'downloadStatus-in-progress',
    failed: 'downloadStatus-failed'
  }
};

const StatusIndicator = ({ header, value }) => {
    if (typeof value === 'object' && value !== null) {
        // Handle object values (like location)
        return (
          <>
            {Object.entries(value).map(([key, val], index) => (
              <div key={index}>{`${val}`}</div>
            ))}
          </>
        );
      }
    
      if (statusClassMap[header] && statusClassMap[header][value.toLowerCase()]) {
        return (
          <div>
            <span className={`status-dot ${statusClassMap[header][value.toLowerCase()]}`}></span>
            {value}
          </div>
        );
      }
    
      return value;
    };
    
    export default StatusIndicator;