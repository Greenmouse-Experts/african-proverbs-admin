import React from 'react';
import Router from 'next/router';
import {
  alertMessage,
  ChangePasswordHandler,
} from '../store/actions/authActions';

import { useForm } from 'react-hook-form';
import {
  Grid,
  Card,
  Box,
  Divider,
  Typography,
  makeStyles,
  CardContent,
  TextField,
  Button,
} from '@material-ui/core';
import withAuth from '../utils/withAuth';
import { connect } from 'react-redux';
import Alert from '../components/UIElements/Alert';

const useStyles = makeStyles((theme) => ({
  root: {
    '& .MuiFormControl-root': {
      width: '100%',
    },
    '& .MuiGrid-item': {
      width: '100%',
    },
  },
  errorMsg: {
    color: 'red',
    fontSize: '12px',
  },
}));

const ResetPassword = ({ ChangePasswordHandler, alertMessage, auth }) => {
  const classes = useStyles();
  const { register, handleSubmit, errors, reset } = useForm();

  const onSubmit = (data, e) => {
    console.log(data);
    const trimData = {
      old_password: data.old_password,
      new_password1: data.new_password1,
      new_password2: data.new_password2,
    };

    if (data.new_password1 !== data.new_password2) {
      alertMessage('Password not the same', 'FAILURE');
      // todo: clear the input field
      e.target.reset({ old_password: data.old_password });
      return;
    }
    ChangePasswordHandler(trimData, Router);
  };

  return (
    <Box mt={5}>
      {auth.msg && <Alert key={new Date()} payload={auth.msg} />}
      <Grid container justify="center">
        <Grid item sm={12} md={5}>
          <Card className={classes.root}>
            <Box my="auto" p={2}>
              <Typography varian="h5" align="center">
                Change Password
              </Typography>
            </Box>
            <Box>
              <Divider />
            </Box>
            <CardContent>
              <form onSubmit={handleSubmit(onSubmit)} noValidate>
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <label for="old_password"> Old Password </label>
                    <input
                      type="password"
                      class="form-control"
                      id="old_password"
                      name="old_password"
                      ref={register({ required: true })}
                    />
                    {errors.old_password && (
                      <span className={classes.errorMsg}>
                        This field is required
                      </span>
                    )}
                  </Grid>
                  <Grid item xm={12}>
                    <Box py={2}>
                      <Divider />
                    </Box>
                  </Grid>
                  <Grid item xs={12}>
                    <label for="new_password1"> New Password </label>
                    <input
                      type="password"
                      class="form-control"
                      id="new_password1"
                      name="new_password1"
                      ref={register({ required: true })}
                    />
                    {errors.new_password1 && (
                      <span className={classes.errorMsg}>
                        This field is required
                      </span>
                    )}
                  </Grid>
                  <Grid item xs={12}>
                    <label for="new_password2"> Confirm Password </label>
                    <input
                      type="password"
                      class="form-control"
                      id="new_password2"
                      name="new_password2"
                      ref={register({ required: true })}
                    />
                    {errors.new_password2 && (
                      <span className={classes.errorMsg}>
                        This field is required
                      </span>
                    )}
                  </Grid>
                </Grid>
                <Box mt={2} display="flex" justifyContent="center">
                  <button
                    type="submit"
                    class="btn btn-primary waves-effect w-100 waves-light"
                  >
                    <span>Change Password</span>
                    <i class="fa fa-globe-africa ml-1"></i>
                  </button>
                </Box>
              </form>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, {
  ChangePasswordHandler,
  alertMessage,
})(withAuth(ResetPassword));
