import React from "react";
import "./DeliveryKPIs.css";

const kpiData = [
  { label: "Live Deliveries", value: 12, icon: "🚛" },
  { label: "Avg. ETA", value: "42 min", icon: "⏱️" },
  { label: "On-Time %", value: "92%", icon: "📦" },
  { label: "Delayed", value: 3, icon: "⚠️" }
];

const DeliveryKPIs = () => {
  return (
    <div className="kpi-container">
      {kpiData.map((kpi, index) => (
        <div className="kpi-card" key={index}>
          <div className="kpi-icon">{kpi.icon}</div>
          <div className="kpi-value">{kpi.value}</div>
          <div className="kpi-label">{kpi.label}</div>
        </div>
      ))}
    </div>
  );
};

export default DeliveryKPIs;