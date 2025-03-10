import {
  FetchAllQuestions,
  FetchEthnicQuestions,
  postNewQuestion,
  FetchOptions,
  postNewOption,
  deleteOption,
  updateQuestionOption,
  deleteMappedQuestion,
  findEthnicQuestion,
} from "@/services/questionMappingService";
import { alertMessage, logout, toggleIsLoading } from "./authActions";
import * as types from "./actionTypes";
import { sliceStringUpToWord } from "@/utils/utilities";

export const getEthnicMappedQuestion = (mappedQuestionData) => {
  return {
    type: types.FETCH_ETHNIC_MAPPED_QUESTIONS,
    payload: mappedQuestionData,
  };
};

export const getOptions = (data) => {
  return {
    type: types.FETCH_QUESTION_OPTIONS,
    payload: data,
  };
};

export const getQuestion = (data) => {
  return {
    type: types.FETCH_SINGLE_QUESTION,
    payload: data,
  };
};

export const fetchEthnicMappedQuestion = (query) => {
  return async (dispatch) => {
    try {
      const [result1] = await Promise.all([FetchEthnicQuestions(query)]);

      if (result1.status === 200) {
        const ethnicQuestions = result1.data;

        dispatch(getEthnicMappedQuestion(ethnicQuestions));
      }
    } catch (error) {
      console.log(error.message);
      dispatch(alertMessage("Error Fetching Mapped Questions", "FAILURE"));
      error;
    }
  };
};

export const AdminsavemappedquestionHandler = (payload) => async (dispatch) => {
  postNewQuestion(payload)
    .then(async (data) => {
      console.log(data);
      if (data.status === 200) {
        dispatch({
          type: types.IS_QUESTION_SAVED,
          // payload: userData,
        });

        dispatch(alertMessage(data.data.message, "SUCCESS"));
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
      if (err && err.response.status == "500") {
        dispatch(alertMessage(err.response.data.userMessages, "FAILURE"));
      }
      dispatch(toggleIsLoading());
    });
};

export const fetchAllOptions = (id) => {
  return async (dispatch) => {
    await dispatch(toggleIsLoading());
    try {
      const [result1, result2] = await Promise.all([
        FetchOptions(id),
        findEthnicQuestion(id),
      ]);

      if (result1.status === 200 && result2.status === 200) {
        const data = result1.data;
        const data2 = result2.data;
        await dispatch(getOptions(data));
        await dispatch(getQuestion(data2));
        dispatch(toggleIsLoading());
      } else {
        dispatch(alertMessage("Error Fetching Options", "FAILURE"));
      }
    } catch (error) {
      console.log(error.message);
      dispatch(alertMessage("Error Fetching Options", "FAILURE"));
      error;
    }
    // FetchOptions(id)
    //   .then(async (result) => {
    //     if (result.status === 200) {
    //       const data = result.data;
    //       // console.log(data);
    //       await dispatch(getOptions(data));
    //       dispatch(toggleIsLoading());
    //     } else {
    //       dispatch(alertMessage("Error Fetching Options", "FAILURE"));
    //     }
    //   })
    //   .catch((error) => {
    //     console.log(error.message);
    //     dispatch(alertMessage("Error Fetching Options", "FAILURE"));
    //     error;
    //   });
  };
};

export const SaveQuestionOptions = (payload) => async (dispatch) => {
  postNewOption(payload)
    .then(async (data) => {
      if (data.status === 200) {
        dispatch({
          type: types.IS_OPTION_SAVED,
          // payload: userData,
        });

        dispatch(alertMessage("Option Saved Successfully", "SUCCESS"));
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
      if (err && err.response.status == "500") {
        const result = sliceStringUpToWord(err.response.data, "for");
        dispatch(alertMessage(result, "FAILURE"));
      }
      dispatch(toggleIsLoading());
    });
};

export const deleteOptionData = (id) => async (dispatch) => {
  deleteOption(id)
    .then(async (data) => {
      if (data.status === 200) {
        dispatch({
          type: types.IS_OPTION_DELETED,
          // payload: userData,
        });

        dispatch(alertMessage(data.data, "SUCCESS"));
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

export const deleteQueston = (id) => async (dispatch) => {
  deleteMappedQuestion(id)
    .then(async (data) => {
      if (data.status === 200) {
        dispatch({
          type: types.IS_QUESTION_DELETED,
          // payload: userData,
        });

        dispatch(alertMessage(data.data.message, "SUCCESS"));
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

export const UpdateQuestionOptions = (payload) => async (dispatch) => {
  updateQuestionOption(payload)
    .then(async (data) => {
      if (data.status === 200) {
        dispatch({
          type: types.IS_OPTION_SAVED,
          // payload: userData,
        });
        dispatch(alertMessage("Option Updated Successfully", "SUCCESS"));
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
      if (err && err.response.status == "500") {
        const result = sliceStringUpToWord(err.response.data, "for");
        dispatch(alertMessage(result, "FAILURE"));
      }
      dispatch(toggleIsLoading());
    });
};
