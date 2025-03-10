import { Select } from "@material-ui/core";
import jwt_decode from "jwt-decode";
import React from "react";
import moment from "moment";


export const getAccessToken = () => {
  return localStorage.getItem(process.env.tokenName);
};

export const generateUserDetails = (data) => {
  const {
    author_profile,
    email,
    ethnics,
    user_type,
    roles,
    permissions,
    id,
    user_created_proverbs,
    user_published_proverbs,
    user_reviewed_proverbs,
  } = data;
  return {
    id: id,
    userId: author_profile.id,
    first_name: author_profile.first_name,
    last_name: author_profile.last_name,
    phone_number: author_profile.phone_number,
    email,
    user_type,
    roles,
    permissions,
    ethnics,
    proverbs_created: user_created_proverbs,
    proverbs_published: user_published_proverbs,
    proverbs_reviewed: user_reviewed_proverbs,
  };
};

export const REVIEWER = "Reviewer";
export const SUPERADMIN = "SuperAdmin";
export const ADMIN = "Admin";
export const AUTHOR = "Author";
export const PUBLISHER = "Publisher";

export const saveAccessToken = (token) => {
  localStorage.setItem(process.env.tokenName, token);
};

export const checkPermission = (roles, role) => {
  return roles.some((permission) => permission.name === role);
};

export const htmlFilter = (text) => {
  return text.replace(/<(.|\n)*?>/g, "").trim();
};

let proverbCategories = [];

export const retrieveCategoryArray = (SelectedOptions) => {
  proverbCategories = [];
  SelectedOptions.map((option) => {
    proverbCategories.push(option.value);
  });
  return proverbCategories;
};

export const retrieveIDs = (SelectedOptions) => {
  proverbCategories = [];
  SelectedOptions.map((option) => {
    proverbCategories.push(option.id);
  });
  return proverbCategories;
};

export const formatCategoryOptions = (initialCategories) => {
  const newCategories = [];
  initialCategories.map((category) => {
    const option = {
      label: category.name,
      value: category.id,
    };
    newCategories.push(option);
  });
  return newCategories;
};

export const formatAffiliateOptions = (initialAffiliate) => {
  const newAffiliate = [];
  initialAffiliate?.map((aff) => {
    const option = {
      label: aff.ethnicName,
      value: aff.ethnicId,
    };
    newAffiliate.push(option);
  });
  return newAffiliate;
};





export const formatUserOptions = (initialusers) => {
  // console.log("users", initialusers)

  const newUsers = [];
  initialusers.map((user) => {
    const option = {
      label: user.email,
      value: user.userId,
    };
    newUsers.push(option);
  });
  return newUsers;
};

export const formatEthnicOptions = (initialEthnic) => {
  const newEthnics = [];
  initialEthnic.map((ethnic) => {
    const option = {
      label: ethnic.name,
      value: ethnic.id,
    };
    newEthnics.push(option);
  });
  return newEthnics;
};

export const formatCountries = (initialCountry) => {
  const newCountry = [];
  initialCountry.map((country) => {
    const option = {
      label: country.name,
      value: country.id,
    };
    newCountry.push(option);
  });
  return newCountry;
};

export const retrieveEtnicNames = (SelectedOptions) => {
  SelectedOptions.map((option) => {
    proverbCategories.push(option.name);
  });
  return proverbCategories;
};

export const retrieveEtnicId = (SelectedOptions) => {
  SelectedOptions.map((option) => {
    proverbCategories.push(option.id);
  });
  return proverbCategories;
};

export const trimText = (text) => {
  return text.length > 20 ? text.slice(0, 20) + "..." : text;
};

export const proverbTableHeader = [
  { id: 1, title: "ProverbID" },
  { id: 2, title: "Proverbs" },
  { id: 3, title: "Categories" },
  { id: 4, title: "Interpretations" },
  { id: 5, title: "Transliterations" },
  { id: 6, title: "Ethnicity" },
  { id: 7, title: "Origin" },
  { id: 8, title: "Current Status" },
  { id: 9, title: "Created At" },
  { id: 10, title: "Actions" },
];

export const tableHeader = [
  { id: 1, title: "S/N" },
  { id: 2, title: "Proverbs" },
  { id: 3, title: "Categories" },
  { id: 4, title: "Interpretations" },
  { id: 5, title: "Transliterations" },
  { id: 6, title: "Ethnicity" },

  { id: 7, title: "Current Status" },
  { id: 8, title: "Created At" },
  { id: 9, title: "Actions" },
];

