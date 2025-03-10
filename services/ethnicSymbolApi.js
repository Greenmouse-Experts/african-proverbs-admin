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

export const getEthnics = () => {
  const url = `/api/proverbs/ethnic/public?q=all`;
  //console.log(customGet(url));
  return customGet(url);
};

export const getAllSymbols = () => {
  const url = `/ethnic_symbol/list_all?page=1&size=10`;
  //console.log(customGet(url));
  return customGet(url);
};

export const getSymbol = (id) => {
  const url = `/ethnic_symbol/image/${id}`;
  //console.log(customGet(url));
  return customGet(url);
};

export const uploadSymbol = (body) => {
  const url = `/ethnic_symbol/save`;
  //console.log(customGet(url));
  return customPost({ data: body, url });
};

// export const editSymbol = (body) => {
//   const url = `/ethnic_symbol/save`;
//   //console.log(customGet(url));
//   return customPost({ data: body, url });
// };

export const deleteSymbol = (id) => {
  const url = `/ethnic_symbol/delete/${id}`;
  //console.log(customGet(url));
  return customGet(url);
};
