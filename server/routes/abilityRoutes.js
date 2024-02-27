const express = require('express')
const router = express.Router()

const abilityController = require('../controllers/abilityController.js')

router.route('/')
    .get(abilityController.getAllAbilities)
    .post(abilityController.createAbility)
    .patch(abilityController.updateAbility)
    .delete(abilityController.deleteAbility)

module.exports = router