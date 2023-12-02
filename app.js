const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const _ = require('lodash');
const mongoose = require("mongoose");

mongoose.connect("mongodb+srv://annasfurquan27:mPK3WGmFvQh2F4JX@cluster0.jtkod08.mongodb.net/blogDB");

const postSchema = new mongoose.Schema({
  title:String,
  kebab:String,
  post:String,
});

const Post = new mongoose.model("Post",postSchema);

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));
app.use(express.json());

app.get("/",  (req,res)=>{

  Post.find({}).then(list=>{
    res.render("home",{posts:list});
  }).catch(e=>console.log(e));
});

app.post("/", (req,res)=>{
  Post.deleteOne({_id:req.body.delp}).then((response) => {
    console.log(response);
    res.send({"status":"success"});
  }).catch(e=>console.log(e));
  res.redirect("/");
});

app.get("/posts/:postName",(req,res)=>{

  let id = req.params.postName;
  Post.find({_id:req.params.postName}).then(list=> {
    res.render("post",{title:list[0].title,data:list[0].post});
  }).catch(e=>console.log(e));
});

app.get("/about",(req,res)=>{
  res.render("about");
});

app.get("/contact",(req,res)=>{
  res.render("contact");
});

app.get("/compose",(req,res)=>{
  res.render("compose");
});

app.post("/compose", (req,res)=>{
  var post = new Post({
    title:req.body.title,
    kebab:_.kebabCase(req.body.title),
    post:req.body.post,
  });
  post.save();
  res.redirect("/");
});

app.listen(process.env.PORT || 3000, function() {
  console.log("Server started on port 3000");
});
