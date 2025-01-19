import Link from "next/link";
import { Suspense } from "react";
import Loading from "@/app/loading";
import IssueListContent from "./IssueListContent";
import { fetchIssueStatuses } from "../../issue/[id]/serveractions";

export default async function AdminListIssuesPage() {
  const statuses = await fetchIssueStatuses();

  if (!statuses.length) {
    return <div>Failed to fetch statuses</div>;
  }

  return (
    <div className="max-w-4xl mx-auto p-4">
      <Suspense fallback={<Loading />}>
        <Link
          href="/admin"
          className="underline hover:cursor-pointer mb-4 block"
        >
          Back
        </Link>
        <IssueListContent statuses={statuses} />
      </Suspense>
    </div>
  );
}
