import React, { useEffect, useState } from 'react';
import './InventoryPages.css';
import InventoryTable from '../components/InventoryTable';
import DemandForecast from '../components/DemandForecast';
import WarehouseOverview from '../components/WarehouseOverview';
import WarehouseHeatmap from '../components/WarehouseHeatmap';

import mockWarehouseData from '../mock/mockWarehouseData';

function InventoryPages() {
  const [items, setItems] = useState([]);
  const [warehouseList, setWarehouseList] = useState([]);
  const [form, setForm] = useState({
    name: '',
    quantity: '',
    category: '',
    supplier: ''
  });
  const [selectedRegion, setSelectedRegion] = useState('');

  useEffect(() => {
    const dataWithIds = mockWarehouseData.map((wh, idx) => ({
      ...wh,
      _id: String(idx + 1)
    }));
    setWarehouseList(dataWithIds);
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newItemPayload = {
      name: form.name,
      quantity: parseInt(form.quantity),
      category: form.category || 'general',
      supplier: form.supplier || 'N/A'
    };
    setItems((prev) => [...prev, newItemPayload]);
    setForm({
      name: '',
      quantity: '',
      category: '',
      supplier: ''
    });
  };

  const regions = [...new Set(warehouseList.map((wh) => wh.region))];
  const filteredWarehouses = selectedRegion
    ? warehouseList.filter((wh) => wh.region === selectedRegion)
    : warehouseList;

  return (
    <div className="inventory-page">
      <div className="page-header">
        <h1>📦 Inventory Management</h1>
        <p className="subheading">
          Track stock levels, optimize storage, and forecast demand intelligently.
        </p>
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
          <select
            value={selectedRegion}
            onChange={(e) => setSelectedRegion(e.target.value)}
          >
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
        {filteredWarehouses.length > 0 ? (
          <>
            <WarehouseOverview warehouseList={filteredWarehouses} />
            <WarehouseHeatmap />
          </>
        ) : (
          <p>No warehouse data available for this region 📭</p>
        )}
      </div>
    </div>
  );
}

export default InventoryPages;