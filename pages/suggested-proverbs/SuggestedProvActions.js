import React from "react";
import { useSelector } from "react-redux";
import { checkPermission } from "@/utils/utilities";
import ReactTooltip from "react-tooltip";

const SuggestedProvActions = ({
  value,
  openDelete,
  updateProverbHandler,
  publish,
}) => {
  const { user } = useSelector((state) => state.auth);

  return (
    <ul className="list-inline mb-0">
      {user &&
      (checkPermission(user?.roles, "Admin") ||
        checkPermission(user?.roles, "Author") ||
        checkPermission(user?.roles, "SuperAdmin") ||
        checkPermission(user?.roles, "Publisher") ||
        checkPermission(user?.roles, "Reviewer")) ? (
        <>
          <li className="list-inline-item">
            <a
              data-tip
              data-for="edit"
              onClick={() => updateProverbHandler(value)}
            >
              <a className="icon circle-icon ">
                <i className="mdi mdi-circle-edit-outline  text-primary"></i>
              </a>
            </a>
            <ReactTooltip id="edit" place="top" effect="solid">
              Edit Proverb
            </ReactTooltip>
          </li>
          <li className="list-inline-item">
            <a data-tip data-for="delete" onClick={() => openDelete(value)}>
              <a className="icon circle-icon">
                <i className="mdi mdi-delete text-danger"></i>
              </a>
            </a>
            <ReactTooltip id="delete" place="top" effect="solid">
              Delete Proverb
            </ReactTooltip>
          </li>
          {value.status === "AWAITING" ? (
            <li className="list-inline-item">
              <a
                onClick={() => publish()}
                className="icon circle-icon"
                data-tip
                data-for="accept"
              >
                <i className="mdi mdi-check-bold text-success"></i>
              </a>
              <ReactTooltip id="accept" place="top" effect="solid">
                Accept Proverb
              </ReactTooltip>
            </li>
          ) : null}
        </>
      ) : null}
    </ul>
  );
};

export default SuggestedProvActions;
