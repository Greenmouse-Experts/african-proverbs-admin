import * as types from "../actions/actionTypes";

// Helper function for deleting
const deletePackage = (packages = [], id) => {
  // Confirm the package is in the array of packages
  const packageWithId = packages.find((pkg) => pkg.id === id);

  // Remove it if found
  if (packageWithId) {
    const packagesWithoutDeletedPackage = packages.filter(
      (pkg) => pkg.id !== id
    );
    return packagesWithoutDeletedPackage;
  }

  return packages;
};

// Helper function for ordering packages
const orderPackages = (packages = [], orderBy) => {
  if (orderBy === "alphabet") {
    return packages.sort((a, b) => a.name.localeCompare(b.name));
  }

  return packages;
};

const initialState = {
  isLoading: false,
  packages: [],
  formData: {},
};

const packageReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.DELETE_PACKAGE:
      return {
        ...state,
        packages: deletePackage(state.packages, action.payload),
      };
    case types.SORT_PACKAGES:
      return {
        ...state,
        packages: orderPackages(state.packages, action.payload),
      };
    case types.ADD_FETCHED_PACKAGES:
      return { ...state, packages: action.payload };
    case types.UPDATE_FORM_DATA:
      return {
        ...state,
        packages: action.payload,
      };
    default:
      return state;
  }
};

export default packageReducer;
