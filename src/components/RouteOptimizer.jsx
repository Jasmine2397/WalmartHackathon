import React, { useState } from "react";
import "./RouteOptimizer.css";

// Mock coordinates for route preview
const mockRouteMap = {
  "kanpur-lucknow": [
    [26.4499, 80.3319], // Kanpur
    [26.8467, 80.9462], // Lucknow
  ],
  "kanpur-delhi": [
    [26.4499, 80.3319],
    [28.6139, 77.2090],
  ],
};

const RouteOptimizer = ({ setMapRoute }) => {
  const [origin, setOrigin] = useState("");
  const [destination, setDestination] = useState("");
  const [suggestedRoute, setSuggestedRoute] = useState("");

  const handlePlan = () => {
    const routeKey = `${origin.toLowerCase()}-${destination.toLowerCase()}`;
    const coords = mockRouteMap[routeKey];

    if (origin && destination) {
      setSuggestedRoute(`📍 Optimized route from ${origin} to ${destination} via Route 5`);
      if (coords) {
        setMapRoute(coords); // Pass route to MapTracker
      } else {
        setMapRoute([]);
      }
    } else {
      setSuggestedRoute("Please enter both origin and destination.");
      setMapRoute([]);
    }
  };

  return (
    <div className="route-optimizer-card">
      <h3 className="planner-title">🧠 AI Route Planner</h3>
      <div className="route-grid">
        <input
          type="text"
          placeholder="Origin"
          value={origin}
          onChange={(e) => setOrigin(e.target.value)}
        />
        <input
          type="text"
          placeholder="Destination"
          value={destination}
          onChange={(e) => setDestination(e.target.value)}
        />
        <button onClick={handlePlan}>Plan Route</button>
      </div>
      {suggestedRoute && <p className="route-output">{suggestedRoute}</p>}
    </div>
  );
};

export default RouteOptimizer;