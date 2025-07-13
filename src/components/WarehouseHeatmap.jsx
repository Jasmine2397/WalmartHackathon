import React from 'react';
import './WarehouseHeatmap.css';
import mockWarehouseData from '../mock/mockWarehouseData';

function WarehouseHeatmap() {
  return (
    <div className="warehouse-heatmap">
      <h3>🗺️ Warehouse Heatmap</h3>
      <div className="heatmap-grid">
        {mockWarehouseData.map((zone, idx) => {
          const usageRatio = zone.capacityUsed / zone.totalCapacity;
          let zoneClass = 'low';
          if (usageRatio > 0.75) zoneClass = 'high';
          else if (usageRatio > 0.4) zoneClass = 'medium';

          return (
            <div key={idx} className={`zone ${zoneClass}`}>
              <strong>{zone.name}</strong>
              <div>Usage: {Math.round(usageRatio * 100)}%</div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default WarehouseHeatmap;