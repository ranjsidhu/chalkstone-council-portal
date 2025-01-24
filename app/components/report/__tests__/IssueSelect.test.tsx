import { fireEvent, render, screen } from "@testing-library/react";
import IssueSelect from "../IssueSelect";
import { ISSUE_OPTIONS } from "@/app/constants";
import { ISSUE_SELECT_CONFIG } from "@/test_configs";

jest.mock("lucide-react", () => ({
  Filter: () => <div data-testid="filter">MockedFilter</div>,
  AlertCircle: () => <div data-testid="alert-circle">MockedAlertCircle</div>,
  ArrowUp: () => <div data-testid="arrow-up">MockedArrowUp</div>,
  Clock: () => <div data-testid="clock">MockedClock</div>,
  Users: () => <div data-testid="users">MockedUsers</div>,
}));

describe("IssueSelect", () => {
  it("renders with initial issue type", () => {
    render(
      <IssueSelect issueType={ISSUE_OPTIONS[0]} setIssueType={() => {}} />
    );

    expect(screen.getByTestId(ISSUE_SELECT_CONFIG.select)).toHaveValue(
      ISSUE_OPTIONS[0].name
    );
  });

  it("calls setIssueType when selection changes", () => {
    const setIssueType = jest.fn();
    render(
      <IssueSelect issueType={ISSUE_OPTIONS[0]} setIssueType={setIssueType} />
    );

    const select = screen.getByTestId(ISSUE_SELECT_CONFIG.select);
    fireEvent.change(select, { target: { value: ISSUE_OPTIONS[1].name } });

    expect(setIssueType).toHaveBeenCalledWith({
      id: ISSUE_OPTIONS[1].id,
      name: ISSUE_OPTIONS[1].name,
    });
  });

  it("displays all issue options", () => {
    render(
      <IssueSelect issueType={ISSUE_OPTIONS[0]} setIssueType={() => {}} />
    );

    const options = screen.getAllByTestId(ISSUE_SELECT_CONFIG.option);
    expect(options).toHaveLength(ISSUE_OPTIONS.length);
  });
});
