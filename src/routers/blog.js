const express = require("express");
const Blog = require("./../models/blog.js");


const blogRouter = express.Router();

blogRouter.get("/blogs", (req, res) => {

    Blog.find((err, blogs) => {

        if (!err) {
            res.send(blogs);
        }
        else {
            res.send(err);
        }        
    });
})

blogRouter.post("/blogs", (req, res) => {
    
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


blogRouter.delete("/blogs", (req, res) => {
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
blogRouter.get("/blogs/:blogId", (req, res) => {

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

blogRouter.put("/blogs/:blogId",(req, res) => {
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


blogRouter.patch("/blogs/:blogId",(req, res) => {
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

blogRouter.delete("/blogs/:blogId",(req, res) => {

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

module.exports = blogRouter;