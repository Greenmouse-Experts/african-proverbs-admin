import * as actionTypes from './actionTypes';
import {
  fetchUserService,
  updateUserService,
  createUserService,
  Fetchroleservice,
  deleteUserService,
  getEachUserService,
} from '../../services/userService';
import { logout, alertMessage, toggleIsLoading } from './authActions';

// DESC: Fetch Users
export const fethUserAction = () => {
  return (dispatch) => {
    fetchUserService()
      .then(async (result) => {
        dispatch({
          type: actionTypes.FETCH_USERS,
          payload: result.data,
        });
      })
      .catch((err) => {
        if(err && err.response.status == '401'){
          dispatch(alertMessage('Token Expired, Not Authorized', 'FAILURE'));
          dispatch(logout())
        }
        if(err && err.response.status == '400'){
          dispatch(alertMessage('Bad Request', 'FAILURE'));
        }
        else{
          dispatch(userAlertAction('ERROR FOUND', 'FAILURE'));
        }
        dispatch(toggleIsLoading());        
      });
  };
};

// DESC: Fetch Each User
export const fetchEachUser = (id) => {
  return async (dispatch) => {
    await dispatch({
      type: actionTypes.CLEAR_SELECTED_USER,
    });
    getEachUserService(id)
      .then(async (result) => {
        dispatch({
          type: actionTypes.FETCH_EACH_USER,
          payload: result.data,
        });
      })
      .catch((err) => {
        if(err && err.response.status == '401'){
          dispatch(alertMessage('Token Expired, Not Authorized', 'FAILURE'));
          dispatch(logout())
        }
        if(err && err.response.status == '400'){
          dispatch(alertMessage('Bad Request', 'FAILURE'));
        }
        else{
          dispatch(userAlertAction('ERROR FOUND', 'FAILURE'));
        }
        dispatch(toggleIsLoading());  
      });
  };
};

// DESC: Update User
export const updateUserAction = (payload, urlID) => {
  return async (dispatch) => {
    updateUserService(payload, urlID)
      .then(async (result) => {
        dispatch({
          type: actionTypes.UPDATE_USER,
          payload: result.data,
        });
        dispatch(userAlertAction('SUCCESSFUl', 'SUCCESS'));
      })
      .catch((err) => {
        if(err && err.response.status == '401'){
          dispatch(alertMessage('Token Expired, Not Authorized', 'FAILURE'));
          dispatch(logout())
        }
        if(err && err.response.status == '400'){
          dispatch(alertMessage('Bad Request', 'FAILURE'));
        }
        else{
          dispatch(userAlertAction('ERROR FOUND', 'FAILURE'));
        }
        dispatch(toggleIsLoading());  
      });
  };
};

// DESC: Create new User
export const createUserAction = (payload) => {
  return async (dispatch) => {
    createUserService(payload)
      .then(async (result) => {
        console.log(result);
        dispatch({
          type: actionTypes.CREATE_USER,
          payload: result.data,
        });
        dispatch(userAlertAction('SUCCESSFUl', 'SUCCESS'));
      })
      .catch((err) => {
        if(err && err.response.status == '401'){
          dispatch(alertMessage('Token Expired, Not Authorized', 'FAILURE'));
          dispatch(logout())
        }
        if(err && err.response.status == '400'){
          dispatch(alertMessage('Bad Request', 'FAILURE'));
        }
        else{
          dispatch(userAlertAction('ERROR FOUND', 'FAILURE'));
        }
        dispatch(toggleIsLoading());
      });
  };
};

export const deleteUser = (id) => (dispatch) => {
  deleteUserService(id)
    .then(async (result) => {
      console.log(result);
      dispatch({
        type: actionTypes.DELETE_USER,
        payload: id,
      });
      dispatch(userAlertAction('SUCCESSFUl', 'SUCCESS'));
    })
    .catch((err) => {
      if(err && err.response.status == '401'){
        dispatch(alertMessage('Token Expired, Not Authorized', 'FAILURE'));
        dispatch(logout())
      }
      if(err && err.response.status == '400'){
        dispatch(alertMessage('Bad Request', 'FAILURE'));
      }
      else{
        dispatch(userAlertAction('ERROR FOUND', 'FAILURE'));
      }
      dispatch(toggleIsLoading());
    });
};

export const fetchRoles = () => (dispatch) => {
  Fetchroleservice()
    .then(async (result) => {
      dispatch({
        type: actionTypes.FETCH_PERMISSION,
        payload: result.data,
      });
    })
    .catch((err) => {
      if(err && err.response.status == '401'){
        dispatch(alertMessage('Token Expired, Not Authorized', 'FAILURE'));
        dispatch(logout())
      }
      if(err && err.response.status == '400'){
        dispatch(alertMessage('Bad Request', 'FAILURE'));
      }
      else{
        dispatch(userAlertAction('ERROR FOUND', 'FAILURE'));
      }
      dispatch(toggleIsLoading());
    });
};

// DESC: Alert Setting and Claering
const userAlertAction = (msg, type) => (dispatch) => {
  dispatch({
    type: actionTypes.USER_ALERT,
    payload: { msg, type },
  });

  setTimeout(() => {
    dispatch({
      type: actionTypes.CLEAR_ALERT,
    });
  }, 4000);
};
