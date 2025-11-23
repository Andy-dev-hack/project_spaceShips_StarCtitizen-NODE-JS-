import request from "supertest";
import mongoose from "mongoose";
import { app } from "../server.js";
import { User } from "../models/user.model.js";
import "dotenv/config";

beforeAll(async () => {
  // Use a separate test database to avoid wiping real data
  await mongoose.connect(process.env.MONGO_URI, { dbName: "naves_test" });
});

afterAll(async () => {
  await mongoose.connection.close();
});

describe("Auth API", () => {
  beforeEach(async () => {
    await User.deleteMany({});
  });

  it("should register a new user", async () => {
    const res = await request(app).post("/auth/register").send({
      username: "testuser",
      email: "test@example.com",
      password: "password123",
    });
    expect(res.statusCode).toEqual(201);
    expect(res.body).toHaveProperty("token");
  });

  it("should login an existing user", async () => {
    await request(app).post("/auth/register").send({
      username: "testuser",
      email: "test@example.com",
      password: "password123",
    });

    const res = await request(app).post("/auth/login").send({
      email: "test@example.com",
      password: "password123",
    });
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty("token");
  });
});
