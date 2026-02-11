const mongoose = require("mongoose")


//  Schema :database me kis format me data store karna wale he use khte he schema.
//        schema contain karta hai konsi properties hongi or uske type(format) kya hoga
const noteSchema = new mongoose.Schema({
    title: String,
    description: String,
})


//Model(noteModel) use karte karte he koi bhi operation perform karne ke liye
//jese crud operation.
//"notes" jo he wo "collection" khelata he jisme ek type/format ke notes honge.
const noteModel  = mongoose.model("notes", noteSchema)

module.exports = noteModel