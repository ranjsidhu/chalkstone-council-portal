import { ISSUE_OPTIONS } from "@/app/constants";

type IssueSelectOptionType = {
  id: number | null;
  name: string;
};

type IssueSelectProps = {
  issueType: IssueSelectOptionType;
  setIssueType: (issueType: IssueSelectOptionType) => void;
};

export default function IssueSelect({
  issueType,
  setIssueType,
}: IssueSelectProps) {
  return (
    <div className="bg-white rounded-lg shadow p-4">
      <label className="block mb-2 font-medium">Issue Type</label>
      <select
        value={issueType.name}
        onChange={(e) => {
          const select = e.target;
          const id = Number(select.children[select.selectedIndex].id);
          setIssueType({ id, name: e.target.value });
        }}
        className="w-full p-2 border rounded-md"
        required
      >
        <option value="">Select an issue type</option>
        {ISSUE_OPTIONS.map((issue) => (
          <option key={issue.id} id={issue.id.toString()} value={issue.name}>
            {issue.name}
          </option>
        ))}
      </select>
    </div>
  );
}
