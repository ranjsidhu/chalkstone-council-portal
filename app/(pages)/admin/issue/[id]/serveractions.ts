"use server";

import { createClient } from "@/app/utils";

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL;

/**
 * Fetch an issue by id
 * @param id string
 * @returns JSON response with message and issue data
 */
export async function fetchIssueDetails(id: string) {
  try {
    const response = await fetch(`${BASE_URL}/api/issues/${id}`);
    const data = await response.json();
    return { ...data.response[0], image: data.response.image };
  } catch (error: any) {
    console.error(error.message);
  }
}

/**
 * Fetch all issue statuses
 * @returns Array of issue statuses
 */
export async function fetchIssueStatuses() {
  try {
    const supabase = await createClient();
    const { data, error } = await supabase
      .from("issue_statuses")
      .select()
      .eq("is_active", true);
    if (error) throw new Error(error.message);
    return data || [];
  } catch (error: any) {
    console.error(error.message);
    return [];
  }
}
