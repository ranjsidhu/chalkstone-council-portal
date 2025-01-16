export type IssueSelectOptionType = {
  id: number | null;
  name: string;
};

export type IssueStatus = "Open" | "In Progress" | "Resolved" | "Closed";

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
  status_id: number;
  created_at: string;
  updated_at: string;
  issue_statuses: {
    name: IssueStatus;
  };
  issue_types: {
    name: string;
  };
};
