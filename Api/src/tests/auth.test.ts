import app from "../app"
import request, { Response } from "supertest"
import mongoose from "mongoose"
import config from "../config"

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
        userName:"Lagertha",
        email: "Lagertha@asgard.com",
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
    })
})