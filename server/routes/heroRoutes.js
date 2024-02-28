const express = require('express')
const router = express.Router()

const heroController = require('../controllers/heroesController.js')

router.route('/')
    .get(heroController.getAllHeroes)
    .post(heroController.createHero)
    .patch(heroController.updateHero)
    .delete(heroController.deleteHero)

router.route('/:id').get(heroController.getSingularHero)

module.exports = router