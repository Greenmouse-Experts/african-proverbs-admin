import HttpService from './httpService'

export const FetchEthnic = () => {
    const http = new HttpService();
    const url = "api/proverbs/ethnic/";
    return http.getDataWithToken(url)
       // .then((data) => data);
  };

  export const FetchCountries = () => {
    const http = new HttpService();
    const url = "api/proverbs/countries";
    return http.getDataWithToken(url)
       // .then((data) => data);
  };

  export const FetchAffiliateLanguageByID = (id) => {
    const http = new HttpService();
    const url =`api/proverbs/affiliate_ethnic/all/${id}/`;
    return http.getDataWithToken(url)
       // .then((data) => data);
  };
  

export const CreateEthnic = (payload) => {
    const http = new HttpService();
    const url = "api/proverbs/ethnic/";
    return http.postDataWithTokenFile(payload, url)
        //.then((data) => data);
  };


export const UpdateEthnic = (payload, id) => {
    const http = new HttpService();
    const url = `api/proverbs/ethnic/${id}/`;
    return http.postDataWithTokenFile(payload, url)
  };


export const DeleteEthnic = (payload) => {
    const http = new HttpService();
    const url = `api/proverbs/ethnic/${payload}/delete`;
    return http.getData(url)
        //.then((data) => data);
  };


  export const CreateAffiliatedLanguage = (payload) => {
    const http = new HttpService();
    const url = "api/proverbs/affiliate_ethnic/save";
    return http.postDataWithToken(payload, url)
       // .then((data) => data)
  };

// export const UpdateCategory = (payload) => {
//     var id = payload.id;
//     delete payload.id;
//     console.log(id);
//     const http = new HttpService();
//     const url = `api/proverbs/category/${id}/`;
//     return http.postDataWithToken(payload, url)
//         //.then((data) => data)
//   };

export const DeleteAffiliatedLanguage = (affiliateId) => {
    // var id = payload.id;
    const http = new HttpService();
    const url = `api/proverbs/affiliate_ethnic/delete?affiliateId=${affiliateId}`;
    return http.postDataWithToken(affiliateId, url)
  };