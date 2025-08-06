const express=require('express');
const app=express();
const jwt=require('jsonwebtoken');
const bcrypt=require('bcrypt');
const path=require('path');
const cookieParser=require('cookie-parser');
const userModel=require('./models/user');
const postModel=require('./models/post');

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.set("view engine","ejs");
app.use(express.static(path.join(__dirname,'public')));

app.get("/",function(req,res){
    res.render("index");
});

app.get("/create",function(req,res){
    res.render("create");
});

app.post("/register",async function(req,res){
    const {name,username,email,age,password}=req.body;
    if(name===""||username===""||email===""||age===""||password==="") return res.status(500).send("All fields are mandatory");
    let user=await userModel.findOne({username:username});
    if(user) return res.status(500).send("User already registered");
    bcrypt.genSalt(10,function(err,salt){
        bcrypt.hash(password,salt,async function(err,hash){
            let createdUser=await userModel.create({
                name,
                username,
                age,
                email,
                password:hash
            });
            res.redirect("/login");
        });
    });
});

app.get("/login",function(req,res){
    res.render("login");
});

//protected route
app.get("/profile",isLoggedIn,async function(req,res){
    let user=await userModel.findOne({email:req.user.email}).populate("post");
    res.render("profile",{user});
});

app.post("/login",async function(req,res){
    const {email,password}=req.body;
    if(email===""||password==="") res.status(500).send("Email or password is missing");
    const user=await userModel.findOne({email});
    if(!user) return res.status(500).send("something is wrong");
    bcrypt.compare(password,user.password,function(err,result){
        if(!result) return res.status(500).send("something is wrong");
        let token=jwt.sign({email:user.email,id:user._id},"secretKey");
        res.cookie("token",token);
        res.redirect("/profile");
    });
});

app.get("/logout",function(req,res){
    res.cookie("token","");
    res.redirect("/login");
});

//middleware
function isLoggedIn(req,res,next){
    if(req.cookies.token==="") return res.redirect("/login");
    else{
        let data=jwt.verify(req.cookies.token,"secretKey");
        req.user=data;
        next();
    }
}

app.post("/post",isLoggedIn,async function(req,res){
    const {content}=req.body;
    if(content!==""){
        let user=await userModel.findOne({email:req.user.email});
        let post=await postModel.create({
            user:user._id,
            content
        });
        user.post.push(post._id);
        await user.save();
    }
    res.redirect("/profile");
});

app.get("/like/:id",isLoggedIn,async function(req,res){
    let likedPost=await postModel.findOne({_id:req.params.id}).populate("user");
    if(likedPost.like.indexOf(req.user.id)===-1){
        likedPost.like.push(req.user.id);
    }
    else{
        likedPost.like.splice(likedPost.like.indexOf(req.user.id),1);
    }
    await likedPost.save();
    res.redirect("/profile");
});

app.get("/delete/:id",isLoggedIn,async function(req,res){
    let user=await userModel.findOne({_id:req.user.id});
    let deletedPost=await postModel.findOneAndDelete({_id:req.params.id});
    user.post.splice(user.post.indexOf(deletedPost._id),1);
    user.save();
    res.redirect("/profile");
});

app.listen(3000);