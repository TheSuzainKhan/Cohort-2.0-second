const express = require("express")
const userModel = require("../models/user.model")
const crypto = require("crypto")
const jwt = require("jsonwebtoken")

const authRouter = express.Router()


//POST /api/auth/register
authRouter.post("/register", async (req, res) => {

    const { name, email, password } = req.body

    const isUserExists = await userModel.findOne({ email })

    if (isUserExists) {
        return res.status(409).json({
            message: "user already exists with this email address."
        })
    }


    const user = await userModel.create({
        name, email, password: crypto.createHash("sha256").update(password).digest("hex")
    })

    const token = jwt.sign({
        id: user._id
    }, process.env.JWT_SECRET, { expiresIn: "1h" })

    res.cookie("token", token)

    res.status(201).json({
        message: "user registered successfully",
        user: {
            name: user.name,
            email: user.email
        }
    })
})


// GET /api/auth/get-me

authRouter.get("/get-me", async (req, res) => {

    const token = req.cookies.token // iske andar token honge. (req.cookies ke andar)

    const decoded = jwt.verify(token, process.env.JWT_SECRET) // ye token ko verify karega jo token he wo server ne hi create kara he agar verify hogya to data mil jayga.

    // console.log(decoded) // isse id milegi usi id ke basis par user ko find karenge.

    const user = await userModel.findById(decoded.id)

    res.json({
        name: user.name,
        email: user.email
    })
})

//POST /api/auth/login

authRouter.post("/login", async (req, res) => {

    const { email, password } = req.body

    const user = await userModel.findOne({ email })

    if(!user) {
        return res.status(404).json({
            message: "user not found with this email."
        })
    }

    const hash = crypto.createHash("sha256").update(password).digest("hex") 

    const isPasswordMatched = hash === user.password

    if(!isPasswordMatched) {
        return res.status(401).json({
            message: "invalid password"
        })
    }

    const token = jwt.sign({
        id: user._id
    }, process.env.JWT_SECRET , {expiresIn : "1hr"})

    res.cookie("token", token)

    res.status(201).json({
        message:"user logged in",
        user: {
            name: user.name,
            email: user.email
        }
    })

})


module.exports = authRouter