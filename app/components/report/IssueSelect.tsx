import { ISSUE_OPTIONS } from "@/app/constants";
import { type IssueSelectOptionType } from "@/app/types";
import { ISSUE_SELECT_CONFIG } from "@/test_configs";

type IssueSelectProps = {
  issueType: IssueSelectOptionType;
  // eslint-disable-next-line no-unused-vars
  setIssueType: (issueType: IssueSelectOptionType) => void;
};

export default function IssueSelect({
  issueType,
  setIssueType,
}: IssueSelectProps) {
  return (
    <div
      className="bg-white rounded-lg shadow p-4"
      data-testid={ISSUE_SELECT_CONFIG.container}
    >
      <label
        className="block mb-2 font-medium"
        data-testid={ISSUE_SELECT_CONFIG.label}
      >
        Issue Type
      </label>
      <select
        data-testid={ISSUE_SELECT_CONFIG.select}
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
          <option
            data-testid={ISSUE_SELECT_CONFIG.option}
            key={issue.id}
            id={issue.id.toString()}
            value={issue.name}
          >
            {issue.name}
          </option>
        ))}
      </select>
    </div>
  );
}
