import React, { useState } from "react";
import "./DeliveryPage.css";
// import Navbar from "../components/Navbar"; // Uncomment if needed globally
import MapTracker from "../components/MapTracker";
import RouteOptimizer from "../components/RouteOptimizer";
import ETABox from "../components/ETABox";
import ShipmentManager from "../components/ShipmentManager";
import DeliveryKPIs from "../components/DeliveryKPIs";
import DeliveryChart from "../components/DeliveryChart";

const DeliveryPage = () => {
  const [routeCoords, setRouteCoords] = useState([]); // Route preview state

  return (
    <div className="delivery-page">
      <div className="page-header">
        <h1>🚚 Delivery Optimization Dashboard</h1>
        <p className="subheading">
          Real-time delivery tracking, route planning, and operational insights
        </p>
      </div>

      {/* KPI Cards */}
      <div className="kpi-section">
        <DeliveryKPIs />
      </div>

      {/* Map + Route Optimizer */}
      <div className="two-column-grid">
        <div className="card">
          <MapTracker routeCoords={routeCoords} />
        </div>
        <div className="card">
          <RouteOptimizer setMapRoute={setRouteCoords} />
        </div>
      </div>

      {/* ETA + Shipment Table */}
      <div className="two-column-grid">
        <div className="card eta-card">
          <ETABox routeCoords={routeCoords} />
        </div>
        <div className="card assignment-card">
          <ShipmentManager routeCoords={routeCoords} />
        </div>
      </div>

      {/* Delivery Trend Chart */}
      <div className="card full-width">
        <DeliveryChart />
      </div>

      <footer className="last-updated">
        Last updated: {new Date().toLocaleTimeString()}
      </footer>
    </div>
  );
};

export default DeliveryPage;
