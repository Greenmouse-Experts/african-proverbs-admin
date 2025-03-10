import HttpService from "./httpService";

export const fetchCorrectProverb = (payload, pageNumber) => {
  const http = new HttpService();
  const url = `api/proverbs/correction/proverbs?page=${pageNumber}`;
  return http.postDataWithToken(payload, url);
};

export const fetchSelected = (id) => {
  const http = new HttpService();
  const url = `api/proverbs/correction/proverbs/${id}`;
  return http.getDataWithToken(url);
};

export const SearchProverb = (status) => {
  const http = new HttpService();
  const url = `api/suggest-proverb/search_suggest?status=${status}`;
  return http.getDataWithToken(url);
};

export const Approve = (payload) => {
  const http = new HttpService();
  const url = "api/proverbs/correction/action";
  return http.postDataWithToken(payload, url);
};

export const updateCorrection = (payload) => {
  const http = new HttpService();
  const url = "api/proverbs/correction/update";
  return http.postDataWithToken(payload, url);
  // .then((data) => data)
  // .catch((error) => error);
};
