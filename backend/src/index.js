import express from "express";
import dotenv from "dotenv"
import cookieParser from "cookie-parser"
import connectDB from "./db/db.js"
dotenv.config()

//imports the routes
import authrouter from "./routes/auth.routes.js"
const app = express()
app.use(cookieParser())
app.use(express.json())
// use the routes
app.use("/api/v1/auth",authrouter)


const PORT=process.env.PORT || 8000
connectDB()
    .then(() => {
    app.listen(PORT, () => console.log(`Server is running on port: ${PORT}`));
  })

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`)
})
