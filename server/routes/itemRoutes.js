const express = require('express')
const router = express.Router()

const itemController = require('../controllers/itemsController.js')
const verifyJWT = require('../middleware/verifyJWT')

router.get('/', itemController.getAllItems)

// make all the below paths require verifyJWT
router.use(verifyJWT)

router.route('/')
    .post(itemController.createItem)
    .patch(itemController.updateItem)
    .delete(itemController.deleteItem)

router.route('/:id')
    .get(itemController.getSingularItem)

module.exports = router