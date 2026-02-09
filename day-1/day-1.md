1) How to run script code outside the browser

    node <filename>
    ex- node index.js

2) What are Packages?
-> Ek esa code jo humne nhi likha, kisi or developer ne likha he,
    or use publically available kra diya taki baki developer bhi use kar paye kisi bhi project me.
    (jo code publically available karaya he wo npmjs.com ki website par he.)


    -> How to install packages:
    npmjs ki website par jo code use apne project par lana

    command - npm i <package-name>
             ex- npm i cat-me


    -> How to use Packages:

    const catMe = require("<package-name>")

    console.log(catMe())

    then, run it by: node app.js


-> package.json : hamara js ka code kis packages par dependent he(depndencies).

-> node_modules: saare packages ke code ko store karta he, jo npm ki website par code tha packages ka wo is node_modules me hota he code packages ka.

-> package-lock.json-> hamara jo package he wo or kis packages par depend karta he usko mantain karta he.(dependencies tree)


3) What is server?

Server ek esi machine jiske paas khudka OS, processor, khudki RAM and storage hota he.

***Server ek esi machine jisko ese program kiya gaya he,ke user jo bhi request bhje uske basis par proper response milta he.



4) Create Server with express

-> npm init -y (iska matlab he node.js application start/initialize hone wali he, server bhi ek node.js application he, ise package.json file ban jati he.)

-> npm i express(install express for creating server)

now, 
    const express = require("express")

const app = express() // server create kar chuke he

app.listen(3000)  //server start kar rhe he

in terminal:
    node server.js // server running state me