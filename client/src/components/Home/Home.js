import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Container, Grow, Grid, Paper, AppBar, TextField, Button, Chip } from "@mui/material";
import { useNavigate, useLocation } from "react-router-dom";

import Pagination from '../Pagination/Pagination';
import Posts from "../Posts/Posts";
import Form from "../Form/Form";
import { getPosts } from "../../actions/posts";
import useStyles from "./styles";

const useQuery = () => {
  return new URLSearchParams(useLocation().search);
}

const Home = () => {
  const classes = useStyles();
  const navigate = useNavigate();
  const query = useQuery(); 
  const dispatch = useDispatch();
  const [currentId, setCurrentId] = useState(0);
  const page = query.get("page") || 1;
  const [search, setSearch] = useState("");
  const [tags, setTags] = useState([]);


  useEffect(() => {
    dispatch(getPosts());
  }, [dispatch]);

  const handleKeyPress = (e) => {
    if (e.keyCode === 13) { //KeyCode 13 is the Enter key
      // search post
    }
  }

  const handleAddChip = (tag) => {}
  const handleDeleteChip = (chipToDelete) => {}
  
  return (
    <Grow in>
      <Container maxWidth="xl">
        <Grid container justify="space-between" alignItems="stretch" spacing={3} direction={{ xs: "column-reverse", md: "row" }} className={classes.gridContanier}>
          <Grid item xs={12} sm={6} md={9}>
            <Posts setCurrentId={setCurrentId} />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <AppBar className={classes.appBarSearch} position="static" color="inherit">
              <TextField 
                name="search"
                variant="outlined"
                label="Search Memories"
                fullWidth
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                onKeyPress={handleKeyPress}
              />
              <Chip 
                style={{ margin: "10px 0" }}
                value={tags}
                variant="outlined"
                label="Search Tags"
                onAdd={(chip) => handleAddChip(chip)}
                onDelete={(chip) => handleDeleteChip(chip)}
              />
            </AppBar>
            <Form currentId={currentId} setCurrentId={setCurrentId} />
            <Paper  elevation={6}>
              <Pagination />
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </Grow>
  );
};

export default Home;
