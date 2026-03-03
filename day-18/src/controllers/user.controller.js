const followModel = require("../models/follow.model")
const userModel = require("../models/user.model")


async function followUserController(req, res) {

    const followerUsername = req.user.username  // jo user login he, matlab jo follow karna chahta he.
    const followeeUsername = req.params.username //jis ko follow karna he use params me bhejenge


    if (followerUsername == followeeUsername) {
        return res.status(400).json({
            message: "You cannot follow yourself"
        })
    }

    const isAlreadyFollowing = await followModel.findOne({
        follower: followerUsername,
        followee: followeeUsername
    })

    const isFolloweeExists = await userModel.findOne({
        username: followeeUsername
    })

    if (!isFolloweeExists) {
        return res.status(404).json({
            message: "User you trying to follow does not exist"
        })
    }

    if (isAlreadyFollowing) {
        if (isAlreadyFollowing.status === "pending") {
            return res.status(200).json({
                message: `Follow request already sent to ${followeeUsername}`,
                follow: isAlreadyFollowing
            })
        }

        if (isAlreadyFollowing.status === "accepted") {
            return res.status(200).json({
                message: `You are already following ${followeeUsername}`,
                follow: isAlreadyFollowing
            })
        }

        if (isAlreadyFollowing.status === "rejected") {
            isAlreadyFollowing.status = "pending"
            await isAlreadyFollowing.save()

            return res.status(200).json({
                message: `Follow request sent again to ${followeeUsername}`,
                follow: isAlreadyFollowing
            })
        }

        return res.status(200).json({
            message: "Follow request already exists",
            follow: isAlreadyFollowing
        })
    }

    const followRecord = await followModel.create({
        follower: followerUsername,
        followee: followeeUsername,
        status: "pending"
    })

    return res.status(201).json({
        message: `Follow request sent to ${followeeUsername}`,
        follow: followRecord
    })
}

async function unfollowUserController(req, res) {

    const followerUsername = req.user.username
    const followeeUsername = req.params.username

    const isUserFollowing = await followModel.findOne({
        follower: followerUsername,
        followee: followeeUsername
    })

    if(!isUserFollowing) {
        return res.status(200).json({
            message: `You are not following ${followeeUsername}`
        })
    }

    await followModel.findByIdAndDelete(isUserFollowing._id)

    res.status(200).json({
        message: `You have unfollowed ${followeeUsername}`
    })
}

async function acceptFollowRequestController(req, res) {
    const followeeUsername = req.user.username
    const followerUsername = req.params.username

    const followRequest = await followModel.findOne({
        follower: followerUsername,
        followee: followeeUsername,
        status: "pending"
    })

    if (!followRequest) {
        return res.status(404).json({
            message: `No pending follow request found from ${followerUsername}`
        })
    }

    followRequest.status = "accepted"
    await followRequest.save()

    return res.status(200).json({
        message: `${followerUsername} can now follow you`,
        follow: followRequest
    })
}

async function rejectFollowRequestController(req, res) {
    const followeeUsername = req.user.username
    const followerUsername = req.params.username

    const followRequest = await followModel.findOne({
        follower: followerUsername,
        followee: followeeUsername,
        status: "pending"
    })

    if (!followRequest) {
        return res.status(404).json({
            message: `No pending follow request found from ${followerUsername}`
        })
    }

    followRequest.status = "rejected"
    await followRequest.save()

    return res.status(200).json({
        message: `Follow request rejected for ${followerUsername}`,
        follow: followRequest
    })
}

async function getPendingRequestsController(req, res) {
    try {
        const followeeUsername = req.user?.username;

        if (!followeeUsername) {
            return res.status(401).json({
                message: "Unauthorized: user info missing in token"
            });
        }

        const requests = await followModel
            .find({ followee: followeeUsername, status: "pending" })
            .sort({ createdAt: -1 });

        return res.status(200).json({
            message: "Pending follow requests fetched successfully",
            total: requests.length,
            requests
        });
    } catch (error) {
        return res.status(500).json({
            message: "Failed to fetch pending follow requests",
            error: error.message
        });
    }
}


module.exports = {
    followUserController,
    unfollowUserController,
    acceptFollowRequestController,
    rejectFollowRequestController,
    getPendingRequestsController
}
