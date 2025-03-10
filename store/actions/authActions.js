import * as actionTypes from "./actionTypes";
import {
  Login,
  GetUserDetails,
  updateUserProfile,
  ChangePassword,
  RequestResetPassword,
  ChangeUserPassword,
} from "../../services/authService";
import { saveAccessToken, generateUserDetails } from "../../utils/utilities";
import Router from "next/router";

export const login = (data) => {
  return async (dispatch) => {
    await dispatch(toggleIsLoading());
    Login(data)
      .then(async (result) => {
       
        if (result.status === 200) {
          
          const { data, tokens } = result.data;
          
          const {
            author_profile,
            email,
            ethnics,
            user_type,
            roles,
            permissions,
            id,
            user_created_proverbs,
            user_published_proverbs,
            user_reviewed_proverbs,
          } = data;
          const userData = {
            id: id,
            userId: author_profile.id,
            first_name: author_profile.first_name,
            last_name: author_profile.last_name,
            email,
            user_type,
            roles,
            permissions,
            ethnics,
            proverbs_created: user_created_proverbs,
            proverbs_published: user_published_proverbs,
            proverbs_reviewed: user_reviewed_proverbs,
          };
          await saveAccessToken(tokens.access);
          dispatch(userDetails(data));
          // console.log('<><>><><><><>its here<><><><><><><><>')
          window.location.href = process.env.projectURL;
          // window.location.href ="http://localhost:8000/dashboard"
        } else {
          dispatch(alertMessage(result.data.non_field_errors[0], "FAILURE"));
          dispatch(toggleIsLoading());
        }
      })
      .catch((err) => {
        console.log(err);
        if (err.response) {
          console.log(err.response);
          if (err.response.status == 401) {
            dispatch(alertMessage("Error with login details", "FAILURE"));
            // dispatch(logout())
          } else if (err.response.status == 400) {
            dispatch(alertMessage("Error with login details", "FAILURE"));
          }
        } else if (err.request) {
          console.log(err.request);
          dispatch(alertMessage("Connection Error", "FAILURE"));
        } else {
          dispatch(alertMessage("Error Connecting to the internet", "FAILURE"));
        }
        dispatch(toggleIsLoading());
      });
    // .catch((err) => {
    //   if(err.response.status === 400){
    //     dispatch(alertMessage(err.response.data.non_field_errors[0], 'FAILURE'));
    //   }
    //   else{
    //     dispatch(alertMessage('Action could not be performed', 'FAILURE'));
    //     dispatch(toggleIsLoading());
    //   }
    // });
  };
};

export const getUserDetails = () => {
  return async (dispatch) => {
    GetUserDetails()
      .then(async (result) => {
        if (result && result.status === 201) {
          // console.log(result);
          const userData = generateUserDetails(result.data);
          // dispatch(userDetails(userData));
          dispatch(userDetails(result.data));
        } else if (result.status === 401) {
          dispatch(logout("Unauthorized Access"));
          dispatch(toggleIsLoading());
        } else {
          dispatch(logout("Your Session is expired, Kindly Login"));
        }
      })
      .catch((err) => {
        console.log("checking where it get to");
        console.log(err.response);
        if (err.response && err.response.status == "401") {
          dispatch(logout());
        }
        dispatch(toggleIsLoading());
      });
  };
};

export const logout = (msg = null) => {
  const message = msg ? msg : "We will be happy to have you back";
  return async (dispatch) => {
    await localStorage.removeItem(process.env.tokenName);
    dispatch(clearUserDetails());
    dispatch(alertMessage("We will be happy to have you back", "SUCCESS"));
    Router.push("/login");
  };
};

export const toggleIsLoading = () => {
  return {
    type: actionTypes.TOGGLE_ISLOADING,
  };
};

// @Desc: Alert for an update
export const alertMessage = (msg, type) => (dispatch) => {
  dispatch({
    type: actionTypes.ALERT_MESSAGE,
    payload: {
      msg,
      type,
    },
  });

  // @Desc: Clear alert after some sec
  setTimeout(() => {
    dispatch(clearMsg());
  }, 4000);
};

// @Desc: Clear an alert message for an update
export const clearMsg = () => {
  return {
    type: actionTypes.CLEAR_MSG,
  };
};

export const clearUserDetails = () => {
  return {
    type: actionTypes.CLEAR_USER_DETAILS,
  };
};

// @Desc Alert for an update
export const userDetails = (userDetails) => {
  return {
    type: actionTypes.USER_DETAILS,
    payload: userDetails,
  };
};

//@Desc: Change User Password
export const ChangePasswordHandler = (data, Router) => (dispatch) => {
  ChangePassword(data)
    .then(async (data) => {
      if (data.status === 200) {
        dispatch({
          type: actionTypes.PASSWORD_CHANGE,
        });
        dispatch(alertMessage("Password Changed", "SUCCESS"));
        Router.push("/profile");
      }
    })
    .catch((err) => {
      if (err && err.response.status == "401") {
        dispatch(alertMessage("Token Expired, Not Authorized", "FAILURE"));
        dispatch(logout());
      }
      if (err && err.response.status == "400") {
        dispatch(alertMessage("Bad Request", "FAILURE"));
      }
      dispatch(toggleIsLoading());
    });
};

