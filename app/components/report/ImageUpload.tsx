import { Camera } from "lucide-react";

type ImageUploadProps = {
  image: File | null;
  setImage: React.Dispatch<React.SetStateAction<File | null>>;
};

export default function ImageUpload({ image, setImage }: ImageUploadProps) {
  return (
    <div className="bg-white rounded-lg shadow p-4">
      <label className="block mb-2 font-medium">Add Photo</label>
      <div className="flex items-center gap-2">
        <label className="flex items-center gap-2 px-4 py-2 bg-gray-100 rounded-md cursor-pointer hover:bg-gray-200">
          <Camera className="w-5 h-5" />
          <span>Upload Photo</span>
          <input
            type="file"
            accept="image/*"
            className="hidden"
            onChange={(e) =>
              setImage(e.target.files ? e.target.files[0] : null)
            }
          />
        </label>
        {image && <span className="text-sm text-gray-600">{image.name}</span>}
      </div>
    </div>
  );
}
