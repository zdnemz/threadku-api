import { request, setup } from "../../config";

describe("POST /api/users/create", () => {
  beforeAll(async () => {
    await setup.connectDb();
  });

  afterAll(async () => {
    await setup.deleteUser();

    await setup.disconnectDb();
  });

  it("should return 201 Created", async () => {
    const response = await request.post("/api/users/create").send({
      username: "test",
      email: "example@test.com",
      password: "test123456",
    });

    expect(response.status).toBe(201);
    expect(response.headers["set-cookie"]).toBeTruthy();
    expect(response.headers["set-cookie"][0]).toContain("accessToken");
    expect(response.body.success).toBe(true);
    expect(response.body.code).toBe(201);
    expect(response.body.message).toBe("Created");
  });

  it("should return 400 Bad Request if missing required fields", async () => {
    const response = await request.post("/api/users/create").send({
      username: "test",
    });

    expect(response.status).toBe(400);
    expect(response.headers["set-cookie"]).toBeFalsy();
    expect(response.body.success).toBe(false);
    expect(response.body.code).toBe(400);
    expect(response.body.message).toBe("Bad Request");
    expect(response.body.data.details).toBeDefined();
  });

  it("should return 400 Bad Request if email already exists", async () => {
    const response = await request.post("/api/users/create").send({
      username: "test2",
      email: "example@test.com",
      password: "test123456",
    });

    expect(response.status).toBe(400);
    expect(response.headers["set-cookie"]).toBeFalsy();
    expect(response.body.success).toBe(false);
    expect(response.body.code).toBe(400);
    expect(response.body.message).toBe("Bad Request");
    expect(response.body.data.details).toBeDefined();
  });

  it("should return 400 Bad Request if username already exists", async () => {
    const response = await request.post("/api/users/create").send({
      username: "test",
      email: "example2@test.com",
      password: "test123456",
    });

    expect(response.status).toBe(400);
    expect(response.headers["set-cookie"]).toBeFalsy();
    expect(response.body.success).toBe(false);
    expect(response.body.code).toBe(400);
    expect(response.body.message).toBe("Bad Request");
    expect(response.body.data.details).toBeDefined();
  });
});
