import HttpService from './httpService';

export const fetchAllNotifications  = (notificationType) => {
    const http = new HttpService();
    const url = notificationType==='post' ? '/firebase/logs/' :'/user/notification/all'
    return http.getDataWithToken(url)
  };


  export const searchNotification  = (notificationType,payload) => {
    const http = new HttpService();
    const url = notificationType==='post' ? '/firebase/logsByDates' :'/user/notification/allByDates'
    return http.postDataWithToken(payload,url)
  };


  export const searchNotificationwithEmail  = (notificationType,payload) => {
    const http = new HttpService();
    const url = notificationType==='post' ? '/firebase/logsByDatesAndEmail' :'/user/notification/allByDatesAndEmail'
    return http.postDataWithToken(payload,url)
  };