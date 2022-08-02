import express from "express";
import auth from "../middleware/auth.js";
import { getPost, getPosts, getPostsBySearch, createPost, updatePost, deletePost, likePost } from "../controllers/posts.js";

const router = express.Router();

router.get('/', getPosts)
router.get('/search', getPostsBySearch)
router.get('/:id', getPost)
router.post('/', auth, createPost)
router.patch('/:id', auth, updatePost)
router.delete("/:id", auth, deletePost);
router.patch("/:id/likePost", auth, likePost);

export default router