import * as types from "./actionTypes";
import {
  fetchCorrectProverb,
  fetchSelected,
  SearchProverb,
  Approve,
  updateCorrection,
} from "../../services/correctProverbsServices";
import { logout, alertMessage } from "./authActions";

export const searchProverb = (status) => {
  return async (dispatch) => {
    try {
      dispatch(toggleIsLoading());

      const result = await SearchProverb(status);

      if (result.status === 200) {
        const { data } = result;
        dispatch(addFetchedProverbs(data));
      } else if (result.status === 401) {
        dispatch(logout("Unauthorized Access"));
      } else {
        dispatch(alertMessage("COULD NOT FETCH DATA", "ERROR"));
      }
      dispatch(toggleIsLoading());
    } catch (err) {
      if (err.response) {
        if (err.response.status === 401) {
          dispatch(alertMessage("Token Expired, Not Authorized", "FAILURE"));
          dispatch(logout());
        } else if (err.response.status === 400) {
          dispatch(alertMessage("Bad Request", "FAILURE"));
        }
      } else if (err.request) {
        dispatch(alertMessage("Error, Please contact Admin", "FAILURE"));
      } else {
        dispatch(alertMessage("Error Connecting to the internet", "FAILURE"));
      }
      dispatch(toggleIsLoading());
    }
  };
};

export const fetchProverbspreview = (payload, pageNumber) => {
  return async (dispatch) => {
    try {
      dispatch(toggleIsLoading());
      const result = await fetchCorrectProverb(payload, pageNumber);
      if (result.status === 200) {
        const { data } = result;
        dispatch(addFetchedProverbs(data));
      } else if (result.status === 401) {
        dispatch(logout("Unauthorized Access"));
      } else {
        dispatch(alertMessage("COULD NOT FETCH DATA", "ERROR"));
      }
      dispatch(toggleIsLoading());
    } catch (err) {
      if (err.response) {
        if (err.response.status === 401) {
          dispatch(alertMessage("Token Expired, Not Authorized", "FAILURE"));
          dispatch(logout());
        } else if (err.response.status === 400) {
          dispatch(alertMessage("Bad Request", "FAILURE"));
        }
      } else if (err.request) {
        dispatch(alertMessage("Error, Please contact Admin", "FAILURE"));
      } else {
        dispatch(alertMessage("Error Connecting to the internet", "FAILURE"));
      }
      dispatch(toggleIsLoading());
    }
  };
};

export const fetchSelectedCorrection = (id) => {
  return async (dispatch) => {
    try {
      const result = await fetchSelected(id);
      if (result.status === 200) {
        const { data } = result;
        dispatch(addFetchedCorrection(data));
      } else if (result.status === 401) {
        dispatch(logout("Unauthorized Access"));
      } else if (result.status === 400) {
        dispatch(alertMessage("Bad Request", "FAILURE"));
      }
    } catch (error) {
      if (error.response && error.response.status === 401) {
        dispatch(alertMessage("Token Expired, Not Authorized", "FAILURE"));
        dispatch(logout());
      } else {
        dispatch(alertMessage("Error, Please contact Admin", "FAILURE"));
      }
    }
  };
};

export const ApproveCorrection = (payload) => {
  return async (dispatch) => {
    try {
      const result = await Approve(payload);
      if (result.status === 200) {
        dispatch(alertMessage("Correction Approved Successfully", "SUCCESS"));
      } else if (result.status === 401) {
        dispatch(logout("Unauthorized Access"));
      } else if (result.status === 400) {
        dispatch(alertMessage("Bad Request", "FAILURE"));
      }
    } catch (error) {
      if (error.response && error.response.status === 401) {
        dispatch(alertMessage("Token Expired, Not Authorized", "FAILURE"));
        dispatch(logout());
      } else {
        dispatch(alertMessage("Error, Please contact Admin", "FAILURE"));
      }
    }
  };
};

export const UpdateCorrection = (payload) => {
  return async (dispatch) => {
    try {
      const result = await updateCorrection(payload);
      if (result.status === 200) {
        dispatch(alertMessage("Correction Updated Successfully", "SUCCESS"));
      } else if (result.status === 401) {
        dispatch(logout("Unauthorized Access"));
      } else if (result.status === 400) {
        dispatch(alertMessage("Bad Request", "FAILURE"));
      }
    } catch (error) {
      if (error.response && error.response.status === 401) {
        dispatch(alertMessage("Token Expired, Not Authorized", "FAILURE"));
        dispatch(logout());
      } else {
        dispatch(alertMessage("Error, Please contact Admin", "FAILURE"));
      }
    }
  };
};

export const addFetchedProverbs = (data) => {
  return {
    type: types.ADD_CORRECTED_PROVERBS,
    payload: data,
  };
};

export const addFetchedCorrection = (data) => {
  return {
    type: types.ADD_SUGGESTED_CORRECTION,
    payload: data,
  };
};

export const clearProverbMsg = () => {
  return {
    type: types.CLEAR_PROVERB_MSG,
  };
};

export const saveProverbs = (payload) => {
  return {
    type: types.SAVE_PROVERBS,
    payload: payload,
  };
};

export const updateProverbs = (payload) => {
  return {
    type: types.UPDATE_SUGGESTED_PROVERB,
    payload: payload,
  };
};

export const dashBoardAction = (payload) => {
  return {
    type: types.DASHBOARD_COUNT,
    payload: payload,
  };
};

// @Desc: Clear an alert message for an update
export const clearMsg = () => {
  return {
    type: types.CLEAR_MSG,
  };
};

export const toggleIsLoading = () => {
  return {
    type: types.TOGGLE_ISLOADING,
  };
};
