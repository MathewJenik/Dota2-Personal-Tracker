const mongoose = require('mongoose')

const heroSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    primaryAttribute: {
        type: String,
        required: true
    },
    imageLoc: {
        type: String,
        required: true
    },
    abilities: [{
        type: String
    }],
})

module.exports = mongoose.model('Hero', heroSchema)