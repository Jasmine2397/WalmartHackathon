import React, { useEffect, useState } from 'react';
import './InventoryPages.css';
import InventoryTable from '../components/InventoryTable';
import DemandForecast from '../components/DemandForecast';
import WarehouseOverview from '../components/WarehouseOverview';

function InventoryPages() {
  const [items, setItems] = useState([]);
  const [warehouseList, setWarehouseList] = useState([]);
  const [form, setForm] = useState({
    name: '',
    quantity: '',
    category: '',
    supplier: '',
    warehouse: ''
  });
  const [selectedRegion, setSelectedRegion] = useState('');

  useEffect(() => {
    fetch('http://localhost:5000/api/v1/inventory')
      .then((res) => res.json())
      .then((data) => {
        const inventoryData = Array.isArray(data) ? data : data.inventories || [];
        setItems(inventoryData);
      })
      .catch(() => setItems([]));

    fetch('/api/storage/overview')
      .then((res) => res.json())
      .then((data) => {
        const overview = data.data.overview || [];
        const sorted = [...overview].sort((a, b) => {
          const aUsage = a.totalCapacity ? a.capacityUsed / a.totalCapacity : 0;
          const bUsage = b.totalCapacity ? b.capacityUsed / b.totalCapacity : 0;
          return aUsage - bUsage;
        });
        setWarehouseList(sorted);
      })
      .catch(() => setWarehouseList([]));
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch('http://localhost:5000/api/v1/inventory', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: form.name,
          quantity: parseInt(form.quantity),
          category: form.category || 'general',
          supplier: form.supplier || 'N/A',
          warehouse: form.warehouse
        })
      });
      const newItem = await res.json();
      setItems((prev) => [...prev, newItem]);
      setForm({ name: '', quantity: '', category: '', supplier: '', warehouse: '' });
    } catch (err) {
      console.error('Failed to add item:', err);
    }
  };

  const regions = [...new Set(warehouseList.map((wh) => wh.region))];
  const filteredWarehouses = selectedRegion
    ? warehouseList.filter((wh) => wh.region === selectedRegion)
    : warehouseList;

  return (
    <div className="inventory-page">
      <div className="page-header">
        <h1>📦 Inventory Management</h1>
        <p className="subheading">Track stock levels, optimize storage, and forecast demand intelligently.</p>
      </div>

      <div className="two-column-grid">
        <div className="card">
          <h3 className="section-heading">📥 Add New Inventory</h3>
          <form className="inventory-form" onSubmit={handleSubmit}>
            <input
              name="name"
              placeholder="Item Name"
              value={form.name}
              onChange={handleChange}
              required
            />
            <input
              name="quantity"
              type="number"
              placeholder="Quantity"
              value={form.quantity}
              onChange={handleChange}
              required
            />
            <input
              name="category"
              placeholder="Category"
              value={form.category}
              onChange={handleChange}
            />
            <select
              name="warehouse"
              value={form.warehouse}
              onChange={handleChange}
              required
            >
              <option value="">Select Warehouse</option>
              {filteredWarehouses.map((wh) => {
                const utilization =
                  wh.totalCapacity && wh.capacityUsed
                    ? (wh.capacityUsed / wh.totalCapacity) * 100
                    : 0;
                const label = `${wh.name} (${wh.region}) – ${utilization.toFixed(0)}% used${utilization >= 100 ? ' 🚫' : ''}`;
                return (
                  <option key={wh.id} value={wh.id} disabled={utilization >= 100}>
                    {label}
                  </option>
                );
              })}
            </select>
            <input
              name="supplier"
              placeholder="Supplier Name"
              value={form.supplier}
              onChange={handleChange}
            />
            <button type="submit">Add Item</button>
          </form>
        </div>

        <div className="card demand-container">
          <h3 className="section-heading">📈 Demand Forecast</h3>
          <DemandForecast />
        </div>
      </div>

      {regions.length > 0 && (
        <div className="region-filter full-width">
          <label><strong>Filter by Region:</strong></label>{' '}
          <select value={selectedRegion} onChange={(e) => setSelectedRegion(e.target.value)}>
            <option value="">All Regions</option>
            {regions.map((region) => (
              <option key={region} value={region}>{region}</option>
            ))}
          </select>
        </div>
      )}

      <div className="card full-width">
        <h3 className="section-heading">📋 Current Inventory Table</h3>
        <InventoryTable items={items} />
      </div>

      <div className="card full-width">
        <WarehouseOverview />
      </div>
    </div>
  );
}

export default InventoryPages;
