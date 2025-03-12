"use client";

import { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Clock, MapPin, AlertCircle, CheckCircle } from "lucide-react";
import { formatDate, statusColours } from "@/app/utils";
import { IssueResponseType, IssueStatusType } from "@/app/types";
import IssueButton from "./IssueButton";
import { ISSUE_DETAIL_CONFIG } from "@/test_configs";
import StaffModal from "./StaffModal";

const {
  container,
  address,
  created,
  updated,
  image,
  description,
  buttons,
  goBack,
} = ISSUE_DETAIL_CONFIG;

interface IssueDetailProps {
  issue: IssueResponseType;
  statuses: IssueStatusType[];
}

// TODO - investigate high priority colurs
// const priorityColours = {
//   low: "bg-gray-100 text-gray-800",
//   medium: "bg-yellow-100 text-yellow-800",
//   high: "bg-red-100 text-red-800",
// };

export default function IssueDetail({ issue, statuses }: IssueDetailProps) {
  const router = useRouter();
  const [issueStatus, setIssueStatus] = useState(issue.issue_statuses.name);
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div
      data-testid={container}
      className="bg-white rounded-lg shadow-lg p-6 dmax-w-2xl w-full"
    >
      <StaffModal
        visible={isModalOpen}
        issueId={issue.id}
        setIsModalOpen={setIsModalOpen}
      />
      <div className="flex justify-between items-start mb-6">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <AlertCircle className="w-5 h-5 text-gray-500" />
            <h2 className="text-xl font-semibold text-gray-900">
              {issue.issue_types.name}
            </h2>
          </div>
          <span
            className={`px-2 py-1 rounded-full text-xs font-medium ${statusColours[issueStatus]}`}
          >
            {issueStatus}
          </span>
        </div>
        <button
          data-testid={goBack}
          onClick={() => router.back()}
          className="text-gray-400 hover:text-gray-500"
        >
          Go Back
        </button>
      </div>
      <div className="space-y-6">
        <div className="space-y-3">
          <div className="flex items-start gap-2 text-gray-600">
            <MapPin className="w-5 h-5 mt-0.5 flex-shrink-0" />
            <span data-testid={address}>{issue.address}</span>
          </div>
          <div className="flex items-start gap-2 text-gray-600">
            <Clock className="w-5 h-5 mt-0.5 flex-shrink-0" />
            <span data-testid={created}>
              Reported on {formatDate(issue.created_at)}
            </span>
          </div>
          <div className="flex items-start gap-2 text-gray-600">
            {issue.staff_issues[0]?.staff?.name
              ? `Assigned to ${issue.staff_issues[0]?.staff?.name}`
              : "Unassigned"}
          </div>

          {issue.updated_at !== issue.created_at && (
            <div className="flex items-start gap-2 text-gray-600">
              <Clock className="w-5 h-5 mt-0.5 flex-shrink-0" />
              <span data-testid={updated}>
                Last updated {formatDate(issue.updated_at)}
              </span>
            </div>
          )}
        </div>
        {issue.image_filename && issue.image ? (
          <div className="rounded-lg overflow-hidden">
            <Image
              data-testid={image}
              src={issue.image}
              alt="Issue"
              className="w-full h-auto"
              width={800}
              height={600}
            />
          </div>
        ) : null}
        <div className="space-y-2">
          <h3 className="font-medium text-gray-900">Description</h3>
          <p data-testid={description} className="text-gray-600">
            {issue.description}
          </p>
        </div>
        <div className="flex gap-3 pt-4 border-t" data-testid={buttons}>
          <button
            // disabled={issue.staff_issues[0]?.staff?.name !== ""}
            data-testid="assign"
            className="bg-blue-600 hover:bg-blue-700 flex-1  text-white py-2 px-4 rounded-md  flex items-center justify-center gap-2 hover:cursor-pointer"
            onClick={() => setIsModalOpen(true)}
          >
            Assign to Staff
          </button>
          <IssueButton
            buttonText="Mark In Progress"
            issueID={issue.id}
            status={statuses.find((s) => s.name === "In Progress")}
            setIssueStatus={setIssueStatus}
            issueStatus={issueStatus}
          />
          <IssueButton
            buttonText="Resolve Issue"
            icon={<CheckCircle className="w-5 h-5" />}
            issueID={issue.id}
            status={statuses.find((s) => s.name === "Resolved")}
            issueStatus={issueStatus}
            setIssueStatus={setIssueStatus}
          />
          <IssueButton
            buttonText="Close Issue"
            issueID={issue.id}
            status={statuses.find((s) => s.name === "Closed")}
            issueStatus={issueStatus}
            setIssueStatus={setIssueStatus}
          />
        </div>
      </div>
    </div>
  );
}
