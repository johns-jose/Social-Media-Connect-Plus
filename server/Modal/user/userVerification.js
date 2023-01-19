const mongoose = require('mongoose')

const UserVerificationSchema = mongoose.Schema({
    user: {
        type: String
    },
    otp: {
        type: String
    },
    expiry: {
        type: Date
    },

}
   
)

module.exports = mongoose.model('UserVerification', UserVerificationSchema)