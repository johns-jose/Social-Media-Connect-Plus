 const mongoose = require('mongoose')
const connectdb= async()=>{
    mongoose.connect('mongodb://localhost:27017/socialMedia',{
        useNewUrlParser:true,
        },(err,data)=>{    
         if(err){
           console.log("Db Error");
         }else{
           console.log('Db Connected...');
         }
        });
}
// mongodb+srv://johnsjose:<password>@cluster0.8mlxql0.mongodb.net/?retryWrites=true&w=majority

module.exports={connectdb}
    