import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Container, Grow, Grid, Paper, AppBar, TextField, Button, Chip, Autocomplete } from "@mui/material";
import { useNavigate, useLocation } from "react-router-dom";
// import ChipIneput from "material-ui-chip-input";

import Pagination from '../Pagination/Pagination';
import Posts from "../Posts/Posts";
import Form from "../Form/Form";
import { getPosts, getPostsBySearch } from "../../actions/posts";
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
  const page = query.get('page') || 1;
  const searchQuery = query.get('searchQuery')
  const [search, setSearch] = useState("");
  const [tags, setTags] = useState([]);
  
  
  // useEffect(() => {
  //   dispatch(getPosts());
  // }, [dispatch]);
  
  const searchPost = () => {
    if(search.trim() || tags) {
      dispatch(getPostsBySearch({ search, tags: tags.join(",") })); // tags: tags.join(',') is used to convert the tags array to string
      navigate(`/posts/search?searchQuery=${search || 'none'}&tags=${tags.join(',')}`);
    } else {
      navigate('/');
    }
  }

  const handleKeyPress = (e) => {
    if (e.keyCode === 13) { //KeyCode 13 is the Enter key
      searchPost();
    }
  }
  
  return (
    <Grow in>
      <Container maxWidth="xl">
        <Grid container justify="space-between" alignItems="stretch" spacing={0.5} direction={{ xs: "column-reverse", md: "row" }} className={classes.gridContanier}>
          <Grid item xs={12} sm={6} md={8}>
            <Posts setCurrentId={setCurrentId} />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <AppBar className={classes.appBarSearch} position="static" color="inherit">
              <TextField  name="search" variant="outlined" label="Search Memories" fullWidth value={search}
                onChange={(e) => setSearch(e.target.value)}
                onKeyPress={handleKeyPress}
              />
              <Autocomplete multiple freeSolo id="tags-filled" options={[]}
                onChange={(e, value) => setTags(value)}
                renderTags={(value, getTagProps) => 
                  value.map((option, index) => (
                      <Chip
                        variant="outlined"
                        label={option}
                        {...getTagProps({ index })}
                      />
                  ))}
                style={{ margin: "10px 0" }}
                renderInput={(params) => (
                  <TextField {...params} variant="outlined" label="Search Tags" />
                )}
              />
              <Button onClick={searchPost} className={classes.searchButton} color="primary" variant="contained" >Search</Button>
            </AppBar>
            <Form currentId={currentId} setCurrentId={setCurrentId} />
            {(!searchQuery && !tags.length) && (
              <Paper className={classes.pagination} elevation={6}>
                <Pagination page={page} />
              </Paper>
            )}
          </Grid>
        </Grid>
      </Container>
    </Grow>
  );
};

export default Home;
