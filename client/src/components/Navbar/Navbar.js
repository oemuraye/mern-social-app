import { useEffect, useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { AppBar, Avatar, Button, Toolbar, Typography } from "@mui/material";
import decode from 'jwt-decode'

import useStyles from "./styles";
import memoriesLogo from "../../images/memories-Logo.png";
import memoriesText from "../../images/memories-Text.png";
import { useDispatch } from 'react-redux';

const Navbar = () => {
    const classes = useStyles()
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const location = useLocation()
    const [ user, setUser ] = useState(JSON.parse(localStorage.getItem('profile')))

    const logout = () => {
      dispatch({ type: 'LOGOUT' })

      navigate('/')
      setUser(null)
    }
    useEffect(() => {
      const token = user?.token;
      
      // logout user if token is expired
      if (token) {
        const decodedToken = decode(token)

        if (decodedToken.exp * 1000 < new Date().getTime()) logout();
      }

      // change the user name in the navbar when the user is logged in
      setUser(JSON.parse(localStorage.getItem('profile')))
    }, [location])

    return (
      <AppBar className={classes.appBar} position="static" color="inherit" sx={{ flexDirection: 'row', }}>
        <Link to="/" className={classes.brandContainer}>
            <img src={memoriesText} alt="icon" height="45px" />
            <img className={classes.image} src={memoriesLogo} alt="memories" height="49px" />
        </Link>
        <Toolbar className={classes.toolbar}>
        {user?.result ? (
          <div className={classes.profile}>
            {/* <Avatar className={classes.purple} alt={user?.result.name} src={user?.result.imageUrl}></Avatar> */}
            <Avatar className={classes.purple} alt={user?.result.name} src={user?.result.imageUrl}>{user?.result.name.charAt(0)}</Avatar>
            <Typography className={classes.userName} variant="h6">{user?.result.name}</Typography>
            <Button variant="contained" className={classes.logout} color="secondary" onClick={logout}>Logout</Button>
          </div>
        ) : (
          <Button component={Link} to="/auth" variant="contained" color="primary">Sign In</Button>
        )}
      </Toolbar>
    </AppBar>
  )
}

export default Navbar