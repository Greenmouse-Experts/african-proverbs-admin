import { makeStyles } from "@material-ui/core/styles";

export const generalSalesStyles = makeStyles((theme) => ({
  root: {
    width: "90%",
    margin: "auto",
  },
  container: {
    maxHeight: 440,
  },
  noData: {
    width: "100%",
    height: "30vh",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
}));
