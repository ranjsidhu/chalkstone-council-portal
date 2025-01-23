import { ANALYTICS_CARD_CONFIG } from "@/test_configs";

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
    <div
      data-testid={ANALYTICS_CARD_CONFIG.container}
      className="bg-white p-6 rounded-lg shadow"
    >
      <div className="flex items-center justify-between">
        <div>
          <p
            data-testid={ANALYTICS_CARD_CONFIG.title}
            className="text-gray-600 text-sm"
          >
            {cardTitle}
          </p>
          <p
            data-testid={ANALYTICS_CARD_CONFIG.data}
            className="text-2xl font-bold text-gray-900"
          >
            {cardData}
          </p>
        </div>
        {icon}
      </div>
    </div>
  );
}
