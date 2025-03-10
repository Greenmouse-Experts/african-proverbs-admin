import * as types from '../actions/actionTypes';

const initialState = {
  isLoading: false,
  user: null,
  msg: null,
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.TOGGLE_ISLOADING:
      return {
        ...state,
        isLoading: !state.isLoading,
      };

    // case types.LOGIN_SUCCESS:
    //     return {
    //         ...state,
    //         msg: action.payload,
    //         isLoading: false,
    //     };

    case types.USER_DETAILS: {
      return {
        ...state,
        user: action.payload,
        isLoading: false,
      };
    }

    case types.CLEAR_USER_DETAILS: {
      return {
        ...state,
        user: null,
        isLoading: false,
      };
    }

    case types.USER_UPDATE: {
      return {
        ...state,
        user: { ...state.user, ...action.payload },
        isLoading: false,
      };
    }

    // case types.LOGIN_FAILURE:
    //     return {
    //         ...state,
    //         msg: action.payload,
    //         isLoading: false,
    //     };

    case types.PASSWORD_CHANGE:
      return {
        ...state,
        isLoading: false,
      };

    case types.CLEAR_MSG:
      return {
        ...state,
        msg: null,
        isLoading: false,
      };

    case types.USER_UPDATE: {
      console.log(action.payload);
      return {
        ...state,
        user: { ...state.user, ...action.payload },
        isLoading: false,
      };
    }

    case types.ALERT_MESSAGE:
      return {
        ...state,
        msg: action.payload,
        isLoading: false,
      };

    case types.CLEAR_MSG:
      return {
        ...state,
        msg: null,
        isLoading: false,
      };

    case types.PASSWORD_CHANGE:
      return {
        ...state,
        isLoading: false,
      };

    case types.REQUEST_RESET_PASSWORD:
     { return {
        ...state,
        isLoading: false
      };}
    
    case types.SET_NEW_PASSWORD:
     {return {
        ...state,
        isLoading: false
      };}

    default:
      return state;
  }
};

export default authReducer;
