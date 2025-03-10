import * as types from '../actions/actionTypes';

const initialState = {
  languages: null,
  isLoadinglanguages: true,
  languageEthnic: null,
  languageProverb: null,
  links: null,
  count: null,
  pageSize: null,
};

const Languages = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case types.FETCH_LANGUAGE:
      return {
        ...state,
        languages: payload,
        isLoadinglanguages: false,
      };

      case types.FETCH_LANGUAGE_PROVERBS:
        const { links, count, page_size, results } = payload;
      return {
        ...state,
        languageProverb: payload,
        // links: links,
        // count: count,
        // pageSize: page_size,
      };

      case types.FETCH_LANGUAGE_ETHNICS:
      return {
        ...state,
        languageEthnic: payload,
      };

    case types.CREATE_LANGUAGE:
      return {
        ...state,
        languages: [payload, ...state.languages],
        isLoadinglanguages: false,
      };

    case types.UPDATE_LANGUAGE:
      const clonedLanguage = [...state.languages];
      let newIndex = clonedLanguage.findIndex((x) => x.id === payload.id);
      clonedLanguage[newIndex] = payload;
      return {
          ...state,
          isLoadinglanguages: false,
          languages: clonedLanguage,
        };

    case types.DELETE_LANGUAGE:
      return {
        ...state,
        languages: state.languages.filter(
          (language) => language.id !== payload
        ),
        isLoadinglanguages: false,
      };

    default:
        return state
  }
}
export default Languages;