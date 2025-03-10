import HttpService from "./httpService";
import { checkPermission, ADMIN, SUPERADMIN } from "../utils/utilities";

const customGet = (url) => {
  const http = new HttpService();
  return http.getDataWithToken(url);
};

const customPost = ({ data, url }) => {
  const http = new HttpService();
  return http.postDataWithToken(data, url);
};

export const getCountries = () => {
  const url = `/api/proverbs/countries`;
  //console.log(customGet(url));
  return customGet(url);
};

export const getAllFlags = () => {
  const url = `/api/proverbs/flag`;
  //console.log(customGet(url));
  return customGet(url);
};

export const getFlag = (id) => {
  const url = `/api/proverbs/flag/${id}`;
  //console.log(customGet(url));
  return customGet(url);
};

export const uploadFlag = async (body) => {
  const url = `/api/proverbs/flag`;
  //console.log(customGet(url));
  try {
    return await customPost({ data: body, url });
  } catch (err) {
    //console.log(err?.response?.data?.data);
    return err?.response?.data?.data?.message;
  }
};

export const editFlag = (body, id) => {
  const url = `/api/proverbs/flag/${id}`;
  //console.log(customGet(url));
  return customPost({ data: body, url });
};

export const deleteFlag = (id) => {
  const url = `/api/proverbs/flag/${id}/delete`;
  //console.log(customGet(url));
  return customPost({ data: {}, url });
};
