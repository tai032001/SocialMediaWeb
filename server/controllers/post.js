import Post from "../models/Post.js";
import User from "../models/User.js";

export const createPost = async (req, res) => {
  try {
    const { userId, description, picturePath } = req.body;
    const user = await User.findById(userId);
    const newPost = new Post({
      userId,
      firstName: user.firstName,
      lastName: user.lastName,
      location: user.location,
      description,
      picturePath,
      likes: {},
      comments: [],
    });

    await newPost.save();
    const post = await Post.find();
    res.status(201).json(post);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
export const getFeedPosts = async (req, res) => {
  try {
    const posts = await Post.find();
    res.status(201).json(posts);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const getUserPosts = async (req, res) => {
  const { userId } = req.params;
  try {
    const post = await Post.find({ userId });
    res.status(201).json(post);
  } catch (error) {}
};

export const likePosts = async (req, res) => {
  const { id } = req.params;
  const { userId } = req.body;
  try {
    const post = await Post.findById(id);
    const isLiked = post.likes.get(userId);
    if (isLiked) {
      post.likes.delete(userId);
    } else {
      post.likes.set(userId, true);
    }
    const updatePost = await Post.findOneAndUpdate(
      id,
      { likes: post.likes },
      { new: true }
    );
    res.status(200).json(updatePost);
  } catch (error) {}
};
