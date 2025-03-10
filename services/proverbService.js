import HttpService from "./httpService";
import axios from "axios";
import {
  checkPermission,
  REVIEWER,
  ADMIN,
  SUPERADMIN,
  PUBLISHER,
  AUTHOR,
} from "../utils/utilities";

// export const FetchProverbs = (url) => {
//   const http = new HttpService();
//   return http.getDataWithToken(url);
// };

export const FetchProverbs = (payload) => {
  const http = new HttpService();
  const url = "api/proverbs/proverbsview/";
  return http.postDataWithToken(payload, url);
};

export const FetchProverbsViewPost = (payload) => {
  const http = new HttpService();
  const url = "api/proverbs/proverbsview/";
  return http.postDataWithToken(payload, url);
};

export const FetchProverbsView = (url) => {
  const http = new HttpService();
  return http.getDataWithToken(url);
};

export const FetchSelectedProverbs = (slug) => {
  const http = new HttpService();
  const url = `api/proverbs/proverbs/${slug}/`;
  return http.getDataWithToken(url);
};

export const FetchBatchProverbs = (url) => {
  const http = new HttpService();
  return http.getBatchDataWithToken(url);
};


export const SearchProverb = (url) => {
  const http = new HttpService();
  return http.getDataWithToken(url);
};

export const fetchDashboardCount = () => {
  const http = new HttpService();
  const url = "api/proverbs/analytics/";
  return http.getData(url);
};

export const AddProverb = (payload) => {
  const http = new HttpService();
  const url = "api/proverbs/proverb/";
  return http.postDataWithToken(payload, url);
  // .then((data) => data)
  //.catch((error) => error);
};

export const AddBatchProverbs = (payload) => {
  const http = new HttpService();
  const url = "api/proverbs/uploadfile/";
  return http.postDataWithTokenForFile(payload, url);
};

export const FetchSystemProverbs = () => {
  const http = new HttpService();
  const url = "api/proverbs/allproverb/";
  return http.getDataWithToken(url);
};

export const DeleteProverb = (id) => {
  const http = new HttpService();
  const url = `api/proverbs/proverb/${id}/delete`;
  return http.getDataWithToken(url);
  //.then((data) => data)
  //.catch((error) => error);
};

export const UpdateProverb = (payload, id) => {
  const http = new HttpService();
  const url = `api/proverbs/proverb/${id}/`;
  return http.postDataWithToken(payload, url);
  // .then((data) => data)
  // .catch((error) => error);
};

export const UpdateProverbCategory = (payload, id) => {
  const http = new HttpService();
  const url = `api/proverbs/proverb/${id}/`;
  return http.postDataWithToken(payload, url);
  // .then((data) => data)
  // .catch((error) => error);
};

export const DeleteProverbTranslation = (id) => {
  const http = new HttpService();
  const url = "api/proverbs/transliteration/" + id + "/delete/";
  return http.getDataWithToken(url);
  // .then((data) => data)
  // .catch((error) => error);
};

export const DeleteProverbInterpretation = (id) => {
  const http = new HttpService();
  const url = "api/proverbs/interpretation/" + id + "/delete";
  return http.getDataWithToken(url);
  // .then((data) => data)
  // .catch((error) => error);
};

export const DeleteProverbReview = (id) => {
  const http = new HttpService();
  const url = "api/proverbs/preview/" + id + "/delete";
  return http.getDataWithToken(url);
  // .then((data) => data)
  // .catch((error) => error);
};

export const AddProverbInterpretation = (payload) => {
  const http = new HttpService();
  const url = "api/proverbs/interpretation/";
  return http.postDataWithToken(payload, url);
  // .then((data) => data)
  // .catch((error) => error);
};

export const AddProverbReview = (payload) => {
  const http = new HttpService();
  const url = "api/proverbs/preview/";
  return http.postDataWithToken(payload, url);
  // .then((data) => data)
  // .catch((error) => error);
};

export const AddProverbTranslation = (payload) => {
  console.log(payload);
  const http = new HttpService();
  const url = "api/proverbs/transliteration/";
  return http.postDataWithToken(payload, url);
  // .then((data) => data)
  // .catch((error) => error);
};
export const AddAudioRec = (payload, id) => {
  const http = new HttpService();
  const url = "api/proverbs/upload-audio/" + id + "/";
  return http.postDataWithToken(payload, url);
};

// export const DownloadAudio = (id) => {
//   const http = new HttpService();
//   const url = "api/proverbs/download-audio/" + id + "/";
//   return http.getDataWithToken(url);

// }

export const DeleteAudio = (id) => {
  const http = new HttpService();
  const url = `api/proverbs/delete-audio/${id}/`; // Use template literals
  return http.postDataWithTokenForDelete(url); // Pass an empty object as the payload
};

export const UpdateProverbTranslation = (payload, id) => {
  const http = new HttpService();
  const url = "api/proverbs/transliteration/" + id + "/";
  return http.postDataWithToken(payload, url);
  // .then((data) => data)
  // .catch((error) => error);
};

export const UpdateProverbInterpretation = (payload, id) => {
  const http = new HttpService();
  const url = "api/proverbs/interpretation/" + id + "/";
  return http.postDataWithToken(payload, url);
  // .then((data) => data)
  // .catch((error) => error);
};

export const UpdateProverbReview = (payload, id) => {
  const http = new HttpService();
  const url = "api/proverbs/preview/" + id + "/";
  return http.postDataWithToken(payload, url);
  // .then((data) => data)
  // .catch((error) => error);
};
