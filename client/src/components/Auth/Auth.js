import { useState } from "react";
import { useDispatch } from 'react-redux'
import { useNavigate } from "react-router-dom";
import { Avatar, Button, Paper, Grid, Typography, Container } from "@mui/material";
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { GoogleLogin } from 'react-google-login'


import Icon from './Icon';
import Input from './Input'
import useStyles from './styles'
import { AUTH } from "../../constants/actionTypes";
import { signin, signup } from "../../actions/auth";

const initialState = { firstName: '', lastName: '', email: '', password: '' };
const Auth = () => {
  const classes = useStyles();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [showPassword, setShowPassword] = useState(false);
  const [isSignup, setIsSignup] = useState(false)
  const [formData, setFormData] = useState(initialState);

  const handleShowPassword = () => setShowPassword((prevShowPassword) => !prevShowPassword);

  
  const handleChange = (e) => {
    e.preventDefault();
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }

  const handleSubmit = (e) => {
    e.preventDefault();

    if (isSignup) {
      dispatch(signup(formData, navigate));
    } else {
      dispatch(signin(formData, navigate));
    }
  }

  const switchMode = () => { 
    setIsSignup((prevIsSignup) => !prevIsSignup) 
    handleShowPassword(false);
  }

  const googleSuccess = async (res) => {
    const result = res?.profileObj;
    const token = res?.tokenId;

    try {
      dispatch({ type: AUTH, data: { result, token } });

      navigate('/')
    } catch (error) {
      console.log(error);
    }

  }

  const googleFailure = () => alert('Google Sign In was unsuccessful. Try again later')

  return (
    <Container component="main" maxWidth="xs">
      <Paper className={classes.paper} elevation={6}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">{ isSignup ? 'Sign up' : 'Sign in' }</Typography>
        <form className={classes.form} onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            { isSignup && (
              <>
                <Input name="firstName" label="First Name" handleChange={handleChange} autoFocus half />
                <Input name="lastName" label="Last Name" handleChange={handleChange} half />
              </>
            )}
            <Input name="email" label="Email Address" handleChange={handleChange} type="email" />
            <Input name="password" label="Password" handleChange={handleChange} type={showPassword ? 'text' : 'password'} handleShowPassword={handleShowPassword} />
            { isSignup && <Input name="confirmPassword" label="Repeat Password" handleChange={handleChange} type="password" /> }  
          </Grid>
          <Button type="submit" fullWidth variant="contained" color="primary" className={classes.submit}>
            { isSignup ? 'Sign Up' : 'Sign In' }
          </Button>
          <GoogleLogin 
              clientId="460594701709-n1aoci1i8hknpg7m9v5jeahqj3iaurht.apps.googleusercontent.com"
              render={(renderProps) => (
                  <Button className={classes.googleButton} color="primary" fullWidth onClick={renderProps.onClick} disabled={renderProps.disabled} startIcon={<Icon />} variant="contained">
                      Google Sign In
                  </Button>
              )}
              onSuccess={googleSuccess}
              onFailure={googleFailure}
              cookiePolicy="single_host_origin"
          />
          <Grid container justify="flex-end">
            <Grid item>
              <Button onClick={switchMode}>
                { isSignup ? 'Already have an account? Sign in' : "Don't have an account? Sign Up" }
              </Button>
            </Grid>
          </Grid>
        </form>
      </Paper>
    </Container>
  );
};

export default Auth;