
import express from "express";
import methodOverride from "method-override";

const app = express();
const port = 5000;

// Configure EJS
app.set("view engine", "ejs");

// Middleware
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));

// In-memory posts
let posts = [
  {
    id: "1",
    title: "Welcome to My Blog",
    content: "This is my first blog post built with Node.js and Express!",
    author: "suman grg",
    date: new Date().toLocaleDateString()
  }
];

// 1. Home page
app.get("/", (req, res) => {
  res.render("index", { posts });
});

// 2.New Post Page
app.get("/posts/new", (req, res) => {
  res.render("create.ejs");
});

// 3. Create a new post
app.post("/posts", (req, res) => {
  const { title, content, author } = req.body;

  // Validate title and content
  if (
    typeof title !== "string" ||
    typeof content !== "string" ||
    title.trim() === "" ||
    content.trim() === ""
  ) {
    return res.status(400).send("Title and content are required.");
  }

  const newPost = {
    id: Date.now().toString(),
    title: title.trim(),
    content: content.trim(),
    author: author?.trim() || "Anonymous",
    date: new Date().toLocaleDateString()
  };

  posts.push(newPost);
  res.redirect("/");
});

// 4. Edit Post Page
app.get("/posts/:id/edit", (req, res) => {
  const post = posts.find((p) => p.id === req.params.id);

  if (!post) {
    return res.status(404).send("Post not found");
  }

  res.render("edit.ejs", { post });
});

// 5. Update a post
app.patch("/posts/:id", (req, res) => {
  const { title, content, author } = req.body;

  if (
    typeof title !== "string" ||
    typeof content !== "string" ||
    title.trim() === "" ||
    content.trim() === ""
  ) {
    return res.status(400).send("Title and content are required.");
  }

  const post = posts.find((p) => p.id === req.params.id);

  if (!post) {
    return res.status(404).send("Post not found");
  }

  post.title = title.trim();
  post.content = content.trim();
  post.author = author?.trim() || "Anonymous";
  post.lastEdited = new Date().toLocaleDateString();

  res.redirect("/");
});

// 6. Delete a post
app.delete("/posts/:id", (req, res) => {
  const postExists = posts.some((p) => p.id === req.params.id);

  if (!postExists) {
    return res.status(404).send("Post not found");
  }

  posts = posts.filter((p) => p.id !== req.params.id);
  res.redirect("/");
});

// Start server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
