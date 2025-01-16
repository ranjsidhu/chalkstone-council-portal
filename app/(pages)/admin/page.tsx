import { IssueResponseType } from "@/app/types";
import { fetchIssues } from "./serveractions";
import IssueCard from "@/app/components/admin/IssueCard";

export default async function AdminPage() {
  const issues = await fetchIssues();

  return (
    <main className="min-h-screen w-full bg-gray-50">
      <div className="max-w-4xl mx-auto p-4">
        {issues &&
          issues.length &&
          issues.map((issue: IssueResponseType) => (
            <IssueCard key={issue.id} issue={issue} />
          ))}
      </div>
    </main>
  );
}
