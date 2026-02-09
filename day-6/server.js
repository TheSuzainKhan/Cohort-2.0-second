//server start karna.
//server ko database se connect karna.

const app = require("./src/app")

//database ko connect karna.

const mongoose = require("mongoose") // mongoose is used to connect mongoDB database to our server.

function connectToDb() {
    mongoose.connect("mongodb+srv://suzain:7QUP6Rfvtq0hlpIX@cluster0.fa8my1j.mongodb.net/day-6") //isse database connect hojata he server se and last me jo /day-6 diya he wo database ka naam he agar database nhi hua cluster ke andar to ye mongoose.connect us database ko create karega and fir connect karega server se.

    .then(()=> {  //jab database connect hoga ya mongoose.connect kaam karega to ye chalega.
        console.log("Connected to database")
    })
}
connectToDb()

// async function connectToDb() {
//    await mongoose.connect("mongodb+srv://suzain:7QUP6Rfvtq0hlpIX@cluster0.fa8my1j.mongodb.net/day-6")
//     console.log("connected to database");
// }
// connectToDb()



app.listen(3000,()=> {
    console.log("Server is running on port 3000");
})