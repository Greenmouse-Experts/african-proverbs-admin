import React, { useState, useEffect, useMemo } from 'react';
import dynamic from "next/dynamic";
import { useForm, Controller } from "react-hook-form";
import { makeStyles } from '@material-ui/core/styles';
import { useDispatch, useSelector } from 'react-redux';
import { CountryDropdown, RegionDropdown } from 'react-country-region-selector';
import { fetchLanguages } from '../../store/actions/languageAction';
import { DropzoneArea } from 'material-ui-dropzone';
import { htmlFilter, formatCountries } from '../../utils/utilities'
import { createEthnic, updateEthnic } from '../../store/actions/ethnicAction';
import { MultiSelectComponent } from '../../components/UIElements/InputField'
import { FetchCountries } from '@/services/ethnicService';

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

const EthnicForm = ({ ethnicEditdata, requestType, close, open }) => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const { handleSubmit, control, reset, register, errors } = useForm();
    const { languages, isLoadinglanguages } = useSelector(state => state.Languages);
    const [countries, setCountries] = useState([])
    const [image, setImage] = useState('');
    const [images, setImages] = useState([]);
    const [value, setValue] = useState('')
    const [description, setDescription] = useState(ethnicEditdata ? ethnicEditdata.description : "")
    const [state, setstate] = useState({ country: '', region: '' });


    const handleImage = (value) => {
        setImage(value)
    }

    const handleImages = (value) => {
        setImages(value)
    }

    const handleDescription = (v) => {
        setDescription(v)
    }

    const selectRegion = (val) => {
        setstate({ ...state, region: val });
    }

    const onChange = (event, { newValue }) => {
        // console.log(event.target.value)
        // console.log(newValue);
        setValue(newValue);
    };

    const selectCountry = (val) => {
        setstate({ ...state, country: val });
    }

    useEffect(() => {
        dispatch(fetchLanguages());
    }, [fetchLanguages]);



    useEffect(() => {
        const fetchCountries = async () => {
            try {
                const getCountries = await FetchCountries();
                // console.log(getCountries.data)
                setCountries(getCountries?.data)

            } catch (error) {
                console.error("Error fetching Countries:", error);
            }
        };

        fetchCountries();
    }, [])


    const onSubmit = async (data) => {

        // console.log("Countries", data);

        if (data.country.length === 0) {
            alert("Country cannot be empty");
            return;
        }
        // if (state.region === "" || state.country === "") {
        //     alert("Location cannot be empty");
        // }
        // if (image.length < 1) {
        //     alert("Image cannot be empty");
        // }

        const selectedCountries = data.country.map(country => country.label).join(', ');

        var formData = new FormData();
        formData.append('name', data.ethnicname);
        formData.append('description', description);
        formData.append('country', selectedCountries);
        formData.append('language', data.language);

        images.map((data) => {
            formData.append('images', data);
        })

        if (image.length > 0) {
            if (typeof (image[0]) !== "undefined") {
                formData.append('image', image[0]);
            }
        }

        dispatch(createEthnic(formData));
        close();
    }

    const onSubmitEdit = async (data) => {



        if (data.country.length === 0) {
            alert("Country cannot be empty");
            return
        }
        // if (state.region === "" || state.country === "") {
        //     alert("Location cannot be empty");
        //     return;
        // }
        // if (image.length < 1) {
        //     alert("Image cannot be empty");
        //     return;
        // }
        const selectedCountries = data?.country?.map(country => country.label).join(', ');


        var formData = new FormData();
        formData.append('name', data.ethnicname);
        formData.append('description', description);
        formData.append('country', selectedCountries);
        formData.append('language', data.language);
        if (image.length > 0) {
            if (typeof (image[0]) !== "undefined") {
                formData.append('image', image[0]);
            }
        }
        dispatch(updateEthnic(formData, ethnicEditdata?.id));
        close();
    }

    const transformedOptions = ethnicEditdata?.country?.map(country => ({
        value: country?.id,
        label: country?.name
    }));



    return (
        <div class="content">
            <div class="container-fluid">
                <div class="row">
                    <div class="col-md-12">
                        <div class="card">
                            <div class="card-body">
                                <h4 class="header-title">Create a new Ethnic Group</h4>
                                <>
                                    {isLoadinglanguages ? <div class="spinner">Loading...</div>
                                        :
                                        <form onSubmit={handleSubmit(requestType == "Edit" ? onSubmitEdit : onSubmit)} noValidate autoComplete="on">
                                            <div class="form-row">
                                                <div class="form-group col-md-6">
                                                    <label htmlFor="inputState" class="col-form-label">Ethnic Country</label>
                                                    {/* <CountryDropdown
                                                        value={state.country}
                                                        onChange={(val) => selectCountry(val)}
                                                        defaultOptionLabel="Select Country"
                                                        classes="form-control form-white"
                                                        name="country"
                                                        required
                                                    /> */}
                                                    <Controller
                                                        control={control}
                                                        defaultValue={transformedOptions}
                                                        name="country"
                                                        rules={{
                                                            validate: value => value.length > 0 || "Please select a Country",
                                                            required: true
                                                        }}
                                                        render={({ onChange, onBlur, value }) => (

                                                            <MultiSelectComponent
                                                                options={formatCountries(countries)}
                                                                value={value || []}
                                                                onChange={onChange}
                                                                labelledBy={"Select"}
                                                                name='country'
                                                                ref={register({ required: true })}
                                                            />
                                                        )}
                                                    />

                                                </div>
                                                {/* <div class="form-group col-md-6">
                                                    <label for="inputState" class="col-form-label">Ethnic Region</label> */}
                                                {/* <RegionDropdown
                                                        disableWhenEmpty={true}
                                                        country={state.country}
                                                        value={state.region}
                                                        onChange={(val) => selectRegion(val)}
                                                        classes="form-control form-white"
                                                    /> */}
                                                {/* <input type="text" name="ethnicregion" maxlength="100" parsley-trigger="change" required
                                                        placeholder="Ethnic Region e.g South East"
                                                        // defaultValue={ethnicEditdata ? (ethnicEditdata.state.split(',')[0] ? ethnicEditdata.state.split(',')[0] : "") : ""}
                                                        class="form-control" id="ethnicregion"
                                                        ref={register({ required: false })} />
                                                </div> */}
                                                <div class="form-group col-md-6">
                                                    <label htmlFor="ethnicname" class="col-form-label">Ethnic Name </label>
                                                    <input type="text" name="ethnicname" maxlength="100" parsley-trigger="change" required
                                                        placeholder="Enter Ethnic name"
                                                        defaultValue={ethnicEditdata ? ethnicEditdata.name : ""} class="form-control" id="ethnicname"
                                                        ref={register({ required: true })} />
                                                    {errors.ethnicname && <span style={{ color: "red" }}>This field is required</span>}
                                                </div>

                                                <div class="form-group col-md-6">
                                                    <label htmlFor="inputState" class="col-form-label">Ethnic Language </label>
                                                    <select class="form-control form-white" data-placeholder="Select Language"
                                                        name="language"
                                                        ref={register({ required: true })}>
                                                        <option value={ethnicEditdata ? ethnicEditdata.language.id : ""}>{ethnicEditdata ? ethnicEditdata.language.name : "Language**"} </option>
                                                        {languages && languages.map((language, index) => (
                                                            <option key={index} value={language.id}>{language.name}</option>
                                                        ))}
                                                    </select>
                                                    {errors.language && <span style={{ color: "red" }}>This field is required</span>}
                                                </div>
                                                <div class="form-group col-md-6">
                                                    <label htmlFor="inputState" class="col-form-label">Ethnic Description</label>
                                                    <Controller
                                                        control={control}
                                                        name="description"
                                                        rules={{
                                                            validate: description => htmlFilter(description).length > 0 || "Description Field Must not be empty",
                                                            required: true
                                                        }}
                                                        defaultValue={requestType == "Edit" ? ethnicEditdata.description : " "}
                                                        render={({ onChange, onBlur, value }) => (
                                                            <ReactQuill
                                                                theme="snow"

                                                                onChange={(description, delta, source, editor) => { handleDescription(description); {/*console.log(description); */ } onChange(description); }}
                                                                value={description || ''}
                                                            />
                                                        )}
                                                    />
                                                    {errors.description && <span style={{ color: "red" }}>{errors.description.message}</span>}
                                                </div>
                                                <div class="form-group col-md-6">
                                                    <label htmlFor="inputState" class="col-form-label">Ethnic Image </label>
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
                                                        // initialFiles={requestType == "Edit" ? [process.env.imageBaseUrl + ethnicEditdata.image] : null}
                                                        initialFiles={requestType == "Edit" ? [ethnicEditdata.image] : null}
                                                        required
                                                        showAlerts={false}
                                                    />
                                                    {errors.image && <span style={{ color: "red" }}>This field is required</span>}
                                                </div>
                                                
                                                <div class="form-group col-md-6">
                                                    <label htmlFor="inputState" class="col-form-label">Ethnic Images </label>
                                                    <DropzoneArea
                                                        acceptedFiles={['image/*']}
                                                        style={{ height: '20px', width: 100 }}
                                                        dropzoneText={"Drag and drop images here or click"}
                                                        dropzoneClass={classes.dropzone}
                                                        onChange={handleImages}
                                                        showPreviews={true}
                                                        showPreviewsInDropzone={false}
                                                        useChipsForPreview
                                                        maxFileSize={1048573}
                                                        previewGridProps={{ container: { spacing: 1, direction: 'row' } }}
                                                        previewChipProps={{ classes: { root: classes.previewChip } }}
                                                        previewText="Selected files"
                                                        filesLimit={4}
                                                        dropzoneProps={{
                                                            validator: (file) => {
                                                                return {
                                                                    code: "i-wanted",
                                                                    message: `Because I wanted`
                                                                };
                                                            }
                                                        }}
                                                        // initialFiles={requestType == "Edit" ? [process.env.imageBaseUrl + ethnicEditdata.image] : null}
                                                        initialFiles={requestType == "Edit" ? [ethnicEditdata.images] : null}
                                                        required
                                                        showAlerts={true}
                                                    />
                                                    {errors.images && <span style={{ color: "red" }}>This field is required</span>}
                                                </div>
                                                <div class="form-group mb-4 col-md-12">
                                                    <div class="row">
                                                        <div class="ml-2">
                                                            <button type='submit' class="btn btn-purple waves-effect waves-light"> <span>Submit Ethnic</span> <i class="fa fa-globe-africa ml-1"></i> </button>
                                                        </div>
                                                        <div class="ml-3">
                                                            <button onClick={() => close()} class="btn btn-secondary waves-effect waves-light"> <span>Cancel </span> <i class="fa fa-arrow ml-1"></i> </button>
                                                        </div>
                                                    </div>
                                                </div>
                                                <br />
                                            </div>
                                        </form>
                                    }
                                </>

                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
}



export default EthnicForm;
