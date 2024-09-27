const User = require("../models/user-model")
const bcrypt = require("bcryptjs")

const home = async (req , res) => {

 try {
        
    res
    .status(200)
    .send("Hello, Satish this is from router and from controllers")
    } catch (error) {
        console.log(error)
    }
}


// User registration Logic :-

// const register = async (req,res) => {

//     try {
//         console.log(req.body)
//         res
//         .status(200)
//         .send("Welcome to register page from router :)")

//     } catch(error){
//         res.status(400).send({msg:"page not found"})
//     }

   

// }



const register = async (req,res) => {

 try {
        console.log(req.body)
        const {username , email , phone , password} = req.body

        const userExist = await User.findOne({email})

        if(userExist){
            return res.status(400).json({message : "email already exists"})
        }
        
 // Hash the password for secure it :-

        // const saltRound = 10
        // const hash_password = await bcrypt.hash(password, saltRound)

        
    //    const userCreated =  await User.create(
    //     {
    //     username , 
    //     email ,
    //      phone ,
    //       password : hash_password,
    //     }
    // )

 // for PRE method -:

    const userCreated =  await User.create(
        {
        username , 
        email ,
         phone ,
          password,
        }
    )


        res
        .status(201)
        .json(
            {
            msg : "registration succesfull",
            // token : await userCreated.generateToken(), // token for JWT auth
            // userId : userCreated._id.toString(),// jwt
        }
        ) 

    } catch(error){
        // res.status(400).json("internal server error")
        next(error)
    } 
}


// User Login Logic -:

const login =  async(req,res) => {
    try {
        const {email,password} = req.body

        const userExist = await User.findOne({email})
console.log(userExist)

        if(!userExist) {
            return res.status(400).json({message : "Invalid Credentials"})
        }

        // const isPasswordValid = await bcrypt.compare(password, userExist.password )
        const isPasswordValid = await userExist.comparePassword(password) // -->> go to user-models.js

        if(isPasswordValid){
            
        res
        .status(200)
        .json(
            {
            msg : "login succesfull",
            token : await userExist.generateToken(), // token for JWT auth
            userId : userExist._id.toString(),// jwt
        }
        ) 
        } else {
            res.status(401).json({message : "Invalid email or password"})
        }
        

    } catch(error) {
        res.status(500).json("internal server error")
    }
}

// Uer Logic - To send user data :-

const user = async (req,res) => {
    try{
        const userData = req.user
        console.log(userData)
        return res.status(200).json({userData})
    }catch(error){
        console.log(`error from the user ${error}`)
    }
}


module.exports = {home , register, login, user}