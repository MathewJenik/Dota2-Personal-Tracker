const User = require('../models/User')

const asyncHandler = require('express-async-handler')
const bcrypt = require('bcrypt')
const PlayerMatch = require('../models/PlayerMatch')
const Player = require('../models/Player')

// @desc Get all users
// @route Get /users
// @access Private
const getAllPlayers = asyncHandler(async (req, res) => {
    const users = await User.find().select('-password').lean()
    if (!users?.length) {
        return res.status(400).json({message: "No Users Found!"})
    }
    else {
        res.json(users)
    }
})


// @desc Create a player
// @route Post /players
// @access Private
const createPlayer = asyncHandler(async (req, res) => {
    const {Account_ID, Username, Rank, Exposed} = req.body
    console.log(Account_ID, Username, Rank, Exposed)
    // confirm data
    if (!Account_ID || !Username || !Rank || !DotaID || !Exposed) {
        return res.status(400).json({message: "All Fields Are Required"})
    }

    // check for duplicate account/user
    const dup = await Player.findOne({Account_ID}).lean().exec()

    if (dup) {
        return res.status(409).json({message: "Duplicate Account_ID"})
    }

    const playerObj = {Account_ID, Username, Rank, Exposed}

    // create and store the user
    const player = await Player.create(playerObj)

    // user successfully created
    if (player) {
        res.status(201).json({message: `New Player ${Account_ID} created`})
    } else {
        res.status(400).json({message: "Invalid Player Data"})
    }

})



// @desc update player
// @route Patch /players
// @access Private
const updatePlayer = asyncHandler(async (req, res) => {
    // getting data
    const {id, username, roles, DotaID, active, password} = req.body;

    // confirm data
    if (!id || !username || !Array.isArray(roles) || !roles.length || !DotaID || typeof active != 'boolean') {
        return res.status(400).json({message: "All fields are required"});
    }

    const user = await User.findById(id).exec();

    if (!user) {
        return res.status(400).json({message: "User not found"});
    }

    // check for a duplicate user

    const dup = await User.findOne({username}).lean().exec();
    
    // allow updates to original, checking for same id
    if (dup && dup?._id.toString() !== id) {
        return res.status(409).json({message: "Duplicate Username."});
    }

    user.username = username;
    user.roles = roles;
    user.active = active;
    user.DotaID = DotaID;

    if (password) {
        // Hash Password
        user.password = await bcrypt.hash(password, 10) // 10 salt rounds
    }

    const updatedUser = await user.save();
    res.json({message: `${updatedUser.username} updated`})

})

// @desc delete user
// @route Delete /users
// @access Private
const deletePlayer = asyncHandler(async (req, res) => {
    
    const { id } = req.body;

    if (!id) {
        return res.status(400).json({message: "User ID is required"});
    }

    // check for any match data regarding this user and remove them.

    const user = await User.findById(id).exec();
    const username = user.username;

    if (!user) {
        return res.status(400).json({message: 'User Not Found'});
    }

    const result = await user.deleteOne();
    const reply = `Username ${username} with ID ${id} deleted`;

    res.json(reply);

})



module.exports = {
    getAllPlayers,
    createPlayer,
    updatePlayer,
    deletePlayer
}