const Ability = require('../models/Ability')

const asyncHandler = require('express-async-handler')


// @desc Get all Abilities
// @route Get /abilities
// access Private
const getAllAbilities = asyncHandler(async (req, res) => {

    const abilities = await Ability.find().select().lean()
    if (!abilities?.length) {
        return res.status(400).json({message: "No Abilities Found."})
    } else {
        res.json(abilities)
    }

})


// @desc Get a singular Ability
// @route Get /ability/:{id}
// @access Private
const getSingularAbility  = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const ability = await Ability.findOne({_id: id}).lean().exec();
    
    if (!ability) {
        return res.status(404).json({message: "Ability not found"})
    }
    res.json(ability);
    
})

// @desc Create a new Ability
// @route Post /abilities
// access Private
const createAbility = asyncHandler(async (req, res) => {
    const {name, description, cooldown, manaCost, healthCost, castRange, radius, duration, imageLoc} = req.body
    console.log(name, description, cooldown, manaCost, healthCost, castRange, radius, duration, imageLoc)
    if (!name || !description || !Array.isArray(cooldown) || !Array.isArray(manaCost) || !Array.isArray(healthCost)
        || !Array.isArray(castRange) || !Array.isArray(radius) || !Array.isArray(duration) || !imageLoc) {
        return res.status(400).json({message: "Fields not completed"})
    }

    // check for duplicate account/user
    const dup = await Ability.findOne({name}).lean().exec()

    if (dup) {
        return res.status(409).json({message: "Duplicate Ability"})
    }


    const abilityObj = {name, description, cooldown, manaCost, healthCost, castRange, radius, duration, imageLoc}

    // create and store the hero
    const ability = await Ability.create(abilityObj)

    if (ability) {
        res.status(201).json({message: `New Ability ${name} created`})
    } else {
        res.status(400).json({message: "Invalid Ability Data"})
    }

})

// @desc Update a new Ability
// @route Patch /abilities
// access Private
const updateAbility = asyncHandler(async (req, res) => {
    const {id, name, description, cooldown, manaCost, healthCost, castRange, radius, duration, imageLoc} = req.body
    
    if (!id, !name || !description || !Array.isArray(cooldown) || !Array.isArray(manaCost) || !Array.isArray(healthCost)
        || !Array.isArray(castRange) || !Array.isArray(radius) || !Array.isArray(duration) || !imageLoc) {
        return res.status(400).json({message: "Fields not Completed."})
    }

    const ability = await Ability.findById(id).exec();
    console.log("ID: ", id, " | ", ability);

    if (!ability) {
        return res.status(400).json({message: "Ability not Found."})
    }

    const dup = await Ability.findOne({name}).lean().exec()

    if (dup && dup?._id.toString() !== id) {
        return res.status(409).json({message: "Duplicate ability"});
    }


    ability.name = name;
    ability.description = description;
    ability.cooldown = cooldown;
    ability.manaCost = manaCost;
    ability.healthCost = healthCost;
    ability.castRange = castRange;
    ability.radius = radius;
    ability.duration = duration;
    ability.imageLoc = imageLoc;

    const updatedAbility = await ability.save();
    res.json({message: `${updatedAbility.name} updated`})

})


// @desc Delete an ability
// @route Delete /abilities
// access Private
const deleteAbility = asyncHandler(async (req, res) => {
    const {id} = req.body;

    if (!id) {
        return res.status(400).json({message: "Fields not Completed."})
    }

    const ability = await Ability.findById(id).exec();
    
    if (!ability) {
        return res.status(400).json({message: "Ability Not Found."})
    }

    const name = ability.name;


    const result = await ability.deleteOne();
    const reply = `Ability - ${name} with ID ${id} deleted`;

    res.json(reply);

})

module.exports = {
    getAllAbilities,
    createAbility,
    updateAbility,
    deleteAbility,
    getSingularAbility
}