import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TablePagination from "@material-ui/core/TablePagination";
import TableRow from "@material-ui/core/TableRow";
import { convTime, fetchFirstNthItems } from "@/utils/utilities";
import Router, { useRouter } from "next/router";
import ReactTooltip from "react-tooltip";
import { useSelector, useDispatch } from "react-redux";

const useStyles = makeStyles({
  root: {
    width: "100%",
  },
  container: {
    maxHeight: 700,
  },
});

const ProverbsTable = (props) => {
  const classes = useStyles();
  const router = useRouter();
  const { categories } = useSelector((state) => state.Categories);
  const { user, msg } = useSelector((state) => state.auth);

  const awaitingRows = props?.rows
    .filter((item) => item.status === "AWAITING" || item.status === "PUBLISHED")
    .sort((a, b) => new Date(b.date_created) - new Date(a.date_created));

  return (
    <Paper sx={{ width: "100%", overflow: "hidden" }}>
      <TableContainer className={classes.container}>
        <Table stickyHeader aria-label="proverbs table">
          <TableHead>
            <TableRow>
              {props.tableHeader.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align || "left"}
                  style={{ minWidth: column.minWidth || 150 }}
                >
                  {column.title}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {awaitingRows.map((row, index) => {
              return (
                <TableRow hover role="checkbox" tabIndex={-1} key={row.id}>
                  <TableCell>{index + 1}</TableCell>
                  <TableCell>{row.content ? row.content : "N/A"}</TableCell>

                  <TableCell>
                    {categories &&
                    categories.find(
                      (category) => row.category_id === category.id
                    )
                      ? categories.find(
                          (category) => row.category_id === category.id
                        ).name
                      : "N/A"}
                  </TableCell>

                  <TableCell>
                    {row.english_transliteration ? (
                      <>
                        {" "}
                        {fetchFirstNthItems(
                          row.english_transliteration.split(","),
                          1
                        )}
                      </>
                    ) : (
                      "N/A"
                    )}
                  </TableCell>
                  <TableCell>
                    {row.english_interpretation ? (
                      <>
                        {" "}
                        {fetchFirstNthItems(
                          row.english_interpretation.split(","),
                          1
                        )}
                      </>
                    ) : (
                      "N/A"
                    )}
                  </TableCell>
                  <TableCell>
                    {user &&
                    user.ethnics.some((ethnic) => row.ethnic_id === ethnic.id)
                      ? user.ethnics
                          .filter((ethnic) => row.ethnic_id === ethnic.id)
                          .map((matchingEthnic) => matchingEthnic.name)
                          .join(", ")
                      : "N/A"}
                  </TableCell>

                  <TableCell>
                    <span
                      className={`badge  p-1 ${
                        row.status === "PUBLISHED"
                          ? "badge-info"
                          : "badge-danger"
                      }`}
                    >
                      {row.status ? row.status : "AWAITING"}
                    </span>
                  </TableCell>
                  <TableCell>{convTime(row.date_created)}</TableCell>
                  <TableCell>
                    <ul className="list-inline mb-0">
                      <li className="list-inline-item">
                        <a
                          data-tip
                          data-for="view"
                          className="icon circle-icon "
                          onClick={() =>
                            Router.push({
                              pathname: "/suggested-proverbs/details",
                              query: { q: row.id },
                            })
                          }
                        >
                          <i className="mdi mdi-eye text-purple"></i>
                        </a>
                        <ReactTooltip id="view" place="top" effect="solid">
                          View Details
                        </ReactTooltip>
                      </li>
                    </ul>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[]}
        component="div"
        count={props.totalElements}
        rowsPerPage={props.rowsPerPage}
        page={props.currentPage - 1}
        onPageChange={(event, newPage) => props.handleChangePage(newPage + 1)}
        onRowsPerPageChange={props.handleChangeRowsPerPage}
      />
    </Paper>
  );
};

export default ProverbsTable;
