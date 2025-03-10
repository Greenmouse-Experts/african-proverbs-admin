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

export const getDailyPackageSales = ({ start_date, end_date, packageid }) => {
  //packageid = "0451c295-e9c9-47bc-b4d2-8fa2966d13f1";
  const url = `/api/reportsummary/package_summary_By_DateRange/${start_date}/${end_date}/${packageid}`;
  //console.log(customGet(url));
  return customGet(url);
};

export const getMonthlyPackageSales = ({ start_date, end_date, packageid }) => {
  //packageid = "0451c295-e9c9-47bc-b4d2-8fa2966d13f1";
  const url = `/api/reportsummary/sales_summary_by_month_by_package/${start_date}/${end_date}/${packageid}`;
  //console.log(customGet(url));
  return customGet(url);
};

export const getDailySalesSummary = ({ start_date, end_date }) => {
  start_date = start_date;
  end_date = end_date;
  const url = `/api/reportsummary/sales_summary_By_DateRange/${start_date}/${end_date}`;
  //console.log(customGet(url));
  return customGet(url);
};

export const getMonthlySalesSummary = ({ start_date, end_date }) => {
  start_date = start_date;
  end_date = end_date;
  const url = `/api/reportsummary/salesSummaryByMonth/${start_date}/${end_date}`;
  //console.log(customGet(url));
  return customGet(url);
};

export const getUserListingByDateRange = ({
  start_date,
  end_date,
  package: packageId,
}) => {
  // start_date = start_date;
  // end_date = end_date;
  const url = `/api/reportsummary/users_listing_by_date_range/${start_date}/${end_date}/${packageId}`;
  return customGet(url);
};

export const getSalesListingByDateRange = ({
  start_date,
  end_date,
  package: packageid,
}) => {
  start_date = start_date;
  end_date = end_date;
  const url = `/api/reportsummary/saleslistByDateRange/${start_date}/${end_date}/${packageid}`;
  return customGet(url);
};

export const getDailyUserSales = ({ start_date, end_date, user }) => {
  //start_date = "2023-10-18";
  //end_date = "2023-10-18";
  const url = `/api/reportsummary/users_summary_by_date_range/${start_date}/${user}/${end_date}`;
  //console.log(customGet(url));
  return customGet(url);
};

export const getMonthlyUserSales = ({ start_date, end_date }) => {
  //start_date = "2023-10";
  //end_date = "2023-10";
  const url = `/api/reportsummary/user_sales_summary_by_month/${start_date}/${end_date}`;
  //console.log(customGet(url));
  return customGet(url);
};

export const fetchSubscriptionList = (data) => {
  const body = {
    name: data?.name,
    page: data?.page,
    size: data?.rowsPerPage,
  };
  const url = `/api/userPackage/subscription-list`;
  //console.log(customGet(url));
  return customPost({ data: body, url });
};
