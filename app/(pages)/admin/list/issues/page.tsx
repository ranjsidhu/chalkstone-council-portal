import Link from "next/link";
import { Suspense } from "react";
import { fetchIssues } from "./serveractions";
import Loading from "@/app/loading";
import IssueList from "./IssueList";

export default async function AdminListIssuesPage() {
  return (
    <div className="max-w-4xl mx-auto p-4">
      <Suspense fallback={<Loading />}>
        <Link
          href="/admin"
          className="underline hover:cursor-pointer mb-4 block"
        >
          Back
        </Link>
        <IssueListContent />
      </Suspense>
    </div>
  );
}

// This component handles the async data fetching
async function IssueListContent() {
  const issues = await fetchIssues();
  return <IssueList issues={issues} />;
}
