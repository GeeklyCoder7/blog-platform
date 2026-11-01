const express = require("express");

const app = express();
app.use(express.json());

const static_blogs = [
  {
    id: 1,
    title: "Science",
    content: "Science blog content!",
  },
  {
    id: 2,
    title: "Commerce",
    content: "Commerce blog content!",
  },
  {
    id: 3,
    title: "Arts",
    content: "Arts blog content!",
  },
];

// {{{{{{{{{{{{{{{{{{{{{{{{{{{ MIDDLEWARES }}}}}}}}}}}}}}}}}}}}}}}}}}}

// Testing route
app.get("/", (req, res) => {
  res.send("Hello World!");
});

// Get all posts
app.get("/api/posts/", (req, res) => {
  res.json({
    data: static_blogs,
  });
});

// Get one single post
app.get("/api/posts/:id/", (req, res) => {
  const id = Number(req.params.id);

  const requested_blog = static_blogs.find((blog) => blog.id === id);

  if (requested_blog == null) {
    return res.status(404).json({
      success: false,
      message: "Blog not found!",
    });
  }

  res.json({
    status: 200,
    success: true,
    data: requested_blog,
  });
});

// Add new blog
app.post("/api/posts/", (req, res) => {
  // Extracting the values from the request
  const { title, content } = req.body;

  const newBlogId = static_blogs.at(-1).id + 1;

  const newBlog = {
    id: newBlogId,
    title,
    content,
  };

  static_blogs.push(newBlog);
});

app.listen(3000, () => {
  console.log("Server running on http://localhost:3000");
});
