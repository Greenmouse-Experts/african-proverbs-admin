import moment from "moment/moment";

export const monthlyPackageColumns = [
  { id: "package_name", label: "Package Names", minWidth: 170 },
  { id: "total_count", label: "Total Count", minWidth: 150 },
  { id: "sales_price", label: "Sales Price(₦)", minWidth: 170 },
  { id: "total_sales", label: "Total Sales(₦)", minWidth: 170 },
  { id: "date", label: "Date", minWidth: 160 },
];

export const dailyPackageColumns = [
  { id: "package_name", label: "Package Names", minWidth: 170 },
  { id: "total_count", label: "Total Count", minWidth: 150 },
  { id: "sales_price", label: "Sales Price(₦)", minWidth: 170 },
  { id: "total_sales", label: "Total Sales(₦)", minWidth: 170 },
];

export const dailySalesColumns = [
  {},
  {
    id: "total_sales",
    label: "Total Package Sales",
    minWidth: 150,
  },
  { id: "total_sales_Count", label: "Total Package Count", minWidth: 120 }, //(₦)
  {
    id: "start_date",
    label: "Start Date",
    minWidth: 170,
    //align: "right",
    format: (value) => value.toFixed(2),
  },
  {
    id: "end_date",
    label: "End Date",
    minWidth: 170,
    //align: "right",
    format: (value) => value.toFixed(2),
  },
];

export const monthlySalesColumns = [
  {},
  {
    id: "total_sales",
    label: "Total Package Sales",
    minWidth: 150,
  },
  {
    id: "total_count",
    label: "Total Package Count",
    minWidth: 120,
  }, //(₦)
  {
    id: "date",
    label: "Date",
    minWidth: 170,
    //align: "right",
    format: (value) => value.toFixed(2),
  },
];
export const userListingByDateRangeColumns = [
  {},
  {
    id: "name",
    label: "Name",
    minWidth: 150,
  },
  {
    id: "package_name",
    label: "Package Name",
    minWidth: 120,
  }, //(₦)
  {
    id: "paid_amount",
    label: "Paid Amount(₦)",
    minWidth: 120,
  }, //(₦)
  {
    id: "dateCreated",
    label: "Date Created",
    minWidth: 170,
    //align: "right",
    format: (value) => value.toFixed(2),
  },
];

export const salesListingByDateRangeColumns = [
  {},
  {
    id: "username",
    label: "Name",
    minWidth: 150,
  },
  {
    id: "packagename",
    label: "Package Name",
    minWidth: 120,
  }, //(₦)
  {
    id: "amount",
    label: "Amount(₦)",
    minWidth: 120,
  }, //(₦)
  {
    id: "date",
    label: "Sales Date",
    minWidth: 170,
    //align: "right",
    format: (value) => value.toFixed(2),
  },
];
export const dailyUserSalesColumns = [
  { minWidth: 0 },
  { id: "name", label: "Name", minWidth: 200 },
  { id: "email", label: "Email", minWidth: 210 },
  {
    id: "total_count",
    label: "Total Package Count",
    minWidth: 150,
  },
  { id: "total_purchase", label: "Total Package Sales", minWidth: 170 },
];

export const formatDate = (dateInput, dateType) => {
  const parsedDate = moment(dateInput, "ddd MMM DD YYYY HH:mm:ss [GMT]ZZ (Z)");
  let outputDate = parsedDate.format("YYYY-MM-DD");

  if (dateType && dateType === "monthYear") {
    outputDate = parsedDate.format("YYYY-MM");
  }
  //console.log(outputDate);
  return outputDate;
};

export const formatNumberWithCommas = (number) => {
  return Number(number)?.toLocaleString(undefined, {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
};

export const handleDateChange = ({
  data,
  dateType,
  saveDateChanges,
  _setDate,
}) => {
  if (data === null) {
    //setStartDate(new Date());
    _setDate((data = new Date()), dateType);
  }
  if (data?.type === "change") {
    const parseDate = new Date(Date.parse(data?.target?.value));
    if (parseDate !== "Invalid Date") {
      if (!isNaN(parseDate.getTime())) {
        saveDateChanges.current(parseDate, dateType);
      } else {
        //setStartDate(new Date());
        _setDate((data = new Date()), dateType);
      }
    }
  } else {
    if (data instanceof Date) {
      _setDate(data, dateType);
    }
  }
};

export const removeStringSpace = (str) => str.replace(/\s/g, "");
