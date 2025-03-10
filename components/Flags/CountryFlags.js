import React, { useEffect, useState } from "react";
import { deleteEthnic } from "../../store/actions/ethnicAction";
import { useDispatch, useSelector } from "react-redux";
import Table from "./CountryTable";
import ReactTooltip from "react-tooltip";
import { checkPermission } from "../../utils/utilities";
import { getAllFlags, deleteFlag } from "@/services/flagApis";
import { useRouter } from "next/router";
import AlertToast from "../EthnicSymbols/AlertToast";

const AllCountries = ({ ethnics }) => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const [flagData, setFlagData] = useState([]);
  const [perPage, setPerPage] = useState(0);
  const [pageNo, setPageNo] = useState(0);
  const [openAlert, setOpenAlert] = useState(false);
  const [alertMsg, setAlertMsg] = useState("");
  const [severity, setSeverity] = useState("success");
  const router = useRouter();
  const backendImgUrl = `${process.env.baseUrl}/api/proverbs/flag/image/`;

  const header = [
    { id: "s/n", title: "S/N" },
    {
      id: "name",
      title: "Country Name",
    },
    {
      id: "language",
      title: "Flag",
    },
    {
      id: "action",
      title: "Actions",
    },
  ];

  const fetchFlags = async () => {
    const _getFlags = await getAllFlags();
    setFlagData(_getFlags?.data?.data);
  };
  useEffect(() => {
    fetchFlags();
  }, []);

  const deleteFlagData = async (id) => {
    const _deleteFlag = await deleteFlag(id);
    if (_deleteFlag.status === 204 || _deleteFlag.status === 200) {
      setAlertMsg(`Flag was successfully deleted`);
      setOpenAlert(true);
      fetchFlags();
    }
  };
  const handleCloseAlert = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpenAlert(false);
  };

  return (
    <div class="col-lg-12">
      <AlertToast
        alertMsg={alertMsg}
        severity={severity}
        openAlert={openAlert}
        handleCloseAlert={handleCloseAlert}
      />
      <button
        class="btn btn-sm "
        style={{
          background: "green",
          color: "white",
          border: "none",
          borderRadius: "4px",
          marginBottom: "4px",
        }}
        onClick={() => router.push("/flags/upload")}
      >
        <i class="fa fa-plus mr-1"></i> Add New Flag
      </button>
      <Table
        tableHeader={header}
        id="datatable-buttons"
        sub
        //showButton
        title="Manage Flags"
        handleFetchProverbBatch={(e) => console.log(e)}
      >
        {flagData.length > 0
          ? flagData?.map((value, index) => (
              <tr key={index}>
                <td>{index + 1}</td>
                <td
                  style={{
                    fontWeight: "bold",
                  }}
                >
                  {value?.countryName}
                </td>
                <td
                  style={{
                    width: "10%",
                    margin: "0 auto",
                  }}
                >
                  <img
                    alt="flag"
                    src={`${backendImgUrl}${value?.fileName}`}
                    style={{
                      width: "100%",
                      height: "auto",
                      display: "block",
                      margin: "0 auto",
                    }}
                  />
                </td>
                <td>
                  <ul class="list-inline mb-0">
                    {(user &&
                      user.roles &&
                      checkPermission(user.roles, "Author")) ||
                    checkPermission(user.roles, "Admin") ||
                    checkPermission(user.roles, "SuperAdmin") ? (
                      <>
                        <li class="list-inline-item">
                          <a
                            class="icon circle-icon "
                            data-tip
                            data-for="edit"
                            onClick={() =>
                              router.push({
                                pathname: `/flags/upload`,
                                query: { q: value.id },
                              })
                            }
                          >
                            <i class="mdi mdi-circle-edit-outline  text-primary"></i>
                          </a>
                          <ReactTooltip id="edit" place="top" effect="solid">
                            Edit
                          </ReactTooltip>
                        </li>
                      </>
                    ) : null}

                    <li class="list-inline-item">
                      <a
                        class="icon circle-icon"
                        data-tip
                        data-for="delete"
                        onClick={() => deleteFlagData(value.id)}
                      >
                        <i class="mdi mdi-delete text-danger"></i>
                      </a>
                      <ReactTooltip id="delete" place="top" effect="solid">
                        Delete
                      </ReactTooltip>
                    </li>
                  </ul>
                </td>
              </tr>
            ))
          : ""}
      </Table>
    </div>
  );
};

export default AllCountries;
