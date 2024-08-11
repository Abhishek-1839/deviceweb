import React from 'react';
import { useParams, useLocation, Link, useNavigate } from 'react-router-dom';
import ApplianceDetails from './ApplianceDetails';
import Breadcrumbs from './Breadcrumbs';
import './Details.css';

const DeviceDetail = () => {
  const { id } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const { device, deviceInfo } = location.state || {};

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
    <div className="device-detail" >
       {/* <nav className="breadcrumb">
        <Link to="/">Devices List</Link> / <span>Device Details</span>
      </nav> */}
         <Breadcrumbs />
      <div className="summary-box" style={{marginLeft:'20px'}}>
      <h3>{device.serialNo}</h3>
        <p>{device.theatreName}</p>
        <p>{`${device.location.city}, ${device.location.state}, ${device.location.country}`}</p>
        <button style={{padding:'4px', borderRadius:'11px', marginRight:'8px'}}>{device.deviceStatus}</button>       
        <button style={{padding:'4px', borderRadius:'11px', marginRight:'8px'}}>{deviceInfo ? deviceInfo.storage : 'N/A'}</button>
        
      
      </div>
<div className="middle" style={{display:'flex', gap:'40px',color:'slateblue',marginLeft:'20px', marginTop:'20px'}}>
  <p className='first'>Details</p>
  <p className='first'>Content</p>
  <p className='first'>Bandwidth</p>
</div>
      <ApplianceDetails device={device} deviceInfo={deviceInfo} />
    </div>
  );
};

export default DeviceDetail;