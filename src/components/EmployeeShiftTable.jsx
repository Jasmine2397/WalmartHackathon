import React, { useState } from "react";
import "./EmployeeShiftTable.css";

const employees = [
  { name: "Amit Kumar", role: "Driver" },
  { name: "Neha Verma", role: "Dispatcher" },
  { name: "Raj Singh", role: "Loader" }
];

const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

const EmployeeShiftTable = () => {
  const [schedule, setSchedule] = useState(() =>
    employees.map(() =>
      days.map(() => false)
    )
  );

  const toggleShift = (empIdx, dayIdx) => {
    const updated = [...schedule];
    updated[empIdx][dayIdx] = !updated[empIdx][dayIdx];
    setSchedule(updated);
  };

  return (
    <div className="shift-table-card">
      <h3 className="shift-title">📅 Employee Shift Schedule</h3>
      <table className="shift-table">
        <thead>
          <tr>
            <th>Employee</th>
            {days.map((day, idx) => (
              <th key={idx}>{day}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {employees.map((emp, empIdx) => (
            <tr key={empIdx}>
              <td>
                <strong>{emp.name}</strong>
                <div className="shift-role">{emp.role}</div>
              </td>
              {days.map((_, dayIdx) => (
                <td key={dayIdx}>
                  <input
                    type="checkbox"
                    checked={schedule[empIdx][dayIdx]}
                    onChange={() => toggleShift(empIdx, dayIdx)}
                  />
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default EmployeeShiftTable;