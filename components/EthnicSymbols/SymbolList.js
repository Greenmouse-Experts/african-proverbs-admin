import React, { useEffect, useState } from "react";
import { deleteEthnic } from "../../store/actions/ethnicAction";
import { useDispatch, useSelector } from "react-redux";
import Table from "@/components/Flags/CountryTable";
import ReactTooltip from "react-tooltip";
import { checkPermission } from "../../utils/utilities";
import { getAllSymbols, deleteSymbol } from "@/services/ethnicSymbolApi";
import { useRouter } from "next/router";
import AlertToast from "../EthnicSymbols/AlertToast";

const AllCountries = ({ ethnics }) => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const [ethnicSymbolData, setEthnicSymbolData] = useState([]);
  const [perPage, setPerPage] = useState(0);
  const [pageNo, setPageNo] = useState(0);
  const [openAlert, setOpenAlert] = useState(false);
  const [alertMsg, setAlertMsg] = useState("");
  const [severity, setSeverity] = useState("success");
  const router = useRouter();
  const backendImgUrl = `${process.env.baseUrl}/api/proverbs/flag/image/`;
  const { isLoading, msg } = useSelector((state) => state.auth);

  const header = [
    { id: "s/n", title: "S/N" },
    {
      id: "name",
      title: "Ethnic Name",
    },
    {
      id: "language",
      title: "Symbols",
    },
    {
      id: "action",
      title: "Actions",
    },
  ];

  const fetchSymbols = async () => {
    const _getSymbols = await getAllSymbols();
    //console.log(_getSymbols?.data);
    setEthnicSymbolData(_getSymbols?.data?.data?.content);
  };
  useEffect(() => {
    fetchSymbols();
  }, []);

  const deleteSymbolData = async (id) => {
    const _deleteSymbol = await deleteSymbol(id);
    if (_deleteSymbol.status === 204 || _deleteSymbol.status === 200) {
      setAlertMsg(`Ethnic symbol successfully deleted`);
      setOpenAlert(true);
      fetchSymbols();
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
        onClick={() => router.push("ethnic-symbols/upload")}
      >
        <i class="fa fa-plus mr-1"></i> Add Ethnic Symbol
      </button>
      {/* {msg ? <Alert payload={msg} /> : null} */}
      <Table
        tableHeader={header}
        id="datatable-buttons"
        sub
        //showButton
        title="Manage Ethnics"
        handleFetchProverbBatch={(e) => console.log(e)}
      >
        {ethnicSymbolData.length > 0
          ? ethnicSymbolData?.map((value, index) => (
              <tr key={index}>
                <td>{index + 1}</td>
                <td
                  style={{
                    fontWeight: "bold",
                  }}
                >
                  {value?.ethnicName}
                </td>
                <td
                  style={{
                    width: "10%",
                    margin: "0 auto",
                  }}
                >
                  <img
                    alt="flag"
                    src={`data:image/png;base64,${value?.file}`}
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
                                pathname: `/ethnic-symbols/upload`,
                                query: { q: value.ethnicId },
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
                        onClick={() => deleteSymbolData(value.ethnicId)}
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
