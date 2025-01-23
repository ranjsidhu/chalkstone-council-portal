import { fireEvent, render, screen } from "@testing-library/react";
import IssueButton, { IssueButtonProps } from "../IssueButton";
import { ISSUE_BUTTON_CONFIG } from "@/test_configs";

const mockSetIssueStatus = jest.fn();
const mockUpdateIssueStatus = jest.fn().mockResolvedValue({});
jest.mock("../serveractions", () => ({
  updateIssueStatus: (...args: any[]) => mockUpdateIssueStatus(...args),
}));

const MOCK_BUTTON_PROPS: IssueButtonProps = {
  issueStatus: "Open",
  issueID: 1,
  status: { id: 1, name: "Open" },
  buttonText: "Open",
  setIssueStatus: mockSetIssueStatus,
};

jest.mock("@/app/utils", () => ({
  mapStatusToType: jest.fn().mockReturnValue("Open"),
  formatDate: jest.fn().mockReturnValue("25 Oct 2021"),
  statusColours: {
    Open: "bg-yellow-100 text-yellow-800",
    "In Progress": "bg-blue-100 text-blue-800",
    Resolved: "bg-green-100 text-green-800",
    Closed: "bg-red-100 text-red-800",
    Unassigned: "bg-gray-100 text-gray-800",
  },
}));

const defaultProps: IssueButtonProps = {
  issueStatus: "Open",
  issueID: 1,
  status: { id: 1, name: "Open" },
  buttonText: "Open",
  setIssueStatus: mockSetIssueStatus,
};

describe("IssueButton", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should render correctly", () => {
    render(<IssueButton {...MOCK_BUTTON_PROPS} />);
    const container = screen.getByTestId(ISSUE_BUTTON_CONFIG.container);
    expect(container).toBeInTheDocument();
  });

  it("renders nothing when status is undefined", () => {
    render(<IssueButton {...defaultProps} status={undefined} />);
    const button = screen.queryByTestId(ISSUE_BUTTON_CONFIG.container);
    expect(button).not.toBeInTheDocument();
  });

  it("renders button with correct text and icon", () => {
    const icon = <span data-testid="test-icon">icon</span>;
    render(<IssueButton {...defaultProps} icon={icon} />);

    const button = screen.getByTestId(ISSUE_BUTTON_CONFIG.container);
    const iconElement = screen.getByTestId("test-icon");

    expect(button).toHaveTextContent("Open");
    expect(iconElement).toBeInTheDocument();
  });

  it("updates status when clicked", async () => {
    render(
      <IssueButton
        {...defaultProps}
        issueStatus="Closed"
        status={{ id: 1, name: "Open" }}
      />
    );

    const button = screen.getByTestId(ISSUE_BUTTON_CONFIG.container);
    fireEvent.click(button);

    await new Promise(process.nextTick);

    expect(mockUpdateIssueStatus).toHaveBeenCalledWith(
      { id: 1, name: "Open" },
      1
    );
    expect(mockSetIssueStatus).toHaveBeenCalledWith("Open");
  });
});
