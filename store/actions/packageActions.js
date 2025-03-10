import * as types from "./actionTypes";
import {
  addPackage,
  deletePackageBackend,
  updatePackageBackend,
  fetchPackagesBackend,
} from "@/services/packageService";
import { alertMessage, logout } from "./authActions";

export const createPackage = (payload) => {
  return async (dispatch) => {
    try {
      const result = await addPackage(payload);

      if (result.status === 200) {
        dispatch(alertMessage("Package Successfully Created", "SUCCESS"));
      } else if (result.status === 401) {
        dispatch(logout("Unauthorized Access"));
      } else if (result.status === 400) {
        dispatch(alertMessage("Bad Request", "FAILURE"));
      }
    } catch (error) {
      console.log(error.response);
      if (error.response && error.response.status === 401) {
        dispatch(alertMessage("Token Expired, Not Authorized", "FAILURE"));
        dispatch(logout());
      } else {
        dispatch(alertMessage("Error, Please contact Admin", "FAILURE"));
      }
    }
  };
};

export const fetchPackages = () => {
  return async (dispatch) => {
    try {
      const result = await fetchPackagesBackend();
      if (result.status === 200) {
        const { data } = result;
        dispatch(addFetchedPackages(data)); // please dispatch action here
      } else if (result.status === 401) {
        dispatch(logout("Unauthorized Access"));
      } else if (result.status === 400) {
        dispatch(alertMessage("Bad Request", "FAILURE"));
      }
    } catch (error) {
      if (error.response && error.response.status === 401) {
        dispatch(alertMessage("Token Expired, Not Authorized", "FAILURE"));
        dispatch(logout());
      } else {
        dispatch(alertMessage("Error, Please contact Admin", "FAILURE"));
      }
    }
  };
};

export const deletePackageAction = (id) => {
  return async (dispatch) => {
    try {
      const result = await deletePackageBackend(id);

      if (result.status === 200) {
        dispatch(alertMessage("Package Deleted Successfully", "SUCCESS"));
        await fetchPackages();
      } else if (result.status === 401) {
        dispatch(logout("Unauthorized Access"));
      } else if (result.status === 400) {
        dispatch(alertMessage("Bad Request", "FAILURE"));
      }
    } catch (error) {
      if (error.response && error.response.status === 401) {
        console.log(error);
        dispatch(alertMessage("Token Expired, Not Authorized", "FAILURE"));
        dispatch(logout());
      } else {
        dispatch(alertMessage("Error, Please contact Admin", "FAILURE"));
      }
    }
  };
};

export const updatePackageAction = (payload) => {
  return async (dispatch) => {
    try {
      const result = await updatePackageBackend(payload);

      if (result.status === 200) {
        dispatch(alertMessage("Package Updated Successfully", "SUCCESS"));
      } else if (result.status === 401) {
        dispatch(logout("Unauthorized Access"));
      } else if (result.status === 400) {
        dispatch(alertMessage("Bad Request", "FAILURE"));
      }
    } catch (error) {
      if (error.response && error.response.status === 401) {
        dispatch(alertMessage("Token Expired, Not Authorized", "FAILURE"));
        dispatch(logout());
      } else {
        dispatch(alertMessage("Error, Please contact Admin", "FAILURE"));
      }
    }
  };
};

export const addFetchedPackages = (data) => {
  return {
    type: types.ADD_FETCHED_PACKAGES,
    payload: data,
  };
};

export const orderPackages = (orderBy) => {
  return {
    type: types.SORT_PACKAGES,
    payload: orderBy,
  };
};
