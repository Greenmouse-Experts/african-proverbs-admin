import axios from "axios";
import { getAccessToken } from "../utils/utilities";

class HttpService {
  constructor(token, baseUrl) {
    this.token = getAccessToken();
    this.baseUrl = process.env.baseUrl;
  }

  postData = async (payload, url) => {
    return axios.post(this.baseUrl + url, payload);
  };

  postDataWithToken = async (payload, url) => {
    const AuthStr = "Bearer ".concat(this.token);
    return axios.post(this.baseUrl + url, payload, {
      headers: { Authorization: AuthStr },
    });
    // .then((res) => res)
  };

  putData = async (formData, url) => {
    const AuthStr = "Bearer ".concat(this.token);
    return axios.put(this.baseUrl + url, formData, {
      headers: { Authorization: AuthStr },
    });
  };

  deleteData = async (url) => {
    const AuthStr = "Bearer ".concat(this.token);
    return axios.delete(this.baseUrl + url, {
      headers: { Authorization: AuthStr },
    });
    //.then((res) => res)
  };

  postDataWithTokenForDelete = async (url, payload = {}) => {
    const AuthStr = "Bearer ".concat(this.token);
    return axios.post(this.baseUrl + url, payload, {
      headers: { Authorization: AuthStr },
    });
  };

  postDataWithTokenForFile = async (payload, url) => {
    const formData = new FormData();
    formData.append("file", payload.file);
    const AuthStr = "Bearer ".concat(this.token);
    return axios.post(this.baseUrl + url, formData, {
      headers: {
        Authorization: AuthStr,
        "Content-Type": "multipart/form-data; charset=utf-8;",
      },
    });
    // .then((res) => res)
  };

  postDataWithTokenFile = async (payload, url) => {
    const AuthStr = "Bearer ".concat(this.token);
    return axios.post(this.baseUrl + url, payload, {
      headers: {
        Authorization: AuthStr,
        "Content-Type": "multipart/form-data",
      },
    });
  };

  putDataWithTokenFile = async (payload, url) => {
    const AuthStr = "Bearer ".concat(this.token);
    return axios.put(this.baseUrl + url, payload, {
      headers: {
        Authorization: AuthStr,
        "Content-Type": "multipart/form-data",
      },
    });
  };

  getData = async (url) => {
    const AuthStr = "Bearer ".concat(this.token);
    return axios.get(this.baseUrl + url, {
      headers: { Authorization: AuthStr },
    });
    // .then((res) => res)
    // .catch((error) => error);
  };

  getDataWithoutToken = async (url) => {
    return axios.get(this.baseUrl + url);
    // .then((res) => res)
  };

  getDataWithToken = async (url) => {
    const AuthStr = "Bearer ".concat(this.token);
    return axios.get(this.baseUrl + url, {
      headers: { Authorization: AuthStr },
    });
    // .then((res) => res)
    // .catch((error) => error.response);
  };

  getBatchDataWithToken = async (url) => {
    const AuthStr = "Bearer ".concat(this.token);
    return axios.get(url, { headers: { Authorization: AuthStr } });
    // .then((res) => res)
    // .catch((error) => error.response);
  };

  putDataWithoutToken = async (formData, url) => {
    return axios.put(this.baseUrl + url, formData);
    // .then((res) => res) //! the then and catch is done insdie actionFunction
  };
}
export default HttpService;
