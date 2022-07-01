import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Container, AppBar, Typography, Grow, Grid } from "@mui/material";

import { getPosts } from "./actions/posts";
import useStyles from './styles';
import Posts from './components/Posts/Posts'
import Form from './components/Form/Form'
import memories from './images/memories.png'

function App() {
  const classes = useStyles()
  const dispatch = useDispatch()
  const [currentId, setCurrentId] = useState(null)

  useEffect(() => {
    dispatch(getPosts())
  }, [dispatch])
  
  return (
    <Container maxWidth="lg">
      <AppBar className={classes.appBar} position="static" color="inherit" sx={{ flexDirection: 'row', }}>
        <Typography className={classes.heading} variant="h2" align="center">Moments</Typography>
        <img className={classes.image} src={memories} alt="memories" height="60" />
      </AppBar>

      <Grow in>
        <Container>
          <Grid container justify="space-between" alignItems="stretch" spacing={3} direction={{xs: 'column-reverse', md: 'row'}} >
            <Grid item xs={12} sm={7} >
              <Posts setCurrentId={setCurrentId} />
            </Grid>
            <Grid item xs={12} sm={4} >
              <Form currentId={currentId} setCurrentId={setCurrentId} />
            </Grid>
          </Grid>
        </Container>
      </Grow>
    </Container>
  );
}

export default App;
