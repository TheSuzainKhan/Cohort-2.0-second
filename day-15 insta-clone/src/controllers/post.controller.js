//file ko server se cloud storage provider jese imagekit tak phochane ke liye imagekit ka use karenge.

const postModel = require("../models/post.model")
const ImageKit = require("@imagekit/nodejs")
const { toFile } = require("@imagekit/nodejs")
const jwt = require("jsonwebtoken")

const imagekit = new ImageKit({
    privateKey: process.env.IMAGEKIT_PRIVATE_KEY
})


async function createPostController(req, res) {
    console.log(req.body, req.file) // buffer me actual file ka content hota he

    const token = req.cookies.token //iske andar cookie hoga.

    //agar token nhi milta to ye bhejenge.
    if(!token) {
        return res.status(401).json({
            message: "Token not provided, unauthorized access."
        })
    }

    // agar token mil jata he to

    // const decoded = jwt.verify(token, process.env.JWT_SECRET)  // iske andar data aajayga token ka jo hamne token banate time bheja tha, matlab id aajygi.

    // try catch ka use error handling ke liye karte he, agar kuch error nhi hoga to jo code try ke andar likha he wo chalega, agar us code me kuch error aaati he, to jo error hamne catch ke andar diya he wo chalega.

    let decoded = null // block scope hota he let, and const ka isliye bahar define kiya he decoded ko
    try{
         decoded = jwt.verify(token, process.env.JWT_SECRET)  // iske andar data aajayga token ka jo hamne token banate time bheja tha, matlab id aajygi.
    }
    catch(err) {
        return res.status(401).json({
            message: "User not Authorized"
        })
    }

    console.log(decoded)

    //is code se file server se imagekit par ja rhi he
    const file = await imagekit.files.upload({
        file: await toFile(Buffer.from(req.file.buffer), 'file'),
        fileName: "Test",
        folder: "cohort-2-insta-clone-posts"
    })

    //hamare paas tino chize aagyi ab jese caption, imgURL and user ki id to database me save kara lete he.
    const post = await postModel.create({
        caption: req.body.caption,
        imgUrl: file.url,
        user: decoded.id
    })

    res.status(201).json({
        message: "Post created successfully",
        post
    })

}

module.exports = {
    createPostController
}

