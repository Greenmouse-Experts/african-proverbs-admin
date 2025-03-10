import React, { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import {
  Select,
  MultiSelectComponent,
  TextArea,
} from "../../components/UIElements/InputField";
import { useForm, Controller } from "react-hook-form";
import { makeStyles } from "@material-ui/core/styles";
import { useDispatch, useSelector } from "react-redux";
import { updateSuggestProverb } from "../../store/actions/sugProvAction";
import {
  htmlFilter,
  formatCategoryOptions,
  retrieveCategoryArray,
} from "../../utils/utilities";
import Alert from "@/components/UIElements/Alert";

const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });

const ProverbForm = ({ requestType, updateData, closesUpdate }) => {
  const classes = useStyles();
  const { handleSubmit, control, reset, register, errors } = useForm();
  const [value, setValue] = useState("");
  const [actionType, setActionType] = useState("");
  const [status, setStatus] = useState("AWAITING");
  const dispatch = useDispatch();
  const { categories } = useSelector((state) => state.Categories);
  const { user, msg } = useSelector((state) => state.auth);

  const initialOption = [
    { label: "Choose a category", value: " ", disabled: true },
  ];

  const handleStatustChange = (event) => {
    setStatus(event.target.value);
  };

  const onSubmitUpdate = (data) => {
    const { category, content, ethnic, interpretation, transliteration } = data;
    const tempElement = document.createElement("div");
    tempElement.innerHTML = content;
    const contentText = tempElement.textContent;
    const selectedCategoryId = category.length > 0 ? category[0].value : null;
    const payload = {
      category_id: selectedCategoryId,
      content: contentText,
      english_interpretation: interpretation,
      english_transliteration: transliteration,
      language_id: "4",
      ethnic_id: ethnic,
      status: "AWAITING",
    };
    const { id } = updateData;
    dispatch(updateSuggestProverb(payload, id));
    // reset();
  };

  return (
    <div class="card">
      {msg ? <Alert payload={msg} /> : null}
      <div class="card-body">
        <h4 class="header-title">{requestType} Proverb</h4>
        <p class="sub-header">Kindly Fill All Fields Correctly</p>
        <form
          onSubmit={handleSubmit(onSubmitUpdate)}
          noValidate
          autoComplete="off"
        >
          <div class="form-row">
            <div class="form-group col-md-6">
              <label for="inputState" class="col-form-label">
                Ethnic
              </label>
              <Select name="ethnic" ref={register({ required: true })}>
                {/* <option value=''>Choose</option> */}
                {user &&
                  user?.ethnics?.map((ethnic) =>
                    updateData &&
                    updateData?.ethnic &&
                    updateData?.ethnic?.id == ethnic.id ? (
                      <option key={ethnic?.id} value={ethnic?.id} selected>
                        {ethnic?.name}
                      </option>
                    ) : (
                      <option key={ethnic?.id} value={ethnic?.id}>
                        {ethnic?.name}
                      </option>
                    )
                  )}
              </Select>
              {errors.ethnic && (
                <span className={classes.error}>This Field is Required</span>
              )}
            </div>
            <div className="form-group col-md-12">
              <label htmlFor="inputState" className="col-form-label">
                Categories
              </label>
              <Controller
                control={control}
                name="category"
                // defaultValue={
                //   updateData
                //     ? categories.filter(
                //         (category) => category.id === updateData.category_id
                //       )
                //     : []
                // }
                rules={{
                  validate: (value) =>
                    value?.length > 0 ||
                    "A proverb must belong to one or more categories",
                  required: true,
                }}
                render={({ onChange, value }) => (
                  <MultiSelectComponent
                    options={
                      categories
                        ? formatCategoryOptions(categories)
                        : initialOption
                    }
                    value={value || []}
                    onChange={(selectedOptions) => {
                      onChange(selectedOptions);
                      const selectedCategoryIds = selectedOptions.map(
                        (selectedCategory) => selectedCategory.value
                      );
                      updateData.category_id = selectedCategoryIds;
                    }}
                    labelledBy={"Select"}
                    name="category"
                    ref={register({ required: true })}
                    className="border border-secondary rounded p-2 align-items-center"
                  />
                )}
              />
              {errors.category && (
                <span className={classes.error}>{errors.category.message}</span>
              )}
            </div>

            <div className="form-group col-md-12">
              <label htmlFor="inputState" className="col-form-label">
                Proverb Suggest Details
              </label>
              <Controller
                control={control}
                name="content"
                rules={{
                  validate: (value) =>
                    htmlFilter(value).length > 0 ||
                    "Proverb Field Must not be empty",
                  required: true,
                }}
                defaultValue={updateData ? updateData.content : " "}
                render={({ onChange, onBlur, value }) => {
                  // Create a temporary element to extract text content
                  const tempElement = document.createElement("div");
                  tempElement.innerHTML = value || "";
                  const textContent = tempElement.textContent;

                  return (
                    <ReactQuill
                      theme="snow"
                      onChange={(content, delta, source, editor) =>
                        onChange(content)
                      }
                      value={textContent}
                      modules={{
                        clipboard: {
                          matchVisual: true,
                        },
                      }}
                    />
                  );
                }}
              />
              {errors.proverb && (
                <span className={classes.error}>{errors.proverb.message}</span>
              )}
            </div>

            <div class="col-md-12 mb-1">
              <label class="control-label">Transliteration</label>
              <TextArea
                name="transliteration"
                defaultValue={
                  updateData ? updateData.english_transliteration : ""
                }
                ref={register({ required: true })}
              />
              {errors.english_transliteration && (
                <span className={classes.error}>This Field is Required</span>
              )}
            </div>
            <div class="col-md-12 mb-1">
              <label class="control-label">Interpretation</label>
              <TextArea
                name="interpretation"
                defaultValue={
                  updateData ? updateData.english_interpretation : ""
                }
                ref={register({ required: true })}
              />
              {errors.english_interpretation && (
                <span className={classes.error}>This Field is Required</span>
              )}
            </div>
            {/* <div className="form-group col-md-4">
              <FormControl component="fieldset">
                <label for="status" className="col-form-label text-lg">
                  Status
                </label>
                <RadioGroup
                  row
                  aria-label="status"
                  name="status"
                  defaultValue={
                    requestType === "Update" && updateData?.status === null
                      ? "AWAITING"
                      : updateData?.status || status
                  }
                  value={status}
                  onChange={handleStatustChange}
                >
                  <FormControlLabel
                    value="AWAITING"
                    control={<Radio color="primary" />}
                    label="AWAITING"
                  />
                  <FormControlLabel
                    value="PUBLISHED"
                    control={<Radio color="primary" />}
                    label="PUBLISHED"
                  />
                </RadioGroup>
              </FormControl>
            </div> */}
            <div class="form-group col-md-12 " style={{ marginTop: "2rem" }}>
              {updateData ? (
                <div>
                  <button
                    type="submit"
                    class="btn btn-purple waves-effect waves-light mr-2 mb-2"
                  >
                    <span>Update Proverb</span>
                    <i class="fa fa-globe-africa ml-1"></i>
                  </button>
                  <button
                    onClick={closesUpdate}
                    type="button"
                    class="btn btn-danger waves-effect waves-light mb-2"
                  >
                    <span>close</span>
                    <i class="mdi mdi-window-close ml-1"></i>
                  </button>
                </div>
              ) : (
                <>
                  <button
                    type="submit"
                    onClick={(e) => {
                      setActionType("awaiting");
                    }}
                    class="btn btn-purple waves-effect waves-light mr-3"
                  >
                    {" "}
                    <span>Save And Submit Suggestion for review</span>{" "}
                    <i class="fa fa-globe-africa ml-1"></i>{" "}
                  </button>
                  <button
                    onClick={(e) => {
                      setActionType("save");
                    }}
                    class="btn btn-purple waves-effect waves-light"
                  >
                    {" "}
                    <span>Save Proverb</span>{" "}
                    <i class="fa fa-globe-africa ml-1"></i>{" "}
                  </button>
                </>
              )}
            </div>
            {msg ? <Alert key={new Date()} payload={msg} /> : null}
            <br />
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

export default ProverbForm;
