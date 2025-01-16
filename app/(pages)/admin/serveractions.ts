"use server";

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL;

export async function fetchIssues() {
  try {
    const response = await fetch(`${BASE_URL}/api/issues`);
    const data = await response.json();
    return data.response;
  } catch (error: any) {
    console.error(error.message);
  }
}
