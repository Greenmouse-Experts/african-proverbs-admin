import React, { useState, useEffect } from "react";
import withAuth from "@/utils/withAuth";
import { useDispatch, useSelector } from "react-redux";
import { Alert } from "@/components/UIElements";
import { alertMessage } from "@/store/actions/authActions";
import {
  AdminsavemappedquestionHandler,
  deleteQueston,
  fetchEthnicMappedQuestion,
  saveNewQuestion,
} from "@/store/actions/questionMappingAction";
import * as types from "@/store/actions/actionTypes";
import { toast } from "react-toastify";
import { getAllQuestions } from "@/utils/utilities";
import Link from "next/link";
import { FetchAllQuestions } from "@/services/questionMappingService";
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
import Modal from "@material-ui/core/Modal";

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

const QuestionMapping = () => {
  const [isLoading, setisLoading] = useState(false);
  const [otherQuestions, setotherQuestions] = useState([]);
  const [page, setPage] = useState(1);
  const [size, setSize] = useState(20);
  const [questionSize, setquestionSize] = useState(30);
  const [questionpage, setquestionpage] = useState(1);
  const [questionPageArr, setquestionPageArr] = useState([]);
  const [isSaving, setisSaving] = useState(false);
  const dispatch = useDispatch();
  const [ethnicId, setethnicId] = useState("");
  const [questionId, setquestionId] = useState("");
  const [showModal, setshowModal] = useState(false);
  const [dataToDelete, setdataToDelete] = useState(null);
  const [generalEthnic, setgeneralEthnic] = useState("GENERAL");

  const { user, msg } = useSelector((state) => state.auth);
  const {
    isQuestionMappingLoading,
    contentData,
    totalPages,
    totalElements,
    allQuestion,
    isQuestionSaved,
    isQuestionDeleted,
  } = useSelector((state) => state.questionMapping);

  const prevBtnEnabled = page > 1;
  const nextBtnEnabled = page < totalPages;

  const getAllQuestions = async (query) => {
    try {
      const result = await FetchAllQuestions(query);
      if (result.status === 200) {
        const pageArray = Array.from(
          { length: result.data.totalPages },
          (_, index) => index + 1
        );
        setquestionPageArr(pageArray);
        setotherQuestions(result.data.content);
        setquestionId(result.data.content[0]?.data.id);
      }
    } catch (error) {
      console.log(error.message);
      dispatch(alertMessage("Error Fetching All Questions", "FAILURE"));
      error;
    }
  };

  function saveMappedQuestion() {
    if (!ethnicId && !questionId) {
      dispatch(alertMessage("Ethnic and question must be selected", "FAILURE"));
      return;
    }

    const payload = { ethnicId, questionId };
    dispatch(AdminsavemappedquestionHandler(payload));
  }

  function handlePrevClick() {
    setPage((prevPage) => prevPage - 1);
  }
  function handleNextClick() {
    setPage((prevPage) => prevPage + 1);
  }
  function handleShowModal(data) {
    setshowModal(true);
    setdataToDelete(data);
  }
  function handleDeleteQuestion() {
    const id = dataToDelete.mappingId;
    dispatch(deleteQueston(id));
    setshowModal(false);
  }

  useEffect(() => {
    if (ethnicId) {
      const query = { page, size, ethnicId };
      dispatch(fetchEthnicMappedQuestion(query));
    }
  }, [ethnicId, page, isQuestionSaved, isQuestionDeleted]);

  useEffect(() => {
    if (ethnicId) {
      const query2 = { page: questionpage, size: questionSize, ethnicId };
      getAllQuestions(query2);
    }
  }, [questionpage, ethnicId, isQuestionSaved]);

  useEffect(() => {
    if (!ethnicId) {
      dispatch({ type: types.CLEAR_CONTENT });
    }
  }, []);

  return (
    <div className="content mt-2">
      {msg && <Alert key={new Date()} payload={msg} />}
      <div className="container-fluid">
        <div className="row">
          <div className="col-xl-12 mb-5">
            <>
              <div className="row d-md-flex justify-content-center">
                <div className="col-sm-12 mb-1">
                  <div className="card-box">
                    <div className="row">
                      <div className="col-sm-12 col-md-4">
                        <h5>Ethnics</h5>
                        <select
                          name=""
                          id=""
                          onChange={(e) => {
                            setethnicId(e.target.value);
                          }}
                          className="form-control form-control-sm mr-1"
                          value={ethnicId}
                        >
                          <option value={null} selected>
                            Select ethnic
                          </option>
                          <option value={generalEthnic}>General Ethnic</option>
                          {user &&
                            user.ethnics.map((stat, index) => (
                              <option key={index} value={stat.id}>
                                {stat.name}
                              </option>
                            ))}
                        </select>
                      </div>
                      {ethnicId === "GENERAL" ? (
                        ""
                      ) : (
                        <>
                          <div className="col-sm-12 col-md-4">
                            <h5>Questions</h5>
                            <select
                              name=""
                              id=""
                              onChange={(e) => {
                                setquestionId(e.target.value);
                              }}
                              className="form-control form-control-sm mr-1"
                              value={questionId}
                            >
                              <option value={null} disabled>
                                select question
                              </option>
                              {user &&
                                otherQuestions &&
                                otherQuestions.map(({ data }, index) => (
                                  <option key={data.id} value={data.id}>
                                    {data.question}
                                  </option>
                                ))}
                            </select>
                          </div>
                          <div className="cols-sm-12 col-md-2">
                            <h5>Next Question page</h5>
                            <select
                              name=""
                              id=""
                              className="form-control form-control-sm mr-1"
                              value={questionpage}
                              onChange={(e) => setquestionpage(e.target.value)}
                            >
                              <option value="" disabled>
                                next question
                              </option>
                              {questionPageArr &&
                                questionPageArr.map((value) => (
                                  <option value={value} key={value}>
                                    {value}
                                  </option>
                                ))}
                            </select>
                          </div>
                          <div className="col-sm-4 col-md-2 mt-4">
                            <button
                              type="button"
                              disabled={ethnicId === "GENERAL"}
                              onClick={saveMappedQuestion}
                              className="btn btn-info btn-rounded waves-effect width-md waves-light"
                            >
                              {isLoading ? "Saving..." : "Save"}
                            </button>
                          </div>
                        </>
                      )}
                    </div>
                  </div>
                </div>
              </div>
              {user ? (
                <div class="table-responsive bg-white p-3 shadow-sm rounded">
                  <h4 className="header-title mt-0">Mapped Questions</h4>
                  <table className="table table-striped table-bordered table-hover nowrap">
                    <thead>
                      <tr>
                        <th>S/N</th>

                        <th>Ethnic</th>
                        <th>Question</th>
                        {ethnicId === "GENERAL" ? "" : <th>Action</th>}
                      </tr>
                    </thead>
                    <tbody>
                      {contentData?.length > 0 ? (
                        contentData.map((data, index) => (
                          <tr
                            className="cursor-pointer"
                            key={data.ethnicfactQuestionId}
                          >
                            <td>{index + 1}</td>
                            <td>{data?.ethnicName}</td>
                            <td>{data?.question}</td>
                            {ethnicId === "GENERAL" ? (
                              ""
                            ) : (
                              <td>
                                <button className="border-0 text-white p-1 rounded px-2 mr-1 bg-warning">
                                  <Link
                                    href={`/question-mapping/${data?.mappingId}`}
                                    className="text-white"
                                  >
                                    View
                                  </Link>
                                </button>
                                <button
                                  onClick={() => handleShowModal(data)}
                                  className="border-0 text-white rounded p-1 bg-danger px-2"
                                >
                                  Delete
                                </button>
                              </td>
                            )}
                          </tr>
                        ))
                      ) : (
                        <>
                          <p className="text-danger text-uppercase my-2 font-weight-bold">
                            No Mapped Questions
                          </p>
                        </>
                      )}
                    </tbody>
                  </table>
                  <div className="d-flex justify-content-end">
                    <button
                      className={`px-4 py-1 mr-1 border-0  ${
                        prevBtnEnabled ? "bg-primary text-white" : "bg-seconday"
                      }`}
                      onClick={handlePrevClick}
                      disabled={!prevBtnEnabled}
                    >
                      Previous 20
                    </button>
                    <button
                      className={`px-4 py-1 border-0  ${
                        nextBtnEnabled ? "bg-primary text-white" : "bg-seconday"
                      }`}
                      onClick={handleNextClick}
                      disabled={!nextBtnEnabled}
                    >
                      Next 20
                    </button>
                  </div>
                </div>
              ) : (
                <div className="spinner">Loading...</div>
              )}
            </>
          </div>
        </div>
      </div>
      {showModal && (
        <Modal
          open={showModal}
          onClose={() => {
            setshowModal(false);
            // setIsEditing(false);
          }}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <div className="d-flex justify-content-center">
              <Typography variant="h5" component="h5">
                Are you sure to delete question
              </Typography>
            </div>
            <Divider />
            <div className="d-flex justify-content-center align-items-center mt-3 gap-2">
              <button
                onClick={handleDeleteQuestion}
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
    </div>
  );
};

export default withAuth(QuestionMapping);
