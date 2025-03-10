import React, { useEffect, useState, useRef } from "react";
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
import Select, { SelectChangeEvent } from "@mui/material/Select";
import { Divider, Menu, MenuItem } from "@material-ui/core/";
import DatePicker from "react-datepicker";
import moment from "moment";
import MuiDialogTitle from "@material-ui/core/DialogTitle";
import CloseIcon from "@material-ui/icons/Close";
import { debounce } from "lodash";
import {
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
} from "@material-ui/core";
import MuiAlert from "@material-ui/lab/Alert";
import { useClickOutside } from "@/parts/subscriptions/useClickOutside";
import { dialogStyles } from "./styles/dialogStyles";
import { handleDateChange } from "./utils";
import { getActivePackages } from "@/services/packageService";

export const ReportDialog = (props) => {
  const {
    openDialog,
    handleCloseDialog,
    sendRequest,
    startDate,
    setStartDate,
    endDate,
    setEndDate,
    fieldContent,
    setFieldVal,
    showMonthSelector,
    showPackageField,
    setSelectedPackageId,
    selectedPackageId,
  } = props;
  const classes = dialogStyles();
  const [isStartDate, setIsStartDate] = useState(false);
  const [isEndDate, setIsEndDate] = useState(false);
  const startDateRef = useClickOutside(() => setIsStartDate(false));
  const endDateRef = useClickOutside(() => setIsEndDate(false));
  const [activePackages, setActivePackages] = useState([]);
  const dateRef = useRef();
  const _setDateType = (e, type) => {
    e.preventDefault();
    if (type === "startDate") {
      setIsStartDate(!isStartDate);
    }
    if (type === "endDate") {
      setIsEndDate(!isEndDate);
    }
  };

  const _setDate = (data, type) => {
    //console.log(type);
    if (type === "startDate") {
      setStartDate(data);
    }
    if (type === "endDate") {
      setEndDate(data);
    }
  };

  const saveDateChanges = useRef(
    debounce(async (dateVal, dateType) => {
      _setDate(dateVal, dateType);
    }, 300),
  );

  const renderDate = (dateInput) => {
    const parsedDate = moment(
      dateInput,
      "ddd MMM DD YYYY HH:mm:ss [GMT]ZZ (Z)",
    );

    const outputDate = showMonthSelector
      ? parsedDate.format("MM-YYYY")
      : parsedDate.format("DD-MM-YYYY");
    //console.log(outputDate);
    return outputDate;
  };

  useEffect(() => {
    const getPackages = async () => {
      const packages = await getActivePackages();
      setActivePackages(packages.data);
    };
    getPackages();
  }, []);

  return (
    <div>
      {/* <Button variant="outlined" color="primary" >
        Open form dialog
      </Button> */}
      <Dialog
        open={openDialog}
        onClose={handleCloseDialog}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title" onClose={handleCloseDialog}>
          Filter Reports
        </DialogTitle>
        <DialogContent style={{ minHeight: "40vh" }} dividers>
          <DialogContentText>
            Please ensure that all fields are selected before submitting
          </DialogContentText>
          <Box className={[classes.content]}>
            <Box
              style={{
                display: "flex",
                flexDirection: "column",
                width: "95%",
              }}
            >
              {fieldContent && (
                <Box
                  style={{
                    position: "relative",
                    display: "flex",
                    alignItems: "center",
                    marginBottom: "1rem",
                    width: "100%",
                  }}
                >
                  <Typography style={{ minWidth: "30%" }}>
                    {fieldContent[0].toUpperCase() +
                      fieldContent.slice(1, fieldContent.length + 1)}
                  </Typography>
                  <Box
                    style={{
                      width: "14rem",
                      height: "36px",
                      color: "gray",
                    }}
                  >
                    <TextField
                      variant="outlined"
                      placeholder={`Enter ${fieldContent}`}
                      className={classes.textField}
                      InputProps={{
                        classes: { root: classes.textField },
                      }}
                      inputProps={{
                        className: classes.textField,
                      }}
                      onChange={(e) => setFieldVal(e?.target?.value)}
                    ></TextField>
                  </Box>
                </Box>
              )}
              {showPackageField ? (
                <Box
                  style={{
                    display: "flex",
                    marginBottom: "1rem",
                    alignItems: "center",
                    width: "100%",
                  }}
                >
                  <Typography style={{ minWidth: "30%" }}>
                    Select Package:
                  </Typography>
                  <Select
                    variant="outlined"
                    value={selectedPackageId}
                    className={[classes.selectOption]}
                    inputProps={{
                      className: classes.disabled,
                    }}
                    onChange={(e) => setSelectedPackageId(e.target.value)}
                  >
                    <MenuItem value="All" selected>
                      All
                    </MenuItem>
                    {activePackages?.map((pack) => (
                      <MenuItem key={pack?.name} value={pack?.id}>
                        {pack?.name?.charAt(0).toUpperCase() +
                          pack?.name?.slice(1).toLowerCase()}
                      </MenuItem>
                    ))}
                  </Select>
                </Box>
              ) : (
                ""
              )}
              <Box
                style={{
                  display: "flex",
                  marginBottom: "1rem",
                  alignItems: "center",
                  width: "100%",
                }}
              >
                <Typography style={{ minWidth: "30%" }}>Start Date:</Typography>
                <Box
                  style={{
                    width: "14rem",
                    position: "relative",
                    // display: "flex",
                    // alignItems: "center",
                  }}
                  //ref={startDateRef}
                >
                  <Button
                    className={[classes.datePickerInputBtn]}
                    style={{
                      textTransform: "none",
                      fontSize: 15,
                      fontWeight: 400,
                    }}
                    onClick={(e) => _setDateType(e, "startDate")}
                  >
                    {startDate ? renderDate(startDate) : "Select a Date"}
                  </Button>
                  <div
                    style={{
                      position: "absolute",
                      left: 0,
                      top: 40,
                    }}
                    ref={startDateRef}
                  >
                    {isStartDate && (
                      <DatePicker
                        selected={startDate}
                        fixedHeight
                        inline
                        //ref={(elem) => (dateRef.current = elem)}
                        placeholderText={`Select a Date`}
                        //showMonthYearPicker
                        showYearDropdown
                        showMonthDropdown
                        dropdownMode="select"
                        showMonthYearPicker={showMonthSelector ? true : false}
                        dateFormat={
                          showMonthSelector ? "MM/yyyy" : "dd/MM/yyyy"
                        }
                        showPopperArrow={false}
                        popperClassName={[classes.datePickerPopper]}
                        wrapperClassName={[classes.datePickerBox]}
                        className={[classes.datePickerInput]}
                        onChange={(date) => {
                          handleDateChange({
                            data: date,
                            dateType: "startDate",
                            saveDateChanges,
                            _setDate,
                          });
                          setIsStartDate(false);
                        }}
                        onChangeRaw={(event) => {
                          handleDateChange({
                            data: event,
                            dateType: "startDate",
                            saveDateChanges,
                            _setDate,
                          });
                          setIsStartDate(false);
                        }}
                      />
                    )}
                  </div>
                </Box>
              </Box>
              <Box
                style={{
                  display: "flex",
                  marginBottom: "4rem",
                  alignItems: "center",
                  width: "100%",
                }}
              >
                <Typography style={{ minWidth: "30%" }}>End Date:</Typography>
                <Box
                  style={{
                    width: "14rem",
                    position: "relative",
                  }}
                  //ref={endDateRef}
                >
                  <Button
                    className={[classes.datePickerInputBtn]}
                    style={{
                      textTransform: "none",
                      fontSize: 15,
                      fontWeight: 400,
                    }}
                    onClick={(e) => _setDateType(e, "endDate")}
                  >
                    {endDate ? renderDate(endDate) : "Select a Date"}
                  </Button>
                  {isEndDate && (
                    <div
                      style={{
                        position: "absolute",
                        left: 0,
                        top: 40,
                      }}
                      ref={endDateRef}
                    >
                      <DatePicker
                        selected={endDate}
                        fixedHeight
                        inline
                        //ref={(elem) => (dateRef.current = elem)}
                        showMonthYearPicker={showMonthSelector ? true : false}
                        dateFormat={
                          showMonthSelector ? "MM/yyyy" : "dd/MM/yyyy"
                        }
                        placeholderText={`Select a Date`}
                        //showMonthYearPicker
                        showYearDropdown
                        showMonthDropdown
                        dropdownMode="select"
                        showPopperArrow={false}
                        popperClassName={[classes.datePickerPopper]}
                        wrapperClassName={[classes.datePickerBox]}
                        className={[classes.datePickerInput]}
                        onChange={(date) => {
                          handleDateChange({
                            data: date,
                            dateType: "endDate",
                            saveDateChanges,
                            _setDate,
                          });
                          setIsEndDate(false);
                        }}
                        onChangeRaw={(event) => {
                          handleDateChange({
                            data: event,
                            dateType: "endDate",
                            saveDateChanges,
                            _setDate,
                          });
                          setIsEndDate(false);
                        }}
                      />
                    </div>
                  )}
                </Box>
              </Box>
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
              height: "2.1rem",
              width: "6rem",
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
              background: "darkgreen",
              color: "white",
              height: "2.1rem",
              width: "6rem",
              marginLeft: "1rem",
            }}
            color="primary"
            variant="contained"
            onClick={(e) => {
              sendRequest();
              handleCloseDialog(e);
              fieldContent === "user email" && setFieldVal("");
            }}
          >
            Submit
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

const DialogTitle = (props) => {
  const classes = dialogStyles();
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
