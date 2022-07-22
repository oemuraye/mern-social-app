import { Container } from "@mui/material";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import Navbar from "./components/Navbar/Navbar";
import Home from "./components/Home/Home";
import Auth from "./components/Auth/Auth";
import PostDetails from "./components/PostDetails/PostDetails";

const App = () => {
  const user = JSON.parse(localStorage.getItem("profile"));

  return (
    <BrowserRouter>
      <Container maxWidth="xl">
        <Routes>
          <Route path="/" element={<Navigate to="/posts" />} />
          <Route path="/posts" element={
              <>
                <Navbar />
                <Home />
              </>
            }
          />
          <Route path="/posts/search" element={
              <>
                <Navbar />
                <Home />
              </>
            }
          />
          <Route path="/posts/:id" element={
              <>
                <Navbar />
                <PostDetails to="/posts" />
              </>
            }
          />
          <Route path="/auth" element={
              !user ? <>
                <Navbar />
                <Auth />
              </> : <Navigate to="/posts" />
            }
          />
        </Routes>
      </Container>
    </BrowserRouter>
  );
}

export default App;
