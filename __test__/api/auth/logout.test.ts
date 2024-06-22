import { jwt, setup, request } from "../../config";
import type { Models } from "../../types";

let accessToken: string | null;
let user: Models.IUser | undefined;

describe("PUT /api/auth/logout", () => {
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

  it("should return 204 OK", async () => {
    const response = await request
      .delete("/api/auth/logout")
      .set("Cookie", [`accessToken=${accessToken}`]);

    const cookies = response.headers["set-cookie"] as unknown as string[];
    const accessTokenCookie = cookies.find((cookie) =>
      cookie.startsWith("accessToken=")
    );

    expect(response.status).toBe(204);
    expect(accessTokenCookie).toBeDefined();
    expect(
      accessTokenCookie?.includes("Expires=Thu, 01 Jan 1970 00:00:00 GMT")
    ).toBe(true);
    expect(response.body.success).toBe(true);
    expect(response.body.code).toBe(204);
    expect(response.body.message).toBe("No Content");
  });

  it("should return 401 Unauthorized if access token is missing", async () => {
    const response = await request.delete("/api/auth/logout");

    expect(response.status).toBe(401);
    expect(response.body.success).toBe(false);
    expect(response.body.code).toBe(401);
    expect(response.body.message).toBe("Unauthorized");
  });
});
