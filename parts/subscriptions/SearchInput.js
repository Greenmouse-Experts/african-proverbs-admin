
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

const SearchProverb = (props) => {
  const classes = useStyles();
  const [search, setSearch] = useState("");
  const dispatch = useDispatch();
  const { handleSearchRef, routeSearch, placeholder, refInput, filterType } =
    props;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!search) {
      return;
    }
    if (!routeSearch) {
      return;
    }
    // dispatch(searchProverbs(search));
    Router.push({ pathname: "/proverbs/search", query: { search: search } });
    //console.log(search);
  };

  const handleChange = (event) => {
    if (event === null) {
      setSearch("");
      handleSearchRef.current("", filterType);
    } else {
      setSearch(event?.target?.value);
      handleSearchRef.current(event?.target?.value, filterType);
    }
  };

  return (
    <Paper component="form" onSubmit={handleSubmit} className={classes.root}>
      <InputBase
        className={classes.input}
        placeholder={placeholder ? placeholder : "Search Proverb"}
        inputProps={{ "aria-label": "search google maps" }}
        onChange={(val) => handleChange(val)}
        value={search}
        ref={refInput}
      />
      {search && (
        <IconButton
          onClick={() => handleChange(null)}
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
export default SearchProverb;
