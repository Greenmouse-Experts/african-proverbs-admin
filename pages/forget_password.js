import React from 'react';
import { makeStyles } from '@material-ui/core';
import Link from 'next/link';
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';
import CssBaseline from '@material-ui/core/CssBaseline';
import {requestResetUserPassword} from '../store/actions/authActions';

import Alert from '../components/UIElements/Alert';

const useStyles = makeStyles((theme) => ({
  root: {
    height: '100vh',
  },
  bgImage: {
    backgroundImage: 'url(/background.jpg)',
    backgroundRepeat: 'no-repeat',
    backgroundColor:
      theme.palette.type === 'light'
        ? theme.palette.grey[50]
        : theme.palette.grey[900],
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    height: '100%',
  },
  errorMsg: {
    color: 'red',
    fontSize: '12px',
  },
}));

function Forgot_password() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { isLoading, msg } = useSelector((state) => state.auth);

  const { register, handleSubmit, errors } = useForm();

  const onSubmit = async (data) => {
      const alldata = {
        email: data.email_address,
        };
    await dispatch(requestResetUserPassword(alldata))
  };
  return (
    <div className={classes.root}>
      <CssBaseline />
      {msg ? <Alert key={new Date()} payload={msg} /> : null}
      <div className={classes.bgImage}>
        <div class="account-pages pt-5">
          <div class="container mt-3">
            <div class="row justify-content-center">
              <div class="col-md-8 col-lg-6 col-xl-5">
                <div class="text-center">
                  {/* <a href="index.html" class="logo">
                    <img
                      src="assets/images/logo-light.png"
                      alt=""
                      height="22"
                      class="logo-light mx-auto"
                    />
                    <img
                      src="assets/images/logo-dark.png"
                      alt=""
                      height="22"
                      class="logo-dark mx-auto"
                    />
                  </a> */}
                  <h4 class="text-white mt-2 mb-4"> Muna Dashboard</h4>
                </div>
                <div class="card">
                  <div class="card-body p-4">
                    <div class="text-center mb-4">
                      <h4 class="text-uppercase mt-0">Forgot Your Password?</h4>
                    </div>

                    <form onSubmit={handleSubmit(onSubmit)}>
                      <div class="form-group mb-3">
                        <label for="emailaddress">Email address</label>
                        <input
                          class="form-control"
                          type="type"
                          name="email_address"
                          id="email_address"
                          placeholder="Enter your email"
                          ref={register({
                            required: true,
                            pattern: {
                              value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                              message: 'Enter a valid e-mail address',
                            },
                          })}
                        />
                        {errors.email_address && (
                          <span className={classes.errorMsg}>
                            {errors.email_address.message
                              ? errors.email_address.message
                              : 'This field is required'}
                          </span>
                        )}
                      </div>

                      <div class="form-group mb-0 text-center">
                        <button class="btn btn-primary btn-block w-100" type="submit">
                          Submit
                        </button>
                      </div>
                    </form>
                  </div>
                </div>

                <div class="row mt-3">
                  <div class="col-12 text-center">
                    {/* <p class="text-white">
                      <a href="pages-recoverpw.html" class="text-muted ml-1">
                        <i class="fa fa-lock mr-1 text-white"></i>{' '}
                        <span class="text-white">Forgot your password?</span>
                      </a>
                    </p> */}
                    <p class="text-white">
                      Have an account?
                      <Link
                        href="/login"
                        variant="body2"
                        class="text-dark ml-1"
                      >
                        <b class="text-primary">Login</b>
                      </Link>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Forgot_password;
