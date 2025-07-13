import React from 'react';
import './RetailSpotlight.css';

function RetailSpotlight() {
  return (
    <section className="retail-spotlight">
      <h3>🏪 Retail Spotlight: Walmart in Numbers</h3>

      <div className="spotlight-content">
        <div className="facts">
          <ul>
            <li>• Operates over <strong>10,750 stores</strong> in 19 countries</li>
            <li>• Moves over <strong>100 billion items</strong> per year through its supply chain</li>
            <li>• Uses <strong>autonomous robots</strong> for shelf scanning and floor cleaning</li>
          </ul>
        </div>

        <div className="spotlight-images">
          <img src="/assets/walmart-store.jpg" alt="Walmart storefront" />
          <img src="/assets/walmart-robot.jpg" alt="Walmart robot in action" />
        </div>
      </div>
    </section>
  );
}

export default RetailSpotlight;