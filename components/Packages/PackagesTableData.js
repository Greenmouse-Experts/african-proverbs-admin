import React from "react";
import FilterByDropdown from "./Filter";

const PackagesTableData = ({ children, tableHeader, title }) => {
  return (
    <div className="card-box col-lg-12 mx-auto">
      <h4 className="mb-2 header-title">{title}</h4>
      <FilterByDropdown />
      <div className="table-responsive">
        <table className="table table-striped table-bordered nowrap">
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
    </div>
  );
};

export default PackagesTableData;