export const proverbLikelihoodTableHeader = [
  { id: 1, title: "Proverbs" },
  { id: 2, title: "Categories" },
  { id: 3, title: "Ethnicity" },
  { id: 4, title: "Current Status" },
];

export const proverbDataHeader = [
  { id: 1, title: "id" },
  { id: 2, title: "Name" },
  { id: 3, title: "Slug" },
  { id: 4, title: "Date Created" },
  { id: 5, title: "Date Modified" },
];

export const languageProverbTableHeader = [
  { id: 1, title: "Proverbs" },
  { id: 2, title: "Categories" },
  { id: 2, title: "Ethnicity" },
  { id: 4, title: "Current Status" },
  { id: 3, title: "Created At" },
];

export const fetchFirstNthItems = (items, number) => {
  if (items.length < number) return items;
  return items.slice(0, number).map((i) => {
    return i;
  });
};

export const verifyToken = (token) => {
  console.log("Verifying....");
  try {
    const { exp } = jwt_decode(token);
    const expirationTime = exp * 1000 - 60000;
    if (Date.now() >= expirationTime) {
      window.location.href = process.env.appBaseUrl + "/logout";
    }
  } catch (error) {
    window.location.href = process.env.appBaseUrl + "/logout";
  }
  return;
};

export const convTime = (date) => {
  // var timestamp = Number(date)
  var date = new Date(date);
  return date.toDateString();
};

export const checkInterpretationUniqueness = (
  interpretations,
  languageID,
  id
) => {
  if (interpretations < 1) {
    return false;
  }
  if (id) {
    const clonedinterpretations = interpretations.filter(
      (data) => data.id != id
    );
    var checkSum = clonedinterpretations.filter(
      (inter) => inter.language.id == languageID
    );
  } else {
    var checkSum = interpretations.filter(
      (inter) => inter.language.id == languageID
    );
  }
  if (checkSum.length > 0) {
    return true;
  } else {
    false;
  }
};

export const checkTransliterationUniqueness = (
  transliterations,
  languageID,
  id
) => {
  if (transliterations.length < 1) {
    return false;
  }
  if (id) {
    const clonedtransliterations = transliterations.filter(
      (data) => data.id !== id
    );
    var checkSum = clonedtransliterations.filter(
      (trans) => trans.language.id == languageID
    );
  } else {
    var checkSum = transliterations.filter(
      (trans) => trans.language.id == languageID
    );
  }

  if (checkSum.length > 0) {
    return true;
  } else {
    false;
  }
};

export const OnlySuperAdmin = (userroles, roles) => {
  if (checkPermission(userroles, "Admin")) {
    var newroles = roles.filter(
      (permission) => permission.name !== "SuperAdmin"
    );
    return newroles;
  }
  return roles;
};

export const checkWhoUserIs = (user) => {
  if (checkPermission(user?.roles, "Reviewer")) {
    return (
      <h5 className="col-xl-12 pt-3 mb-5">
        {" "}
        No proverb was sent by Author for review{" "}
      </h5>
    );
  } else if (checkPermission(user.roles, "Author")) {
    return (
      <h5 className="col-xl-12 pt-3 mb-5">
        {" "}
        No proverb has been created by you{" "}
      </h5>
    );
  } else if (checkPermission(user.roles, "Publisher")) {
    return (
      <h5 className="col-xl-12 pt-3 mb-5">
        {" "}
        No proverb was sent by reviewer for publishing{" "}
      </h5>
    );
  } else {
    return <h5 className="col-xl-12 pt-3 mb-5"> No proverbs </h5>;
  }
};

export const filterStatus = (permission) => {
  if (
    checkPermission(permission, "Reviewer") |
    checkPermission(permission, "Admin") |
    checkPermission(permission, "SuperAdmin")
  ) {
    var status = [
      "ALL",
      "AWAITING",
      "ACCEPTED",
      "REJECTED",
      "UNPUBLISHED",
      "PUBLISHED",
      "CREATED",
    ];
  } else if (checkPermission(permission, "Publisher")) {
    var status = ["ALL", "AWAITING", "ACCEPTED", "PUBLISHED", "UNPUBLISHED", "CREATED"];
  } else if (checkPermission(permission, "Publisher")) {
    var status = ["ALL", "AWAITING", "ACCEPTED", "PUBLISHED", "UNPUBLISHED", "CREATED"];
  } else {
    var status = [
      "ALL",
      "CREATED",
      "AWAITING",
      "ACCEPTED",
      "REJECTED",
      "PUBLISHED",
      "UNPUBLISHED",
      "CREATED"
    ];
  }
  return status;
};

