import { config } from "dotenv";
config();

import { app } from "./app.js";
import { connectDB } from "./config/database.js";


const port = process.env.port

app.listen(port, ()=>{
    connectDB();
    console.log(`Server listenning on http://localhost:${port}  \n ${process.env.JWT_SECRET}`)
})