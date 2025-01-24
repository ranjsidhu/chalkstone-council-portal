import { render, screen, act } from "@testing-library/react";
import MapSelect from "../MapSelect";
import { getAddress } from "@/app/utils";

jest.mock("next/dynamic", () => ({
  __esModule: true,
  default: function dynamicMock() {
    const Component = jest.fn(({ onLocationSelect }) => {
      return (
        <div data-testid="map" onClick={() => onLocationSelect(51.5, -0.1)} />
      );
    });
    return Component;
  },
}));

jest.mock("../Map", () => ({
  __esModule: true,
  default: ({ onLocationSelect }: { onLocationSelect: Function }) => (
    <div data-testid="map" onClick={() => onLocationSelect(51.5, -0.1)} />
  ),
}));

jest.mock("lucide-react", () => ({
  MapPin: () => <span data-testid="map-pin" />,
}));

jest.mock("@/app/utils", () => ({
  getAddress: jest.fn(),
}));

describe("MapSelect", () => {
  const defaultProps = {
    position: [51.5, -0.1],
    address: "",
    loading: false,
    setPosition: jest.fn(),
    setLoading: jest.fn(),
    setAddress: jest.fn(),
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("handles location selection", async () => {
    (getAddress as jest.Mock).mockResolvedValue("Test Address");
    render(<MapSelect {...defaultProps} />);

    await act(async () => {
      screen.getByTestId("map").click();
    });

    expect(defaultProps.setPosition).toHaveBeenCalledWith([51.5, -0.1]);
    expect(defaultProps.setLoading).toHaveBeenCalledWith(true);
    expect(defaultProps.setAddress).toHaveBeenCalledWith("Test Address");
    expect(defaultProps.setLoading).toHaveBeenCalledWith(false);
  });

  it("shows loading state", () => {
    render(<MapSelect {...defaultProps} loading={true} />);
    expect(screen.getByText("Fetching address...")).toBeInTheDocument();
  });

  it("shows address when not loading", () => {
    render(<MapSelect {...defaultProps} address="123 Test St" />);
    expect(
      screen.getByText("Selected location: 123 Test St")
    ).toBeInTheDocument();
  });
});
