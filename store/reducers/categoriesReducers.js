import * as types from '../actions/actionTypes';

const initialState = {
  categories: null,
  links: null,
  count: null,
  pageSize: null,
  batchurl: null,
  page: null,
  first: null,
  last: null,
  isLoadingcategories: true,
};

const Categories = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case types.FETCH_CATEGORY:
      const { first, last, page, totalElements, size, content, batchurl } = action.payload;
      return {
        ...state,
        links: {previous: first ? "" :`${process.env.baseUrl}${batchurl}&page=${page-1}`, 
                next: last ? "" : `${process.env.baseUrl}${batchurl}&page=${page+1}`},
        count: totalElements,
        pageSize: size,
        first: first,
        last: last,
        page: page,
        categories: content,
        batchurl: batchurl,
        isLoadingcategories: false,
      };

    case types.CREATE_CATEGORY:
      console.log("data",payload);
      return {
        ...state,
        categories: [payload, ...state.categories],
        isLoadingcategories: false,
      };

    case types.UPDATE_CATEGORY:
      const clonedCategory = [...state.categories];
      let newIndex = clonedCategory.findIndex((x) => x.id === payload.id);
      clonedCategory[newIndex] = payload;
      return {
          ...state,
          isLoadingcategories: false,
          categories: clonedCategory,
        };

    case types.DELETE_CATEGORY:
      return {
        ...state,
        categories: state.categories.filter(
          (category) => category.id !== payload
        ),
        isLoadingcategories: false,
      };

    default:
        return state
  }
}
export default Categories;