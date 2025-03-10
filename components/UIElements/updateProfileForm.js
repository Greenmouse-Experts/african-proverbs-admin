import React from 'react';
import { useForm } from 'react-hook-form';

import {
  Grid,
  Card,
  Box,
  Divider,
  Typography,
  makeStyles,
  CardContent,
  Button,
} from '@material-ui/core';

import { NormalInput } from './index';

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
  errorInput: {
    borderColor: 'red',
  },
}));

const UpdateProfileForm = ({ userInfo, updateUserHandler }) => {
  const classes = useStyles();
  const { register, handleSubmit, errors } = useForm();

  const onSubmit = (data) => {
    const id = userInfo.userId;
    const formData = {
      author_profile: {
        id: userInfo.id,
        first_name: data.first_name,
        last_name: data.last_name,
      },
    };
    updateUserHandler(formData, id);
  };

  return (
    <Card className={classes.root}>
      <Box my="auto" p={2}>
        <Typography varian="h4" align="center">
          Update Profile
        </Typography>
      </Box>
      <Box>
        <Divider />
      </Box>
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Grid container spacing={2}>
            <Grid item sm={6} xs={12}>
              <label for="first_name"> First Name </label>
              <input
                type="text"
                className={`form-control`}
                id="first_name"
                name="first_name"
                defaultValue={userInfo.first_name}
                ref={register({ required: true })}
              />
              {errors.first_name && (
                <span className={classes.errorMsg}>This feild is required</span>
              )}
            </Grid>
            <Grid item sm={6} xs={12}>
              <label for="last_name"> Last Name </label>
              <input
                type="text"
                class="form-control"
                id="last_name"
                name="last_name"
                defaultValue={userInfo.last_name}
                ref={register({ required: true })}
              />
              {errors.last_name && (
                <span className={classes.errorMsg}>This field is required</span>
              )}
            </Grid>
            <Grid item sm={6} xs={12}>
              <label for="email"> Email </label>
              <input
                type="email"
                disabled
                defaultValue="calm@global.com"
                class="form-control"
                id="email"
                name="email"
                defaultValue={userInfo.email}
                ref={register({ required: true })}
              />
              {errors.email && (
                <span className={classes.errorMsg}>This field is required</span>
              )}
            </Grid>
            <Grid item sm={6} xs={12}>
              <label for="phone_no"> Phone No </label>
              <input
                type="number"
                disabled
                class="form-control"
                id="phone_no"
                name="phone_no"
                defaultValue={'090234566654'}
                ref={register({ required: true })}
              />
              {errors.phone_no && (
                <span className={classes.errorMsg}>This field is required</span>
              )}
            </Grid>
            <Grid item xs={12}>
              <label for="adress"> Adresss </label>
              <input
                type="text"
                disabled
                class="form-control"
                id="adress"
                name="adress"
                defaultValue="@calmGlobal.com"
                ref={register({ required: true })}
              />
              {errors.adress && (
                <span className={classes.errorMsg}>This field is required</span>
              )}
            </Grid>
          </Grid>
          <Box mt={2} display="flex" justifyContent="flex-end">
            <button
              type="submit"
              class="btn btn-primary waves-effect w-100 waves-light"
            >
              <span>Update</span>
              <i class="fa fa-globe-africa ml-1"></i>
            </button>
          </Box>
        </form>
      </CardContent>
    </Card>
  );
};

export default UpdateProfileForm;
