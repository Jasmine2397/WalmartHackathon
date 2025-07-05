import React from 'react';
import './WarehouseHeatmap.css';

function WarehouseHeatmap() {
  return (
    <div className="inventory-section">
      <h3>🗺️ Warehouse Heatmap</h3>
      <div className="heatmap-grid">
        <div className="zone low">Zone A</div>
        <div className="zone medium">Zone B</div>
        <div className="zone high">Zone C</div>
      </div>
    </div>
  );
}

export default WarehouseHeatmap;