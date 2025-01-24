import { GET } from "./route";
import { NextRequest } from "next/server";
import { createClient } from "@/app/utils";

jest.mock("@/app/utils", () => ({
  createClient: jest.fn(),
}));

jest.mock("next/server", () => ({
  NextResponse: {
    json: jest.fn().mockImplementation((data, init) => ({
      status: init?.status || 200,
      json: async () => data,
    })),
  },
}));

describe("GET /issue", () => {
  const mockIssueData = [
    {
      id: 1,
      image_filename: null,
      issue_statuses: { name: "Open" },
      issue_types: { name: "Maintenance" },
    },
  ];

  const mockParams = Promise.resolve({ id: "1" });
  const mockReq = {} as NextRequest;

  it("returns issue data without image", async () => {
    const mockSelect = jest.fn().mockReturnThis();
    const mockEq = jest.fn().mockResolvedValue({ data: mockIssueData });

    (createClient as jest.Mock).mockResolvedValue({
      from: () => ({
        select: mockSelect,
        eq: mockEq,
      }),
    });

    const response = await GET(mockReq, { params: mockParams });
    const data = await response.json();

    expect(data).toEqual({
      message: "Successfully fetched issue data",
      response: mockIssueData,
    });
  });

  it("returns issue data with image", async () => {
    const mockIssueWithImage = [
      {
        ...mockIssueData[0],
        image_filename: "test.jpg",
      },
    ];

    const mockSelect = jest.fn().mockReturnThis();
    const mockEq = jest.fn().mockResolvedValue({ data: mockIssueWithImage });
    const mockGetPublicUrl = jest.fn().mockReturnValue({
      data: { publicUrl: "http://test.com/test.jpg" },
    });

    (createClient as jest.Mock).mockResolvedValue({
      from: () => ({
        select: mockSelect,
        eq: mockEq,
      }),
      storage: {
        from: () => ({
          getPublicUrl: mockGetPublicUrl,
        }),
      },
    });

    const response = await GET(mockReq, { params: mockParams });
    const data = await response.json();

    expect(data).toEqual({
      message: "Successfully fetched issue data",
      response: {
        ...mockIssueWithImage,
        image: "http://test.com/test.jpg",
      },
    });
  });

  it("handles missing id", async () => {
    const response = await GET(mockReq, { params: Promise.resolve({} as any) });
    const data = await response.json();

    expect(data).toEqual({
      error: "The id is undefined",
    });
  });

  it("handles database errors", async () => {
    (createClient as jest.Mock).mockResolvedValue({
      from: () => ({
        select: () => ({
          eq: () => ({ data: null, error: { message: "Database error" } }),
        }),
      }),
    });

    const response = await GET(mockReq, { params: mockParams });
    const data = await response.json();

    expect(data).toEqual({
      error: "Database error",
    });
  });
});
