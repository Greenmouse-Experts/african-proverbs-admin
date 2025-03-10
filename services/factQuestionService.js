import HttpService from "./httpService";

export const addQuestion = (payload) => {
  const http = new HttpService();
  const url = "api/proverbs/fact-question/save";
  return http.postDataWithToken(payload, url);
};

export const fetchQuestionsBackend = (pageNumber, type) => {
  const http = new HttpService();
  const url = `api/proverbs/fact-question/all?page=${pageNumber}&size=20&type=${type}`;
  return http.getDataWithToken(url);
};

export const questionByModification = (pageNumber, type) => {
  const http = new HttpService();
  const url = `api/proverbs/fact-question/modified/all?page=${pageNumber}&size=20&type=${type}`;
  return http.getDataWithToken(url);
};

export const fetchAQuestionBackend = () => {
  const http = new HttpService();
  const url = `/api/proverbs/fact-question/${id}`;
  return http.getDataWithToken(url);
};

export const searchAQuestionBackend = (pageNumber, type) => {
  const http = new HttpService();
  const url = `api/proverbs/fact-question/all?page=${pageNumber}&size=20&type=${type}`;
  return http.getDataWithToken(url);
};

export const searchByKeywordBackend = (pageNumber, keyword, type) => {
  const http = new HttpService();
  const url = `api/proverbs/fact-question/search?page=${pageNumber}&size=10&question=${keyword}&type=${type}`;
  return http.getDataWithToken(url);
};

export const deleteQuestionBackend = (id) => {
  if (typeof id !== "string" && typeof id !== "number") {
    return Promise.reject("Invalid ID");
  }
  const payload = {
    id,
  };
  const http = new HttpService();
  const url = `api/proverbs/fact-question/delete/${id}`;
  return http.postDataWithToken(payload, url);
};

export const updateQuestionBackend = (payload) => {
  const http = new HttpService();
  const url = `api/proverbs/fact-question/update`;
  return http.postDataWithToken(payload, url);
};
