const mongoose = require("mongoose")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")


const userSchema = new mongoose.Schema({
    username : {
        type : String,
        require : true,
    },
    email : {
        type : String,
        require : true,
    },
    phone : {
        type : Number,
        require : true,
    },
    password : {
        type : String,
        require : true,
    },
    isAdmin : {
        type : Boolean,
        default : false
    },
})

// secure password by PRE method 

userSchema.pre('save', async function(next){

const user = this

if(!user.isModified("password")){
    next()
}

try{
    const saltRound = await bcrypt.genSalt(10)
        const hash_password = await bcrypt.hash(user.password, saltRound)
    user.password = hash_password
}catch (error) {
    next(error)
}

})

// Compare the password -:

userSchema.methods.comparePassword = async function(password) {
    return  bcrypt.compare(password, this.password )
}

// JSON WEB TOKEN  

userSchema.methods.generateToken = async function (){  // this used method is instance method
   try{
        return jwt.sign(
            {
            userId : this._id.toString(),
            email : this.email,
            isAdmin : this.isAdmin,
        },
    process.env.JWT_SECRET_KEY,
    {
        expiresIn : '30d',
    }
    )
   }catch(error){
    console.error(error)
   }
}

const User = new mongoose.model("User", userSchema)

module.exports = User