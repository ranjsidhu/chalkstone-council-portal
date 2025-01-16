import getAddress from "./getAddress";
import handleSubmit from "./handleSubmit";
import { createClient } from "./supabaseServer";
import { IssueStatus } from "../types";

const formatDate = (dateString: string): string => {
  return new Date(dateString).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
};

const mapStatusToType = (status: string): IssueStatus => {
  const statusMap: Record<string, IssueStatus> = {
    Open: "Open",
    "In Progress": "In Progress",
    Resolved: "Resolved",
    Closed: "Closed",
  };
  return statusMap[status] || "open";
};

const statusColours: Record<IssueStatus, string> = {
  Open: "bg-yellow-100 text-yellow-800",
  "In Progress": "bg-blue-100 text-blue-800",
  Resolved: "bg-green-100 text-green-800",
  Closed: "bg-red-100 text-red-800",
};

export {
  getAddress,
  handleSubmit,
  createClient,
  formatDate,
  mapStatusToType,
  statusColours,
};
