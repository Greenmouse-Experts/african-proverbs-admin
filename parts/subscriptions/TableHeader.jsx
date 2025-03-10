import * as React from "react";
import Box from "@material-ui/core/Box";
import TableCell from "@material-ui/core/TableCell";
import TableRow from "@material-ui/core/TableRow";
import TableHead from "@material-ui/core/TableHead";
import TableSortLabel from "@material-ui/core/TableSortLabel";
import { headerStyles } from "./styles";

const headCells = [
  {
    id: "name",
    abbr: false,
    disablePadding: true,
    label: "Subscribers",
  },
  {
    id: "startDate",
    abbr: false,
    disablePadding: false,
    label: "Start Date",
  },
  {
    id: "endDate",
    abbr: true,
    disablePadding: false,
    label: "Expiry Date",
  },
  {
    id: "id",
    abbr: true,
    disablePadding: false,
    label: "Manage Subscriptions",
  },
  {
    id: "type",
    abbr: true,
    disablePadding: false,
    label: "Subscription Type",
  },
  {
    id: "activeStatus",
    abbr: true,
    disablePadding: false,
    label: "Is Active",
  },
];

const EnhancedTableHead = (props) => {
  const classes = headerStyles();


  const {
    onSelectAllClick,
    order,
    orderBy,
    numSelected,
    rowCount,
    onRequestSort,
  } = props;
  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };


  return (
    <TableHead>
      <TableRow>
        {/* <TableCell padding="checkbox">
          <Checkbox
            color="primary"
            indeterminate={numSelected > 0 && numSelected < rowCount}
            checked={rowCount > 0 && numSelected === rowCount}
            onChange={onSelectAllClick}
            inputProps={{
              "aria-label": "select all countries",
            }}
          />
        </TableCell> */}{" "}
        <TableCell
          padding="checkbox"
          style={{ background: "ghostwhite" }}
        ></TableCell>
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align={headCell.abbr ? "center" : "left"}
            padding={headCell.disablePadding ? "none" : "normal"}
            sortDirection={orderBy === headCell.id ? order : false}
            className={classes.headerText}
            style={{ background: "ghostwhite" }}
          >
            {headCell.label === "Expiration" ? (
              <TableSortLabel
                active={orderBy === headCell.id}
                direction={orderBy === headCell.id ? order : "asc"}
                onClick={createSortHandler(headCell.id)}
              >
                {headCell.label}
                {orderBy === headCell.id ? (
                  <Box
                    component="span"
                    style={{
                      border: 0,
                      clip: "rect(0 0 0 0)",
                      height: 1,
                      margin: -1,
                      overflow: "hidden",
                      padding: 0,
                      position: "absolute",
                      top: 20,
                      width: 1,
                    }}
                  >
                    {order === "desc"
                      ? "sorted descending"
                      : "sorted ascending"}
                  </Box>
                ) : null}
              </TableSortLabel>
            ) : (
              `${headCell.label}`
            )}
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
};
export default EnhancedTableHead;
