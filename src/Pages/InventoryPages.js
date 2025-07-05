import React, { useEffect, useState } from 'react';
import './InventoryPages.css';
import InventoryTable from '../components/InventoryTable';
import DemandForecast from '../components/DemandForecast';
import InventoryActions from '../components/InventoryActions';
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
    // 📦 Fetch inventory items
    fetch('http://localhost:5000/api/v1/inventory')
      .then((res) => res.json())
      .then((data) => {
        const inventoryData = Array.isArray(data) ? data : data.inventories || [];
        setItems(inventoryData);
        console.log('Fetched inventory:', inventoryData);
      })
      .catch((err) => {
        console.error('Failed to fetch inventory:', err);
        setItems([]);
      });

    // 🏭 Fetch warehouse list
    fetch('/api/storage/overview')
      .then((res) => res.json())
      .then((data) => {
        const overview = data.data.overview || [];

        // 🧠 Sort by available space (descending)
        const sortedList = [...overview].sort((a, b) => {
          const aUsage = a.totalCapacity ? a.capacityUsed / a.totalCapacity : 0;
          const bUsage = b.totalCapacity ? b.capacityUsed / b.totalCapacity : 0;
          return aUsage - bUsage;
        });

        setWarehouseList(sortedList);
      })
      .catch((err) => {
        console.error('Failed to fetch warehouses:', err);
        setWarehouseList([]);
      });
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
      setForm({
        name: '',
        quantity: '',
        category: '',
        supplier: '',
        warehouse: ''
      });
    } catch (err) {
      console.error('Failed to add item:', err);
    }
  };

  // 🔍 Extract unique region list
  const regions = [...new Set(warehouseList.map(wh => wh.region))];

  // 🧭 Filter warehouse list by selected region
  const filteredWarehouses = selectedRegion
    ? warehouseList.filter(wh => wh.region === selectedRegion)
    : warehouseList;

  return (
    <div className="inventory-container">
      <h2>📦 Inventory Tracker</h2>

      <InventoryActions
        onRestock={() => console.log('Restock triggered')}
        onExport={() => console.log('Export triggered')}
      />

      {/* 🗺 Region Selector */}
      {regions.length > 0 && (
        <div style={{ marginBottom: '15px' }}>
          <label><strong>Filter by Region:</strong></label>{' '}
          <select
            value={selectedRegion}
            onChange={(e) => setSelectedRegion(e.target.value)}
            style={{ padding: '8px', marginTop: '5px', minWidth: '200px' }}
          >
            <option value="">All Regions</option>
            {regions.map((region) => (
              <option key={region} value={region}>{region}</option>
            ))}
          </select>
        </div>
      )}

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

        {/* 🧠 Filtered Warehouse Dropdown with Utilization */}
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
            const isFull = utilization >= 100;
            const label = `${wh.name} (${wh.region}) – ${utilization.toFixed(0)}% used${isFull ? ' 🚫' : ''}`;

            return (
              <option key={wh.id} value={wh.id} disabled={isFull}>
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

      <InventoryTable items={items} />
      <DemandForecast />

      <div style={{ marginTop: '60px' }}>
        <WarehouseOverview />
      </div>
    </div>
  );
}

export default InventoryPages;