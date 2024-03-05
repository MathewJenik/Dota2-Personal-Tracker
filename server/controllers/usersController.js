const User = require('../models/User')

const asyncHandler = require('express-async-handler')
const bcrypt = require('bcrypt')

// @desc Get all users
// @route Get /users
// @access Private
const getAllUsers = asyncHandler(async (req, res) => {
    const users = await User.find().select('-password').lean()
    if (!users?.length) {
        return res.status(400).json({message: "No Users Found!"})
    }
    else {
        res.json(users)
    }
})

// @desc Get a singular User
// @route Get /hero/:{id}
// @access Private
const getSingularUser  = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const user = await User.findOne({_id: id}).lean().exec();

    if (!user) {
        return res.status(404).json({message: "User not found"})
    }
    res.json(user);
    
})

// @desc Create a user
// @route Post /users
// @access Private
const createUser = asyncHandler(async (req, res) => {
    const {username, password, DotaID, roles} = req.body
    console.log(username, password, DotaID, roles)
    // confirm data
    if (!username || !password || !Array.isArray(roles) || !DotaID || !roles.length) {
        return res.status(400).json({message: "All Fields Are Required"})
    }

    // check for duplicate account/user
    const dup = await User.findOne({username}).lean().exec()

    if (dup) {
        return res.status(409).json({message: "Duplicate Username"})
    }

    // Hash the password
    const hashedPass = await bcrypt.hash(password, 10) // (password, n) where n is the salt rounds
    const userObj = {username, "password": hashedPass, DotaID, roles}

    // create and store the user
    const user = await User.create(userObj)

    // user successfully created
    if (user) {
        res.status(201).json({message: `New User ${username} created`})
    } else {
        res.status(400).json({message: "Invalid User Data"})
    }

})



// @desc update user
// @route Patch /users
// @access Private
const updateUser = asyncHandler(async (req, res) => {
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
const deleteUser = asyncHandler(async (req, res) => {
    
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
    getAllUsers,
    createUser,
    updateUser,
    deleteUser,
    getSingularUser
}