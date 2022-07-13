import mongoose from 'mongoose';
import PostMessage from '../models/postMessages.js'

export const getPosts = async (req, res) => {
  try {
    const postMessages = await PostMessage.find()

    res.status(200).json(postMessages)
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const createPost = async (req, res) => {
  const post = req.body
    
  const newPost = new PostMessage(post)

  try {
      await newPost.save()

      res.status(201).json(newPost)
  } catch (error) {
      res.status(404).json({ message: error.message })
  }
}

export const updatePost = async (req, res) => {
  const { id: _id } = req.params
  const post = req.body;

  if (!mongoose.Types.ObjectId.isValid(_id)) return res.status(404).send(`No post with id: ${id}`);

  const updatedPost = await PostMessage.findByIdAndUpdate(_id, post, {
    new: true,
  });

  res.json(updatedPost)
}

export const deletePost = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(404).send('No post with that id');

  await PostMessage.findByIdAndDelete(id);

  res.json({ message: "Post deleted successfully." });
}

export const likePost = async (req, res) => {
  const { id } = req.params;

  if (!req.userId) return res.json({ message: 'You must be logged in to like a posts' });

  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(404).send("No post with that id");
    
  // Get the post you want
  const post = await PostMessage.findById(id);

  // Check if the user has already liked the post

  // if (post.likes.includes(req.userId)) {
  //   return res.json({ message: "You have already liked this post" });
  // }
  const index = post.likes.findIndex(id => id.user.toString() === req.userId);

  if (index !== -1) {
    // like the post i.e push the userId to the likes array
    post.likes.push(req.userId);
  } else {
    // unlike the post i.e remove the userId from the likes array
    post.likes = post.likes.filter((id) => id !== String(req.userId));
  }

  // Make modification and save
  const updatedPost = await PostMessage.findByIdAndUpdate(id, post, {new: true})

  res.json(updatedPost);
}