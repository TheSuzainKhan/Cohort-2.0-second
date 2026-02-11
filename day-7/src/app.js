//server ko create karna.
//server ko config karna.

const express = require("express")

const app = express()

const noteModel = require("./models/notes.model")

app.use(express.json())


//POST /notes
// {title,description} => req.body

app.post("/notes", async (req,res)=> {

    const {title,description} = req.body //destructuring.

   const note =  await noteModel.create({ 
        title,description
    })

    res.status(201).json({
        message: "Note created successfully",
        note
    })
})


// GET /notes
// fetch all the notes data .

app.get("/notes", async (req,res)=> {

    const notes = await noteModel.find() //find operation use hota he, database me jitne notes he unhe find/read karne ke liye and unhe return karta he.

    res.status(200).json({
        message: "Notes fetched successfully",
        notes
    })
})


module.exports = app