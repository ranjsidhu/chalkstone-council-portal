import { NextRequest } from "next/server";
import { POST } from "./route";
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

describe("POST /upload", () => {
  const mockFormData = new FormData();
  mockFormData.append("filename", "test.jpg");
  mockFormData.append("image", new Blob(["test"]), "test.jpg");

  const mockRequest = {
    formData: jest.fn().mockResolvedValue(mockFormData),
  } as unknown as NextRequest;

  it("uploads file successfully", async () => {
    const mockUpload = jest.fn().mockResolvedValue({ error: null });
    (createClient as jest.Mock).mockResolvedValue({
      storage: {
        from: () => ({
          upload: mockUpload,
        }),
      },
    });

    const response = await POST(mockRequest);
    const data = await response.json();

    expect(response.status).toBe(200);
    expect(data).toEqual({ message: "File uploaded sucessfully" });
    expect(mockUpload).toHaveBeenCalledWith("test.jpg", expect.any(Blob));
  });

  it("handles upload errors", async () => {
    const mockUpload = jest.fn().mockResolvedValue({
      error: { message: "Upload failed" },
    });
    (createClient as jest.Mock).mockResolvedValue({
      storage: {
        from: () => ({
          upload: mockUpload,
        }),
      },
    });

    const response = await POST(mockRequest);
    const data = await response.json();

    expect(response.status).toBe(500);
    expect(data).toEqual({
      message: "File upload failed",
      error: "Upload failed",
    });
  });
});
