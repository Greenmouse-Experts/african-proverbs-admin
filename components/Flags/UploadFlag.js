import React, { useState, useEffect, useMemo, useCallback } from "react";
import dynamic from "next/dynamic";
import { useForm, Controller } from "react-hook-form";
import { makeStyles } from "@material-ui/core/styles";
import { useDispatch, useSelector } from "react-redux";
import { CountryDropdown, RegionDropdown } from "react-country-region-selector";
import { fetchLanguages } from "../../store/actions/languageAction";
import { DropzoneArea } from "material-ui-dropzone";
import CancelIcon from "@material-ui/icons/Cancel";
import {
  getCountries,
  uploadFlag,
  editFlag,
  getFlag,
} from "@/services/flagApis";
import { useRouter } from "next/router";
import AlertToast from "../EthnicSymbols/AlertToast";

const useStyles = makeStyles({
  detail: {
    borderTop: "4px solid green",
  },
  button: {
    margin: "10px",
  },
  previewChip: {
    minWidth: 160,
    maxWidth: 210,
    marginTop: "2.1rem",
    position: "relative",
    left: "12px",
  },
});

const backendImgUrl = `${process.env.baseUrl}/api/proverbs/flag/image/`;

const UploadFlag = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  // const { register, handleSubmit, errors } = useForm();
  const { handleSubmit, control, reset, register, errors } = useForm();

  const [image, setImage] = useState([]);
  const [countryData, setCountryData] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null);
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [openAlert, setOpenAlert] = useState(false);
  const [alertMsg, setAlertMsg] = useState("");
  const [severity, setSeverity] = useState("success");
  const router = useRouter();
  const flagID = router?.query?.q;

  const handleImage = (value) => {
    setImage(value);
    onFileLoad(value);
  };

  const onFileLoad = useCallback((value) => {
    const file = value?.[0];

    if (file) {
      const reader = new FileReader();
      reader.onabort = () => console.log("file reading was aborted");
      reader.onerror = () => console.log("file reading has failed");
      reader.onload = () => {
        // console.log(reader.result);
        setSelectedImage(reader?.result);
      };
      reader.readAsDataURL(file);
    } else {
      setSelectedImage(null);
    }
  }, []);

  useEffect(() => {
    //console.log(flagID);
    const getFlagData = async () => {
      const flagData = await getFlag(flagID);
      setSelectedCountry(flagData?.data?.country?.id);
      setSelectedImage(`${backendImgUrl}${flagData?.data?.name}`);
      //console.log(flagData?.data);
    };
    if (flagID) {
      getFlagData();
    } else {
      setSelectedCountry(0);
      setSelectedImage(null);
    }
  }, [router?.query]);

  // useEffect(() => {
  //   console.log(selectedCountry);
  // }, [selectedCountry]);

  useEffect(() => {
    //console.log(flagID);
    const fetchCountries = async () => {
      const _getCountries = await getCountries();
      //console.log(_getCountries);
      setCountryData(_getCountries?.data);
    };
    fetchCountries();
  }, []);

  // useEffect(() => {
  //   if (countryData.length) {
  //     console.log(countryData);
  //   }
  // }, [countryData]);

  const onSubmitEdit = async (data) => {
    if (!selectedCountry) {
      alert("Country cannot be empty");
      return;
    }
    if (!image.length) {
      alert("Flag image cannot be empty");
      return;
    }

    const formData = new FormData();
    !flagID && formData.append("country_id", selectedCountry);
    if (image.length > 0) {
      if (typeof image[0] !== "undefined") {
        formData.append("file", image[0]);
      }
    }
    if (flagID) {
      const uploadData = await editFlag(formData, flagID);
      //console.log("edit", uploadData);
      if (uploadData.status === 200 || uploadData.status === 201) {
        setAlertMsg(`Flag was changed successfully`);
        setOpenAlert(true);

        setTimeout(() => {
          router.push("/flags/countries/");
        }, 1000);
      } else {
        //console.log("edit", uploadData);
        setSeverity(`error`);
        setAlertMsg(`Flag could not be changed`);
        setOpenAlert(true);
      }
    } else {
      const uploadData = await uploadFlag(formData);
      //console.log("create", uploadData);
      if (uploadData.status === 200 || uploadData.status === 201) {
        setAlertMsg(`Flag was created successfully`);
        setOpenAlert(true);

        setTimeout(() => {
          router.push("/flags/countries/");
        }, 1000);
      } else {
        setSeverity(`error`);
        setAlertMsg(uploadData || `Flag creation failed. Duplicate`);
        setOpenAlert(true);
      }
    }
  };

  const handleCloseAlert = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpenAlert(false);
  };
  // console.log('checking out ethinic edit data')
  // console.log(ethnicEditdata)
  return (
    <div class="content">
      <div class="container-fluid">
        <AlertToast
          alertMsg={alertMsg}
          severity={severity}
          openAlert={openAlert}
          handleCloseAlert={handleCloseAlert}
        />
        <div class="row">
          <div class="col-md-12">
            <div class="card">
              <div class="card-body">
                <h4 class="header-title">
                  {!flagID ? "Upload a new Flag" : "Edit this flag"}
                </h4>
                <>
                  <form
                    onSubmit={handleSubmit(onSubmitEdit)}
                    noValidate
                    autoComplete="on"
                  >
                    <div class="form-row">
                      <div class="form-group col-md-6">
                        <label for="inputState" class="col-form-label">
                          Flag Country{" "}
                        </label>
                        <select
                          class="form-control form-white"
                          data-placeholder="Select Language"
                          name="country"
                          ref={register({ required: true })}
                          value={selectedCountry}
                          onChange={(e) => {
                            //console.log(e.target.value);
                            setSelectedCountry(e.target.value);
                          }}
                        >
                          <option key={"index"} value={null}>
                            {"**All countries**"}{" "}
                          </option>
                          {!!countryData?.length &&
                            countryData?.map((country, index) => (
                              <option key={index} value={country.id}>
                                {country.name}
                              </option>
                            ))}
                        </select>
                        {errors.language && (
                          <span style={{ color: "red" }}>
                            This field is required
                          </span>
                        )}
                      </div>
                      {/* <div class="form-group col-md-6">
                        <label for="inputState" class="col-form-label">
                          Ethnic Language{" "}
                        </label>
                        <select
                          class="form-control form-white"
                          data-placeholder="Select Language"
                          name="language"
                          ref={register({ required: true })}
                        >
                          <option
                            value={
                              ethnicEditdata ? ethnicEditdata.language.id : ""
                            }
                          >
                            {ethnicEditdata
                              ? ethnicEditdata.language.name
                              : "Language**"}{" "}
                          </option>
                          {languages &&
                            languages.map((language, index) => (
                              <option key={index} value={language.id}>
                                {language.name}
                              </option>
                            ))}
                        </select>
                        {errors.language && (
                          <span style={{ color: "red" }}>
                            This field is required
                          </span>
                        )}
                      </div> */}
                      <div class="form-group col-md-6">
                        <label for="inputState" class="col-form-label">
                          Flag Image -{" "}
                          <span style={{ color: "red", fontSize: "14px" }}>
                            **Maximum file upload size - 2mb**
                          </span>
                        </label>
                        <DropzoneArea
                          acceptedFiles={["image/*"]}
                          style={{ height: "20px", width: 100 }}
                          dropzoneText={"Drag and drop an image here or click"}
                          dropzoneClass={classes.dropzone}
                          onChange={handleImage}
                          showPreviews={false}
                          showPreviewsInDropzone={false}
                          //useChipsForPreview
                          showFileNames={false}
                          showFileNamesInPreview={true}
                          maxFileSize={2108573}
                          previewGridProps={{
                            container: { spacing: 1, direction: "row" },
                          }}
                          previewChipProps={{
                            classes: { root: classes.previewChip },
                          }}
                          previewText=""
                          filesLimit={1}
                          // dropzoneProps={{
                          //   validator: (file) => {
                          //     return {
                          //       code: "i-wanted",
                          //       message: `Because I wanted`,
                          //     };
                          //   },
                          // }}
                          initialFiles={[selectedImage]}
                          required
                          showAlerts={true}
                        />
                        {errors.images && (
                          <span style={{ color: "red" }}>
                            This field is required
                          </span>
                        )}
                        <div class="col-md-12">
                          {selectedImage ? (
                            <div
                              style={{
                                width: "35%",
                                marginTop: "21px",
                                position: "relative",
                              }}
                            >
                              <CancelIcon
                                style={{
                                  position: "absolute",
                                  right: "-8px",
                                  top: "-18px",
                                  cursor: "pointer",
                                }}
                                onClick={() => handleImage(null)}
                              />
                              <img
                                alt="flag"
                                src={selectedImage}
                                style={{
                                  width: "100%",
                                  height: "auto",
                                  display: "block",
                                  margin: "0 auto",
                                }}
                              />
                            </div>
                          ) : (
                            ""
                          )}
                        </div>
                      </div>
                      <div class="form-group mb-4 col-md-12">
                        <div class="row">
                          <div class="ml-2">
                            <button
                              type="submit"
                              class="btn btn-purple waves-effect waves-light"
                            >
                              {" "}
                              <span>Submit Flag</span>{" "}
                              <i class="fa fa-globe-africa ml-1"></i>{" "}
                            </button>
                          </div>
                          {/* <div class="ml-3">
                            <button
                              onClick={() => close()}
                              class="btn btn-secondary waves-effect waves-light"
                            >
                              {" "}
                              <span>Cancel </span>{" "}
                              <i class="fa fa-arrow ml-1"></i>{" "}
                            </button>
                          </div> */}
                        </div>
                      </div>
                      <br />
                    </div>
                  </form>
                </>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UploadFlag;

// import Head from "next/head";
// import Image from "next/image";
// import React, { useState, useMemo, useEffect, useCallback } from "react";
// import withAuth from "@/utils/withAuth";
// import dynamic from "next/dynamic";
// import { useDispatch, useSelector } from "react-redux";
// import Alert from "../UIElements/Alert";
// import CircularProgress from "@material-ui/core/CircularProgress";
// import { useDropzone } from "react-dropzone";
// import Link from "next/link";
// import { toggleIsLoading, alertMessage } from "../../store/actions/authActions";
// import {
//   acceptStyle,
//   activeStyle,
//   baseStyle,
//   rejectStyle,
//   useStyles,
// } from "./styles";
// import { uploadEthnicFacts } from "@/store/actions/ethnicFactsAction";

// const QuestionUploads = () => {
//   const classes = useStyles();
//   const dispatch = useDispatch();
//   const [file, setFile] = useState(null);
//   const [isLoading, setIsLoading] = useState(false);
//   const { user, msg } = useSelector((state) => state.auth);
//   const [selectedImage, setSelectedImage] = useState(null);

//   const onFileLoad = useCallback((acceptedFiles) => {
//     if (files.length > 0) {
//       setFile(files[0]);
//     }
//     acceptedFiles.forEach((file) => {
//       const reader = new FileReader();

//       reader.onabort = () => console.log("file reading was aborted");
//       reader.onerror = () => console.log("file reading has failed");
//       reader.onload = () => {
//         // console.log(reader.result);
//         setSelectedImage(reader?.result);
//       };
//       reader.readAsDataURL(file);
//     });
//   }, []);

//   const {
//     getRootProps,
//     getInputProps,
//     isDragActive,
//     isDragAccept,
//     isDragReject,
//     acceptedFiles,
//   } = useDropzone({
//     accept: "image/*",
//     maxFiles: 1,
//     onDrop: onFileLoad,
//   });

//   const files = acceptedFiles.map((file) => (
//     <li style={{ color: "red" }} key={file.path}>
//       {file.path}
//     </li>
//   ));

//   const style = useMemo(
//     () => ({
//       ...baseStyle,
//       ...(isDragActive ? activeStyle : {}),
//       ...(isDragAccept ? acceptStyle : {}),
//       ...(isDragReject ? rejectStyle : {}),
//     }),
//     [isDragActive, isDragReject, isDragAccept],
//   );

//   const onSubmit = async (e) => {
//     setIsLoading(true);
//     e.preventDefault();
//     //console.log(file);
//     if (!file) {
//       //console.log("here now");
//       dispatch(alertMessage("An image file must be uploaded", "ERROR"));
//       setIsLoading(false);
//       return;
//     } else {
//       const payload = {
//         file: file,
//       };
//       dispatch(uploadEthnicFacts(payload));
//       remove();
//       setIsLoading(false);
//     }
//   };

//   const remove = () => {
//     acceptedFiles.splice(file, 1);
//     setFile(acceptedFiles);
//   };

//   return (
//     <div class="content">
//       <div class="container-fluid">
//         <div class="row">
//           <div class="col-md-12">
//             <div class="card">
//               <div class="card-body">
//                 <h4 class="header-title">Upload a Flag</h4>
//                 <p class="sub-header text-danger">
//                   **Maximum file upload size is 3mb. (png and jpg formats
//                   only)**
//                 </p>
//                 <form onSubmit={onSubmit} noValidate autoComplete="off">
//                   <div class="row">
//                     <div class="col-sm-12 mb-3">
//                       <div class="card-box">
//                         <button
//                           type="submit"
//                           disabled={isLoading ? true : false}
//                           class="btn btn-purple float-right waves-effect waves-light"
//                         >
//                           {isLoading ? (
//                             <CircularProgress size={16} color="white" />
//                           ) : (
//                             <>
//                               {" "}
//                               <span>Submit Flag</span>{" "}
//                               <i class="mdi mdi-cloud-upload ml-1"></i>{" "}
//                             </>
//                           )}
//                         </button>
//                       </div>
//                     </div>
//                     <div class="col-sm-12">
//                       <div className="container">
//                         <div {...getRootProps({ style })}>
//                           <input {...getInputProps()} />
//                           <p>
//                             <i class="mdi mdi-cloud-upload mr-1"></i> Click here
//                             to upload Flag.
//                           </p>
//                         </div>
//                       </div>
//                     </div>
//                   </div>
//                   {/* <div class="col-md-12 mt-3">
//                     {selectedImage ? (
//                       <img
//                         width={150}
//                         height={100}
//                         src={selectedImage}
//                         alt="image"
//                       />
//                     ) : (
//                       ""
//                     )}
//                     <aside>
//                       <ul className="mt-1">{files}</ul>
//                     </aside>
//                   </div> */}

//                   {msg ? <Alert key={new Date()} payload={msg} /> : null}
//                   <br />
//                 </form>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default QuestionUploads;
