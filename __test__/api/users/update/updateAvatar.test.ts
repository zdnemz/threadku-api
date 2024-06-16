import { jwt, setup, request } from "../../../config";
import type { Models } from "../../../types";
import path from "path";
import { promisify } from "util";
import fs from "fs";

const unlinkAsync = promisify(fs.unlink);

let accessToken: string | null;
let user: Models.IUser | undefined;
let avatarPath: string | undefined;

describe("PUT /api/users/update/avatar", () => {
  beforeAll(async () => {
    await setup.connectDb();
    user = await setup.createUser();

    accessToken = jwt.token(user!);
  });

  afterAll(async () => {
    unlinkAsync(path.join(process.cwd(), "public", "uploads", avatarPath!));

    accessToken = null;
    user = undefined;

    await setup.deleteUser();
    await setup.disconnectDb();
  });

  it("should return 200 OK on successful file upload", async () => {
    const filePath = path.join(
      process.cwd(),
      "__test__",
      "assets",
      "test-image-1.png"
    );

    const response = await request
      .put("/api/users/update/avatar")
      .attach("avatar", filePath)
      .set("Cookie", [`accessToken=${accessToken}`]);

    avatarPath = response.body.data.profile.avatar;

    expect(response.status).toBe(200);
    expect(response.body.success).toBe(true);
    expect(response.body.code).toBe(200);
    expect(response.body.message).toBe("OK");
  });

  it("should return 400 Bad Request if no file is attached", async () => {
    const response = await request
      .put("/api/users/update/avatar")
      .set("Cookie", [`accessToken=${accessToken}`]);

    expect(response.status).toBe(400);
    expect(response.body.success).toBe(false);
    expect(response.body.code).toBe(400);
    expect(response.body.message).toBe("Bad Request");
    expect(response.body.data.details).toBeDefined();
  });

  // bug 
  // it("should return 401 Unauthorized if accessToken is missing", async () => {
  //   const filePath = path.join(
  //     process.cwd(),
  //     "__test__",
  //     "assets",
  //     "test-image-2.png"
  //   );

  //   const response = await request
  //     .put("/api/users/update/avatar")
  //     .attach("avatar", filePath);

  //   expect(response.status).toBe(401);
  //   expect(response.body.success).toBe(false);
  //   expect(response.body.code).toBe(401);
  //   expect(response.body.message).toBe("Unauthorized");
  // });

  // it("should return 400 Bad Request if file is not an image", async () => {
  //   const filePath = path.join(
  //     process.cwd(),
  //     "__test__",
  //     "assets",
  //     "test-file.txt"
  //   );

  //   const response = await request
  //     .put("/api/users/update/avatar")
  //     .attach("avatar", filePath)
  //     .set("Cookie", [`accessToken=${accessToken}`]);

  //   expect(response.status).toBe(400);
  //   expect(response.body.success).toBe(false);
  //   expect(response.body.code).toBe(400);
  //   expect(response.body.message).toBe("Bad Request");
  //   expect(response.body.data.details).toBeDefined();
  // });
});
