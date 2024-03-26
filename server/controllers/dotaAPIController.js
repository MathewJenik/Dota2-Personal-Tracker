// https://api.opendota.com/api/players/102296415


const Ability = require('../models/Ability')
const util = require('util');

const asyncHandler = require('express-async-handler');
const Match = require('../models/Match');
const { createMatch, createMatchFromOBJ } = require('./matchController');
const { createPlayerMatch } = require('./PlayerMatchController');
const PlayerMatch = require('../models/PlayerMatch');


// @desc Dota 2 API CALL
// @route https://api.opendota.com/api/players/102296415
// access private
const getDotaAPICall = asyncHandler(async (req, res) => {
    //console.log("THIS IS RUNNINGNGNG")
    const {path, data, secondary_path} = req.body

    if (!path || !data) {
        return res.status(400).json({message: "D-API: All fields are required."})
    }

    const response = await fetch(`https://api.opendota.com/api/${path}/${data}/${secondary_path}`);
    const info = await response.json();
 

    if (info?.error) {
        return res.status(400).json({message: `ERROR : ${info?.error}`})
    }

    //const inspectOptions = {depth: 5};
    //const inspectedResponse = util.inspect(info, inspectOptions)

    return info

})


// @desc Get Dota Matches (last 20) stored in DB
// @route Post /dota/matches/recent
// access Private
const getRecentPlayerMatches = asyncHandler(async (req, res) => {

    const {dota_id} = req.body
    console.log("RECENT PLAYER MATCHES RUNNIGN")
    if (!dota_id) {
        return res.status(404).json({message : "All fields are required"})
    }

    try {
        // Find the latest 20 matches for the given Dota ID
        const recentMatches = await PlayerMatch.find({ Dota_ID: dota_id }).sort({ Time_Played: -1 }).limit(20);
        console.log("RECENT MATCHES ARE: ", recentMatches)
        // Extract Match_IDs from recentPlayerMatches
        const matchIds = recentMatches.map(match => match.Match_ID);
        //console.log("MATCH IDS: ", matchIds)

        // Find matches from Match table using Match_IDs
        const matches = await Match.find({ match_id: { $in: matchIds } });

        const restructuredMatch = matches.map(match => {
            const matchingRM = recentMatches.find(recentMatch => recentMatch.Match_ID === match.match_id);
            //console.log("MATCHING RM: ", matchingRM)
            return {
                ...match.toObject(),
                averageRank: matchingRM.Average_Rank
            };

        }
            
        )

        //console.log("RESTRUCTURED MATCH: ", restructuredMatch)

        //console.log("RECENT :", matches)
        return res.status(200).json({ matches: restructuredMatch});
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: "Internal Server Error" });
    }


})


// @desc Get dota information based of ID
// @route POST /dota
// access Private
const getDotaPlayerSync = asyncHandler(async (req, res) => {
    const {id} = req.body

    req.body.path = "players"
    req.body.secondary_path = ""

    //console.log(req.body)

    const playerInformation = await getDotaAPICall(req, res)

    if (playerInformation?.error) {
        return res.status(400).json({message: `ERROR : ${playerInformation?.error}`})
    }

    //return response.json(playerInformation)
    return res.json(playerInformation)
    
})

