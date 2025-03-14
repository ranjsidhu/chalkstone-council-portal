export default function Loading() {
  return (
    <div className="max-w-4xl mx-auto p-4 space-y-4">
      <div className="underline text-gray-400 w-16">Back</div>
      {[1, 2, 3].map((i) => (
        <div
          key={i}
          className="animate-pulse bg-gray-100 rounded-lg p-6 space-y-3"
        >
          <div className="h-4 bg-gray-200 rounded w-1/4"></div>
          <div className="h-4 bg-gray-200 rounded w-1/2"></div>
          <div className="h-4 bg-gray-200 rounded w-3/4"></div>
        </div>
      ))}
    </div>
  );
}
