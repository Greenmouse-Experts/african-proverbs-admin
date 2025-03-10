import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import InputBase from "@material-ui/core/InputBase";
import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";
import SearchIcon from "@material-ui/icons/Search";
import ClearIcon from "@material-ui/icons/Clear";
import { useDispatch } from "react-redux";
import Router from "next/router";
import { alertMessage } from "@/store/actions/authActions";

const useStyles = makeStyles((theme) => ({
  root: {
    padding: "5px 4px",
    display: "flex",
    alignItems: "center",
    width: "100%",
    borderRadius: 15,
    [theme.breakpoints.down("sm")]: {
      width: "auto",
    },
    [theme.breakpoints.up("md")]: {
      width: "100%",
    },
    [theme.breakpoints.up("lg")]: {
      width: "100%",
    },
  },
  input: {
    marginLeft: theme.spacing(1),
    flex: 1,
  },
  iconButton: {
    padding: 10,
  },
  divider: {
    height: 28,
    margin: 4,
  },
}));

const SearchSubscribers = () => {
  const classes = useStyles();
  const [search, setSearch] = useState("");
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!search) {
      alertMessage("search by name, email, phone", "FAILURE");
      return;
    }
    // dispatch(searchProverbs(search));
    Router.push({ pathname: "/subscribers/search", query: { search: search } });
  };

  return (
    <Paper component="form" onSubmit={handleSubmit} className={classes.root}>
      <InputBase
        className={classes.input}
        placeholder="Search Subscribers"
        inputProps={{ "aria-label": "search google maps" }}
        onChange={(val) => setSearch(val.target.value)}
        value={search}
      />
      {search && (
        <IconButton
          onClick={() => setSearch("")}
          className={classes.iconButton}
          aria-label="search"
        >
          <ClearIcon />
        </IconButton>
      )}
      <Divider className={classes.divider} orientation="vertical" />
      <IconButton
        color="#69f0ae"
        type="submit"
        className={classes.iconButton}
        aria-label="directions"
      >
        <SearchIcon />
      </IconButton>
    </Paper>
  );
};
export default SearchSubscribers;
