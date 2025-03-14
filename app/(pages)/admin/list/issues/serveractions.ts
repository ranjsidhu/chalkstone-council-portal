"use server";

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL;

/**
 * Fetch issues
 * @param page number
 * @returns JSON response with message and issues data
 */
export async function fetchIssues(page: number) {
  try {
    const response = await fetch(`${BASE_URL}/api/issues/limit/${page}`);
    const data = await response.json();
    return { issues: data.response, count: data.totalCount };
  } catch (error: any) {
    console.error(error.message);
  }
}

/**
 * Fetch issue count
 * @returns Number of issues
 */
// eslint-disable-next-line import/no-unused-modules
export async function fetchIssueCount() {
  try {
    const response = await fetch(`${BASE_URL}/api/issues/count`);
    const data = await response.json();
    return data.response;
  } catch (error: any) {
    console.error(error.message);
  }
}

/**
 * Fetch staff
 * @returns JSON response with message and staff
 */
export async function fetchStaff() {
  try {
    const response = await fetch(`${BASE_URL}/api/staff`);
    const data = await response.json();
    return data.response;
  } catch (error: any) {
    console.error(error.message);
  }
}
