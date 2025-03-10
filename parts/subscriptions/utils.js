import countryData from "./data.json";




export const allSubscribers = countryData?.countries.map((country) => {
  return country;
  // return createData(
  //   country.id,
  //   country.name,
  //   country.code,
  //   country.startDate,
  //   country.endDate,
  //   country.subscription,
  //   country.hasExpired,
  // );
});

export const descendingComparator = (a, b, orderBy) => {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
};

export function getComparator(order, orderBy) {
  return order === "desc"
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

export function stableSort(array, comparator) {
  const stabilizedThis = array?.map((el, index) => [el, index]);
  stabilizedThis?.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) {
      return order;
    }
    return a[1] - b[1];
  });
  return stabilizedThis?.map((el) => el[0]);
}

export const filterCountries = (countryArr, endDate) => {
  if (endDate === "none") return countryArr;
  return countryArr.filter((cntry) => cntry.endDate === endDate);
  //return countryArr;
};

export const months = [
  // { abbr: "Jan", name: "January" },
  // { abbr: "Feb", name: "February" },
  // { abbr: "Mar", name: "March" },
  // { abbr: "Apr", name: "April" },
  // { abbr: "May", name: "May" },
  // { abbr: "Jun", name: "June" },
  // { abbr: "Jul", name: "July" },
  // { abbr: "Aug", name: "August" },
  // { abbr: "Sep", name: "September" },
  // { abbr: "Oct", name: "October" },
  // { abbr: "Nov", name: "November" },
  // { abbr: "Dec", name: "December" },
  {
    abbr: "Date",
    name: "Date",
    hasOptions: true,
    options: ["months", "year", "date"],
  },
  {
    abbr: "Is Expired",
    name: "Is Expired",
    hasOptions: true,
    options: ["expired", "not expired"],
  },
  { abbr: "No Filter", name: "No Filter", hasOptions: false },
];
