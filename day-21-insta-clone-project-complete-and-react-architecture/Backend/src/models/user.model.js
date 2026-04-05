const mongoose = require("mongoose")

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        unique: [true, "Username already exists"],
        required: [true, "username is required"] //mtlab bina username ke schema nhi banega, username required he.
    },
    email: {
        type: String,
        unique:[true, "email already exists"],
        required: [true, "email is required"]
    },
    password: {
        type:String,
        required: [true, "password is required"],
        select: false //mongoose database se password ko read nhi karega, lekin db me password me save hoga.
    },
    bio: String,
    profileImage: {
        type: String,
        default: "https://ik.imagekit.io/suzainkhan/default-profile-account-unknown-icon-black-silhouette-free-vector.jpg"
    }
})

const userModel = mongoose.model("users", userSchema)

module.exports = userModel