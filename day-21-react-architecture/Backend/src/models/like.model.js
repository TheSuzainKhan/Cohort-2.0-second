const mongoose = require("mongoose")

const likeSchema = new mongoose.Schema({
    post: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "posts",
        required: [true, "Post Id is required for creating a like"]
    },
    user: {
        type: String,
        required: [true, "Username is required for creating a like"]
    },
}, {
    timestamps: true
})

likeSchema.index({ post: 1, user: 1 }, { unique: true })

const likeModel = mongoose.model("likes", likeSchema)

// Keep Mongo indexes aligned with the schema during development.
likeModel.syncIndexes().catch((error) => {
    console.error("Failed to sync like indexes:", error)
})

module.exports = likeModel
