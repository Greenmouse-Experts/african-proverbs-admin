import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Select, TextArea } from "../../components/UIElements/InputField";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.min.css";
import Alert from "@/components/UIElements/Alert";
import {
  createQuestion,
  updateQuestion,
} from "@/store/actions/factQuestionAction";
import { useRouter } from "next/router";

const QuestionForm = ({ requestType, record_id = "" }) => {
  const [initialData, setInitialData] = useState({
    data: {
      type: "GENERAL", // Setting a default value here that matches one of the options
    },
  });
  const [selectValue, setSelectValue] = useState(
    requestType === "Update" ? initialData.data.type : "GENERAL"
  );

  const classes = useStyles();
  const { handleSubmit, reset, register, errors } = useForm();
  const dispatch = useDispatch();
  const { questions } = useSelector((state) => state.questions);

  const { user, msg } = useSelector((state) => state.auth);
  const router = useRouter();

  useEffect(() => {
    if (requestType === "Update" && record_id) {
      const questionData = questions?.content.find(
        (question) => question?.data?.id === record_id
      );
      setInitialData(questionData);
      setSelectValue(questionData?.data?.type || "GENERAL");
    }
  }, [requestType]);

  // Handler for creating a new package
  const onSubmit = (data) => {
    const { question, questionType } = data;
    if (question && questionType) {
      const payload = {
        question,
        type: questionType,
      };
      dispatch(createQuestion(payload)).then(() => {
        router.push("/fact-questions");
      });
      reset();
    }
  };

  const onSubmitUpdate = (data) => {
    const { question, questionType } = data;
    if (question && questionType) {
      const payload = {
        question,
        type: questionType,
        questionId: initialData.data.id,
      };
      dispatch(updateQuestion(payload)).then(() => {
        router.push({
          pathname: "/fact-questions",
          query: { updatedQuestion: "true" },
        });
      });
    }
  };

  return (
    <div className="card container mb-5">
      <ToastContainer position="top-center" />
      {msg ? <Alert payload={msg} /> : null}
      <div className="card-body">
        <h1 className="header-title display-1">{requestType} Fact Question</h1>
        <p className="sub-header">Kindly Fill All Fields Correctly</p>
        <form
          onSubmit={handleSubmit(
            requestType === "Update" ? onSubmitUpdate : onSubmit
          )}
          noValidate
          autoComplete="off"
        >
          <div className="form-row">
            <div className="form-group col-md-12">
              <label for="question" className="col-form-label text-xxl">
                Fact question
              </label>
              <TextArea
                type="text"
                name="question"
                parsley-trigger="change"
                required
                placeholder="Enter fact question .."
                defaultValue={
                  requestType === "Update"
                    ? initialData && initialData?.data?.question
                    : ""
                }
                className="form-control"
                id="name"
                ref={register({ required: true })}
              />
              {errors.question && (
                <span className={classes.error}>This Field is Required</span>
              )}
            </div>

            <div className="form-group col-md-6">
              <label htmlFor="inputState" className="col-form-label">
                Question Type
              </label>
              <Select
                name="questionType"
                value={selectValue}
                onChange={(e) => setSelectValue(e.target.value)}
                ref={register({ required: true })}
              >
                <option value="GENERAL">General</option>
                <option value="ETHNIC">Ethnic</option>
              </Select>
              {errors.questionType && (
                <span className={classes.error}>This Field is Required</span>
              )}
            </div>

            <div className="form-group col-md-12">
              <button
                type="submit"
                className="btn col-md-12 btn-purple waves-effect waves-light mr-3"
              >
                <span>{requestType} Question</span>{" "}
                <i className="fa fa-globe-africa ml-1"></i>
              </button>
            </div>
            <br />
          </div>
        </form>
        {msg ? <Alert key={new Date()} payload={msg} /> : null}
      </div>
    </div>
  );
};

const useStyles = makeStyles((theme) => ({
  error: {
    color: "red",
    fontSize: 11,
  },
  container: {
    flexGrow: 1,
    position: "relative",
  },
  input: {
    width: "240px",
    height: "40px",
    width: "100%",
    padding: "10px 20px",
    fontFamily: "Helvetica, sans-serif",
    fontSize: "14px",
    border: "1px solid #ced4da",
    borderRadius: "0.2rem",
  },
  inputFocused: {
    outlineStyle: "none",
  },
  suggestionsList: {
    margin: 0,
    padding: 0,
    listStyleType: "none",
    boxShadow: "0px 2px 2px 2px #E5E5E5",
  },
  suggestion: {
    display: "block",
    margin: 5,
    cursor: "pointer",
    padding: 7,
  },
}));

export default QuestionForm;
