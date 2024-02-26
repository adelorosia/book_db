import express from "express"
import dotenv from "dotenv"
import cors from "cors"
import cookieParser from "cookie-parser"
import { dbConnect } from "./config/dbConnect.js"
import userRouter from "./routes/userRouter.js"
import { errorHandler, notFound } from "./middlewares/error/erorrHandler.js"
import bookRouter from "./routes/bookRouter.js"

dotenv.config()
dbConnect()

const app=express()

app.use(express.json())
app.use(cors({credentials:true,origin:"http://localhost:3000"}))
app.use(cookieParser())


app.use(userRouter)
app.use(bookRouter)


app.use(notFound)
app.use(errorHandler)
const port=process.env.PORT || 3003

app.listen(port,(console.log(`Server is running On Port: ${port}`)))