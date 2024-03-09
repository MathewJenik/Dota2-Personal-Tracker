const mongoose = require('mongoose')
//const AutoIncrement = require('mongoose-sequence')(mongoose)

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    DotaID: {
        type: String,
        required: false
    },
    roles: [{
        type: String,
        default: "User"
    }],
    premium: {
        type: Boolean,
        default: false
    },
    last_sync_time: {
        type: Number,
        default: 0
    },
    active: {
        type: Boolean,
        default: true
    }

})

module.exports = mongoose.model('User', userSchema)