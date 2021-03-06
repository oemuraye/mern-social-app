import { makeStyles } from '@mui/styles'
// import { createTheme } from "@mui/material";

// const theme = createTheme({
//   mainContainer: {
//       flexDirection: "column-reverse"
//     }
// });

export default makeStyles(() => ({
  appBar: {
    borderRadius: 15,
    margin: "30px 0",
    justifyContent: "center",
    alignItems: "center",
  },
  heading: {
    color: "rgba(0,183,255, 1)",
  },
  image: {
    marginLeft: "15px",
  },

  // [theme.breakpoints.down('sm')]: {
  //   mainContainer: {
  //     flexDirection: "column-reverse"
  //   }
  // }
}));