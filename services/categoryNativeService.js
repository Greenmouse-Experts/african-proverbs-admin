import HttpService from './httpService'

// CATEGORY NATIVE NAME
export const FetchCategoryNativeName = (payload) => {
    const http = new HttpService();
    const url = `api/proverbs/category/${payload}/`;
    return http.getDataWithToken(url)
        //.then((data) => data);
  };


export const CreateCategoryNativeName = (payload) => {
    const http = new HttpService();
    const url = "api/proverbs/nativename/";
    return http.postDataWithToken(payload, url)
      //  .then((data) => data);
  };

export const UpdateCategoryNativeName = (payload) => {
    var id = payload.categorynativeID;
    delete payload.categorynativeID;
    const http = new HttpService();
    const url = `api/proverbs/nativename/${id}/`;
    return http.postDataWithToken(payload, url)
       // .then((data) => data);
  };

export const DeleteCategoryNativeName = (payload) => {
    // var id = payload.id;
    const http = new HttpService();
    const url = `api/proverbs/nativename/${payload}/delete`;
    return http.getData(url)
        //.then((data) => data);
  };