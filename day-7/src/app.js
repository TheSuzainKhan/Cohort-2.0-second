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



module.exports = app