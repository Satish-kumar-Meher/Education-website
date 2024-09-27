require("dotenv").config()

// Asccess the frontend server :-
const cors = require("cors")

const express = require("express")

const app = express()
const authRouter = require("./router/router")
const contactRouter = require("./router/contact-router")
const serviceRouter = require("./router/service-router")
const connectDB = require("./utils/db")
const errorMiddleware = require("./middlewares/error-middleware")
const PORT = 1000



// Handling Cors policy 

const corsOption = {
    origin : "http://localhost:5173",
    method : "GET, POST, PUT, DELETE, PATCH, HEAD",
    credentials : true,
}

app.use(cors(corsOption))


app.use(express.json())

//? Mount the Router : To use the router in your main Express app, you can "mount" it at a specific URL prefix
app.use("/api/auth", authRouter)
app.use("/api/form", contactRouter)
app.use("/api/data", serviceRouter)
app.use(errorMiddleware)
// app.get("/",(req,res) => {

//     res.status(200).send("Hello, Satish")

// })

// app.get("/register",(req,res) => {

//     res.status(200).send("Welcome to register page :)")

// })

connectDB().then(() => {
app.listen(PORT, () => {
    console.log(`Server is running at PORT : ${PORT}`)
})
})