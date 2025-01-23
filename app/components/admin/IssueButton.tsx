import { SetStateAction } from "react";
import { IssueStatusType, IssueStatus } from "@/app/types";
import { updateIssueStatus } from "./serveractions";
import { mapStatusToType } from "@/app/utils";
import { ISSUE_BUTTON_CONFIG } from "@/test_configs";

export type IssueButtonProps = {
  issueStatus: string;
  issueID: number;
  status: IssueStatusType | undefined;
  buttonText: string;
  icon?: React.ReactNode;
  setIssueStatus: React.Dispatch<SetStateAction<IssueStatus>>;
};

export default function IssueButton({
  issueStatus,
  issueID,
  status,
  buttonText,
  icon,
  setIssueStatus,
}: IssueButtonProps) {
  if (!status) return null;
  const typedStatus = mapStatusToType(status.name);

  const { container } = ISSUE_BUTTON_CONFIG;

  const statusColours = {
    Open: "",
    "In Progress": "bg-blue-600 hover:bg-blue-700",
    Resolved: "bg-green-600 hover:bg-green-700",
    Closed: "bg-red-600 hover:bg-red-700",
    Unassigned: "bg-gray-100 text-gray-800",
  };

  return (
    <button
      data-testid={container}
      disabled={issueStatus === status.name}
      className={`flex-1  text-white py-2 px-4 rounded-md  flex items-center justify-center gap-2 hover:cursor-pointer ${
        statusColours[typedStatus]
      } ${
        issueStatus === status.name && "opacity-50 hover:cursor-not-allowed"
      }`}
      onClick={() => {
        updateIssueStatus(status, issueID).then(() =>
          setIssueStatus(status.name)
        );
      }}
    >
      {icon && icon}
      {buttonText}
    </button>
  );
}
