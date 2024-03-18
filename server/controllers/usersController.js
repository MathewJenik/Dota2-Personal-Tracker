const User = require('../models/User')

const asyncHandler = require('express-async-handler')
const bcrypt = require('bcrypt')
const PlayerMatch = require('../models/PlayerMatch')

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




// @desc set DotaID of user
// @route Patch /users/dotaid
// @access Private
const setDotaID = asyncHandler(async (req, res) => {
    // getting data
    const {id, DotaID} = req.body;

    // confirm data
    if (!id || !DotaID ) {
        return res.status(400).json({message: "All fields are required"});
    }

    const user = await User.findById(id).exec();

    if (!user) {
        return res.status(400).json({message: "User not found"});
    }

    // check for a duplicate user

    const dup = await User.findOne({id}).lean().exec();
    
    // allow updates to original, checking for same id
    if (dup && dup?._id.toString() !== id) {
        return res.status(409).json({message: "Duplicate Username."});
    }

    user.DotaID = DotaID;

    const updatedUser = await user.save();
    res.json({message: `Updated dotaID for ${updatedUser.username}`})

})



// @desc get the statistics linked to a dota account.
// @route Patch /users/statistics/:{id}
// @access Private
const getPlayerStatistics = asyncHandler(async (req, res) => {
    // getting data
    const { id } = req.params;
    const DotaID = id; // Assuming your route parameter is named "id"

    console.log("PDOTA: ", DotaID)

    // confirm data
    if (!DotaID ) {
        return res.status(400).json({message: "All fields are required"});
    }


    let totalGames = 0;
    let totalWins = 0;
    let totalLosses = 0;
    
    let recentAverageRank = 0;
    let recentWins = 0;
    let recentLosses = 0;

    let playerRank = 0;


    try {
        // Find all the player matches that match the dota ID
        const playerMatches = await PlayerMatch.find({Dota_ID: DotaID});
        
        // Find the latest 20 matches for the given Dota ID
        const recentMatches = await PlayerMatch.find({ Dota_ID: DotaID }).sort({ Time_Played: -1 }).limit(20);
        
        // Calculate win rate
        totalGames = playerMatches.length;

        // calculate average rank over 20 games

        for (let i = 0; i < playerMatches.length; i++) {
            //console.log("Player Match Details: ", playerMatches[i])
            if (playerMatches[i].Loss == true) {
                totalLosses += 1;
            } 
            if (playerMatches[i].Win == true) {
                totalWins += 1;
            }

        }


        // get the average rank for those 20 matches
        for (let i = 0; i < recentMatches.length; i++) {
            //console.log("RECENT DATA: ", recentMatches[i])

            if (recentMatches[i].Loss == true) {
                recentWins += 1;
            } 
            if (recentMatches[i].Win == true) {
                recentLosses += 1;
            }

            const bracket = Math.floor(recentMatches[i].Average_Rank/10)
            const star =  recentMatches[i].Average_Rank%10
            
            const ave = (bracket*10) + (star * 2)
            
            console.log("Bracket : ", bracket , " | Star : ", star, " | Ave : ", ave)
            // add average rank
            recentAverageRank += ave

        }

        recentAverageRank = recentAverageRank/20

        // convert the averageRank back into its format of 1-5 for each 10
        RARBracket = Math.floor(recentAverageRank/10)
        RARStar = recentAverageRank%10
        RARStar = RARStar / 2
        
        recentAverageRank = (RARBracket * 10) + (RARStar)


        // data to get the most played hero in the last 20 games,
        // with its win rate and wins/losses + other details


    } catch (error) {
        console.log("Error: ", error)
        return res.json({ERROR: error, INFO: DotaID})
    }

    return res.json(
        {
            wins: totalWins,
            losses: totalLosses,
            total: totalGames,
            winrate: (totalWins/totalGames),
            recentWins: recentWins,
            recentLosses: recentLosses,
            recentWinRate: (recentWins/20),
            recentMatchAverageRank: recentAverageRank,
            playerRank: playerRank
    })

})

module.exports = {
    getAllUsers,
    createUser,
    updateUser,
    deleteUser,
    getSingularUser,
    setDotaID,
    getPlayerStatistics
}