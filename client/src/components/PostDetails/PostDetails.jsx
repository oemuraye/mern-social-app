import moment from 'moment'
import { useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { Paper, Typography, CircularProgress, Divider } from "@mui/material";

import CommentSection from './CommentSection'
import { getPost, getPostsBySearch } from '../../actions/posts'
import useStyles from './styles'

const PostDetails = () => {
  const { post, posts, isLoading } = useSelector((state) => state.posts)
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const classes = useStyles();

  useEffect(() => {
    dispatch(getPost(id));
  }, [id]);

  useEffect(() => {
    if (post) {
      dispatch(getPostsBySearch({ search: 'none', tags: post.post.tags.join(',') }))
    }
  }, [post])

  const openPost = (_id) => navigate(`/posts/${_id}`)

  if (!post) return null;

  if (isLoading) {
    return (
      <Paper elevation={6} className={classes.loadingPaper}>
        <CircularProgress size="7em" />
      </Paper>
    )
  }

  const recommendedPosts = posts.filter(({ _id }) => _id !== post.post._id)
  // console.log(posts);

  return (
    <Paper style={{ padding: '20px', borderRadius: '15px' }} elevation={6}>
      <div className={classes.card}>
        <div className={classes.section}>
          <Typography variant="h3" component="h2">{post.post.title}</Typography>
          <Typography gutterBottom variant="h6" color="textSecondary" component="h2">{post.post.tags.map((tag) => `#${tag} `)}</Typography>
          <Typography gutterBottom variant="body1" component="p">{post.post.message}</Typography>
          <Divider style={{ margin: '20px 0' }} />
          <Typography variant="h6"> Created by: {post.post.name} </Typography>
          <Typography variant="body2">{moment(post.post.createdAt).fromNow()}</Typography>
          {/* <Typography variant="body1"><strong>Realtime Chat - coming soon!</strong></Typography> */}
        </div>
        <div className={classes.imageSection}>
          <img className={classes.media} src={post.post.selectedFile || 'https://user-images.githubusercontent.com/194400/49531010-48dad180-f8b1-11e8-8d89-1e61320e1d82.png'} alt={post.title} />
        </div>
      </div>
      <Divider style={{ margin: '20px 0' }} />
      <CommentSection post={post} />
      <Divider style={{ margin: '20px 0' }} />
      {recommendedPosts.length && (
        <div className={classes.section} >
          <Typography gutterBottom variant="h5">You might also like: </Typography>
          <Divider />
          <div className={classes.recommendedPosts}>
            {recommendedPosts.map(({ title, name, tags, message, likes, selectedFile, _id }) => (
              <div style={{ margin: '5px', cursor: 'pointer' }} onClick={() => openPost(_id)} key={_id}>
                <Typography gutterBottom variant="h6">{title}</Typography>
                <Typography gutterBottom variant="subtitle2">{tags.map((tag) => `#${tag} `)}</Typography>
                <Typography gutterBottom variant="subtitle2">{name}</Typography>
                <Typography gutterBottom variant="subtitle2">{message}</Typography>
                <Typography gutterBottom variant="subtitle1">Likes: {likes.length}</Typography>
                <img src={selectedFile} alt={title} width="175px" height="175px" style={{ borderRadius: '10px', }} />
              </div>
            ))}
          </div>
        </div>
      )}
    </Paper>
  )
}

export default PostDetails