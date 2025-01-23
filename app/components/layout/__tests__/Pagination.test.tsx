import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import Pagination from "../Pagination";

jest.mock("lucide-react", () => ({
  ChevronLeft: () => <div data-testid="chevron-left">MockedChevronLeft</div>,
  ChevronRight: () => <div data-testid="chevron-right">MockedChevronRight</div>,
}));

describe("Pagination Component", () => {
  const mockOnPageChange = jest.fn();

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("renders correct number of pages when totalPages is 4 or less", () => {
    render(
      <Pagination
        currentPage={1}
        totalPages={3}
        onPageChange={mockOnPageChange}
      />
    );
    expect(screen.getByText("1")).toBeInTheDocument();
    expect(screen.getByText("2")).toBeInTheDocument();
    expect(screen.getByText("3")).toBeInTheDocument();
  });

  it("renders ellipsis and correct pages when totalPages is greater than 4", () => {
    render(
      <Pagination
        currentPage={3}
        totalPages={7}
        onPageChange={mockOnPageChange}
      />
    );
    expect(screen.getByText("1")).toBeInTheDocument();
    expect(screen.getByText("3")).toBeInTheDocument();
    expect(screen.getByText("4")).toBeInTheDocument();
    expect(screen.getByText("7")).toBeInTheDocument();
    expect(screen.getAllByText("...").length).toBe(1);
  });

  it("disables the previous button on the first page", () => {
    render(
      <Pagination
        currentPage={1}
        totalPages={5}
        onPageChange={mockOnPageChange}
      />
    );
    const prevButton = screen.getByRole("button", {
      name: /MockedChevronLeft/i,
    });
    expect(prevButton).toBeDisabled();
  });

  it("disables the next button on the last page", () => {
    render(
      <Pagination
        currentPage={5}
        totalPages={5}
        onPageChange={mockOnPageChange}
      />
    );
    const nextButton = screen.getByRole("button", {
      name: /MockedChevronRight/i,
    });
    expect(nextButton).toBeDisabled();
  });

  it("calls onPageChange with the correct page when a page button is clicked", () => {
    render(
      <Pagination
        currentPage={2}
        totalPages={5}
        onPageChange={mockOnPageChange}
      />
    );
    const pageButton = screen.getByText("3");
    fireEvent.click(pageButton);
    expect(mockOnPageChange).toHaveBeenCalledWith(3);
  });

  it("calls onPageChange with the previous page when the previous button is clicked", () => {
    render(
      <Pagination
        currentPage={3}
        totalPages={5}
        onPageChange={mockOnPageChange}
      />
    );
    const prevButton = screen.getByRole("button", {
      name: /MockedChevronLeft/i,
    });
    fireEvent.click(prevButton);
    expect(mockOnPageChange).toHaveBeenCalledWith(2);
  });

  it("calls onPageChange with the next page when the next button is clicked", () => {
    render(
      <Pagination
        currentPage={3}
        totalPages={5}
        onPageChange={mockOnPageChange}
      />
    );
    const nextButton = screen.getByRole("button", {
      name: /MockedChevronRight/i,
    });
    fireEvent.click(nextButton);
    expect(mockOnPageChange).toHaveBeenCalledWith(4);
  });

  it("renders only the first page if totalPages is 1", () => {
    render(
      <Pagination
        currentPage={1}
        totalPages={1}
        onPageChange={mockOnPageChange}
      />
    );
    expect(screen.getByText("1")).toBeInTheDocument();
    expect(screen.queryByText("2")).not.toBeInTheDocument();
  });
});
