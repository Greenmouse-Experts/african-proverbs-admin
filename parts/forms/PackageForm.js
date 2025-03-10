import React, { useState, useEffect } from "react";
import { FormControl, Radio, RadioGroup } from "@material-ui/core";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import { makeStyles } from "@material-ui/core/styles";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.min.css";
import Alert from "@/components/UIElements/Alert";
import {
  createPackage,
  updatePackageAction,
} from "@/store/actions/packageActions";
import { useRouter } from "next/router";

const PackageForm = ({ requestType, record_id = "" }) => {
  const [initialData, setInitialData] = useState(null);
  const [allowAdvert, setAllowAdvert] = useState("false");
  const [status, setStatus] = useState("INACTIVE");

  const classes = useStyles();
  const { handleSubmit, reset, register, errors } = useForm();
  const dispatch = useDispatch();
  const { packages } = useSelector((state) => state.packages);

  const { user, msg } = useSelector((state) => state.auth);
  const router = useRouter();

  useEffect(() => {
    if (requestType === "Update" && record_id) {
      const pkgData = packages.content.find((pkg) => pkg.id === record_id);
      setInitialData(pkgData);
    }
  }, [requestType]);

  const handleAllowAdvertChange = (event) => {
    setAllowAdvert(event.target.value);
  };
  const handleStatustChange = (event) => {
    setStatus(event.target.value);
  };

  // Handler for creating a new package
  const onSubmit = (data) => {
    const { name, noOfEthnics, description, amount } = data;
    if (name && noOfEthnics && description && amount) {
      const payload = {
        name,
        description,
        amount,
        noOfEthnics,
        allowAdvert,
        status,
      };
      dispatch(createPackage(payload)).then(() => {
        // let's take you to packages after
        router.push("/packages");
      });
      reset();
    }
  };

  //hanlder for updating faq
  const onSubmitUpdate = (data) => {
    const { name, noOfEthnics, description, amount } = data;
    if (name && noOfEthnics && description && amount) {
      const payload = {
        name,
        description,
        amount,
        noOfEthnics,
        allowAdvert,
        status,
        id: initialData.id,
      };
      dispatch(updatePackageAction(payload)).then(() => {
        router.push("/packages");
      });
    }
  };

  return (
    <div className="card container mb-5">
      <ToastContainer position="top-center" />
      {msg ? <Alert payload={msg} /> : null}
      <div className="card-body">
        <h1 className="header-title display-1">{requestType} Package</h1>
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
              <label for="name" className="col-form-label text-xxl">
                Name
              </label>
              <input
                type="text"
                name="name"
                parsley-trigger="change"
                required
                placeholder="Enter package name"
                defaultValue={
                  requestType === "Update"
                    ? initialData && initialData?.name
                    : ""
                }
                className="form-control"
                id="name"
                ref={register({ required: true })}
              />
              {errors.name && (
                <span className={classes.error}>This Field is Required</span>
              )}
            </div>

            <div className="form-group col-md-12">
              <label for="noOfEthnics" className="col-form-label text-lg">
                Number of Ethics
              </label>
              <input
                type="number"
                name="noOfEthnics"
                parsley-trigger="change"
                required
                placeholder="Enter number of ethics"
                defaultValue={
                  requestType === "Update"
                    ? initialData && initialData?.noOfEthnics
                    : ""
                }
                className="form-control"
                id="noOfEthnics"
                ref={register({ required: true })}
              />
              {errors.noOfEthnics && (
                <span className={classes.error}>This Field is Required</span>
              )}
            </div>

            <div className="form-group col-md-12 mb-2">
              <label for="description" className="col-form-label text-lg">
                Description
              </label>
              <textarea
                name="description"
                style={{ height: "150px" }}
                parsley-trigger="change"
                required
                placeholder="Enter package description"
                defaultValue={
                  requestType === "Update"
                    ? initialData && initialData?.description
                    : ""
                }
                className="form-control"
                id="description"
                ref={register({ required: true })}
              />
              {errors.description && (
                <span className={classes.error}>This Field is Required</span>
              )}
            </div>

            <div className="form-group col-md-12">
              <label for="amount" className="col-form-label text-lg">
                Amount
              </label>
              <input
                type="number"
                name="amount"
                parsley-trigger="change"
                required
                placeholder="Enter package amount"
                defaultValue={
                  requestType === "Update"
                    ? initialData && initialData?.amount
                    : ""
                }
                className="form-control"
                id="amount"
                ref={register({ required: true })}
              />
              {errors.amount && (
                <span className={classes.error}>This Field is Required</span>
              )}
            </div>

            <div className="form-group col-md-4">
              <FormControl component="fieldset">
                <label for="allowAdvert" className="col-form-label text-lg">
                  Allow Advert
                </label>
                <RadioGroup
                  row
                  aria-label="allowAdvert"
                  name="allowAdvert"
                  defaultValue={
                    requestType === "Update"
                      ? initialData?.allowAdvert
                      : allowAdvert
                  }
                  value={allowAdvert}
                  onChange={handleAllowAdvertChange}
                >
                  <FormControlLabel
                    value="true"
                    control={<Radio color="primary" />}
                    label="YES"
                  />
                  <FormControlLabel
                    value="false"
                    control={<Radio color="primary" />}
                    label="NO"
                  />
                </RadioGroup>
              </FormControl>
            </div>
            <div className="form-group col-md-4">
              <FormControl component="fieldset">
                <label for="status" className="col-form-label text-lg">
                  Status
                </label>
                <RadioGroup
                  row
                  aria-label="status"
                  name="status"
                  defaultValue={
                    requestType === "Update" ? initialData?.status : status
                  }
                  value={status}
                  onChange={handleStatustChange}
                >
                  <FormControlLabel
                    value="ACTIVE"
                    control={<Radio color="primary" />}
                    label="ACTIVE"
                  />
                  <FormControlLabel
                    value="INACTIVE"
                    control={<Radio color="primary" />}
                    label="INACTIVE"
                  />
                </RadioGroup>
              </FormControl>
            </div>

            <div className="form-group col-md-12">
              <button
                type="submit"
                className="btn col-md-12 btn-purple waves-effect waves-light mr-3"
              >
                <span>{requestType} Package</span>{" "}
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

export default PackageForm;
