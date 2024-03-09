const PlayerMatch = require('../models/PlayerMatch')

const asyncHandler = require('express-async-handler')
const bcrypt = require('bcrypt')
const { json } = require('express')
const Match = require('../models/Match')

// @desc Get all PlayerMatches by player ID
// @route Get /playermatches
// @access Private
const getPlayerMatchesByID = asyncHandler(async (req, res) => {
    
    const {Dota_ID} = req.body

    if (!Dota_ID) {
        return res.status(400).json({message: "Dota ID not specified"})
    }


    const playerMatches = await PlayerMatch.find({"players.account_id": Dota_ID}).lean()

    if (!playerMatches?.length) {
        return res.status(400).json({message: "No Player Matches Found!"})
    }
    else {
        res.json(playerMatches)
    }
})

// @desc Create a new Player Match
// @route POST /playermatches
// @access Private
const createPlayerMatch = asyncHandler(async (req, res) => {
    console.log("PLAYER MATCH DATA RUNNING");

    const {Dota_ID, Match_ID, Win, Loss, Patch, Time_Played} = req.body;
    console.log(Dota_ID, Match_ID, Boolean(Win), Boolean(Loss), Patch, Time_Played)
    // undefined on dota id and patch.
    if (!Dota_ID || !Number.isInteger(Match_ID) || !typeof Win == "boolean" || !typeof Loss == "boolean" || !Patch || !Time_Played) {
        return {message : "Player Match - All Fields are required"}
    }

    console.log("PLAYER MATCH 2");
    // check for duplicate Player Match
    const dup = await PlayerMatch.findOne({Dota_ID, Match_ID}).lean().exec()

    if (dup) {
        //return res.status(409).json({message: "Duplicate Match"})
        return {message: "Duplicate Player Match"}
    }
    
    console.log("PLAYER MATCH 3");
    const playerMatchObj = {
        Dota_ID, Match_ID, Win, Loss, Patch, Time_Played
    }

    const playerMatch = await PlayerMatch.create(playerMatchObj)

    console.log("PLAYER MATCH 4");
    // user successfully created
    if (playerMatch) {
        //res.status(201).json({message: `New Match ${match_id} created`})
        return {message: `New Player Match between: Dota_ID: ${Dota_ID} Match_ID ${Match_ID} created`}
    } else {
        //res.status(400).json({message: "Invalid Match Data"})
        return {message: "Invalid Player Match Data"}
    }
});


module.exports = {
    getPlayerMatchesByID,
    createPlayerMatch
}