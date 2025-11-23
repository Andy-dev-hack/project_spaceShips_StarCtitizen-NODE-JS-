import request from "supertest";
import mongoose from "mongoose";
import { app } from "../server.js";
import { Nave } from "../models/naves.model.js";
import "dotenv/config";

beforeAll(async () => {
  await mongoose.connect(process.env.MONGO_URI);
});

afterAll(async () => {
  await mongoose.connection.close();
});

describe("Naves API", () => {
  beforeEach(async () => {
    await Nave.deleteMany({});
  });

  it("should create a new nave", async () => {
    const res = await request(app).post("/naves").send({
      name: "X-Wing",
      price: 1000,
    });
    expect(res.statusCode).toEqual(201);
    expect(res.body.name).toEqual("X-Wing");
  });

  it("should get all naves", async () => {
    await Nave.create({ name: "TIE Fighter", price: 500 });
    const res = await request(app).get("/naves");
    expect(res.statusCode).toEqual(200);
    expect(res.body.data.length).toBe(1);
    expect(res.body.data[0].name).toEqual("TIE Fighter");
  });
});
