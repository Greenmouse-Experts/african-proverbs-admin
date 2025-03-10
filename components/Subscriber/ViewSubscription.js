import React, { useEffect, useState } from "react";
import Modal from "@material-ui/core/Modal";
import { useSelector, useDispatch } from "react-redux";
import { fetchSubscription } from "../../store/actions/subscriberAction";
import axios from "axios";
// import { alertMessage, logout } from "./authActions";
import {
  makeStyles,
  Grid,
  Box,
  Typography,
  Card,
  CardContent,
  Container,
  Divider,
  Tooltip,
} from "@material-ui/core";
import { SpaOutlined } from "@material-ui/icons";
import ReactTooltip from "react-tooltip";
import Link from "next/link";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 470,
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 3,
};

const ViewSubscription = ({ selectedUser, close, show }) => {
  const { userId } = selectedUser;
  const dispatch = useDispatch();
  const [isLoading, setisLoading] = useState(false);
  const [subscriptionData, setSubscriptionData] = useState([]);
  const [subPerPage, setsubPerPage] = useState(5);
  const [currentPage, setcurrentPage] = useState(1);

  const totalNumOfPages = Math.ceil(subscriptionData.length / subPerPage);
  const indexOfLastSub = currentPage * subPerPage;
  const indexOfFirstSub = indexOfLastSub - subPerPage;
  const visibleSubscription = subscriptionData.slice(
    indexOfFirstSub,
    indexOfLastSub
  );

  function nextHandler() {
    if (currentPage !== totalNumOfPages) setcurrentPage(currentPage + 1);
  }

  function prevHandler() {
    if (currentPage !== 1) setcurrentPage(currentPage - 1);
  }

  async function getSubscription() {
    setisLoading(true);
    try {
      const token = localStorage.getItem(process.env.tokenName);
      const baseUrl = process.env.baseUrl;
      const AuthStr = "Bearer " + token;
      const response = await axios.get(
        baseUrl + `api/packages/${userId}/user`,
        {
          headers: { Authorization: AuthStr },
        }
      );
      if (response.status === 200) {
        setSubscriptionData(response.data);
      }
      setisLoading(false);
    } catch (error) {
      console.error("Error fetching subscription:", error);
      setisLoading(false);
    }
  }

  useEffect(() => {
    if (userId) {
      // dispatch(fetchSubscription(user_id));
      getSubscription();
    }
  }, [userId]);

  return (
    <Modal
      open={show}
      onClose={close}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <Box display="flex" mb={1}>
          <Typography variant="h5" component="h5">
            Subscription Details
          </Typography>
        </Box>
        <Divider />
        {isLoading ? (
          <div className="spinner">Loading...</div>
        ) : (
          <div>
            <table class="table">
              <thead class="thead-light">
                <tr>
                  <th scope="col">S/N</th>
                  <th scope="col">Name</th>
                  <th scope="col">Amount</th>
                  <th scope="col">Date created</th>
                  {/* <th scope="col">End Date</th> */}
                  <th scope="col">Action</th>
                </tr>
              </thead>
              <tbody>
                {visibleSubscription &&
                  Array.isArray(visibleSubscription) &&
                  visibleSubscription.map((sub, index) => (
                    <tr key={sub.id}>
                      <th scope="row">{index + 1}</th>
                      <td>{sub?.name}</td>
                      <td>{sub?.amount}</td>
                      <td>{new Date(sub?.date_created).toDateString()}</td>
                      {/* <td>{new Date(sub?.enddate).toDateString()}</td> */}
                      <td className="btn btn-primary btn-sm mt-1 rounded-sm">
                        <Link href={`/subscriptions/${sub.userPackageId}`}>
                          View
                        </Link>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
            <div className="d-flex justify-content-end">
              <button
                className={`btn mr-1 ${
                  currentPage !== 1 ? "btn-primary" : "btn-secondary"
                }`}
                disabled={currentPage === 1}
                onClick={prevHandler}
              >
                Previous
              </button>
              <button
                className={`btn ${
                  currentPage !== totalNumOfPages
                    ? "btn-primary"
                    : "btn-secondary"
                }`}
                disabled={currentPage === totalNumOfPages}
                onClick={nextHandler}
              >
                Next
              </button>
            </div>
          </div>
        )}
      </Box>
    </Modal>
  );
};

export default ViewSubscription;