export const checkUserDeleteButton = (roles, status) => {
  if (
    checkPermission(roles, "Author") &&
    (status !== "ACCEPTED") |
    (status !== "PUBLISHED") |
    (status !== "UNPUBLISHED")
  ) {
    return true;
  } else if (checkPermission(roles, "Reviewer") && status !== "PUBLISHED") {
    return true;
  } else if (
    checkPermission(roles, "Publisher") |
    checkPermission(roles, "SuperAdmin") |
    checkPermission(roles, "Admin")
  ) {
    return true;
  } else {
    return false;
  }
};

export const checkUserUpdateButton = (roles, status) => {
  if (
    checkPermission(roles, "Author") &&
    (status !== "ACCEPTED") |
    (status !== "PUBLISHED") |
    (status !== "UNPUBLISHED")
  ) {
    return true;
  } else if (checkPermission(roles, "Reviewer") && status !== "PUBLISHED") {
    return true;
  } else if (
    checkPermission(roles, "Publisher") |
    checkPermission(roles, "SuperAdmin") |
    checkPermission(roles, "Admin")
  ) {
    return true;
  } else {
    return false;
  }
};

export const checkUserReviewButton = (roles, status) => {
  if (checkPermission(roles, "Reviewer") && status !== "PUBLISHED") {
    return true;
  } else if (
    checkPermission(roles, "SuperAdmin") | checkPermission(roles, "Admin")
  ) {
    return true;
  } else {
    return false;
  }
};

export const checkProverbAdmin = (user, object) => {
  if (user && user.user_type == "PROVERB_ADMIN") {
    return object;
  } else {
    return;
  }
};

export const checkFamilyAdmin = (user, object) => {
  if (user && user.user_type == "FAMILY_TREE_ADMIN") {
    return object;
  } else {
    return;
  }
};

export const formatUrlByAuth = (role, ethnics, status) => {
  var adminUrl = "";
  if (status && status !== "ALL") {
    if (checkPermission(role, ADMIN) | checkPermission(role, SUPERADMIN)) {
      adminUrl = status
        ? `api/proverbs/proverbs/?ethnic_in=${ethnics}&status_in=${status}`
        : `api/proverbs/proverbs/?ethnic_in=${ethnics}`;
    } else if (checkPermission(role, "Reviewer")) {
      adminUrl = status
        ? `api/proverbs/proverbs/?ethnic_in=${ethnics}&status_in=${status}`
        : `api/proverbs/proverbs/?ethnic_in=${ethnics}`;
    } else if (checkPermission(role, "Publisher")) {
      adminUrl = status
        ? `api/proverbs/proverbs/?ethnic_in=${ethnics}&status_in=${status}`
        : `api/proverbs/proverbs/?ethnic_in=${ethnics}`;
    } else {
      adminUrl = status
        ? `api/proverbs/myproverbs/?ethnic_in=${ethnics}&status_in=${status}`
        : `api/proverbs/myproverbs/?ethnic_in=${ethnics}`;
    }
  } else {
    if (checkPermission(role, ADMIN) | checkPermission(role, SUPERADMIN)) {
      adminUrl = `api/proverbs/proverbs/?ethnic_in=${ethnics}&status_in=AWAITING,ACCEPTED,REJECTED,PUBLISHED,UNPUBLISHED`;
    } else if (checkPermission(role, "Reviewer")) {
      adminUrl = `api/proverbs/proverbs/?ethnic_in=${ethnics}&status_in=AWAITING,ACCEPTED,REJECTED,PUBLISHED,UNPUBLISHED`;
    } else if (checkPermission(role, "Publisher")) {
      adminUrl = `api/proverbs/proverbs/?ethnic_in=${ethnics}&status_in=ACCEPTED,PUBLISHED,UNPUBLISHED`;
    } else {
      adminUrl = `api/proverbs/myproverbs/?ethnic_in=${ethnics}`;
    }
  }
  return adminUrl;
};

