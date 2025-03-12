"use server";

import { IssueStatusType } from "@/app/types";

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL;

/**
 * Updates the status of an issue
 * @param status - The new status of the issue
 * @param id - The ID of the issue
 * @returns {Promise<void>}
 */
export async function updateIssueStatus(
  status: IssueStatusType,
  id: number
): Promise<void> {
  try {
    const response = await fetch(BASE_URL + "/api/issues", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id,
        status_id: status.id,
        status_name: status.name,
        resolved_at:
          status.name === "Resolved" ? new Date().toISOString() : null,
      }),
    });
    if (!response.ok) {
      throw new Error(response.statusText);
    }
  } catch (error: any) {
    console.error("Error updating issue status: " + error.message);
  }
}

export async function fetchStaff() {
  try {
    const response = await fetch(BASE_URL + "/api/staff");

    if (!response.ok) {
      throw new Error(response.statusText);
    }
    const parsed = await response.json();

    return parsed.response;
  } catch (error: any) {
    console.error("Error fetching staff: " + error.message);
  }
}

export async function assignStaffToIssue(
  staff_id: number,
  issue_id: number
): Promise<void> {
  try {
    const response = await fetch(BASE_URL + "/api/staff_issues", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        staff_id,
        issue_id,
      }),
    });
    if (!response.ok) {
      throw new Error(response.statusText);
    }
  } catch (error: any) {
    console.error("Error assigning staff to issue: " + error.message);
  }
}
