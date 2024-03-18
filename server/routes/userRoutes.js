const express = require('express')
const router = express.Router()

const userController = require('../controllers/usersController.js')

router.route('/')
    .get(userController.getAllUsers)
    .post(userController.createUser)
    .patch(userController.updateUser)
    .delete(userController.deleteUser)


// Define route for both without verifyJWT middleware
router.route('/:id').get(userController.getSingularUser)

router.route('/dotaid').patch(userController.setDotaID)

router.route('/statistics/:id').get(userController.getPlayerStatistics)

module.exports = router