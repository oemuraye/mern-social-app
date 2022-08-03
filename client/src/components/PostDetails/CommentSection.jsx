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
    const [comments, setComments] = useState([1,2,3,4]);

    const handleComment = (e) => {
        const newComment = `${user?.result?.name} : ${comment}`;

        dispatch(commentPost(newComment, post.id));
    }

    return (
        <div>
            <div className={classes.commentsOuterContainer} >
                <div className={classes.commentsInnerContainer} >
                    <Typography gutterBottom variant="h6">Comments</Typography>
                    {comments.map((comment, index) => (
                        <Typography key={index} gutterBottom variant="subtitle1">comment {index}</Typography>
                    ))}
                </div>
                {user?.result?.name && (
                <div style={{ width: '70%' }}>
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