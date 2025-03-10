import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core';
import Link from 'next/link';
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';
import { clearMsg, login } from '../store/actions/authActions';
import Alert from '../components/UIElements/Alert';
import { useRouter } from 'next/router';
import CircularProgress from '@material-ui/core/CircularProgress';

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
  error: {
    color: 'red',
  },
}));

function Login() {
  const classes = useStyles();
  const [showPassword, togglePassword]= useState(false)
  const dispatch = useDispatch();
  const router = useRouter();
  const { isLoading, msg } = useSelector((state) => state.auth);
  const { register, handleSubmit, errors } = useForm();

  const onSubmit = (data) => {
    if (data.email !== '' && data.password !== '') {
      // console.log(data);
      dispatch(login(data));
    }
  };

  useEffect(() => {
    if (msg) {
      setTimeout(() => {
        dispatch(clearMsg());
      }, 2000);
    }
  }, [msg]);

  return (
    <div className={classes.root}>
      {msg ? <Alert key={new Date()} payload={msg} /> : null}
      <div className={classes.bgImage}>
        <div class="account-pages pt-5">
          <div class="container mt-3">
            <div class="row justify-content-center">
              <div class="col-md-8 col-lg-6 col-xl-5">
                <div class="text-center">
                  <a href="index.html" class="logo">
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
                  </a>
                  <h4 class="text-white mt-2 mb-4"> Muna Dashboard </h4>
                </div>
                <div class="card">
                  <div class="card-body p-4">
                    <div class="text-center mb-4">
                      <h4 class="text-uppercase mt-0">Sign In</h4>
                    </div>

                    <form onSubmit={handleSubmit(onSubmit)}>
                      <div class="form-group mb-3">
                        <label for="emailaddress">Email address</label>
                        <input
                          class="form-control"
                          type="type"
                          name="email"
                          placeholder="Enter your email"
                          ref={register({
                            required: true,
                            pattern: {
                              value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                              message: 'Enter a valid e-mail address',
                            },
                          })}
                        />
                        {errors.email && (
                          <span className={classes.error}>
                            {errors.email.message
                              ? errors.email.message
                              : 'This field is required'}
                          </span>
                        )}
                      </div>

                      <div class="form-group mb-3">
                        <label for="password">Password</label>
                        <div class="input-group">
                          <input
                            class="form-control"
                            type={showPassword ? 'text' : 'password'}
                            name="password"
                            placeholder="Enter your password"
                            ref={register({ required: true, minLength: 7 })}
                          />
                          <div class="input-group-append">
                            <span
                              class="btn border"
                              onClick={() => togglePassword(!showPassword)}
                            >
                              <i
                                class={
                                  showPassword
                                    ? 'fas fa-eye-slash text-secondary'
                                    : 'fe-eye text-secondary'
                                }
                              ></i>
                            </span>
                          </div>
                        </div>
                        {errors.password && (
                          
                         console.log(errors)
                        )}
                      </div>

                      {/* <div class="form-group mb-3">
                        <div class="custom-control custom-checkbox">
                          <label
                            class="custom-control-label"
                            for="checkbox-signin"
                          >
                            Remember me
                          </label>
                        </div>
                      </div> */}
                      {/* <div class="form-group">
                          <div class="checkbox">
                              <input id="checkbox-remember" type="checkbox" name="rememberMe" ref={register({required:false})}/>
                              <label for="checkbox-remember">
                                  Remember me
                              </label>
                          </div>
                      </div> */}

                      <div class="form-group mb-0 text-center">
                        <button
                          disabled={isLoading ? true : null}
                          class="btn btn-success btn-block"
                          type="submit"
                        >
                          {isLoading ? (
                            <CircularProgress size={16} color="white" />
                          ) : (
                            'Sign In'
                          )}
                        </button>
                      </div>
                    </form>
                  </div>
                </div>

                <div class="row mt-3">
                  <div class="col-12 text-center">
                    <p class="text-white">
                      <Link href="/forget_password">
                        <a href="#" class="text-muted ml-1">
                          <i class="fa fa-lock mr-1 text-white"></i>{' '}
                          <span class="text-white">Forgot your password?</span>
                        </a>
                      </Link>
                    </p>
                    <p class="text-white">Don't have an account?</p>
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

export default Login;
