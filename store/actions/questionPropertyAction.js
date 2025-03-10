import {
  fetchallQuestions,
  saveQuestionProperty,
  deleteQuestion,
  updateQuestion,
  generateQuestionService,
  generateAllUsersQuestionService
} from "@/services/questionPropertyService";
import * as types from "./actionTypes";
import { alertMessage } from "./authActions";
import { sliceStringUpToWord } from "@/utils/utilities";
import { toggleIsLoading } from "./authActions";
import { reset } from "react-hook-form"

function getQuestionProperty(questionPropertyData) {
  return {
    type: types.FETCH_ALL_QUESTIONS_PROPERTY,
    payload: questionPropertyData,
  };
}



export const fetchAllQuestionPropery = (query) => {
  return async (dispatch) => {
    try {
      const [result1] = await Promise.all([fetchallQuestions(query)]);
      if (result1.status === 200) {
        const questionPropertyData = result1.data;
        // console.log(questionPropertyData);
        dispatch(getQuestionProperty(questionPropertyData));
      }
    } catch (error) {
      console.log(error.message);
      dispatch(alertMessage("Error Fetching Question Property", "FAILURE"));
      error;
    }
  };
};

export const saveQuestionPropertySetup = (payload) => {
  return async (dispatch) => {
    saveQuestionProperty(payload)
      .then(async (data) => {
        console.log(data);
        if (data.status === 200) {
          dispatch({
            type: types.IS_QUESTION_PROPERTY_SAVED,
            // payload: userData,
          });

          dispatch(
            alertMessage("Question Property Created Successfully", "SUCCESS")
          );
        }
      })
      .catch((err) => {
        // console.log(err);
        if (err && err.response.status == "401") {
          dispatch(alertMessage("Token Expired, Not Authorized", "FAILURE"));
          dispatch(logout());
        }
        if (err && err.response.status == "400") {
          dispatch(alertMessage(err.response.data.data.message, "FAILURE"));
        }
        if (err && err.response.status == "500") {
          dispatch(alertMessage(err.response.data.userMessages, "FAILURE"));
        }
      });
  };
};

export const deleteQuestonProperty = (id) => async (dispatch) => {
  deleteQuestion(id)
    .then(async (data) => {
      if (data.status === 200) {
        dispatch({
          type: types.IS_QUESTION_PROPERTY_DELETED,
          // payload: userData,
        });

        dispatch(alertMessage("Question Deleted Successfully", "SUCCESS"));
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

export const UpdateQuestionProperty = (payload, id) => async (dispatch) => {
  updateQuestion(payload, id)
    .then(async (data) => {
      if (data.status === 200) {
        dispatch({
          type: types.IS_QUESTION_PROPERTY_SAVED,
          // payload: userData,
        });
        dispatch(alertMessage("Question Property Updated", "SUCCESS"));
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
        console.log(err.response.data.error)
        const result = sliceStringUpToWord(err.response.data.error, "for");
        dispatch(alertMessage(result, "FAILURE"));
      }
    });
};


export const GenerateQuestionsAllUsers = (payload) => async (dispatch) => {
  generateAllUsersQuestionService(payload)
    .then(async (data) => {
      if (data.status === 200) {
        dispatch({
          type: types.GENERATE_QUESTION_ALL_USER,
        });
        dispatch(alertMessage(data?.data?.data, "SUCCESS"));

      }
    })
    .catch((err) => {
      if (err && err.response.status == "401") {
        dispatch(alertMessage("Token Expired, Not Authorized", "FAILURE"));
        dispatch(logout());
      }
      if (err && err.response.status == "400") {
        dispatch(alertMessage("Bad Request", "FAILURE"));
      }
      if (err && err.response.status == "404") {
        dispatch(alertMessage("Bad Request", "FAILURE"));
      }
      if (err && err.response.status == "500") {
        const result = sliceStringUpToWord(err.response.data, "for");
        dispatch(alertMessage(result, "FAILURE"));
      }
    });
};


export const GenerateQuestions = (payload, userId) => async (dispatch) => {
  try {

    const data = await generateQuestionService(payload, userId);
    if (data.status === 200) {
      dispatch({
        type: types.GENERATE_QUESTION_A_USER,
      });
      dispatch(alertMessage("Question Generated Successfully", "SUCCESS"));
    }
  } catch (error) {
    if (error && error.response.status === 401) {
      dispatch(alertMessage("Token Expired, Not Authorized", "FAILURE"));
      dispatch(logout());
    }
    if (error && error?.response?.status === 400) {
      dispatch(alertMessage(error?.response?.data?.data?.message, "FAILURE"));
    }
    if (error && error.response.status === 500) {
      const result = sliceStringUpToWord(error?.response?.data?.data?.message, "for");
      dispatch(alertMessage(result, "FAILURE"));
    }
  }
};
