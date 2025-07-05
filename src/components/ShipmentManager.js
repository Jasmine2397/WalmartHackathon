import React, { useState } from 'react';
import './ShipmentManager.css';

const mockDrivers = ['Amit', 'Riya', 'Carlos'];
const mockPackages = ['PKG101', 'PKG202', 'PKG303'];

const ShipmentManager = () => {
  const [assignments, setAssignments] = useState({});

  const handleAssign = (pkg, driver) => {
    setAssignments(prev => ({ ...prev, [pkg]: driver }));
  };

  return (
    <div className="shipment-manager">
      <h2>🤝 Supplier Collaboration</h2>
      {mockPackages.map(pkg => (
        <div key={pkg} className="shipment-row">
          <span>{pkg}</span>
          <select onChange={e => handleAssign(pkg, e.target.value)} value={assignments[pkg] || ''}>
            <option value="">Assign driver</option>
            {mockDrivers.map(driver => (
              <option key={driver} value={driver}>{driver}</option>
            ))}
          </select>
        </div>
      ))}
    </div>
  );
};

export default ShipmentManager;