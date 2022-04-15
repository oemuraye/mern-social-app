import { createTheme } from '@mui/material';
import { makeStyles } from '@mui/styles'

const theme = createTheme({
  spacing: 4
})

export default makeStyles(() => ({
  root: {
    "& .MuiTextField-root": {
      margin: theme.spacing(1),
    },
  },
  paper: {
    padding: theme.spacing(2),
  },
  form: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "center",
  },
  fileInput: {
    width: "96%",
    margin: "10px 0",
  },
  buttonSubmit: {
    margin: 0,
    marginBottom: 10,
  },
}));