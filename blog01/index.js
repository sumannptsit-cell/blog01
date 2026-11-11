import express from "express";
import bodyParser from "body-parser";
import methodOverride from "method-override";

const app = express();
const port = 5000;

// Middleware
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(methodOverride("_method"));

// In-memory posts array (defined at the top level so all routes can access it)
let posts = [
  {
    id: "1",
    title: "Welcome to My Blog",
    content: "This is my first blog post built with Node.js and Express!",
    author: "suman grg"
  }
];

// 1. Home Route: Display all posts
app.get("/", (req, res) => {
  res.render("index.ejs", { posts: posts });
});

// 2. New Post Page
app.get("/new", (req, res) => {
  res.render("post.ejs", { post: null });
});

// 3. Create a New Post
app.post("/posts", (req, res) => {
  const newPost = {
    id: Date.now().toString(),
    title: req.body.title,
    content: req.body.content,
    author: req.body.author || "Anonymous"
  };
  posts.push(newPost);
  res.redirect("/");
});

// 4. View a Single Post / Edit Page
app.get("/posts/:id/edit", (req, res) => {
  const post = posts.find((p) => p.id === req.params.id);
  if (!post) return res.redirect("/");
  res.render("post.ejs", { post: post });
});

// 5. Update a Post
app.patch("/posts/:id", (req, res) => {
  const post = posts.find((p) => p.id === req.params.id);
  if (post) {
    post.title = req.body.title || post.title;
    post.content = req.body.content || post.content;
  }
  res.redirect("/");
});

// 6. Delete a Post
app.delete("/posts/:id", (req, res) => {
  posts = posts.filter((p) => p.id !== req.params.id);
  res.redirect("/");
});

// Start Server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});