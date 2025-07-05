import React, { useState } from 'react';
import './RouteOptimizer.css';

const RouteOptimizer = () => {
  const [origin, setOrigin] = useState('');
  const [destination, setDestination] = useState('');
  const [suggestedRoute, setSuggestedRoute] = useState('');

  const handlePlan = () => {
    // Mock route planner logic
    setSuggestedRoute(`Optimized route from ${origin} to ${destination} via Route 5`);
  };

  return (
    <div className="route-optimizer">
      <h2>🧠 AI Route Planner</h2>
      <input type="text" placeholder="Origin" value={origin} onChange={e => setOrigin(e.target.value)} />
      <input type="text" placeholder="Destination" value={destination} onChange={e => setDestination(e.target.value)} />
      <button onClick={handlePlan}>Plan Route</button>
      {suggestedRoute && <p className="route-output">{suggestedRoute}</p>}
    </div>
  );
};

export default RouteOptimizer;