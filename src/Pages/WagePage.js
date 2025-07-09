import React from "react";
import "./WagePage.css";
import WageOverviewKPI from "../components/WageOverviewKPI";
import WorkforceInsights from "../components/WorkforceInsights";
import EmployeeShiftTable from "../components/EmployeeShiftTable";
import FatigueAlerts from "../components/FatigueAlerts";
import PayrollCalculator from "../components/PayrollCalculator";

const WagePage = () => {
  return (
    <div className="wage-page">
      <div className="page-header">
        <h1>💼 Workforce & Wage Optimization</h1>
        <p className="subheading">
          Schedule smart shifts, prevent fatigue, and automate salary breakdowns.
        </p>
      </div>

      {/* KPI + Workforce Estimator */}
      <div className="two-column-grid">
        <div className="card"><WageOverviewKPI /></div>
        <div className="card"><WorkforceInsights /></div>
      </div>

      {/* Shift Table + Fatigue Alerts */}
      <div className="two-column-grid">
        <div className="card"><EmployeeShiftTable /></div>
        <div className="card"><FatigueAlerts /></div>
      </div>

      {/* Payroll Calculator */}
      <div className="card full-width"><PayrollCalculator /></div>

      <footer className="last-updated">
        Last updated: {new Date().toLocaleTimeString()}
      </footer>
    </div>
  );
};

export default WagePage;