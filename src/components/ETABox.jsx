import React, { useEffect, useState } from "react";
import "./ETABox.css";

// Mock function to calculate ETA between stops
const calculateSegmentETAs = (routeCoords) => {
  const mockAverageSpeedKmph = 50;
  const mockDelays = ["Clear skies", "Traffic", "Light rain", "Fog", "Sunny"];
  const segmentETAs = [];

  for (let i = 0; i < routeCoords.length - 1; i++) {
    const [lat1, lon1] = routeCoords[i];
    const [lat2, lon2] = routeCoords[i + 1];

    const distanceKm = Math.sqrt(
      Math.pow(lat2 - lat1, 2) + Math.pow(lon2 - lon1, 2)
    ) * 111; // rough conversion to km

    const travelTimeHr = distanceKm / mockAverageSpeedKmph;
    const minutes = Math.round(travelTimeHr * 60);

    segmentETAs.push({
      from: `Stop ${i + 1}`,
      to: `Stop ${i + 2}`,
      eta: `${minutes} mins`,
      factor: mockDelays[i % mockDelays.length]
    });
  }

  return segmentETAs;
};

const ETABox = ({ routeCoords = [] }) => {
  const [segmentData, setSegmentData] = useState([]);

  useEffect(() => {
    if (routeCoords.length >= 2) {
      const data = calculateSegmentETAs(routeCoords);
      setSegmentData(data);
    } else {
      setSegmentData([]);
    }
  }, [routeCoords]);

  return (
    <div className="eta-box">
      <h2>⏱️ Estimated Segment ETAs</h2>
      {segmentData.length > 0 ? (
        <ul>
          {segmentData.map((seg, index) => (
            <li key={index}>
              <strong>{seg.from} ➞ {seg.to}:</strong> {seg.eta}  
              <br />
              <small>Factor: {seg.factor}</small>
            </li>
          ))}
        </ul>
      ) : (
        <p>No route selected. Please plan a route to view ETA breakdown.</p>
      )}
    </div>
  );
};

export default ETABox;