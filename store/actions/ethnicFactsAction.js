import * as types from "./actionTypes";
import { toggleIsLoading } from "./authActions";
import { FetchEthnic } from "../../services/ethnicService";
import { logout, alertMessage } from "./authActions";
import HttpService from "../../services/httpService";

export const getEthnics = (data) => {
  return {
    type: types.FETCH_ETHNIC,
    payload: data,
  };
};

export const fetchEthnic = () => {
  return async (dispatch) => {
    await dispatch(toggleIsLoading());
    FetchEthnic()
      .then(async (result) => {
        console.log(result);
        if (result.status === 200) {
          const data = result.data;
          await dispatch(getEthnics(data));
          dispatch(toggleIsLoading());
        } else {
          dispatch(alertMessage("Error Fetching Ethnics", "FAILURE"));
        }
      })
      .catch((err) => {
        if (err && err.response.status == "401") {
          dispatch(alertMessage("Token Expired, Not Authorized", "FAILURE"));
          dispatch(logout());
        }
        if (err && err.response.status == "400") {
          dispatch(alertMessage("Bad Request", "FAILURE"));
        } else {
          dispatch(alertMessage("Error Fetching categories", "FAILURE"));
        }
        dispatch(toggleIsLoading());
      });
  };
};

export const callTheAPI = (payload) => {
  const http = new HttpService();
  const url = "api/proverbs/fact-question/uploadfile";
  return http.postDataWithTokenForFile(payload, url);
};

export const uploadEthnicFacts = (payload) => {
  return async (dispatch) => {
    await dispatch(toggleIsLoading());
    callTheAPI(payload)
      .then(async (result) => {
        if (result.status === 201 || result.status === 200) {
          dispatch(
            alertMessage(
              "Ethnic Fact Questions Uploaded Successfully",
              "SUCCESS",
            ),
          );
          return { success: true };
        } else if (result.status === 401) {
          dispatch(logout("Unauthorized Access"));
          dispatch(toggleIsLoading());
        } else {
          dispatch(alertMessage("ERROR Uploading Questions", "ERROR"));
        }
        dispatch(toggleIsLoading());
      })
      .catch((err) => {
        //console.log(err?.response?.data);
        if (err.response.status == 500) {
          dispatch(
            alertMessage(
              err?.response?.data?.message ??
                "Error Processing the file uploaded. Kindly Ensure it follows the right format",
              "ERROR",
            ),
          );
          dispatch(toggleIsLoading());
        }
        if (err.response.status == 404) {
          console.log(err?.response?.data?.data?.error);
          dispatch(
            alertMessage(
              err?.response?.data?.message ??
                "Error Processing the file uploaded.",
              "ERROR",
            ),
          );
          dispatch(toggleIsLoading());
        }
        if (err && err.response.status == 401) {
          dispatch(
            alertMessage(
              err?.response?.data?.message ?? "Token Expired, Not Authorized",
              "FAILURE",
            ),
          );
          dispatch(logout());
          dispatch(toggleIsLoading());
        }
        if (err && err.response.status == 409) {
          dispatch(
            alertMessage(
              err?.response?.data?.data?.message ?? "Invalid Request",
              "FAILURE",
            ),
          );
        }
        if (err && err.response.status == 400) {
          dispatch(
            alertMessage(
              err?.response?.data?.message ?? "Bad Request",
              "FAILURE",
            ),
          );
        }
        dispatch(toggleIsLoading());
      });
  };
};
