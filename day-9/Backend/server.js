// server ko start karna.

// database se connect karna.


require('dotenv').config() /* MONGO_URI isko access karne ke liye, dotenv package install and config karna padega.*/
const app = require("./src/app")
const connectToDb = require("./src/config/database")

connectToDb()

app.listen(3000, ()=> {
    console.log("Server is running on port 3000")
})