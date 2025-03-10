import * as types from "./actionTypes";
import { toggleIsLoading } from "./authActions";
import {
  AdminupdateUserProfile,
  FetchSubscribers,
  FetchSubscription,
  SearchSubscribers,
} from "../../services/subscriberService";
import { alertMessage, logout } from "./authActions";
import {
  generateSearchSubscriberURL,
  objectToQueryString,
} from "../../utils/utilities";

export const getSubscribers = (subscriptionData) => {
  return {
    type: types.FETCH_SUBSCRIBERS,
    payload: subscriptionData,
  };
};

export const getSubscription = (data) => {
  return {
    type: types.FETCH_SUBSCRIPTION,
    payload: data,
  };
};

// action creation
export const fetchSubscribers = (query) => {
  return async (dispatch) => {
    await dispatch(toggleIsLoading());
    FetchSubscribers(query)
      .then(async (result) => {
        if (result.status === 200) {
          const data = result.data;
          // console.log(data);
          await dispatch(getSubscribers(data));
          dispatch(toggleIsLoading());
        } else {
          dispatch(alertMessage("Error Fetching subscribers", "FAILURE"));
        }
      })
      .catch((error) => {
        dispatch(alertMessage("Error Fetching subscribers", "FAILURE"));
        error;
      });
  };
};

export const searchSubscribsers = (
  date_created,
  enddate,
  search,
  page,
  query
) => {
  return async (dispatch) => {
    await dispatch(toggleIsLoading());
    const url = "api/packages/search";
    var searchObjArray = generateSearchSubscriberURL(
      date_created,
      enddate,
      search
    );
    // combine array with paginate params page, size
    const combinedQueryObject = searchObjArray.reduce(
      (acc, obj) => ({ ...acc, ...obj }),
      query
    );
    const path = objectToQueryString(url, combinedQueryObject);

    SearchSubscribers(path)
      .then(async (result) => {
        if (result.status === 200) {
          const data = result.data;
          console.log(data);
          dispatch({
            type: types.SEARCH_SUBSCRIBERS,
            payload: data,
          });
        } else if (result.status === 401) {
          dispatch(logout("Unauthorized Access"));
        } else {
          dispatch(alertMessage("COULD NOT FETCH DATA", "ERROR"));
        }
        dispatch(toggleIsLoading());
        return;
      })
      .catch((err) => {
        if (err.response) {
          if (err.response.status == 401) {
            dispatch(alertMessage("Token Expired, Not Authorized", "FAILURE"));
            dispatch(logout());
          } else if (err.response.status == 400) {
            dispatch(alertMessage("Bad Request", "FAILURE"));
          }
        } else if (err.request) {
          dispatch(alertMessage("Error, Please contact Admin", "FAILURE"));
        } else {
          dispatch(alertMessage("Error Connecting to the internet", "FAILURE"));
        }
        dispatch(toggleIsLoading());
      });
  };
};

export const AdminupdateUserHandler =
  (formData, user_id) => async (dispatch) => {
    // console.log(formData);
    // console.log(user_id);
    await dispatch(toggleIsLoading());
    AdminupdateUserProfile(formData, user_id)
      .then(async (data) => {
        console.log(data);
        if (data.status === 200) {
          dispatch({
            type: types.ADMIN_UPDATE_USER,
            // payload: userData,
          });
          dispatch(alertMessage("Update Successful", "SUCCESS"));
        }
      })
      .catch((err) => {
        // console.log(err);
        if (err && err.response.status == "401") {
          dispatch(alertMessage("Token Expired, Not Authorized", "FAILURE"));
          dispatch(logout());
        }
        if (err && err.response.status == "400") {
          dispatch(alertMessage("Bad Request", "FAILURE"));
        }
        dispatch(toggleIsLoading());
      });
  };

export const fetchSubscription = (user_id) => {
  return async (dispatch) => {
    await dispatch(toggleIsLoading());
    FetchSubscription(user_id)
      .then(async (result) => {
        if (result.status === 200) {
          const data = result?.data;
          console.log(data);
          await dispatch(getSubscription(data));
          dispatch(toggleIsLoading());
        } else {
          dispatch(
            alertMessage("Not 200 Error Fetching Subscriptions", "FAILURE")
          );
        }
      })
      .catch((error) => {
        console.log(error.message);
        dispatch(alertMessage("Error Fetching Subscriptions", "FAILURE"));
        error;
      });
  };
};
