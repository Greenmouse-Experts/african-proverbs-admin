import * as types from "../actions/actionTypes";

const initialState = {
  contentData: null,
  page: null,
  isQuestionMappingLoading: true,
  size: null,
  totalElements: null,
  totalPages: null,
  allQuestion: null,
  isQuestionSaved: false,
  questionOptions: null,
  isOptionSaved: false,
  isOptionDeleted: false,
  isQuestionDeleted: false,
  singleQuestion: null,
};

const QuestionMapping = (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case types.FETCH_ETHNIC_MAPPED_QUESTIONS:
      const {
        totalElements,
        content,
        totalPages,
        size,
        page,
        empty,
        first,
        last,
      } = action.payload;

      return {
        ...state,
        contentData: [...content],
        totalElements,
        totalPages,
        size,
        page,
        isQuestionMappingLoading: false,
      };
    case types.IS_QUESTION_SAVED:
      return {
        ...state,
        isQuestionSaved: !state.isQuestionSaved,
      };
    case types.FETCH_QUESTION_OPTIONS:
      return {
        ...state,
        questionOptions: payload,
      };
    case types.FETCH_SINGLE_QUESTION:
      return {
        ...state,
        singleQuestion: payload,
      };
    case types.CLEAR_CONTENT:
      return {
        ...state,
        contentData: null,
      };
    case types.IS_OPTION_SAVED:
      return {
        ...state,
        isOptionSaved: !state.isOptionSaved,
      };
    case types.IS_OPTION_DELETED:
      return {
        ...state,
        isOptionDeleted: !state.isOptionDeleted,
      };
    case types.IS_QUESTION_DELETED:
      return {
        ...state,
        isQuestionDeleted: !state.isQuestionDeleted,
      };
    default:
      return state;
  }
};

export default QuestionMapping;
