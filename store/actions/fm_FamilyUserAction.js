import * as actionTypes from './actionTypes';
import {
    FetchFMUserService,
    UpdateFMUserService,
    CreateFMUserService,
    DeleteFMUserService,
    GetEachFMUserService,
} from '@/services/fm_UserService';
import { logout, alertMessage, toggleIsLoading } from './authActions';

// DESC: Fetch Users
export const fethUserAction = () => {
    return (dispatch) => {
        FetchFMUserService()
            .then(async (result) => {
                dispatch({
                    type: actionTypes.FETCH_FAMILYADMIN_USERS,
                    payload: result.data,
                });
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

// DESC: Fetch Each User
export const fetchEachUser = (id) => {
    return async (dispatch) => {
        await dispatch({
            type: actionTypes.CLEAR_SELECTED_FAMILYADMIN_USER,
        });
        GetEachFMUserService(id)
            .then(async (result) => {
                dispatch({
                    type: actionTypes.FETCH_EACH_FAMILYADMIN_USER,
                    payload: result.data,
                });
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

// DESC: Update User
export const updateUserAction = (payload, urlID) => {
    return async (dispatch) => {
        UpdateFMUserService(payload, urlID)
            .then(async (result) => {
                dispatch({
                    type: actionTypes.UPDATE_FAMILYADMIN_USER,
                    payload: result.data,
                });
                dispatch(userAlertAction('SUCCESSFUl', 'SUCCESS'));
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

// DESC: Create new User
export const createUserAction = (payload) => {
    return async (dispatch) => {
        CreateFMUserService(payload)
            .then(async (result) => {
                console.log(result);
                dispatch({
                    type: actionTypes.CREATE_FAMILYADMIN_USER,
                    payload: result.data,
                });
                dispatch(userAlertAction('SUCCESSFUl', 'SUCCESS'));
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

export const deleteUser = (id) => (dispatch) => {
    DeleteFMUserService(id)
        .then(async (result) => {
            console.log(result);
            dispatch({
                type: actionTypes.DELETE_FAMILYADMIN_USER,
                payload: id,
            });
            dispatch(userAlertAction('SUCCESSFUl', 'SUCCESS'));
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

// DESC: Alert Setting and Claering
const userAlertAction = (msg, type) => (dispatch) => {
    dispatch({
        type: actionTypes.USER_FAMILYADMIN_ALERT,
        payload: { msg, type },
    });

    setTimeout(() => {
        dispatch({
            type: actionTypes.CLEAR_FAMILYADMIN_ALERT,
        });
    }, 4000);
};
