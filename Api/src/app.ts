import router from "./routes"
import express, { Application} from "express"
import cors  from "cors"
import morgan from "morgan"

const app: Application = express()

app.use(morgan("dev"))
app.use(express.json())
app.use(cors({
  origin:"https://component-store-delta.vercel.app",
  methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
  credentials: true,
}))
app.options("*", cors())
app.use(router)

export default app

