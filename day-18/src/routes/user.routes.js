const express = require("express")
const userController = require("../controllers/user.controller")
const identifyUser = require("../middlewares/auth.middleware")

const userRouter = express.Router()


/**
 * @route POST /api/users/follow/:username
 * @description Follow a user
 * @access Private
 */
userRouter.post("/follow/:username",identifyUser, userController.followUserController ) //identifyUser ke baad jitne bhi controllers use kre he un sab me req.user hoga. 

/** 
 * @route POST /api/users/unfollow/:username
 * @description Unfollow a user
 * @access Private
 */
userRouter.post("/unfollow/:username", identifyUser, userController.unfollowUserController)

/**
 * @route GET /api/users/follow/requests
 * @description Get all pending follow requests for logged in user
 * @access Private
 */
userRouter.get("/follow/requests", identifyUser, userController.getPendingRequestsController)

/**
 * @route POST /api/users/follow/accept/:username
 * @description Accept a follow request sent by :username
 * @access Private
 */
userRouter.post("/follow/accept/:username", identifyUser, userController.acceptFollowRequestController)

/**
 * @route POST /api/users/follow/reject/:username
 * @description Reject a follow request sent by :username
 * @access Private
 */
userRouter.post("/follow/reject/:username", identifyUser, userController.rejectFollowRequestController)

module.exports= userRouter
