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
import Link from "next/link";
import {
  convTime,
  checkPermission,
  fetchFirstNthItems,
  formatDate,
} from "@/utils/utilities";

import {
  fetchQuestions,
  deleteQuestion,
} from "@/store/actions/factQuestionAction";
import DeletePopUp from "./DeletePopUp";
import Router, { useRouter } from "next/router";
import ReactTooltip from "react-tooltip";
import { useDispatch, useSelector } from "react-redux";
import { orderBy } from "lodash";

const useStyles = makeStyles({
  root: {
    width: "100%",
  },
  container: {
    maxHeight: 700,
  },
});

const QuestionsTable = (props) => {
  const classes = useStyles();
  const router = useRouter();
  const dispatch = useDispatch();
  const { user, msg } = useSelector((state) => state.auth);

  const [showDeletePopup, setShowDeletePopup] = useState(false);
  const [deleteQuestionId, setDeleteQuestionId] = useState(null);

  const nonDeletedQuestions =
    props?.rows?.content?.filter((item) => !item?.data?.deleted) || [];
  // const sortedQuestions = orderBy(
  //   nonDeletedQuestions,
  //   ["data.date_created"],
  //   ["desc"]
  // );
  const openDeletePopup = (id) => {
    setDeleteQuestionId(id);
    setShowDeletePopup(true);
  };

  const closeDeletePopup = () => {
    setDeleteQuestionId(null);
    setShowDeletePopup(false);
  };

  const handleDelete = (id) => {
    dispatch(deleteQuestion(id))
      .then(() => {
        router.reload("/fact-questions");
      })
      .catch((error) => {
        console.error(error);
      });
  };

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
                  style={{ minWidth: column.minWidth || 190, margin: "auto" }}
                >
                  {column.title}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {nonDeletedQuestions?.map((row) => {
              const rowData = row?.data;
              return (
                <TableRow hover role="checkbox" tabIndex={-1} key={rowData.id}>
                  {/* <TableCell>{rowData.id}</TableCell> */}
                  <TableCell style={{ minWidth: "300px" }}>
                    {rowData?.question ? rowData?.question : "N/A"}
                  </TableCell>
                  <TableCell>{rowData?.type ? rowData?.type : "N/A"}</TableCell>

                  <TableCell>
                    <span
                      className={`badge  p-1 ${
                        rowData.status === "ACTIVE"
                          ? "badge-info"
                          : "badge-danger"
                      }`}
                    >
                      {rowData.status ? rowData.status : "N/A"}
                    </span>
                  </TableCell>
                  <TableCell>
                    {rowData.date_created !== null
                      ? convTime(rowData.date_created)
                      : "N/A"}
                  </TableCell>

                  <TableCell>
                    <ul className="list-inline mb-0">
                      {user &&
                      user?.roles &&
                      (checkPermission(user.roles, "Author") ||
                        checkPermission(user.roles, "Admin") ||
                        checkPermission(user.roles, "SuperAdmin")) ? (
                        <>
                          <li className="list-inline-item">
                            <a
                              className="icon circle-icon"
                              data-tip
                              data-for="edit"
                            >
                              <Link href={`/update-question/${rowData.id}`}>
                                <i className="mdi mdi-circle-edit-outline text-primary"></i>
                              </Link>
                            </a>
                            <ReactTooltip id="edit" place="top" effect="solid">
                              Edit Question
                            </ReactTooltip>
                          </li>
                          <li
                            className="list-inline-item"
                            style={{ position: "relative" }}
                          >
                            <a
                              onClick={() => openDeletePopup(rowData.id)}
                              className="icon circle-icon"
                              data-tip
                              data-for="delete"
                            >
                              <i className="mdi mdi-delete text-danger"></i>
                            </a>
                            <ReactTooltip
                              id="delete"
                              place="top"
                              effect="solid"
                            >
                              Delete Question
                            </ReactTooltip>
                          </li>
                        </>
                      ) : null}
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

      {showDeletePopup && (
        <DeletePopUp
          onClose={closeDeletePopup}
          onConfirm={() => {
            handleDelete(deleteQuestionId);
            closeDeletePopup();
          }}
        />
      )}
    </Paper>
  );
};

export default QuestionsTable;
