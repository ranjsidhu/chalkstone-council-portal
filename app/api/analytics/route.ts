import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/app/utils";

export async function GET(req: NextRequest) {
  try {
    const supabase = await createClient();

    // Get total issues count
    const { count: totalIssues } = await supabase
      .from("issues")
      .select("*", { count: "exact", head: true });

    // Get resolved issues count
    const { count: resolvedIssues } = await supabase
      .from("issues")
      .select("*", { count: "exact", head: true })
      .eq("status_id", 3);

    // Get all issues with their types and statuses
    const { data: allIssues } = await supabase.from("issues").select(`
        *,
        issue_types (
          name
        ),
        issue_statuses (
          name
        )
      `);

    // Process issues by type
    const typeCount: { [key: string]: number } = {};
    allIssues?.forEach((issue) => {
      const typeName = issue.issue_types?.name || "Unknown";
      typeCount[typeName] = (typeCount[typeName] || 0) + 1;
    });

    const issuesByType = Object.entries(typeCount).map(([name, value]) => ({
      name,
      value,
    }));

    // Process issues by status
    const statusCount: { [key: string]: number } = {};
    allIssues?.forEach((issue) => {
      const statusName = issue.issue_statuses?.name || "Unknown";
      statusCount[statusName] = (statusCount[statusName] || 0) + 1;
    });

    const issuesByStatus = Object.entries(statusCount).map(([name, value]) => ({
      name,
      value,
    }));

    // Calculate average resolution time
    const resolvedIssuesData = allIssues?.filter((issue) => issue.updated_at);
    const averageResolutionTime = resolvedIssuesData?.length
      ? resolvedIssuesData.reduce((acc, issue) => {
          const resolutionTime =
            new Date(issue.updated_at).getTime() -
            new Date(issue.created_at).getTime();
          return acc + resolutionTime;
        }, 0) / resolvedIssuesData.length
      : 0;

    // Process issues trend (last 7 days)
    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);

    const recentIssues = allIssues?.filter(
      (issue) => new Date(issue.created_at) >= sevenDaysAgo
    );

    const issuesTrend = processIssuesTrend(recentIssues || []);

    const formattedData = {
      totalIssues: totalIssues || 0,
      resolvedIssues: resolvedIssues || 0,
      averageResolutionTime: `${Math.round(
        averageResolutionTime / (1000 * 60 * 60)
      )}h`,
      issuesByType,
      issuesByStatus,
      issuesTrend,
    };

    return NextResponse.json(formattedData);
  } catch (error: any) {
    console.error("Analytics Error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

function processIssuesTrend(issues: any[]) {
  const days: { [key: string]: number } = {};
  const now = new Date();

  // Initialize last 7 days
  for (let i = 6; i >= 0; i--) {
    const date = new Date(now.getTime() - i * 24 * 60 * 60 * 1000);
    const dateStr = date.toISOString().split("T")[0];
    days[dateStr] = 0;
  }

  // Count issues per day
  issues.forEach((issue) => {
    const dateStr = issue.created_at.split("T")[0];
    if (days[dateStr] !== undefined) {
      days[dateStr]++;
    }
  });

  return Object.entries(days).map(([date, count]) => ({
    date,
    count,
  }));
}

function getDayNames() {
  return [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
}

function getDayNumber(dayName: string) {
  return getDayNames().indexOf(dayName);
}

function isThisWeek(date: Date) {
  const now = new Date();
  const weekStart = new Date(now.setDate(now.getDate() - now.getDay()));
  const weekEnd = new Date(now.setDate(now.getDate() + 6));
  return date >= weekStart && date <= weekEnd;
}

function isLastWeek(date: Date) {
  const now = new Date();
  const lastWeekStart = new Date(now.setDate(now.getDate() - now.getDay() - 7));
  const lastWeekEnd = new Date(now.setDate(now.getDate() + 6));
  return date >= lastWeekStart && date <= lastWeekEnd;
}
