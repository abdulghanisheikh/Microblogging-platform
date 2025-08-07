const mongoose=require('mongoose');
mongoose.connect("mongodb://127.0.0.1:27017/miniproject");

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