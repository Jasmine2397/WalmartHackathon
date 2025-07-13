import React, { useEffect, useState } from "react";
import "./DeliveryKPIs.css";

const kpiData = [
  { label: "Live Deliveries", value: 12, icon: "🚛", percentage: 70 },
  { label: "Avg. ETA", value: "42 min", icon: "⏱️", percentage: 60 },
  { label: "On-Time %", value: "92%", icon: "📦", percentage: 92 },
  { label: "Delayed", value: 3, icon: "⚠️", percentage: 20 }
];

const CircularProgress = ({ percentage, color }) => {
  const radius = 28;
  const stroke = 6;
  const normalizedRadius = radius - stroke;
  const circumference = normalizedRadius * 2 * Math.PI;

  const strokeDashoffset = circumference - (percentage / 100) * circumference;

  return (
    <svg height={radius * 2} width={radius * 2} className="progress-ring">
      <circle
        stroke="#e6ecf5"
        fill="transparent"
        strokeWidth={stroke}
        r={normalizedRadius}
        cx={radius}
        cy={radius}
      />
      <circle
        stroke={color || "#0071ce"}
        fill="transparent"
        strokeWidth={stroke}
        strokeLinecap="round"
        strokeDasharray={circumference + " " + circumference}
        strokeDashoffset={strokeDashoffset}
        r={normalizedRadius}
        cx={radius}
        cy={radius}
        className="progress-ring__circle"
      />
    </svg>
  );
};

const DeliveryKPIs = () => {
  return (
    <div className="kpi-container">
      {kpiData.map((kpi, index) => (
        <div className="kpi-card" key={index}>
          <div className="kpi-ring">
            <CircularProgress percentage={kpi.percentage} />
            <span className="kpi-icon">{kpi.icon}</span>
          </div>
          <div className="kpi-value">{kpi.value}</div>
          <div className="kpi-label">{kpi.label}</div>
        </div>
      ))}
    </div>
  );
};

export default DeliveryKPIs;