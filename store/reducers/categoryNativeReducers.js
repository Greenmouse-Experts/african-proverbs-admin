import * as types from '../actions/actionTypes';

const initialState = {
  nativenames: null,
  isLoadingcategoriesnative: true,
};

const CategoryNativeName = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case types.ACTIVE_CATEGORY:
      return {
        ...state,
        nativenames: payload,
        isLoadingcategoriesnative: false,
      };

    case types.CREATE_CATEGORY_NATIVE_NAME:
      state.nativenames.categorynativenames.push(payload);
      return {
        ...state,
        nativenames: {...state.nativenames},
        isLoadingcategoriesnative: false,
      };

    case types.UPDATE_CATEGORY_NATIVE_NAME:
      const categorynativeupdatecopy = state.nativenames.categorynativenames;
      let newIndex = categorynativeupdatecopy.findIndex((x) => x.id === payload.id);
      const clonednative = categorynativeupdatecopy.find((data)=> data.id===payload.id);
      let newUpdate = {...clonednative, ...payload}
      categorynativeupdatecopy[newIndex] = newUpdate;
      
      return {
          ...state,
          isLoadingcategoriesnative: false,
          nativenames: {...state.nativenames, categorynativenames: categorynativeupdatecopy},
      };

    case types.DELETE_CATEGORY_NATIVE_NAME:
      let categorynativecopy = [...state.nativenames.categorynativenames]
      const updatedcategorycopy = categorynativecopy.filter(
        (x) => x.id !== payload
      )
      return {
        ...state,
        nativenames: {...state.nativenames,categorynativenames: updatedcategorycopy},
        isLoadingcategoriesnative: false,
      };

    default:
        return state
  }
}
export default CategoryNativeName;