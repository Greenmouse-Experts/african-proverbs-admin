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
import {updateUserHandler} from '../../store/actions/authActions';

const profileEdit = ({
  closeEditProfile,
  usersData: { author_profile, email, id, roles, },
}) => {
  const classes = useStyles();
  const { register, handleSubmit, errors } = useForm();
  const dispatch = useDispatch();

  const onSubmit = (data) => {
    console.log("Working from edit");
    const formData = {
      email: email,
      author_profile: {
        id: author_profile.id,
        first_name: data.first_name,
        last_name: data.last_name,
        other_name: data.other_name,
        phone_number: data.phone_no,
      },
    };
    dispatch(updateUserHandler(formData, id));
  };

  return (
    <Card>
      <CardContent>
        <Box display="flex" mb={1}>
          <Typography variant="h5" component="h5">
            Edit Profile
          </Typography>
        </Box>
        <Box display="flex">
          <form onSubmit={handleSubmit(onSubmit)}>
            <Grid container spacing={2}>
              <Grid item sm={6} xs={12}>
                <label for="first_name"> First Name </label>
                <input
                  type="text"
                  className={`form-control`}
                  id="first_name"
                  name="first_name"
                  defaultValue={author_profile.first_name}
                  ref={register({ required: true })}
                />
                {errors.first_name && (
                  <span className={classes.errorMsg}>
                    This feild is required
                  </span>
                )}
              </Grid>
              <Grid item sm={6} xs={12}>
                <label for="last_name"> Last Name </label>
                <input
                  type="text"
                  class="form-control"
                  id="last_name"
                  name="last_name"
                  defaultValue={author_profile.last_name}
                  ref={register({ required: true })}
                />
                {errors.last_name && (
                  <span className={classes.errorMsg}>
                    This field is required
                  </span>
                )}
              </Grid>
              <Grid item sm={6} xs={12}>
                <label for="other_name"> Last Name </label>
                <input
                  type="text"
                  class="form-control"
                  id="other_name"
                  name="other_name"
                  defaultValue={author_profile.other_name}
                  ref={register({ required: true })}
                />
                {errors.last_name && (
                  <span className={classes.errorMsg}>
                    This field is required
                  </span>
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
                  defaultValue={email}
                  ref={register({ required: true })}
                />
                {errors.email && (
                  <span className={classes.errorMsg}>
                    This field is required
                  </span>
                )}
              </Grid>
              <Grid item sm={6} xs={12}>
                <label for="phone_no"> Phone No </label>
                <input
                  type="text"
                  class="form-control"
                  id="phone_no"
                  name="phone_no"
                  defaultValue={author_profile.phone_number}
                  ref={register({ required: true })}
                />
                {errors.phone_no && (
                  <span className={classes.errorMsg}>
                    This field is required
                  </span>
                )}
              </Grid>
              <Grid item xs={12}>
                <label for="adress"> Adress </label>
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
                onClick={closeEditProfile}
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

export default profileEdit;
