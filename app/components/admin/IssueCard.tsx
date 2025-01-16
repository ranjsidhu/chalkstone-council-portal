"use client";

import { useRouter } from "next/navigation";
import { Clock, MapPin, ArrowRight, AlertCircle } from "lucide-react";
import { formatDate, mapStatusToType, statusColours } from "@/app/utils";
import { IssueResponseType } from "@/app/types";

interface IssueCardProps {
  issue: IssueResponseType;
}

export default function IssueCard({ issue }: IssueCardProps) {
  const router = useRouter();
  const status = mapStatusToType(issue.issue_statuses.name);

  return (
    <div className="bg-white rounded-lg shadow p-4 hover:shadow-md transition-shadow">
      <div className="flex justify-between items-start mb-3">
        <div className="flex items-center gap-2">
          <AlertCircle className="w-5 h-5 text-gray-500" />
          <h3 className="font-medium text-gray-900">
            {issue.issue_types.name}
          </h3>
        </div>
        <span
          className={`px-2 py-1 rounded-full text-xs font-medium ${statusColours[status]}`}
        >
          {issue.issue_statuses.name}
        </span>
      </div>
      <div className="space-y-2 mb-4">
        <div className="flex items-start gap-2 text-sm text-gray-600">
          <MapPin className="w-4 h-4 mt-0.5 flex-shrink-0" />
          <span>{issue.address}</span>
        </div>
        <div className="flex items-start gap-2 text-sm text-gray-600">
          <Clock className="w-4 h-4 mt-0.5 flex-shrink-0" />
          <span>Reported {formatDate(issue.created_at)}</span>
        </div>
      </div>
      <button
        onClick={() => router.push(`/admin/issue/${issue.id}`)}
        className="w-full flex items-center justify-center gap-2 text-sm text-blue-600 hover:text-blue-700 font-medium"
      >
        View Details
        <ArrowRight className="w-4 h-4" />
      </button>
    </div>
  );
}
