import React, { useEffect, useState } from "react";

import Modal from "@material-ui/core/Modal";
// import Stack from "@mui/material/Stack";
// import Button from "@mui/material/Button";
import {
  makeStyles,
  Grid,
  Box,
  Typography,
  Card,
  CardContent,
  Container,
  Divider,
  Tooltip,
} from "@material-ui/core";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { AdminupdateUserHandler } from "../../store/actions/subscriberAction";
import { toast, ToastContainer } from "react-toastify";
import axios from "axios";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 500,
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
};

const EditSubscriberProfile = ({
  selectedUser,
  close,
  showProfile,
  cancel,
}) => {
  const { register, handleSubmit, errors } = useForm();
  // console.log(selectedUser);
  const classes = useStyles();
  const { isUserUpdated } = useSelector((state) => state.subscribers);
  const [loading, setloading] = useState(false);
  const dispatch = useDispatch();

  const onSubmit = async (data) => {
    const formData = {
      firstName: data.firstName,
      lastName: data.lastName,
      otherName: data.otherName,
      email: selectedUser.email,
      phoneNumber: data.phoneNumber,
    };

    setloading(true);
    dispatch(AdminupdateUserHandler(formData, selectedUser.id));
  };
  useEffect(() => {
    if (isUserUpdated) {
      setloading(false);
      close();
    }
  }, [isUserUpdated]);

  return (
    <Modal
      open={showProfile}
      onClose={close}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <Box display="flex" mb={1}>
          <Typography variant="h5" component="h5">
            Edit Profile
          </Typography>
        </Box>
        <Box display="flex">
          <form onSubmit={handleSubmit(onSubmit)}>
            <Grid container spacing={2}>
              <Grid item sm={6} xs={12}>
                <label for="firstName"> First Name </label>
                <input
                  type="text"
                  className={`form-control`}
                  id="firstName"
                  name="firstName"
                  defaultValue={selectedUser?.firstName}
                  ref={register({ required: true })}
                />
                {errors.firstName && (
                  <span className={classes.errorMsg} style={{ color: "red" }}>
                    This feild is required
                  </span>
                )}
              </Grid>
              <Grid item sm={6} xs={12}>
                <label
                  for="lastName
"
                >
                  {" "}
                  Last Name{" "}
                </label>
                <input
                  type="text"
                  class="form-control"
                  id="lastName"
                  name="lastName"
                  defaultValue={selectedUser?.lastName}
                  ref={register({ required: true })}
                />
                {errors.lastName && (
                  <span className={classes.errorMsg} style={{ color: "red" }}>
                    This field is required
                  </span>
                )}
              </Grid>
              <Grid item sm={6} xs={12}>
                <label for="otherName"> Other Name </label>
                <input
                  type="text"
                  class="form-control"
                  id="otherName"
                  name="otherName"
                  defaultValue={selectedUser?.otherName}
                  ref={register({ required: true })}
                />
                {errors.otherName && (
                  <span className={classes.errorMsg} style={{ color: "red" }}>
                    This field is required
                  </span>
                )}
              </Grid>

              <Grid item sm={6} xs={12}>
                <label for="phoneNumber"> Phone No </label>
                <input
                  type="text"
                  class="form-control"
                  id="phoneNumber"
                  name="phoneNumber"
                  defaultValue={selectedUser?.phoneNumber}
                  ref={register({ required: true })}
                />
                {errors.phoneNumber && (
                  <span className={classes.errorMsg} style={{ color: "red" }}>
                    This field is required
                  </span>
                )}
              </Grid>
            </Grid>
            <Grid item sm={6} xs={12}>
              <label for="email"> Email </label>
              <input
                type="email"
                class="form-control"
                id="email"
                name="email"
                disabled
                defaultValue={selectedUser?.email}
                ref={register({ required: true })}
              />
              {errors.email && (
                <span className={classes.errorMsg}>This field is required</span>
              )}
            </Grid>
            <div class="mt-2">
              <button
                type="submit"
                class="btn btn-success waves-effect waves-light mr-2"
              >
                <span>{loading ? "Updating..." : "Update"}</span>
                <i class="fa fa-globe-africa ml-1"></i>
              </button>

              <butto
                onClick={() => cancel(false)}
                class="btn btn-outline-danger waves-effect waves-light"
              >
                <span>Close</span>
                <i class="fa fa-times ml-1"></i>
              </butto>
            </div>
          </form>
        </Box>
      </Box>
    </Modal>
  );
};

const useStyles = makeStyles((theme) => ({
  root: {
    marginBottom: theme.spacing(8),
    "& .MuiCard-root": {
      marginBottom: theme.spacing(2),
    },
    "& .MuiDivider-root": {
      margin: theme.spacing(1, 0),
    },
    "& .mdi": {
      fontSize: "15px",
    },
    [theme.breakpoints.down("md")]: {
      width: 300,
    },
  },
}));

export default EditSubscriberProfile;
