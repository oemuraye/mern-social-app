import React from 'react'
import { useSelector } from 'react-redux';
import { Grid, CircularProgress } from "@mui/material";

import useStyles from "./styles";
import Post from './Post/Post'

const Posts = ({ setCurrentId }) => {
    const {posts, isLoading } = useSelector((state) => state.posts)
    const classes = useStyles();

    if (!posts.length && !isLoading) return 'No Posts found'

    return (
        isLoading ? <CircularProgress /> : (
            <Grid className={classes.container} container alignItems="stretch" spacing={3}>
                {posts.map((post) => (
                <Grid key={post._id} item xs={12} sm={12} md={6} lg={3}>
                    <Post post={post} setCurrentId={setCurrentId} />
                </Grid>
                ))}
            </Grid>
        )
    )
}

export default Posts