// @Desc: fetch user full details
export const fetchUserHandler = () => async (dispatch) => {
  await dispatch(toggleIsLoading());
  GetUserDetails()
    .then((data) => {
      if (data.status === 200) {
        // const { author_profile, email, roles, id } = data.data;
        // const userData = {
        //   id: id,
        //   userId: author_profile.id,
        //   first_name: author_profile.first_name,
        //   last_name: author_profile.last_name,
        //   email,
        //   roles,
        //   ethnics: author_profile.ethnic,
        // };
        const {
          author_profile,
          email,
          roles,
          id,
          user_created_proverbs,
          user_published_proverbs,
          user_reviewed_proverbs,
        } = result.data;
        const userData = {
          id: id,
          userId: author_profile.id,
          first_name: author_profile.first_name,
          last_name: author_profile.last_name,
          email,
          role: author_profile.role,
          roles,
          ethnics: author_profile.ethnic,
          proverbs_created: user_created_proverbs,
          proverbs_published: user_published_proverbs,
          proverbs_reviewed: user_reviewed_proverbs,
        };
        dispatch({
          type: actionTypes.USER_DETAILS,
          payload: data.data,
        });
      }
    })
    .catch((err) => {
      if (err && err.response.status == "401") {
        dispatch(alertMessage("Token Expired, Not Authorized", "FAILURE"));
        dispatch(logout());
      }
      if (err && err.response.status == "400") {
        dispatch(alertMessage("Bad Request", "FAILURE"));
      }
      dispatch(toggleIsLoading());
    });
};

// @Desc: update user profile
export const updateUserHandler = (formData, id) => async (dispatch) => {
  console.log(formData);
  console.log(id);
  await dispatch(toggleIsLoading());
  updateUserProfile(formData, id)
    .then(async (data) => {
      // console.log(data);
      if (data.status === 201) {
        const { author_profile } = data.data;
        const userData = {
          userId: author_profile.id,
          first_name: author_profile.first_name,
          last_name: author_profile.last_name,
        };
        dispatch({
          type: actionTypes.USER_UPDATE,
          payload: data.data,
          // payload: userData,
        });
        dispatch(alertMessage("Update Successfull", "SUCCESS"));
      }
    })
    .catch((err) => {
      if (err && err.response.status == "401") {
        dispatch(alertMessage("Token Expired, Not Authorized", "FAILURE"));
        dispatch(logout());
      }
      if (err && err.response.status == "400") {
        dispatch(alertMessage("Bad Request", "FAILURE"));
      }
      dispatch(toggleIsLoading());
    });
};

export const updatePassword = (formData) => async (dispatch) => {
  await dispatch(toggleIsLoading());
  ChangePassword(formData)
    .then(async (data) => {
      console.log(data);
      if (data.status === 200) {
        dispatch(alertMessage("Update Successfull", "SUCCESS"));
        await dispatch(toggleIsLoading());
        setTimeout(function () {
          dispatch(logout());
        }, 2000);
      }
    })
    .catch((err) => {
      if (err && err.response.status == "401") {
        dispatch(alertMessage("Unauthorized", "FAILURE"));
        dispatch(logout());
      }
      if (err && err.response.status == "400") {
        dispatch(alertMessage("Bad Request", "FAILURE"));
      }
      dispatch(alertMessage(`${err.message}`, "FAILURE"));
    });
};

export const requestPasswordReset = () => {
  return {
    type: actionTypes.REQUEST_RESET_PASSWORD,
  };
};

export const requestResetUserPassword = (data) => {
  return async (dispatch) => {
    await dispatch(toggleIsLoading());
    RequestResetPassword(data)
      .then(async (result) => {
        if (result.status === 200) {
          const data = result.data;
          // console.log(data)
          dispatch(requestPasswordReset());
          dispatch(
            alertMessage(
              "A Link has been sent to your mail for password reset",
              "SUCCESS",
            ),
          );
        } else if (result.status === 404) {
          dispatch(alertMessage("Couldn't find your Muna Account", "FAILURE"));
          dispatch(toggleIsLoading());
        } else {
          dispatch(alertMessage(result.data.name, "FAILURE"));
          dispatch(toggleIsLoading());
        }
      })
      .catch((error) => {
        console.log(error);
        dispatch(alertMessage("Couldn't find your Muna Account", "FAILURE"));
      });
  };
};

export const setNewPassword = () => {
  return {
    type: actionTypes.SET_NEW_PASSWORD,
  };
};

export const setNewUserPassword = (data) => {
  return async (dispatch) => {
    await dispatch(toggleIsLoading());
    ChangeUserPassword(data)
      .then(async (result) => {
        if (result.status === 200) {
          const data = result.data;
          console.log(data);
          dispatch(setNewPassword());
          dispatch(alertMessage("Password Changed SUccessfully", "SUCCESS"));
        } else {
          dispatch(alertMessage(result.data.name, "FAILURE"));
          dispatch(toggleIsLoading());
        }
      })
      .catch((error) => {
        console.log(error);
        dispatch(
          alertMessage(
            "Unable to Change Password, Please try again",
            "FAILURE",
          ),
        );
        error;
      });
  };
};
