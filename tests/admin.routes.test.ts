import request from "supertest";
import App from "../src/server";
import mongoose from "mongoose";

describe("Admin route - auth failure", () => {
  it("Should reject request if token was send invalid", async () => {
    const res = await request(App)
      .post("/admins/route/users")
      .set("Authorization", "Bearer fake.jwt.token")
      .send();
    expect(res.statusCode).toBe(401);
    expect(res.body).toEqual({ message: "Invalid or expired token" });
  });

  it("Should reject request if token was not send", async () => {
    const res = await request(App).post("/admins/route/users").send();

    expect(res.statusCode).toBe(401);
    expect(res.body).toEqual({
      success: 0,
      data: "Please clear session and login again ",
    });
  });
  afterAll(async () => {
    await mongoose.disconnect();
  });
});
