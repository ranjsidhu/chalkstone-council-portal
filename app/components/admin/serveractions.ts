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
