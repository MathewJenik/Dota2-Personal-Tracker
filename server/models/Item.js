const mongoose = require('mongoose')

const itemSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    cost: {
        type: Number,
        required: true
    },
    alterations: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    upgradePath: [{
        type: String,
        default: "None"
    }],
    predecessorPath: [{
        type: String,
        default: "None"
    }],
    imageLoc: {
        type: String,
        required: true
    },
    active: {
        type: Boolean,
        default: true
    }
})

module.exports = mongoose.model('Item', itemSchema)