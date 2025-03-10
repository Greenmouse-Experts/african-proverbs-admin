import {
  fetchPackages,
  deletePackageAction,
} from "@/store/actions/packageActions";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { orderBy } from "lodash";
import ReactTooltip from "react-tooltip";
import Alert from "../UIElements/Alert";
import { checkPermission, formatDate } from "../../utils/utilities";
import DeletePopUp from "./DeletePopUp";
import { useRouter } from "next/router";

const header = [
  { id: "s/n", title: "S/N" },
  {
    id: "Name",
    title: "Name",
  },
  {
    id: "Description",
    title: "Description",
  },
  {
    id: "Amount ₦",
    title: "Amount ₦",
  },
  {
    id: "No. of Ethnics",
    title: "No. of Ethnics",
  },
  {
    id: "Status",
    title: "Status",
  },
  {
    id: "Date Created",
    title: "Date Created",
  },
  {
    id: "Date Modified",
    title: "Date Modified",
  },
  {
    id: "Actions",
    title: "Actions",
  },
];

const PackagesTable = () => {
  const [showDeletePopup, setShowDeletePopup] = useState(false);
  const [deletePackageId, setDeletePackageId] = useState(null);
  const dispatch = useDispatch();
  const router = useRouter();
  const { msg } = useSelector((state) => state.auth);
  const { user } = useSelector((state) => state.auth);
  const { packages } = useSelector((state) => state.packages);

  const nonDeletedPackages = packages?.content?.filter((pkg) => !pkg.isDeleted);

  // Sort nonDeletedPackages alphabetically by name
  const sortedPackages = orderBy(nonDeletedPackages, ["name"], ["asc"]);

  useEffect(() => {
    dispatch(fetchPackages());
  }, []);

  const openDeletePopup = (id) => {
    setDeletePackageId(id);
    setShowDeletePopup(true);
  };

  const closeDeletePopup = () => {
    setDeletePackageId(null);
    setShowDeletePopup(false);
  };

  // deleting a specific package
  const handleDelete = (id) => {
    dispatch(deletePackageAction(id))
      .then(() => {
        router.reload("/packages");
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <div className="content mt-2">
      {msg ? <Alert payload={msg} /> : null}
      <div className="row mx-auto">
        <div className="row mx-auto col-lg-12" style={{ overflow: "auto" }}>
          {sortedPackages && sortedPackages.length > 0 ? (
            <table className="table table-bordered">
              <thead>
                <tr>
                  {header.map((item) => (
                    <th key={item.id}>{item.title}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {sortedPackages.map((value, index) => (
                  <tr key={value.id}>
                    <td>{index + 1}</td>
                    <td>{value.name}</td>
                    <td>{value.description}</td>
                    <td>
                      {value.amount
                        ?.toString()
                        .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                    </td>
                    <td>{value.noOfEthnics}</td>
                    <td>{value.status}</td>
                    <td>{formatDate(value.date_created)}</td>
                    <td>{formatDate(value.date_modified)}</td>
                    <td>
                      <ul className="float-right mb-0">
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
                              >
                                <Link href={`/update-package/${value.id}`}>
                                  <i className="mdi mdi-circle-edit-outline text-primary"></i>
                                </Link>
                              </span>
                              <ReactTooltip
                                id="edit"
                                place="top"
                                effect="solid"
                              >
                                Edit Package
                              </ReactTooltip>
                            </li>
                            <li
                              className="list-inline-item"
                              style={{ position: "relative" }}
                            >
                              <span
                                onClick={() => openDeletePopup(value.id)}
                                className="icon circle-icon"
                                data-tip
                                data-for="delete"
                              >
                                <i className="mdi mdi-delete text-danger"></i>
                              </span>
                              <ReactTooltip
                                id="delete"
                                place="top"
                                effect="solid"
                              >
                                Delete Package
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
            <p>No packages available.</p>
          )}
        </div>
      </div>
      {showDeletePopup && (
        <DeletePopUp
          onClose={closeDeletePopup}
          onConfirm={() => {
            handleDelete(deletePackageId);
            closeDeletePopup();
          }}
        />
      )}
    </div>
  );
};

export default PackagesTable;