export const formatProcedureUrlByAuth = (role, ethnics, status, search) => {
  var adminUrl = "";
  const base = "api/proverbs/proverbsview/";
  const myBase = "api/proverbs/myproverbsview/";
  if (status && status !== "ALL") {
    if (checkPermission(role, ADMIN) | checkPermission(role, SUPERADMIN)) {
      adminUrl = status
        ? `${base}?ethnic_in=${ethnics}&status_in=${status}`
        : `api/proverbs/proverbs/?ethnic_in=${ethnics}`;
    } else if (checkPermission(role, "Reviewer")) {
      adminUrl = status
        ? `${base}?ethnic_in=${ethnics}&status_in=${status}`
        : `api/proverbs/proverbs/?ethnic_in=${ethnics}`;
    } else if (checkPermission(role, "Publisher")) {
      adminUrl = status
        ? `${base}?ethnic_in=${ethnics}&status_in=${status}`
        : `api/proverbs/proverbs/?ethnic_in=${ethnics}`;
    } else {
      adminUrl = status
        ? `${myBase}?ethnic_in=${ethnics}&status_in=${status}`
        : `api/proverbs/myproverbs/?ethnic_in=${ethnics}`;
    }
  } else if (search) {
    if (checkPermission(role, ADMIN) | checkPermission(role, SUPERADMIN)) {
      adminUrl = `${base}?ethnic_in=${ethnics}&q=${search}`;
    } else if (checkPermission(role, "Reviewer")) {
      adminUrl = `${base}?ethnic_in=${ethnics}&q=${search}`;
    } else if (checkPermission(role, "Publisher")) {
      adminUrl = `${base}?ethnic_in=${ethnics}&q=${search}`;
    } else {
      adminUrl = `${myBase}?q=${search}`;
    }
  } else {
    if (checkPermission(role, ADMIN) | checkPermission(role, SUPERADMIN)) {
      adminUrl = `${base}?ethnic_in=${ethnics}&status_in=AWAITING,ACCEPTED,REJECTED,PUBLISHED,UNPUBLISHED`;
    } else if (checkPermission(role, "Reviewer")) {
      adminUrl = `${base}?ethnic_in=${ethnics}&status_in=AWAITING,ACCEPTED,REJECTED,PUBLISHED,UNPUBLISHED`;
    } else if (checkPermission(role, "Publisher")) {
      adminUrl = `${base}?ethnic_in=${ethnics}&status_in=ACCEPTED,PUBLISHED,UNPUBLISHED`;
    } else {
      adminUrl = `${myBase}?ethnic_in=${ethnics}`;
    }
  }
  return adminUrl;
};

export const generateSearchSubscriberURL = (date_created, enddate, search) => {
  const queryParams = [];
  let newcreated_date;
  let newenddate;

  if (date_created) {
    queryParams.push({ date_created: `${date_created}` });
  }
  if (enddate) {
    queryParams.push({ enddate: `${enddate}` });
  }

  // Only add the `search` parameter if `date_created` or `enddate` is undefined or null
  if (!date_created && !enddate && search) {
    queryParams.push({ search: `${search}` });
  }
  return queryParams;
};

export function formatDate(date) {
  const originalDate = new Date(date);
  const formattedDate = originalDate.toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });

  return formattedDate;
}

export const objectToQueryString = (path, obj) => {
  const queryString = Object.keys(obj)
    .map((key) => encodeURIComponent(key) + "=" + encodeURIComponent(obj[key]))
    .join("&");
  return path + "?" + queryString;
};

export const questionsHeader = [
  { id: 1, title: "Question" },
  { id: 2, title: "Question Type" },
  { id: 3, title: "Current Status" },
  { id: 4, title: "Created At" },
  { id: 5, title: "Actions" },
];

export function sliceStringUpToWord(inputString, targetWord) {
  const index = inputString.indexOf(targetWord);

  if (index !== -1) {
    return inputString.slice(0, index);
  } else {
    // If the target word is not found, return the entire string
    return inputString;
  }
}
export const invalidDate = (data) => {
  return data === "invalid date" || data === null;
};

export const formatDate2 = (dateInput) => {
  const parsedDate = moment(
    dateInput,
    "ddd MMM DD YYYY HH:mm:ss [GMT]ZZ (Z)",
  );
  const outputDate = parsedDate.format("YYYY-MM-DD");
  return outputDate;
};


export const createData = ({
  id,
  name,
  startDate,
  endDate,
  type,
  activeStatus,
}) => {
  return {
    id,
    name,
    startDate,
    endDate,
    type,
    activeStatus,
  };
};

export const subscriptionsData = (subscriptions) => {

  return subscriptions?.map((subscription) => {
    const {
      id,
      subscriberName,
      subscriptionName,
      startDate,
      endDate,
      subscriptionStatus,
    } = subscription;

    return createData({
      id,
      name: subscriberName,
      startDate,
      endDate,
      type: subscriptionName,
      activeStatus: subscriptionStatus,
    });
  });
};