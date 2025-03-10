import HttpService from "./httpService";

export const addPackage = (payload) => {
  const http = new HttpService();
  const url = "api/packages/";
  return http.postDataWithToken(payload, url);
};

export const fetchPackagesBackend = () => {
  const http = new HttpService();
  const url = "api/packages/all";
  return http.getDataWithToken(url);
};

export const fetchAPackageBackend = () => {
  const http = new HttpService();
  const url = `api/packages/${record_id}`;
  return http.getDataWithToken(url);
};

export const deletePackageBackend = (id) => {
  if (typeof id !== "string" && typeof id !== "number") {
    return Promise.reject("Invalid ID");
  }

  const http = new HttpService();
  const url = `api/packages/${id}/delete`;
  return http.getDataWithToken(url);
};

export const updatePackageBackend = (payload) => {
  const http = new HttpService();
  const url = `api/packages/${payload.id}`;
  return http.postDataWithToken(payload, url);
};

export const getActivePackages = () => {
  const http = new HttpService();
  const url = `api/packages/`
  return http.getDataWithToken(url)
}
