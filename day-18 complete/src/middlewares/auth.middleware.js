const jwt = require("jsonwebtoken")

async function identifyUser(req,res,next) { //jab bhi middleware banate he, to ek or paramter lete he "next"

    const token = req.cookies.token //iske andar cookie hoga.

    //agar token nhi milta to ye bhejenge.
    if(!token) {
        return res.status(401).json({
            message: "Token not provided, unauthorized access."
        })
    }

    // agar token mil jata he to

    // const decoded = jwt.verify(token, process.env.JWT_SECRET)  // iske andar data aajayga token ka jo hamne token banate time bheja tha, matlab id aajygi.

    // try catch ka use error handling ke liye karte he, agar kuch error nhi hoga to jo code try ke andar likha he wo chalega, agar us code me kuch error aaati he, to jo error hamne catch ke andar diya he wo chalega.

    let decoded = null // block scope hota he let, and const ka isliye bahar define kiya he decoded ko
    try{
         decoded = jwt.verify(token, process.env.JWT_SECRET)  // iske andar data aajayga token ka jo hamne token banate time bheja tha, matlab id aajygi.
    }
    catch(err) {
        return res.status(401).json({
            message: "User not Authorized"
        })
    }

    req.user = decoded // jo user ke data aaya he use ek new property req.user me bhjdiya.

    next() // next function call karna padega, is middleware(identifyUser) se request aage controller par forward karne ke liye.
}

module.exports = identifyUser