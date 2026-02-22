const express = require("express")
const authRouter = require('./routes/auth.routes')
const cookieParser = require("cookie-parser")

const app = express()

app.use(express.json()) //req.body ke data ko read karne ke liye.
app.use(cookieParser()) //cookie-parser ko hame middleware ki tarah use karna hota he.
app.use("/api/auth", authRouter) // "/api/auth ye prefix he authRouter ki api se pehle lagana padega."

module.exports = app