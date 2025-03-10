import React, { useState, useEffect, useMemo, useCallback } from "react";
import dynamic from "next/dynamic";
import { useForm, Controller } from "react-hook-form";
import { makeStyles } from "@material-ui/core/styles";
import { useDispatch, useSelector } from "react-redux";
import { DropzoneArea } from "material-ui-dropzone";
import {
  getEthnics,
  uploadSymbol,
  editSymbol,
  getSymbol,
} from "@/services/ethnicSymbolApi";
import { useRouter } from "next/router";
import AlertToast from "./AlertToast";
import CancelIcon from "@material-ui/icons/Cancel";

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
    marginTop: "2rem",
  },
});

const backendImgUrl = `${process.env.baseUrl}/api/proverbs/flag/image/`;

const ManageSymbol = ({ ethnicEditdata, requestType }) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  // const { register, handleSubmit, errors } = useForm();
  const { handleSubmit, control, reset, register, errors } = useForm();

  const [image, setImage] = useState([]);
  const [countryData, setCountryData] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null);
  const [selectedEthnic, setSelectedEthnic] = useState(null);
  const [openAlert, setOpenAlert] = useState(false);
  const [alertMsg, setAlertMsg] = useState("");
  const [severity, setSeverity] = useState("success");
  const router = useRouter();
  const ethnicID = router?.query?.q;

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
    const getSymbolData = async () => {
      const ethnicData = await getSymbol(ethnicID);
      setSelectedEthnic(ethnicData?.data?.ethnicId);
      setSelectedImage(`data:image/png;base64,${ethnicData?.data?.file}`);
      // console.log(ethnicData?.data);
      // console.log(ethnicData?.data?.[0]?.id);
    };
    if (ethnicID) {
      getSymbolData();
    } else {
      setSelectedEthnic(0);
      setSelectedImage(null);
    }
  }, [router?.query]);

  useEffect(() => {
    //console.log(ethnicID);
    const fetchEthnics = async () => {
      const _getEthnics = await getEthnics();
      //console.log(_getEthnics?.data);
      setCountryData(_getEthnics?.data);
    };
    fetchEthnics();
  }, []);

  // useEffect(() => {
  //   if (countryData.length) {
  //     console.log(countryData);
  //   }
  // }, [countryData]);

  const onSubmitEdit = async (data) => {
    if (!selectedEthnic) {
      alert("Ethnic cannot be empty");
      return;
    }
    if (!image.length) {
      alert("Ethnic image cannot be empty");
      return;
    }

    const formData = new FormData();
    formData.append("ethnicId", `${selectedEthnic}`);
    if (image.length > 0) {
      if (typeof image[0] !== "undefined") {
        formData.append("imageFile", image[0]);
      }
    }

    if (ethnicID) {
      const uploadData = await uploadSymbol(formData, selectedEthnic);
      if (uploadData.status === 200 || uploadData.status === 201) {
        setAlertMsg(`Symbol was changed successfully`);
        setOpenAlert(true);

        setTimeout(() => {
          router.push("/ethnic-symbols/");
        }, 1000);
      } else {
        setSeverity(`errors`);
        setAlertMsg(`Symbol could not be changed`);
        setOpenAlert(true);
      }
    } else {
      const uploadData = await uploadSymbol(formData);
      //console.log("create", uploadData);
      if (uploadData.status === 200 || uploadData.status === 201) {
        setAlertMsg(`Symbol was created successfully`);
        setOpenAlert(true);

        setTimeout(() => {
          router.push("/ethnic-symbols/");
        }, 1000);
      } else {
        console.log("create", uploadData);
        setSeverity(`error`);
        setAlertMsg(`Symbol creation failed. Duplicate`);
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
                  {!ethnicID
                    ? "Create a New Ethnic Symbol"
                    : "Edit this Symbol"}
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
                          Ethnics{" "}
                        </label>
                        <select
                          class="form-control form-white"
                          data-placeholder="Select ethnic"
                          name="ethnic"
                          ref={register({ required: true })}
                          value={selectedEthnic}
                          onChange={(e) => {
                            //console.log(e.target.value);
                            setSelectedEthnic(e.target.value);
                          }}
                        >
                          <option value={null}>{"**All ethnics**"} </option>
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
                          Ethnic Image -{" "}
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
                          //initialFiles={[selectedImage]}
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
                              <span>Submit Ethnic Symbol</span>{" "}
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

export default ManageSymbol;
