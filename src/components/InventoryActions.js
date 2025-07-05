import React from 'react';
import './InventoryActions.css';

function InventoryActions() {
  return (
    <div className="inventory-section">
      <h3>⚡ Quick Actions</h3>
      <div className="action-buttons">
        <button>Restock Selected</button>
        <button>Modify Category</button>
        <button>Update Supplier Info</button>
      </div>
    </div>
  );
}

export default InventoryActions;