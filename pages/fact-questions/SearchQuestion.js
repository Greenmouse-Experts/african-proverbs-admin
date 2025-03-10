import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import InputBase from "@material-ui/core/InputBase";
import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";
import SearchIcon from "@material-ui/icons/Search";
import ClearIcon from "@material-ui/icons/Clear";
import { SearchByKeyword } from "@/store/actions/factQuestionAction";

const useStyles = makeStyles((theme) => ({
  root: {
    padding: "5px 4px",
    display: "flex",
    alignItems: "center",
    width: "100%",
    borderRadius: 15,
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

const SearchQuestion = ({ currentPage, handleSearch }) => {
  const classes = useStyles();
  const [searchVal, setSearchVal] = useState("");

  useEffect(() => {
    const delaySearch = setTimeout(() => {
      if (searchVal) {
        handleSearch(searchVal);
      }
    }, 3000);

    return () => clearTimeout(delaySearch);
  }, [searchVal, handleSearch, currentPage]);

  const handleChange = (event) => {
    setSearchVal(event.target.value);
  };

  const handleClear = () => {
    setSearchVal("");
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (searchVal) {
      handleSearch(searchVal);
    }
  };

  return (
    <Paper
      component="form"
      className={classes.root}
      elevation={3}
      onSubmit={handleSubmit}
    >
      <InputBase
        className={classes.input}
        placeholder="Search"
        inputProps={{ "aria-label": "search" }}
        onChange={(e) => handleChange(e)}
        value={searchVal}
      />
      {searchVal && (
        <IconButton
          onClick={handleClear}
          className={classes.iconButton}
          aria-label="clear"
        >
          <ClearIcon />
        </IconButton>
      )}
      <Divider className={classes.divider} orientation="vertical" />
      <IconButton
        type="submit"
        className={classes.iconButton}
        aria-label="search"
      >
        <SearchIcon />
      </IconButton>
    </Paper>
  );
};

export default SearchQuestion;
