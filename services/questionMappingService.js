import { objectToQueryString } from "@/utils/utilities";
import HttpService from "./httpService";

export const FetchEthnicQuestions = (query) => {
  const http = new HttpService();
  const url = "api/proverbs/fact-question-mapping/ethnic/all";
  const path = objectToQueryString(url, query);
  return http.getDataWithToken(path);
  //.then((data) => data)
};

export const deleteMappedQuestion = (id) => {
  const http = new HttpService();
  const url = `api/proverbs/fact-question-mapping/delete/${id}`;
  return http.postDataWithTokenForDelete(url);
};

export const FetchAllQuestions = (query) => {
  const http = new HttpService();
  const url = "api/proverbs/fact-question/all/non-mapped";
  const path = objectToQueryString(url, query);
  return http.getDataWithToken(path);
  //.then((data) => data)
};

export const findEthnicQuestion = (id) => {
  const http = new HttpService();
  const url = `api/proverbs/fact-question-mapping/${id}`;
  return http.getDataWithToken(url);
};

export const postNewQuestion = (payload) => {
  const http = new HttpService();
  const url = "api/proverbs/fact-question-mapping/save";
  return http.postDataWithToken(payload, url);
  //.then((data) => data)
};

export const FetchOptions = (id) => {
  const http = new HttpService();
  const url = `api/proverbs/answer-option/all/${id}`;
  return http.getDataWithToken(url);
};

export const postNewOption = (payload) => {
  const http = new HttpService();
  const url = "api/proverbs/answer-option/save";
  return http.postDataWithToken(payload, url);
};

export const deleteOption = (id) => {
  const http = new HttpService();
  const url = `api/proverbs/answer-option/delete/${id}`;
  return http.postDataWithTokenForDelete(url);
};

export const updateQuestionOption = (payload) => {
  const http = new HttpService();
  const url = "api/proverbs/answer-option/update";
  return http.postDataWithToken(payload, url);
};
