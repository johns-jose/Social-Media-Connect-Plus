const mongoose = require('mongoose')
const User = require('./UserSchema')
const postSchema= mongoose.Schema({
    desc:{
        type:String,
        required:true
    },
    userId:{
        type:String,
        required:true,
        ref:User 
    },
    image:{
        type:String,
    },
    video:{
        type:String,
        
    },
 
    likes:{
        type:Array,
        default:[]
    },
    report:{
        type:Array,
        default:[]
    },
    status:{
        type:String,
       
    }
    
    
 },
{timestamps:true}

)
const postmodel=mongoose.model('post',postSchema)
module.exports = postmodel