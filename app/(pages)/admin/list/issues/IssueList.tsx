"use client";

import { SetStateAction, useEffect, useState } from "react";
import { IssueResponseType } from "@/app/types";
import IssueCard from "@/app/components/admin/IssueCard";
import Pagination from "@/app/components/layout/Pagination";
import { fetchIssueCount } from "./serveractions";

type IssueListProps = {
  issues: IssueResponseType[];
  page: number;
  setPage: React.Dispatch<SetStateAction<number>>;
};

export default function IssueList({ issues, page, setPage }: IssueListProps) {
  const [issueCount, setIssueCount] = useState<number>(0);

  useEffect(() => {
    async function fetchCount() {
      try {
        const count = await fetchIssueCount();
        setIssueCount(count);
      } catch (error) {
        console.error("Error fetching issue count:", error);
      }
    }
    if (issues.length !== 0) {
      fetchCount();
    }
  }, [issues.length]);

  if (!issues || issues.length === 0) {
    return <div className="text-gray-500">No issues found.</div>;
  }

  return (
    <div className="space-y-4">
      {issues.map((issue: IssueResponseType) => (
        <IssueCard key={issue.id} issue={issue} />
      ))}
      <Pagination
        currentPage={page}
        totalPages={Math.ceil(issueCount / 5)}
        onPageChange={setPage}
      />
    </div>
  );
}
