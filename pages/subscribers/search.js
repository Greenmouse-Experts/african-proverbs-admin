import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import * as types from "../../store/actions/actionTypes";
import withAuth from "@/utils/withAuth";
import ProverbTable from "@/components/UIElements/DataTable";
import { searchSubscribsers } from "@/store/actions/subscriberAction";
import {
  proverbTableHeader,
  retrieveEtnicNames,
  checkWhoUserIs,
} from "@/utils/utilities";
import { Alert, SearchInput } from "@/components/UIElements";
import { useRouter } from "next/router";
import TableBody from "@/parts/proverbTable/ProverbTableBody";
import SearchSubscribers from "@/components/UIElements/SearchSubscribers";
import subscribers from ".";
import Table from "@/components/UIElements/DataTable";
import { checkPermission, convTime } from "../../utils/utilities";
import ReactTooltip from "react-tooltip";
import Box from "@material-ui/core/Box";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import Modal from "@material-ui/core/Modal";
import ViewSubscriberProfile from "@/components/Subscriber/ViewSubscriberProfile";
import EditSubscriberProfile from "@/components/Subscriber/EditSubscriberProfile";
import ViewSubscription from "@/components/Subscriber/ViewSubscription";
import SubscriberModal from "@/components/SubscriberModal";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 550,
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 2,
};

const Search = () => {
  const router = useRouter();
  const { search, dateCreated, endDate } = router.query;
  const [modalVisible, setModalVisible] = useState(false);
  const [showSubScriberProfile, setshowSubScriberProfile] = useState(false);
  const [showEditScriberProfile, setshowEditScriberProfile] = useState(false);
  const [showSubscription, setshowSubscription] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [links, setlinks] = useState({ previous: false, next: true });
  const [page, setPage] = React.useState(1);
  const [size, setSize] = useState(10);
  const dispatch = useDispatch();
  const { subscribersData, searchResult, isUserUpdated } = useSelector(
    (state) => state.subscribers
  );

  const { user, msg } = useSelector((state) => state.auth);
  // const result = Array.isArray(searchResult) ? searchResult : [searchResult];

  useEffect(() => {
    if (user) {
      getData();
    }
  }, [searchSubscribsers, user, search, page, dateCreated, endDate]);

  useEffect(() => {
    if (isUserUpdated) {
      getData();
      dispatch({ type: types.ADMIN_UPDATE_USER });
    }
  }, [isUserUpdated, page]);

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

  const getData = () => {
    const query = { page, size };
    dispatch(
      searchSubscribsers(
        dateCreated,
        endDate,
        decodeURIComponent(search).toString(),
        page,
        query
      )
    );
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

  return (
    <div className="content">
      {msg && <Alert key={new Date()} payload={msg} />}
      <div className="container-fluid">
        <div className="row">
          <div className="col-xl-12 mb-5">
            {user && searchResult ? (
              <>
                {searchResult?.length > 0 ? (
                  <>
                    <div className="row">
                      <div className="col-sm-12 col-md-5">
                        <div className="card-box">
                          <h4 className="header-title mt-0">
                            Search Subscribers
                          </h4>
                          <SearchSubscribers />
                        </div>
                      </div>
                    </div>

                    <div class="col-lg-12">
                      <Table
                        tableHeader={header}
                        showButton={true}
                        title="Searched Subscribers"
                        handleFetchProverbBatch={handlePaginate}
                        links={links}
                        id={2}
                        sub={true}
                      >
                        {searchResult &&
                          searchResult.map(
                            (
                              {
                                id,
                                firstName,
                                lastName,
                                otherName,
                                email,
                                phoneNumber,
                                dateCreated,
                                endDate,
                                userId,
                                userType,
                              },
                              index
                            ) => {
                              const userData = {
                                id,
                                firstName,
                                lastName,
                                otherName,
                                email,
                                phoneNumber,
                                dateCreated,
                                endDate,
                                userId,
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
                                      checkPermission(user.roles, "Author") |
                                        checkPermission(user.roles, "Admin") |
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
                  </>
                ) : (
                  "No Data Found"
                )}
              </>
            ) : (
              // <div className="spinner">Loading...</div>
              <p className="font-weight-bolder text-capitalize">
                Subscriber details not found
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default withAuth(Search);
