import { render, screen } from "@testing-library/react";
import Map from "../Map";
import { useMapEvents } from "react-leaflet";

// Mock react-leaflet components
jest.mock("react-leaflet", () => ({
  MapContainer: ({ children }: { children: React.ReactNode }) => (
    <div data-testid="map-container">{children}</div>
  ),
  TileLayer: () => <div data-testid="tile-layer" />,
  Marker: ({ position }: { position: [number, number] }) => (
    <div data-testid="marker" data-position={position.join(",")} />
  ),
  useMapEvents: jest.fn(),
}));

describe("Map", () => {
  const position: [number, number] = [51.505, -0.09];
  const onLocationSelect = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders map with initial position", () => {
    render(<Map position={position} onLocationSelect={onLocationSelect} />);

    expect(screen.getByTestId("map-container")).toBeInTheDocument();
    expect(screen.getByTestId("tile-layer")).toBeInTheDocument();
    expect(screen.getByTestId("marker")).toBeInTheDocument();
  });

  it("renders map without marker when position is null", () => {
    const nullPosition = null as unknown as [number, number]; // Type assertion needed
    render(<Map position={nullPosition} onLocationSelect={onLocationSelect} />);

    expect(screen.queryByTestId("marker")).not.toBeInTheDocument();
  });

  it("calls onLocationSelect when map is clicked", () => {
    const mockMapClick = jest.fn();
    (useMapEvents as jest.Mock).mockImplementation(({ click }) => {
      mockMapClick.mockImplementation(() =>
        click({ latlng: { lat: 51.51, lng: -0.1 } })
      );
    });

    render(<Map position={position} onLocationSelect={onLocationSelect} />);

    mockMapClick();
    expect(onLocationSelect).toHaveBeenCalledWith(51.51, -0.1);
  });
});
