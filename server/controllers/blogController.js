// controllers/blogController.js
const Blog = require("../models/Blog");

exports.getAllBlogs = async (req, res) => {
    try {
        const blogs = await Blog.find().sort({ createdAt: -1 });
        res.json(blogs);
    } catch (error) {
        res.status(500).json({ message: "Error fetching blogs" });
    }
};

exports.getBlogById = async (req, res) => {
    try {
        const blog = await Blog.findById(req.params.id);
        if (!blog) return res.status(404).json({ message: "Blog not found" });
        res.json(blog);
    } catch (error) {
        res.status(500).json({ message: "Error fetching blog" });
    }
};

exports.createBlog = async (req, res) => {
    const { title, author, content, image } = req.body;
    try {
        const newBlog = new Blog({ title, author, content, image });
        await newBlog.save();
        res.status(201).json(newBlog);
    } catch (error) {
        console.error("Create blog error:", error);
        res.status(500).json({ message: "Error creating blog" });
    }
};

exports.updateBlog = async (req, res) => {
    try {
        const updatedBlog = await Blog.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
        });
        res.json(updatedBlog);
    } catch (error) {
        res.status(500).json({ message: "Error updating blog" });
    }
};

exports.deleteBlog = async (req, res) => {
    try {
        await Blog.findByIdAndDelete(req.params.id);
        res.json({ message: "Blog deleted" });
    } catch (error) {
        res.status(500).json({ message: "Error deleting blog" });
    }
};
// exports.getBlogsByAuthor = async (req, res) => {
//     try {
//         const blogs = await Blog.find({ author: req.params.author }).sort({ createdAt: -1 });
//         res.json(blogs);
//     } catch (error) {
//         res.status(500).json({ message: "Error fetching blogs by author" });
//     }
// };
