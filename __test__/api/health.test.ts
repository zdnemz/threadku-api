import { request } from "../config";

describe("GET /api/health", () => {
  it("should return 200 OK if server is up", async () => {
    const response = await request.get("/api/health");

    expect(response.status).toBe(200);
    expect(response.body.message).toBe("OK");
  });
});
