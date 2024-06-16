import { setup, request } from "../../config";
import type { Models } from "../../types";

let user: Models.IUser | undefined;

describe("PUT /api/users/[username]", () => {
  beforeAll(async () => {
    await setup.connectDb();
    user = await setup.createUser();
  });

  afterAll(async () => {
    await setup.deleteUser();

    user = undefined;

    await setup.disconnectDb();
  });

  it("should return 200 OK", async () => {
    const response = await request.get(`/api/users/${user!.username}`);

    expect(response.status).toBe(200);
    expect(response.body.success).toBe(true);
    expect(response.body.code).toBe(200);
    expect(response.body.message).toBe("OK");
    expect(response.body.data).toHaveProperty("profile");
    expect(response.body.data._id).toBe(user?.id);
    expect(response.body.data.username).toBe(user?.username);
  });

  it("should return 404 Not Found if id is invalid", async () => {
    const response = await request.get("/api/users/wrongusername");

    expect(response.status).toBe(404);
    expect(response.body.success).toBe(false);
    expect(response.body.code).toBe(404);
    expect(response.body.message).toBe("Not Found");
    expect(response.body.data.details).toBe("User not found");
  });
});
