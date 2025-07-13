import React, { useEffect, useState } from 'react';
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer,
  PieChart, Pie, Cell
} from 'recharts';
import './WarehouseOverview.css';

import mockWarehouseData from '../mock/mockWarehouseData'; // ✅ Clean import

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#FF6384', '#36A2EB'];

function WarehouseOverview() {
  const [overviewData, setOverviewData] = useState([]);
  const [selectedId, setSelectedId] = useState('');
  const [selectedRegion, setSelectedRegion] = useState('');

  useEffect(() => {
    const dataWithIds = mockWarehouseData.map((wh, idx) => ({
      ...wh,
      _id: String(idx + 1)
    }));
    console.log('✅ Loaded Warehouse Data:', dataWithIds);
    setOverviewData(dataWithIds);
  }, []);

  const regions = [...new Set(overviewData.map(wh => wh.region))];

  const filteredData = selectedRegion
    ? overviewData.filter(wh => wh.region === selectedRegion)
    : overviewData;

  const capacityData = filteredData.map(wh => ({
    name: wh.name,
    capacityUsed: wh.capacityUsed ?? 0,
    totalCapacity: wh.totalCapacity ?? 0
  }));

  const incomeData = filteredData.map(wh => ({
    name: wh.name,
    value: wh.incomeEarned ?? 0
  }));

  const selectedWarehouse = overviewData.find(wh => wh._id === selectedId);

  return (
    <div className="warehouse-overview">
      <h2>📦 Warehouse Overview</h2>

      {overviewData.length === 0 ? (
        <p>Loading data... ⏳</p>
      ) : filteredData.length === 0 ? (
        <p>😕 No warehouses found in selected region.</p>
      ) : (
        <>
          <div className="filter-group">
            <label htmlFor="regionSelect"><strong>Filter by Region:</strong></label>
            <select
              id="regionSelect"
              value={selectedRegion}
              onChange={(e) => setSelectedRegion(e.target.value)}
            >
              <option value="">-- All Regions --</option>
              {regions.map(region => (
                <option key={region} value={region}>{region}</option>
              ))}
            </select>
          </div>

          <div className="filter-group">
            <label htmlFor="warehouseSelect"><strong>Select a Warehouse:</strong></label>
            <select
              id="warehouseSelect"
              value={selectedId}
              onChange={(e) => setSelectedId(e.target.value)}
            >
              <option value="">-- Choose --</option>
              {filteredData.map(wh => (
                <option key={wh._id} value={wh._id}>
                  {wh.name}
                </option>
              ))}
            </select>
          </div>

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

          {selectedWarehouse && (
            <div className="drilldown">
              <h3>📍 {selectedWarehouse.name} Details</h3>

              <ResponsiveContainer width="100%" height={250}>
                <BarChart data={[{
                  name: selectedWarehouse.name,
                  capacityUsed: selectedWarehouse.capacityUsed ?? 0,
                  totalCapacity: selectedWarehouse.totalCapacity ?? 0
                }]}>
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
                    data={[{
                      name: 'Income',
                      value: selectedWarehouse.incomeEarned ?? 0
                    }]}
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
}

export default WarehouseOverview;