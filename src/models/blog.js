const mongoose = require("mongoose");

const blogSchema = {
    title: String,
    content: String
};

const Blog = mongoose.model("Blog", blogSchema);

module.exports = Blog;
