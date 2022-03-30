import { Container, AppBar, Typography, Grow, Grid } from "@mui/material";
import './App.css';

import memories from './images/memories.png'

function App() {
  return (
    <Container maxWidth="lg">
      <AppBar position="static" color="inhert">
        <Typography variant="h2" align="center">Hey</Typography>
        <img src={memories} alt="memories" heigth="60" />
      </AppBar>

    </Container>
  );
}

export default App;
