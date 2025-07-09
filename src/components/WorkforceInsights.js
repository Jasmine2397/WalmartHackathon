import React from "react";
import "./WorkforceInsights.css";

const insightsData = {
  expectedDeliveries: 240,
  idealWorkers: 16,
  actualAssigned: 13,
  status: "Understaffed",
  suggestion: "Add 3 workers to evening shift to avoid delays."
};

const WorkforceInsights = () => {
  const { expectedDeliveries, idealWorkers, actualAssigned, status, suggestion } = insightsData;

  return (
    <div className="insights-card">
      <h3 className="insights-title">🧠 Workforce Estimator</h3>
      <div className="insights-grid">
        <div>
          <span className="insights-label">Expected Deliveries:</span>
          <span className="insights-value">{expectedDeliveries}</span>
        </div>
        <div>
          <span className="insights-label">Ideal Workforce:</span>
          <span className="insights-value">{idealWorkers}</span>
        </div>
        <div>
          <span className="insights-label">Currently Assigned:</span>
          <span className="insights-value">{actualAssigned}</span>
        </div>
        <div>
          <span className="insights-label">Status:</span>
          <span className={`insights-status ${status.toLowerCase()}`}>{status}</span>
        </div>
      </div>
      <p className="insights-suggestion">💡 {suggestion}</p>
    </div>
  );
};

export default WorkforceInsights;