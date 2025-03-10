import * as types from "../actions/actionTypes";

// Helper function for deleting
const deleteQuestion = (questions = [], id) => {
  // Confirm the package is in the array of packages
  const questionWithId = questions.find((question) => question.id === id);

  // Remove it if found
  if (questionWithId) {
    const questionsWithoutDeletedQuestion = questions.filter(
      (question) => question.id !== id
    );
    return questionsWithoutDeletedQuestion;
  }

  return questions;
};

// Helper function for ordering packages
const orderQuestions = (questions = [], orderBy) => {
  if (orderBy === "alphabet") {
    return questions.sort((a, b) => a.name.localeCompare(b.name));
  }

  return questions;
};

const initialState = {
  isLoading: false,
  questions: [],
  formData: {},
};

const questionReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.DELETE_QUESTION:
      return {
        ...state,
        questions: deleteQuestion(state.questions, action.payload),
      };
    case types.SORT_QUESTIONS:
      return {
        ...state,
        questions: orderPackages(state.questions, action.payload),
      };
    case types.ADD_FETCHED_QUESTIONS:
      return { ...state, questions: action.payload };
    case types.UPDATE_FORM_DATA:
      return {
        ...state,
        questions: action.payload,
      };
    default:
      return state;
  }
};

export default questionReducer;
