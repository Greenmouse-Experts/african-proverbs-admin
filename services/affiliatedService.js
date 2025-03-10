import HttpService from './httpService'


export const CreateAffiliatedLanguage = (payload) => {
    const http = new HttpService();
    const url = "api/proverbs/affiliate_ethnic/save";
    return http.postDataWithToken(payload, url)
       // .then((data) => data)
  };

export const UpdateCategory = (payload) => {
    var id = payload.id;
    delete payload.id;
    console.log(id);
    const http = new HttpService();
    const url = `api/proverbs/category/${id}/`;
    return http.postDataWithToken(payload, url)
        //.then((data) => data)
  };

export const DeleteAffiliatedLanguage = (payload) => {
    // var id = payload.id;
    const http = new HttpService();
    const url = `api/proverbs/affiliate_ethnic/delete?${payload}`;
    return http.postDataWithToken(payload, url)
  };