import React from 'react';
import { ResponsiveLine } from '@nivo/line';
import './DemandForecast.css';

function DemandForecast() {
  const mockData = [
    {
      id: 'Predicted Demand',
      data: [
        { x: 'Mon', y: 30 },
        { x: 'Tue', y: 80 },
        { x: 'Wed', y: 65 },
        { x: 'Thu', y: 100 },
        { x: 'Fri', y: 90 },
      ],
    },
  ];

  return (
    <div className="chart-container">
      <ResponsiveLine
        data={mockData}
        margin={{ top: 20, right: 20, bottom: 50, left: 60 }}
        xScale={{ type: 'point' }}
        yScale={{ type: 'linear', min: 'auto', max: 'auto' }}
        axisBottom={{ legend: 'Day', legendOffset: 40 }}
        axisLeft={{ legend: 'Units', legendOffset: -50 }}
        colors={{ scheme: 'category10' }}
        lineWidth={3}
      />
    </div>
  );
}

export default DemandForecast;
