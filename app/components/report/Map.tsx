"use client";

import { MapContainer, TileLayer, Marker, useMapEvents } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { icon } from "leaflet";
import { JSX } from "react";

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

/**
 * Renders a map with a marker at the specified position.
 * When the map is clicked, the marker will move to the clicked position.
 * @param position - The position of the marker on the map.
 * @param onLocationSelect - A function that is called when the marker is moved.
 * @returns {JSX.Element | null} A map with a marker or null if position is null.
 */
function LocationMarker({
  position,
  onLocationSelect,
}: MapProps): JSX.Element | null {
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
