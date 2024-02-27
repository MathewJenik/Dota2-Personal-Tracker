const express = require('express')
const router = express.Router()

const itemController = require('../controllers/itemsController.js')

router.route('/')
    .get(itemController.getAllItems)
    .post(itemController.createItem)
    .patch(itemController.updateItem)
    .delete(itemController.deleteItem)

router.route('/:id')
    .get(itemController.getSingularItem)

module.exports = router