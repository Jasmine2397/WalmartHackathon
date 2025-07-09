import React, { useState } from "react";
import jsPDF from "jspdf";
import "jspdf-autotable";
import "./PayrollCalculator.css";

const initialPayroll = [
  { name: "Amit Kumar", role: "Driver", hours: 58, rate: 200, deductions: 400, paid: false },
  { name: "Neha Verma", role: "Dispatcher", hours: 47, rate: 180, deductions: 0, paid: true },
  { name: "Raj Singh", role: "Loader", hours: 62, rate: 150, deductions: 250, paid: false },
  { name: "Priya Chauhan", role: "Driver", hours: 45, rate: 200, deductions: 0, paid: true }
];

const PayrollCalculator = () => {
  const [payroll, setPayroll] = useState(initialPayroll);
  const [roleFilter, setRoleFilter] = useState("All");
  const [statusFilter, setStatusFilter] = useState("All");
  const [selectedSlip, setSelectedSlip] = useState(null);

  const togglePaid = (index) => {
    const updated = [...payroll];
    updated[index].paid = !updated[index].paid;
    setPayroll(updated);
  };

  const filteredPayroll = payroll.filter(emp => {
    return (roleFilter === "All" || emp.role === roleFilter) &&
           (statusFilter === "All" || (statusFilter === "Paid") === emp.paid);
  });

  const exportCSV = () => {
    const rows = [["Name", "Role", "Hours", "Rate", "Gross", "Deductions", "Net", "Status"]];
    filteredPayroll.forEach(emp => {
      const gross = emp.hours * emp.rate;
      const net = gross - emp.deductions;
      rows.push([
        emp.name, emp.role, emp.hours, emp.rate,
        gross, emp.deductions, net,
        emp.paid ? "Paid" : "Unpaid"
      ]);
    });

    const csvContent = "data:text/csv;charset=utf-8," + rows.map(e => e.join(",")).join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "payroll_summary.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const exportPDF = () => {
    const doc = new jsPDF();
    doc.text("Payroll Summary", 14, 16);
    const rows = filteredPayroll.map(emp => {
      const gross = emp.hours * emp.rate;
      const net = gross - emp.deductions;
      return [
        emp.name, emp.role, emp.hours, `₹${emp.rate}`,
        `₹${gross}`, `₹${emp.deductions}`, `₹${net}`,
        emp.paid ? "Paid" : "Unpaid"
      ];
    });
    doc.autoTable({
      head: [["Name", "Role", "Hours", "Rate", "Gross", "Deductions", "Net", "Status"]],
      body: rows,
      startY: 20
    });
    doc.save("payroll_summary.pdf");
  };

  return (
    <div className="payroll-card">
      <h3 className="payroll-title">💸 Salary & Payroll System</h3>

      <div className="payroll-filters">
        <select value={roleFilter} onChange={(e) => setRoleFilter(e.target.value)}>
          <option value="All">All Roles</option>
          <option value="Driver">Driver</option>
          <option value="Dispatcher">Dispatcher</option>
          <option value="Loader">Loader</option>
        </select>

        <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}>
          <option value="All">All Statuses</option>
          <option value="Paid">Paid</option>
          <option value="Unpaid">Unpaid</option>
        </select>

        <button className="export-button" onClick={exportCSV}>📤 Export CSV</button>
        <button className="export-button" onClick={exportPDF}>🧾 Export PDF</button>
      </div>

      <table className="payroll-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Role</th>
            <th>Hours</th>
            <th>Rate</th>
            <th>Gross</th>
            <th>Deductions</th>
            <th>Net</th>
            <th>Status</th>
            <th>Slip</th>
          </tr>
        </thead>
        <tbody>
          {filteredPayroll.map((emp, idx) => {
            const gross = emp.hours * emp.rate;
            const net = gross - emp.deductions;
            return (
              <tr key={idx}>
                <td>{emp.name}</td>
                <td>{emp.role}</td>
                <td>{emp.hours}</td>
                <td>₹{emp.rate}</td>
                <td>₹{gross}</td>
                <td>₹{emp.deductions}</td>
                <td>₹{net}</td>
                <td>
                  <button
                    className={`status-button ${emp.paid ? "paid" : "unpaid"}`}
                    onClick={() => togglePaid(idx)}
                  >
                    {emp.paid ? "Paid" : "Unpaid"}
                  </button>
                </td>
                <td>
                  <button className="slip-button" onClick={() => setSelectedSlip(emp)}>📄</button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>

      {selectedSlip && (
        <div className="salary-slip-modal" onClick={() => setSelectedSlip(null)}>
          <div className="salary-slip-card" onClick={(e) => e.stopPropagation()}>
            <h4>Salary Slip: {selectedSlip.name}</h4>
            <p><strong>Role:</strong> {selectedSlip.role}</p>
            <p><strong>Hours Worked:</strong> {selectedSlip.hours}</p>
            <p><strong>Rate:</strong> ₹{selectedSlip.rate}</p>
            <p><strong>Gross Pay:</strong> ₹{selectedSlip.hours * selectedSlip.rate}</p>
            <p><strong>Deductions:</strong> ₹{selectedSlip.deductions}</p>
            <p><strong>Net Salary:</strong> ₹{selectedSlip.hours * selectedSlip.rate - selectedSlip.deductions}</p>
            <p><strong>Status:</strong> {selectedSlip.paid ? "Paid ✅" : "Unpaid ⏳"}</p>
            <button onClick={() => setSelectedSlip(null)}>Close</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default PayrollCalculator;