//file ko server se cloud storage provider jese imagekit tak phochane ke liye imagekit ka use karenge.

const postModel = require("../models/post.model")
const ImageKit = require("@imagekit/nodejs")
const { toFile } = require("@imagekit/nodejs")

const imagekit = new ImageKit({
    privateKey: process.env.IMAGEKIT_PRIVATE_KEY
})


async function createPostController(req, res) {
    console.log(req.body, req.file) // buffer me actual file ka content hota he

    //is code se file server se imagekit par ja rhi he
    const file = await imagekit.files.upload({
        file: await toFile(Buffer.from(req.file.buffer), 'file'),
        fileName: "Test"
    })

    res.send(file)
}

module.exports = {
    createPostController
}

