import { ResponsiveContainer } from "recharts";
import { CHART_CONFIG } from "@/test_configs";

type ChartProps = {
  label: string;
  children: React.ReactElement<
    unknown,
    string | React.JSXElementConstructor<any>
  >;
  outerClassName?: string;
};

export default function Chart({ label, children, outerClassName }: ChartProps) {
  const defaultClassName = "bg-white p-6 rounded-lg shadow";

  return (
    <div
      data-testid={CHART_CONFIG.container}
      className={outerClassName ? outerClassName : defaultClassName}
    >
      <h2 className="text-lg font-semibold text-gray-900 mb-4">{label}</h2>
      <div className="h-80">
        <ResponsiveContainer
          width="100%"
          height="100%"
          data-testid={CHART_CONFIG.chart}
        >
          {children}
        </ResponsiveContainer>
      </div>
    </div>
  );
}
