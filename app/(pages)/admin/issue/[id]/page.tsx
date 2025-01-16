import IssueDetail from "@/app/components/admin/IssueDetail";
import { fetchIssueDetails, fetchIssueStatuses } from "./serveractions";

export default async function IssueDetailsPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const issue = await fetchIssueDetails(id);
  const statuses = await fetchIssueStatuses();

  if (!statuses.length) {
    return <div>Failed to fetch statuses</div>;
  }

  return (
    <main className="min-h-screen w-full bg-gray-50">
      <div className="max-w-4xl mx-auto p-4">
        <IssueDetail issue={issue} statuses={statuses} />
      </div>
    </main>
  );
}