// @desc Get dota match information. based off ID. Syncs with dota 2 API.
// @route POST /dota
// access private
const getDotaPlayerRecentMatchesSync = asyncHandler(async (req, res) => {

    console.log("GET RECENT MATCHES workign")
    const {data} = req.body;

    req.body.path = "players";
    req.body.secondary_path = "recentMatches";
    

    const matchInformation = await getDotaAPICall(req, res);
    //console.log("MATCH INFO: ", matchInformation)

    if (matchInformation?.error) {
        return res.status(400).json({message: "Not Found"})
    }

    if (matchInformation.length === 0) {
        return res.status(400).json({message: "Match Data Not Exposed"})
    }

    for (m in matchInformation) {
        //console.log("MAtch: ", matchInformation[m].match_id);
    }

    // Extracting match IDs from matchInformation
    const matchIds = matchInformation.map(match => match.match_id);

    //console.log("GETS HERE")

    // Fetching matches from MongoDB that exist in the extracted match IDs
    const existingMatches = await Match.find({"match_id": {$in: matchIds}}).lean();

    //console.log("EXIST: ", existingMatches)
    //console.log("ALSO GETS HERE")

    // Filtering out the matches that do not exist in the database
    const nonExistingMatches = matchInformation.filter(match => {
        return !existingMatches.some(existingMatch => existingMatch.match_id === match.match_id);
    });

    //console.log(nonExistingMatches)

    // now access the individual match api to get the full match information
    const createMatchPromises = nonExistingMatches.map(async nonExistMatch => {
        //console.log("NON EXIST MATCH DETAILS: ", nonExistMatch)
        req.body.path = "matches";
        req.body.secondary_path = "";
        req.body.data = nonExistMatch.match_id;

        

        // get the individual match
        const indivMatch = await getDotaAPICall(req, res);

        //console.log("INDIV MATCH: ", indivMatch)
        //console.log("nonExistMatch: ", nonExistMatch);

        // setup all the details needed for the PlayerMatch Table entry
        let isRadiant = false 
        if (nonExistMatch.player_slot > 128) {
            isRadiant = true;
        }
        const p = indivMatch.patch
        const startTime = nonExistMatch.start_time

        let w = false;
        let l = false;
        if (isRadiant == true && nonExistMatch.radiant_win == true) {
            w = true;
        } else if (isRadiant == true && nonExistMatch.radiant_win == false) {
            l = true;
        } else if (isRadiant == false && nonExistMatch.radiant_win == true) {
            l = true;
        } else if (isRadiant == false && nonExistMatch.radiant_win == false) {
            w = true;
        }

        // get the Hero id played
        let hero = nonExistMatch.hero_id;
        
        // get the Average Rank
        let averageRank = nonExistMatch.average_rank;
        if (averageRank == null) {
            averageRank = 45;
        }

        //console.log("NEW THINGO : ", nonExistMatch)
        // setup the body
        req.body = {
            Dota_ID: data, Match_ID: nonExistMatch.match_id, 
            Win: w, Loss: l, Patch: p, Time_Played: startTime, 
            Hero_Played: hero, Average_Rank: averageRank
        }

        // create the Player Match table entry
        const result = await createPlayerMatch(req, res);
        console.log(result)
        
        //console.log("RESULT IS: ", result)
        //console.log(nonExistMatch.match_id)
        // set the values for the individual amtch
        req.body = indivMatch;
        req.body.match_id = nonExistMatch.match_id
        req.body.start_time = startTime
        

        // create the match in the DB
        return createMatch(req, res);


    });

    /*
    // Using the non existant matches, add them to the database:
    // Create non-existing matches
    for (const nonExistingMatch of nonExistingMatches) {
        req.body = nonExistingMatch
        console.log("NON: ", nonExistingMatch);
        console.log("REQ BODY: ", req.body);
        const matchRes = await createMatch(req, res);
        console.log("MATCH RESPONSE : ", matchRes)
    }
*/

    // Wait for all createMatch calls to finish before sending the response
    //const createMatchResults = await Promise.all(createMatchPromises);
    //console.log("OUTPUT: ", createMatchPromises);

    return res.json(matchInformation);

    //return response.json(playerInformation)
    //return res.json(matchInformation)
    
})


const getDotaPlayerMatchesSync = asyncHandler(async (req, res) => {

    const {id} = req.body;

    req.body.path = "players";
    req.body.secondary_path = "matches";
    

    const matchInformation = await getDotaAPICall(req, res);
    console.log("MATCH INFO: ", matchInformation)

    if (matchInformation?.error) {
        return res.status(400).json({message: "Not Found"})
    }

    if (matchInformation.length === 0) {
        return res.status(400).json({message: "Match Data Not Exposed"})
    }

    for (m in matchInformation) {
        //console.log("MAtch: ", matchInformation[m].match_id);
    }

    // Extracting match IDs from matchInformation
    const matchIds = matchInformation.map(match => match.match_id);

    // Fetching matches from MongoDB that exist in the extracted match IDs
    const existingMatches = await Match.find({"match_id": {$in: matchIds}}).lean();

    // Filtering out the matches that do not exist in the database
    const nonExistingMatches = matchInformation.filter(match => {
        return !existingMatches.some(existingMatch => existingMatch.match_id === match.match_id);
    });


    // now access the individual match api to get the full match information
    const createMatchPromises = nonExistingMatches.map(async nonExistMatch => {
        req.body.path = "matches";
        req.body.secondary_path = "";
        req.body.data = nonExistMatch.match_id;
        
        const indivMatch = await getDotaAPICall(req, res);
        
        return createMatch(indivMatch, res);
    });

    /*
    // Using the non existant matches, add them to the database:
    // Create non-existing matches
    for (const nonExistingMatch of nonExistingMatches) {
        req.body = nonExistingMatch
        console.log("NON: ", nonExistingMatch);
        console.log("REQ BODY: ", req.body);
        const matchRes = await createMatch(req, res);
        console.log("MATCH RESPONSE : ", matchRes)
    }
*/

    // Wait for all createMatch calls to finish before sending the response
    const createMatchResults = await Promise.all(createMatchPromises);
    console.log("OUTPUT: ", createMatchResults);

    return res.json(matchInformation);

    //return response.json(playerInformation)
    //return res.json(matchInformation)
    
})


const getDotaMatchByID = asyncHandler(async (req, res) => {
    const { id } = req.params;
    //const {id} = req.body

    req.body.path = "matches"
    req.body.secondary_path = ""
    req.body.data = id
    


    const matchInformation = await getDotaAPICall(req, res)
    console.log("MATCH INFO: ", matchInformation)

    if (matchInformation?.error) {
        return res.status(400).json({message: "Not Found"})
    }
    

    //return response.json(playerInformation)
    return res.json(matchInformation)
})


module.exports = {
    getDotaAPICall,
    getDotaPlayerSync,
    getDotaPlayerMatchesSync,
    getDotaMatchByID,
    getDotaPlayerRecentMatchesSync,
    getRecentPlayerMatches
}