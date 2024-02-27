const Item = require('../models/Item')

const asyncHandler = require('express-async-handler')
const bcrypt = require('bcrypt')

// @desc Get all Items
// @route Get /items
// @access Private
const getAllItems = asyncHandler(async (req, res) => {
    const items = await Item.find().select().lean()
    if (!items?.length) {
        return res.status(400).json({message: "No Items Found!"})
    }
    else {
        res.json(items)
    }
})


// @desc Get a singular Item
// @route Get /items/:{id}
// @access Private
const getSingularItem  = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const item = await Item.findOne({_id: id}).lean().exec();

    if (!item) {
        return res.status(404).json({message: "Item not found"})
    }
    console.log("ITME: IS: ", item)
    res.json(item);
    
})

// @desc Create a user
// @route Post /users
// @access Private
const createItem = asyncHandler(async (req, res) => {
    const {name, cost, alterations, description, upgradePath, predecessorPath, imageLoc} = req.body

    console.log(name, cost, alterations, description, upgradePath, predecessorPath, imageLoc)
    console.log(Array.isArray(upgradePath))
    // confirm data
    if (!name || !cost || !alterations || !description || !Array.isArray(upgradePath) || !Array.isArray(predecessorPath) || !imageLoc) {
        return res.status(400).json({message: "All Fields Are Required"})
    }

    // check for duplicate item
    const dup = await Item.findOne({name}).lean().exec()

    if (dup) {
        return res.status(409).json({message: "Duplicate Item"})
    }

    const itemObj = {name, cost, alterations, description, upgradePath, predecessorPath, imageLoc}
    const item  = await Item.create(itemObj)

    // user successfully created
    if (item) {
        res.status(201).json({message: `New Item ${name} created`})
    } else {
        res.status(400).json({message: "Invalid Item Data"})
    }

})



// @desc update item
// @route Patch /items
// @access Private
const updateItem = asyncHandler(async (req, res) => {
    // getting data
    const {id, name, cost, alterations, description, upgradePath, predecessorPath, imageLoc, active} = req.body

    // confirm data
    if (!id || !name || !cost || !alterations || !description || !Array.isArray(upgradePath || !Array.isArray(predecessorPath)) || !imageLoc || typeof active != 'boolean') {
        
        return res.status(400).json({message: "All fields are required"});
    }

    const item = await Item.findById(id).exec();

    if (!item) {
        return res.status(400).json({message: "Item not found"});
    }

    // check for a duplicate item
    const dup = await Item.findOne({name}).lean().exec();
    
    // allow updates to original, checking for same id
    if (dup && dup?._id.toString() !== id) {
        return res.status(409).json({message: "Duplicate Username."});
    }

    item.name = name;
    item.cost = cost;
    item.alterations = alterations;
    item.description = description;
    item.upgradePath = upgradePath;
    item.predecessorPath = predecessorPath;
    item.imageLoc = imageLoc;
    item.active = active;

    const updatedItem = await item.save()
    res.json({message: `${updatedItem.name} updated`})

})

// @desc delete user
// @route Delete /users
// @access Private
const deleteItem = asyncHandler(async (req, res) => {
    
    const { id } = req.body;

    if (!id) {
        return res.status(400).json({message: "Item ID is required"});
    }

    // check for any match data regarding this item and remove them.

    const item = await Item.findById(id).exec();
    const itemName = item.name;

    if (!item) {
        return res.status(400).json({message: 'Item Not Found'});
    }

    const result = await item.deleteOne();
    const reply = `Item - ${itemName} with ID ${id} deleted`;

    res.json(reply);

})

module.exports = {
    getAllItems,
    createItem,
    updateItem,
    deleteItem,
    getSingularItem
}