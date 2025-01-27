import { Camera, X } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";
import { IMAGE_UPLOAD_CONFIG } from "@/test_configs";

type ImageUploadProps = {
  image: File | null;
  setImage: React.Dispatch<React.SetStateAction<File | null>>;
};

export default function ImageUpload({ image, setImage }: ImageUploadProps) {
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  /**
   * Sets the preview URL when an image is uploaded.
   * If the image is null, it will set the preview URL to null.
   */
  useEffect(() => {
    if (!image) {
      setPreviewUrl(null);
      return;
    }

    const url = URL.createObjectURL(image);
    setPreviewUrl(url);

    // Cleanup
    return () => URL.revokeObjectURL(url);
  }, [image]);

  const handleRemoveImage = () => {
    setImage(null);
    setPreviewUrl(null);
  };

  return (
    <div
      className="bg-white rounded-lg shadow p-4"
      data-testid={IMAGE_UPLOAD_CONFIG.container}
    >
      <label className="block mb-2 font-medium">Add Photo</label>
      <div className="space-y-4">
        {previewUrl ? (
          <div className="relative w-full max-w-md">
            <Image
              data-testid={IMAGE_UPLOAD_CONFIG.previewImage}
              width={800}
              height={600}
              src={previewUrl}
              alt="Preview"
              className="w-full h-auto"
            />
            <button
              data-testid={IMAGE_UPLOAD_CONFIG.removeButton}
              onClick={handleRemoveImage}
              className="absolute top-2 right-2 p-1 bg-white rounded-full shadow hover:bg-gray-100"
              type="button"
            >
              <X className="w-5 h-5 text-gray-600" />
            </button>
          </div>
        ) : (
          <div className="flex items-center gap-2">
            <label className="flex items-center gap-2 px-4 py-2 bg-gray-100 rounded-md cursor-pointer hover:bg-gray-200">
              <Camera className="w-5 h-5" />
              <span data-testid={IMAGE_UPLOAD_CONFIG.uploadPhotoText}>
                Upload Photo
              </span>
              <input
                data-testid={IMAGE_UPLOAD_CONFIG.fileInput}
                type="file"
                accept="image/*"
                className="hidden"
                onChange={(e) =>
                  setImage(e.target.files ? e.target.files[0] : null)
                }
              />
            </label>
          </div>
        )}
        {image && (
          <p
            data-testid={IMAGE_UPLOAD_CONFIG.previewName}
            className="text-sm text-gray-600"
          >
            {image.name}
          </p>
        )}
      </div>
    </div>
  );
}
