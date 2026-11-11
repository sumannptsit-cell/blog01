const express = require("express");
const methodOverride = require("method-override");
const app = express();
const PORT = 3000;


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