import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  fetchProverbspreview,
  deleteProverb,
  updateProverb,
} from "@/store/actions/proverbActions";
import {
  retrieveEtnicNames,
  checkPermission,
  checkUserDeleteButton,
  checkUserUpdateButton,
  checkUserReviewButton,
} from "@/utils/utilities";
import ReactTooltip from "react-tooltip";
import { toggleIsLoading } from "@/store/actions/authActions";

const ProverbActions = ({ value, openDelete, updateProverbHandler }) => {
  const dispatch = useDispatch();
  const { result, isLoading } = useSelector((state) => state.proverb);
  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    if (result && isLoading) {
      dispatch(toggleIsLoading());
    }
    if (user && result == null) {
      var ethn = retrieveEtnicNames(user.ethnics);
      var nethnics = ethn.toString();
      dispatch(fetchProverbspreview(user.roles, nethnics));
    }
  }, [user]);

  // * update status
  const updateProverbStatusHandler = (status, proverb) => {
    const { content, categories, ethnic } = proverb;
    const payload = {
      content: content,
      categories: categories.map((val) => val.id),
      ethnic: ethnic.id,
      status: status,
    };

    const { slug, id } = proverb;
    if (status === "ACCEPTED" || status === "REJECTED") {
      payload["proverbReviewer"] = user.id;
    } else if (status === "PUBLISHED" || status === "UNPUBLISHED") {
      payload["proverbPublisher"] = user.id;
    }
    dispatch(updateProverb(payload, id, slug));
  };

  return (
    <ul className="list-inline mb-0">
      {checkPermission(user.roles, "Admin") |
      checkPermission(user.roles, "Author") |
      checkPermission(user.roles, "SuperAdmin") |
      checkPermission(user.roles, "Publisher") |
      checkPermission(user.roles, "Reviewer") ? (
        <>
          {checkUserUpdateButton(user.roles, value.status) ? (
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
          ) : null}
          {checkUserDeleteButton(user.roles, value.status) ? (
            <>
              <li className="list-inline-item">
                <a
                  onClick={() => openDelete(value.id, value.slug)}
                  className="icon circle-icon"
                  data-tip
                  data-for="delete"
                >
                  <i className="mdi mdi-delete text-danger"></i>
                </a>
                <ReactTooltip id="delete" place="top" effect="solid">
                  Delete Proverb
                </ReactTooltip>
              </li>
            </>
          ) : null}
        </>
      ) : null}

      {checkPermission(user.roles, "Admin") |
      checkPermission(user.roles, "Author") |
      checkPermission(user.roles, "SuperAdmin") ? (
        value.status == "CREATED" || value.status == "REJECTED" ? (
          <li className="list-inline-item">
            <a
              onClick={() => updateProverbStatusHandler("AWAITING", value)}
              className="icon circle-icon"
              data-tip
              data-for="awaiting"
            >
              <i className="mdi mdi-arrow-up-bold-circle text-success"></i>
            </a>
            <ReactTooltip id="awaiting" place="top" effect="solid">
              Submit for Review
            </ReactTooltip>
          </li>
        ) : null
      ) : null}

      {checkUserReviewButton(user.roles, value.status) ? (
        <>
          {(value.status === "ACCEPTED") |
          (value.status == "AWAITING") |
          (value.status == "UNPUBLISHED") |
          (value.status !== "REJECTED") ? (
            <li className="list-inline-item">
              <a
                onClick={() => updateProverbStatusHandler("REJECTED", value)}
                className="icon circle-icon"
                data-tip
                data-for="delete"
              >
                <i className="fas fa-trash-alt text-danger"></i>
              </a>
              <ReactTooltip id="delete" place="top" effect="solid">
                Delete Proverb
              </ReactTooltip>
            </li>
          ) : null}

          {(value.status === "REJECTED") |
            (value.status === "AWAITING") |
            (value.status !== "ACCEPTED") && value.status !== "PUBLISHED" ? (
            <li className="list-inline-item">
              <a
                onClick={() => updateProverbStatusHandler("ACCEPTED", value)}
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
      {checkPermission(user.roles, "Publisher") |
      checkPermission(user.roles, "Admin") |
      checkPermission(user.roles, "SuperAdmin") ? (
        <>
          {(value.status === "ACCEPTED") | (value.status === "UNPUBLISHED") ? (
            <li className="list-inline-item">
              <a
                onClick={() => updateProverbStatusHandler("PUBLISHED", value)}
                className="icon circle-icon"
                data-tip
                data-for="publish"
              >
                <i className="mdi mdi-keyboard-tab text-purple"></i>
              </a>
              <ReactTooltip id="publish" place="top" effect="solid">
                Publish Proverb
              </ReactTooltip>
            </li>
          ) : null}
          {(value.status === "ACCEPTED") | (value.status === "PUBLISHED") ? (
            <li className="list-inline-item">
              <a
                onClick={() => updateProverbStatusHandler("UNPUBLISHED", value)}
                className="icon circle-icon"
                data-tip
                data-for="unpublish"
              >
                <i className="mdi mdi-window-close text-success"></i>
              </a>
              <ReactTooltip id="unpublish" place="top" effect="solid">
                Unpublish Proverb
              </ReactTooltip>
            </li>
          ) : null}
        </>
      ) : null}
    </ul>
  );
};

export default ProverbActions;
