import { render, screen } from "@testing-library/react";
import Chart from "../Chart";
import { CHART_CONFIG } from "@/test_configs";

const defaultProps = {
  label: "Chart",
  children: <div data-testid="chart">MockedChart</div>,
};

jest.mock("recharts", () => ({
  ResponsiveContainer: ({ children }: { children: React.ReactNode }) => (
    <div data-testid="responsive-container">{children}</div>
  ),
}));

global.ResizeObserver = jest.fn().mockImplementation(() => ({
  observe: jest.fn(),
  unobserve: jest.fn(),
  disconnect: jest.fn(),
}));

describe("Chart", () => {
  it("should render correctly", () => {
    render(<Chart {...defaultProps} />);
    const container = screen.getByTestId(CHART_CONFIG.container);
    expect(container).toBeInTheDocument();
    expect(screen.getByTestId("responsive-container")).toBeInTheDocument();
    expect(screen.getByTestId("chart")).toBeInTheDocument();
    expect(screen.getByText("Chart")).toBeInTheDocument();
  });

  it("should apply custom className when provided", () => {
    const customClass = "custom-class";
    render(<Chart {...defaultProps} outerClassName={customClass} />);

    expect(screen.getByTestId(CHART_CONFIG.container)).toHaveClass(customClass);
  });

  it("should apply default className when no custom class provided", () => {
    render(<Chart {...defaultProps} />);

    expect(screen.getByTestId(CHART_CONFIG.container)).toHaveClass(
      "bg-white p-6 rounded-lg shadow"
    );
  });
});
