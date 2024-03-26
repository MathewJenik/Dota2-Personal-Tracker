const express = require('express')
const router = express.Router()

const matchController = require('../controllers/matchController.js')
const verifyJWT = require('../middleware/verifyJWT.js')

//router.get('/', matchController.get)

// make all the below paths require verifyJWT
//router.use(verifyJWT)
/*
router.route('/')
    .post(heroController.createHero)
    .patch(heroController.updateHero)
    .delete(heroController.deleteHero)
*/
// Define route for both without verifyJWT middleware
router.route('/:match_id').get(matchController.getMatchByMatchID)

module.exports = router