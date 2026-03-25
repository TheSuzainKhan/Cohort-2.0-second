const express = require("express")
const postController = require("../controllers/post.controller")
const identifyUser = require("../middlewares/auth.middleware")

//server humara by default file ko nhi padh pata isliye use krte multer(middleware/package) ka taki server file ko padh ske .
const multer = require("multer") // multer ka use isliye karte he, taki form-data ka data khaskar file jo ke frontend/client se aarha he use server read kar ske, bina iske server use read nhi kar sakta.
//multer me do tarha ke storage hote he ek hota disk storage jo file ko hard disk me permanently store karlega.
//dusra hota he memory storage jo temporary ram me store karega, hum memory storage ka use karenge ke kyuke server me store karne se bandwidth pricing badh jati he, to hum use temporary store karenge and fir use cloud storage provider me upload karnge(imagekit) me.
const upload = multer({ storage: multer.memoryStorage() })


const postRouter = express.Router()


/**
 * @route POST /api/posts [protected]
 * @description Create a post with the content and image (optional) provided in the request body. The post should be associated with the user that the request come from
 */
postRouter.post("/", upload.single('image'), identifyUser,postController.createPostController )

/**
 * @route GET /api/posts/ [protected]
 * @description Get all the posts created by the user that the request come from. also return the total number of posts created by the user
 */
// is api pe jo user request karega uski saari post aajyngi.
postRouter.get("/", identifyUser ,postController.getPostController)

/**
 * @route GET /api/posts/details/:postid
 * @description return an detail about specific post with the id. also check whether the post belongs to the user that the request come from
 */
postRouter.get("/details/:postId",identifyUser,postController.getPostDetailsController)


/**
 * @route POST /api/posts/like/:postid
 * @description like a post with the id provided in the request params. 
 */
postRouter.post("/like/:postId", identifyUser, postController.likePostController)

postRouter.post("/unlike/:postId", identifyUser, postController.unLikePostController)
/**
 * @route GET /api/posts/feed
 * @desc get all the posts created in the DB
 * @access private
 */
postRouter.get("/feed", identifyUser, postController.getFeedController)

module.exports = postRouter
