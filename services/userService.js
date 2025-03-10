import HttpService from './httpService';
// todo Remember to validate for just admin for the actio to be done
export const createUserService = (payload) => {
  const http = new HttpService();
  const url = 'accounts/manageadmin/';
  return http.postDataWithToken(payload, url);
};

export const fetchUserService = () => {
  const http = new HttpService();
  const url = 'accounts/manageadmin/';
  return http.getData(url);
};

export const getEachUserService = (id) => {
  console.log(id)
  const http = new HttpService();
  const url = `accounts/manageadmin/${id}`;
  return http.getData(url);
};

export const deleteUserService = (id) => {
  const http = new HttpService();
  const url = `accounts/manageadmin/${id}/delete`;
  return http.getData(url);
};

export const updateUserService = (payload, urlID) => {
  const http = new HttpService();
  const url = `accounts/manageadmin/${urlID}/`;
  return http.postDataWithToken(payload, url);
};

export const Fetchroleservice = () => {
  const http = new HttpService();
  const url = `accounts/roles/`;
  return http.getData(url);
};
