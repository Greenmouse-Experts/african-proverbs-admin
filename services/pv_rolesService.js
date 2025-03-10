import HttpService from './httpService'

export const FetchPVRoles = () => {
    const http = new HttpService();
    const url = "accounts/roles/";
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
    const url = `accounts/roles/${payload}/delete`;
    return http.getData(url)
        //.then((data) => data);
  };