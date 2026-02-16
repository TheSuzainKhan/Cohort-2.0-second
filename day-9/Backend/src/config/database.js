// database se connect karne ke liye hum src ke andar ek naya folder banate he config and uske andar file banate he database.js
// jiske andar database se connect karna ka code likhte he.


const mongoose = require("mongoose")

function connectToDb() {
    mongoose.connect(process.env.MONGO_URI) //uri github par nhi dalni hoti isliye .env file me likhnge.
    .then(()=> {
        console.log("Connected to database")
    })
}

module.exports = connectToDb

