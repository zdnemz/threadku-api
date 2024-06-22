import { request } from "../config";
import { v4 as uuid } from "uuid";
import { disconnectDb } from "../config/setup";

const randomString = uuid();

describe("GET /api/[randomString]", () => {
  afterAll(async () => {
    await disconnectDb();
  });

  it("should return 404 Not Found if route does not exist", async () => {
    const response = await request.get("/api/" + randomString);

    expect(response.status).toBe(404);
    expect(response.body.success).toBe(false);
    expect(response.body.code).toBe(404);
    expect(response.body.message).toBe("Not Found");
  });
});
