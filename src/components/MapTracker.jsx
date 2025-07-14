import React from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  Polyline,
  Tooltip
} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import "./MapTracker.css";

// Fix default icon issues in Leaflet + Webpack
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: "https://unpkg.com/leaflet@1.9.3/dist/images/marker-icon-2x.png",
  iconUrl: "https://unpkg.com/leaflet@1.9.3/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.3/dist/images/marker-shadow.png"
});

const MapTracker = ({ routeCoords = [] }) => {
  const center = [26.4499, 80.3319]; // Kanpur

  return (
    <div className="map-container">
      <MapContainer center={center} zoom={6} scrollWheelZoom={false} style={{ height: "400px", width: "100%" }}>
        <TileLayer
          attribution='&copy; <a href="https://osm.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        <Marker position={center}>
          <Popup>
            Kanpur Delivery Center 🚚 <br /> Live dispatch hub.
          </Popup>
        </Marker>

        {routeCoords.map((coord, index) => {
          let label = "📦 Drop " + index;
          if (index === 0) label = "🟢 Start";
          else if (index === routeCoords.length - 1) label = "🔴 Final Stop";

          return (
            <Marker position={coord} key={index}>
              <Tooltip direction="top" offset={[0, -10]} permanent>
                {label}
              </Tooltip>
            </Marker>
          );
        })}

        {routeCoords.length > 1 && (
          <Polyline
            positions={routeCoords}
            pathOptions={{ color: "#0071ce", weight: 4, dashArray: "6 6" }}
          />
        )}
      </MapContainer>
    </div>
  );
};

export default MapTracker;