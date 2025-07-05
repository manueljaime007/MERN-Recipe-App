import expresss, { urlencoded } from "express";
import { routes } from "./routes/routes.js";
import cors from "cors"

export const app = expresss();

app.use(cors())
app.use(expresss.json())
app.use(urlencoded({ extended: true }))

app.use("/api/v1/", routes)


