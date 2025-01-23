import { fireEvent, render, screen } from "@testing-library/react";
import IssueDetail from "../IssueDetail";
import { useRouter } from "next/navigation";
import { ISSUE_DETAIL_CONFIG, MOCK_ISSUE } from "@/test_configs";

jest.mock("lucide-react", () => ({
  AlertCircle: () => <div data-testid="alert-circle">MockedAlertCircle</div>,
  MapPin: () => <div data-testid="map-pin">MockedMapPin</div>,
  Clock: () => <div data-testid="clock">MockedClock</div>,
  CheckCircle: () => <div data-testid="check-circle">MockedCheckCircle</div>,
}));

jest.mock("next/navigation", () => ({
  useRouter: jest.fn(() => ({
    push: jest.fn().mockImplementation(() => {}),
    back: jest.fn().mockImplementation(() => {}),
    replace: jest.fn(),
    prefetch: jest.fn(),
    pathname: "/",
    query: {},
    asPath: "/",
  })),
}));

jest.mock("@/app/utils", () => ({
  formatDate: jest.fn().mockReturnValue("25 Oct 2021"),
  statusColours: {
    Open: "bg-yellow-100 text-yellow-800",
    "In Progress": "bg-blue-100 text-blue-800",
    Resolved: "bg-green-100 text-green-800",
    Closed: "bg-red-100 text-red-800",
    Unassigned: "bg-gray-100 text-gray-800",
  },
}));

describe("IssueDetail", () => {
  const mockBack = jest.fn();

  beforeEach(() => {
    (useRouter as jest.Mock).mockImplementation(() => ({
      back: mockBack,
    }));
  });

  it("should render correctly", () => {
    render(<IssueDetail issue={MOCK_ISSUE} statuses={[]} />);
    const container = screen.getByTestId(ISSUE_DETAIL_CONFIG.container);
    expect(container).toBeInTheDocument();
  });

  it("should render an image if a filename is present", () => {
    render(
      <IssueDetail
        issue={{
          ...MOCK_ISSUE,
          image_filename: "test.jpg",
          image: "/test.jpg",
        }}
        statuses={[]}
      />
    );
    const image = screen.getByTestId(ISSUE_DETAIL_CONFIG.image);
    expect(image).toBeInTheDocument();
  });

  it("should call a function when the go back button is clicked", () => {
    render(<IssueDetail issue={MOCK_ISSUE} statuses={[]} />);
    const goBackButton = screen.getByTestId(ISSUE_DETAIL_CONFIG.goBack);
    fireEvent.click(goBackButton);
    expect(mockBack).toHaveBeenCalled();
  });
});
