const userModel = require("../models/user.model")
// const crypto = require("crypto")
const jwt = require("jsonwebtoken")
const bcrypt = require("bcryptjs") //bcrypt ka use karenge for hashing password

async function registerController(req, res) {

    const { username, email, password, bio, profileImage } = req.body

    // isUsernameAlreadyExists = await userModel.findOne({ username })

    // if (isUsernameAlreadyExists) {
    //     return res.status(409).json({
    //         message: "user already exists with this username"
    //     })
    // }

    // const isEmailAlreadyExists = await userModel.findOne({ email })

    // if(isEmailAlreadyExists) {
    //     return res.status(409).json({
    //         message: "user already exists with this email"
    //     })
    // }

    const isUserAlreadyExists = await userModel.findOne({
        $or: [   //ye dikhega ki username ya email dono me se koi bhi ek match karta hai ya nhi, dono me se koi bhi match karega to ye condition true ho jayegi, ya to email miljaye ya username ya dono.
            {username},
            {email}
        ]
    })

    if(isUserAlreadyExists) {
        return res.status(409)
            .json({
                message: "User already exists " + (isUserAlreadyExists.email === email ? "with this email address" : "with this username")
            })
    }

    // const hash = crypto.createHash("sha256").update(password).digest("hex")
    const hash = await bcrypt.hash(password, 10)  //isse password bcrypt hojayga , salt me string me 10 bheja is mtlb hota he kitni layers me hashing hongi.

    //user ka data save karna database me.
    const user = await userModel.create({
        username,
        email,
        password: hash,
        bio,
        profileImage
    })

    //token create karna.
    //token me esa data bhejenge ka user ka jo , 1) user ka hona chahiye, 2) data unique hona chahiye
    const token = jwt.sign(
        {
        id: user._id , username: user.username
        }, process.env.JWT_SECRET,
        {expiresIn: "1d"})

    res.cookie("token", token)

    res.status(201).json({
        message: "user registered successfully",
        user: {
            username: user.username,
            email: user.email,
            bio: user.bio,
            profileImage: user.profileImage
        }
    })
}


const loginController = async (req,res)=> {
    const {email, username, password} = req.body

    //username, password
    //email, password

    //ya to username diya to wo le aao agar email diya to wo le aao.

    const user = await userModel.findOne({
        $or: [
            {
                username: username //condition1
            },
            {
                email: email // condition 2
            }
        ]
    }).select("+password")

    if(!user) {
        return res.status(404).json({
            message: "user not found"
        })
    }

    // const hash = crypto.createHash("sha256").update(password).digest("hex")

    // const isPasswordValid = hash === user.password

    const isPasswordValid = await bcrypt.compare(password, user.password) // ye line login ke time par jo password aayga usko hash me pehle convert karegi then hash password ko user ke password se compare karaygi jo database me he.

    if(!isPasswordValid) {
        return res.status(401).json({
            message: "Invalid password"
        })
    }

    const token = jwt.sign({
        id: user._id, 
        username: user.username
    }, process.env.JWT_SECRET,
        {expiresIn: "1d"})

    res.cookie("token", token )

    res.status(200).json({
        message: "user logged in successfully",
        user: {
            username: user.username,
            email: user.email,
            bio: user.bio,
            profileImage: user.profileImage
        }
    })
}

async function getMeController(req,res) {
    const userId = req.user.id

    const user = await userModel.findById(userId)

    res.status(200).json({
        user: {
            username: user.username,
            email: user.email,
            bio: user.bio,
            profileImage: user.profileImage
        }
    })
}

module.exports = {
    registerController,
    loginController,
    getMeController
}

