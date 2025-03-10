import HttpService from './httpService';
// todo Remember to validate for just admin for the actio to be done
export const CreateFMUserService = (payload) => {
  const http = new HttpService();
  const url = 'accounts/family/manageadmin/';
  return http.postDataWithToken(payload, url);
};

export const FetchFMUserService = () => {
  const http = new HttpService();
  const url = 'accounts/family/manageadmin/';
  return http.getData(url);
};

export const GetEachFMUserService = (id) => {
  console.log(id)
  const http = new HttpService();
  const url = `accounts/family/manageadmin/${id}`;
  return http.getData(url);
};

export const DeleteFMUserService = (id) => {
  const http = new HttpService();
  const url = `accounts/family/manageadmin/${id}/delete`;
  return http.getData(url);
};

export const UpdateFMUserService = (payload, urlID) => {
  const http = new HttpService();
  const url = `accounts/family/manageadmin/${urlID}/`;
  return http.postDataWithToken(payload, url);
};