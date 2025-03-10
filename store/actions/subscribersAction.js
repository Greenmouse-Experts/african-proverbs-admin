
import { fetchActiveSubscribersBackend } from "@/services/subscribersService";
import * as types from "./actionTypes";
import { alertMessage, logout } from "./authActions";


export const addFetchedSubscribers = (data) => {
    return {
        type: types.FETCH_ACTIVE_SUBSCRIBERS,
        payload: data
    }
};

export const addActiveSubscriberStatus = (id)=>{
  return {
    type:types.ADD_ACTIVE_SUBSCRIBERS_STATUS,
    payload:id
  }
}



export const fetchSubscribers = () => {
    return async (dispatch) => {
      try {
        console.log('first')
        const result = await fetchActiveSubscribersBackend();
  
        if (result.status === 200) {
          const { data } = result;
          dispatch(addFetchedSubscribers(data.content)); // Dispatch your action here
        } else if (result.status === 401) {
          dispatch(logout('Unauthorized Access'));
        } else if (result.status === 400) {
          dispatch(alertMessage('Bad Request', 'FAILURE'));
        }
      } catch (error) {
        if (error.response && error.response.status === 401) {
          dispatch(alertMessage('Token Expired, Not Authorized', 'FAILURE'));
          dispatch(logout());
        } else {
          dispatch(alertMessage('Error, Please contact Admin', 'FAILURE'));
        }
      } 
    };
  };