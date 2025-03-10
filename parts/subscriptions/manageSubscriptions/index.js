import React, { useEffect, useState } from "react";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Paper from "@material-ui/core/Paper";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import { useRouter } from "next/router";
import Typography from "@material-ui/core/Typography";
import { blue, blueGrey, grey } from "@material-ui/core/colors";
import { Box, IconButton, Snackbar, Tooltip } from "@material-ui/core";
import DatePicker from "react-datepicker";
import CardMembershipIcon from "@material-ui/icons/CardMembership";
import PersonIcon from "@material-ui/icons/Person";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Switch from "@material-ui/core/Switch";
import { useStyles } from "./styles";
import Select from "@material-ui/core/Select";
import {
  getSubscriptionList,
  updateAutoRenewal,
  updateStatus,
} from "@/services/subscriptionList";
import { Alert } from "@/components/UIElements";
import CloseIcon from "@material-ui/icons/Close";
import MuiAlert from "@material-ui/lab/Alert";
import moment from "moment";

const ManageSubscriptions = () => {
  const classes = useStyles();
  const router = useRouter();
  const [userDetails, setUserDetails] = useState({
    name: null,
    maxLang: null,
    langNo: null,
    startDate: null,
    endDate: null,
    type: null,
    active: null,
    autoRenew: null,
    amount: null,
  });
  const [subscriptions, setSubscriptions] = useState({ auto: true });
  const [userSubData, setuserSubData] = useState(false);
  const { autoRenew, active, startDate, endDate } = userDetails;
  const userID = router?.query?.manage;
  const [openAlert, setOpenAlert] = React.useState(false);
  const [alertMsg, setAlertMsg] = React.useState("");

  useEffect(() => {
    const notEmpty = Object.values(userDetails).find((data) => data !== null);
    notEmpty && setuserSubData(true);
  }, [userDetails]);

  const handleSubmit = (e, body) => {
    e?.preventDefault();
    console.log(body);
    // Handle form submission logic here
  };

  useEffect(() => {
    const getSubscriptionsData = async () => {
      const subscriptionData = await getSubscriptionList(userID);
      const userData = subscriptionData?.data?.content?.[0];
      const newDetails = {
        name: userData?.subscriberName,
        maxLang: userData?.maxNoOfLanguage,
        langNo: userData?.noOfLanguages,
        startDate: new Date(userData?.startDate),
        endDate: new Date(userData?.endDate),
        type:
          userData?.subscriptionName[0].toUpperCase() +
          userData?.subscriptionName?.slice(1).toLowerCase(),
        active: userData?.subscriptionActiveStatus || false,
        autoRenew: userData?.autoRenewalStatus || false,
        amount: userData?.paymentAmount,
      };
      setUserDetails(() => ({ ...userDetails, ...newDetails }));
      //console.log(subscriptionData);
      //console.log(newDetails);
    };
    getSubscriptionsData();
  }, [router?.query]);

  const handleChange = (e) => {
    // console.log(e.target?.value, e.target?.name, e.target?.checked);
    // console.log(userDetails);
    if (e.target?.name === "autoRenew" || e.target?.name === "active") {
      setUserDetails(() => ({
        ...userDetails,
        [e.target?.name]: e.target?.checked,
      }));
      if (e.target?.name === "autoRenew") {
        updateAutoRenewal({ id: userID, status: e.target?.checked });
        setAlertMsg(
          `Auto Renewal status ${e.target?.checked ? "updated" : "cancelled"}`,
        );
        setTimeout(() => {
          setOpenAlert(true);
        }, 400);
      }
      if (e.target?.name === "active") {
        updateStatus({ id: userID, status: e.target?.checked });
        setAlertMsg(
          `User subscription was ${
            e.target?.checked ? "activated" : "cancelled"
          }`,
        );
        setTimeout(() => {
          setOpenAlert(true);
        }, 400);
      }
    }
  };
  const handleCloseAlert = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpenAlert(false);
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
    <Paper className={classes.root}>
      <Snackbar
        anchorOrigin={{
          vertical: "bottom",
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
          severity="success"
        >
          {alertMsg}
        </MuiAlert>
      </Snackbar>
      <AppBar position="static" color="default">
        <Toolbar variant="dense">
          <Typography variant="subtitle2" color="inherit">
            {userSubData
              ? "Manage this user subscription"
              : "User subscriptions data is empty"}
          </Typography>
        </Toolbar>
      </AppBar>
      {!!userSubData && (
        <form className={classes.container} onSubmit={handleSubmit}>
          <Box className={[classes.sectionOne]}>
            {/* <Paper elevation={0} className={classes.paperForm}>
              <Box>
                <Box className={"w-100"}>
                  <Typography variant="subtitle2" color="inherit">
                    FullName
                  </Typography>
                  <TextField
                    variant="outlined"
                    className={classes.textField}
                    type="text"
                    fullWidth
                    required
                    name={"name"}
                    disabled
                    autoComplete="off"
                    defaultValue={userDetails?.name}
                    InputProps={{
                      className: classes.focused,
                    }}
                    inputProps={{
                      className: classes.disabled,
                    }}
                  />
                </Box>
                <Box className={"w-100"}>
                  <Typography variant="subtitle2" color="inherit">
                    Maximum Number of Languages
                  </Typography>
                  <TextField
                    variant="outlined"
                    className={classes.textField}
                    type="email"
                    fullWidth
                    required
                    disabled
                    name={"maxLang"}
                    autoComplete="off"
                    defaultValue={userDetails?.maxLang}
                    InputProps={{
                      classes: { root: classes.focused },
                    }}
                    inputProps={{
                      className: classes.disabled,
                    }}
                  />
                </Box>
                <Box className={"w-100"}>
                  <Typography variant="subtitle2" color="inherit">
                    Number of Languages
                  </Typography>
                  <TextField
                    variant="outlined"
                    className={classes.textField}
                    type="email"
                    fullWidth
                    required
                    disabled
                    name={"langNo"}
                    autoComplete="off"
                    defaultValue={userDetails?.langNo}
                    InputProps={{
                      classes: { root: classes.focused },
                    }}
                    inputProps={{
                      className: classes.disabled,
                    }}
                  />
                </Box>
                <Box className={["w-100", classes.boxMargin]}>
                  <Typography variant="subtitle2" color="inherit">
                    Start Date
                  </Typography>
                  <DatePicker
                    selected={startDate}
                    wrapperClassName={["w-100", classes.datePickerWrapper]}
                    className={["w-100", classes.datePickerInput]}
                    onChange={(date) => setStartDate(date)}
                    name={"startDate"}
                    disabled
                  />
                </Box>
                <Box className={["w-100", classes.boxMargin]}>
                  <Typography variant="subtitle2" color="inherit">
                    End Date
                  </Typography>
                  <DatePicker
                    selected={endDate}
                    wrapperClassName={["w-100", classes.datePickerWrapper]}
                    className={["w-100", classes.datePickerInput]}
                    onChange={(date) => setEndDate(date)}
                    name={"endDate"}
                    disabled
                  />
                </Box>
                <Box className={["w-100", classes.boxMargin]}>
                  <Typography variant="subtitle2" color="inherit">
                    Subscription Type
                  </Typography>
                  <Select
                    variant="outlined"
                    value={10}
                    name={"type"}
                    disabled
                    inputProps={{
                      className: classes.disabled,
                    }}
                    className={["w-100", classes.selectOption]}
                  >
                    <option style={{ paddingLeft: "0.5rem" }} value={10}>
                      {userDetails?.type}
                    </option>
                  </Select>
                </Box>
                <Box className={"w-100"}>
                  <Typography variant="subtitle2" color="inherit">
                    Payment Amount
                  </Typography>
                  <TextField
                    variant="outlined"
                    className={classes.textField}
                    type="text"
                    fullWidth
                    required
                    disabled
                    name={"amount"}
                    autoComplete="off"
                    defaultValue={"₦ " + userDetails?.amount}
                    InputProps={{
                      classes: { root: classes.focused },
                    }}
                    inputProps={{
                      className: classes.disabled,
                    }}
                  />
                </Box>
                <Box className={["w-100"]}>
                  <FormControlLabel
                    control={
                      <Switch
                        color={"secondary"}
                        checked={autoRenew}
                        name={"autoRenew"}
                        onChange={(e) => handleChange(e)}
                      />
                    }
                    label="AutoRenew Subscription"
                    labelPlacement="start"
                    classes={{
                      label: classes.switchTitle,
                      labelPlacementStart: classes.switchForm,
                    }}
                  />
                </Box>
                <Box className={"w-100"}>
                  <Button
                    type="submit"
                    variant="contained"
                    //fullWidth
                    className={classes.submitButton}
                  >
                    Save
                  </Button>
                </Box>
              </Box>
            </Paper> */}
            <Box style={{ background: "lightgray" }}>
              <Paper
                className={classes.paperBoxOne}
                style={{
                  marginTop: "16px",
                }}
                elevation={0}
              >
                <Typography
                  className={classes.textWidth}
                  variant="subtitle2"
                  color="inherit"
                >
                  Full Name:
                </Typography>
                <Typography variant="subtitle2" style={{ color: "gray" }}>
                  {userDetails?.name}
                </Typography>
              </Paper>
              <Paper className={classes.paperBoxTwo} elevation={0}>
                <Typography
                  className={classes.textWidth}
                  variant="subtitle2"
                  color="inherit"
                >
                  Maximum Number of Languages:
                </Typography>
                <Typography variant="subtitle2" style={{ color: "gray" }}>
                  {userDetails?.maxLang}
                </Typography>
              </Paper>
              <Paper className={classes.paperBoxOne} elevation={0}>
                <Typography
                  className={classes.textWidth}
                  variant="subtitle2"
                  color="inherit"
                >
                  Subscribed Languages:
                </Typography>
                <Typography variant="subtitle2" style={{ color: "gray" }}>
                  {userDetails?.langNo}
                </Typography>
              </Paper>
              <Paper className={classes.paperBoxTwo} elevation={0}>
                <Typography
                  className={classes.textWidth}
                  variant="subtitle2"
                  color="inherit"
                >
                  Start Date:
                </Typography>
                <Typography variant="subtitle2" style={{ color: "gray" }}>
                  {startDate ? renderDate(startDate) : "___"}
                </Typography>
              </Paper>
              <Paper className={classes.paperBoxOne} elevation={0}>
                <Typography
                  className={classes.textWidth}
                  variant="subtitle2"
                  color="inherit"
                >
                  End Date:
                </Typography>
                <Typography variant="subtitle2" style={{ color: "gray" }}>
                  {endDate ? renderDate(endDate) : "___"}
                </Typography>
              </Paper>
              <Paper className={classes.paperBoxTwo} elevation={0}>
                <Typography
                  className={classes.textWidth}
                  variant="subtitle2"
                  color="inherit"
                >
                  Subscription Type:
                </Typography>
                <Typography variant="subtitle2" style={{ color: "gray" }}>
                  {userDetails?.type}
                </Typography>
              </Paper>
              <Paper className={classes.paperBoxOne} elevation={0}>
                <Typography
                  className={classes.textWidth}
                  variant="subtitle2"
                  color="inherit"
                >
                  Payment Amount:
                </Typography>
                <Typography variant="subtitle2" style={{ color: "gray" }}>
                  {"₦" + userDetails?.amount === null ? 0 : userDetails?.amount}
                </Typography>
              </Paper>
              <Paper className={classes.paperBoxTwo} elevation={0}>
                <FormControlLabel
                  control={
                    <Switch
                      color={"secondary"}
                      checked={autoRenew}
                      name={"autoRenew"}
                      onChange={(e) => handleChange(e)}
                    />
                  }
                  label="AutoRenew Subscription"
                  labelPlacement="start"
                  classes={{
                    label: classes.switchText,
                    labelPlacementStart: classes.switchForm,
                    root: classes.switchRoot,
                  }}
                />
              </Paper>
              <Paper className={classes.paperBoxOne} elevation={0}>
                <FormControlLabel
                  control={
                    <Switch
                      color={"secondary"}
                      checked={active}
                      name={"active"}
                      onChange={(e) => handleChange(e)}
                    />
                  }
                  label="Cancel Subscription"
                  labelPlacement="start"
                  classes={{
                    label: classes.switchText,
                    labelPlacementStart: classes.switchForm,
                    root: classes.switchRoot,
                  }}
                />
              </Paper>
            </Box>
          </Box>
          <Box className={[classes.sectionTwo]}>
            <Paper elevation={0} className={classes.leftPaper}>
              {/* <Box className={[classes.profileBox, "w-50"]}>
                <Box className={classes.imageBox}>
                  <PersonIcon color="inherit" fontSize="inherit" />
                </Box>
                <Tooltip
                  placement="right"
                  title={userDetails?.type + "  Subscription"}
                >
                  <Box
                    style={{
                      fontSize: "4.5rem",
                      padding: 0,
                      color:
                        userDetails?.type === "Gold"
                          ? "#cca01d"
                          : userDetails?.type === "Silver"
                          ? "gray"
                          : "#8D7957",
                    }}
                  >
                    <CardMembershipIcon color="inherit" fontSize="inherit" />
                  </Box>
                </Tooltip>
              </Box> */}
            </Paper>
          </Box>
        </form>
      )}
    </Paper>
  );
};

export default ManageSubscriptions;
