import mongoose from 'mongoose';
import PostMessage from '../models/postMessages.js'

export const getPost = async (req, res) => {
  const { id } = req.params;
  try {
    const post = await PostMessage.findById(id);
    res.status(200).json(post);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
}

export const getPosts = async (req, res) => {
  const { page } = req.query
  try {
    const LIMIT = 10;
    const startIndex = (Number(page) - 1) * LIMIT // get the starting index on every page. Also Number(***) is use to convert page number to number because it was formated to string from the frontend
    const total = await PostMessage.countDocuments({})


    const posts = await PostMessage.find()
      .sort({ _id: -1 })
      .limit(LIMIT)
      .skip(startIndex);

      res.status(200).json({
        data: posts,
        currentPage: Number(page),
        numberOfPages: Math.ceil(total / LIMIT),
      });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const getPostsBySearch = async (req, res) => {
  const { searchQuery, tags } = req.query;

  try {
    const title = new RegExp(searchQuery, 'i'); // i is for case insensitive. This converts the searchQuery to a regular expression
   
    const posts = await PostMessage.find({ $or: [ { title }, { tags: { $in: tags.split(',')} } ]}); // $or is for OR. This will find any post that matches the title or tags
    
    res.status(200).json({data: posts});
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
}

export const createPost = async (req, res) => {
  const post = req.body
    
  const newPost = new PostMessage({ ...post, creator: req.userId, createdAt: new Date().toISOString() })

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
  const index = post.likes.findIndex((id) => id === String(req.userId));
  // if (post.likes.includes(req.userId)) {
  //   return res.json({ message: "You have already liked this post" });
  // }  //alternative function


  if (index === -1) {
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

export const commentPost = async (req, res) => {
  const { id } = req.params;
  const { value } = req.body;

  const post = await PostMessage.findById(id);

  post.comments.push(value);

  const updatedPost = await PostMessage.findByIdAndUpdate(id, post, {new: true});

  res.json(updatedPost);
}