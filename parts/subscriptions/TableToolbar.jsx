import React, { useEffect, useState } from "react";
import { alpha } from "@material-ui/core/styles";
import {
  Box,
  Toolbar,
  Typography,
  IconButton,
  Tooltip,
  Button,
  Snackbar,
} from "@material-ui/core";
import SortIcon from "@material-ui/icons/Sort";
import DeleteIcon from "@material-ui/icons/Delete";
import FilterListIcon from "@material-ui/icons/FilterList";
import { Divider, Menu, MenuItem } from "@material-ui/core/";
import { months } from "./utils";
import { formatDate2, invalidDate } from "@/utils/utilities";
import SearchInput from "@/parts/subscriptions/SearchInput";
import DatePicker from "react-datepicker";
import { debounce } from "lodash";
import { useRef } from "react";
import { fetchSubscriptionList } from "@/services/subscriptionList";
import moment from "moment";
import { toolBarStyles } from "./styles";
import MuiDialogTitle from "@material-ui/core/DialogTitle";
import CloseIcon from "@material-ui/icons/Close";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
} from "@material-ui/core";
import { useClickOutside } from "./useClickOutside";
import MuiAlert from "@material-ui/lab/Alert";

const EnhancedTableToolbar = (props) => {
  const {
    numSelected,
    handleRequestSort,
    order,
    setfilterVal,
    filterSubData,
    setSubscriptionsList,
    setPage,
    setRowsPerPage,
  } = props;

  const [anchorElFilter, setAnchorElFilter] = useState(null);
  const [startDate, setStartDate] = useState(null);
  const [startDateFrom, setStartDateFrom] = useState(null);
  const [startDateTo, setStartDateTo] = useState(null);
  const [endDateFrom, setEndDateFrom] = useState(null);
  const [endDateTo, setEndDateTo] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [filterType, setFilterType] = useState("Search By Subscribers");
  const [dateTypeVal, setDateTypeVal] = useState("");
  const [openAlert, setOpenAlert] = useState(false);
  const [alertMsg, setAlertMsg] = useState("");
  const classes = toolBarStyles();
  const refInput = useRef();
  const dateRef = useRef();

  const handleOpenDialog = () => {
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  const handleOpenFilterMenu = (event) => {
    setAnchorElFilter(event.currentTarget);
  };

  const handleCloseFilterMenu = () => {
    setAnchorElFilter(null);
  };
  const handleFilter = (endDate) => {
    if (endDate.name === "No Filter") {
      setfilterVal("none");
      setEndDateName("All Subscribers");
    } else {
      setfilterVal(endDate.abbr);
      setEndDateName(endDate.name);
    }
    handleCloseFilterMenu();
  };
  const handleSearchRef = useRef(
    debounce(async (eventVal, type) => {
      //console.log(type);
      if (eventVal === "") {
        const searchResult = await fetchSubscriptionList({
          page: 1,
          rowsPerPage: 10,
        });
        const actualData = filterSubData(searchResult?.data?.content, {
          page: 1,
          rowsPerPage: 10,
          size: searchResult?.data?.size,
        });
        //console.log(searchResult);
      } else {
        if (type === "Search By Subscribers") {
          const searchResult = await fetchSubscriptionList({
            //page: 1,
            name: eventVal,
          });
          const actualData = filterSubData(searchResult?.data?.content);
        }
        if (type === "Search  By Type") {
          const searchResult = await fetchSubscriptionList({
            //page: 1,
            type: eventVal,
          });
          const actualData = filterSubData(searchResult?.data?.content);
        }
        //console.log(actualData);
      }
    }, 500),
  );
  const saveDateChanges = useRef(
    debounce(async (dateVal, dateType) => {
      _setDateType(dateVal, dateType);
    }, 300),
  );

  const handleDateChange = (data, dateType) => {
    if (data === null) {
      //setStartDate(new Date());
      _setDateType((data = new Date()), dateType);
    }
    if (data?.type === "change") {
      const parseDate = new Date(Date.parse(data?.target?.value));
      if (parseDate !== "Invalid Date") {
        if (!isNaN(parseDate.getTime())) {
          saveDateChanges.current(parseDate, dateType);
        } else {
          //setStartDate(new Date());
          _setDateType((data = new Date()), dateType);
        }
      }
    } else {
      if (data instanceof Date) {
        _setDateType(data, dateType);
      }
    }
  };



  const sendRequest = async () => {
    if (dateTypeVal === "start") {
      if (invalidDate(startDateFrom) || invalidDate(startDateTo)) {
        setAlertMsg(`Both date fields must be selected`);
        setTimeout(() => {
          setOpenAlert(true);
        }, 100);
        return;
      }
      if (startDateFrom > startDateTo) {
        //alert(`startDateFrom is greater`);

        setAlertMsg(`The first date field should be earlier`);
        setTimeout(() => {
          setOpenAlert(true);
        }, 100);
        return;
      }
      const searchResult = await fetchSubscriptionList({
        startDateFrom: formatDate2(startDateFrom),
        startDateTo: formatDate2(startDateTo),
      });
      const actualData = filterSubData(searchResult?.data?.content, {
        // page: 1,
        // rowsPerPage: 10,
        size: searchResult?.data?.size,
      });
    }
    if (dateTypeVal === "end") {
      if (invalidDate(endDateFrom) || invalidDate(endDateTo)) {
        //alert(`${invalidDate(endDateFrom)} endDateFrom`);
        setAlertMsg(`Both date fields must be selected`);
        setTimeout(() => {
          setOpenAlert(true);
        }, 100);
        return;
      }
      if (endDateFrom > endDateTo) {
        //alert(`endDateFrom is greater`);
        setAlertMsg(`The first date field should be earlier`);
        setTimeout(() => {
          setOpenAlert(true);
        }, 100);
        return;
      }
      const searchResult = await fetchSubscriptionList({
        endDateFrom: formatDate2(endDateFrom),
        endDateTo: formatDate2(endDateTo),
      });
      const actualData = filterSubData(searchResult?.data?.content, {
        // page: 1,
        // rowsPerPage: 10,
        size: searchResult?.data?.size,
      });
    }
    return;
  };

  const _setDateType = (data, type) => {
    //console.log(type);
    if (type === "startFrom") {
      setStartDateFrom(data);
    }
    if (type === "startTo") {
      setStartDateTo(data);
    }
    if (type === "endFrom") {
      setEndDateFrom(data);
    }
    if (type === "endTo") {
      setEndDateTo(data);
    }
  };

  useEffect(() => {
    console.log(filterType);
    if (filterType === "clear") {
      //console.log(filterType);
      const sendRequest = async () => {
        const getData = await fetchSubscriptionList({
          page: 1,
          rowsPerPage: 10,
        });
        filterSubData(getData?.data?.content, {
          size: getData?.data?.size,
        });
        setFilterType("");
      };
      sendRequest();
    }
  }, [filterType]);

  const handleCloseAlert = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpenAlert(false);
  };
  return (
    <Toolbar
      style={{
        height: "5rem",
      }}
    >
      {numSelected > 0 ? (
        <Typography
          style={{ flex: "1 1 100%" }}
          color="inherit"
          variant="subtitle1"
          component="div"
        >
          {numSelected} selected
        </Typography>
      ) : (
        <Box style={{ flexGrow: 1, marginRight: "12px" }}>
          <Tooltip title="Filter Subscriptions">
            <Button
              onClick={handleOpenFilterMenu}
              variant="outlined"
              className={[classes.filterBtn]}
              endIcon={<SortIcon />}
            >
              Filter
            </Button>
          </Tooltip>
          <Menu
            style={{ marginTop: "45px" }}
            id="menu-appbar"
            anchorEl={anchorElFilter}
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "left",
            }}
            keepMounted
            transformOrigin={{
              vertical: "top",
              horizontal: "left",
            }}
            open={anchorElFilter}
            onClose={handleCloseFilterMenu}
          >
            <MenuItem
              disabled={filterType === "Search By Subscribers"}
              onClick={() => {
                setFilterType("Search By Subscribers");
                handleCloseFilterMenu();
              }}
            >
              Search subscribers
            </MenuItem>
            <MenuItem
              disabled={filterType === "Date"}
              onClick={() => {
                handleOpenDialog();
                handleCloseFilterMenu();
              }}
            >
              Filter By Date
            </MenuItem>
            <MenuItem
              onClick={() => {
                setFilterType("clear");
                handleCloseFilterMenu();
              }}
            >
              Clear filters
            </MenuItem>
          </Menu>
        </Box>
      )}
      {numSelected > 0 ? (
        <Tooltip title="Delete">
          <IconButton>
            <DeleteIcon />
          </IconButton>
        </Tooltip>
      ) : (
        <>
          <Box
            style={{
              display: "flex",
              alignItems: "center",
            }}
          >
            <div className={[classes.searchFieldDiv]}>
              <div className={[classes.searchFieldBox]}>
                <SearchInput
                  placeholder={filterType}
                  smallSize
                  refInput={refInput}
                  filterType={filterType}
                  handleSearchRef={handleSearchRef}
                />
              </div>
            </div>
          </Box>
        </>
      )}
      <FormDialog
        openDialog={openDialog}
        handleOpenDialog={handleOpenDialog}
        handleCloseDialog={handleCloseDialog}
        startDateFrom={startDateFrom}
        startDateTo={startDateTo}
        endDateFrom={endDateFrom}
        endDateTo={endDateTo}
        handleDateChange={handleDateChange}
        dateRef={dateRef}
        dateTypeVal={dateTypeVal}
        setDateTypeVal={setDateTypeVal}
        sendRequest={sendRequest}
      />
      <Snackbar
        anchorOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        open={openAlert}
        autoHideDuration={3000}
        onClose={handleCloseAlert}
      >
        <MuiAlert
          elevation={6}
          variant="filled"
          onClose={handleCloseAlert}
          severity="error"
        >
          {alertMsg}
        </MuiAlert>
      </Snackbar>
    </Toolbar>
  );
};
export default EnhancedTableToolbar;


