//server create karna.
//server ko configure karna.

const express = require("express")

const app = express() //server create karna.

app.get("/",(req,res)=> {
    res.send("hello world")
})

const notes = [
       // {
    //     title: "test title 1",
    //     description: "test description 1"
    // }
]

app.use(express.json())

//creating a notes.
app.post("/notes", (req,res)=> {

    console.log(req.body);

    notes.push(req.body)

    console.log(notes);
    
    res.send("note created")
})

//viewing or fetching a notes from server.
app.get("/notes",(req,res)=> {
    res.send(notes)
})

//deleting a notes using dynamic indexing and params.
app.delete("/notes/:index",(req,res)=> {

    console.log(req.params.index);
    
    delete notes[req.params.index]
    res.send("note deleted successfully")
})


//updating a note using params and dynamic indexing.
/* req.body = {description :- "sample modified description."} */

app.patch("/notes/:index",(req,res)=> {
    notes[req.params.index].description=req.body.description // notes[req.params.index] ke description ko update kardo ,req.body ke desciption se.
    res.send("note upadated successfully")
})

module.exports = app