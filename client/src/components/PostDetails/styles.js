import { createTheme } from "@mui/material";
import { makeStyles } from "@mui/styles";

const theme = createTheme({
  spacing: 4,
});

export default makeStyles(() => ({
  media: {
    borderRadius: "20px",
    objectFit: "cover",
    width: "100%",
    maxHeight: "600px",
  },
  card: {
    display: "flex",
    width: "100%",
    gap: "20px",
    [theme.breakpoints.down("sm")]: {
      gap: "10px",
      flexDirection: "column",
      justifyContent: "center",
    },
  },
  section: {
    borderRadius: "20px",
    margin: "10px",
    // maxWidth: '250px',
  },
  imageSection: {
    marginLeft: "20px",
  },
  recommendedPosts: {
    display: "flex",
    gap: "20px",
    overflow: "auto",
    "&::-webkit-scrollbar": { height: '3px', WebkitAppearance: "none" },
    "&::-webkit-scrollbar-thumb": {
      borderRadius: 8,
      backgroundColor: "#1976D2",
    },
  },
  loadingPaper: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: "20px",
    borderRadius: "15px",
    height: "39vh",
  },
  commentsOuterContainer: {
    display: "flex",
    flexWrap: "wrap",
    gap: "30px",
    // justifyContent: "space-between",
  },
  commentsInnerContainer: {
    height: "200px",
    padding: "5px",
    overflow: "auto",
    "&::-webkit-scrollbar": { width: "3px", WebkitAppearance: "none" },
    "&::-webkit-scrollbar-thumb": {
      borderRadius: 8,
      backgroundColor: "#1976D2",
    },
  },
}));
