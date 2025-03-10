import { makeStyles } from "@material-ui/core/styles";
import { blue, blueGrey, grey } from "@material-ui/core/colors";

export const subscriptionStyles = makeStyles((theme) => ({
  wrapper: {
    marginBottom: theme.spacing(2),
    overflow: "hidden",
    minHeight: "75vh",
    [theme.breakpoints.down("sm")]: {
      minHeight: "100vh",
      height: "1020px",
    },
  },
  container: {
    maxHeight: "57vh",
    [theme.breakpoints.down("sm")]: { maxHeight: "1000px" },
  },
  loaing: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
}));

export const headerStyles = makeStyles((theme) => ({
  headerText: {
    fontWeight: 600,
    [theme.breakpoints.down("sm")]: {
      fontSize: 12,
    },
  },
}));

export const toolBarStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.primary.contrastText,
    "&:hover": {
      backgroundColor: theme.palette.primary.dark,
    },
  },

  toolbar: {
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(1),
  },
  searchFieldDiv: {
    minWidth: "22rem",
    maxWidth: "24rem",
    [theme.breakpoints.down("sm")]: {
      minWidth: "11rem",
    },
  },
  searchFieldBox: {
    //width: "100%",
    marginLeft: "1.5rem",
    height: "50px",
    display: "flex",
    alignItems: "center",
    [theme.breakpoints.down("sm")]: {
      marginLeft: "0px",
    },
  },
  filterBtn: {
    fontWeight: "700",
    minWidth: "6rem",
    textTransform: "none",
  },
  selectedToolbar: {
    backgroundColor: theme.palette.primary.main,
    // Add any additional styles for selected state here
  },
  datePickerBox: {
    zIndex: 4,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  datePickerWrapper: {
    //zIndex: 9999,
  },
  datePickerInputBox: {
    //width: "13rem",
    width: "100%",
    display: "flex",
    flexDirection: "column",
    //marginRight: "1rem",
  },
  datePickerInputBox2: {
    width: "100%",
    display: "flex",
    flexDirection: "column",
    //marginRight: "1rem",
  },
  datePickerInput: {
    fontSize: 15,
    fontWeight: 400,
    height: "36px",
    textTransform: "none",
    textAlign: "left",
    justifyContent: "flex-start",
    width: "100%",
    borderRadius: "5px",
    border: "1px solid #bbb",
    color: "gray",
    paddingLeft: "10px",
    "&:hover": {
      border: "1.6px solid #3a3a3a",
      background: "white",
    },
  },
  divider: {
    height: "2px",
    width: "1rem",
    background: "grey",
    marginRight: "0.6rem",
    marginLeft: "0.6rem",
  },
  cancelButton: {
    marginTop: theme.spacing(2),
    marginRight: theme.spacing(2),
    width: "7rem",
    height: "2.2rem",
    textTransform: "none",
    color: "white",
    background: "darkgray",
    "&:hover": {
      background: "gray",
    },
  },
  submitButton: {
    marginTop: theme.spacing(2),
    marginLeft: theme.spacing(2),
    width: "7rem",
    height: "2.2rem",
    textTransform: "none",
    color: "white",
    background: "darkblue",
    "&:hover": {
      background: "#000028",
    },
  },
  closeButton: {
    position: "absolute",
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[500],
  },
  rootTitle: {
    margin: 0,
    padding: theme.spacing(2),
  },
}));
