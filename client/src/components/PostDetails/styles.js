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
    flexWrap: "wrap",
  },
  section: {
    borderRadius: "20px",
    margin: "10px",
    // flex: 1,
    maxWidth: '250px',
  },
  imageSection: {
    marginLeft: "20px",
    
  },
  recommendedPosts: {
    display: "flex",
    overflow: 'auto',
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
    flexWrap: 'wrap',
    gap: "30px",
    // justifyContent: "space-between",
  },
  commentsInnerContainer: {
    height: "200px",
    overflowY: "auto",
    marginRight: "30px",
  },
}));
