const mongoose = require('mongoose')

const playerSchema = new mongoose.Schema({
    Account_ID: {
        type: Number,
        required: true
    },
    Username: {
        type: String,
        required: true
    },
    Rank: {
        type: Number,
        required: true
    },
    Exposed: {
        type: Boolean,
        required: true
    }
})

module.exports = mongoose.model('Player', playerSchema)