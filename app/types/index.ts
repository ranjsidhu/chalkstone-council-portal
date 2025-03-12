export type IssueSelectOptionType = {
  id: number | null;
  name: string;
};

export type IssueStatus =
  | "Open"
  | "In Progress"
  | "Resolved"
  | "Closed"
  | "Unassigned";

export type IssueStatusType = {
  id: number;
  name: IssueStatus;
};

export type IssueResponseType = {
  id: number;
  lat: number;
  long: number;
  issue_type_id: number;
  description: string;
  address: string;
  image_filename: string | null;
  image?: string;
  status_id: number;
  created_at: string;
  updated_at: string;
  issue_statuses: {
    name: IssueStatus;
  };
  issue_types: {
    name: string;
  };
  staff_issues: {
    staff: {
      id: number;
      name: string;
    };
  };
};

export type AnalyticsStats = {
  totalIssues: number;
  resolvedIssues: number;
  averageResolutionTime: string;
  activeUsers: number;
  issuesByType: Array<{ name: string; value: number }>;
  issuesByStatus: Array<{ name: string; value: number }>;
  issuesTrend: Array<{ date: string; count: number }>;
};

export type Staff = {
  id: number;
  name: string;
  created_at: string;
  updated_at: string;
};

export type ChartProps = {
  label: string;
  children: React.ReactElement<
    unknown,
    string | React.JSXElementConstructor<any>
  >;
  outerClassName?: string;
};
