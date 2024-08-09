import React from 'react';
import { useParams, useLocation, Link, useNavigate } from 'react-router-dom';

const DeviceDetail = () => {
  const { id } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const { device } = location.state || {};

  if (!device) {
    return (
      <div>
        <h1>Error</h1>
        <p>Device information not found.</p>
        <button onClick={() => navigate('/')}>Back to Devices List</button>
      </div>
    );
  }

  return (
    <div className="device-detail">
      <Link to="/">← Back to Devices List</Link>
      <h1>Device Details</h1>
      <div className="device-info">
        <h2>{device.name}</h2>
        <p><strong>ID:</strong> {device.id}</p>
        <p><strong>Type:</strong> {device.type}</p>
        <p><strong>Status:</strong> {device.status}</p>
        {device.location && (
          <div>
            <strong>Location:</strong>
            <ul>
              {Object.entries(device.location).map(([key, value]) => (
                <li key={key}>{key}: {value}</li>
              ))}
            </ul>
          </div>
        )}
      </div>
      {/* If you have additional applianceInfo, you can add it here */}
    </div>
  );
};

export default DeviceDetail;