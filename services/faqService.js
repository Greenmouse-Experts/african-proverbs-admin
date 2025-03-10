import HttpService from "./httpService";

export const AddFaQ = (payload) => {
  const http = new HttpService();
  const url = "api/faq/";
  return http.postDataWithToken(payload, url);
};

export const fetchFaqBAckend = () => {
  const http = new HttpService();
  const url = "api/faq/";
  return http.getDataWithToken(url);
};

export const DeleteFaqBackend = (id) => {
  const payload = {
    id,
  };
  const http = new HttpService();
  const url = `api/faq/delete/${id}`;
  return http.postDataWithToken(payload, url);
};

export const UpdateFaqBackend = (payload) => {
  const http = new HttpService();
  const url = `api/faq/${payload.id}`;
  return http.postDataWithToken(payload, url);
};
