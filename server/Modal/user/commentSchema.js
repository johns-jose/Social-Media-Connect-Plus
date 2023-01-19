const mongoose = require('mongoose')
const User = require('./UserSchema')
const Comment = mongoose.Schema({
    postId:{
        type:String,
    },
    userId:{
        type:String,
        ref:User
    },
    commentDesc:{
        type:String,
        require:true,
        max:500
    },
    likes:{
        type:Array,
        default:[]
    },
},
{timestamps:true}
)

 module.exports = mongoose.model('comment',Comment)