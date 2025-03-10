import Head from "next/head";
import React, { useState, useMemo, useEffect } from "react";
import withAuth from "@/utils/withAuth";
import dynamic from "next/dynamic";
import { useDispatch, useSelector } from "react-redux";
import Alert from "../UIElements/Alert";
import CircularProgress from "@material-ui/core/CircularProgress";
import { useDropzone } from "react-dropzone";
import Link from "next/link";
import { toggleIsLoading, alertMessage } from "../../store/actions/authActions";
import {
  acceptStyle,
  activeStyle,
  baseStyle,
  rejectStyle,
  useStyles,
} from "./styles";
import { uploadEthnicFacts } from "@/store/actions/ethnicFactsAction";
import MuiAlert from "@material-ui/lab/Alert";
import { Snackbar } from "@material-ui/core";
import { useRouter } from "next/router";

const QuestionUploads = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [file, setFile] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const { user, msg } = useSelector((state) => state.auth);
  const [openAlert, setOpenAlert] = useState(false);
  const [alertMsg, setAlertMsg] = useState("");
  const router = useRouter();

  const onFileLoad = (files) => {
    if (files.length > 0) {
      setFile(files[0]);
    }
  };

  const {
    getRootProps,
    getInputProps,
    isDragActive,
    isDragAccept,
    isDragReject,
    acceptedFiles,
  } = useDropzone({
    accept: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    maxFiles: 1,
    onDrop: onFileLoad,
  });

  const files = acceptedFiles.map((file) => (
    <li style={{ color: "red" }} key={file.path}>
      {file.path}
    </li>
  ));

  const style = useMemo(
    () => ({
      ...baseStyle,
      ...(isDragActive ? activeStyle : {}),
      ...(isDragAccept ? acceptStyle : {}),
      ...(isDragReject ? rejectStyle : {}),
    }),
    [isDragActive, isDragReject, isDragAccept],
  );

  const onSubmit = async (e) => {
    setIsLoading(true);
    e.preventDefault();
    //console.log(file);
    if (!file) {
      //console.log("here now");
      dispatch(alertMessage("A csv file must be uploaded", "ERROR"));
      setIsLoading(false);
      return;
    } else {
      const payload = {
        file: file,
      };
      const result = dispatch(uploadEthnicFacts(payload));
      if (result.success) {
        setAlertMsg(`Ethnic Fact Questions Uploaded Successfully`);
        setOpenAlert(true);
        setTimeout(() => {
          router.push("/fact-questions/");
        }, 1500);
      }
      remove();
      setIsLoading(false);
    }
  };

  const remove = () => {
    acceptedFiles.splice(file, 1);
    setFile(acceptedFiles);
  };

  const handleCloseAlert = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpenAlert(false);
  };

  return (
    <div class="content">
      <div class="container-fluid">
        <Snackbar
          anchorOrigin={{
            vertical: "top",
            horizontal: "right",
          }}
          open={openAlert}
          autoHideDuration={3000}
          onClose={handleCloseAlert}
        >
          <MuiAlert
            elevation={6}
            variant="filled"
            onClose={handleCloseAlert}
            severity="success"
          >
            {alertMsg}
          </MuiAlert>
        </Snackbar>
        <div class="row">
          <div class="col-md-12">
            <div class="card">
              <div class="card-body">
                <h4 class="header-title">Upload a Question</h4>
                <p class="sub-header text-danger">
                  **Kindly Download the excel sheet format to follow**
                </p>
                <form onSubmit={onSubmit} noValidate autoComplete="off">
                  <div class="row">
                    <div class="col-sm-12 mb-3">
                      <div class="card-box">
                        <a
                          class="btn btn-purple float-right waves-effect waves-light"
                          href="../../static/assets/ethnic_facts.xlsx"
                          download
                        >
                          <div class="dropdown">
                            <i class="mdi mdi-cloud-download mr-1"></i>{" "}
                            <span>Download an Excel Format</span>
                          </div>
                        </a>
                      </div>
                    </div>
                    <div class="col-sm-12">
                      <div className="container">
                        <div {...getRootProps({ style })}>
                          <input {...getInputProps()} />
                          <p>
                            <i class="mdi mdi-cloud-upload mr-1"></i> Upload
                            Excel File Here
                          </p>
                        </div>
                      </div>
                      <aside>
                        <ul className="text-center">{files}</ul>
                      </aside>
                    </div>
                  </div>
                  <div class="col-md-12 mt-3">
                    <button
                      type="submit"
                      disabled={isLoading ? true : false}
                      class="btn btn-success waves-effect waves-light"
                    >
                      {isLoading ? (
                        <CircularProgress size={16} color="white" />
                      ) : (
                        <>
                          {" "}
                          <span>Upload File</span>{" "}
                          <i class="mdi mdi-cloud-upload ml-1"></i>{" "}
                        </>
                      )}
                    </button>
                  </div>

                  {msg ? <Alert key={new Date()} payload={msg} /> : null}
                  <br />
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuestionUploads;
