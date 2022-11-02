import { makeStyles } from '@mui/styles'
import { createTheme } from "@mui/material";

const theme = createTheme();

export default makeStyles(() => ({
  mainSection: {
    [theme.breakpoints.down('sm')]: {
        paddingLeft: "0px !important",
        paddingRight: "0px !important",
    }  
  }
}));