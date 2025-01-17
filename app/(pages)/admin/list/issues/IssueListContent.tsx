"use client";

import { useState, useEffect } from "react";
import { fetchIssues } from "./serveractions";
import IssueList from "./IssueList";
import Loading from "@/app/loading";

export default function IssueListContent() {
  const [issues, setIssues] = useState<any[]>([]); // Adjust the type of issues as needed
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      try {
        const fetchedIssues = await fetchIssues();
        setIssues(fetchedIssues);
      } catch (error) {
        console.error("Error fetching issues:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []); // The empty dependency array ensures this effect runs on every render.

  if (loading) {
    return <Loading />;
  }

  return <IssueList issues={issues} />;
}
