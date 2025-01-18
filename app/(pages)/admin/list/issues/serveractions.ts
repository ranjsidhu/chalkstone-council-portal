"use server";

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL;

export async function fetchIssues(page: number) {
  try {
    const response = await fetch(`${BASE_URL}/api/issues/limit/${page}`);
    const data = await response.json();
    return data.response;
  } catch (error: any) {
    console.error(error.message);
  }
}

export async function fetchIssueCount() {
  try {
    const response = await fetch(`${BASE_URL}/api/issues/count`);
    const data = await response.json();
    return data.response;
  } catch (error: any) {
    console.error(error.message);
  }
}
