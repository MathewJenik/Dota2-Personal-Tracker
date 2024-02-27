const mongoose = require('mongoose')

const abilitySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    cooldown: [{
        type: Number,
        default: 10
    }],
    manaCost: [{
        type:Number,
        default: 10
    }],
    healthCost: [{
        type: Number,
        default: 10
    }],
    castRange: [{
        type: Number,
        default: 10
    }],
    radius: [{
        type: Number,
        default: 10
    }],
    duration: [{
        type: Number,
        default: 10
    }],
    imageLoc: {
        type: String,
        required: true
    }

})
module.exports = mongoose.model('Ability', abilitySchema)
