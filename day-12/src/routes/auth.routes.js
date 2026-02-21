//authentication se related api is file me aayngi and use fir export karlenge app.js me

const express = require("express")
const userModel = require("../models/user.model")
const jwt = require("jsonwebtoken")

const authRouter = express.Router() // agar app.js ke alawa kahi bhi routes/api create karte he, to express.Router() ka use karte he.

//register api ki request me hame, user ka data database me save karna he and user ke data se token create karna he.
///api/auth/register
authRouter.post("/register", async (req,res)=> {
    const {name, email, password} = req.body

    const isUserAlreadyExists = await userModel.findOne({email}) //findOne condition ke basis par find karta he, user ke email ke basis par find kargea.

    if(isUserAlreadyExists) {
        return res.status(409).json({
            message: "user already exists with this email address"
        })
    }

    const user = await userModel.create({
        name, email,password
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
module.exports = authRouter