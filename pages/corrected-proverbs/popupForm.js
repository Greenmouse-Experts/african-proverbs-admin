import React, { useState, useEffect } from "react";
import { Alert } from "@/components/UIElements";
import { useDispatch, useSelector } from "react-redux";
import {
  ApproveCorrection,
  UpdateCorrection,
} from "@/store/actions/correctProverbActions";
import { makeStyles } from "@material-ui/core/styles";

import { useForm, Controller } from "react-hook-form";
import { useRouter } from "next/router";
import Select from "react-select";

const PopupForm = ({ onClose, selectedCorrection, actionType, categories }) => {
  const router = useRouter();
  const { q } = router.query;
  const classes = useStyles();
  const correctionTypes = ["PROVERB", "TRANSLITERATION", "WISDOM", "CATEGORY"];
  const [correctionType, setCorrectionType] = useState(
    selectedCorrection?.correctionType || "WISDOM"
  );

  const [correctionValue, setCorrectionValue] = useState(
    selectedCorrection?.correctionNewValue || ""
  );
  const [mode, setMode] = useState(selectedCorrection?.mode || "");
  const [selectedCategory, setSelectedCategory] = useState(
    categories?.length > 0 ? categories[0] : null
  );

  const { _, msg } = useSelector((state) => state.auth) || {};
  const { handleSubmit, control, reset, register, errors } = useForm();
  const dispatch = useDispatch();

  useEffect(() => {
    if (correctionType !== "CATEGORY") {
      setMode("UPDATE");
    }
  }, [correctionType]);

  const handleModeChange = (selectedMode) => {
    setMode(selectedMode);
  };

  const handleCategoryChange = (selectedCategory) => {
    setSelectedCategory(selectedCategory);
  };

  const dispatchUpdateAction = () => {
    const payload = {
      correction_type: correctionType,
      correction_value: correctionValue,
      correction_old_id:
        mode === "UPDATE" && correctionType === "CATEGORY"
          ? selectedCategory?.id
          : null,
      correctionId: selectedCorrection?.correctionId,
      correctionMode: mode,
    };
    dispatch(UpdateCorrection(payload))
      .then(() => {
        onClose();
        router.reload();
      })
      .catch((error) => {
        console.error("An error occurred:", error);
      });
  };

  console.log(selectedCorrection);
  const dispatchApproveAction = () => {
    const approvalPayload = {
      action: "APPROVE",
      correctionId: selectedCorrection?.correctionId,
    };

    dispatch(ApproveCorrection(approvalPayload))
      .then(() => {
        router.push(`/corrected-proverbs`);
        onClose();
        router.reload();
      })
      .catch((error) => {
        console.error("An error occurred:", error);
      });
  };

  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        position: "fixed",
        top: 0,
        left: 0,
        backgroundColor: "rgba(0, 0, 0, 0.5)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        zIndex: "10000",
        overflow: "hidden",
      }}
    >
      <div
        className="card p-2 "
        style={{
          width: "600px",
          maxWidth: "100%",
          backgroundColor: "#FFF",
          border: "1px solid #ddd",
          display: "flex",
          flexDirection: "column",
        }}
      >
        {msg && <Alert payload={msg} />}
        <form
          onSubmit={handleSubmit(
            actionType === "UPDATE"
              ? dispatchUpdateAction
              : dispatchApproveAction
          )}
          noValidate
          autoComplete="off"
          className="form-row "
          style={{ overflow: "hidden" }}
        >
          <div className="form-group col-md-12">
            <label htmlFor="correctionType" className="col-form-label text-xxl">
              Correction Type
            </label>
            <Select
              name="correctionType"
              value={{ label: correctionType, value: correctionType }}
              onChange={(selectedOption) =>
                setCorrectionType(selectedOption?.value)
              }
              options={correctionTypes?.map((type) => ({
                value: type,
                label: type,
              }))}
            />
            {errors?.correctionType && (
              <span className={classes?.error}>This Field is Required</span>
            )}
          </div>

          <div className="form-group col-md-12">
            <label htmlFor="inputState" className="col-form-label">
              Correction Mode
            </label>
            <Select
              name="mode"
              value={{ label: mode, value: mode }}
              onChange={(selectedOption) =>
                handleModeChange(selectedOption?.value)
              }
              options={
                correctionType === "CATEGORY"
                  ? [
                      { label: "UPDATE", value: "UPDATE" },
                      { label: "ADD", value: "ADD" },
                    ]
                  : [{ label: "UPDATE", value: "UPDATE" }]
              }
            />
            {errors.mode && (
              <span className={classes?.error}>This Field is Required</span>
            )}
          </div>

          {actionType === "UPDATE" &&
          mode === "UPDATE" &&
          correctionType === "CATEGORY" ? (
            <div className="form-group col-md-12">
              <label htmlFor="inputState" className="col-form-label">
                Update Value
              </label>
              <Select
                name="category"
                value={
                  selectedCategory
                    ? {
                        value: selectedCategory?.name,
                        label: selectedCategory?.name,
                      }
                    : null
                }
                onChange={(selectedOption) =>
                  handleCategoryChange(selectedOption?.value)
                }
                options={categories.map((category) => ({
                  value: category?.name,
                  label: category?.name,
                }))}
              />
              {errors.category && (
                <span className={classes?.error}>This Field is Required</span>
              )}
            </div>
          ) : null}

          <div className="form-group col-md-12">
            <label for="name" className="col-form-label text-xxl">
              Correction New Value
            </label>
            <textarea
              type="text"
              name="value"
              parsley-trigger="change"
              required
              placeholder="Enter Correction Value"
              value={correctionValue}
              className="form-control"
              id="correctionValue"
              onChange={(e) => setCorrectionValue(e.target.value)}
              readOnly={actionType === "APPROVE"}
              ref={register({ required: true })}
            />
            {errors.correctionValue && (
              <span className={classes?.error}>This Field is Required</span>
            )}
          </div>

          <div
            className="col-md-12 "
            style={{ display: "flex", flexDirection: "column", gap: "1rem" }}
          >
            <button type="submit" className="btn btn-outline-success btn-sm">
              {actionType}
            </button>
            <button
              onClick={() => onClose()}
              className="btn btn-outline-danger btn-sm"
            >
              CLOSE
            </button>
          </div>
        </form>
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
export default PopupForm;
