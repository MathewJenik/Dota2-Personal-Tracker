const express = require('express')
const router = express.Router()

const heroController = require('../controllers/heroesController.js')

router.route('/')
    .get(heroController.getAllHeroes)
    .post(heroController.createHero)
    .patch(heroController.updateHero)
    .delete(heroController.deleteHero)

module.exports = router