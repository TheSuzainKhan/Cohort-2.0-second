//file ko server se cloud storage provider jese imagekit tak phochane ke liye imagekit ka use karenge.

const postModel = require("../models/post.model")
const ImageKit = require("@imagekit/nodejs")
const { toFile } = require("@imagekit/nodejs")
const jwt = require("jsonwebtoken")
const likeModel = require("../models/like.model")

const imagekit = new ImageKit({
    privateKey: process.env.IMAGEKIT_PRIVATE_KEY
})


async function createPostController(req, res) {
    // console.log(req.body, req.file) // buffer me actual file ka content hota he


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
        user: req.user.id
    })

    res.status(201).json({
        message: "Post created successfully",
        post
    })

}

async function getPostController(req,res) {

    

    const userId = req.user.id

    //un saari post ko le aao jo user se belong karti he
    const posts = await postModel.find({
        user: userId
    })

    res.status(200).json({
        message: "Posts fetched successfully",
        posts
    })

}

async function getPostDetailsController(req,res) {


    const userId = req.user.id
    const postId = req.params.postId

    const post = await postModel.findById(postId)

    if(!post) {
        return res.status(404).json({
            message: "Post not found"
        })
    }

    const isValidUser = post.user.toString() === userId // post.user ki id ko pehle string me convert kara compare krne ke liye.

    if(!isValidUser) {
        return res.status(403).json({
            message: "Forbidden Content"
        })
    }

    res.status(200).json({
        message: "Post details Fetched successfully",
        post
    })


}

async function likePostController(req,res) {

    const username = req.user.username
    const postId = req.params.postId

    const post = await postModel.findById(postId)

    if(!post) {
        return res.status(404).json({
            message: "Post not Found"
        })
    }

    const like = await likeModel.create({
        post: postId,
        user: username
    })

    res.status(200).json({
        message: "Post liked successfully",
        like
    })
}


module.exports = {
    createPostController,
    getPostController,
    getPostDetailsController,
    likePostController
}

