import * as types from "../actions/actionTypes";

const initialState = {
  isLoading: false,
  result: null,
  selectedProverb: [],
  proverbMsg: null,
  proverbs: [],
};

const correctReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.TOGGLE_ISLOADING:
      return {
        ...state,
        isLoading: !state.isLoading,
      };

    case types.CLEAR_PROVERB_MSG:
      return {
        ...state,
        proverbMsg: null,
      };

    case types.ADD_CORRECTED_PROVERBS:
      return {
        ...state,
        proverbs: action.payload,
      };

    case types.ADD_SUGGESTED_CORRECTION:
      return {
        ...state,
        selectedProverb: action.payload,
      };

    case types.SEARCH_PROVERB:
      return {
        ...state,
        searchResult: action.payload,
      };

    case types.UPDATE_PROVERB:
      const { data } = action.payload;
      return {
        ...state,
        selectedProverb: data,
      };

    case types.CLEAR_MSG:
      return {
        ...state,
        proverbMsg: null,
        isLoading: false,
      };

    default:
      return state;
  }
};

export default correctReducer;
