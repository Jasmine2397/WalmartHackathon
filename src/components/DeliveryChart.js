import React from "react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

const data = [
  { day: "Mon", deliveries: 10 },
  { day: "Tue", deliveries: 14 },
  { day: "Wed", deliveries: 18 },
  { day: "Thu", deliveries: 12 },
  { day: "Fri", deliveries: 20 },
  { day: "Sat", deliveries: 9 },
  { day: "Sun", deliveries: 15 }
];

const DeliveryChart = () => {
  return (
    <div style={{ height: "300px", width: "100%" }}>
      <h3 style={{ marginBottom: "1rem" }}>📈 Weekly Delivery Volume</h3>
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="day" />
          <YAxis />
          <Tooltip />
          <Line type="monotone" dataKey="deliveries" stroke="#0071ce" strokeWidth={2} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default DeliveryChart;