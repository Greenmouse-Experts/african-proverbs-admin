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

export const getSubscriptionList = (id) => {
  //const id = 41;
  const page = 1;
  const size = 10;
  const url = `/api/userPackage/user-package-subscription-list?id=${id}&page=${page}&size=${size}`;
  //console.log(customGet(url));
  return customGet(url);
};

export const fetchSubscriptionList = (data) => {
  //console.log(data);
  const body = {
    name: data?.name,
    // "email": "angelanyarkoaasah@gmail.com",
    // "packageId": "0451c295-e9c9-47bc-b4d2-8fa2966d13f1",
    // "phoneNo": "233502837549",
    startDateFrom: data?.startDateFrom,
    startDateTo: data?.startDateTo,
    endDateFrom: data?.endDateFrom,
    endDateTo: data?.endDateTo,
    page: data?.page,
    size: data?.rowsPerPage,
  };
  const url = `/api/userPackage/subscription-list`;
  //console.log(customGet(url));
  return customPost({ data: body, url });
};
export const updateAutoRenewal = (data) => {
  const { id, status } = data;
  const url = `/api/userPackage/subscription-list/update-auto-renewal`;
  return customPost({ data, url });
};

export const updateStatus = (data) => {
  const { id, status } = data;
  const url = `/api/userPackage/subscription-list/update-subscription-status`;
  //console.log(customPost({ data, url }));
  return customPost({ data, url });
};
