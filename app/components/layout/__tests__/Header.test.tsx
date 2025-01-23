import { fireEvent, render, screen } from "@testing-library/react";
import { useRouter, usePathname } from "next/navigation";
import { AUTH_STORAGE_KEY } from "@/app/constants";
import Header from "../Header";
import { HEADER_CONFIG } from "@/test_configs";

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
  usePathname: jest.fn().mockImplementation(() => "/"),
}));

jest.mock("lucide-react", () => ({
  LogIn: () => <div data-testid="log-in">MockedLogIn</div>,
  Settings: () => <div data-testid="settings">MockedSettings</div>,
  AlertCircle: () => <div data-testid="alert-circle">MockedAlertCircle</div>,
  ArrowUp: () => <div data-testid="arrow-up">MockedArrowUp</div>,
  ArrowDown: () => <div data-testid="arrow-down">MockedArrowDown</div>,
  MapPin: () => <div data-testid="map-pin">MockedMapPin</div>,
  Clock: () => <div data-testid="clock">MockedClock</div>,
  CheckCircle: () => <div data-testid="check-circle">MockedCheckCircle</div>,
  Users: () => <div data-testid="users">MockedUsers</div>,
  X: () => <div data-testid="x">MockedX</div>,
}));

const mockRouter = {
  push: jest.fn(),
};

const mockUsePathname = jest.fn();

describe("Header", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    (useRouter as jest.Mock).mockReturnValue(mockRouter);
    (usePathname as jest.Mock).mockImplementation(() => mockUsePathname());
    localStorage.clear();
  });

  it("renders unauthenticated state correctly", () => {
    mockUsePathname.mockReturnValue("/");
    render(<Header />);

    expect(screen.getByTestId(HEADER_CONFIG.container)).toBeInTheDocument();
    expect(screen.getByTestId(HEADER_CONFIG.logInButton)).toBeInTheDocument();
    expect(
      screen.queryByTestId(HEADER_CONFIG.signOutButton)
    ).not.toBeInTheDocument();
  });

  it("renders authenticated state correctly", () => {
    mockUsePathname.mockReturnValue("/");
    localStorage.setItem(AUTH_STORAGE_KEY, "true");

    render(<Header />);

    expect(screen.getByTestId(HEADER_CONFIG.adminButton)).toBeInTheDocument();
    expect(screen.getByTestId(HEADER_CONFIG.signOutButton)).toBeInTheDocument();
    expect(
      screen.queryByTestId(HEADER_CONFIG.logInButton)
    ).not.toBeInTheDocument();
  });

  it("redirects to home when accessing admin route while unauthenticated", () => {
    mockUsePathname.mockReturnValue("/admin");

    render(<Header />);

    expect(mockRouter.push).toHaveBeenCalledWith("/");
  });

  it("handles logout correctly", () => {
    mockUsePathname.mockReturnValue("/");
    localStorage.setItem(AUTH_STORAGE_KEY, "true");

    render(<Header />);

    fireEvent.click(screen.getByTestId(HEADER_CONFIG.signOutButton));

    expect(localStorage.getItem(AUTH_STORAGE_KEY)).toBeNull();
    expect(mockRouter.push).toHaveBeenCalledWith("/");
  });

  it("opens login modal when login button is clicked", () => {
    mockUsePathname.mockReturnValue("/");

    render(<Header />);

    fireEvent.click(screen.getByTestId(HEADER_CONFIG.logInButton));
    expect(screen.getByRole("textbox")).toBeInTheDocument();
  });
});
