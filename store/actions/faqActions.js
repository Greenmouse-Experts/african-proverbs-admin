import * as types from "./actionTypes";
import {
  AddFaQ,
  DeleteFaqBackend,
  UpdateFaqBackend,
  fetchFaqBAckend,
} from "@/services/faqService";
import { alertMessage, logout, toggleIsLoading } from "./authActions";

export const addFetchedFaqs = (data) => {
  return {
    type: types.ADD_FETCHED_FAQS,
    payload: data,
  };
};

export const updateFAQ = (data) => {
  return {
    type: types.UPDATE_FAQ,
    payload: data,
  };
};

export const deleteFaq = (data) => {
  return {
    type: types.DELETE_FAQ,
    payload: data,
  };
};

export const orderFaq = (orderBy) => {
  return {
    type: types.ORDER_FAQS,
    payload: orderBy,
  };
};

// async redux
export const createFAQ = (payload) => {
  return async (dispatch) => {
    AddFaQ(payload)
      .then(async (result) => {
        if (result.status === 200) {
          dispatch(alertMessage("FAQ Successfully Added", "SUCCESS"));
        }
      })
      .catch((err) => {
        // console.log(err);
        if (err.response) {
          if (err.response.status == "401") {
            dispatch(alertMessage("Token Expired, Not Authorized", "FAILURE"));
            dispatch(logout());
          } else if (err.response.status == "400") {
            dispatch(alertMessage("Bad Request", "FAILURE"));
          } else if (err.response.status == "500") {
            dispatch(alertMessage("Server down, Try Again", "FAILURE"));
          }
        } else if (err.request) {
          dispatch(alertMessage("Error, Please contact Admin", "FAILURE"));
        } else {
          dispatch(alertMessage("Error Connecting to the internet", "FAILURE"));
        }
      });
  };
};

export const fetchFaqs = () => {
  return async (dispatch) => {
    try {
      const result = await fetchFaqBAckend();

      if (result.status === 200) {
        const { data } = result;
        // console.log(data)
        dispatch(addFetchedFaqs(data)); // Dispatch your action here
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

export const deleteFaqsFromBackend = (id) => {
  return async (dispatch) => {
    try {
      const result = await DeleteFaqBackend(id);
      if (result.status === 200) {
        dispatch(deleteFaq(id)); // Dispatch your action here
        dispatch(alertMessage("Faq Deleted Successfully", "SUCCESS"));
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

export const updateFaqsFromBackend = (payload) => {
  return async (dispatch) => {
    UpdateFaqBackend(payload)
      .then(async (result) => {
        if (result.status === 200) {
          dispatch(alertMessage("Faq updated Successfully", "SUCCESS"));
          // console.log(result)
        }
      })
      .catch((err) => {
        if (err.response) {
          if (err.response.status == "401") {
            dispatch(alertMessage("Token Expired, Not Authorized", "FAILURE"));
            dispatch(logout());
          } else if (err.response.status == "400") {
            dispatch(alertMessage("Bad Request", "FAILURE"));
          }
        } else if (err.request) {
          dispatch(alertMessage("Error, Please contact Admin", "FAILURE"));
        } else {
          dispatch(alertMessage("Error Connecting to the internet", "FAILURE"));
        }
      });
  };
};
