//follows(edge collection), edge collection relationship dikhata he between two documents of collection
const mongoose = require("mongoose")

const followSchema = new mongoose.Schema({
    follower: {
        type:String
    },
    followee: {
        type: String
    },
    status: {
        type: String,
        default: "pending",
        enum: {
            values: ["pending", "accepted", "rejected"],  //mtlb status jo property he uski teen values ho skti he, which is pending, accepted and rejected.
            message: "status can only be pending, accepted or rejected"
        }
    }
}, {
    /**
     * When you add timestamps: true in a Mongoose schema, Mongoose automatically adds two extra fields to every document:

createdAt → stores the date and time when the document was created

updatedAt → stores the date and time when the document was last updated
     */
    timestamps:true // ye batata he ke document kab create hua tha and last time kab update hua tha,

})

followSchema.index({follower: 1, followee: 1}, {unique: true}) // ye index banayega follower and followee ke combination par, aur unique: true ka matlab he ke ek user ek hi user ko follow kar sakta he, agar same combination dobara aata he to error dega.

const followModel = mongoose.model("follows", followSchema)

module.exports = followModel