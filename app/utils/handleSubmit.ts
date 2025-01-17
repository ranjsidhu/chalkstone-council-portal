import toast from "react-hot-toast";
import { v4 as uuidv4 } from "uuid";
import { type IssueSelectOptionType } from "../types";

const handleSubmit = async (
  e: React.FormEvent,
  values: {
    position: number[];
    issue: IssueSelectOptionType;
    description: string;
    image: File | null;
    address: string;
  },
  resetForm: () => void
) => {
  e.preventDefault();
  try {
    const image_filename = uuidv4();
    let image_type = null;
    if (values.position[0] === 0 && values.position[1] === 0) {
      toast.error("Please select a location on the map");
      return;
    }

    if (values.image) {
      image_type = values.image.name.split(".").pop();
    }

    await fetch("/api/issues", {
      method: "POST",
      body: JSON.stringify({
        ...values,
        image_filename: `${image_filename}.${image_type}`,
        created_at: new Date().toISOString(),
      }),
    });

    // toast.success("Thank you for your enquiry. We will be in touch shortly.");
    toast.success("Issue created successfully. Uploading image...");

    if (values.image && image_type) {
      const formData = new FormData();
      formData.append("image", values.image);
      formData.append("filename", `${image_filename}.${image_type}`);

      const uploadResponse = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      if (!uploadResponse.ok) {
        throw new Error("Failed to upload image");
      }
    }

    toast.success("Image uploaded successfully!");
  } catch (error: any) {
    toast.error("Error submitting issue:", error);
  } finally {
    resetForm();
  }
};

export default handleSubmit;
