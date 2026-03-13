const express = require("express")
const cookieParser = require("cookie-parser")
const cors = require("cors")


const app = express()
app.use(express.json())
app.use(cookieParser())
app.use(cors( {
    credentials: true, // taki backend ka server frontend me cookies set kar ske. 
    origin: "http://localhost:5173" //jis url par server ko cookies set karna hai us url ko origin me dena padta hai. Yaha par frontend ka url dena hai taki backend frontend me cookies set kar ske.
}))

/* require routes */
const authRouter = require("./routes/auth.routes")
const postRouter = require("./routes/post.routes")
const userRouter = require("./routes/user.routes")

/* using routes */
app.use("/api/auth", authRouter)
app.use("/api/posts", postRouter)
app.use("/api/users", userRouter)

module.exports = app    