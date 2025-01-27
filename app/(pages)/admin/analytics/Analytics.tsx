"use client";

import { useState, useEffect } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
  Legend,
} from "recharts";
import { ANALYTICS_CARDS, CHART_COLOURS } from "@/app/constants";
import { AnalyticsStats } from "@/app/types";
import Chart from "@/app/components/analytics/Chart";
import AnalyticsCard from "@/app/components/analytics/AnalyticsCard";

export default function AnalyticsDashboard() {
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState<AnalyticsStats>({
    totalIssues: 0,
    resolvedIssues: 0,
    averageResolutionTime: "0h",
    activeUsers: 243,
    issuesByType: [],
    issuesByStatus: [],
    issuesTrend: [],
  });

  /**
   * Fetch analytics data
   */
  useEffect(() => {
    const fetchAnalytics = async () => {
      try {
        const response = await fetch("/api/analytics");
        const data = await response.json();
        setStats(data);
      } catch (error) {
        console.error("Error fetching analytics:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchAnalytics();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-4 space-y-6">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">
          Analytics Dashboard
        </h1>
        <p className="text-gray-600">Overview of reported issues and trends</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {ANALYTICS_CARDS.map((card) => (
          <AnalyticsCard
            key={card.dataKey}
            cardData={stats[card.dataKey] || 243}
            cardTitle={card.cardTitle}
            icon={card.icon}
          />
        ))}
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Issues by Type */}
        <Chart label="Issue by Type">
          <BarChart data={stats.issuesByType}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="value" fill="#3B82F6" />
          </BarChart>
        </Chart>

        {/* Issues by Status */}
        <Chart label="Issues by Status">
          <PieChart>
            <Pie
              data={stats.issuesByStatus}
              innerRadius={60}
              outerRadius={100}
              paddingAngle={5}
              dataKey="value"
              label
            >
              {stats.issuesByStatus.map((entry: any, index: number) => (
                <Cell
                  key={`cell-${index}`}
                  fill={CHART_COLOURS[index % CHART_COLOURS.length]}
                />
              ))}
            </Pie>
            <Tooltip />
            <Legend
              layout="vertical"
              align="right"
              verticalAlign="middle"
              formatter={(value: string) => (
                <span className="text-sm text-gray-700">{value}</span>
              )}
            />
          </PieChart>
        </Chart>

        {/* Issues Trend */}
        <Chart
          label="Issues Trend"
          outerClassName="bg-white p-6 rounded-lg shadow lg:col-span-2"
        >
          <LineChart data={stats.issuesTrend}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip />
            <Line type="monotone" dataKey="count" stroke="#3B82F6" />
          </LineChart>
        </Chart>
      </div>
    </div>
  );
}
