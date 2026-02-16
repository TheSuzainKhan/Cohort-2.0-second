// server ko create karna.

const express = require("express")
const noteModel = require("./models/note.model")
const cors = require('cors')


const app = express()
app.use(cors())
app.use(express.json())


/**
 * - POST /api/notes
 * - create new note and save data in mongodb
 * - req.body = {title,description}
 */
app.post("/api/notes",async (req,res)=> {
    const {title, description} = req.body

   const notes =  await noteModel.create({  //jo req.body ke andar title and description me aaye he, unhe database ke title, description me bhjdo jo ke object ke andar likhnge
        title,description
    })

    res.status(201).json({
        message: "note created successfully",
        notes
    })
})


/**
 * - GET /api/notes
 * - Fetch all the notes data from mongodb and send them in the response
 */
app.get("/api/notes",async (req,res)=> {

    const note = await noteModel.find()

    res.status(200).json({
        message:"notes fetched successfully",
        note
    })

})

/**
 * - DELETE /api/notes/:id
 * - Delete note with the id from req.params
 */
app.delete("/api/notes/:id", async (req,res)=> {
    const id = req.params.id

    await noteModel.findByIdAndDelete(id)

    res.status(200).json({
        message: "note deleted successfully"
    })
})


/**
 * - PATCH /api/notes/:id
 * - update the description of the note by id
 * - req.body = {description}
 */
app.patch("/api/notes/:id", async (req,res)=> {
    const id = req.params.id

    const {description} = req.body

    await noteModel.findByIdAndUpdate(id, {description})

    res.status(200).json({
        message: "note updated successfully"
    })
})

module.exports = app