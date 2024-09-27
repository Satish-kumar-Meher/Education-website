const jwt = require("jsonwebtoken")
const User = require("../models/user-model")

const authMiddleware = async (req,res,next) => {
// next is for call the next router after the middleware 
// here user is the next router
 const token = req.header("Authorization")




if(!token){

    return res
    .status(401)
    .json({message : "Unauthorized HTTP, Token not provided"})
}
console.log("token from authMiddleware", token)


// to remove bearer word from the jwt token which is a unnecessary word in our token
const jwtToken = token.replace("Bearer","").trim()

console.log("token from authMiddleware after replace method", jwtToken)

try{

const isVerified = jwt.verify(jwtToken, process.env.JWT_SECRET_KEY)
// this isVerified give the user datas which we set in our jwt payload during creating the JWT token in user-model.js file
console.log(isVerified)

const userData = await User.findOne({email : isVerified.email}).select({password : 0,})
// .select({---: 0}) means except the item --- show all the item
// if i put 1 then only show this item rather than all

console.log(userData)

req.user= userData
req.token = token // this token is (const token = req.header("Authorization"))
req.userID = userData._id


next()
}catch(error) {
    return res.status(401).json({message : "Unauthorized, Inavalid Token"})
}
}

module.exports = authMiddleware


// in Express , "req" object is an object thhat contains information about the http request . By adding custom properties to req , you can pass information between middlewares functions or make it available in your route handlers.
