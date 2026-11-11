const express = require("express");
const methodOverride = require("method-override");
const app = express();
const PORT = 3000;

// In-memory post list (will reset if the server restarts)
let posts = [
  {
    id: "1",
    title: "Getting Started with Node.js & Express",
    content: "Node.js is a powerful JavaScript runtime built on Chrome's V8 engine, while Express is the gold standard for routing and handling servers inside the Node ecosystem. Together, they make rapid prototyping and building web servers incredibly straightforward.",
    author: "Alex Developer",
    date: new Date().toLocaleDateString()
  },
  {
    id: "2",
    title: "Why EJS is Great for Templating",
    content: "Embedded JavaScript (EJS) allows you to use standard JavaScript syntax to generate dynamic HTML. EJS makes injecting dynamic lists, toggling views, and reusing partial headers or footers effortless.",
    author: "Morgan S.",
    date: new Date().toLocaleDateString()
  }
];

// Configuration
app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));

// 1. GET ALL POSTS (Home page)
app.get("/", (req, res) => {
  res.render("index", { posts });
});


// 4. GET A SPECIFIC POST
app.get("/posts/:id", (req, res) => {
  const post = posts.find(p => p.id === req.params.id);
  if (!post) return res.status(404).send("Post not found");
  res.render("post", { post });
});

// 5. GET EDIT POST FORM
app.get("/posts/:id/edit", (req, res) => {
  const post = posts.find(p => p.id === req.params.id);
  if (!post) return res.status(404).send("Post not found");
  res.render("edit", { post });
});


// 7. DELETE POST (Action)
app.delete("/posts/:id", (req, res) => {
  posts = posts.filter(p => p.id !== req.params.id);
  res.redirect("/");
});

// Start Server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});