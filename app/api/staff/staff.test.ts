import { createClient } from "@/app/utils";
import { GET } from "./route";

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

describe("GET staff", () => {
  it("returns staff data successfully", async () => {
    const mockSelect = jest.fn().mockResolvedValue({
      data: [{ id: 1, name: "Test User" }],
      error: null,
    });

    (createClient as jest.Mock).mockResolvedValue({
      from: () => ({ select: mockSelect }),
    });

    const response = await GET();
    const json = await response.json();

    expect(response.status).toBe(200);
    expect(json).toEqual({
      response: [{ id: 1, name: "Test User" }],
      message: "Staff fetched successfully",
    });
  });

  it("handles errors", async () => {
    const mockSelect = jest.fn().mockResolvedValue({
      data: null,
      error: { message: "Database error" },
    });

    (createClient as jest.Mock).mockResolvedValue({
      from: () => ({ select: mockSelect }),
    });

    const response = await GET();
    const json = await response.json();

    expect(response.status).toBe(500);
    expect(json).toEqual({
      message: "Database error",
    });
  });
});
