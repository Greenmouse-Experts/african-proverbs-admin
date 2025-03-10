import HttpService from './httpService'

export const FetchFMRoles = () => {
    const http = new HttpService();
    const url = "accounts/roles/family";
    return http.getDataWithToken(url)
        //.then((data) => data)
  };


export const CreatePVRoles = (payload) => {
    const http = new HttpService();
    const url = "accounts/roles/";
    return http.postDataWithToken(payload, url)
        //.then((data) => data);
  };


export const UpdatePVRoles = (payload) => {
    var id = payload.id;
    delete payload.id;
    const http = new HttpService();
    const url = `accounts/roles/${id}`;
    return http.postDataWithToken(payload, url)
       // .then((data) => data);
  };


export const DeletePVRoles = (payload) => {
    const http = new HttpService();
    const url = `accounts/roles/${payload}`;
    return http.getData(url)
        //.then((data) => data);
  };