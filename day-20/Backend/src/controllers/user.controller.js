const followModel = require("../models/follow.model")
const userModel = require("../models/user.model")



async function followUserController(req, res) {

    const followerUsername = req.user.username
    const followeeUsername = req.params.username


    if (followeeUsername == followerUsername) {
        return res.status(400).json({
            message: "You cannot follow yourself"
        })
    }

    const isFolloweeExists = await userModel.findOne({
        username: followeeUsername
    })

    if (!isFolloweeExists) {
        return res.status(404).json({
            message: "User you are trying to follow does not exist"
        })
    }

    const isAlreadyFollowing = await followModel.findOne({
        follower: followerUsername,
        followee: followeeUsername,
    })

    if (isAlreadyFollowing) {
        if (isAlreadyFollowing.status === "accepted") {
            return res.status(200).json({
                message: `You are already following ${followeeUsername}`,
                follow: isAlreadyFollowing
            })
        }

        if (isAlreadyFollowing.status === "pending") {
            return res.status(200).json({
                message: `Follow request already sent to ${followeeUsername}`,
                follow: isAlreadyFollowing
            })
        }

        isAlreadyFollowing.status = "pending"
        await isAlreadyFollowing.save()

        return res.status(200).json({
            message: `Follow request re-sent to ${followeeUsername}`,
            follow: isAlreadyFollowing
        })
    }

    const followRecord = await followModel.create({
        follower: followerUsername,
        followee: followeeUsername,
        status: "pending"
    })

    res.status(201).json({
        message: `Follow request sent to ${followeeUsername}`,
        follow: followRecord
    })

}

async function unfollowUserController(req, res) {
    const followerUsername = req.user.username
    const followeeUsername = req.params.username

    const isUserFollowing = await followModel.findOne({
        follower: followerUsername,
        followee: followeeUsername,
    })

    if (!isUserFollowing) {
        return res.status(200).json({
            message: `No follow relation found with ${followeeUsername}`
        })
    }

    await followModel.findByIdAndDelete(isUserFollowing._id)

    res.status(200).json({
        message: `Follow relation removed with ${followeeUsername}`
    })
}

async function updateFollowRequestStatusController(req, res) {
    const followeeUsername = req.user.username
    const followerUsername = req.params.username
    const { status } = req.body

    if (!["accepted", "rejected"].includes(status)) {
        return res.status(400).json({
            message: "status can only be accepted or rejected"
        })
    }

    const followRequest = await followModel.findOne({
        follower: followerUsername,
        followee: followeeUsername
    })

    if (!followRequest) {
        return res.status(404).json({
            message: "Follow request not found"
        })
    }

    followRequest.status = status
    await followRequest.save()

    res.status(200).json({
        message: `Follow request ${status} successfully`,
        follow: followRequest
    })
}

async function getPendingFollowRequestsController(req, res) {
    const followeeUsername = req.user.username

    const pendingRequests = await followModel
        .find({
            followee: followeeUsername,
            status: "pending"
        })
        .sort({ createdAt: -1 })

    res.status(200).json({
        message: "Pending follow requests fetched successfully",
        count: pendingRequests.length,
        requests: pendingRequests
    })
}


module.exports = {
    followUserController,
    unfollowUserController,
    updateFollowRequestStatusController,
    getPendingFollowRequestsController
}
