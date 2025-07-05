import React, { useState } from 'react';
import './Work.css';

const Work = () => {
  const [demand, setDemand] = useState('Medium');
  
  const estimateWorkforce = () => {
    if (demand === 'Low') return 3;
    if (demand === 'Medium') return 5;
    if (demand === 'High') return 8;
    return 0;
  };

  return (
    <div className="workforce-analyzer">
      <h2>📉 Minimum Workforce Estimator</h2>
      <label htmlFor="demand-level">Select Demand Level:</label>
      <select id="demand-level" value={demand} onChange={e => setDemand(e.target.value)}>
        <option value="Low">Low</option>
        <option value="Medium">Medium</option>
        <option value="High">High</option>
      </select>
      <div className="result">
        Estimated minimum staff needed: <strong>{estimateWorkforce()}</strong>
      </div>
    </div>
  );
};

export default Work;