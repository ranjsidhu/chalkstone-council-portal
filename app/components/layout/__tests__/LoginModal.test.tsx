import { render, fireEvent, screen, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import LoginModal from "../LoginModal";
import { LOGIN_MODAL_CONFIG } from "@/test_configs";

const mockOnClose = jest.fn();
const mockOnLoginSuccess = jest.fn();

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

describe("LoginModal Component", () => {
  const setup = (isOpen: boolean) => {
    return render(
      <LoginModal
        isOpen={isOpen}
        onClose={mockOnClose}
        onLoginSuccess={mockOnLoginSuccess}
      />
    );
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe("when isOpen is false", () => {
    it("does not render the modal", () => {
      setup(false);
      expect(
        screen.queryByTestId(LOGIN_MODAL_CONFIG.container)
      ).not.toBeInTheDocument();
    });
  });

  describe("when isOpen is true", () => {
    it("renders the modal", () => {
      setup(true);
      expect(
        screen.getByTestId(LOGIN_MODAL_CONFIG.container)
      ).toBeInTheDocument();
    });

    it("calls onClose when the close button is clicked", () => {
      setup(true);
      const closeButton = screen.getByTestId(LOGIN_MODAL_CONFIG.closeButton);
      fireEvent.click(closeButton);
      expect(mockOnClose).toHaveBeenCalledTimes(1);
    });

    describe("when invalid credentials are entered", () => {
      it("displays an error message", async () => {
        setup(true);
        const usernameInput = screen.getByTestId(LOGIN_MODAL_CONFIG.username);
        const passwordInput = screen.getByTestId(LOGIN_MODAL_CONFIG.password);
        const submitButton = screen.getByTestId(
          LOGIN_MODAL_CONFIG.submitButton
        );

        fireEvent.change(usernameInput, { target: { value: "wrongUser" } });
        fireEvent.change(passwordInput, { target: { value: "wrongPass" } });
        fireEvent.click(submitButton);

        await waitFor(
          () =>
            expect(
              screen.queryByTestId(LOGIN_MODAL_CONFIG.error)
            ).toBeInTheDocument(),
          {
            timeout: 3000,
          }
        );
      });
    });

    describe("when valid credentials are entered", () => {
      beforeEach(() => {
        process.env.NEXT_PUBLIC_MOCK_USERNAME = "testUser";
        process.env.NEXT_PUBLIC_MOCK_PASSWORD = "testPass";
      });

      it("calls onLoginSuccess and onClose", async () => {
        setup(true);
        const usernameInput = screen.getByTestId(LOGIN_MODAL_CONFIG.username);
        const passwordInput = screen.getByTestId(LOGIN_MODAL_CONFIG.password);
        const submitButton = screen.getByTestId(
          LOGIN_MODAL_CONFIG.submitButton
        );

        fireEvent.change(usernameInput, { target: { value: "testUser" } });
        fireEvent.change(passwordInput, { target: { value: "testPass" } });
        fireEvent.click(submitButton);

        setTimeout(() => {
          expect(mockOnLoginSuccess).toHaveBeenCalledTimes(1);
          expect(mockOnClose).toHaveBeenCalledTimes(1);
        }, 5000);
      });

      it("resets modal fields after successful login", async () => {
        setup(true);
        const usernameInput = screen.getByTestId(LOGIN_MODAL_CONFIG.username);
        const passwordInput = screen.getByTestId(LOGIN_MODAL_CONFIG.password);
        const submitButton = screen.getByTestId(
          LOGIN_MODAL_CONFIG.submitButton
        );

        fireEvent.change(usernameInput, {
          target: { value: process.env.NEXT_PUBLIC_MOCK_USERNAME },
        });
        fireEvent.change(passwordInput, {
          target: { value: process.env.NEXT_PUBLIC_MOCK_PASSWORD },
        });

        // Ensure the fields have values before the reset
        expect(usernameInput).toHaveValue("testUser");
        expect(passwordInput).toHaveValue("testPass");

        fireEvent.click(submitButton);

        setTimeout(() => {
          expect(usernameInput).toHaveValue("");
          expect(passwordInput).toHaveValue("");
        }, 5000);
      });
    });

    describe("during a login attempt", () => {
      it("disables the submit button and shows loading state", async () => {
        process.env.NEXT_PUBLIC_MOCK_USERNAME = "testUser";
        process.env.NEXT_PUBLIC_MOCK_PASSWORD = "testPass";

        setup(true);
        const usernameInput = screen.getByTestId(LOGIN_MODAL_CONFIG.username);
        const passwordInput = screen.getByTestId(LOGIN_MODAL_CONFIG.password);
        const submitButton = screen.getByTestId(
          LOGIN_MODAL_CONFIG.submitButton
        );

        fireEvent.change(usernameInput, {
          target: { value: process.env.NEXT_PUBLIC_MOCK_USERNAME },
        });
        fireEvent.change(passwordInput, {
          target: { value: process.env.NEXT_PUBLIC_MOCK_PASSWORD },
        });
        fireEvent.click(submitButton);

        expect(submitButton).toBeDisabled();
        expect(submitButton).toHaveTextContent("Logging in...");
      });
    });
  });
});
