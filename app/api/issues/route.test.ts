import { NextRequest } from "next/server";
import { GET, POST, PUT } from "./route";
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

describe("issues API", () => {
  const mockIssue = {
    id: 1,
    description: "Test issue",
    issue_statuses: { name: "Open" },
    issue_types: { name: "Maintenance" },
  };

  beforeEach(() => {
    jest.clearAllMocks();
    jest.spyOn(console, "error").mockImplementation(() => {});
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  describe("GET", () => {
    it("fetches issues successfully", async () => {
      (createClient as jest.Mock).mockResolvedValue({
        from: () => ({
          select: () => Promise.resolve({ data: [mockIssue], error: null }),
        }),
      });

      const response = await GET();
      const data = await response.json();

      expect(data).toEqual({
        response: [mockIssue],
        message: "Issues fetched successfully",
      });
      expect(response.status).toBe(200);
    });

    it("handles errors", async () => {
      (createClient as jest.Mock).mockResolvedValue({
        from: () => ({
          select: () => Promise.resolve({ error: { message: "Fetch error" } }),
        }),
      });

      const response = await GET();
      const data = await response.json();

      expect(data).toEqual({ message: "Fetch error" });
      expect(response.status).toBe(500);
    });
  });

  describe("POST", () => {
    const mockBody = {
      position: [51.5, -0.1],
      issue: { id: 1 },
      description: "Test issue",
      address: "123 Test St",
      image_filename: "test.jpg",
    };

    it("creates issue successfully", async () => {
      (createClient as jest.Mock).mockResolvedValue({
        from: () => ({
          insert: () => ({
            select: () => Promise.resolve({ data: [mockIssue], error: null }),
          }),
        }),
      });

      const response = await POST(
        new Request("", {
          method: "POST",
          body: JSON.stringify(mockBody),
        }) as NextRequest
      );
      const data = await response.json();

      expect(data).toEqual({
        response: [mockIssue],
        message: "Issue created successfully",
      });
      expect(response.status).toBe(201);
    });

    it("handles creation errors", async () => {
      (createClient as jest.Mock).mockResolvedValue({
        from: () => ({
          insert: () => ({
            select: () =>
              Promise.resolve({ error: { message: "Creation error" } }),
          }),
        }),
      });

      const response = await POST(
        new Request("", {
          method: "POST",
          body: JSON.stringify(mockBody),
        }) as NextRequest
      );
      const data = await response.json();

      expect(data).toEqual({ message: "Creation error" });
      expect(response.status).toBe(500);
    });
  });

  describe("PUT", () => {
    const mockBody = {
      id: 1,
      status_name: "Resolved",
      description: "Updated description",
    };

    it("updates issue successfully", async () => {
      (createClient as jest.Mock).mockResolvedValue({
        from: () => ({
          update: () => ({
            eq: () => ({
              select: () => Promise.resolve({ data: [mockIssue], error: null }),
            }),
          }),
          insert: () => Promise.resolve({ error: null }),
        }),
      });

      const response = await PUT(
        new Request("", {
          method: "PUT",
          body: JSON.stringify(mockBody),
        }) as NextRequest
      );
      const data = await response.json();

      expect(data.response[0]).toEqual({
        ...mockIssue,
      });
      expect(response.status).toBe(200);
    });

    it("handles closed status", async () => {
      const closedBody = {
        id: 1,
        status_name: "Closed",
        resolved_at: "2024-01-24",
        description: "Closed issue",
      };

      (createClient as jest.Mock).mockResolvedValue({
        from: () => ({
          update: () => ({
            eq: () => ({
              select: () => Promise.resolve({ data: [mockIssue], error: null }),
            }),
          }),
        }),
      });

      const response = await PUT(
        new Request("", {
          method: "PUT",
          body: JSON.stringify(closedBody),
        }) as NextRequest
      );
      const data = await response.json();

      expect(data.response).not.toHaveProperty("resolved_at");
    });

    it("handles update errors", async () => {
      (createClient as jest.Mock).mockResolvedValue({
        from: () => ({
          update: () => ({
            eq: () => ({
              select: () =>
                Promise.resolve({ error: { message: "Update error" } }),
            }),
          }),
        }),
      });

      const response = await PUT(
        new Request("", {
          method: "PUT",
          body: JSON.stringify(mockBody),
        }) as NextRequest
      );
      const data = await response.json();

      expect(data).toEqual({ message: "Update error" });
      expect(response.status).toBe(500);
    });
  });
});
