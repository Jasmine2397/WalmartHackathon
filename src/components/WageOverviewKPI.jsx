import React, { useEffect, useState } from "react";
import "./WageOverviewKPI.css";

const kpiMetrics = [
  { label: "Total Payroll", value: 84500, icon: "💰", prefix: "₹" },
  { label: "Avg. Hours/Employee", value: 42, icon: "⏱️" },
  { label: "Active Employees", value: 18, icon: "👷" },
  { label: "Overwork Alerts", value: 3, icon: "⚠️" }
];

// Animated Counter Component
const AnimatedNumber = ({ value, prefix = "" }) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let current = 0;
    const step = Math.max(1, Math.ceil(value / 20));
    const interval = setInterval(() => {
      current += step;
      if (current >= value) {
        current = value;
        clearInterval(interval);
      }
      setCount(current);
    }, 40);

    return () => clearInterval(interval);
  }, [value]);

  return <div className="wage-kpi-value">{prefix}{count}</div>;
};

const WageOverviewKPI = () => {
  return (
    <div className="wage-kpi-container">
      {kpiMetrics.map((kpi, i) => (
        <div className="wage-kpi-card" key={i}>
          <div className="wage-kpi-icon">{kpi.icon}</div>
          <AnimatedNumber value={kpi.value} prefix={kpi.prefix || ""} />
          <div className="wage-kpi-label">{kpi.label}</div>
        </div>
      ))}
    </div>
  );
};

export default WageOverviewKPI;