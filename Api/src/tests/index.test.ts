import app from "../app"
import request from "supertest"
import mongoose, { mongo } from "mongoose"
import config from "../config"
import Product from "../interfaces/product.interface"

describe("GET /components",() => {
  beforeAll(async ()=>{
    await mongoose.connect(`${config.MONGO_DATABASE}`)
  })

  afterAll(async () => {
    await mongoose.disconnect()
  })

  test("In 'data' property it should return an array of components", async function () {
     const response =  await request(app).get("/components").send()
     expect(response.body.error).toBe(false);
     expect(response.statusCode).toBe(200);
     expect(Array.isArray(response.body.data)).toBe(true);
     expect(response.body.total).toBe(123)
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


