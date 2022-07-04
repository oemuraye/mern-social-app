import { Container } from "@mui/material";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar/Navbar";
import Home from "./components/Home/Home";
import Auth from "./components/Auth/Auth";

function App() {
  return (
    <BrowserRouter>
      <Container maxWidth="lg">
        <Routes>
          <Route path="/" exact element={
            <>
              <Navbar />
              <Home />
            </>
          } />
          <Route path="/auth" exact element={
            <>
              <Navbar />
              <Auth />
            </>
          } />
        </Routes>
      </Container>
    </BrowserRouter>
  );
}

export default App;
