import { render, screen } from "@testing-library/react";
import SubmitButton from "../SubmitButton";

jest.mock("lucide-react", () => ({
  Send: () => <div data-testid="send-icon" />,
}));

describe("SubmitButton", () => {
  it("renders submit button with icon and text", () => {
    render(<SubmitButton />);
    expect(screen.getByRole("button")).toBeInTheDocument();
    expect(screen.getByTestId("send-icon")).toBeInTheDocument();
    expect(screen.getByText("Submit Report")).toBeInTheDocument();
  });
});
