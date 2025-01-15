import { Send } from "lucide-react";

export default function SubmitButton() {
  return (
    <button
      type="submit"
      className="w-full bg-blue-600 text-white py-3 px-4 rounded-md hover:bg-blue-700 flex items-center justify-center gap-2"
    >
      <Send className="w-5 h-5" />
      Submit Report
    </button>
  );
}
