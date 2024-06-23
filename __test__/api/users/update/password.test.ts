import { jwt, setup, request } from "../../../config";
import type { Models } from "../../../types";

let accessToken: string | null;
let user: Models.IUser | undefined;

describe("PUT /api/users/update/password", () => {
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
      .put("/api/users/update/password")
      .send({
        oldPassword: "testpassword",
        newPassword: "testing",
      })
      .set("Cookie", [`accessToken=${accessToken}`]);

    expect(response.headers["set-cookie"]).toBeTruthy();
    expect(response.headers["set-cookie"][0]).toContain("accessToken");
    expect(response.headers["set-cookie"][0].split("=")[1]).not.toBe(accessToken);
    expect(response.status).toBe(200);
    expect(response.body.success).toBe(true);
    expect(response.body.code).toBe(200);
    expect(response.body.message).toBe("OK");
  });
});