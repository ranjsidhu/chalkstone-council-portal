import React from "react";
import { ResponsiveContainer } from "recharts";

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
    <div className={outerClassName ? outerClassName : defaultClassName}>
      <h2 className="text-lg font-semibold text-gray-900 mb-4">{label}</h2>
      <div className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          {children}
        </ResponsiveContainer>
      </div>
    </div>
  );
}
