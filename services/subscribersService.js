import HttpService from "./httpService";

export const fetchActiveSubscribersBackend = () => {
    const http = new HttpService();
    const url = '/api/packages/search';
    return http.getDataWithToken(url)
  };


export const sendPostNotification =(payload)=>{
  const http = new HttpService();
    const url = '/firebase/push/';
    return http.postDataWithToken(payload,url)
}


export const sendUserNotification =(payload)=>{
  const http = new HttpService();
    const url = '/user/notification/save';
    return http.postDataWithToken(payload,url)
}