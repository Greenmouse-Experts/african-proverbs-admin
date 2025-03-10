import React, { useEffect, useRef, useState } from 'react'
import withAuth from "@/utils/withAuth";
import Paper from "@material-ui/core/Paper";
import Box from "@material-ui/core/Box";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TablePagination from "@material-ui/core/TablePagination";
import TableRow from "@material-ui/core/TableRow";
import { Button, Typography, Snackbar } from "@material-ui/core";
import moment from "moment/moment";
import { generalSalesStyles } from "@/components/SalesReports/styles/styles";
import { ReportDialog } from "@/components/SalesReports/ReportDialog";
import MuiAlert from "@material-ui/lab/Alert";
import { useReactToPrint } from "react-to-print";
import {
  userListingByDateRangeColumns,
  formatDate,
  removeStringSpace,
  formatNumberWithCommas,
} from "@/components/SalesReports/utils";
import { getUserListingByDateRange } from "@/services/salesReport";
import { getActivePackages } from '@/services/packageService';

const createData = ({ name, package_name, paid_amount, dateCreated }) => {
  return { name, package_name, paid_amount, dateCreated };
};

const rowsData = (rdata) => {
  // console.log("Date Data", rdata);
  return rdata.map((data) => {
    const { name, package_name, paid_amount, dateCreated } = data || {};
    return createData({ name, package_name, paid_amount, dateCreated });
  });
};

