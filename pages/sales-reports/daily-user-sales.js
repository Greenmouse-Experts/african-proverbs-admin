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
import { getDailyUserSales } from "@/services/salesReport";
import DatePicker from "react-datepicker";
import {
  dailyUserSalesColumns,
  formatDate,
  formatNumberWithCommas,
} from "@/components/SalesReports/utils";
import { generalSalesStyles } from "@/components/SalesReports/styles/styles";
import { ReportDialog } from "@/components/SalesReports/ReportDialog";
import MuiAlert from "@material-ui/lab/Alert";
import { useReactToPrint } from "react-to-print";
import moment from "moment/moment";

const createData = ({ name, total_count, email, total_purchase }) => {
  return { name, email, total_count, total_purchase };
};

const rowsData = (rdata) => {
  //console.log("Date Data", rdata);
  return rdata.map((data) => {
    const { name, email, total_count, total_purchase } = data || {};
    return createData({
      name,
      email,
      total_count,
      total_purchase,
    });
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
  const [fieldVal, setFieldVal] = useState("");
  const [dataFilters, setDataFilters] = useState(false);
  const [clearFilter, setClearFilter] = useState(false);
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
    const filterResults = await getDailyUserSales({
      start_date: formatDate(startDate),
      end_date: formatDate(endDate),
      user: fieldVal || "All",
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
      const reportsData = await getDailyUserSales({
        start_date: "2023-08-01",
        end_date: "2023-12-31",
        user: "All",
      });
      const reportData = rowsData(reportsData?.data);
      setPackageData(reportData);
      if (reportData.length) {
        setDataFilters(true);
      }
    };
    getReports();
  }, [filters]);

  return (
    <>
      {packageData.length ? (
        <Box style={{ marginBottom: "4rem" }}>
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
                    {dailyUserSalesColumns.map((column) => (
                      <TableCell
                        key={column.id}
                        align={column.align}
                        style={{
                          width: column.minWidth,
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
                    .map((row, index) => {
                      return (
                        <TableRow
                          hover
                          role="checkbox"
                          tabIndex={-1}
                          key={index}
                        >
                          {dailyUserSalesColumns.map((column) => {
                            const value = row[column?.id];
                            return (
                              <TableCell
                                style={{
                                  width: column.minWidth,
                                  overflowWrap: "anywhere",
                                }}
                                key={column?.id}
                                align={column?.align}
                              >
                                {column?.id === "total_purchase"
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
            fieldVal={fieldVal}
            fieldContent={"user email"}
            setFieldVal={setFieldVal}
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
        <Box
          style={{
            width: "100%",
            height: "30vh",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Typography variant="subtitle1">
            {" "}
            User sales not found
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
