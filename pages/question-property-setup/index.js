import React, { useEffect, useState } from "react";
import withAuth from "@/utils/withAuth";
import { Alert } from "@/components/UIElements";
import { toggleIsLoading, alertMessage } from "@/store/actions/authActions";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchAllQuestionPropery,
  saveQuestionPropertySetup,
  deleteQuestonProperty,
  UpdateQuestionProperty,
} from "@/store/actions/questionPropertyAction";
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

const QuestionPropertySetup = () => {
  const dispatch = useDispatch();
  const { user, msg } = useSelector((state) => state.auth);
  const {
    isQuestionPropertyLoading,
    contentData,
    totalPages,
    totalElements,
    isQuestionSaved,
    isQuestionDeleted,
    // allQuestion,
    // isQuestionDeleted,
  } = useSelector((state) => state.questionProperty);
  const [page, setpage] = useState(1);
  const [size, setsize] = useState(10);
  const [questionType, setQuestionType] = useState("");
  const [name, setName] = useState("");
  const [preferredLanguageComposition, setpreferredLanguageComposition] =
    useState("");
  const [selectedLanguageComposition, setselectedLanguageComposition] =
    useState("");
  const [generalQuestion, setgeneralQuestion] = useState("");
  const [maxNumberOfQuestion, setmaxNumberOfQuestion] = useState("");
  const [passScore, setpassScore] = useState("");
  const [editData, seteditData] = useState(null);
  const [showDeleteModal, setshowDeleteModal] = useState(false);
  const [dataToDelete, setdataToDelete] = useState(null);
  const [isEditing, setisEditing] = useState(false);
  const prevBtnEnabled = page > 1;
  const nextBtnEnabled = page < totalPages;

  function handlePrevClick() {
    setpage((prevPage) => prevPage - 1);
  }
  function handleNextClick() {
    setpage((prevPage) => prevPage + 1);
  }

  async function saveQuestionProperty() {

    if (!name) {
      dispatch(alertMessage("Enter the Question Property Name", "FAILURE"));
      return;
    }

    if (!questionType) {
      dispatch(alertMessage("Select a question type", "FAILURE"));
      return;
    }
    if (!preferredLanguageComposition) {
      dispatch(
        alertMessage("Enter a preferred language composition", "FAILURE")
      );
      return;
    }
    if (!selectedLanguageComposition) {
      dispatch(
        alertMessage("Enter a selected language composition", "FAILURE")
      );
      return;
    }
    if (!generalQuestion) {
      dispatch(alertMessage("Enter a general question", "FAILURE"));
      return;
    }
    if (!passScore) {
      dispatch(alertMessage("Enter a passScore", "FAILURE"));
      return;
    }
    if (maxNumberOfQuestion > 10 || maxNumberOfQuestion < 10) {
      dispatch(
        alertMessage(
          "Maximum number of question cannot be greater or less than 10",
          "FAILURE"
        )
      );
      return;
    }

    const payload = {
      questionType,
      name,
      preferredLanguageComp: parseInt(preferredLanguageComposition),
      selectedLanguageComp: parseInt(selectedLanguageComposition),
      generalQuestion: parseInt(generalQuestion),
      maximumNumberOfQuestion: parseInt(maxNumberOfQuestion),
      passScore: parseInt(passScore),
    };
    if (isEditing) {
      const id = editData?.id;
      await dispatch(UpdateQuestionProperty(payload, id));
      setisEditing(false);
      setQuestionType("");
      setpreferredLanguageComposition("");
      setselectedLanguageComposition("");
      setgeneralQuestion("");
      setmaxNumberOfQuestion("");
      setpassScore("");
      setName("");
    } else {
      await dispatch(saveQuestionPropertySetup(payload));
      setQuestionType("");
      setpreferredLanguageComposition("");
      setselectedLanguageComposition("");
      setgeneralQuestion("");
      setmaxNumberOfQuestion("");
      setpassScore("");
      setName("");

    }
  }

  function handleCancelUpdate() {
    seteditData(null);
  }

  function handleShowModal(data) {
    setshowDeleteModal(true);
    setdataToDelete(data);
  }

  async function handleDeleteQuestion() {
    const id = dataToDelete?.id;
    await dispatch(deleteQuestonProperty(id));
    setshowDeleteModal(false);
    setdataToDelete(null);
  }

  function handleEdit(data) {
    seteditData(data);
    setQuestionType(data?.questionType);
    setpreferredLanguageComposition(data?.preferredLanguageComp);
    setselectedLanguageComposition(data?.selectedLanguageComp);
    setgeneralQuestion(data?.generalQuestions);
    setmaxNumberOfQuestion(data?.maximumNumberOfQuestions);
    setpassScore(data?.passScore);
    setName(data?.name);

    setisEditing(true);
  }

  useEffect(() => {
    const query = { page, size };
    dispatch(fetchAllQuestionPropery(query));
  }, [page, isQuestionSaved, isQuestionDeleted]);

  useEffect(() => {
    if (
      preferredLanguageComposition &&
      selectedLanguageComposition &&
      generalQuestion
    ) {
      setmaxNumberOfQuestion(
        parseInt(preferredLanguageComposition) +
        parseInt(selectedLanguageComposition) +
        parseInt(generalQuestion)
      );
    }
    if (
      !preferredLanguageComposition &&
      !selectedLanguageComposition &&
      !generalQuestion
    ) {
      setmaxNumberOfQuestion("");
    }
  }, [
    preferredLanguageComposition,
    selectedLanguageComposition,
    generalQuestion,
  ]);

  return (
    <div className="content mt-2">
      <>
        {msg && <Alert key={new Date()} payload={msg} />}
        <div className="container-fluid">
          <div className="row">
            <div className="col-xl-12 mb-5">
              <>
                <div className="row">
                  <div className="col-sm-12  mb-1">
                    <div className="card-box">
                      <h4 className="header-title mt-0">
                        Create Question Property Setup
                      </h4>

                      <div className="row">
                        <div className="col-sm-4 col-md-4 mb-1">
                          <span className="font-weight-bold">Name of Question Property</span>
                          <input
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            name="name"
                            id=""
                            className="form-control form-control-sm mr-1"
                          />
                        </div>
                        <div className="col-sm-4 col-md-4 mb-1">
                          <span className="font-weight-bold">
                            Question type
                          </span>
                          <select
                            name=""
                            id=""
                            value={questionType}
                            onChange={(e) => setQuestionType(e.target.value)}
                            className="form-control form-control-sm mr-1"
                          >
                            <option value="" disabled>
                              select question type
                            </option>
                            <option value="MULTIPLE_CHOICE">
                              MULTIPLE_CHOICE
                            </option>
                            <option value="STRAIGHT_ANSWER">
                              STRAIGHT_ANSWER
                            </option>
                          </select>
                        </div>
                        <div className="col-sm-4 col-md-4 mb-1">
                          <span className="font-weight-bold">
                            Preferred Language composition percentage
                          </span>
                          <input
                            type="number"
                            value={preferredLanguageComposition}
                            onChange={(e) =>
                              setpreferredLanguageComposition(e.target.value)
                            }
                            name=""
                            id=""
                            className="form-control form-control-sm mr-1"
                          />
                        </div>
                        <div className="col-sm-4 col-md-4 mb-1">
                          <span className="font-weight-bold">
                            Selected language composition percentage
                          </span>
                          <input
                            type="number"
                            value={selectedLanguageComposition}
                            onChange={(e) =>
                              setselectedLanguageComposition(e.target.value)
                            }
                            name=""
                            id=""
                            className="form-control form-control-sm mr-1"
                          />
                        </div>
                        <div className="col-sm-4 col-md-4 mb-1">
                          <span className="font-weight-bold">
                            General question percentage
                          </span>
                          <input
                            type="number"
                            value={generalQuestion}
                            onChange={(e) => setgeneralQuestion(e.target.value)}
                            name=""
                            id=""
                            className="form-control form-control-sm mr-1"
                          />
                        </div>
                        <div className="col-sm-4 col-md-4 mb-1">
                          <span className="font-weight-bold">
                            Maximum number of question percentage
                          </span>
                          <input
                            type="number"
                            value={maxNumberOfQuestion}
                            disabled
                            name=""
                            id=""
                            className="form-control form-control-sm mr-1"
                          />
                        </div>
                        <div className="col-sm-4 col-md-4 mb-1">
                          <span className="font-weight-bold">Pass score</span>
                          <input
                            type="number"
                            value={passScore}
                            onChange={(e) => setpassScore(e.target.value)}
                            name=""
                            id=""
                            className="form-control form-control-sm mr-1"
                          />
                        </div>

                        <div className="col-sm-4 col-md-4 mb-1">
                          <button
                            type="button"
                            onClick={saveQuestionProperty}
                            className="btn btn-info btn-rounded waves-effect width-md waves-light mt-2 mr-1"
                          >
                            {isEditing ? "Update" : "Save"}
                          </button>
                          {isEditing && (
                            <button
                              type="button"
                              onClick={() => {
                                setisEditing(false);
                                setQuestionType("");
                                setpreferredLanguageComposition("");
                                setselectedLanguageComposition("");
                                setgeneralQuestion("");
                                setmaxNumberOfQuestion("");
                                setpassScore("");
                              }}
                              className="btn btn-info btn-rounded waves-effect width-md waves-light mt-2"
                            >
                              Cancel Edit
                            </button>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                {user ? (
                  <>
                    <div class="table-responsive bg-white p-3 shadow-sm rounded">
                      <h4 className="header-title mt-0">Question Property</h4>
                      <table className="table table-striped table-bordered table-hover nowrap">
                        <thead>
                          <tr>
                            <td>S/N</td>
                            <td>Name</td>
                            <td>Question type</td>
                            <td>Preferred language </td>
                            <td>Selected language </td>
                            <td>general question </td>
                            <td>Max number of question</td>
                            <td>Pass score</td>
                            <td>Action</td>
                          </tr>
                        </thead>
                        <tbody>
                          {contentData?.length > 0 &&
                            contentData?.map((data, index) => (
                              <tr key={data?.id}>
                                <td>{index + 1}</td>
                                <td>{data?.name}</td>

                                <td>{data?.questionType}</td>
                                <td className="col-1">
                                  {data?.preferredLanguageComp}
                                </td>
                                <td className="col-1">
                                  {data?.selectedLanguageComp}
                                </td>
                                <td className="col-1">
                                  {data?.generalQuestions}
                                </td>
                                <td className="col-2">
                                  {data?.maximumNumberOfQuestions}
                                </td>
                                <td className="col-1">{data?.passScore}</td>
                                <td className="col-3">
                                  <button
                                    className="border-0 text-white p-1 rounded  mr-1 bg-warning px-2"
                                    onClick={() => handleEdit(data)}
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
                            ))}
                        </tbody>
                      </table>
                      <div className="d-flex justify-content-end">
                        <button
                          className={`px-4 py-1 mr-1 border-0  ${prevBtnEnabled
                              ? "bg-primary text-white"
                              : "bg-seconday"
                            }`}
                          onClick={handlePrevClick}
                          disabled={!prevBtnEnabled}
                        >
                          Previous 10
                        </button>
                        <button
                          className={`px-4 py-1 border-0  ${nextBtnEnabled
                              ? "bg-primary text-white"
                              : "bg-seconday"
                            }`}
                          onClick={handleNextClick}
                          disabled={!nextBtnEnabled}
                        >
                          Next 10
                        </button>
                      </div>
                    </div>
                  </>
                ) : (
                  <div className="spinner">Loading...</div>
                )}
              </>
            </div>
          </div>
        </div>
      </>
      {showDeleteModal && (
        <Modal
          open={showDeleteModal}
          onClose={() => {
            setshowDeleteModal(false);
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
                onClick={() => setshowDeleteModal(false)}
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

export default withAuth(QuestionPropertySetup);
