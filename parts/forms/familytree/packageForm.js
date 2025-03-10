import React, { useState, useEffect } from 'react';
import dynamic from "next/dynamic";
import { useForm, Controller } from "react-hook-form";
import { makeStyles } from '@material-ui/core/styles';
import { useDispatch, useSelector } from 'react-redux';
import { DropzoneArea } from 'material-ui-dropzone';
import { htmlFilter } from '@/utils/utilities'
import { createPackage, updatePackage } from '@/store/actions/familyPackageAction'

const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });


const useStyles = makeStyles({
    detail: {
        borderTop: "4px solid green",
    },
    button: {
        margin: "10px",
    },
    previewChip: {
        minWidth: 160,
        maxWidth: 210
    }
});

const PackageForm = ({ packageData, requestType, close, open }) => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const { handleSubmit, control, reset, register, errors } = useForm();
    const [state, setstate] = useState({ country: '', region: '' });
    const [image, setImage] = useState('');
    const [description, setDescription] = useState(packageData ? packageData.description : "")


    const handleImage = (value) => {
        setImage(value)
    }

    const handleDescription = (v) => {
        setDescription(v)
    }

    const onSubmit = async (data) => {
        console.log(data);
        const { packageName, packagePrice, noOfFamily, description, noOfNodes } = data

        var formData = new FormData();
        formData.append('name', packageName);
        formData.append('description', description);
        formData.append('noOfFamily', noOfFamily);
        formData.append('noOfNodes', noOfNodes);
        formData.append('price', packagePrice);
        formData.append('image', image[0]);
        dispatch(createPackage(formData));
        close();
    }

    const onSubmitEdit = async (data) => {
        const { packageName, packagePrice, noOfFamily, description, noOfNodes } = data
        formData.append('name', packageName);
        formData.append('description', description);
        formData.append('noOfFamily', noOfFamily);
        formData.append('noOfNodes', noOfNodes);
        formData.append('price', packagePrice);
        formData.append('image', image[0]);
        dispatch(updatePackage(all_data, packageData.id));
        close();
    }
    return (
        <div class="content">
            <div class="container-fluid">
                <div class="row">
                    <div class="col-md-12">
                        <div class="card">
                            <div class="card-body">
                                <h4 class="header-title">Create a new Package Group</h4>
                                <form onSubmit={handleSubmit(requestType == "Edit" ? onSubmitEdit : onSubmit)} noValidate autoComplete="on">
                                    <div class="form-row">
                                        <div class="form-group col-md-6">
                                            <label for="packageName" class="col-form-label">Package Name</label>
                                            <input type="text" name="packageName" maxlength="100" parsley-trigger="change" required
                                                placeholder="Package Name e.g Silver" defaultValue={packageData ? (packageData.state.split(',')[0] ? packageData.state.split(',')[0] : "") : ""} class="form-control" id="ethnicregion"
                                                ref={register({ required: false })} />
                                        </div>

                                        <div class="form-group col-md-6">
                                            <label for="packagePrice" class="col-form-label">Package Price </label>
                                            <input type="number" name="packagePrice" maxlength="100" parsley-trigger="change" required
                                                placeholder="Enter Package Price" defaultValue={packageData ? packageData.name : ""} class="form-control" id="ethnicname"
                                                ref={register({ required: true })} />
                                            {errors.ethnicname && <span style={{ color: "red" }}>This field is required</span>}
                                        </div>

                                        <div class="form-group col-md-6">
                                            <label for="noOfFamily" class="col-form-label">Number of Family </label>
                                            <input type="number" name="noOfFamily" maxlength="100" parsley-trigger="change" required
                                                placeholder="Number of Family" defaultValue={packageData ? packageData.name : ""} class="form-control" id="ethnicname"
                                                ref={register({ required: true })} />
                                            {errors.noOfFamily && <span style={{ color: "red" }}>This field is required</span>}
                                        </div>

                                        <div class="form-group col-md-6">
                                            <label for="noOfNodes" class="col-form-label">Number of Nodes </label>
                                            <input type="number" name="noOfNodes" maxlength="100" parsley-trigger="change" required
                                                placeholder="Number of Nodes" defaultValue={packageData ? packageData.name : ""} class="form-control" id="ethnicname"
                                                ref={register({ required: true })} />
                                            {errors.noOfNodes && <span style={{ color: "red" }}>This field is required</span>}
                                        </div>

                                        <div class="form-group col-md-6">
                                            <label for="inputState" class="col-form-label">Package Images </label>
                                            <DropzoneArea
                                                acceptedFiles={['image/*']}
                                                style={{ height: '20px', width: 100 }}
                                                dropzoneText={"Drag and drop an image here or click"}
                                                dropzoneClass={classes.dropzone}
                                                onChange={handleImage}
                                                showPreviews={true}
                                                showPreviewsInDropzone={false}
                                                useChipsForPreview
                                                previewGridProps={{ container: { spacing: 1, direction: 'row' } }}
                                                previewChipProps={{ classes: { root: classes.previewChip } }}
                                                previewText="Selected files"
                                                filesLimit={1}
                                                // initialFiles={requestType == "Edit" ? [process.env.imageBaseUrl + packageData.image] : null}
                                                initialFiles={requestType == "Edit" ? [packageData.image] : null}
                                                required
                                                showAlerts={false}
                                            />
                                            {errors.image && <span style={{ color: "red" }}>This field is required</span>}
                                        </div>

                                        <div class="form-group col-md-6">
                                            <label for="inputState" class="col-form-label">Package Description</label>
                                            <Controller
                                                control={control}
                                                name="description"
                                                rules={{
                                                    validate: description => htmlFilter(description).length > 0 || "Description Field Must not be empty",
                                                    required: true
                                                }}
                                                defaultValue={requestType == "Edit" ? packageData.description : " "}
                                                render={({ onChange, onBlur, value }) => (
                                                    <ReactQuill
                                                        theme="snow"
                                                        onChange={(description, delta, source, editor) => { handleDescription(description); {/*console.log(description); */ } onChange(description); }}
                                                        value={description || ''}
                                                    />
                                                )}
                                            />
                                            {errors.description && <span className={classes.error}>{errors.description.message}</span>}
                                        </div>
                                        <div class="form-group mb-4 col-md-12">
                                            <div class="row">
                                                <div class="ml-2">
                                                    <button type='submit' class="btn btn-purple waves-effect waves-light"> <span>Submit Package</span> <i class="fa fa-globe-africa ml-1"></i> </button>
                                                </div>
                                                <div class="ml-3">
                                                    <button onClick={() => close()} class="btn btn-secondary waves-effect waves-light"> <span>Cancel </span> <i class="fa fa-arrow ml-1"></i> </button>
                                                </div>
                                            </div>
                                        </div>
                                        <br />
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
}



export default PackageForm;
