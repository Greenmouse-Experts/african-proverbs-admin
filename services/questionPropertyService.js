import { objectToQueryString } from "@/utils/utilities";
import HttpService from "./httpService";

export const fetchallQuestions = (query) => {
  const http = new HttpService();
  const url = "api/questionProperty/all";
  const path = objectToQueryString(url, query);
  return http.getDataWithToken(url, query);
  //.then((data) => data)
};

export const saveQuestionProperty = (payload) => {
  const http = new HttpService();
  const url = "api/questionProperty/";
  return http.postDataWithToken(payload, url);
};

export const deleteQuestion = (id) => {
  const http = new HttpService();
  const url = `api/questionProperty/delete/${id}`;
  return http.postDataWithTokenForDelete(url);
};

export const updateQuestion = (payload, id) => {
  const http = new HttpService();
  const url = `api/questionProperty/${id}`;
  return http.postDataWithToken(payload, url);
};


export const generateQuestionService = (payload, userId) => {
  const { questionPropertId } = payload;
  const genSource = "ADMIN";
  const http = new HttpService();
  const url = `api/quiz/${userId}/${questionPropertId}/${genSource}`;
  return http.postDataWithToken(payload, url);
};

export const generateAllUsersQuestionService = (payload) => {
  const { questionPropertId } = payload;
  const http = new HttpService();
  const url = `api/quiz/${questionPropertId}`;
  return http.postDataWithToken(payload, url);
};
