import { useEffect, useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { AppBar, Avatar, Button, Toolbar, Typography } from "@mui/material";
import decode from 'jwt-decode'

import useStyles from "./styles";
import memories from "../../images/memories.png";
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
        <div className={classes.brandContainer}>
            <Typography component={Link} to="/"  className={classes.heading} variant="h2" align="center">Moments</Typography>
            <img className={classes.image} src={memories} alt="memories" height="60" />
        </div>
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