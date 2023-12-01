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

const homeStartingContent = "Lacus vel facilisis volutpat est velit egestas dui id ornare. Semper auctor neque vitae tempus quam. Sit amet cursus sit amet dictum sit amet justo. Viverra tellus in hac habitasse. Imperdiet proin fermentum leo vel orci porta. Donec ultrices tincidunt arcu non sodales neque sodales ut. Mattis molestie a iaculis at erat pellentesque adipiscing. Magnis dis parturient montes nascetur ridiculus mus mauris vitae ultricies. Adipiscing elit ut aliquam purus sit amet luctus venenatis lectus. Ultrices vitae auctor eu augue ut lectus arcu bibendum at. Odio euismod lacinia at quis risus sed vulputate odio ut. Cursus mattis molestie a iaculis at erat pellentesque adipiscing.";
const aboutContent = "Hac habitasse platea dictumst vestibulum rhoncus est pellentesque. Dictumst vestibulum rhoncus est pellentesque elit ullamcorper. Non diam phasellus vestibulum lorem sed. Platea dictumst quisque sagittis purus sit. Egestas sed sed risus pretium quam vulputate dignissim suspendisse. Mauris in aliquam sem fringilla. Semper risus in hendrerit gravida rutrum quisque non tellus orci. Amet massa vitae tortor condimentum lacinia quis vel eros. Enim ut tellus elementum sagittis vitae. Mauris ultrices eros in cursus turpis massa tincidunt dui.";
const contactContent = "Scelerisque eleifend donec pretium vulputate sapien. Rhoncus urna neque viverra justo nec ultrices. Arcu dui vivamus arcu felis bibendum. Consectetur adipiscing elit duis tristique. Risus viverra adipiscing at in tellus integer feugiat. Sapien nec sagittis aliquam malesuada bibendum arcu vitae. Consequat interdum varius sit amet mattis. Iaculis nunc sed augue lacus. Interdum posuere lorem ipsum dolor sit amet consectetur adipiscing elit. Pulvinar elementum integer enim neque. Ultrices gravida dictum fusce ut placerat orci nulla. Mauris in aliquam sem fringilla ut morbi tincidunt. Tortor posuere ac ut consequat semper viverra nam libero.";

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));
app.use(express.json());

app.get("/",  (req,res)=>{

  Post.find({}).then(list=>{
    res.render("home",{data:homeStartingContent,posts:list});
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
  res.render("about",{data:aboutContent});
});

app.get("/contact",(req,res)=>{
  res.render("contact",{data:contactContent});
});

app.get("/compose",(req,res)=>{
  res.render("compose", {});
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
