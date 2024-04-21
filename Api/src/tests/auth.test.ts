import app from "../app"
import request, { Response } from "supertest"
import mongoose from "mongoose"
import config from "../config"
import { UserInterface } from "../interfaces/user.interface"

describe("Tests /auth", () => {
    beforeAll(async () => {
        await mongoose.connect(`${config.MONGO_DATABASE}`)
    })

    afterAll(async () => {
        await mongoose.disconnect()
    })

    let failUser = {
        email: "usuariodeprueba@test.com",
        password: "passworddeprueba"
    }

    let existUser = {
        name: "Lagertha",
        userName: "Lagertha",
        email: "Lagertha@asgard.com",
        password: "passworddeprueba"
    }

    let newUser: any = {
        name: "usuario nuevo",
        userName: "NuevoUser",
        email: "usuariodeprueba@test.com",
        password: "passworddeprueba"
    }

    describe("POST /auth/signup", () => {

        it("Should return an error message when missing fields to create user", async () => {
            const response = await request(app).post("/auth/signup").send(failUser)
            expect(response.statusCode).toBe(400)
            expect(response.body.message).toBe("Faltan campos requeridos: name, userName")
        })

        it("Should return an error message when the username and email are in use", async () => {
            const response = await request(app).post("/auth/signup").send(existUser)
            expect(typeof response.body.data.message).toBe("string")
        })

        it("Should return a json with user info", async () => {
            const response = await request(app).post("/auth/signup").send(newUser)
            newUser = response.body.data
            expect(response.statusCode).toBe(200)
            expect(response.body.data).toBeInstanceOf(Object)
            expect(response.body.data).toEqual(expect.objectContaining({
                id: expect.any(String),
                name: expect.any(String),
                email: expect.any(String),
                userName: expect.any(String),
                image: expect.any(String),
                favorites: expect.any(Array),
                cart: expect.any(Array),
              }));
            await request(app).delete(`/users/${newUser.id}`).send()
        })
    })
})