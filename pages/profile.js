import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Box, makeStyles } from '@material-ui/core';
import {
  fetchUserHandler,
  updateUserHandler,
} from '../store/actions/authActions';
import withAuth from '../utils/withAuth';

import { Alert } from '../components/UIElements';

import PreviewUser from '../parts/usersWidget/previewUser';
import ProfileLoading from '../parts/usersWidget/profileLoader';

const Profile = ({ auth, fetchUserHandler, updateUserHandler }) => {
  const classes = useStyles();

  if (auth.isloading) {
    return <h1> Is Loading !!! </h1>;
  }

  return (
    <Box container maxWidth="sm" mt={2} pl={2} className={classes.root}>
      {auth.msg && <Alert key={new Date()} payload={auth.msg} />}
      {auth.user ? (
        <PreviewUser
          usersData={auth.user}
          updateUserHandler={updateUserHandler}
        />
      ) : (
        <ProfileLoading />
      )}
    </Box>
  );
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

const useStyles = makeStyles((theme) => ({
  root: {
    '& svg': {
      marginRight: theme.spacing(1),
      marginBottom: theme.spacing(0.6),
      fontSize: '1.2rem',
    },
    '& .MuiGrid-item': {
      // width: '100%',
    },
  },
  userName: {
    textTransform: 'capitalize',
  },
}));

export default connect(mapStateToProps, {
  fetchUserHandler,
  updateUserHandler,
})(withAuth(Profile));
