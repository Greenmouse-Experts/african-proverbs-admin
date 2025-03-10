import React, { useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TablePagination from "@material-ui/core/TablePagination";
import TableRow from "@material-ui/core/TableRow";
import {
  convTime,
  fetchFirstNthItems,
  htmlFilter,
  retrieveEtnicNames,
} from "@/utils/utilities";
import Router, { useRouter } from "next/router";
import ReactTooltip from "react-tooltip";
import {
  fetchProverbStatus,
  saveProverbs,
} from "@/store/actions/proverbActions";
import { FetchProverbs } from "@/services/proverbService";
import { useDispatch, useSelector } from "react-redux";
import { toggleIsLoading } from "@/store/actions/authActions";

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

  const { user, msg } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  // console.log(router);

  // const { page: routePage, search, ethnic, status } = router.query;

  const handleChangePage = (event, newPage) => {
    props.setPage(newPage);

    // router.push({
    //   pathname: `/proverbs/${props.type}`,
    //   // query: { page: newPage, search, ethnic, status, rowsPerPage },
    //   query: { newPage },
    // });
  };

  // console.log(page);

  const handleChangeRowsPerPage = (event) => {
    props.setRowsPerPage(+event.target.value);
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
                  style={{ minWidth: column.minWidth || "250" }}
                >
                  {column.title}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {props.rows.slice(0, props.rowsPerPage).map((row) => {
              return (
                <TableRow
                  hover
                  //           onClick={() => Router.push({
                  //     pathname: '/proverbs/details',
                  //     query: {q: row.id}
                  // })}
                  role="checkbox"
                  tabIndex={-1}
                  key={row?.id}
                >
                  <TableCell>{row?.id}</TableCell>
                  <TableCell>{htmlFilter(row?.content)}</TableCell>
                  <TableCell>
                    {row?.categories ? (
                      // <>
                      //   {' '}
                      //   {fetchFirstNthItems(row.categories, 1).map(
                      //     (cat) => cat.name
                      //   ) + ' ... '}
                      // </>

                      <> {fetchFirstNthItems(row?.categories.split(","), 1)}</>
                    ) : (
                      "N/A"
                    )}
                  </TableCell>
                  <TableCell>
                    {row?.interpretations ? (
                      <>
                        {" "}
                        {fetchFirstNthItems(
                          row?.interpretations.split("/n"),
                          1
                        )}
                      </>
                    ) : (
                      "N/A"
                    )}
                  </TableCell>
                  <TableCell>
                    {row?.transliterations ? (
                      <>
                        {" "}
                        {fetchFirstNthItems(
                          row?.transliterations.split("/n"),
                          1
                        )}
                      </>
                    ) : (
                      "N/A"
                    )}
                  </TableCell>
                  <TableCell>{row?.ethnic ? row?.ethnic : "N/A"}</TableCell>
                  <TableCell>{row?.origin ? row?.origin : "N/A"}</TableCell>
                  <TableCell>
                    <span className={"badge badge-info"}>{row?.status}</span>
                  </TableCell>
                  <TableCell>{convTime(row?.date_created)}</TableCell>
                  <TableCell>
                    <ul className="list-inline mb-0">
                      <li className="list-inline-item">
                        <a
                          data-tip
                          data-for="view"
                          className="icon circle-icon "
                          onClick={() =>
                            Router.push({
                              pathname: "/proverbs/details",
                              query: { q: row.id },
                            })
                          }
                        >
                          <i className="mdi mdi-eye text-purple"></i>
                        </a>
                        {/* </Link> */}
                        <ReactTooltip id="view" place="top" effect="solid">
                          View Proverb
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
        rowsPerPageOptions={[25, 50, 100]}
        component="div"
        count={props?.rowLength}
        rowsPerPage={props.rowsPerPage}
        page={props.page}
        onPageChange={handleChangePage}
        onChangePage={handleChangePage}
        onChangeRowsPerPage={handleChangeRowsPerPage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  );
};

export default ProverbsTable;
