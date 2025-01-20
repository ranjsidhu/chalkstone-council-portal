"use client";

import { MapContainer, TileLayer, Marker, useMapEvents } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { icon } from "leaflet";

// Fix the marker icon issue
const defaultIcon = icon({
  iconUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
  iconRetinaUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png",
  shadowUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});

type MapProps = {
  position: [number, number];
  // eslint-disable-next-line no-unused-vars
  onLocationSelect: (lat: number, lng: number) => void;
};

function LocationMarker({ position, onLocationSelect }: MapProps) {
  useMapEvents({
    click(e) {
      const { lat, lng } = e.latlng;
      onLocationSelect(lat, lng);
    },
  });

  return position ? <Marker position={position} icon={defaultIcon} /> : null;
}

export default function Map({ position, onLocationSelect }: MapProps) {
  return (
    <MapContainer center={position} zoom={13} className="h-full w-full">
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      <LocationMarker position={position} onLocationSelect={onLocationSelect} />
    </MapContainer>
  );
}
