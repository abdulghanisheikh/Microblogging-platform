const mongoose=require('mongoose');
require("dotenv").config();
mongoose.connect(process.env.MONGO_URI);

const userSchema=mongoose.Schema({
    name:String,
    username:String,
    age:Number,
    password:String,
    email:String,
    profilePic:{
        type:String,
        default:"defaulProfile.jpg"
    },
    post:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"post"
    }]
});

module.exports=mongoose.model('user',userSchema);