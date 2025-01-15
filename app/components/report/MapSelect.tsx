import dynamic from "next/dynamic";
import { MapPin } from "lucide-react";
import { getAddress } from "@/app/utils";

type MapSelectProps = {
  position: number[];
  address: string;
  loading: boolean;
  setPosition: React.Dispatch<React.SetStateAction<number[]>>;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
  setAddress: React.Dispatch<React.SetStateAction<string>>;
};

// Dynamically import the Map component with no SSR
const Map = dynamic(() => import("./Map"), { ssr: false });

export default function MapSelect({
  position,
  address,
  loading,
  setPosition,
  setLoading,
  setAddress,
}: MapSelectProps) {
  const handleLocationSelect = async (lat: number, lng: number) => {
    setPosition([lat, lng]);
    setLoading(true);
    try {
      await getAddress(lat, lng).then((address) => setAddress(address));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow p-4">
      <label className="block mb-2 font-medium">Select Location</label>
      <div className="h-[300px] rounded-lg overflow-hidden">
        <Map
          position={position as [number, number]}
          onLocationSelect={handleLocationSelect}
        />
      </div>
      <p className="mt-2 text-sm text-gray-500 flex items-center gap-1">
        <MapPin className="w-4 h-4" />
        Click on the map to set the issue location
      </p>
      {loading && (
        <div className="p-2 bg-gray-50 rounded-md">
          <p className="text-sm text-gray-700">Fetching address...</p>
        </div>
      )}
      {!loading && address && (
        <div className="p-2 bg-gray-50 rounded-md">
          <p className="text-sm text-gray-700">Selected location: {address}</p>
        </div>
      )}
    </div>
  );
}
