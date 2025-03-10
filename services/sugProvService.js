import HttpService from "./httpService";

export const FetchProverbs = (url) => {
  const http = new HttpService();
  return http.getDataWithToken(url);
};

export const fetchSuggestProverb = (status, page) => {
  const http = new HttpService();
  const url = `api/suggest-proverb/search_suggest?status=${status}&page=${page}&size=20`;
  return http.getDataWithToken(url);
};

export const SearchProverb = (status, page) => {
  const http = new HttpService();
  const url = `/api/suggest-proverb/search_suggest?status=${status}&page=${page}&size=10`;
  return http.getDataWithToken(url);
};

export const UpdateSuggestProverb = (payload, id) => {
  const http = new HttpService();
  const url = `api/suggest-proverb/${id}`;
  return http.postDataWithToken(payload, url);
  // .then((data) => data)
  // .catch((error) => error);
};

export const DeleteSuggestion = (id) => {
  const http = new HttpService();
  const url = `api/suggest-proverb/delete/${id}`;
  return http.postDataWithTokenForDelete(url);
};

export const Approve = (payload, id) => {
  const http = new HttpService();
  const url = `api/suggest-proverb/publish?id=${id}`;
  return http.postDataWithToken(payload, url);
  // .then((data) => console.log(data))
  // .catch((error) => console.log(error.userMessage));
};
