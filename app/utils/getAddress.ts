"use server";

import toast from "react-hot-toast";

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
