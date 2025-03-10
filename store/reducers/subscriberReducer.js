import * as types from "../actions/actionTypes";

const initialState = {
  subscribersData: [],
  count: null,
  isLoadingsubscribers: true,
  searchResult: null,
  subscriptionData: null,
  isUserUpdated: false,
};

const Subscriber = (state = initialState, action) => {
  const { type, payload } = action;
  // console.log(action);
  switch (type) {
    case types.FETCH_SUBSCRIBERS:
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
        subscribersData: [...content],
        count: totalElements,
        isLoadingsubscribers: false,
      };
    case types.SEARCH_SUBSCRIBERS:
      return {
        ...state,
        searchResult: action.payload.content,
        count: action.payload.totalElements,
      };
    case types.FETCH_SUBSCRIPTION:
      // const { subscriptionData } = action.payload;
      console.log(subscriptionData);
      return {
        ...state,
        subscriptionData: [...subscriptionData],
      };
    case types.ADMIN_UPDATE_USER:
      return {
        ...state,
        isUserUpdated: !state.isUserUpdated,
      };
    default:
      return state;
  }
};

export default Subscriber;
