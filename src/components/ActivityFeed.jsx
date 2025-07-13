import React from 'react';

const recentEvents = [
  'Restocking triggered for Warehouse A',
  'ETA update: Delivery route #5 delayed 15 min',
  'Driver #23 marked fatigue alert',
  'New supplier request received: 3 bulk orders',
  'Inventory mismatch flagged in zone C'
];

function ActivityFeed() {
  return (
    <section className="activity-feed">
      <h3>📋 Recent Activity</h3>
      <ul>
        {recentEvents.map((event, idx) => (
          <li key={idx}>{event}</li>
        ))}
      </ul>
    </section>
  );
}

export default ActivityFeed;