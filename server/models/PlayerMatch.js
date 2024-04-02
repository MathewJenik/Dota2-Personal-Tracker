const mongoose = require('mongoose')
//const AutoIncrement = require('mongoose-sequence')(mongoose)

const playerMatchSchema = new mongoose.Schema({
    Dota_ID: {
        type: Number,
        required: true
    },
    Match_ID: {
        type: Number,
        required: true
    },
    Win: {
        type: Boolean,
        required: true
    },
    Loss: {
        type: Boolean,
        required: true
    },
    Patch: {
        type: Number,
        default: true
    },
    Time_Played: {
        type: Number,
        default: true
    },
    Average_Rank: {
        type: Number,
        required: true
    },
    // Using the dota 2 Hero_ID
    Hero_Played: {
        type: Number,
        required: true
    }

})

module.exports = mongoose.model('PlayerMatch', playerMatchSchema)