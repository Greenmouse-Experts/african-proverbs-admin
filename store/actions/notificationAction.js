import * as types from "./actionTypes";
import { toggleIsLoading, alertMessage } from './authActions';
import { CreateNotification } from '@/services/notificationService';

export const createPushNotifications = (data) => {
    return {
        type: types.SEND_NOTIFICATION_REQUEST,
        payload: data
    }
}

export const createNotification = (payload) => {
    return async dispatch => {
        await dispatch(toggleIsLoading())
        CreateNotification(payload)
            .then(async result => {

                if (result.status === 201 || result.status === 200) {
                    const data = result.data;

                    dispatch(createPushNotifications(data));
                    dispatch(toggleIsLoading());
                    dispatch(alertMessage("Notification sent succesfully", 'SUCCESS'))
                } else if (result.status === 401) {
                    dispatch(logout('Unauthorized Access'));
                    dispatch(toggleIsLoading());
                } else {
                    dispatch(alertMessage(result.data.name, 'FAILURE'));
                    dispatch(toggleIsLoading())
                }
            }).catch((err) => {
                
                if (err && err.response.status == '401') {
                    dispatch(alertMessage('Token Expired, Not Authorized', 'FAILURE'));
                    dispatch(logout())
                }
                if (err && err.response.status == '400') {
                    dispatch(alertMessage('Bad Request', 'FAILURE'));
                }
                dispatch(toggleIsLoading())
            });

    }
}