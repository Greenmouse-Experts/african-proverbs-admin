import HttpService from './httpService'

export const FetchLanguages = () => {
    const http = new HttpService();
    const url = "api/proverbs/language/";
    return http.getDataWithToken(url)
        //.then((data) => data)
  };

export const FetchLanguageProverbs = (selectedEthnics) => {
    const http = new HttpService();
    const url = `api/proverbs/proverbs/?ethnic=${selectedEthnics}`;
    return http.getDataWithToken(url)
        //.then((data) => data)
  };

export const FetchLanguageEthnics = (selectedEthnics) => {
    const http = new HttpService();
    const url = `api/proverbs/ethnic/?language__name=${selectedEthnics}`;
    return http.getDataWithToken(url)
        //.then((data) => data)
  };

export const CreateLanguage = (payload) => {
    const http = new HttpService();
    const url = "api/proverbs/language/";
    return http.postDataWithToken(payload, url)
        //.then((data) => data);
  };


export const UpdateLanguage = (payload) => {
    var id = payload.id;
    delete payload.id;
    const http = new HttpService();
    const url = `api/proverbs/language/${id}/`;
    return http.postDataWithToken(payload, url)
       // .then((data) => data);
  };


export const DeleteLanguage = (payload) => {
    const http = new HttpService();
    const url = `api/proverbs/language/${payload}/delete`;
    return http.getData(url)
        //.then((data) => data);
  };