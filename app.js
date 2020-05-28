//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
require("./src/db/mongoose.js");
const userRouter = require("./src/routers/user.js")
const blogRouter = require("./src/routers/blog.js")
const recipeRouter = require("./src/routers/recipe.js")


const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.urlencoded({
  extended: true
}));

app.use(express.static("public"));

//TODO
app.use(blogRouter);
app.use(userRouter);
app.use(recipeRouter);




app.listen(port, function() {
  console.log("Server started on port 3000");
});