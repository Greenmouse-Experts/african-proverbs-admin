import { makeStyles } from "@material-ui/core/styles";
import { blue, blueGrey, grey } from "@material-ui/core/colors";

export const useStyles = makeStyles((theme) => ({
  menuButton: {
    marginRight: theme.spacing(2),
  },

  root: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    //minHeight: "70vh",
    paddingBottom: "51px",
  },
  container: {
    width: "100%",
    //margin: "auto",
    display: "flex",
  },
  sectionOne: {
    width: "50%",
    [theme.breakpoints.down("md")]: {
      width: "75% !important",
    },
    [theme.breakpoints.down("sm")]: {
      width: "100% !important",
    },
  },
  textWidth: {
    minWidth: "50% !important",
    // [theme.breakpoints.down("md")]: {
    //   width: "75% !important",
    // },
    [theme.breakpoints.down("sm")]: {
      minWidth: "75% !important",
    },
  },
  paperForm: {
    padding: theme.spacing(3),
    maxWidth: 400,
    paddingBottom: "5rem",
  },
  paperBoxOne: {
    display: "flex",
    alignItems: "center",
    padding: "15px",
    width: "100%",
    borderRadius: "0px",
    borderBottom: "1px solid lightgray",
  },
  paperBoxTwo: {
    display: "flex",
    alignItems: "center",
    padding: "15px",
    width: "100%",
    background: "whitesmoke",
    borderRadius: "0px",
  },
  textField: {
    marginBottom: theme.spacing(2),
  },
  submitButton: {
    marginTop: theme.spacing(2),
    width: "50%",
    margin: "auto",
    textTransform: "none",
    color: "white",
    background: "midnightblue",
    "&:hover": {
      background: "#000028",
    },
  },
  focused: {
    color: grey[800],
    height: "2.5rem",
    "&.Mui-focused": {
      //border: `1px solid ${grey[800]} !important`,
      "& .MuiOutlinedInput-notchedOutline": {
        border: `2px solid ${grey[800]}`,
      },
    },
  },
  disabled: {
    "&.Mui-disabled": {
      "&.MuiInputBase-input": { color: "black" },
    },
  },
  datePickerWrapper: {
    //width: "100%",
    //height: "100% !important",
  },
  datePickerInput: {
    //width: "100%",
    borderRadius: "5px",
    border: "1px solid #bbb",
    height: "40px",
    fontSize: 15,
    color: "#091510",
    fontWeight: 500,
    paddingLeft: "10px",
    "&:hover": {
      border: "1.6px solid #3a3a3a",
    },
  },
  boxMargin: {
    marginBottom: theme.spacing(2),
  },
  selectOption: {
    height: "2.5rem",
    color: "black",
    "&.Mui-focused": {
      "& .MuiOutlinedInput-notchedOutline": {
        border: `2px solid ${grey[800]}`,
      },
    },
  },
  switchForm: {
    margin: "0 0 0 1px",
  },
  switchTitle: {
    fontSize: 15,
    color: "#091510",
    fontWeight: 500,
  },
  switchInput: {
    color: `${blueGrey} !important`,
  },
  switchText: {
    fontSize: 14,
    color: "#091510",
    fontWeight: 500,
    //minWidth: "50%",
  },
  switchRoot: {
    width: "60%",
    justifyContent: "space-between",
    [theme.breakpoints.down("sm")]: {
      width: "90%",
    },
  },
  sectionTwo: {
    background: "whitesmoke",
    width: "50%",
    [theme.breakpoints.down("sm")]: {
      display: "none !important",
    },
  },
  leftPaper: {
    width: "100%",
    paddingTop: "4rem",
    background: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  profileBox: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  },
  imageBox: {
    width: "11rem",
    height: "11rem",
    borderRadius: "50%",
    background: "darkgray",
    padding: "2rem",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "11rem",
    color: "gainsboro",
  },
}));
