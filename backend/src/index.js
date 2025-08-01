import express from "express";
import dotenv from "dotenv"
import cookieParser from "cookie-parser"
import connectDB from "./db/db.js"
dotenv.config()
import cors from "cors"


//imports the routes
import authrouter from "./routes/auth.routes.js"//auth router
import bookrouter from './routes/book.routes.js'//book router
import reviewRouter from  './routes/review.routes.js'//reviwe router
import oderRouter from "./routes/order.routes.js"//order router
//import cornjob 
import {cleanOtp} from "./utils/Cornjob.js"
const app = express()
app.use(cookieParser())
app.use(express.json())
//setup cors
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
    methods: ["GET", "POST", "DELETE", "OPTIONS", "PUT"],
    allowedHeaders: ["Content-Type", "Authorization", "Accept"],
    exposedHeaders: ["Set-Cookie", "*"],
  })
);
// use the routes
app.use("/api/v1/auth",authrouter) //auth
app.use("/api/v1/book",bookrouter)
app.use("/api/v1/review",reviewRouter)
app.use("/api/v1/order",oderRouter)
//start the corn job
cleanOtp.start()

const PORT=process.env.PORT || 8000
connectDB()
    .then(() => {
    app.listen(PORT, () => console.log(`Server is running on port: ${PORT}`));
  })
  app.get('/', (req, res) => {
  res.send('Hello World!')
})

