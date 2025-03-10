import * as types from "../actions/actionTypes";

const initialState = {
  isLoading: false,
  result: null,
  selectedProverb: null,
  proverbMsg: null,
  proverbs: [],
};

const sugReducer = (state = initialState, action) => {
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

    case types.ADD_SUGGESTED_PROVERBS:
      return {
        ...state,
        proverbs: action.payload,
      };

    case types.DASHBOARD_COUNT:
      return {
        ...state,
        dashboardCount: action.payload,
      };

    case types.SEARCH_PROVERB:
      return {
        ...state,
        searchResult: action.payload,
      };

    case types.UPDATE_PROVERB_CATEGORY:
      return {
        ...state,
        selectedProverb: action.payload,
      };

    case types.ADD_NEW_PROVERB_INTERPRETATION:
      if (!state.selectedProverb) {
        return state;
      }
      if (!state.selectedProverb.interpretation) {
        state.selectedProverb.interpretation = [];
      }

    state.selectedProverb.interpretation.push(action.payload);
      return {
        ...state,
        selectedProverb: { ...state.selectedProverb },
      };

    case types.ADD_NEW_PROVERB_TRANSLITERATION:
      if (!state.selectedProverb) {
        return state;
      }
      if (!state.selectedProverb.transliteration) {
        state.selectedProverb.transliteration = [];
      }
      state.selectedProverb.transliteration.push(action.payload);
      return {
        ...state,
        selectedProverb: { ...state.selectedProverb },
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

export default sugReducer;
