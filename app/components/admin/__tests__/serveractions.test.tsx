import { updateIssueStatus } from "../serveractions";
import fetchMock from "jest-fetch-mock";
import { IssueStatusType } from "@/app/types";

describe("updateIssueStatus", () => {
  beforeEach(() => {
    fetchMock.resetMocks();
    process.env.NEXT_PUBLIC_SITE_URL = "http://localhost:3000";
    global.console.error = jest.fn();
  });

  it("should successfully update issue status", async () => {
    const mockStatus: IssueStatusType = {
      id: 1,
      name: "In Progress",
    };

    fetchMock.mockResponseOnce(JSON.stringify({}), { status: 200 });

    await updateIssueStatus(mockStatus, 123);

    expect(fetchMock).toHaveBeenCalledWith("http://localhost:3000/api/issues", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: 123,
        status_id: 1,
        status_name: "In Progress",
        resolved_at: null,
      }),
    });
  });

  it("should set resolved_at when status is Resolved", async () => {
    const mockStatus: IssueStatusType = {
      id: 2,
      name: "Resolved",
    };

    jest.useFakeTimers();
    const mockDate = new Date("2024-01-23T12:00:00Z");
    jest.setSystemTime(mockDate);

    fetchMock.mockResponseOnce(JSON.stringify({}), { status: 200 });

    await updateIssueStatus(mockStatus, 123);

    expect(fetchMock).toHaveBeenCalledWith("http://localhost:3000/api/issues", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: 123,
        status_id: 2,
        status_name: "Resolved",
        resolved_at: mockDate.toISOString(),
      }),
    });

    jest.useRealTimers();
  });

  it("should handle fetch error", async () => {
    const mockStatus: IssueStatusType = {
      id: 1,
      name: "In Progress",
    };

    fetchMock.mockRejectOnce(new Error("Network error"));

    await updateIssueStatus(mockStatus, 123);

    expect(console.error).toHaveBeenCalledWith(
      "Error updating issue status: Network error"
    );
  });

  it("should handle non-ok response", async () => {
    const mockStatus: IssueStatusType = {
      id: 1,
      name: "In Progress",
    };

    fetchMock.mockResponseOnce("", { status: 400, statusText: "Bad Request" });

    await updateIssueStatus(mockStatus, 123);

    expect(console.error).toHaveBeenCalledWith(
      "Error updating issue status: Bad Request"
    );
  });
});
