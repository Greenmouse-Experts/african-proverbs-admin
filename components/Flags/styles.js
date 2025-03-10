import { makeStyles } from "@material-ui/core/styles";

export const useStyles = makeStyles((theme) => ({
  error: {
    color: "red",
    fontSize: 11,
  },
  thumbButton: {
    position: "absolute",
    right: 10,
    bottom: 10,
    background: "rgba(0,0,0,.8)",
    color: "#fff",
    border: 0,
    borderRadius: ".325em",
    cursor: "pointer",
  },
  img: {
    display: "block",
    width: "auto",
    height: "100%",
  },
  thumbInner: {
    display: "flex",
    minWidth: 0,
    overflow: "hidden",
  },
  thumb: {
    position: "relative",
    display: "inline-flex",
    borderRadius: 2,
    border: "1px solid #eaeaea",
    marginBottom: 8,
    marginRight: 8,
    width: 100,
    height: 100,
    padding: 4,
    boxSizing: "border-box",
  },
  thumbsContainer: {
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
    marginTop: 16,
    padding: 20,
  },
}));

export const baseStyle = {
  flex: 1,
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  padding: "40px",
  borderWidth: 2,
  borderRadius: 2,
  borderColor: "#6c757d",
  borderStyle: "dashed",
  backgroundColor: "#fff",
  color: "black",
  outline: "none",
  transition: "border .24s ease-in-out",
};

export const activeStyle = {
  borderColor: "#2196f3",
};

export const acceptStyle = {
  borderColor: "#00e676",
};

export const rejectStyle = {
  borderColor: "#ff1744",
};
