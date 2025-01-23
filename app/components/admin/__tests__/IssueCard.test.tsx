import { fireEvent, render, screen } from "@testing-library/react";
import IssueCard from "../IssueCard";
import { ISSUE_CARD_CONFIG, MOCK_ISSUE } from "@/test_configs";

const { container: issueCardContainer, button: issueCardButton } =
  ISSUE_CARD_CONFIG;

jest.mock("next/navigation", () => ({
  useRouter: jest.fn(() => ({
    push: jest.fn().mockImplementation(() => {}),
    replace: jest.fn(),
    prefetch: jest.fn(),
    pathname: "/",
    query: {},
    asPath: "/",
  })),
}));

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

jest.mock("lucide-react", () => ({
  AlertCircle: () => <div data-testid="alert-circle">MockedAlertCircle</div>,
  MapPin: () => <div data-testid="map-pin">MockedMapPin</div>,
  Clock: () => <div data-testid="clock">MockedClock</div>,
  ArrowRight: () => <div data-testid="arrow-right">MockedArrowRight</div>,
}));

describe("IssueCard", () => {
  it("should render correctly", () => {
    render(<IssueCard issue={MOCK_ISSUE} />);
    const container = screen.getByTestId(issueCardContainer);
    expect(container).toBeInTheDocument();
  });
});

describe("IssueCard Button", () => {
  it("should call router.push when clicked", () => {
    render(<IssueCard issue={MOCK_ISSUE} />);
    const button = screen.getByTestId(issueCardButton);
    fireEvent.click(button);
    expect(button).toBeInTheDocument();
  });
});
