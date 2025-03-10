import Head from "next/head";
import React, { useState, useMemo, useEffect } from "react";
import withAuth from "@/utils/withAuth";
import dynamic from "next/dynamic";
import { makeStyles } from "@material-ui/core/styles";
import { useDispatch, useSelector } from "react-redux";
import { addBatchProverbs } from "../../store/actions/proverbActions";
import Alert from "../../components/UIElements/Alert";
import CircularProgress from "@material-ui/core/CircularProgress";
import { useDropzone } from "react-dropzone";
import Link from "next/link";
import { toggleIsLoading, alertMessage } from "../../store/actions/authActions";

const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });
const baseStyle = {
  flex: 1,
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  padding: "40px",
  borderWidth: 2,
  borderRadius: 2,
  borderColor: "#6c757d",
  borderStyle: "dashed",
  backgroundColor: "#fff",
  color: "black",
  outline: "none",
  transition: "border .24s ease-in-out",
};

const activeStyle = {
  borderColor: "#2196f3",
};

const acceptStyle = {
  borderColor: "#00e676",
};

const rejectStyle = {
  borderColor: "#ff1744",
};

const CreateBatchProverb = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [file, setFile] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const { user, msg } = useSelector((state) => state.auth);

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
    console.log(file);
    if (!file) {
      console.log("here now");
      dispatch(alertMessage("A file must be uploaded", "ERROR"));
      setIsLoading(false);
      return;
    } else {
      const payload = {
        file: file,
      };
      dispatch(addBatchProverbs(payload));
      remove();
      setIsLoading(false);
    }
  };

  const remove = () => {
    acceptedFiles.splice(file, 1);
    setFile(acceptedFiles);
  };

  return (
    <div class="content">
      <div class="container-fluid">
        <div class="row">
          <div class="col-md-12">
            <div class="card">
              <div class="card-body">
                <h4 class="header-title">Create a new Proverb</h4>
                <p class="sub-header text-danger">
                  **Kindly Download the proverb excel sheet sample to follow**
                </p>
                <form onSubmit={onSubmit} noValidate autoComplete="off">
                  <div class="row">
                    <div class="col-sm-12">
                      <div class="card-box">
                        <a
                          class="btn btn-purple float-right waves-effect waves-light"
                          href="../../static/assets/sample_excel_format.xlsx"
                          download
                        >
                          <div class="dropdown ">
                            <i class="mdi mdi-cloud-download mr-1"></i>{" "}
                            <span>Download Proverb Excel Sample or Format</span>
                          </div>
                        </a>

                        <Link href="/proverbs/proverb-data">
                          <button class="btn btn-purple waves-effect waves-light">
                            <div class="dropdown ">
                              <span>Get Categories and Ethnicities Data</span>
                            </div>
                          </button>
                        </Link>
                      </div>
                    </div>
                    <div class="col-sm-12">
                      <div className="container">
                        <div {...getRootProps({ style })}>
                          <input {...getInputProps()} />
                          <p>
                            <i class="mdi mdi-cloud-upload mr-1"></i> Upload
                            Excel File for Batch Upload
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

const useStyles = makeStyles((theme) => ({
  error: {
    color: "red",
    fontSize: 11,
  },
  thumbButton: {
    position: "absolute",
    right: 10,
    bottom: 10,
    background: "rgba(0,0,0,.8)",
    color: "#fff",
    border: 0,
    borderRadius: ".325em",
    cursor: "pointer",
  },
  img: {
    display: "block",
    width: "auto",
    height: "100%",
  },
  thumbInner: {
    display: "flex",
    minWidth: 0,
    overflow: "hidden",
  },
  thumb: {
    position: "relative",
    display: "inline-flex",
    borderRadius: 2,
    border: "1px solid #eaeaea",
    marginBottom: 8,
    marginRight: 8,
    width: 100,
    height: 100,
    padding: 4,
    boxSizing: "border-box",
  },
  thumbsContainer: {
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
    marginTop: 16,
    padding: 20,
  },
}));

export default withAuth(CreateBatchProverb);
