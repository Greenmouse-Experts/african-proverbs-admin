import * as types from "../actions/actionTypes";

const initialState = {
  contentData: null,
  page: null,
  isQuestionPropertyLoading: true,
  size: null,
  totalElements: null,
  totalPages: null,
  isQuestionSaved: false,
  isQuestionDeleted: false,
  //   allQuestion: null,
  //   isQuestionSaved: false,
  // questionOptions: null,
  //   isOptionDeleted: false,
  //   singleQuestion: null,
};

const QuestionProperty = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case types.FETCH_ALL_QUESTIONS_PROPERTY:
      return {
        ...state,
        contentData: payload.data.content,
        totalElements: payload.data.totalElements,
        totalPages: payload.data.totalPages,
      };
    case types.IS_QUESTION_PROPERTY_SAVED:
      return {
        ...state,
        isQuestionSaved: !state.isQuestionSaved,
      };
    case types.IS_QUESTION_PROPERTY_DELETED:
      return {
        ...state,
        isQuestionDeleted: !state.isQuestionDeleted,
      };
    default:
      return state;
  }
};

export default QuestionProperty;
