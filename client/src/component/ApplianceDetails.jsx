import React from 'react';
import './Details.css';

const ApplianceDetails = ({ device, deviceInfo }) => {
  return (
    <div className="appliance-details">
        <h2>Device Information</h2>
      <div className="detail-section">
        <div className="trial" style={{display:'flex', justifyContent: 'space-between'}}> 
            <div className="detailss"><p><strong>Device Serial</strong></p>
                                <p> {device.serialNo}</p></div>
        
        <div className="detailss"><p><strong>Device Status </strong></p><p> {device.deviceStatus}</p></div>
        <div className="detailss"><p><strong>Download Status </strong></p><p>  {device.downloadStatus}</p></div>
        <div className="detailss"><p><strong>OS Version </strong> </p><p> {device.osVersion}</p></div>
        </div>        
      </div>

      {deviceInfo && (
        <div className="detail-section">
             <div className="trial" style={{display:'flex', justifyContent: 'space-between'}}> 
             <div className="detailss"> <p><strong>Plan Start Date </strong></p><p> {new Date(deviceInfo.planStartDate).toLocaleDateString()}</p></div>
             <div className="detailss"><p><strong>Billing Cycle </strong></p><p> {deviceInfo.billingCycle}</p></div>
             <div className="detailss"><p><strong>Storage </strong></p><p> {deviceInfo.storage}</p></div>
             <div className="detailss"><p><strong>ISP Payment Responsibility </strong></p><p> {deviceInfo.ispPaymentResponsibility}</p></div>
             </div>
        </div>
      )}

      <div className="detail-section">
      <div className="trial" style={{display:'flex', justifyContent: 'space-between'}}> 
      <div className="detailss"><p><strong>Bandwidth </strong></p><p> {device.bandwidth}</p></div>
      <div className="detailss"><p><strong>Average Bandwidth </strong></p><p> {device.avgBandwidth}</p></div>
      <div className="detailss"><p><strong>Location </strong></p>{device.location && (
          <ul className='ull' style={{display:'flex', gap:'8px'}}>
            {Object.entries(device.location).map(([key, value]) => (
              <li className='lis' key={key}>{value}</li>
            ))}
          </ul>
        )}</div></div>
      
      </div>

      
    </div>
  );
};

export default ApplianceDetails;