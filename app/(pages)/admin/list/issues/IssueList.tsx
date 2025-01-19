import { SetStateAction } from "react";
import { IssueResponseType } from "@/app/types";
import IssueCard from "@/app/components/admin/IssueCard";
import Pagination from "@/app/components/layout/Pagination";

type IssueListProps = {
  issues: IssueResponseType[];
  page: number;
  totalCount: number;
  setPage: any;
};

export default function IssueList({
  issues,
  page,
  totalCount,
  setPage,
}: IssueListProps) {
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
        totalPages={Math.ceil(totalCount / 5)}
        onPageChange={setPage}
      />
    </div>
  );
}
