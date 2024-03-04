const express = require('express')
const router = express.Router()

const abilityController = require('../controllers/abilityController.js')

router.route('/')
    .get(abilityController.getAllAbilities)
    .post(abilityController.createAbility)
    .patch(abilityController.updateAbility)
    .delete(abilityController.deleteAbility)

router.route('/:id').get(abilityController.getSingularAbility)

module.exports = router