const UserListByDateRange = () => {
  const classes = generalSalesStyles();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [userData, setuserData] = useState([])
  const [openDialog, setOpenDialog] = useState(false);
  const [activePackages, setactivePackages] = useState([])
  const [selectedPackageId, setSelectedPackageId] = useState(null);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [openAlert, setOpenAlert] = useState(false);
  const [alertMsg, setAlertMsg] = useState("");
  const [fieldVal, setFieldVal] = useState("");
  const [clearFilter, setClearFilter] = useState(false);
  const [filters, setFilters] = useState(false);
  const [dataFilters, setDataFilters] = useState(false);
  const componentRef = useRef();

   const handleOpenDialog = () => {
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

   const invalidDate = (data) => {
    return data === "invalid date" || data === null;
  };

  const handleCloseAlert = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpenAlert(false);
  };

  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });
   const sendRequest = async () => {
    if (invalidDate(startDate) || invalidDate(endDate)) {
      //alert(`${invalidDate(startDate)} startDate`);
      setAlertMsg(`Both date fields must be selected`);
      setTimeout(() => {
        setOpenAlert(true);
      }, 100);
      return;
    }

    if (startDate > endDate) {
      //alert(`startDate is greater`);

      setAlertMsg(`First date value must be earlier`);
      setTimeout(() => {
        setOpenAlert(true);
      }, 100);
      return;
    }
    const filterResults = await getUserListingByDateRange({
      start_date: formatDate(startDate),
      end_date: formatDate(endDate),
      package: selectedPackageId,
    });
    const reportData = rowsData(filterResults?.data.user_list);
    setuserData(reportData);
    if (reportData) {
      setClearFilter(true);
    }
    return;
  };

   useEffect(() => {
    
    const getReports = async () => {
      const reportsData = await getUserListingByDateRange({
        start_date: "2023-08-01",
        end_date: "2023-12-22",
        package: "All",
      });
      // console.log(reportsData, "Usergfdlkldfgdfgfdlkl");
      const reportData = rowsData(reportsData?.data.user_list);
      
      setuserData(reportData);
      if (reportData.length) {
        setDataFilters(true);
      }
      
    };
    getReports();
  }, [filters]);

  useEffect(() => {
    if(openDialog){
      const getPackages = async () => {
        const packages = await getActivePackages();
        setactivePackages(packages.data)
      }
      getPackages()
    }
  }, [openDialog])
  return (
    <>
      {userData.length ? (
        <>
          <Box>
            <Box
              style={{
                width: "100%",
                display: "flex",
                justifyContent: "space-between",
                padding: "0rem 3rem 1.5rem",
              }}
            >
              <Box>
                <Button
                  style={{
                    textTransform: "none",
                    background: "darkgreen",
                    alignSelf: "flex-end",
                    height: "2.5rem",
                    color: "white",
                  }}
                  onClick={() => handleOpenDialog()}
                >
                  Filter Reports
                </Button>
                {clearFilter ? (
                  <Button
                    style={{
                      textTransform: "none",
                      background: "lightgray",
                      alignSelf: "flex-end",
                      height: "2.5rem",
                      color: "black",
                      marginLeft: "2rem",
                    }}
                    onClick={() => {
                      setFilters(!filters);
                      setClearFilter(false);
                    }}
                  >
                    Clear Filters
                  </Button>
                ) : (
                  ""
                )}
              </Box>

              <Button
                variant="contained"
                //color="primary"
                style={{
                  textTransform: "none",
                  background: "black",
                  alignSelf: "flex-end",
                  height: "2.5rem",
                  color: "white",
                }}
                onClick={handlePrint}
              >
                Generate Report
              </Button>
            </Box>
            <Paper className={classes.root} ref={componentRef}>
              <TableContainer className={classes.container}>
                <Table stickyHeader aria-label="sticky table">
                  <TableHead>
                    <TableRow>
                      {userListingByDateRangeColumns.map((column) => (
                        <TableCell
                          key={column.id}
                          align={column.align}
                          style={{
                            minWidth: column.minWidth,
                            background: "ghostwhite",
                          }}
                        >
                          {column.label}
                        </TableCell>
                      ))}
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {userData
                      //.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                      .map((row, index) => {
                        return (
                          <TableRow
                            hover
                            role="checkbox"
                            tabIndex={-1}
                            key={index}
                          >
                            {userListingByDateRangeColumns.map((column) => {
                              const value = row[column?.id];
                              return (
                                <TableCell
                                  key={column?.id}
                                  align={column?.align}
                                >
                                  {column?.id === "dateCreated"
                                    ? moment(removeStringSpace(value)).format(
                                        "Do MMMM, YYYY"
                                      )
                                    : column?.id === "paid_amount"
                                    ? "₦ " + formatNumberWithCommas(value)
                                    : value}
                                </TableCell>
                              );
                            })}
                          </TableRow>
                        );
                      })}
                  </TableBody>
                </Table>
              </TableContainer>
            </Paper>
            <ReportDialog
              openDialog={openDialog}
              handleOpenDialog={handleOpenDialog}
              handleCloseDialog={handleCloseDialog}
              startDate={startDate}
              setStartDate={setStartDate}
              endDate={endDate}
              setEndDate={setEndDate}
              sendRequest={sendRequest}
              packages={activePackages}
              showPackageField
              selectedPackageId={selectedPackageId}
              setSelectedPackageId={setSelectedPackageId}
              // handleDateChange={handleDateChange}
              // dateTypeVal={dateTypeVal}
              // setDateTypeVal={setDateTypeVal}
            />
            <Snackbar
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              open={openAlert}
              autoHideDuration={3000}
              onClose={handleCloseAlert}
            >
              <MuiAlert
                elevation={6}
                variant="filled"
                onClose={handleCloseAlert}
                severity="error"
              >
                {alertMsg}
              </MuiAlert>
            </Snackbar>
          </Box>
        </>
      ) : (
        <>
          <Box className={classes.noData}>
            <Typography variant="subtitle1">
              {" "}
              User listing by date range not found
              {dataFilters ? (
                <bold
                  onClick={() => {
                    setFilters(!filters);
                  }}
                  style={{ textDecoration: "underline", cursor: "pointer" }}
                >
                  {" "}
                  show all
                </bold>
              ) : (
                ""
              )}
            </Typography>
          </Box>
        </>
      )}
    </>
  );
}

export default withAuth(UserListByDateRange)