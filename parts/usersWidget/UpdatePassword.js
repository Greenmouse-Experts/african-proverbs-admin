import Head from 'next/head';
import Link from 'next/link';
import React from 'react';
import { useForm } from 'react-hook-form';
import {
  makeStyles,
  Grid,
  Box,
  Typography,
  Card,
  CardContent,
  Container,
} from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import {updatePassword} from '../../store/actions/authActions';

const UpdatePassword = ({
    closeEditPassword,
}) => {
  const classes = useStyles();
  const { register, handleSubmit, errors } = useForm();
  const dispatch = useDispatch();

  const onSubmit = (data) => {
    console.log("Working from edit");
    const formData = {
      oldPassword: data.old_password,
      newPassword: data.new_password,
      confirmNewPassword: data.confirm_password,
    };
    console.log("dispatched");
    dispatch(updatePassword(formData));
  };

  return (
    <Card>
      <CardContent>
        <Box display="flex" mb={1}>
          <Typography variant="h5" component="h5">
            Update Password
          </Typography>
        </Box>
        <Box display="flex">
          <form onSubmit={handleSubmit(onSubmit)}>
            <Grid container spacing={2}>
              <Grid item sm={12} xs={12}>
                <label for="old_password"> Old Password </label>
                <input
                  type="password"
                  className={`form-control`}
                  id="old_password"
                  name="old_password"
                  ref={register({ required: true })}
                />
                {errors.old_password && (
                  <span className={classes.errorMsg}>
                    This feild is required
                  </span>
                )}
              </Grid>
              <Grid item sm={17} xs={12}>
                <label for="new_password"> New Password </label>
                <input
                  type="password"
                  class="form-control"
                  id="new_password"
                  name="new_password"
                  ref={register({ required: true })}
                />
                {errors.new_password && (
                  <span className={classes.errorMsg}>
                    This field is required
                  </span>
                )}
              </Grid>
              <Grid item sm={12} xs={12}>
                <label for="confirm_password"> Confirm New Password </label>
                <input
                  type="password"
                  class="form-control"
                  id="confirm_password"
                  name="confirm_password"
                  ref={register({ required: true })}
                />
                {errors.confirm_password && (
                  <span className={classes.errorMsg}>
                    This field is required
                  </span>
                )}
              </Grid>
            </Grid>
            <div class="mt-2">
              <button
                type="submit"
                class="btn btn-success waves-effect waves-light mr-2"
              >
                <span>Update</span>
                <i class="fa fa-globe-africa ml-1"></i>
              </button>

              <butto
                onClick={closeEditPassword}
                class="btn btn-outline-danger waves-effect waves-light"
              >
                <span>Close</span>
                <i class="fa fa-times ml-1"></i>
              </butto>
            </div>
          </form>
        </Box>
      </CardContent>
    </Card>
  );
};

const useStyles = makeStyles((theme) => ({
  root: {
    marginBottom: theme.spacing(8),
    '& .MuiCard-root': {
      marginBottom: theme.spacing(2),
    },
    '& .MuiDivider-root': {
      margin: theme.spacing(1, 0),
    },
    '& .mdi': {
      fontSize: '15px',
    },
  },
}));

export default UpdatePassword;
