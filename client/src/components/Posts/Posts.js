import React from 'react'
import { useSelector } from 'react-redux';

// import useStyles from "./styles";
import Post from './Post/Post'

const Posts = () => {
  const posts = useSelector((state) => state.posts)
  // const classes = useStyles();
  console.log(posts);
  return (
    <>
      <div>Posts</div>
      <Post />
    </>
  );
}

export default Posts