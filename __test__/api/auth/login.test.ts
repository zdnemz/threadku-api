import { setup, request } from "../../config";
import type { Models } from "../../types";

let user: Models.IUser | undefined;

describe("PUT /api/auth/login", () => {
  beforeAll(async () => {
    await setup.connectDb();
    user = await setup.createUser();
  });

  afterAll(async () => {
    await setup.deleteUser();

    user = undefined;

    await setup.disconnectDb();
  });

  it("should return 200 OK if login with email", async () => {
    const response = await request.post("/api/auth/login").send({
      email: user?.email,
      password: "testpassword",
    });

    expect(response.status).toBe(200);
    expect(response.headers["set-cookie"]).toBeTruthy();
    expect(response.headers["set-cookie"][0]).toContain("accessToken");
    expect(response.body.success).toBe(true);
    expect(response.body.code).toBe(200);
    expect(response.body.message).toBe("OK");
  });

  it("should return 200 OK if login with username", async () => {
    const response = await request.post("/api/auth/login").send({
      username: user?.username,
      password: "testpassword",
    });

    expect(response.status).toBe(200);
    expect(response.headers["set-cookie"]).toBeTruthy();
    expect(response.headers["set-cookie"][0]).toContain("accessToken");
    expect(response.body.success).toBe(true);
    expect(response.body.code).toBe(200);
    expect(response.body.message).toBe("OK");
  });

  it("should return 401 Bad Request if missing required fields", async () => {
    const response = await request.post("/api/auth/login").send({
      username: user?.username,
    });

    expect(response.status).toBe(400);
    expect(response.body.success).toBe(false);
    expect(response.body.code).toBe(400);
    expect(response.body.message).toBe("Bad Request");
    expect(response.body.data.details).toBeDefined();
  });

  it("should return 400 Unauthorized if password is incorrect", async () => {
    const response = await request.post("/api/auth/login").send({
      username: user?.username,
      password: "wrongpassword",
    });

    expect(response.status).toBe(401);
    expect(response.body.success).toBe(false);
    expect(response.body.code).toBe(401);
    expect(response.body.message).toBe("Unauthorized");
    expect(response.body.data.details).toBe(
      "Username or password is incorrect"
    );
  });

  it("should return 401 Unauthorized if username is incorrect", async () => {
    const response = await request.post("/api/auth/login").send({
      username: "wrongusername",
      password: "testpassword",
    });

    expect(response.status).toBe(401);
    expect(response.body.success).toBe(false);
    expect(response.body.code).toBe(401);
    expect(response.body.message).toBe("Unauthorized");
    expect(response.body.data.details).toBe(
      "Username or password is incorrect"
    );
  });

  it("should return 401 Unauthorized if email is incorrect", async () => {
    const response = await request.post("/api/auth/login").send({
      email: "wrong@test.com",
      password: "testpassword",
    });

    expect(response.status).toBe(401);
    expect(response.body.success).toBe(false);
    expect(response.body.code).toBe(401);
    expect(response.body.message).toBe("Unauthorized");
    expect(response.body.data.details).toBe("Email or password is incorrect");
  });
});
