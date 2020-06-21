const app = require("../../app");
const supertest = require("supertest");
const mongoose = require("mongoose");

describe("Auth module", () => {
  beforeAll((done) => {
    mongoose.connection.once("open", () => {
      done();
    });
  });

  it("should login into system", async () => {
    const result = await supertest(app).post("/api/auth/login").send({
      email: "test1@test.com",
      password: "123456",
    });
    expect(result.statusCode).toBe(200);
    expect(result.body).toMatchObject({
      message: "hello from authUser controller",
    });
    expect(result.body.message).toBe("hello from authUser controller");
  });

  it("should not login into system", async () => {
    const result = await supertest(app).post("/api/auth/login").send({
      email: "tsadf@test.com",
      password: "123456",
    });
    expect(result.statusCode).toBe(404);
    expect(result.body).toMatchObject([
      { status: 404, message: "user not exists" },
    ]);
  });

  afterAll((done) => {
    mongoose.connection.close(() => {
      done();
    });
  });
});
