import * as types from '../actions/actionTypes';

const initialState = {
  roles: null,
};

const FMRolesReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.FETCH_PROVERB_ADMIN_ROLES:
      return {
        ...state,
        roles: action.payload,
      };

    case types.UPDATE_PROVERB_ADMIN_ROLES:
      let clonedRoles = [...state.roles];
      const roleIndex = clonedRoles.findIndex(
        (role) => role.id === action.payload.id
      );
      clonedRoles[roleIndex] = action.payload;
      return {
        ...state,
        users: clonedRoles,
      };

    case types.CREATE_PROVERB_ADMIN_ROLES:
      return {
        ...state,
        roles: [...state.roles, action.payload],
      };

      case types.DELETE_PROVERB_ADMIN_ROLES:
        const cloneRoles = [...state.roles]
        const newRoles = cloneRoles.filter(role=> role.id !== action.payload)
      return {
        ...state,
        roles: newRoles,
      };


    default:
      return state;
  }
};

export default FMRolesReducer;
