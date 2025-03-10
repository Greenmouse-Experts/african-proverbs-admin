import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import {
  orderPackages,
  filterPackagesByStatus,
} from "@/store/actions/packageActions";

function filterPackages() {
  const [selectedValue, setSelectedValue] = useState("alphabet");
  const [activeStatus, setActiveStatus] = useState("ALL");
  const dispatch = useDispatch();

  useEffect(() => {
    if (selectedValue) {
      if (selectedValue === "reset") {
        setSelectedValue("alphabet");
        setActiveStatus("ALL");
        dispatch(orderPackages("alphabet"));
        dispatch(filterPackagesByStatus("ALL"));
      } else {
        dispatch(orderPackages(selectedValue));
        setActiveStatus("ALL"); // Reset active status filter
      }
    }
  }, [selectedValue]);

  useEffect(() => {
    if (activeStatus !== "ALL") {
      dispatch(filterPackagesByStatus(activeStatus));
      setSelectedValue("alphabet");
    }
  }, [activeStatus]);

  const handleStatusChange = (event) => {
    setActiveStatus(event.target.value);
  };

  return (
    <div className="input-group my-3 d-flex">
      <label className="input-group-text" htmlFor="filterBySelect">
        Filter Packages
      </label>
      <select
        className="form-select"
        id="filterBySelect"
        onChange={handleStatusChange}
        value={activeStatus}
      >
        <option value="ALL">All Status</option>
        <option value="ACTIVE">Active</option>
        <option value="INACTIVE">Inactive</option>
      </select>
    </div>
  );
}

export default filterPackages;
