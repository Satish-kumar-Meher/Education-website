const mongoose = require("mongoose")

// const URI = "mongodb://localhost:27017/mern_admin"

// const URI = "mongodb+srv://satishmeher:Satish853DB@mern1.p0afrat.mongodb.net/?retryWrites=true&w=majority&appName=Mern1"

const URI = process.env.MONGODB_URI

// mongoose.connect(URI)

const connectDB = async () => {
    try{
       await mongoose.connect(URI) 
       console.log("connection succesful to DB")
    } catch (error){
        console.error("database connection failed")
        process.exit(0)
    }
}

module.exports = connectDB