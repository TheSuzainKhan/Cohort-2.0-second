const mongoose = require("mongoose")

const postSchema = new mongoose.Schema({
    caption: {
        type: String,
        default: ""
    },
    imgUrl: {
        type: String,
        required: [true, "imgUrl is required for creating a post"]
    },
    user: {
        type: mongoose.Schema.Types.ObjectId, // hume kisi collection ki id use karni he,
        ref: "users", // users collection ki id use karenge.
        required: [true, "user id is required for creating a post"]
    }
})


const postModel = mongoose.model("posts", postSchema)

module.exports = postModel