import { IssueResponseType } from "@/app/types";
import IssueCard from "@/app/components/admin/IssueCard";

export default function IssueList({ issues }: { issues: IssueResponseType[] }) {
  if (!issues || issues.length === 0) {
    return <div className="text-gray-500">No issues found.</div>;
  }

  return (
    <div className="space-y-4">
      {issues.map((issue: IssueResponseType) => (
        <IssueCard key={issue.id} issue={issue} />
      ))}
    </div>
  );
}
