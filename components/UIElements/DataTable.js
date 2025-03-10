import PropTypes from "prop-types";
import React, { useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import KeyboardBackspaceIcon from "@material-ui/icons/KeyboardBackspace";
import { IconButton } from "@material-ui/core";
import Router from "next/router";

const Table = ({
  children,
  tableHeader,
  title,
  headParagraph,
  id,
  showButton,
  handleFetchProverbBatch,
  links,
  isLoading,
  goBack,
  roles,
  sub,
}) => {
  const firstUpdate = useRef(true);
  const dispatch = useDispatch();
  console.log(showButton);

  useEffect(() => {
    console.log(showButton);
    if (firstUpdate.current) {
      const b = $("#datatable-buttons")
        .DataTable({ lengthChange: !1, buttons: ["copy", "excel", "pdf"] })
        .buttons()
        .container()
        .appendTo("#datatable-buttons_wrapper .col-md-6:eq(0)");
      const a = $("#datatable-buttons-1")
        .DataTable({ lengthChange: !1, buttons: ["copy", "excel", "pdf"] })
        .buttons()
        .container()
        .appendTo("#datatable-buttons-1_wrapper .col-md-6:eq(0)");
      firstUpdate.current = false;
    }
  }, []);

  return (
    <div class="card-box">
      {goBack && (
        <IconButton
          onClick={() => Router.push("/proverbs/view-proverbs")}
          aria-label="delete"
        >
          <KeyboardBackspaceIcon />
        </IconButton>
      )}
      <h4 class="mt-0 header-title">{title}</h4>
      {headParagraph}
      <div class="table-responsive">
        <table
          id={id ? id : "datatable-buttons-1"}
          class="table table-striped table-bordered nowrap"
        >
          <thead>
            <tr>
              {tableHeader.map((value) => (
                <th key={value.id}> {value.title} </th>
              ))}
            </tr>
          </thead>
          <tbody>{children}</tbody>
        </table>
      </div>
      {showButton ? (
        <>
          <br />
          <div class="float-right">
            <input
              type="button"
              onClick={() => handleFetchProverbBatch("previous")}
              disabled={links && links.previous ? false : true}
              class="btn btn-secondary button-next mr-2"
              name="next button"
              value={sub ? "Fetch Previous 10" : "Fetch Previous 100"}
            />
            <input
              type="button"
              onClick={() => handleFetchProverbBatch("next")}
              disabled={links && links.next ? false : true}
              class="btn btn-primary button-last"
              name="last"
              value={sub ? "Fetch Next 10" : "Fetch Next 100"}
            />
          </div>
          <br />
          <br />
        </>
      ) : (
        ""
      )}
    </div>
  );
};

Table.propTypes = {
  tableHeader: PropTypes.object.isRequired,
};

export default Table;

