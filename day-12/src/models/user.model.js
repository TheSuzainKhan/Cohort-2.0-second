const mongoose = require("mongoose")

const userSchema = new mongoose.Schema({
    name: String,
    email: { // ek email se ek user banna chahiye.
        type: String,
        unique: [true, "with this email user account already exists"]
    },
    password: String
})

const userModel = mongoose.model("users", userSchema)

module.exports = userModel