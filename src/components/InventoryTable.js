// InventoryTable.js
import React, { useState } from 'react';
import './InventoryTable.css';
import RoleConfig from '../Config/RoleConfig';

function InventoryTable({ items }) {
  const [searchTerm, setSearchTerm] = useState('');

  // 🔐 Replace with dynamic role when ready
  const currentUserRole = 'supplier';

  // ✅ Check if this role has access to Inventory page
  const hasInventoryAccess = RoleConfig[currentUserRole]?.pages.includes('inventory');

  // 🧠 Filter items based on search term
  const filteredInventory = items.filter((item) =>
    item.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.category?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.supplier?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // 🔒 Block access if not allowed
  if (!hasInventoryAccess) {
    return (
      <div className="inventory-section">
        <h3>🚫 Access Denied</h3>
        <p>You do not have permission to view the Inventory page.</p>
      </div>
    );
  }

  return (
    <div className="inventory-section">
      <h3>📦 Stock Overview</h3>

      <div className="search-and-table">
        <input
          type="text"
          className="inventory-search"
          placeholder="Search inventory..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />

        <table className="stock-table">
          <thead>
            <tr>
              <th>Item</th>
              <th>Category</th>
              <th>Quantity</th>
              {currentUserRole !== 'delivery' && <th>Supplier</th>}
            </tr>
          </thead>
          <tbody>
            {filteredInventory.map((inv) => (
              <tr key={inv._id || inv.id}>
                <td>{inv.name || 'Unnamed Item'}</td>
                <td>{inv.category || 'Uncategorized'}</td>
                <td>
                  {['admin', 'inventory'].includes(currentUserRole) ? (
                    <input
                      type="number"
                      value={inv.quantity ?? 0}
                      min="0"
                      onChange={(e) =>
                        console.log(`New quantity for ${inv.name}: ${e.target.value}`)
                      }
                    />
                  ) : (
                    inv.quantity ?? 0
                  )}
                </td>
                {currentUserRole !== 'delivery' && (
                  <td>{inv.supplier || 'N/A'}</td>
                )}
              </tr>
            ))}
            {filteredInventory.length === 0 && (
              <tr>
                <td colSpan="4" style={{ textAlign: 'center', padding: '1rem', color: '#777' }}>
                  No matching items found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default InventoryTable;