import { jwt, setup, request } from "../../../config";
import type { Models } from "../../../types";

let accessToken: string | null;
let user: Models.IUser | undefined;

describe("PUT /api/users/update/username", () => {
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
      .put("/api/users/update/username")
      .send({
        username: "testing",
      })
      .set("Cookie", [`accessToken=${accessToken}`]);

    expect(response.status).toBe(200);
    expect(response.body.success).toBe(true);
    expect(response.body.code).toBe(200);
    expect(response.body.message).toBe("OK");
  });

  it("should return 400 Bad Request if missing required fields", async () => {
    const response = await request
      .put("/api/users/update/username")
      .set("Cookie", [`accessToken=${accessToken}`]);

    expect(response.status).toBe(400);
    expect(response.body.success).toBe(false);
    expect(response.body.code).toBe(400);
    expect(response.body.message).toBe("Bad Request");
  });

  it("should return 400 Bad Request if username is same as previous", async () => {
    const response = await request
      .put("/api/users/update/username")
      .send({
        username: user?.username,
      })
      .set("Cookie", [`accessToken=${accessToken}`]);

    expect(response.status).toBe(400);
    expect(response.body.success).toBe(false);
    expect(response.body.code).toBe(400);
    expect(response.body.message).toBe("Bad Request");
  });

  it("should return 401 Unauthorized if accessToken is missing", async () => {
    const response = await request.put("/api/users/update/username").send({
      username: "testing2",
    });

    expect(response.status).toBe(401);
    expect(response.body.success).toBe(false);
    expect(response.body.code).toBe(401);
    expect(response.body.message).toBe("Unauthorized");
  });
});
