type DescriptionProps = {
  description: string;
  setDescription: React.Dispatch<React.SetStateAction<string>>;
};

export default function Description({
  setDescription,
  description,
}: DescriptionProps) {
  return (
    <div className="bg-white rounded-lg shadow p-4">
      <label className="block mb-2 font-medium">Description</label>
      <textarea
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        className="w-full p-2 border rounded-md h-32"
        placeholder="Please provide details about the issue..."
        required
      />
    </div>
  );
}
