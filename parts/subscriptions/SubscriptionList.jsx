import React, { useEffect, useState } from "react";
import TablePagination from "@material-ui/core/TablePagination";
import TableHeader from "./TableHeader";
import TableToolbar from "./TableToolbar";
import Box from "@material-ui/core/Box";
import Table from "@material-ui/core/Table";
import TableContainer from "@material-ui/core/TableContainer";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import Paper from "@material-ui/core/Paper";
import TableRow from "@material-ui/core/TableRow";
import Checkbox from "@material-ui/core/Checkbox";
import CheckCircleIcon from "@material-ui/icons/CheckCircle";
import CancelIcon from "@material-ui/icons/Cancel";
import SettingsIcon from "@material-ui/icons/Settings";
import QuestionAnswerIcon from '@material-ui/icons/QuestionAnswer';
import { useRouter } from "next/router";
import Button from "@material-ui/core/Button";
import {
  allSubscribers,
  getComparator,
  stableSort,
  filterCountries,
} from "./utils";
import { subscriptionsData } from "@/utils/utilities";
import Link from "next/link";
import { fetchSubscriptionList } from "@/services/subscriptionList";
import Loader from "@/components/UIElements/Loader";
import { subscriptionStyles } from "./styles";
import moment from "moment";
import { Typography } from "@material-ui/core";

const EnhancedTable = () => {
  const [order, setOrder] = useState("asc");
  const [orderBy, setOrderBy] = useState("startDate");
  const [selected, setSelected] = useState([]);
  const [page, setPage] = useState(0);
  const [subscriptionsList, setSubscriptionsList] = useState([]);
  const [filterVal, setfilterVal] = useState("none");
  const [filterCount, setfilterCount] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [loading, setLoading] = useState(false);
  const classes = subscriptionStyles();
  const router = useRouter();


  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelected = subscriptionsList.map((n) => n.name);
      setSelected(newSelected);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event, name) => {
    const selectedIndex = selected.indexOf(name);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, name);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected?.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1),
      );
    }

    setSelected(newSelected);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const isSelected = (name) => selected.indexOf(name) !== -1;

  const emptyRows =
    page > 0
      ? Math.max(0, (1 + page) * rowsPerPage - subscriptionsList?.length)
      : 0;

  useEffect(() => {
    const getSubData = async () => {
      setLoading(true);
      const getData = await fetchSubscriptionList({
        page: page + 1,
        rowsPerPage,
      });
      const filterData = filterSubData(getData?.data?.content);
      //console.log(getData?.data?.content);

      setfilterCount(getData?.data?.size);
      setLoading(false);

      // return stableSort(filterData, getComparator(order, orderBy))?.slice(
      //   page * rowsPerPage,
      //   page * rowsPerPage + rowsPerPage,
      // );
    };
    getSubData();
  }, [order, orderBy, page, rowsPerPage, filterVal]);

  const filterSubData = (data, prop) => {
    //console.log(prop);
    const filteredData = subscriptionsData(data);
    setSubscriptionsList(filteredData);
    if (prop?.size) setfilterCount(prop?.size);
    if (prop?.page) setPage(prop?.page);
    if (prop?.rowsPerPage) setRowsPerPage(prop?.rowsPerPage);
    return filteredData;
  };

  return (
    <Box className={"w-100"}>
      <Paper elevation={0} className={["w-100", classes.wrapper]}>
        <TableToolbar
          handleRequestSort={handleRequestSort}
          numSelected={selected?.length}
          order={order}
          setfilterVal={setfilterVal}
          filterSubData={filterSubData}
          setSubscriptionsList={setSubscriptionsList}
          setPage={setPage}
          setRowsPerPage={setRowsPerPage}
        />
        <TableContainer className={["w-100", classes.container]}>
          {loading ? (
            <Loader />
          ) : subscriptionsList?.length ? (
            <Table
              style={{ minWidth: 750 }}
              //aria-labelledby="tableTitle"
              size={"medium"}
              stickyHeader
              aria-label="sticky table"
            >
              <TableHeader
                numSelected={selected?.length}
                order={order}
                orderBy={orderBy}
                onRequestSort={handleRequestSort}
                rowCount={subscriptionsList?.length}
              />
              <TableBody style={{ border: "2px solid red", width: "100%" }}>
                {subscriptionsList?.map((row, index) => {
                  const isItemSelected = isSelected(row.name);
                  const labelId = `enhanced-table-checkbox-${index}`;
                  const { type } = row;

                  return (
                    <TableRow
                      hover
                      role="checkbox"
                      aria-checked={isItemSelected}
                      tabIndex={-1}
                      key={index}
                      selected={isItemSelected}
                      style={{ cursor: "pointer" }}
                    >

                      <TableCell padding="checkbox"></TableCell>
                      <TableCell
                        component="th"
                        id={labelId}
                        scope="row"
                        padding="none"
                      >
                        {row.name}
                      </TableCell>
                      <TableCell align="left">
                        {moment(row.startDate).format("Do MMMM, YYYY")}
                      </TableCell>
                      <TableCell align="center">
                        {moment(row.endDate).format("Do MMMM, YYYY")}
                      </TableCell>
                      <TableCell align="center">
                        <SettingsIcon
                          onClick={() =>
                            router.push(`/subscriptions/${row.id}`)
                          }
                          fontSize={"medium"}
                          color="action"
                        />
                      </TableCell>
                      <TableCell align="center">
                        <Button
                          variant="contained"
                          style={{
                            textTransform: "none",
                            height: "1.8rem",
                            width: "5rem",
                            color: "white",
                            background: `${type === "GOLD"
                              ? "#cca01d"
                              : type === "SILVER"
                                ? "gray"
                                : "#8D7957"
                              }`,
                          }}
                        >
                          {row.type[0].toUpperCase() +
                            row.type.slice(1).toLowerCase()}
                        </Button>
                      </TableCell>
                    
                      <TableCell align="center">
                        {row.activeStatus === "ACTIVE" ? (
                          <CheckCircleIcon
                            fontSize={"small"}
                            color="secondary"
                          />
                        ) : (
                          <CancelIcon fontSize={"small"} color="disabled" />
                        )}
                      </TableCell>
                    </TableRow>
                  );
                })}

              </TableBody>
            </Table>
          ) : (
            <Typography
              style={{ width: "100%", textAlign: "center", marginTop: "5rem" }}
              variant="subtitle1"
            >
              No subscriptions found
            </Typography>
          )}
        </TableContainer>
        {loading ? (
          <Loader />
        ) : subscriptionsList?.length ? (
          <TablePagination
            rowsPerPageOptions={[5, 10, 25, 50]}
            component="div"
            count={filterCount ?? subscriptionsList?.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
            size={"medium"}
          />
        ) : (
          ""
        )}
      </Paper>
    </Box>
  );
};

export default EnhancedTable;
