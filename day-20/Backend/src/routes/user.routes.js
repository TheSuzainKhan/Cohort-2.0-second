const express = require('express');
const userController = require("../controllers/user.controller")
const identifyUser = require("../middlewares/auth.middleware")

const userRouter = express.Router();


/**
 * @route POST /api/users/follow/:userid
 * @description Follow a user
 * @access Private
 */
userRouter.post("/follow/:username", identifyUser, userController.followUserController)


/** 
 * @route POST /api/users/unfollow/:userid
 * @description Unfollow a user
 * @access Private
 */
userRouter.post("/unfollow/:username", identifyUser, userController.unfollowUserController)

/**
 * @route PATCH /api/users/follow/:username/status
 * @description Accept or reject a follow request by sending {
    "status": "accepted"
} or rejected inside body 
 * @access Private
 */
userRouter.patch("/follow/:username/status", identifyUser, userController.updateFollowRequestStatusController)

/**
 * @route GET /api/users/follow/requests/pending
 * @description Get pending follow requests for logged-in user
 * @access Private
 */
userRouter.get("/follow/requests/pending", identifyUser, userController.getPendingFollowRequestsController)



module.exports = userRouter;
