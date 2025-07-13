import React from 'react';

const summaryCards = [
  { title: 'Inventory Summary', info: '1,284 Items • 5 Low Stock' },
  { title: 'Delivery Performance', info: '17 In Transit • 93% On-Time' },
  { title: 'Wage Utilization', info: '3 Overworked • 78% Optimal Use' },
  { title: 'Restocking System', info: 'Next Batch: Thu • 62% Stock Synced' },
  { title: 'Alerts & Incidents', info: '2 Critical • 5 Resolved Today' },
  { title: 'Transport Recs', info: 'AI: Optimize Route 2 & 5' }
];

function SummaryGrid() {
  return (
    <section className="summary-grid">
      {summaryCards.map((card, idx) => (
        <div key={idx} className="summary-tile">
          <h4>{card.title}</h4>
          <p>{card.info}</p>
        </div>
      ))}
    </section>
  );
}

export default SummaryGrid;