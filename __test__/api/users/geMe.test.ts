import { jwt, setup, request } from "../../config";
import type { Models } from "../../types";

let accessToken: string | null;
let user: Models.IUser | undefined;

describe("PUT /api/users/me", () => {
  beforeAll(async () => {
    await setup.connectDb();
    user = await setup.createUser();

    accessToken = jwt.token(user!);
  });

  afterAll(async () => {
    await setup.deleteUser();

    accessToken = null;
    user = undefined;

    await setup.disconnectDb();
  });

  it("should return 200 OK", async () => {
    const response = await request
      .get("/api/users/me")
      .set("Cookie", `accessToken=${accessToken}`);

    expect(response.status).toBe(200);
    expect(response.body.success).toBe(true);
    expect(response.body.code).toBe(200);
    expect(response.body.message).toBe("OK");
    expect(response.body.data.username).toBe(user?.username);
    expect(response.body.data.email).toBe(user?.email);
  });

  it("should return 401 Unauthorized if access token is missing", async () => {
    const response = await request.get("/api/users/me");

    expect(response.status).toBe(401);
    expect(response.body.success).toBe(false);
    expect(response.body.code).toBe(401);
    expect(response.body.message).toBe("Unauthorized");
  });
});
