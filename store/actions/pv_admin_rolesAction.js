import * as types from "./actionTypes";
import { alertMessage, toggleIsLoading, logout } from './authActions';
import {
  FetchFMRoles,
  CreatePVRoles,
  UpdatePVRoles,
  DeletePVRoles
} from '../../services/fm_roleService';

export const getFMRoles = () => {
  return async (dispatch) => {
    await dispatch(toggleIsLoading())
    FetchFMRoles()
      .then(async (result) => {
        dispatch({
          type: types.FETCH_PROVERB_ADMIN_ROLES,
          payload: result.data
        });
        await dispatch(toggleIsLoading())
      })
      .catch((err) => {
        if (err && err.response.status == '401') {
          dispatch(alertMessage('Token Expired, Not Authorized', 'FAILURE'));
          dispatch(logout())
        }
        if (err && err.response.status == '400') {
          dispatch(alertMessage('Bad Request', 'FAILURE'));
        }
        else {
          dispatch(alertMessage('ERROR FOUND', 'FAILURE'));
        }
        dispatch(toggleIsLoading());
      });
  };
};


export const createPVRoles = (payload) => {
  return async (dispatch) => {
    await dispatch(toggleIsLoading())
    CreatePVRoles(payload)
      .then(async (result) => {
        if (result.status === 201) {
          console.log(result);
          dispatch({
            type: types.CREATE_PROVERB_ADMIN_ROLES,
            payload: result.data
          });
          dispatch(alertMessage('Role created successfully', 'SUCCESS'));
          dispatch(toggleIsLoading())
        }

      })
      .catch((err) => {
        if (err && err.response.status == '401') {
          dispatch(alertMessage('Token Expired, Not Authorized', 'FAILURE'));
          dispatch(logout())
        }
        if (err && err.response.status == '400') {
          dispatch(alertMessage('Bad Request', 'FAILURE'));
        }
        else {
          dispatch(userAlertAction('ERROR FOUND', 'FAILURE'));
        }
        dispatch(toggleIsLoading());
      });
  };
};


export const updatePVRoles = (data) => {
  return async dispatch => {
    await dispatch(toggleIsLoading());
    UpdatePVRoles(data)
      .then(async result => {
        console.log(result);
        if (result.status === 200) {
          console.log(result.data)
          dispatch({
            type: types.UPDATE_PROVERB_ADMIN_ROLES,
            payload: result.data
          });
          dispatch(alertMessage("Role updated successfully", 'SUCCESS'));
        }
        dispatch(toggleIsLoading());
      }).catch((err) => {
        if (err && err.response.status == '401') {
          dispatch(alertMessage('Token Expired, Not Authorized', 'FAILURE'));
          dispatch(logout())
        }
        if (err && err.response.status == '400') {
          dispatch(alertMessage('Bad Request', 'FAILURE'));
        }
        else {
          dispatch(alertMessage("Unable to update successfully", 'FAILURE'));
        }
        dispatch(toggleIsLoading())
      });
  }
}


export const deletePVRoles = (data) => {
  console.log(data);
  return async dispatch => {
    await dispatch(toggleIsLoading())
    DeletePVRoles(data)
      .then(async result => {
        console.log(result)
        if (result.status === 204) {
          dispatch({
            type: types.DELETE_PROVERB_ADMIN_ROLES,
            payload: data
          });
          dispatch(alertMessage("Role successfully deleted", 'SUCCESS'));
        } else if (result.status === 401) {
          dispatch(logout('Unauthorized Access'));
        } else {
          dispatch(alertMessage(result.data.name, 'FAILURE'));
        }
        dispatch(toggleIsLoading());
      }).catch((err) => {
        if (err && err.response.status == '401') {
          dispatch(alertMessage('Token Expired, Not Authorized', 'FAILURE'));
          dispatch(logout())
        }
        if (err && err.response.status == '400') {
          dispatch(alertMessage('Bad Request', 'FAILURE'));
        }
        else {
          dispatch(alertMessage("unable to delete successfully", 'FAILURE'));
        }
        dispatch(toggleIsLoading())
      });
  }
}