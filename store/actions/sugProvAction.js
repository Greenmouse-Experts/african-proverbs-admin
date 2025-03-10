import * as types from "./actionTypes";
import {
  fetchSuggestProverb,
  Approve,
  UpdateSuggestProverb,
  SearchProverb,
  DeleteSuggestion,
} from "../../services/sugProvService";
import { logout, alertMessage } from "./authActions";

export const searchProverb = (status, page) => {
  return async (dispatch) => {
    try {
      dispatch(toggleIsLoading());

      const result = await SearchProverb(status, page);

      if (result.status === 200) {
        console.log("getting preview", result.data);
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

export const fetchProverbspreview = (status, page) => {
  return async (dispatch) => {
    try {
      dispatch(toggleIsLoading());

      const result = await fetchSuggestProverb(status, page);

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

export const updateSuggestProverb = (payload, id) => {
  return async (dispatch) => {
    try {
      const result = await UpdateSuggestProverb(payload, id);
      if (result.status === 201 || result.status === 200) {
        dispatch(alertMessage(" Updated Successfully", "SUCCESS"));
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

export const deleteSuggestion = (id) => {
  return async (dispatch) => {
    try {
      const result = await DeleteSuggestion(id);
      if (result.status === 204 || result.status === 200) {
        dispatch(alertMessage(" Proverb deleted successfully", "SUCCESS"));
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

export const PublishSuggestion = (payload, id) => {
  return async (dispatch) => {
    try {
      const result = await Approve(payload, id);

      if (result.status === 200 || result.status === 201) {
        dispatch(alertMessage(" Suggestion Published Successfully", "SUCCESS"));
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
    type: types.ADD_SUGGESTED_PROVERBS,
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
