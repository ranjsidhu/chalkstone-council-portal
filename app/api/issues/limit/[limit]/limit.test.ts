import { GET } from "./route";
import { NextRequest } from "next/server";
import { createClient } from "@/app/utils";

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
  const mockIssues = [
    {
      id: 1,
      description: "Test issue",
      address: "123 Test St",
      created_at: "2024-01-01",
      issue_statuses: { name: "Open" },
      issue_types: { name: "Maintenance" },
    },
  ];

  const mockReq = {} as NextRequest;

  it("returns paginated issues successfully", async () => {
    const mockSelect = jest
      .fn()
      .mockReturnThis()
      .mockImplementation(() => ({
        range: jest.fn().mockReturnThis(),
        order: jest.fn().mockResolvedValue({ data: mockIssues }),
        select: jest.fn().mockResolvedValue({ count: 10 }),
      }));

    (createClient as jest.Mock).mockResolvedValue({
      from: () => ({
        select: mockSelect,
      }),
    });

    const response = await GET(mockReq, {
      params: Promise.resolve({ limit: "1" }),
    });
    const data = await response.json();

    expect(data).toEqual({
      message: "Successfully fetched 1 issues",
      response: mockIssues,
      totalCount: 0,
    });
  });

  it("handles missing limit parameter", async () => {
    const response = await GET(mockReq, { params: Promise.resolve({} as any) });
    const data = await response.json();

    expect(data).toEqual({
      error: "The limit is undefined",
      totalCount: 0,
    });
  });

  it("handles database errors", async () => {
    (createClient as jest.Mock).mockResolvedValue({
      from: () => ({
        select: () => ({
          range: () => ({
            order: () => ({ data: null, error: { message: "Database error" } }),
          }),
        }),
      }),
    });

    const response = await GET(mockReq, {
      params: Promise.resolve({ limit: "1" }),
    });
    const data = await response.json();

    expect(data).toEqual({
      error: "Database error",
      totalCount: 0,
    });
  });

  it("handles count error", async () => {
    const mockCountError = new Error("Count error");

    (createClient as jest.Mock).mockResolvedValue({
      from: () => ({
        select: (query?: string, options?: any) => {
          if (options?.count) {
            return Promise.resolve({ count: null, error: mockCountError });
          }
          return {
            range: () => ({
              order: () => Promise.resolve({ data: [], error: null }),
            }),
          };
        },
      }),
    });

    const response = await GET(mockReq, {
      params: Promise.resolve({ limit: "1" }),
    });
    const data = await response.json();

    expect(data).toEqual({
      error: mockCountError.message,
      totalCount: 0,
    });
  });
});
