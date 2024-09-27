const express = require("express")

const router = express.Router()
const {home,register,login, user} = require("../controllers/control")
const { signupSchema,loginSchema } = require("../validators/validators")
const validate = require("../middlewares/validate-middleware")
const authMiddleware = require("../middlewares/auth-middleware")
// router.get("/",(req,res) => {

//     res.status(200).send("Hello, Satish this is from router")

// })


// router.route("/").get((req,res) => {

//     res
//     .status(200)
//     .send("Hello, Satish this is from router")

// })

router.route("/").get(home)


// router.route("/register").get((req,res) => {

//     res
//     .status(200)
//     .send("Welcome to register page from router :)")

// })

// router.route("/register").get(register)

router.route("/register").post(validate(signupSchema),register)
router.route("/login").post(validate(loginSchema),login)

router.route("/user").get(authMiddleware, user)

module.exports = router