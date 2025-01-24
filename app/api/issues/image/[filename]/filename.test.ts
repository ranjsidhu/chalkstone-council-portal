import { GET } from "./route";
import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/app/utils";

jest.mock("@/app/utils", () => ({
  createClient: jest.fn(),
}));

jest.mock("next/server", () => {
  const originalModule = jest.requireActual("next/server");
  return {
    ...originalModule,
    NextResponse: {
      json: jest.fn().mockImplementation((data, init) => ({
        status: init?.status || 200,
        json: async () => data,
      })),
    },
  };
});

describe("GET /image", () => {
  const mockReq = {} as NextRequest;

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("downloads image successfully", async () => {
    const mockArrayBuffer = new ArrayBuffer(4);
    const mockFile = {
      arrayBuffer: () => Promise.resolve(mockArrayBuffer),
      type: "image/jpeg",
    };

    (createClient as jest.Mock).mockResolvedValue({
      storage: {
        from: () => ({
          download: () => Promise.resolve({ data: mockFile, error: null }),
        }),
      },
    });

    const response = (await GET(mockReq, {
      params: Promise.resolve({ filename: "test.jpg" }),
    })) as NextResponse;

    expect(response.status).toBe(200);
  });

  it("handles missing filename", async () => {
    const response = await GET(mockReq, {
      params: Promise.resolve({} as any),
    });
    const data = await response.json();
    expect(data).toEqual({ error: "No filename provided" });
  });

  it("handles download error", async () => {
    (createClient as jest.Mock).mockResolvedValue({
      storage: {
        from: () => ({
          download: () =>
            Promise.resolve({
              data: null,
              error: { message: "Download failed" },
            }),
        }),
      },
    });

    const response = await GET(mockReq, {
      params: Promise.resolve({ filename: "test.jpg" }),
    });
    const data = await response.json();
    expect(data).toEqual({ error: "Download failed" });
  });
});
