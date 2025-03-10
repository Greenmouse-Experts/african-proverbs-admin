import { objectToQueryString } from "@/utils/utilities";
import HttpService from "./httpService";

export const FetchSubscribers = (query) => {
  const http = new HttpService();
  const url = "api/packages/search";
  const path = objectToQueryString(url, query);
  return http.getDataWithToken(path);
  //.then((data) => data)
};

export const SearchSubscribers = (url) => {
  //?search=mirox11446@fandsend.com
  const http = new HttpService();
  return http.getDataWithToken(url);
};

export const AdminupdateUserProfile = (formData, id) => {
  const http = new HttpService();
  const url = `api/user/profile/${id}`;
  return http.postDataWithToken(formData, url);
};

export const FetchSubscription = (user_id) => {
  const http = new HttpService();
  const url = `api/packages/${user_id}/user`;
  return http.getDataWithToken(url);
  //.then((data) => data)
};
