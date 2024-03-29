const mongoose = require('mongoose')
//const AutoIncrement = require('mongoose-sequence')(mongoose)

const userVerificationSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    verificationToken: {
        type: String,
        required: true
    }

})

module.exports = mongoose.model('UserVerification', userVerificationSchema)