import { GET } from "./route";
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

describe("GET /count", () => {
  it("returns issue count successfully", async () => {
    (createClient as jest.Mock).mockResolvedValue({
      from: () => ({
        select: () => Promise.resolve({ count: 5, error: null }),
      }),
    });

    const response = await GET();
    const data = await response.json();

    expect(data).toEqual({
      message: "Successfully fetched issue count",
      response: 5,
    });
  });

  it("handles errors", async () => {
    (createClient as jest.Mock).mockResolvedValue({
      from: () => ({
        select: () =>
          Promise.resolve({
            count: null,
            error: { message: "Database error" },
          }),
      }),
    });

    const response = await GET();
    const data = await response.json();

    expect(data).toEqual({
      error: "Database error",
    });
  });
});
