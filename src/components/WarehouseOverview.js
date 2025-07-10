import React, { useEffect, useState } from 'react';
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer,
  PieChart, Pie, Cell
} from 'recharts';
import './WarehouseOverview.css'; // ✅ CSS file for styles

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#FF6384', '#36A2EB'];

const WarehouseOverview = () => {
  const [overviewData, setOverviewData] = useState([]);
  const [selectedId, setSelectedId] = useState('');
  const [selectedRegion, setSelectedRegion] = useState('');

  // 📡 Fetch Warehouse Overview Data
  const fetchWarehouseOverview = async () => {
    try {
      const response = await fetch('/api/storage/overview');
      if (!response.ok) throw new Error('Fetch failed');
      const result = await response.json();
      setOverviewData(result.data.overview);
    } catch (err) {
      console.error('Error fetching warehouse overview:', err);
    }
  };

  useEffect(() => {
    fetchWarehouseOverview();
  }, []);

  // 🌍 Region Filtering
  const regions = [...new Set(overviewData.map(wh => wh.region))];

  const filteredData = selectedRegion
    ? overviewData.filter(wh => wh.region === selectedRegion)
    : overviewData;

  // 📊 Chart Data
  const capacityData = filteredData.map(wh => ({
    name: wh.name,
    capacityUsed: wh.capacityUsed,
    totalCapacity: wh.totalCapacity
  }));

  const incomeData = filteredData.map(wh => ({
    name: wh.name,
    value: wh.incomeEarned
  }));

  const selectedWarehouse = overviewData.find(wh => wh.id === selectedId);

  return (
    <div className="warehouse-overview">
      <h2>📦 Warehouse Overview</h2>

      {overviewData.length === 0 ? (
        <p>Loading data...</p>
      ) : (
        <>
          {/* 🗺 Region Filter */}
          <div className="filter-group">
            <label htmlFor="regionSelect"><strong>Filter by Region:</strong></label>
            <select
              id="regionSelect"
              value={selectedRegion}
              onChange={(e) => setSelectedRegion(e.target.value)}
            >
              <option value="">-- All Regions --</option>
              {regions.map((region) => (
                <option key={region} value={region}>{region}</option>
              ))}
            </select>
          </div>

          {/* 🔍 Drilldown Dropdown */}
          <div className="filter-group">
            <label htmlFor="warehouseSelect"><strong>Select a Warehouse:</strong></label>
            <select
              id="warehouseSelect"
              value={selectedId}
              onChange={(e) => setSelectedId(e.target.value)}
            >
              <option value="">-- Choose --</option>
              {filteredData.map((wh) => (
                <option key={wh.id} value={wh.id}>{wh.name}</option>
              ))}
            </select>
          </div>

          {/* 🏗 Overall Capacity Comparison */}
          <div className="chart-container">
            <h3>🏗 Overall Capacity Comparison</h3>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={capacityData}>
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="capacityUsed" fill="#8884d8" name="Used Capacity" />
                <Bar dataKey="totalCapacity" fill="#82ca9d" name="Total Capacity" />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* 💰 Income Distribution */}
          <div className="chart-container">
            <h3>💰 Income Distribution by Warehouse</h3>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={incomeData}
                  dataKey="value"
                  nameKey="name"
                  outerRadius={100}
                  label
                >
                  {incomeData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>

          {/* 📍 Selected Warehouse Detail View */}
          {selectedWarehouse && (
            <div className="drilldown">
              <h3>📍 {selectedWarehouse.name} Details</h3>

              <ResponsiveContainer width="100%" height={250}>
                <BarChart data={[selectedWarehouse]}>
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="capacityUsed" fill="#8884d8" name="Used Capacity" />
                  <Bar dataKey="totalCapacity" fill="#82ca9d" name="Total Capacity" />
                </BarChart>
              </ResponsiveContainer>

              <ResponsiveContainer width="100%" height={250}>
                <PieChart>
                  <Pie
                    data={[{ name: 'Income', value: selectedWarehouse.incomeEarned }]}
                    dataKey="value"
                    nameKey="name"
                    outerRadius={80}
                    label
                  >
                    <Cell fill="#00C49F" />
                  </Pie>
                  <Tooltip />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default WarehouseOverview;
