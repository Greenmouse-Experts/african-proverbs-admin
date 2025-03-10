import React, { useState, useEffect } from "react";
import { makeStyles, IconButton } from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";
import { fetchCategories } from "../../../store/actions/categoryAction";
import SugProverForm from "../../forms/SugProverbForm";

const UpdateSug = ({ closesUpdate, updateData }) => {
  const dispatch = useDispatch();
  const { categories } = useSelector((state) => state.Categories);

  useEffect(() => {
    if (!categories) {
      dispatch(fetchCategories());
    }
  }, []);

  return (
    <div class="content">
      <div class="container-fluid">
        <div class="row">
          <div class="col-md-12">
            <SugProverForm
              requestType="Update"
              updateData={updateData}
              closesUpdate={closesUpdate}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

const useStyles = makeStyles((theme) => ({
  error: {
    color: "red",
    fontSize: 11,
  },
}));

export default UpdateSug;
