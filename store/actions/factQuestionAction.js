import * as types from "./actionTypes";
import {
  addQuestion,
  deleteQuestionBackend,
  updateQuestionBackend,
  fetchQuestionsBackend,
  questionByModification,
  searchAQuestionBackend,
  searchByKeywordBackend,
} from "@/services/factQuestionService";
import { alertMessage, logout } from "./authActions";

export const createQuestion = (payload) => {
  return async (dispatch) => {
    try {
      const result = await addQuestion(payload);

      if (result.status === 200) {
        dispatch(alertMessage("Question Successfully Created", "SUCCESS"));
      } else if (result.status === 401) {
        dispatch(logout("Unauthorized Access"));
      } else if (result.status === 400) {
        dispatch(alertMessage("Bad Request", "FAILURE"));
      }
    } catch (error) {
      console.log(error.response);
      if (error.response && error.response.status === 401) {
        dispatch(alertMessage("Token Expired, Not Authorized", "FAILURE"));
        dispatch(logout());
      } else {
        dispatch(alertMessage("Error, Please contact Admin", "FAILURE"));
      }
    }
  };
};

export const fetchQuestions = (pageNumber, type) => {
  return async (dispatch) => {
    try {
      const result = await fetchQuestionsBackend(pageNumber, type);
      if (result.status === 200) {
        const { data } = result;
        dispatch(addFetchedQuestions(data));
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

export const fetchModifiedQuestions = (pageNumber, type) => {
  return async (dispatch) => {
    try {
      const result = await questionByModification(pageNumber, type);
      if (result.status === 200) {
        const { data } = result;
        dispatch(addFetchedQuestions(data));
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

export const deleteQuestion = (id) => {
  return async (dispatch) => {
    try {
      const result = await deleteQuestionBackend(id);

      if (result.status === 200) {
        dispatch(alertMessage("Question Deleted Successfully", "SUCCESS"));
        await fetchQuestions();
      } else if (result.status === 401) {
        dispatch(logout("Unauthorized Access"));
      } else if (result.status === 400) {
        dispatch(alertMessage("Bad Request", "FAILURE"));
      }
    } catch (error) {
      if (error.response && error.response.status === 401) {
        console.log(error);
        dispatch(alertMessage("Token Expired, Not Authorized", "FAILURE"));
        dispatch(logout());
      } else {
        dispatch(alertMessage("Error, Please contact Admin", "FAILURE"));
      }
    }
  };
};

export const updateQuestion = (payload) => {
  return async (dispatch) => {
    try {
      const result = await updateQuestionBackend(payload);

      if (result.status === 200) {
        dispatch(alertMessage("Question Updated Successfully", "SUCCESS"));
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

export const searchQuestions = (pageNumber, type) => {
  return async (dispatch) => {
    try {
      dispatch(toggleIsLoading());

      const result = await searchAQuestionBackend(pageNumber, type);

      if (result.status === 200 || result.status === 201) {
        const { data } = result;
        dispatch(addFetchedQuestions(data));
        console.log("dispatched");
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

export const SearchByKeyword = (pageNumber, keyword, type) => {
  return async (dispatch) => {
    try {
      dispatch(toggleIsLoading());

      const result = await searchByKeywordBackend(pageNumber, keyword, type);

      if (result.status) {
        const { data } = result;
        dispatch(addFetchedQuestions(data));
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

export const addFetchedQuestions = (data) => {
  return {
    type: types.ADD_FETCHED_QUESTIONS,
    payload: data,
  };
};

export const orderQuestions = (orderBy) => {
  return {
    type: types.SORT_QUESTIONS,
    payload: orderBy,
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
