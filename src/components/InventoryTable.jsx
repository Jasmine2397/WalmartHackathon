import React, { useState } from 'react';
import './InventoryTable.css';
import RoleConfig from '../Config/RoleConfig';

function InventoryTable({ items = [] }) {
  const [searchTerm, setSearchTerm] = useState('');

  const currentUserRole = 'supplier';
  const hasInventoryAccess = RoleConfig[currentUserRole]?.pages.includes('inventory');

  // 🔍 Filter logic with safe lowercasing
  const filteredInventory = items.filter((item) => {
    const name = item.name?.toLowerCase() || '';
    const category = item.category?.toLowerCase() || '';
    const supplier = item.supplier?.toLowerCase() || '';
    const region = item.storage?.warehouse?.region?.toLowerCase() || '';

    return (
      name.includes(searchTerm.toLowerCase()) ||
      category.includes(searchTerm.toLowerCase()) ||
      supplier.includes(searchTerm.toLowerCase()) ||
      region.includes(searchTerm.toLowerCase())
    );
  });

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
              <th>Storage Unit</th>
              <th>Region</th>
              <th>Income Earned</th>
            </tr>
          </thead>
          <tbody>
            {filteredInventory.length > 0 ? (
              filteredInventory.map((inv) => {
                const warehouse = inv.storage?.warehouse || {};

                return (
                  <tr key={inv._id || inv.id || `${inv.name}-${inv.storage?.locationId}`}>
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
                    <td>{inv.storage?.locationId || 'N/A'}</td>
                    <td>{warehouse.name || 'N/A'}</td>
                    <td>{warehouse.region || 'N/A'}</td>
                    <td>
                      {warehouse.incomeEarned != null
                        ? `₹${warehouse.incomeEarned}`
                        : '—'}
                    </td>
                  </tr>
                );
              })
            ) : (
              <tr>
                <td colSpan="8" style={{ textAlign: 'center', padding: '1rem', color: '#777' }}>
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