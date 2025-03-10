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
import { useDispatch, useSelector } from "react-redux";

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
  const dispatch = useDispatch();

  const awaitingRows = props?.rows
    ?.filter(
      (item) =>
        item.status === "AWAITING" ||
        item.status === null ||
        item.status === "PUBLISHED"
    )
    .sort(
      (a, b) => new Date(b.create_time_stamp) - new Date(a.create_time_stamp)
    );

  return (
    <Paper sx={{ width: "100%", overflow: "hidden" }}>
      <TableContainer className={classes.container}>
        <Table stickyHeader aria-label="proverbs table">
          <TableHead>
            <TableRow>
              {props?.tableHeader?.map((column) => (
                <TableCell
                  key={column?.id}
                  align={column?.align || "left"}
                  style={{ minWidth: column?.minWidth || 160 }}
                >
                  {column?.title}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {awaitingRows?.map((row) => {
              return (
                <TableRow hover role="checkbox" tabIndex={-1} key={row?.id}>
                  <TableCell>{row?.proverbId}</TableCell>
                  <TableCell>{row?.content ? row?.content : "N/A"}</TableCell>

                  <TableCell>
                    {row?.categories ? (
                      <> {fetchFirstNthItems(row?.categories, 1)}</>
                    ) : (
                      "N/A"
                    )}
                  </TableCell>

                  <TableCell>
                    {row?.proverbTransliteration ? (
                      <>
                        {" "}
                        {row?.proverbTransliteration?.split(",")[0] || "N/A"}
                      </>
                    ) : (
                      "N/A"
                    )}
                  </TableCell>
                  <TableCell>
                    {row?.proverbInterpretation ? (
                      <> {row?.proverbInterpretation?.split(",")[0] || "N/A"}</>
                    ) : (
                      "N/A"
                    )}
                  </TableCell>

                  <TableCell>
                    {row?.proverbEthnic ? row?.proverbEthnic : "N/A"}
                  </TableCell>
                  <TableCell>
                    <span
                      className={`badge  p-1 ${
                        row?.status === "PUBLISHED"
                          ? "badge-info"
                          : "badge-danger"
                      }`}
                    >
                      {row?.status ? row?.status : "AWAITING"}
                    </span>
                  </TableCell>
                  <TableCell>{convTime(row?.dateCreated)}</TableCell>
                  <TableCell>
                    <ul className="list-inline mb-0">
                      <li className="list-inline-item">
                        <a
                          data-tip
                          data-for="view"
                          className="icon circle-icon "
                          onClick={() =>
                            Router.push({
                              pathname: "/corrected-proverbs/details",
                              query: { q: row?.proverbId },
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
        count={props?.rows?.length}
        rowsPerPage={props?.rowsPerPage}
        page={props?.currentPage - 1}
        onPageChange={(event, newPage) => props.handleChangePage(newPage + 1)}
        onRowsPerPageChange={props?.handleChangeRowsPerPage}
      />
    </Paper>
  );
};

export default ProverbsTable;
