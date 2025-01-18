"use client";

import { useState, useEffect } from "react";
import { fetchIssues } from "./serveractions";
import IssueList from "./IssueList";
import Loading from "@/app/loading";
import { IssueResponseType } from "@/app/types";

export default function IssueListContent() {
  const [issues, setIssues] = useState<IssueResponseType[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [page, setPage] = useState<number>(1);

  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      try {
        const fetchedIssues = await fetchIssues(page);
        setIssues(fetchedIssues);
      } catch (error) {
        console.error("Error fetching issues:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, [page]);

  if (loading) {
    return <Loading />;
  }

  return <IssueList issues={issues} setPage={setPage} page={page} />;
}
