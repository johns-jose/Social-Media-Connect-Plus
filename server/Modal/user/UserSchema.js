const mongoose = require('mongoose')

const userschema= mongoose.Schema({
    // _id: {
    //     type: mongoose.Schema.Types.ObjectId,
    // },
    userName:{
        type:String,
        required:[true,'name is required']
    },
    email:{
        type:String,
        required:[true,'Email is required']
    },
    phone:{
        type:String,
        required:[true,'phone is required']
    },
    password:{
        type:String,
        required:[true,'password is required']
    },
    date:{
        type:Date,
        default:Date.now
    },
    profilePic:{
        type:String,
        default:false
    },
    coverPic:{
        type:String,
        default:false
    },
    city:{
        type:String,
        max:50
    },
    from:{
        type:String,
        max:50
    },
    desc:{
        type:String,
        max:50
    },
    relationship:{
        type:Number,
        enum:[1,2,3]
    },
    followers:{
        type:Array,
        default:[]
    },
    following:{
        type:Array,
        default:[]
    },
    isAdmin:{
        type:Boolean,
        default:false
    }, 
    suggession:{
        type:Boolean,
        default:false
    },
},
{timestamps:true}
)
const usermodel=mongoose.model('user',userschema)
module.exports = usermodel