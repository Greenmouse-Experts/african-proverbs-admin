import React, { useEffect, useState } from "react";
import withAuth from "@/utils/withAuth";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import { alertMessage } from "@/store/actions/authActions";
import { Alert } from "@/components/UIElements";
import Modal from "@material-ui/core/Modal";
import {
  SaveQuestionOptions,
  UpdateQuestionOptions,
  fetchAllOptions,
  deleteOptionData,
} from "@/store/actions/questionMappingAction";
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

const AddOptions = () => {
  const [answer, setanswer] = useState("");
  const [alias, setalias] = useState("");
  const [status, setstatus] = useState("");
  const [showModal, setshowModal] = useState(false);
  const [dataToDelete, setdataToDelete] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const router = useRouter();
  const dispatch = useDispatch();
  const { user, isLoading, msg } = useSelector((state) => state.auth);
  const { questionOptions, isOptionSaved, isOptionDeleted, singleQuestion } =
    useSelector((state) => state.questionMapping);

  const { id } = router.query;

  async function saveOption() {
    if (!answer || !alias || !status) {
      dispatch(alertMessage("Enter all fields", "FAILURE"));
      return;
    }

    if (isEditing) {
      const payload = { answer, alias, status, answerId: dataToDelete?.id };
      await dispatch(UpdateQuestionOptions(payload));
      setIsEditing(false);
      setanswer("");
      setalias("");
      setstatus("");
    } else {
      const payload = { answer, alias, status, ethnicFactQuestionId: id };
      await dispatch(SaveQuestionOptions(payload));
      setanswer("");
      setalias("");
      setstatus("");
    }
  }

  function handleEdit(e, data) {
    e.preventDefault();
    setdataToDelete(data);
    setanswer(data?.answer);
    setalias(data?.alias);
    setstatus(data?.status);
    setIsEditing(true);
  }

  function handleShowModal(data) {
    setshowModal(true);
    setdataToDelete(data);
  }

  function handleDeleteOption() {
    dispatch(deleteOptionData(dataToDelete?.id));
    setshowModal(false);
  }

  useEffect(() => {
    dispatch(fetchAllOptions(id));
  }, [isOptionSaved, id, isOptionDeleted]);

  return (
    <>
      <div className="content mt-2">
        {msg && <Alert key={new Date()} payload={msg} />}
        <div className="container-fluid">
          <div className="row">
            <div className="col-xl-12 mb-1">
              <div className="row d-md-flex justify-content-center">
                <div className="col-sm-12 mb-1">
                  <div className="card-box">
                    <h5>Question: {singleQuestion?.question}</h5>
                    <div className="row">
                      <div className="col-sm-12 col-md-4">
                        <h5>Answer</h5>
                        <input
                          type="text"
                          value={answer}
                          onChange={(e) => setanswer(e.target.value)}
                          className="form-control form-control-sm "
                        />
                      </div>
                      <div className="col-sm-12 col-md-2 ">
                        <h5>Alias</h5>
                        <select
                          name=""
                          id=""
                          onChange={(e) => setalias(e.target.value)}
                          className="form-control form-control-sm mr-1"
                          value={alias}
                        >
                          <option value={""} disabled>
                            select alias
                          </option>
                          <option value={"A"}>A</option>
                          <option value={"B"}>B</option>
                          <option value={"C"}>C</option>
                          <option value={"D"}>D</option>
                        </select>
                      </div>
                      <div className="col-sm-12 col-md-2 ">
                        <h5>Status</h5>
                        <select
                          name=""
                          id=""
                          onChange={(e) => setstatus(e.target.value)}
                          className="form-control form-control-sm mr-1"
                          value={status}
                        >
                          <option value={""} disabled>
                            select status
                          </option>
                          <option value={"CORRECT"}>CORRECT</option>
                          <option value={"INCORRECT"}>INCORRECT</option>
                        </select>
                      </div>
                      <div className="col-sm-4 col-md-4 mt-4">
                        <div className="d-flex justify-content-start align-items-center ">
                          <button
                            type="button"
                            onClick={saveOption}
                            className="btn btn-info btn-rounded waves-effect width-md waves-light mr-1"
                          >
                            {isEditing ? "Update" : "Save"}
                          </button>
                          {isEditing && (
                            <button
                              type="button"
                              onClick={() => {
                                setIsEditing(false);
                                setanswer("");
                                setalias("");
                                setstatus("");
                              }}
                              className="btn btn-info btn-rounded waves-effect width-md waves-light"
                            >
                              Cancel Edit
                            </button>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {user && questionOptions ? (
              <div class="table-responsive bg-white p-3 shadow-sm rounded mb-5">
                <h4 className="header-title mt-0">Saved Options</h4>
                <table className="table table-striped table-bordered nowrap mb-5">
                  <thead>
                    <tr>
                      <th>S/N</th>
                      <th>Question</th>
                      <th>Answer</th>
                      <th>Status</th>
                      <th>Alias</th>
                      <th>Ethnic</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {questionOptions?.length > 0 ? (
                      questionOptions.map((data, index) => {
                        return (
                          <tr key={index}>
                            <td>{index + 1}</td>
                            <td>{data?.question}</td>
                            <td>{data?.answer}</td>
                            <td>{data?.status}</td>
                            <td>{data?.alias}</td>
                            <td>{data?.ethnicName}</td>
                            <td>
                              <button
                                className="border-0 text-white p-1 rounded px-2 mr-1 bg-warning"
                                onClick={(e) => handleEdit(e, data)}
                              >
                                Edit
                              </button>
                              <button
                                onClick={() => handleShowModal(data)}
                                className="border-0 text-white rounded p-1 bg-danger px-2"
                              >
                                Delete
                              </button>
                            </td>
                          </tr>
                        );
                      })
                    ) : (
                      <>
                        <p className="text-danger text-uppercase my-2 font-weight-bold">
                          No Mapped Options
                        </p>
                      </>
                    )}
                  </tbody>
                </table>
              </div>
            ) : (
              <div className="spinner">Loading...</div>
            )}
          </div>
        </div>
      </div>
      {showModal && (
        <Modal
          open={showModal}
          onClose={() => {
            setshowModal(false);
            setIsEditing(false);
          }}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <div className="d-flex justify-content-center">
              <Typography variant="h5" component="h5">
                Are you sure to delete option {dataToDelete?.alias}
              </Typography>
            </div>
            <Divider />
            <div className="d-flex justify-content-center align-items-center mt-3 gap-2">
              <button
                onClick={handleDeleteOption}
                className="btn btn-danger text-white px-2 py-1 rounded mr-1"
              >
                Delete
              </button>
              <button
                className="btn btn-info text-white px-2 py-1 rounded"
                onClick={() => setshowModal(false)}
              >
                Cancel
              </button>
            </div>
          </Box>
        </Modal>
      )}
    </>
  );
};

export default withAuth(AddOptions);
