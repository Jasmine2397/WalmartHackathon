import React, { useState } from "react";
import "./RouteOptimizer.css";

// Coordinates for individual cities (used for multi-stop routing)
const mockLocationCoords = {
  kanpur: [26.4499, 80.3319],
  lucknow: [26.8467, 80.9462],
  delhi: [28.6139, 77.2090],
  agra: [27.1767, 78.0081],
  jaipur: [26.9124, 75.7873],
  meerut: [28.9845, 77.7064],
  varanasi: [25.3176, 82.9739],
  gorakhpur: [26.7606, 83.3732],
  rohtak: [29.0594, 76.0856],
  mathura: [27.5045, 77.6850],
  ghaziabad: [28.6692, 77.4521]
};

// Helper to standardize input
const normalize = (str) =>
  str.trim().toLowerCase().replace(/\s+/g, "");

const RouteOptimizer = ({ setMapRoute }) => {
  const [origin, setOrigin] = useState("");
  const [destinations, setDestinations] = useState("");
  const [suggestedRoute, setSuggestedRoute] = useState("");

  const handlePlan = () => {
    const originKey = normalize(origin);
    const destinationList = destinations
      .split(",")
      .map((d) => normalize(d))
      .filter((d) => d.length > 0);

    const allCoords = [];

    // Add origin if valid
    if (mockLocationCoords[originKey]) {
      allCoords.push(mockLocationCoords[originKey]);
    }

    // Add destinations in order
    destinationList.forEach((loc) => {
      if (mockLocationCoords[loc]) {
        allCoords.push(mockLocationCoords[loc]);
      }
    });

    if (!origin || destinationList.length === 0) {
      setSuggestedRoute("❌ Please enter origin and at least one destination.");
      setMapRoute([]);
    } else if (allCoords.length >= 2) {
      setSuggestedRoute(
        `📍 Optimized route from ${origin} to ${destinationList.join(", ")} loaded.`
      );
      setMapRoute(allCoords);
    } else {
      setSuggestedRoute("⚠️ Could not find coordinates for all locations entered.");
      setMapRoute([]);
    }
  };

  return (
    <div className="route-optimizer-card">
      <h3 className="planner-title">🧠 AI Multi-Stop Planner</h3>
      <div className="route-grid">
        <input
          type="text"
          placeholder="Origin"
          value={origin}
          onChange={(e) => setOrigin(e.target.value)}
        />
        <input
          type="text"
          placeholder="Destinations (comma separated)"
          value={destinations}
          onChange={(e) => setDestinations(e.target.value)}
        />
        <button onClick={handlePlan}>Plan Route</button>
      </div>
      {suggestedRoute && <p className="route-output">{suggestedRoute}</p>}
    </div>
  );
};

export default RouteOptimizer;