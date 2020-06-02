//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
require("./src/db/mongoose.js");
const userRouter = require("./src/routers/user.js");
const blogRouter = require("./src/routers/blog.js");
const recipeRouter = require("./src/routers/recipe.js");
const fileRouter = require("./src/routers/file.js");
const feedRouter = require("./src/routers/feed");
const likeRouter = require("./src/routers/like");


const app = express();
const port = process.env.PORT || 3000;

// app.use(bodyParser.urlencoded({
//   extended: true
// }));

app.use(bodyParser.json());

app.use(express.static("public"));

//TODO

// var publicDir = require('path').join(__dirname,'/data/images');
// app.use(express.static(publicDir));

app.use(blogRouter);
app.use(userRouter);
app.use(recipeRouter);
app.use(fileRouter);
app.use(feedRouter);
app.use(likeRouter);




app.listen(port, function() {
  console.log("Server started on port 3000");
});