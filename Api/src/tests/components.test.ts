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

    it("'data' property it should return an array of components", async () => {
      expect(Array.isArray(response.body.data)).toBe(true)
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


  
})


