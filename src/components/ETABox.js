import React from 'react';
import './ETABox.css';

const ETABox = () => {
  // For now, we’ll just display a static ETA.
  const eta = '1 hr 34 mins';
  const factors = 'Traffic + moderate rain';

  return (
    <div className="eta-box">
      <h2>⏱️ Estimated Delivery Time</h2>
      <p><strong>{eta}</strong></p>
      <small>Factors considered: {factors}</small>
    </div>
  );
};

export default ETABox;