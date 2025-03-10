import { makeStyles } from "@material-ui/core/styles";
import { grey } from "@material-ui/core/colors";

export const dialogStyles = makeStyles((theme) => ({
  content: {
    "& .react-datepicker": {
      zIndex: "10 !important",
    },
  },
  textField: {
    height: "36px",
    width: "100%",
  },
  selectOption: {
    width: "14rem",
    height: "36px",
    color: "black",
    "&.Mui-focused": {
      "& .MuiOutlinedInput-notchedOutline": {
        border: `1px solid ${grey[800]}`,
      },
    },
  },
  focused: {
    color: grey[800],
    height: "2.5rem",
    "&.Mui-focused": {
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
  datePickerInputBtn: {
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
  datePickerPopper: {
    zIndex: "10 !important",
    background: "white !important",
  },
  datePickerBox: {
    width: "100% !important",
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
