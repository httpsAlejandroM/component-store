import app from "../app"
import request, { Response } from "supertest"
import mongoose from "mongoose"
import config from "../config"
import Product from "../interfaces/product.interface"

describe("Tests /Components ", () => {
  beforeAll(async () => {
    await mongoose.connect(`${config.MONGO_DATABASE}`)
  })

  afterAll(async () => {
    await mongoose.disconnect()
  })

  describe("GET /Components", () => {
    let response: Response

    beforeEach(async () => {
      response = await request(app).get("/components").send()
    })

    it("Status code must be 200", async () => {
      expect(response.statusCode).toBe(200)
    })

    it("Error properte must be false", async () => {
      expect(response.body.error).toBe(false)
    })

    it("'data' property should be of type array", async () => {
      expect(response.body.data).toBeInstanceOf(Array)
    })

    it("'data' property it should return an array of components", async () => {
      response.body.data.forEach((product: Product) => {
        expect(product).toEqual(expect.objectContaining({
          _id: expect.any(String),
          title: expect.any(String),
          brand: expect.any(String),
          image: expect.any(String),
          description: expect.arrayContaining([expect.any(String)]),
          category: expect.any(String),
          price: expect.any(Number),
          stock: expect.any(Number),
          banned: expect.any(Boolean),
        }));
      });
    })
  })

  describe("GET /Components?= Querys Test", () => {

    it("Query failed", async () => {
      const res = await request(app).get("/components?title=asdasdasdasdasdsaddad").send()
      expect(typeof res.body.data.message === "string").toBe(true)
    })

    it("Query by title success", async () => {
      const res = await request(app).get("/components?title=playstation").send()
      expect(res.body.data.length).toBeGreaterThan(0)
    })

    it("Query by category success", async () => {
      const res = await request(app).get("/components?category=consolas").send()
      expect(res.body.data.length).toBeGreaterThan(0)
    })

    it("Query by brand success", async () => {
      const res = await request(app).get("/components?brand=sony").send()
      expect(res.body.data.length).toBeGreaterThan(0)
    })

  })


})


