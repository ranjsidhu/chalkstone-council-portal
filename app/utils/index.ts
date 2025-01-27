import getAddress from "./getAddress";
import handleSubmit from "./handleSubmit";
import { createClient } from "./supabaseServer";
import { IssueStatus } from "../types";

/**
 * Formats a date string into a localised UK format with time
 * @param dateString - The input date string to format
 * @returns A formatted string in the format "DD MMM YYYY, HH:mm"
 */
const formatDate = (dateString: string): string => {
  return new Date(dateString).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
};

/**
 * Maps a status string to a valid IssueStatus type
 * @param status - The status string to map
 * @returns The corresponding IssueStatus
 */
const mapStatusToType = (status: string): IssueStatus => {
  const statusMap: Record<string, IssueStatus> = {
    Open: "Open",
    "In Progress": "In Progress",
    Resolved: "Resolved",
    Closed: "Closed",
    Unassigned: "Unassigned",
  };
  return statusMap[status];
};

/**
 * Object mapping issue statuses to their corresponding Tailwind CSS classes for styling
 */
const statusColours: Record<IssueStatus, string> = {
  Open: "bg-yellow-100 text-yellow-800",
  "In Progress": "bg-blue-100 text-blue-800",
  Resolved: "bg-green-100 text-green-800",
  Closed: "bg-red-100 text-red-800",
  Unassigned: "bg-gray-100 text-gray-800",
};

export {
  getAddress,
  handleSubmit,
  createClient,
  formatDate,
  mapStatusToType,
  statusColours,
};
