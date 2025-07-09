import React from "react";
import "./FatigueAlerts.css";

const fatigueData = [
  { name: "Amit Kumar", hours: 58, daysWorked: 6, risk: "High" },
  { name: "Neha Verma", hours: 47, daysWorked: 5, risk: "Moderate" },
  { name: "Raj Singh", hours: 62, daysWorked: 7, risk: "Critical" }
];

const FatigueAlerts = () => {
  return (
    <div className="fatigue-card">
      <h3 className="fatigue-title">⛑️ Fatigue & Overwork Alerts</h3>
      <table className="fatigue-table">
        <thead>
          <tr>
            <th>Employee</th>
            <th>Hours Worked</th>
            <th>Days Worked</th>
            <th>Risk Level</th>
          </tr>
        </thead>
        <tbody>
          {fatigueData.map((emp, idx) => (
            <tr key={idx} className={emp.risk.toLowerCase()}>
              <td>{emp.name}</td>
              <td>{emp.hours} hrs</td>
              <td>{emp.daysWorked}</td>
              <td>
                <span className={`risk-tag ${emp.risk.toLowerCase()}`}>
                  {emp.risk}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <p className="fatigue-note">
        💡 Tip: Encourage weekly breaks and rotate high-hour roles to reduce burnout.
      </p>
    </div>
  );
};

export default FatigueAlerts;