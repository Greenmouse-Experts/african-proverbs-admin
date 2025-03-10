import withAuth from "@/utils/withAuth";
import React, { useEffect, useState, useRef } from "react";
import { makeStyles } from "@material-ui/core/styles";
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
import { getDailySalesSummary } from "@/services/salesReport";
import moment from "moment/moment";
import {
  dailySalesColumns,
  formatDate,
  formatNumberWithCommas,
} from "@/components/SalesReports/utils";
import { generalSalesStyles } from "@/components/SalesReports/styles/styles";
import { ReportDialog } from "@/components/SalesReports/ReportDialog";
import MuiAlert from "@material-ui/lab/Alert";
import { useReactToPrint } from "react-to-print";

const createData = ({
  total_sales,
  total_sales_Count,
  start_date,
  end_date,
}) => {
  return { total_sales, total_sales_Count, start_date, end_date };
};

const rowsData = (rdata) => {
  //console.log("Date Data", rdata);
  return rdata.map((data) => {
    const { total_sales, total_sales_Count, start_date, end_date } = data || {};
    return createData({ total_sales, total_sales_Count, start_date, end_date });
  });
};

const CustomizedTables = () => {
  const classes = generalSalesStyles();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [packageData, setPackageData] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [openAlert, setOpenAlert] = useState(false);
  const [alertMsg, setAlertMsg] = useState("");
  const [clearFilter, setClearFilter] = useState(false);
  const [dataFilters, setDataFilters] = useState(false);
  const [filters, setFilters] = useState(false);
  const componentRef = useRef();

  // const handleChangePage = (event, newPage) => {
  //   setPage(newPage);
  // };

  // const handleChangeRowsPerPage = (event) => {
  //   setRowsPerPage(+event.target.value);
  //   setPage(0);
  // };

  const handleOpenDialog = () => {
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  const invalidDate = (data) => {
    return data === "invalid date" || data === null;
  };
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
    const filterResults = await getDailySalesSummary({
      start_date: formatDate(startDate),
      end_date: formatDate(endDate),
    });
    const reportData = rowsData(filterResults?.data);
    setPackageData(reportData);
    if (reportData) {
      setClearFilter(true);
    }
    return;
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

  useEffect(() => {
    const getReports = async () => {
      const reportsData = await getDailySalesSummary({
        start_date: "2023-08-18",
        end_date: "2023-11-18",
      });
      //console.log(reportsData.data);
      const reportData = rowsData(reportsData?.data);
      setPackageData(reportData);
      if (reportData.length) {
        setDataFilters(true);
      }
    };
    getReports();
  }, [filters]);

  useEffect(() => {
    packageData.length ? console.log(packageData) : "";
  }, [packageData]);

  return (
    <>
      {packageData.length ? (
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
                    {dailySalesColumns?.map((column) => (
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
                  {packageData
                    //.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    ?.map((row, index) => {
                      return (
                        <TableRow
                          hover
                          role="checkbox"
                          tabIndex={-1}
                          key={index}
                        >
                          {dailySalesColumns?.map((column, index2) => {
                            const value = row[column?.id];
                            return (
                              <TableCell key={index2} align={column?.align}>
                                {column?.id === "start_date" ||
                                column?.id === "end_date"
                                  ? moment(value).format("Do MMMM, YYYY")
                                  : column?.id === "total_sales"
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
      ) : (
        <Box className={classes.noData}>
          <Typography variant="subtitle1">
            {" "}
            Sales summary not found.{" "}
            {dataFilters ? (
              <bold
                onClick={() => {
                  setFilters(!filters);
                }}
                style={{ textDecoration: "underline", cursor: "pointer" }}
              >
                {" "}
                Return
              </bold>
            ) : (
              ""
            )}
          </Typography>
        </Box>
      )}
    </>
  );
};

export default withAuth(CustomizedTables);
