import { fireEvent, screen, render } from "@testing-library/react";
import Description from "../Description";

describe("Description", () => {
  it("should render a textarea with a placeholder", () => {
    render(<Description description="" setDescription={() => {}} />);
    const textarea = screen.getByPlaceholderText(
      "Please provide details about the issue..."
    );
    expect(textarea).toBeInTheDocument();
  });

  it("should call setDescription when the textarea value changes", () => {
    const setDescription = jest.fn();
    render(<Description description="" setDescription={setDescription} />);
    const textarea = screen.getByPlaceholderText(
      "Please provide details about the issue..."
    );
    fireEvent.change(textarea, { target: { value: "new description" } });
    expect(setDescription).toHaveBeenCalledWith("new description");
  });
});
