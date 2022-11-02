import { makeStyles } from "@mui/styles";
import { createTheme } from "@mui/material";
import { deepPurple } from "@mui/material/colors";

const theme = createTheme({})

export default makeStyles(() => ({
  appBar: {
    borderRadius: 15,
    margin: "30px 0",
    display: "flex",
    // flexDirection: "row",
    justifyContent: "space-between",
    gap: '10px',
    alignItems: "center",
    padding: "10px 50px",
    // flexWrap: "wrap",
    [theme.breakpoints.down("sm")]: {
      flexDirection: "column",
      justifyContent: "center",
      padding: "10px",
    },
  },
  heading: {
    color: "rgba(0,183,255, 1)",
    textDecoration: "none",
    fontSize: "2em",
    fontWeight: 300,
  },
  image: {
    marginLeft: "10px",
    marginTop: "5px",
    [theme.breakpoints.down("sm")]: {
      width: "35px",
      height: "35px",
    },
  },
  brandImage: {
    [theme.breakpoints.down("sm")]: {
      width: "170px",
      height: "40px",
    },
  },
  toolbar: {
    display: "flex",
    justifyContent: "flex-end",
    gap: "20px",
    [theme.breakpoints.down("md")]: {
      paddingRight: "0 !important",
      paddingLeft: "0 !important",
    },
  },
  profile: {
    display: "flex",
    justifyContent: "space-around",
    gap: "10px",
    alignItems: "center",
    [theme.breakpoints.down("sm")]: {
      gap: "2px",
      marginTop: "5px",
    },
  },
  logout: {
    marginLeft: "20px",
    [theme.breakpoints.down("sm")]: {
      marginLeft: "0",
      fontSize: "10px !important",
    },
  },
  userName: {
    display: "flex",
    alignItems: "center",
    textAlign: "center",
    [theme.breakpoints.down("sm")]: {
      lineHeight: '1 !important',
      fontSize: "17px !important",
    },
  },
  brandContainer: {
    display: "flex",
    alignItems: "center",
  },
  purple: {
    color: theme.palette.getContrastText(deepPurple[500]),
    backgroundColor: deepPurple[500],
  },
}));
