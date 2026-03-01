const express = require("express")
const postController = require("../controllers/post.controller")

//server humara by default file ko nhi padh pata isliye use krte multer(middleware/package) ka taki server file ko padh ske .
const multer = require("multer") // multer ka use isliye karte he, taki form-data ka data khaskar file jo ke frontend/client se aarha he use server read kar ske, bina iske server use read nhi kar sakta.
//multer me do tarha ke storage hote he ek hota disk storage jo file ko hard disk me permanently store karlega.
//dusra hota he memory storage jo temporary ram me store karega, hum memory storage ka use karenge ke kyuke server me store karne se bandwidth pricing badh jati he, to hum use temporary store karenge and fir use cloud storage provider me upload karnge(imagekit) me.
const upload = multer({ storage: multer.memoryStorage() })


const postRouter = express.Router()


/**
 * POST /api/posts [protected]
 * - req.body = { caption,image-file }
 */
postRouter.post("/", upload.single('image'), postController.createPostController )

/**
 * GET /api/posts/ [protected]
 */
// is api pe jo user request karega uski saari post aajyngi.
postRouter.get("/", postController.getPostController)

/**
 * GET /api/posts/details/:postId
 * - return a detail about specific post with the id. also check whether the post belongs to the user that the request come from
 */
postRouter.get("/details/:postId", postController.getPostDetailsController)



module.exports = postRouter