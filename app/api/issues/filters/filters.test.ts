import { GET } from "./route";
import { createClient } from "@/app/utils";
import { NextRequest } from "next/server";

jest.mock("@/app/utils", () => ({
  createClient: jest.fn(),
}));

jest.mock("next/server", () => ({
  NextResponse: {
    json: jest.fn().mockImplementation((data) => ({
      json: async () => data,
    })),
  },
}));

describe("GET /issues", () => {
  beforeEach(() => {
    jest.spyOn(console, "error").mockImplementation(() => {});
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  const mockIssue = {
    id: 1,
    issue_statuses: { id: 1, name: "Open" },
    issue_types: { id: 1, name: "Maintenance" },
    staff_issues: [{ staff_id: 1 }],
  };

  const createMockRequest = (params = {}) => {
    return {
      nextUrl: {
        searchParams: new URLSearchParams(params),
      },
    } as unknown as NextRequest;
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("returns filtered issues successfully", async () => {
    const mockSelect = jest
      .fn()
      .mockReturnThis()
      .mockImplementation(() => ({
        eq: jest.fn().mockReturnThis(),
        single: jest.fn().mockResolvedValue({ data: { id: 1 } }),
        range: jest.fn().mockReturnThis(),
        order: jest.fn().mockResolvedValue({ data: [mockIssue] }),
      }));

    (createClient as jest.Mock).mockResolvedValue({
      from: () => ({
        select: mockSelect,
      }),
    });

    const req = createMockRequest({
      status: "Open",
      type: "Maintenance",
      staff: "John",
      page: "1",
    });

    const response = await GET(req);
    const data = await response.json();

    expect(data).toEqual({
      response: [mockIssue],
      totalCount: 1,
    });
  });

  it("handles database errors", async () => {
    (createClient as jest.Mock).mockResolvedValue({
      from: () => ({
        select: () => ({
          eq: () => ({
            single: () => Promise.reject(new Error("Database error")),
          }),
        }),
      }),
    });

    const req = createMockRequest({ status: "Open" });
    const response = await GET(req);
    const data = await response.json();

    expect(data).toEqual({
      response: [],
      error: "Database error",
      totalCount: 0,
    });
  });

  it("handles count error", async () => {
    const mockError = new Error("Count error");

    (createClient as jest.Mock).mockResolvedValue({
      from: () => ({
        select: (query?: string, options?: any) => {
          if (options?.count) {
            return Promise.resolve({ count: null, error: mockError });
          }
          return {
            range: () => ({
              order: () => Promise.resolve({ data: [], error: null }),
            }),
          };
        },
      }),
    });

    const req = createMockRequest();
    const response = await GET(req);
    const data = await response.json();

    expect(data).toEqual({
      response: [],
      error: "Count error",
      totalCount: 0,
    });
  });

  it("returns unfiltered issues successfully", async () => {
    const mockSelect = jest
      .fn()
      .mockReturnThis()
      .mockImplementation(() => ({
        range: jest.fn().mockReturnThis(),
        order: jest.fn().mockResolvedValue({ data: [mockIssue] }),
      }));

    (createClient as jest.Mock).mockResolvedValue({
      from: () => ({
        select: mockSelect,
      }),
    });

    const req = createMockRequest();
    const response = await GET(req);
    const data = await response.json();

    expect(data).toEqual({
      response: [mockIssue],
      totalCount: 0,
    });
  });

  it("handles query error", async () => {
    const mockError = { message: "Query error" };

    (createClient as jest.Mock).mockResolvedValue({
      from: () => ({
        select: () => ({
          range: () => ({
            order: () => Promise.resolve({ data: null, error: mockError }),
          }),
        }),
      }),
    });

    const req = createMockRequest();
    const response = await GET(req);
    const data = await response.json();

    expect(data).toEqual({
      response: [],
      error: "Query error",
      totalCount: 0,
    });
  });
});
