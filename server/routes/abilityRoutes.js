const express = require('express')
const router = express.Router()

const abilityController = require('../controllers/abilityController.js')
const verifyJWT = require('../middleware/verifyJWT.js')

router.route('/').get(abilityController.getAllAbilities)
router.route('/:id').get(abilityController.getSingularAbility)

// make all the below paths require verifyJWT
router.use(verifyJWT)

router.route('/')
    .post(abilityController.createAbility)
    .patch(abilityController.updateAbility)
    .delete(abilityController.deleteAbility)


module.exports = router