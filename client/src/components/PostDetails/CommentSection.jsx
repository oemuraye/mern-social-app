import { useState, useRef } from 'react';
import { Typography, TextField, Button } from "@mui/material";
import { useDispatch } from 'react-redux'

import { commentPost } from '../../actions/posts';
import useStyles from './styles'

const CommentSection = ({ post }) => {
    const user = JSON.parse(localStorage.getItem('profile'));
    const classes = useStyles();
    const dispatch = useDispatch();
    const [comment, setComment] = useState('');
    const [comments, setComments] = useState(post?.post?.comments);
    const commentRef = useRef();

    const handleComment = async () => {
        const newComment = `${user?.result?.name} : ${comment}`;

        const finalComments = await dispatch(commentPost(newComment, post.post._id));

        setComments(finalComments);
        setComment('');

        commentRef.current.scrollIntoView({ behavior: 'smooth' });
    }

    return (
        <div>
            <div><Typography gutterBottom variant="h5">Comments</Typography></div>
            <div className={classes.commentsOuterContainer} >
                <div className={classes.commentsInnerContainer} >
                    {comments.map((comment, index) => (
                        <Typography key={index} gutterBottom variant="subtitle1">
                            <strong>{comment.split(': ')[0]}</strong>
                            {comment.split(':')[1]}
                        </Typography>
                    ))}
                    <div ref={commentRef} ></div>
                </div>
                {user?.result?.name && (
                <div style={{ width: '300px' }}>
                    <Typography gutterBottom variant="h6">Write a Comment</Typography>
                    <TextField fullWidth rows={4} variant="outlined" label="Comment" multiline value={comment} onChange={(e) => setComment(e.target.value)} />
                    <br />
                    <Button style={{ marginTop: '10px' }} fullWidth disabled={!comment.length} color="primary" variant="contained" onClick={handleComment}>
                        Comment
                    </Button>
                </div>
                )}
            </div>
        </div>
    )
}

export default CommentSection;