import React, { useState, useEffect } from "react";
import EmptyTable from "../components/widgets/EmptyTable";
import {
  fetchFirstNthItems,
  htmlFilter,
  convTime,
  checkPermission,
  retrieveEtnicId,
} from "../utils/utilities";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.min.css";
import HttpService from "@/services/httpService";
import withAuth from "@/utils/withAuth";
import { useSelector } from "react-redux";
import Table from "@/components/UIElements/DataTable";
import ProverbPopUp from "@/components/widgets/ProverbPopUp";

function RepeatedProverbs() {
  const [repeatProverbs, setRepeatProverbs] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const { user } = useSelector((state) => state.auth);
  const [filter, setfilter] = useState("");
  const [open, setOpen] = useState(false);
  const [selectedId, setSelectedId] = useState("");

  useEffect(() => {
    getRepeatedProverbs("All");
  }, []);

  const proverbTableHeader =
    user &&
    (checkPermission(user.roles, "SuperAdmin") ||
      checkPermission(user.roles, "Author") ||
      checkPermission(user.roles, "Admin"))
      ? [
          { id: 1, title: "Proverbs" },
          { id: 2, title: "Categories" },
          { id: 3, title: "Ethnicity" },
          { id: 4, title: "User" },
          { id: 5, title: "Current Status" },
          { id: 6, title: "Created At" },
          { id: 7, title: "Actions" },
        ]
      : [
          { id: 1, title: "Proverbs" },
          { id: 2, title: "Categories" },
          { id: 3, title: "Ethnicity" },
          { id: 4, title: "User" },
          { id: 5, title: "Current Status" },
          { id: 6, title: "Created At" },
        ];

  const getRepeatedProverbs = (filterValue) => {
    let url;
    let payload;
    let nethnics;
    let filterEthnics;
    // if (filterValue) {
    var ethn = retrieveEtnicId(user?.ethnics);

    var ethnics = ethn.toString();

    filterEthnics =
      filterValue === "All" ? ethnics : filterValue ? filterValue : ethnics;
    // filterValue === "All" ? ethnics : filterValue ? filterValue : ethnics;
    // }
    // else {
    //   var ethn = retrieveEtnicId(user.ethnics);
    //   nethnics = ethn.toString();
    // }
    var id = user.id;
    if (
      user &&
      (checkPermission(user?.roles, "Admin") ||
        checkPermission(user?.roles, "SuperAdmin"))
    ) {
      url = filterValue
        ? `api/proverbs/repetition/?ethnic_in=${filterEthnics}`
        : `api/proverbs/repetition/`;
    } else if (user && checkPermission(user.roles, "Author")) {
      url = filterValue
        ? `api/proverbs/repetition/?userId=${id}&ethnic_in=${filterEthnics}`
        : `api/proverbs/repetition/?userId=${id}&ethnic_in=${nethnics}`;
    } else {
      url = filterValue
        ? `api/proverbs/repetition/?ethnic_in=${filterEthnics}`
        : `api/proverbs/repetition/?ethnic_in=${nethnics}`;
    }

    // if (
    //   user &&
    //   (checkPermission(user?.roles, "Admin") ||
    //     checkPermission(user?.roles, "SuperAdmin"))
    // ) {
    payload = filterValue
      ? {
          ethnic_in: filterEthnics,
        }
      : null;
    // } else if (user && checkPermission(user.roles, "Author")) {
    //   payload = filterValue
    //     ? `api/proverbs/repetition/?userId=${id}&ethnic_in=${filterEthnics}`
    //     : `api/proverbs/repetition/?userId=${id}&ethnic_in=${nethnics}`;
    // } else {
    //   payload = filterValue
    //     ? `api/proverbs/repetition/?ethnic_in=${filterEthnics}`
    //     : `api/proverbs/repetition/?ethnic_in=${nethnics}`;
    // }
    // const url = 'api/proverbs/repetition/'
    const http = new HttpService();
    http
      .postDataWithToken(payload, `api/proverbs/repetition/`)
      .then((res) => {
        setRepeatProverbs(res.data);
      })
      .catch((error) => {
        toast.error("You can now access our app from your homescreen", {
          position: toast.POSITION.BOTTOM_LEFT,
          className: "success-toast",
          autoClose: 4000,
        });
        // setIsLoading(false);
      })
      .finally(() => setIsLoading(false));

    // const http = new HttpService();
    // http
    //   .getDataWithToken(url)
    //   .then((response) => {
    //     const data = response.data;

    //     setRepeatProverbs(data);
    //   })
    //   .catch((error) => {
    //     toast.error("You can now access our app from your homescreen", {
    //       position: toast.POSITION.BOTTOM_LEFT,
    //       className: "success-toast",
    //       autoClose: 4000,
    //     });
    //     // setIsLoading(false);
    //   })
    //   .finally(() => setIsLoading(false));
  };

  const handleClickOpen = (id) => {
    console.log(id)
    setSelectedId(id);
    setOpen(true);
  };

  const handleClose = () => {
    setSelectedId("");
    setOpen(false);
  };

  const deleteProverbHandler = (proverbId) => {
    setIsLoading(true);
    const url = `api/proverbs/proverb/${proverbId}/delete`;
    const http = new HttpService();
    http
      .getDataWithToken(url)
      .then((response) => {
        if (response) {
          getRepeatedProverbs("All");
          setIsLoading(false);
        }
      })
      .catch((error) => {
        setIsLoading(false);

        toast.error("Unable to delete proverbs", {
          position: toast.POSITION.TOP_RIGHT,
          className: "success-toast",
          autoClose: 4000,
        });
      });
    handleClose();
  };

  return (
    <div className="content">
      <div className="container-fluid">
        <div className="row">
          <div className="col-xl-12">
            {!isLoading ? (
              <>
                <div className="row">
                  <div class="col-sm-12 col-md-7 mb-1">
                    <div class="card-box">
                      <h4 class="header-title mt-0">Filter Proverbs</h4>

                      <div className="row">
                        <div class="col-sm-4 col-md-4 mb-1">
                          <select
                            name="ethnic"
                            onChange={(e) => {
                              getRepeatedProverbs(e.target.value);
                              setfilter(e.target.value);
                              setIsLoading(true);
                            }}
                            class="form-control form-control-sm mr-1"
                          >
                            <>
                              <option value="All" defaultValue={"All"}>
                                Filter Ethnic
                              </option>
                              <option value="All" defaultValue="All">
                                All
                              </option>
                              {user &&
                                user?.ethnics?.map((stat, index) => (
                                  <option key={index} value={stat.id}>
                                    {stat.name}
                                  </option>
                                ))}
                            </>
                          </select>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                {repeatProverbs?.length > 0 ? (
                  <Table
                    title="Repeated Proverbs"
                    tableHeader={proverbTableHeader}
                    disablepagination={true}
                  >
                    {repeatProverbs?.map((value, index) => (
                      <tr key={index}>
                        <td>{htmlFilter(value.content)}</td>
                        <td>
                          {value.categories ? (
                            <>
                              {" "}
                              {fetchFirstNthItems(
                                value.categories.split(","),
                                1
                              ) + " ... "}
                            </>
                          ) : (
                            "..."
                          )}
                        </td>
                        <td>{value.ethnic && value.ethnic}</td>
                        <td>{value.email && value.email}</td>
                        <td>
                          <span class={"badge badge-info"}>{value.status}</span>
                        </td>
                        <td>{convTime(value.date_created)}</td>
                        {user &&
                        (checkPermission(user.roles, "SuperAdmin") ||
                          checkPermission(user.roles, "Author") ||
                          checkPermission(user.roles, "Admin")) ? (
                          <td>
                            <ul className="list-inline mb-0">
                              <li className="list-inline-item">
                                <a
                                  onClick={() => handleClickOpen(value.id)}
                                  className="icon circle-icon"
                                  data-tip
                                  data-for="delete"
                                >
                                  <i className="mdi mdi-delete text-danger"></i>
                                </a>
                                {/* <ReactTooltip id="delete" place="top" effect="solid">
                                                    Delete Proverb
                                                </ReactTooltip> */}
                              </li>
                            </ul>
                          </td>
                        ) : (
                          " "
                        )}
                      </tr>
                    ))}
                  </Table>
                ) : (
                  <EmptyTable text={"No repeated proverbs found"} />
                )}
                <ProverbPopUp
                  open={open}
                  handleClose={handleClose}
                  deleteProverbHandler={deleteProverbHandler}
                  proverbData={selectedId}
                />
              </>
            ) : (
              <div className="spinner" style={{ height: "250px" }}>
                Loading...
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default withAuth(RepeatedProverbs);