export const FormDialog = (props) => {
  const {
    openDialog,
    handleOpenDialog,
    handleCloseDialog,
    startDateFrom,
    startDateTo,
    endDateFrom,
    endDateTo,
    handleDateChange,
    dateRef,
    sendRequest,
    dateType,
    dateTypeVal,
    setDateTypeVal,
  } = props;
  const classes = toolBarStyles();
  const [isStartFrom, setIsStartFrom] = useState(false);
  const [isStartTo, setIsStartTo] = useState(false);
  const [isEndFrom, setIsEndFrom] = useState(false);
  const [isEndTo, setIsEndTo] = useState(false);
  // const startFromRef = useClickOutside(() => setIsStartFrom(false));
  // const startToRef = useClickOutside(() => setIsStartTo(false));
  const endFromRef = useClickOutside(() => setIsEndFrom(false));
  const endToRef = useClickOutside(() => setIsEndTo(false));

  const _setDateType = (e, type) => {
    e.preventDefault();
    if (type === "startFrom") {
      setIsStartFrom(!isStartFrom);
    }
    if (type === "startTo") {
      setIsStartTo(!isStartTo);
    }
    if (type === "endFrom") {
      setIsEndFrom(!isEndFrom);
    }
    if (type === "endTo") {
      setIsEndTo(!isEndTo); 
    }
  };

  const renderDate = (dateInput) => {
    const parsedDate = moment(
      dateInput,
      "ddd MMM DD YYYY HH:mm:ss [GMT]ZZ (Z)",
    );

    const outputDate = parsedDate.format("DD-MM-YYYY");
    //console.log(outputDate);
    return outputDate;
  };

  return (
    <div>
      <Dialog
        open={openDialog}
        onClose={handleCloseDialog}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title" onClose={handleCloseDialog}>
          Filter By Date
        </DialogTitle>
        <DialogContent style={{ minHeight: "40vh" }} dividers>
          <DialogContentText>
            To filter properly, please ensure that either of both date fields
            are selected.
          </DialogContentText>
          <Box className={[classes.datePickerBox]}>
            <Box
              style={{
                display: "flex",
                flexDirection: "column",
                width: "95%",
              }}
            >
              <Box
                style={{
                  display: "flex",
                  alignItems: "center",
                  //justifyContent: "center",
                }}
              >
                <Box
                  className={[classes.datePickerInputBox]}
                //ref={startFromRef}
                >
                  <Box
                    style={{
                      textAlign: "left",
                      display: "flex",
                      flexDirection: "column",
                      width: "100%",
                    }}
                  >
                    <Typography variant="subtitle2">
                      Start Date{" "}
                      <span style={{ fontWeight: 300 }}>(Start from)</span>
                    </Typography>
                    <DatePicker
                      selected={startDateFrom}
                      fixedHeight
                      ref={(elem) => (dateRef.current = elem)}
                      dateFormat="dd-MM-yyyy"
                      placeholderText={`Select a Date`}
                      showYearDropdown
                      showMonthDropdown
                      dropdownMode="select"
                      showPopperArrow={false}
                      className={[classes.datePickerInput]}
                      onChange={(date) => {
                        handleDateChange(date, "startFrom");
                        setDateTypeVal("start");
                      }}
                      onChangeRaw={(event) => {
                        handleDateChange(event, "startFrom");
                        setDateTypeVal("start");
                      }}
                    />
                  </Box>
                </Box>
                <Divider className={[classes.divider]} />
                <Box
                  className={[classes.datePickerInputBox]}
                >
                  <Box
                    style={{
                      textAlign: "left",
                      display: "flex",
                      flexDirection: "column",
                      width: "100%",
                    }}
                  >
                    <Typography style={{ fontWeight: 300 }} variant="subtitle2">
                      (Start to)
                    </Typography>
                    <DatePicker
                      selected={startDateTo}
                      fixedHeight
                      ref={(elem) => (dateRef.current = elem)}
                      dateFormat="dd-MM-yyyy"
                      placeholderText={`Select a Date`}
                      showYearDropdown
                      showMonthDropdown
                      dropdownMode="select"
                      showPopperArrow={false}
                      className={[classes.datePickerInput]}
                      onChange={(date) => {
                        handleDateChange(date, "startTo");
                        setDateTypeVal("start");
                      }}
                      onChangeRaw={(event) => {
                        handleDateChange(event, "startTo");
                        setDateTypeVal("start");
                      }}
                    />
                  </Box>
                </Box>
              </Box>
            </Box>
            <Box
              style={{
                display: "flex",
                flexDirection: "column",
                marginTop: "2rem",
                width: "95%",
              }}
            >
              <Box className={[classes.datePickerInputBox2]}>
                <Box
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    width: "100%",
                  }}
                >
                  <Box
                    style={{
                      textAlign: "left",
                      display: "flex",
                      flexDirection: "column",
                      width: "100%",
                    }}
                  >
                    <Typography variant="subtitle2">
                      End Date{" "}
                      <span style={{ fontWeight: 300 }}>(End from)</span>
                    </Typography>
                    <Button
                      className={[classes.datePickerInput]}
                      style={{
                        textTransform: "none",
                        fontSize: 15,
                        fontWeight: 400,
                      }}
                      onClick={(e) => _setDateType(e, "endFrom")}
                    >
                      {endDateFrom ? renderDate(endDateFrom) : "Select a Date"}
                    </Button>
                  </Box>
                  <Divider className={[classes.divider]} />
                  <Box
                    style={{
                      textAlign: "left",
                      display: "flex",
                      flexDirection: "column",
                      width: "100%",
                    }}
                  >
                    <Typography variant="subtitle2" style={{ fontWeight: 300 }}>
                      (End to)
                    </Typography>
                    <Button
                      className={[classes.datePickerInput]}
                      onClick={(e) => _setDateType(e, "endTo")}
                      style={{
                        textTransform: "none",
                        fontSize: 15,
                        fontWeight: 400,
                      }}
                    >
                      {endDateTo ? renderDate(endDateTo) : "Select a Date"}
                    </Button>
                  </Box>
                </Box>
                <Box
                  style={{
                    display: "flex",
                    alignItems: "center",
                    //justifyContent: "space-between",
                    width: "100%",
                    position: "relative",
                  }}
                >
                  {isEndFrom && (
                    <div ref={endFromRef}>
                      <DatePicker
                        selected={endDateFrom}
                        fixedHeight
                        inline
                        ref={(elem) => (dateRef.current = elem)}
                        dateFormat="dd/MM/yyyy"
                        placeholderText={`Select a Date`}
                        //showMonthYearPicker
                        showYearDropdown
                        showMonthDropdown
                        dropdownMode="select"
                        showPopperArrow={false}
                        //wrapperClassName={[classes.datePickerWrapper]}
                        className={[classes.datePickerInput]}
                        onChange={(date) => {
                          handleDateChange(date, "endFrom");
                          setDateTypeVal("end");
                          setIsEndFrom(false);
                        }}
                        onChangeRaw={(event) => {
                          handleDateChange(event, "endFrom");
                          setDateTypeVal("end");
                          setIsEndFrom(false);
                        }}
                      />
                    </div>
                  )}
                  {isEndTo && (
                    <div
                      style={{
                        position: "absolute",
                        right: 0,
                        top: 0,
                      }}
                      ref={endToRef}
                    >
                      <DatePicker
                        selected={endDateTo}
                        fixedHeight
                        inline
                        ref={(elem) => (dateRef.current = elem)}
                        dateFormat="dd/MM/yyyy"
                        placeholderText={`Select a Date`}
                        //showMonthYearPicker
                        showYearDropdown
                        showMonthDropdown
                        dropdownMode="select"
                        showPopperArrow={false}
                        //wrapperClassName={[classes.datePickerWrapper]}
                        className={[classes.datePickerInput]}
                        onChange={(date) => {
                          handleDateChange(date, "endTo");
                          setDateTypeVal("end");
                          setIsEndTo(false);
                        }}
                        onChangeRaw={(event) => {
                          handleDateChange(event, "endTo");
                          setDateTypeVal("end");
                          setIsEndTo(false);
                        }}
                      />
                    </div>
                  )}
                </Box>
              </Box>
              {/* <Box className={[classes.datePickerInputBox]}>
                  <Button
                    className={[classes.datePickerInput]}
                    onClick={(e) => _setDateType(e, "startFrom")}
                  >
                    {endDateTo}
                  </Button>
                  {isEndDateTo && (
                    <DatePicker
                      selected={endDateTo}
                      fixedHeight
                      ref={(elem) => (dateRef.current = elem)}
                      dateFormat="dd/MM/yyyy"
                      placeholderText={`Select a Date`}
                      //showMonthYearPicker
                      showYearDropdown
                      showMonthDropdown
                      dropdownMode="select"
                      showPopperArrow={false}
                      //wrapperClassName={[classes.datePickerWrapper]}
                      className={[classes.datePickerInput]}
                      onChange={(date) => handleDateChange(date, "endTo")}
                      onChangeRaw={(event) => handleDateChange(event, "endTo")}
                    />
                  )}
                </Box> */}
            </Box>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button
            variant="contained"
            onClick={handleCloseDialog}
            className={classes.cancelButton}
            style={{
              textTransform: "none",
              background: "darkgray",
              color: "white",
              "&:hover": {
                background: "gray",
              },
            }}
          >
            Cancel
          </Button>
          <Button
            style={{
              textTransform: "none",
              background: "darkblue",
              color: "white",
              "&:hover": {
                background: "#000028",
              },
            }}
            variant="contained"
            onClick={(e) => {
              sendRequest();
              handleCloseDialog(e);
            }}
            className={classes.submitButton}
          >
            Submit
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

const DialogTitle = (props) => {
  const classes = toolBarStyles();
  const { children, onClose, ...other } = props;
  return (
    <MuiDialogTitle disableTypography className={classes.rootTitle} {...other}>
      <Typography variant="h6">{children}</Typography>
      {onClose ? (
        <IconButton
          aria-label="close"
          className={classes.closeButton}
          onClick={onClose}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </MuiDialogTitle>
  );
};
