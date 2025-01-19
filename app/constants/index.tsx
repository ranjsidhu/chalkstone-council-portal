import { AlertCircle, ArrowUp, Clock, Users } from "lucide-react";
import { AnalyticsStats } from "../types";

interface AnalyticsCardConfig {
  cardTitle: string;
  dataKey: Extract<
    keyof AnalyticsStats,
    "totalIssues" | "resolvedIssues" | "averageResolutionTime" | "activeUsers"
  >;
  icon: React.ReactNode;
}

const ISSUE_OPTIONS = [
  { id: 1, name: "Pothole" },
  { id: 2, name: "Street Lighting" },
  { id: 3, name: "Graffiti" },
  { id: 4, name: "Anti-Social Behaviour" },
  { id: 5, name: "Fly-Tipping" },
  { id: 6, name: "Blocked Drain" },
  { id: 7, name: "Other" },
];

const MAP_CENTER = [50.73, -3.53];

const AUTH_STORAGE_KEY = "CCouncilIsAuthenticated";

const ANALYTICS_CARDS: AnalyticsCardConfig[] = [
  {
    cardTitle: "Total Issues",
    dataKey: "totalIssues",
    icon: <AlertCircle className="w-8 h-8 text-blue-500" />,
  },
  {
    cardTitle: "Resolved Issues",
    dataKey: "resolvedIssues",
    icon: <ArrowUp className="w-8 h-8 text-green-500" />,
  },
  {
    cardTitle: "Resolution Time",
    dataKey: "averageResolutionTime",
    icon: <Clock className="w-8 h-8 text-orange-500" />,
  },
  {
    cardTitle: "Active Users",
    dataKey: "activeUsers",
    icon: <Users className="w-8 h-8 text-purple-500" />,
  },
];

const CHART_COLOURS = ["#3B82F6", "#60A5FA", "#93C5FD", "#BFDBFE", "#DBEAFE"];

export {
  ISSUE_OPTIONS,
  MAP_CENTER,
  AUTH_STORAGE_KEY,
  ANALYTICS_CARDS,
  CHART_COLOURS,
};
