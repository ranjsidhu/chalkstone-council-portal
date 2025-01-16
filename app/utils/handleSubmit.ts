import toast from "react-hot-toast";
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
    if (values.position[0] === 0 && values.position[1] === 0) {
      toast.error("Please select a location on the map");
      return;
    }
    const response = await fetch("/api/issues", {
      method: "POST",
      body: JSON.stringify({
        ...values,
        created_at: new Date().toISOString(),
      }),
    });
    if (response.ok) {
      toast.success("Thank you for your enquiry. We will be in touch shortly.");
    }
  } catch (error: any) {
    toast.error("Error submitting issue:", error);
  } finally {
    resetForm();
  }
};

export default handleSubmit;
