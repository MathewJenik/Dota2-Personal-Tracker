const express = require('express')
const router = express.Router()

const dotaAPIController = require('../controllers/dotaAPIController.js')

//router.route('/')
//    .post(dotaAPIController.getDotaPlayerSync)

router.route('/player/sync')
    .get(dotaAPIController.getDotaPlayerSync)

// THIS ROUTE IS UNFINISHED, WILL EAT ALL API CALLS
//router.route('/matches/sync')
//    .get(dotaAPIController.getDotaPlayerMatchesSync)

router.route('/matches/sync/recent')
    .get(dotaAPIController.getDotaPlayerRecentMatchesSync)

router.route('/match/:id')
    .get(dotaAPIController.getDotaMatchByID)

router.route('/matches/recent')
    .post(dotaAPIController.getRecentPlayerMatches)

module.exports = router
