import HttpService from './httpService';


export const CreateNotification = (payload) => {
    const http = new HttpService();
    const url = 'firebase/push/';
    return http
        .postDataWithToken(payload, url)
};