//follows(edge collection), edge collection relationship dikhata he between two documents of collection
const mongoose = require("mongoose")

const followSchema = new mongoose.Schema({
    follower: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "users",
        required: [true, "Follower is required"]
    },
    followee: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "users",
        required:[true,"Followee is required"]
    }
}, {
    /**
     * When you add timestamps: true in a Mongoose schema, Mongoose automatically adds two extra fields to every document:

createdAt → stores the date and time when the document was created

updatedAt → stores the date and time when the document was last updated
     */
    timestamps:true // ye batata he ke document kab create hua tha and last time kab update hua tha,

})

const followModel = mongoose.model("follows", followSchema)

module.exports = followModel