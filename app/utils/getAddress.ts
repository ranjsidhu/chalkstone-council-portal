import toast from "react-hot-toast";

const getAddress = async (
  lat: number,
  lng: number,
  setAddress: React.Dispatch<React.SetStateAction<string>>
) => {
  try {
    const response = await fetch(
      `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}`
    );
    const data = await response.json();
    setAddress(data.display_name);
  } catch (error: any) {
    toast.error("Error fetching address:", error);
    setAddress("Unable to fetch address");
  }
};

export default getAddress;
