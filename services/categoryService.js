import HttpService from './httpService'

export const FetchCategory = () => {
    const http = new HttpService();
    const url = "api/proverbs/category/";
    return http.getDataWithToken(url)
        //.then((data) => data)
        
  };

export const CreateCategory = (payload) => {
    const http = new HttpService();
    const url = "api/proverbs/category/";
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

export const DeleteCategory = (payload) => {
    // var id = payload.id;
    const http = new HttpService();
    const url = `api/proverbs/category/${payload}/delete`;
    return http.getData(url)
  };


