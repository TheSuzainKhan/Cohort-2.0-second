//authentication se related api is file me aayngi and use fir export karlenge app.js me

const express = require("express")
const userModel = require("../models/user.model")
const jwt = require("jsonwebtoken")
const crypto = require("crypto")

const authRouter = express.Router() // agar app.js ke alawa kahi bhi routes/api create karte he, to express.Router() ka use karte he.

//register api ki request me hame, user ka data database me save karna he and user ke data se token create karna he.
///api/auth/register
authRouter.post("/register", async (req, res) => {
    const { name, email, password } = req.body

    const isUserAlreadyExists = await userModel.findOne({ email }) //findOne condition ke basis par find karta he, user ke email ke basis par find kargea.

    if (isUserAlreadyExists) {
        return res.status(409).json({
            message: "user already exists with this email address"
        })
    }
    //password jo ke plain text ko hash me convert karenge, hashing algo se
    const hash = crypto.createHash("md5").update(password).digest("hex") //password ko hash me convert karne ke liye crypto module ka use karenge, createHash me hashing algorithm denge, update me password denge, digest me output format denge.
    
    const user = await userModel.create({
        name, email, password:hash
    })

    //token create karenge, token me two cheeze hoti he, user ka data and jwt_secret.
    //token ke andar user ka data hota he.
    const token = jwt.sign(
        {
            id: user._id,
            email: user.email
        },
        process.env.JWT_SECRET
    )

    //cookie storage client side par hota he, and iska access server ke paas hota he, server koi bhi data ko cookie storage me read and write kar skta he.
    //ye jo token create kra he, isse user ke cookie storage me save karenge.

    res.cookie("jwt_secret", token) // server token ko cookie storage me save kardega taki user registration ya login ke baad fir kabhi request kargea to server us token ko read krlega, har request ke sath token bhi jayga taki user ko pta rhe kis user ne request kri he.
    //cookie storage me isliye token ko rakhte he taki jab dobara user request kare to server cookie me se token ko padhle.

    res.status(201).json({
        message: "user registered",
        user,
        token
    })
})

//api/auth/protected
// authRouter.post("/protected", (req, res) => {
//     console.log(req.cookies) //req.cookies se server, client side par jo cookies storage he use access kar sakta he.

//     res.status(200).json({
//         message: "This is protected route"
//     })
// })



//login request ka use jab karte he, jab user ko naya token chahiya hota he.
//agar login request me email, password bheja he wo match kar jata he, to user ko naya token dedenge.

// /post /api/auth/login
// async (req,res)=> {} is function ko controller bhi kahte he kyuke ye bas jab chalega jab /login api par request jaygi

authRouter.post("/login", async (req, res) => {

    const { email, password } = req.body

    //email se user exist karta he check kargeneg
    const user = await userModel.findOne({ email }) //email ke basis par find kra

    if(!user) {
        return res.status(404).json({
            message: "User does not exist with this email address."
        })
    }

    //agar email match kargya to password check karenge.
    const isPasswordMatched = user.password === crypto.createHash("md5").update(password).digest("hex") //database me jo password he and user ne jo password bheja he wo match kar rha he, pehle password ko hash me convert karenge taki dono password ka format same ho jaye, fir dono password ko compare karenge.

    //agar password match nhi karega to return hojaynge.
    if(!isPasswordMatched) {
        return res.status(401).json({
            message: "Invalid password"
        })
    }

    //agar password bhi match hogya to token generate kra denge.
    const token = jwt.sign({
        id: user._id
    }, process.env.JWT_SECRET)

    res.cookie("jwt_cookie", token) //token ko set kardenge cookies me.

    res.status(200).json({
        message: "User logged in",
        user
    })
})


module.exports = authRouter