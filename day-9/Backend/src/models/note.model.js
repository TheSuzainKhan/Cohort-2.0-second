const mongoose = require("mongoose")


// database banane se pehle hame ye batana hota he ke uska format kya hoga, use kehte he schema. 
const noteSchema = new mongoose.Schema({
    title: String,
    description: String
})


// database me kuch bhi operation krne hote he to wo noteModel ki help se honge, isliye ye banate he
// "notes" ko collection kehte he and ye use hota he ek type ka data store karne ke liye jese sab hi notes me title and description honge.
const  noteModel = mongoose.model("notes", noteSchema)

module.exports = noteModel
