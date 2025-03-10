import { fetchSelectedCorrection } from "@/store/actions/correctProverbActions";
import { fetchSelectProverbs } from "@/store/actions/proverbActions";
import { fetchCategories } from "@/store/actions/categoryAction";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { orderBy } from "lodash";
import ReactTooltip from "react-tooltip";
import Alert from "../../components/UIElements/Alert";
import Unauthorized from "@/parts/SubPages/Unauthorized";
import { checkPermission, formatDate } from "../../utils/utilities";
import PopupForm from "./popupForm";
import { useRouter } from "next/router";

const header = [
  { id: "s/n", title: "S/N" },
  {
    id: "Suggestion ID",
    title: "Suggestion ID",
  },
  {
    id: "Correction type",
    title: "Correction type",
  },
  {
    id: "Correction value",
    title: "Correction value",
  },
  {
    id: "User ID",
    title: "User ID",
  },
  {
    id: "User name",
    title: "User name",
  },
  {
    id: "Email address",
    title: "Email address",
  },
  {
    id: "Phone number",
    title: "Phone number",
  },
  {
    id: "Actions",
    title: "Actions",
  },
];

const CorrectionTable = () => {
  const router = useRouter();
  const { q } = router.query;
  if (q) {
    const [showPopup, setShowPopup] = useState(false);
    const [selectedCorrection, setSelectedCorrection] = useState(null);
    const [actionType, setActionType] = useState(null);

    const dispatch = useDispatch();
    const { msg } = useSelector((state) => state.auth);
    const { user } = useSelector((state) => state.auth);
    const { selectedProverb: correctSelectedProverb } = useSelector(
      (state) => state.correctProverbs
    );
    const { selectedProverb: proverbSelectedProverb } = useSelector(
      (state) => state.proverb
    );

    const sortedCorrections = orderBy(
      correctSelectedProverb,
      ["correctionType"],
      ["asc"]
    );

    useEffect(() => {
      dispatch(fetchSelectedCorrection(q));
      dispatch(fetchCategories());
    }, [q]);

    useEffect(() => {
      dispatch(fetchSelectProverbs(q));
    }, [q]);

    const handleRowClick = (value, actionType) => {
      setSelectedCorrection(value);
      setActionType(actionType);
      openPopup(actionType);
    };

    const openPopup = (actionType) => {
      setShowPopup(true);
      setActionType(actionType);
    };

    const closePopup = () => {
      setShowPopup(false);
    };

    const categories = proverbSelectedProverb?.categories || [];

    return (
      <div className="content mt-2">
        {msg ? <Alert payload={msg} /> : null}
        <div className="row mx-auto">
          <div
            className="row mx-auto col-lg-12"
            style={{
              overflow: "auto",
              backgroundColor: "white",
              padding: "2rem",
            }}
          >
            {sortedCorrections && sortedCorrections.length > 0 ? (
              <table className="table table-bordered">
                <thead>
                  <tr>
                    {header.map((item) => (
                      <th key={item.id}>{item.title}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {sortedCorrections.map((value, index) => (
                    <tr key={value.id}>
                      <td>{index + 1}</td>
                      <td>{value.correctionId}</td>
                      <td>{value.correctionType}</td>
                      <td>{value.correctionNewValue}</td>
                      <td>{value.userId}</td>
                      <td>{value.userName}</td>
                      <td>{value.email}</td>
                      <td>{value.phone}</td>
                      <td>
                        <ul
                          className=" mb-0"
                          style={{ display: "flex", justifyContent: "start" }}
                        >
                          {user &&
                          user.roles &&
                          (checkPermission(user.roles, "Author") ||
                            checkPermission(user.roles, "Admin") ||
                            checkPermission(user.roles, "SuperAdmin")) ? (
                            <>
                              <li className="list-inline-item">
                                <span
                                  className="icon circle-icon"
                                  data-tip
                                  data-for="edit"
                                  onClick={() =>
                                    handleRowClick(value, "UPDATE")
                                  }
                                >
                                  <i className="mdi mdi-circle-edit-outline text-primary"></i>
                                </span>
                                <ReactTooltip
                                  id="edit"
                                  place="top"
                                  effect="solid"
                                >
                                  Edit Correction
                                </ReactTooltip>
                              </li>
                              <li className="list-inline-item">
                                <span
                                  className="icon circle-icon"
                                  data-tip
                                  data-for="approve"
                                  onClick={() =>
                                    handleRowClick(value, "APPROVE")
                                  }
                                >
                                  <i className="mdi mdi-check-bold text-success"></i>
                                </span>
                                <ReactTooltip
                                  id="approve"
                                  place="top"
                                  effect="solid"
                                >
                                  Approve Correction
                                </ReactTooltip>
                              </li>
                            </>
                          ) : null}
                        </ul>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <p>No correction proverbs available.</p>
            )}
          </div>
        </div>
        {showPopup && (
          <PopupForm
            onClose={closePopup}
            selectedCorrection={selectedCorrection}
            actionType={actionType}
            categories={categories}
          />
        )}
      </div>
    );
  } else {
    return (
      <Unauthorized>
        <h1 class="text-error">404</h1>
        <h3 class="mt-3 mb-2">Page not found</h3>
      </Unauthorized>
    );
  }
};

export default CorrectionTable;
