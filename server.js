const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();
const PORT = 3000;

app.use(express.json());
app.use(express.static('public'));

const BLOG_FILE = 'blogs.json';

// Helper function to read the blog file
const readBlogs = () => {
    if (!fs.existsSync(BLOG_FILE)) {
        return [];
    }
    const data = fs.readFileSync(BLOG_FILE);
    return JSON.parse(data);
};

// Helper function to sanitize inputs - security feature
const sanitizeInput = (input) => {
    return input.replace(/<[^>]*>?/gm, ''); // Remove HTML
};

// Route to get all blog posts
app.get('/api/posts', (req, res) => {
    const blogs = readBlogs();
    res.json({ data: blogs });
});

// Route to get a single blog post by ID
app.get('/api/posts/:id', (req, res) => {
    const blogs = readBlogs();
    const blog = blogs.find(blog => blog.id === parseInt(req.params.id));
    if (!blog) {
        return res.status(400).json({ message: 'Blog post not found' });
    }
    res.json({ data: blog });
});

// Route to get comments for a blog post by ID
app.get('/api/posts/:id/comments', (req, res) => {
    const blogs = readBlogs();
    const blog = blogs.find(blog => blog.id === parseInt(req.params.id));
    if (!blog) {
        return res.status(400).json({ message: 'Blog post not found' });
    }
    res.json({ data: blog.comments || [] });
});

// Route to get blog posts by tag name
app.get('/api/tags/:name', (req, res) => {
    const blogs = readBlogs();
    const taggedBlogs = blogs.filter(blog => blog.tags && blog.tags.includes(req.params.name));
    res.json({ data: taggedBlogs });
});

// Catch-all route to serve index.html for all other routes
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
