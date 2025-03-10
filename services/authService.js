import HttpService from './httpService'

export const Login = (payload) => {
    const http = new HttpService();
    const url = "accounts/admin/login/";
    return http.postData( payload, url)
        // .then((data) => data)
        // .catch((error) => error);
  };

  export const ChangePassword = (payload) => {
    const http = new HttpService();
    const url = "accounts/password-update/";
    return http.postDataWithToken(payload, url)
        // .then((data) => data)
        // .catch((error) => error);
  };


  export const updateUserProfile = (formData, id) => {
    const http = new HttpService();
    console.log(id);
    console.log(formData);
    const url = `accounts/admin/update/${id}/`;
    return http.postDataWithToken(formData, url)
        // .then((data) => data)
        // .catch((error) => error);
  };

export const GetUserDetails = () => {
    const http = new HttpService();
    const url = "accounts/admin/details/";
    return http.getDataWithToken(url)
        // .then((data) => data)
        // .catch((error) => error);
}

export const RequestResetPassword = (payload)=> {
  const http = new HttpService();
    const url = "accounts/request-author-reset-email/";
    return http.postData( payload, url)
        // .then((data) => data)
        // .catch((error) => error);
}

export const ChangeUserPassword = (payload)=> {
  const http = new HttpService();
    const url = "accounts/password-reset-complete/";
    return http.postData( payload, url)
        // .then((data) => data)
        // .catch((error) => error);
}