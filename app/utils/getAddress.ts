"use server";

import toast from "react-hot-toast";

/**
 * Get address from lat and lng
 * @param lat <number> latitude
 * @param lng <number> longitude
 * @returns address as a string
 */
const getAddress = async (lat: number, lng: number) => {
  try {
    const response = await fetch(
      `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}`
    );
    const data = await response.json();
    return data.display_name;
  } catch (error: any) {
    toast.error("Error fetching address:", error);
  }
};

export default getAddress;
