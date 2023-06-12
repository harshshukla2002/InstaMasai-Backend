const express = require("express");
const { PostModel } = require("../Model/Posts.model");
const { Auth } = require("../Middleware/Auth");

const PostRoutes = express.Router();

PostRoutes.get("/", Auth, async (req, res) => {
  const { sort, userID } = req.query;
  try {
    const posts = await PostModel.find({ userID }).sort({
      no_of_comments: sort === "high" ? -1 : 1,
    });
    res.status(200).json(posts);
  } catch (error) {
    res.status(200).json({ error });
  }
});

PostRoutes.get("/top", Auth, async (req, res) => {
  const { sort, userID } = req.query;
  try {
    const posts = await PostModel.find({ userID }).sort({
      no_of_comments: -1,
    });
    res.status(200).json(posts);
  } catch (error) {
    res.status(200).json({ error });
  }
});

PostRoutes.post("/add", Auth, async (req, res) => {
  try {
    const posts = await PostModel(req.body);
    await posts.save();
    res.status(200).json({ msg: "Post Added" });
  } catch (error) {
    res.status(200).json({ error });
  }
});

PostRoutes.patch("/update/:id", Auth, async (req, res) => {
  const { id } = req.params;
  try {
    await PostModel.findByIdAndUpdate({ _id: id }, req.body);
    res.status(200).json({ msg: "Post Updated" });
  } catch (error) {
    res.status(200).json({ error });
  }
});

PostRoutes.delete("/delete/:id", Auth, async (req, res) => {
  const { id } = req.params;
  try {
    await PostModel.findByIdAndDelete({ _id: id });
    res.status(200).json({ msg: "Post Deleted" });
  } catch (error) {
    res.status(200).json({ error });
  }
});

module.exports = { PostRoutes };
