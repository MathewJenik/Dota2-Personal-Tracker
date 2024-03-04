const express = require('express')
const router = express.Router()

const heroController = require('../controllers/heroesController.js')
const verifyJWT = require('../middleware/verifyJWT')

router.get('/', heroController.getAllHeroes)

// make all the below paths require verifyJWT
router.use(verifyJWT)

router.route('/')
    .post(heroController.createHero)
    .patch(heroController.updateHero)
    .delete(heroController.deleteHero)

// Define route for both without verifyJWT middleware
router.route('/:id').get(heroController.getSingularHero)

module.exports = router