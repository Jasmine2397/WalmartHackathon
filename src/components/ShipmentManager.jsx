import React, { useState, useEffect } from "react";
import "./ShipmentManager.css";

// Mock drivers
const mockDrivers = ["Amit", "Riya", "Carlos", "Neha", "John"];

// Mock mapping of coordinates to city names
const cityLookup = {
  "26.4499,80.3319": "Kanpur",
  "26.8467,80.9462": "Lucknow",
  "28.6139,77.2090": "Delhi",
  "27.1767,78.0081": "Agra",
  "26.9124,75.7873": "Jaipur",
  "28.9845,77.7064": "Meerut",
  "25.3176,82.9739": "Varanasi",
  "26.7606,83.3732": "Gorakhpur",
  "29.0594,76.0856": "Rohtak",
  "27.5045,77.6850": "Mathura",
  "28.6692,77.4521": "Ghaziabad"
};

const ShipmentManager = ({ routeCoords = [] }) => {
  const [assignments, setAssignments] = useState({});
  const [packages, setPackages] = useState([]);

  useEffect(() => {
    // Generate packages from route coordinates
    const newPackages = routeCoords.map(([lat, lng], index) => {
      const key = `${lat.toFixed(4)},${lng.toFixed(4)}`;
      const locationName = cityLookup[key] || `Stop ${index + 1}`;
      return {
        id: `PKG-${locationName}`,
        location: locationName
      };
    });
    setPackages(newPackages);
  }, [routeCoords]);

  const handleAssign = (pkgId, driver) => {
    setAssignments((prev) => ({ ...prev, [pkgId]: driver }));
  };

  return (
    <div className="shipment-manager">
      <h2>📦 Shipment Assignments</h2>
      {packages.map(({ id, location }) => (
        <div key={id} className="shipment-row">
          <span>{id} → {location}</span>
          <select
            onChange={(e) => handleAssign(id, e.target.value)}
            value={assignments[id] || ""}
          >
            <option value="">Assign driver</option>
            {mockDrivers.map((driver) => (
              <option key={driver} value={driver}>
                {driver}
              </option>
            ))}
          </select>
        </div>
      ))}
    </div>
  );
};

export default ShipmentManager;