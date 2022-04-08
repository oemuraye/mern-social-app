import React from 'react'
import { TextField, Button, Typography, Paper } from "@mui/material";
import FileBase from "react-file-base64";

// import {useStyles} from "./styles";

const Form = () => {
  // const classes = useStyles();
  
  const handleSubmit = (e) => {
        e.preventDefault()
  }

  return (
    <Paper >
      <form>
        <Typography >Creating a Memory</Typography>
        <TextField name="creator" variant="outlined" label="Creator" fullWidth />
        <TextField name="title" variant="outlined" label="title" fullWidth />
        <TextField name="message" variant="outlined" label="message" fullWidth />
        <TextField name="tags" variant="outlined" label="tags" fullWidth />
        <div>
            <FileBase type="file" multiple={false}  />
        </div>
        <Button variant="contained" color="primary" size="large" type="submit" fullWidth>Submit</Button>
            <Button variant="contained" color="secondary" size="small" fullWidth>Clear</Button>
      </form>
    </Paper>
  )
}

export default Form