import React from 'react';
import { makeStyles } from '@material-ui/core';
import Link from 'next/link';
import { useDispatch, useSelector } from 'react-redux';
import CssBaseline from '@material-ui/core/CssBaseline';
import { useForm } from 'react-hook-form';
import {useRouter} from 'next/router';
import {setNewUserPassword} from '../store/actions/authActions';

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

function Reset_password() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { isLoading, msg } = useSelector((state) => state.auth);
  const router = useRouter();

  const { register, handleSubmit, errors } = useForm();

  function isEmpty(obj) {
    return Object.keys(obj).length === 0;
}

  console.log(router.query);

  const {token_valid, message, uidb64, token} = router.query;
  console.log(token_valid);
  console.log(uidb64);

  const onSubmit = async(data) => {
    console.log(data)
    if(data.password !== data.confirm_password){
      alert('password not equal, try again ')
      return
    }
    console.log(data);
      const alldata = {
        password: data.password,
        token: token,
        uidb64: uidb64
        };
    await dispatch(setNewUserPassword(alldata))
  };

  
  return (
    <div className={classes.root}>
      <CssBaseline/>
      <>
      {msg ? <Alert key={new Date()} payload={msg} /> : null}
      <div className={classes.bgImage}>
        <div class="account-pages pt-5">
          <div class="container mt-3">
            <div class="row justify-content-center">
              <div class="col-md-8 col-lg-6 col-xl-5">
                <div class="text-center">
                  <h4 class="text-white mt-2 mb-4"> Muna Dashboard</h4>
                </div>
                <div class="card">
                  <div class="card-body p-4">
                  {router.query===null || router.query===undefined || isEmpty(router.query) ? <h3>You are not permitted to view this page</h3> :
                  <>
                    <div class="text-center mb-4">
                      <h4 class="text-uppercase mt-0">Reset Password</h4>
                    </div>
                    {token_valid==="True" ? 
                    <form onSubmit={handleSubmit(onSubmit)}>
                      <div class="form-group mb-3">
                        <label for="password">Password</label>
                        <input
                          class="form-control"
                          type="password"
                          name="password"
                          id="password"
                          placeholder="Enter your password"
                          ref={register({ required: true, minLength: 7 })}
                        />
                        {errors.password && (
                          <span className={classes.errorMsg}>
                          This field is required {errors.password.type === 'minLength' && 'and min length of 7'}
                          </span>
                        )}
                      </div>
                      <div class="form-group mb-3">
                        <label for="confirm_password">Confirm Password</label>
                        <input
                          class="form-control"
                          type="password"
                          name="confirm_password"
                          id="confirm_password"
                          placeholder="Confirm Password"
                          ref={register({ required: true, minLength: 7 })}
                        />
                        {errors.confirm_password && (
                          <span className={classes.errorMsg}>
                            This field is required {errors.confirm_password.type === 'minLength' && 'and min length of 7'}
                          </span>
                        )}
                      </div>
                      <div class="form-group mb-0 text-center">
                        <button class="btn btn-primary btn-block" type="submit">
                          Submit
                        </button>
                      </div>
                    </form>
                    :
                    <>
                     <h3>Timeout</h3>
                     <br/>
                     <h4>Please try resetting your password again</h4>
                     </>}
                     </>
                    }
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      </>
    </div>
  );
}

export default Reset_password;
