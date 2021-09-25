const router = require("express").Router();
const Post = require("../models/Post");
const User = require("../models/User");
//create a post
router.post("/", async (req, res) => {
  const newPost = await new Post(req.body);
  try {
    const savedPost = await newPost.save();
    res.status(200).json(savedPost);
  } catch (err) {
    res.status(500).json(err);
  }
});
//update a post
router.put("/:id", async (req, res) => {
  const post = await Post.findById(req.params.id);
  try {
    if (post.userId === req.body.userId) {
      await post.updateOne({ $set: req.body });
      res.status(200).json("post has been updated");
    } else {
      res.status(400).json("you cannot delete this post");
    }
  } catch (err) {
    res.status(500).json(err);
  }
});
//delete a post
router.delete("/:id", async (req, res) => {
  const post = await Post.findById(req.params.id);
  try {
    if (post.userId === req.body.userId) {
      await post.deleteOne();
      res.status(200).json("post has been deleted");
    } else {
      res.status(400).json("you have not the permission to delete this post");
    }
  } catch (err) {
    res.status(500).json(err);
  }
});
//like a post
router.put("/:id/like", async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post.likes.includes(req.body.userId)) {
      await post.updateOne({ $push: { likes: req.body.userId } });
      res.status(200).json("like added succefully");
    } else {
      await post.updateOne({ $pull: { likes: req.body.userId } });
      res.status(200).json("the has been disliked");
    }
  } catch (err) {
    res.status(500).json(err);
  }
});
//get a  post
router.get("/:id", async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    res.status(200).json(post);
  } catch (err) {
    res.status(500).json(err);
  }
});
//get followings posts
router.get("/timeline/all", async (req, res) => {
  const currentUser = await User.findById(req.body.userId);
  try {
    const posts = await Post.find({ userId: currentUser._id });
    const freindPosts = await Promise.all(
      currentUser.following.map((freindid) => Post.find({ userId: freindid }))
    );
    res.json(posts.concat(...freindPosts));
  } catch (err) {
    res.status(500).json(err);
  }
});
module.exports = router;
