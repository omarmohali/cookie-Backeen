//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const mongoose = require('mongoose');

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(express.static("public"));

mongoose.connect("mongodb://localhost:27017/cookieDBTest", {useNewUrlParser: true});

const blogSchema = {
    title: String,
    content: String
};

const Blog = mongoose.model("Blog", blogSchema);

//TODO

app.route("/blogs")

.get((req, res) => {

    Blog.find((err, blogs) => {

        if (!err) {
            res.send(blogs);
        }
        else {
            res.send(err);
        }

        
    });
})

.post((req, res) => {
    
    var title = req.body.title;
    var content = req.body.title;

    const newBlog = Blog({
        title: title,
        content: content
    });

    newBlog.save((err) => {
        if (!err) {
            res.send("Blog added successfully");
        }
        else {
            res.send(err);
        }
    })
})

.delete((req, res) => {
    Blog.deleteMany((err) => {
        if (!err) {
            res.send("Successfully deleted all blogs");
        }
        else {
            res.send(err);
        }
    });
});



/// operations on specific blog

app.route("/blogs/:blogId")

.get((req, res) => {

    var blogId = req.params.blogId;
    Blog.findOne({_id: blogId}, (err, blog) => {
        if (blog) {
            res.send(blog);
        }
        else {
            res.status(404).send("Blog not found");
        }
    });

})

.put((req, res) => {
    var blogId = req.params.blogId;

    Blog.update(
        {_id: blogId},
        {title: req.body.title, content: req.body.content},
        {overwrite: true},
        (err) => {
            if (!err) {
                res.send("Successfully updated");
            }
            else {
                res.send(err);
            }
        }
    );
})


.patch((req, res) => {
    var blogId = req.params.blogId;

    Blog.update(
        {_id: blogId},
        {$set: req.body},
        (err) => {
            if (!err) {
                res.send("Successfully updated");
            }
            else {
                res.send(err);
            }
        }
    );
})

.delete((req, res) => {

    var blogId = req.params.blogId;
    Blog.deleteOne(
        {_id: blogId},
        (err) => {
            if (!err) {
                res.send("Successfully deleted blog");
            }
            else {
                res.send(err);
            }
        }
    );
});


app.listen(3000, function() {
  console.log("Server started on port 3000");
});