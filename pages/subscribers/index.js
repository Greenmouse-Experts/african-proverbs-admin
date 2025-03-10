import React, { useEffect, useState, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import withAuth from "@/utils/withAuth";
import * as types from "../../store/actions/actionTypes";
import ProverbTable from "@/components/UIElements/DataTable";
import {
  fetchBatchProverbs,
  fetchProverbStatus,
  fetchProverbspreview,
} from "@/store/actions/proverbActions";
import {
  proverbTableHeader,
  retrieveEtnicNames,
  checkWhoUserIs,
  filterStatus,
} from "@/utils/utilities";
import { Alert, SearchInput } from "@/components/UIElements";
import { UpdateProverb } from "@/parts/SubPages";
import { toggleIsLoading, alertMessage } from "@/store/actions/authActions";
import Divider from "@material-ui/core/Divider";
import TableBody from "@/parts/proverbTable/ProverbTableBody";
import ProverbsTable from "@/parts/proverbTable/ProverbTable";
import Router, { useRouter } from "next/router";
import Table from "@/components/UIElements/DataTable";
import { checkPermission, convTime } from "../../utils/utilities";
import ReactTooltip from "react-tooltip";
import { makeStyles } from "@material-ui/core/styles";
import SearchSubscribers from "@/components/UIElements/SearchSubscribers";
import SubscriberModal from "@/components/SubscriberModal";
import ViewSubscriberProfile from "@/components/Subscriber/ViewSubscriberProfile";
import EditSubscriberProfile from "@/components/Subscriber/EditSubscriberProfile";
import ViewSubscription from "@/components/Subscriber/ViewSubscription";
// import TablePagination from "@mui/material/TablePagination";
import { fetchSubscribers } from "../../store/actions/subscriberAction";
import link from "next/link";

const Subscribers = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const [isLoading, setisLoading] = useState(true);
  const [dateCreated, setDateCreated] = useState("");
  const [endDate, setEndDate] = useState("");
  const [subscribers, setsubscribers] = useState([]);
  const [searchResult, setsearchResult] = useState([]);
  const [selectedUser, setSelectedUser] = useState([])
  const [modalVisible, setModalVisible] = useState(false);
  const [showSubScriberProfile, setshowSubScriberProfile] = useState(false);
  const [showEditScriberProfile, setshowEditScriberProfile] = useState(false);
  const [showSubscription, setshowSubscription] = useState(false);


  const [page, setPage] = React.useState(1);
  const [size, setSize] = useState(10);
  // const [rowsPerPage, setRowsPerPage] = React.useState(100);
  const [links, setlinks] = useState({ previous: false, next: true });
  const { subscribersData, isLoadingsubscribers, isUserUpdated } = useSelector(
    (state) => state.subscribers
  );

  const { user, msg } = useSelector((state) => state.auth);
  const { start, end } = router.query;



  const header = [
    { id: "s/n", title: "S/N" },
    {
      id: "name",
      title: "Name",
    },
    {
      id: "registered_email",
      title: "Registered_email",
    },
    {
      id: "phone_number",
      title: "Phone_number",
    },
    {
      id: "date_registered",
      title: "Date_registered",
    },
    {
      id: "action",
      title: "Action",
    },
  ];

  useEffect(() => {
    const query = { page, size };
    if (subscribersData.length === 0) {
      dispatch(fetchSubscribers(query));
    }
  }, [subscribersData, isUserUpdated]);



  useEffect(() => {
    const query = { page, size };
    dispatch(fetchSubscribers(query));
  }, [page, isUserUpdated]);

  useEffect(() => {
    if (isUserUpdated) {
      dispatch({ type: types.ADMIN_UPDATE_USER });
    }
  }, [isUserUpdated]);

  const filterSubscribers = () => {
    if (!dateCreated && !endDate) {
      dispatch(
        alertMessage("start date or end date must be selected", "FAILURE")
      );
      return;
    }
    setisLoading(true);
    Router.push({
      pathname: "/subscribers/search",
      query: { dateCreated, endDate, page: 1 },
    });
    setisLoading(false);
  };

  const handlePaginate = (state) => {
    if (state === "previous") {
      const count = page - 1;
      if (count < 1) {
        setPage(1);
      } else {
        setPage(count);
      }
    } else {
      setPage(page + 1);
      if (page > 0) {
        setlinks({ next: true, previous: true });
      } else {
        setlinks({ next: true, previous: false });
      }
    }
  };

  function handleCloseSubscriberProfile() {
    setshowSubScriberProfile(false);
  }
  function handleCloseEditSubProfile() {
    setshowEditScriberProfile(false);
  }

  function handleCloseSubscription() {
    setshowSubscription(false);
  }

  function openModal(userData) {
    setModalVisible(true);
    setSelectedUser(userData);
  }




  function closeModal() {
    setModalVisible(false);
  }

  function handleViewSubscriber() {
    setModalVisible(false);
    setshowSubScriberProfile(true);
  }

  function handleViewSubscription() {
    setModalVisible(false);
    setshowSubscription(true);
  }

  function handleEditProfile() {
    setModalVisible(false);
    setshowEditScriberProfile(true);
  }

  useEffect(() => {
    setisLoading(false);
  }, []);

  return (
    <div className="content mt-2">
      {isLoadingsubscribers && subscribersData.length === 0 ? (
        <div class="spinner">Loading...</div>
      ) : (
        <>
          {msg && <Alert key={new Date()} payload={msg} />}
          <div className="container-fluid">
            <div className="row">
              <div className="col-xl-12 mb-5">
                <>
                  <div className="row">
                    <div className="col-sm-12 col-md-7 mb-1">
                      <div className="card-box">
                        <h4 className="header-title mt-0">
                          Filter Subscribers
                        </h4>

                        <div className="row">
                          <div className="col-sm-4 col-md-4 mb-1">
                            <span className="font-weight-bold">
                              Subscribers list from
                            </span>
                            <input
                              type="date"
                              value={dateCreated}
                              onChange={(e) => setDateCreated(e.target.value)}
                              name=""
                              id=""
                              className="form-control form-control-sm mr-1"
                            />
                          </div>
                          <div className="col-sm-4 col-md-4 mb-1">
                            <span className="font-weight-bold">
                              Subscribers list to
                            </span>
                            <input
                              type="date"
                              value={endDate}
                              onChange={(e) => setEndDate(e.target.value)}
                              name=""
                              id=""
                              className="form-control form-control-sm mr-1"
                            />
                          </div>
                          <div className="col-sm-4 col-md-4 mb-1">
                            <button
                              type="button"
                              onClick={filterSubscribers}
                              className="btn btn-info btn-rounded waves-effect width-md waves-light mt-2"
                            >
                              Filter Subscribers
                            </button>
                          </div>
                        </div>
                        <Divider
                          sx={{ height: 28, m: 0.5 }}
                          orientation="vertical"
                        />
                      </div>
                    </div>
                    <div className="col-sm-12 col-md-5">
                      <div className="card-box">
                        <h4 className="header-title mt-0">
                          Search Subscribers
                        </h4>
                        <SearchSubscribers />
                      </div>
                    </div>
                  </div>

                  {user && subscribersData ? (
                    <>
                      {isLoading ? (
                        <div className="spinner">Loading...</div>
                      ) : (
                        <div class="col-lg-12">
                          <Table
                            tableHeader={header}
                            title="Recent Subscribers"
                            showButton={true}
                            handleFetchProverbBatch={handlePaginate}
                            links={links}
                            id={2}
                            sub={true}
                          >
                            {subscribersData &&
                              subscribersData?.map(
                                (
                                  {
                                    id,
                                    firstName,
                                    lastName,
                                    email,
                                    phone_number,
                                    dateCreated,
                                    endDate,
                                    userId,
                                    otherName,
                                    phoneNumber,
                                    userType,
                                  },
                                  index
                                ) => {
                                  const userData = {
                                    id,
                                    firstName,
                                    lastName,
                                    email,
                                    phone_number,
                                    dateCreated,
                                    endDate,
                                    userId,
                                    otherName,
                                    phoneNumber,
                                    userType,
                                  };
                                  return (
                                    <tr key={id}>
                                      <td>{index + 1}</td>
                                      <td>
                                        {firstName} {lastName}
                                      </td>
                                      <td>{email}</td>
                                      <td>{phoneNumber}</td>
                                      <td>{dateCreated}</td>
                                      <td>
                                        <ul class="list-inline mb-0">
                                          {user &&
                                            user.roles &&
                                            checkPermission(
                                              user.roles,
                                              "Author"
                                            ) |
                                            checkPermission(
                                              user.roles,
                                              "Admin"
                                            ) |
                                            checkPermission(
                                              user.roles,
                                              "SuperAdmin"
                                            ) ? (
                                            <>
                                              <li class="list-inline-item">
                                                <a
                                                  class="icon circle-icon "
                                                  data-tip
                                                  data-for="edit"
                                                  onClick={() =>
                                                    openModal(userData)
                                                  }
                                                >
                                                  <i class="mdi mdi-circle-edit-outline  text-primary"></i>
                                                </a>
                                                <ReactTooltip
                                                  id="edit"
                                                  place="top"
                                                  effect="solid"
                                                >
                                                  View Details
                                                </ReactTooltip>
                                              </li>

                                            </>
                                          ) : null}
                                        </ul>
                                      </td>
                                    </tr>
                                  );
                                }
                              )}
                          </Table>




                          {setSelectedUser && (
                            <SubscriberModal
                              selectedUser={selectedUser}
                              closeModal={closeModal}
                              modalVisible={modalVisible}
                              handleEditProfile={handleEditProfile}
                              handleViewSubscriber={handleViewSubscriber}
                              handleViewSubscription={handleViewSubscription}
                            />
                          )}
                          {showSubScriberProfile && (
                            <ViewSubscriberProfile
                              closeProfileModal={handleCloseSubscriberProfile}
                              selectedUser={selectedUser}
                              showProfile={showSubScriberProfile}
                            />
                          )}
                          {showEditScriberProfile && (
                            <EditSubscriberProfile
                              selectedUser={selectedUser}
                              showProfile={showEditScriberProfile}
                              close={handleCloseEditSubProfile}
                              cancel={setshowEditScriberProfile}
                            />
                          )}
                          {showSubscription && (
                            <ViewSubscription
                              selectedUser={selectedUser}
                              close={handleCloseSubscription}
                              show={showSubscription}
                            />
                          )}
                        </div>
                      )}
                    </>
                  ) : (
                    <div className="spinner">Loading...</div>
                  )}
                </>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default withAuth(Subscribers);
