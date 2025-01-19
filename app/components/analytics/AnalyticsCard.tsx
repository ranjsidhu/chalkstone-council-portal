type AnalyticsCardProps = {
  cardTitle: string;
  cardData: string | number;
  icon: React.ReactNode;
};

export default function AnalyticsCard({
  cardTitle,
  cardData,
  icon,
}: AnalyticsCardProps) {
  return (
    <div className="bg-white p-6 rounded-lg shadow">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-gray-600 text-sm">{cardTitle}</p>
          <p className="text-2xl font-bold text-gray-900">{cardData}</p>
        </div>
        {icon}
      </div>
    </div>
  );
}
