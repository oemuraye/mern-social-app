import moment from 'moment'
import { useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { Paper, Typography, CircularProgress, Divider } from "@mui/material";

import { getPost } from '../../actions/posts'
import useStyles from './styles'

const PostDetails = () => {
  const { post, posts, isLoading } = useSelector(state => state.posts)
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const classes = useStyles();

  useEffect(() => {
    dispatch(getPost(id));
  }, [id]);


  if (!post) return null;

  if (isLoading) {
    return (
      <Paper elevation={6} className={classes.loadingPaper}>
        <CircularProgress size="7em" />
      </Paper>
    )
  }

  return (
    <Paper style={{ padding: '20px', borderRadius: '15px' }} elevation={6}>
      <div className={classes.card}>
        <div className={classes.section}>
          <Typography variant="h3" component="h2">{post.post.title}</Typography>
          <Typography gutterBottom variant="h6" color="textSecondary" component="h2">{post.post.tags}</Typography>
          <Typography gutterBottom variant="body1" component="p">{post.post.message}</Typography>
          <Typography variant="h6"> Created by: {post.post.name} </Typography>
          <Typography variant="body1">{moment(post.post.createdAt).fromNow()}</Typography>
          <Divider style={{ margin: '20px 0' }} />
          <Typography variant="body1"><strong>Realtime Chat - coming soon!</strong></Typography>
          <Divider style={{ margin: '20px 0' }} />
          <Typography variant="body1"><strong>Comments - coming soon!</strong></Typography>
          {/* <CommentSection post={post} /> */}
          <Divider style={{ margin: '20px 0' }} />
        </div>
        <div className={classes.imageSection}>
          <img className={classes.media} src={post.post.selectedFile || 'https://user-images.githubusercontent.com/194400/49531010-48dad180-f8b1-11e8-8d89-1e61320e1d82.png'} alt={post.title} />
        </div>
      </div>
      
    </Paper>
  )
}

export default PostDetails