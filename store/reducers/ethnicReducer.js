import * as types from '../actions/actionTypes';

const initialState = {
  ethnics: null,
  affiliate: null,
  links: null,
  count: null,
  pageSize: null,
  batchurl: null,
  isLoadingethnic: true,
};

const Ethnics = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case types.FETCH_ETHNIC:
      // return {
      //   ...state,
      //   ethnics: payload,
      //   isLoadingethnic: false,
      // };

      const { first, last, page, totalElements, size, content, batchurl } = action.payload;
      return {
        ...state,
        links: {
          previous: first ? "" : `${process.env.baseUrl}${batchurl}&page=${page - 1}`,
          next: last ? "" : `${process.env.baseUrl}${batchurl}&page=${page + 1}`
        },
        count: totalElements,
        pageSize: size,
        first: first,
        last: last,
        page: page,
        ethnics: content,
        batchurl: batchurl
      };

    case types.CREATE_ETHNIC:
      return {
        ...state,
        ethnics: [payload, ...state.ethnics],
        isLoadingethnic: false,
      };

    case types.UPDATE_ETHNIC:
      const clonedEthnic = [...state.ethnics];
      let newIndex = clonedEthnic.findIndex((x) => x.id === payload.id);
      clonedEthnic[newIndex] = payload;
      return {
        ...state,
        isLoadingethnic: false,
        ethnics: clonedEthnic,
      };

    case types.DELETE_ETHNIC:
      return {
        ...state,
        ethnics: state.ethnics.filter(
          (ethnic) => ethnic.id !== payload
        ),
        isLoadingethnic: false,
      };

    case types.CREATE_AFFILIATEDLANGUAGE:
      return {
        ...state,
        ethnics: [payload, ...state.ethnics],
        isLoadingethnic: false,
      };

    case types.FETCH_AFFILIATEDLANGUAGEBYID:
      return {
        ...state,
        affiliate: payload,
        isLoadingethnic: false,
      };

      case types.RESET_AFFILIATE:
        return {
          ...state,
          affiliate: null,
        };


    case types.DELETE_AFFILIATEDLANGUAGE:
      return {
        ...state,
        affiliate: state.affiliate.filter((affiliatedLanguage) => affiliatedLanguage.id !== payload),
        isLoadingethnic: false,
      };

    default:
      return state
  }
}
export default Ethnics;