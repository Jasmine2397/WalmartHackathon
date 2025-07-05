import React from "react";
import "./DeliveryPage.css";
import Navbar from "../components/Navbar";
import MapTracker from "../components/MapTracker";
import RouteOptimizer from "../components/RouteOptimizer";
import ETABox from "../components/ETABox";
import ShipmentManager from "../components/ShipmentManager";

const DeliveryPage = () => {
  return (
    <div className="delivery-page">
      <h1>🚛 Delivery Optimization Dashboard</h1>
      <div className="delivery-grid">
        <div className="component-card"><MapTracker /></div>
        <div className="component-card"><RouteOptimizer /></div>
        <div className="component-card"><ETABox /></div>
        <div className="component-card"><ShipmentManager /></div>
      </div>
    </div>
  );
};

export default DeliveryPage;