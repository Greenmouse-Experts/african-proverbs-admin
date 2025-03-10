import * as types from '../actions/actionTypes';

const initialState = {
  isLoading: false,
  users: null,
  user: null,
  user_msg: null,
  roles: null,
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.FETCH_USERS:
      return {
        ...state,
        users: action.payload,
        user: null,
        isLoading: false,
      };
      case types.CLEAR_SELECTED_USER:
      return {
        ...state,
        user: null,
        isLoading: false,
      };

      case types.FETCH_EACH_USER:
      return {
        ...state,
        user: action.payload,
        isLoading: false,
      };

    case types.UPDATE_USER:
      let clonedUsers = [...state.users];
      const userIndex = state.users.findIndex(
        (user) => user.id === action.payload.id
      );
      clonedUsers[userIndex] = action.payload;
      return {
        ...state,
        users: clonedUsers,
        isLoading: false,
      };

    case types.CREATE_USER:
      return {
        ...state,
        users: [...state.users, action.payload],
        isLoading: false,
      };

      case types.DELETE_USER:
        const cloneUsers = [...state.users]
        const newUsers = cloneUsers.filter(user=> user.id !== action.payload)
      return {
        ...state,
        users: newUsers,
        isLoading: false,
      };

    case types.FETCH_PERMISSION:
      return {
        ...state,
        roles: action.payload,
        isLoading: false,
      };

    case types.USER_ALERT:
      return {
        ...state,
        user_msg: action.payload,
      };

    case types.CLEAR_ALERT:
      return {
        ...state,
        user_msg: null,
      };

    default:
      return state;
  }
};

export default userReducer;
