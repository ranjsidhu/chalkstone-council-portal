import { fireEvent, render, screen } from "@testing-library/react";
import Filters from "../Filters";
import { FILTERS_CONFIG, MOCK_STAFF, MOCK_STATUSES } from "@/test_configs";

jest.mock("lucide-react", () => ({
  Filter: () => <div data-testid="filter">MockedFilter</div>,
  AlertCircle: () => <div data-testid="alert-circle">MockedAlertCircle</div>,
  ArrowUp: () => <div data-testid="arrow-up">MockedArrowUp</div>,
  Clock: () => <div data-testid="clock">MockedClock</div>,
  Users: () => <div data-testid="users">MockedUsers</div>,
}));

const defaultProps = {
  statuses: MOCK_STATUSES,
  staff: MOCK_STAFF,
  selectedStaff: "",
  selectedType: "",
  selectedStatus: "",
  onFilterChange: jest.fn(),
};

describe("Filters", () => {
  it("should render correctly", () => {
    render(<Filters {...defaultProps} />);
    const container = screen.getByTestId(FILTERS_CONFIG.container);
    expect(container).toBeInTheDocument();
  });

  it("should call onFilterChange when status is changed", () => {
    const onFilterChange = jest.fn();
    render(<Filters {...defaultProps} onFilterChange={onFilterChange} />);
    const select = screen.getByTestId(FILTERS_CONFIG.statusFilter);
    fireEvent.change(select, { target: { value: "Open" } });
    expect(onFilterChange).toHaveBeenCalledWith("Open", "", "");
  });

  it("should call onFilterChange when type is changed", () => {
    const onFilterChange = jest.fn();
    render(<Filters {...defaultProps} onFilterChange={onFilterChange} />);
    const select = screen.getByTestId(FILTERS_CONFIG.typeFilter);
    fireEvent.change(select, { target: { value: "Pothole" } });
    expect(onFilterChange).toHaveBeenCalledWith("", "Pothole", "");
  });

  it("should call onFilterChange when staff is changed", () => {
    const onFilterChange = jest.fn();
    render(<Filters {...defaultProps} onFilterChange={onFilterChange} />);
    const select = screen.getByTestId(FILTERS_CONFIG.staffFilter);
    fireEvent.change(select, { target: { value: "John Doe" } });
    expect(onFilterChange).toHaveBeenCalledWith("", "", "John Doe");
  });
});
