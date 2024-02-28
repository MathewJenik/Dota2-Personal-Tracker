const Hero = require('../models/Hero')

const asyncHandler = require('express-async-handler')

// @desc Get all Heroes
// @route Get /heroes
// access Private
const getAllHeroes = asyncHandler(async (req, res) => {

    const heroes = await Hero.find().select().lean()
    if (!heroes?.length) {
        return res.status(400).json({message: "No Heroes Found."})
    } else {
        res.json(heroes)
    }

})

// @desc Get a singular Hero
// @route Get /hero/:{id}
// @access Private
const getSingularHero  = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const hero = await Hero.findOne({_id: id}).lean().exec();

    if (!hero) {
        return res.status(404).json({message: "Hero not found"})
    }
    res.json(hero);
    
})

// @desc Create a new Hero
// @route Post /heroes
// access Private
const createHero = asyncHandler(async (req, res) => {
    const {name, description, primaryAttribute, imageLoc, abilities} = req.body
    
    if (!name || !description || !primaryAttribute || !imageLoc || !Array.isArray(abilities)) {
        return res.status(400).json({message: "Fields not completed"})
    }

    // check for duplicate account/user
    const dup = await Hero.findOne({name}).lean().exec()

    if (dup) {
        return res.status(409).json({message: "Duplicate Hero"})
    }


    const heroObj = {name, description, primaryAttribute, imageLoc, abilities}

    // create and store the hero
    const hero = await Hero.create(heroObj)

    if (hero) {
        res.status(201).json({message: `New Hero ${name} created`})
    } else {
        res.status(400).json({message: "Invalid Hero Data"})
    }

})

// @desc Update a hero
// @route Patch /heroes
// access Private
const updateHero = asyncHandler(async (req, res) => {
    // getting data
    const {id, name, description, primaryAttribute, imageLoc, abilities} = req.body;
    console.log(abilities)
    // confirm data
    if (!id || !description || !name || !primaryAttribute || !imageLoc || !Array.isArray(abilities)) {
        return res.status(400).json({message: "All fields are required"});
    }

    const hero = await Hero.findById(id).exec();
    
    if (!hero) {
        return res.status(400).json({message: "Hero not found"});
    }
    
    // check for a duplicate user
    
    const dup = await Hero.findOne({name}).lean().exec();
    
    // allow updates to original, checking for same id
    if (dup && dup?._id.toString() !== id) {
        return res.status(409).json({message: "Duplicate Username."});
    }
    
    hero.name = name;
    hero.description = description;
    hero.primaryAttribute = primaryAttribute;
    hero.imageLoc = imageLoc;
    hero.abilities = JSON.stringify(abilities);
    
    console.log("HERO ABILITIES:" ,hero.abilities)
    const updatedHero = await hero.save();
    console.log(updatedHero)
    res.json({message: `${updatedHero.name} updated`})
    
})

// @desc Delete a hero
// @route Delete /heroes
// access Private
const deleteHero = asyncHandler(async (req, res) => {

    const { id } = req.body;

    if (!id) {
        return res.status(400).json({message: "Hero ID is required"});
    }

    // check for any match data regarding this Hero and remove them.

    const hero = await Hero.findById(id).exec();
    const name = hero.name;

    if (!hero) {
        return res.status(400).json({message: 'Hero Not Found'});
    }

    const result = await hero.deleteOne();
    const reply = `Hero - ${name} with ID ${id} deleted`;

    res.json(reply);

})


module.exports = {
    getAllHeroes,
    createHero,
    updateHero,
    deleteHero,
    getSingularHero
}