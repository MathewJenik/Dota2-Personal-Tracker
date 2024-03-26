const Match = require('../models/Match')

const asyncHandler = require('express-async-handler')
const bcrypt = require('bcrypt')
const { json } = require('express')

// @desc Get all Matches by ID
// @route Get /matches
// @access Private
const getAllMatchesByPlayer = asyncHandler(async (req, res) => {
    
    const {player_id} = req.body

    if (!player_id) {
        return res.status(400).json({message: "Player ID not specified"})
    }


    const matches = await Match.find({"players.account_id": player_id}).lean()

    if (!matches?.length) {
        return res.status(400).json({message: "No Matches Found!"})
    }
    else {
        res.json(matches)
    }
})

// @desc Create a new Match
// @route POST /matches
// @access Private
const createMatch = asyncHandler(async (req, res) => {

    console.log("CREATE MATCH STARTED: ")
    //console.log("REQ IS : ", req);
    const {
        match_id,
        barracks_status_dire,
        barracks_status_radiant,
        dire_score,
        radiant_score,
        radiant_win,
        duration,
        first_blood_time,
        game_mode,
        lobby_type,
        patch,
        region,
        players,
        picks_bans,
        start_time
    } = req.body;
    //console.log("Client REq Bodyu : ", req.body)
    console.log("GETS HERE")


    // Check if all required fields are present
    if (!match_id || !Number.isInteger(barracks_status_dire) || !Number.isInteger(barracks_status_radiant) || !Number.isInteger(dire_score) || !Number.isInteger(radiant_score)
         || !Number.isInteger(duration) || !Number.isInteger(first_blood_time) || !Number.isInteger(game_mode) || !Number.isInteger(patch) || !Number.isInteger(region) ||
         !Array.isArray(players) || !Array.isArray(picks_bans) || !Number.isInteger(lobby_type)
        || !start_time || typeof radiant_win != "boolean" ) {
        //return res.status(400).json({ message: "Create - All Fields Are Required" });
        console.log(match_id,
            barracks_status_dire,
            barracks_status_radiant,
            dire_score,
            radiant_score,
            radiant_win,
            duration,
            first_blood_time,
            game_mode,
            lobby_type,
            patch,
            region, Array.isArray(players), Array.isArray(picks_bans), "IS BOOL")
        return { message: "Create - All Fields Are Required" };
    }

    console.log(" ALSO GETS HERE")
    
    // check for duplicate match
    const dup = await Match.findOne({match_id}).lean().exec()
    console.log(" 3ALSO GETS HERE")

    if (dup) {
        //return res.status(409).json({message: "Duplicate Match"})
        return {message: "Duplicate Match"}
    }
    console.log(" 4ALSO GETS HERE")
    const matchObj = {
        match_id,
        barracks_status_dire,
        barracks_status_radiant,
        dire_score,
        radiant_score,
        radiant_win,
        duration,
        first_blood_time,
        game_mode,
        lobby_type,
        patch,
        region,
        players,
        picks_bans,
        start_time
    }

    console.log(" 5ALSO GETS HERE")
    const match = await Match.create(matchObj)


    console.log("6 ALSO GETS HERE")
    // user successfully created
    if (match) {
        //res.status(201).json({message: `New Match ${match_id} created`})
        return {message: `New Match ${match_id} created`}
    } else {
        //res.status(400).json({message: "Invalid Match Data"})
        return {message: "Invalid Match Data"}
    }
    console.log("7 ALSO GETS HERE")
});



// @desc Get a specific Match
// @route Get /match/:{match_id}
// @access Private
const getMatchByMatchID  = asyncHandler(async (req, res) => {
    const { match_id } = req.params;
    console.log("PARAMS: ", req.params)
    console.log("MATCH ID: ", match_id)
    const match = await Match.findOne({match_id: match_id}).lean().exec();
    console.log("MATCH : ",match);
    if (!match) {
        return res.status(404).json({message: "Match not found"})
    }
    return res.json(match);
    
})

module.exports = {
    createMatch,
    getMatchByMatchID
}