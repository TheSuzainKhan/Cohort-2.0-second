
//programming server to response to user.

const express = require("express")

const app = express() // server instance create karna

//programming server
app.get("/", (req,res)=> {
    res.send("Hello World")
})   // jab user / par request karega to response hello world send karna he.

app.get("/about", (req,res)=> {
    res.send("This is about page")
}) // jab user /about page par request karega to response This is about page chla jayga.

app.get("/home", function(req,res) {
    res.send("this is home page.")
})

app.get("/course", (req,res)=> {
    res.send("This is course page.")
})

app.listen(3000) //server start karna. //3000 port number



//-> har ek process ko operating system port number deta he, taki us process se user us  port number ke through communicate kar sake.


//-> npx nodemon server.js -> baar baar node.js nahi chalani padegi...(mtlb baar baar server nhi chalana hoga.)