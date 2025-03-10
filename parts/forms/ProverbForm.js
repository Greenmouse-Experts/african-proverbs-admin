import Head from 'next/head'
import React, { useState, useEffect } from 'react'
import withAuth from '@/utils/withAuth'
import dynamic from "next/dynamic";
import { Select, MultiSelectComponent, TextArea } from '../../components/UIElements/InputField'
import { useForm, Controller } from "react-hook-form";
import { makeStyles } from '@material-ui/core/styles'
import { useDispatch, useSelector } from 'react-redux'
import { fetchEthnic } from '@/store/actions/ethnicAction'
import { fetchCategories } from '@/store/actions/categoryAction'
import {
    addProverb,
    clearLikelihood,
    updateProverb
} from '../../store/actions/proverbActions'
import {
    htmlFilter,
    formatCategoryOptions,
    retrieveCategoryArray, retrieveEtnicNames
} from '../../utils/utilities'
import Alert from '@/components/UIElements/Alert'
import Autosuggest from 'react-autosuggest';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import CustomizedSwitch from '@/components/UIElements/Switch'
import Loader from '@/components/UIElements/Loader';
import Unauthorized from '../SubPages/Unauthorized'
import { toggleIsLoading } from '@/store/actions/authActions';
import CircularProgress from '@material-ui/core/CircularProgress';
import { CountryDropdown, RegionDropdown } from 'react-country-region-selector';


const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });


const ProverbForm = ({ requestType, updateData, closesUpdate }) => {
    const classes = useStyles()
    const [value, setValue] = useState('')
    const [suggestions, setSuggestions] = useState([])
    const { result } = useSelector(state => state.proverb)
    const [actionType, setActionType] = useState('');
    const dispatch = useDispatch()
    const { ethnics } = useSelector(state => state.Ethnics)
    const { categories } = useSelector(state => state.Categories)
    const { isLoading, likelihood } = useSelector(state => state.proverb);
    const { user, msg } = useSelector(state => state.auth);
    const [state, setstate] = useState({ country: '', region: '' });
    const [hidden, setHidden] = useState(true)


    const selectCountry = (val) => {
        setstate({ ...state, country: val });
    }

    useEffect(() => {
        // if (user && result == null) {
        //     var ethn = retrieveEtnicNames(user.ethnics);
        //     var nethnics = ethn.toString();
        //     // dispatch(fetchProverbs(user.role, nethnics));
        //     dispatch(fetchProverbs(user.roles, nethnics));
        // }

        if (!ethnics) {
            dispatch(fetchEthnic())
        }
        if (!categories) {
            dispatch(fetchCategories())
        }
        if (isLoading) {
            dispatch(toggleIsLoading())
        }

    }, [])

    const initialOption = [
        { label: "Choose a category", value: " ", disabled: true },

    ];

    const getSuggestions = value => {
        const inputValue = value && value.trim().toLowerCase();
        const inputLength = inputValue.length;
        let count = 0;

        return inputLength === 0 ? [] : proverbs && proverbs.filter(proverb => {
            const keep =
                count < 5 && proverb.content.toLowerCase().slice(0, inputLength) === inputValue;

            if (keep) {
                count += 1;
            }

            return keep;
        });
    };

    const getSuggestionValue = suggestion => suggestion.content;

    const renderSuggestion = suggestion => (
        <div>
            {suggestion.content}
        </div>

    );

    const onChange = (event, { newValue }) => {
        console.log(event.target.value)

        setValue(newValue)
    };

    const onSuggestionsFetchRequested = ({ value }) => {
        console.log(value)
        setSuggestions(getSuggestions(value))
    };

    const onSuggestionsClearRequested = () => {
        setSuggestions([])
    };
    const { handleSubmit, control, reset, register, errors } = useForm();

    const onSubmit = (data) => {
        // if(value === ''){
        //     console.log('dispatching this')
        //     dispatch( setAlert('Proverb Content Cannot be empty', 'ERROR'))
        //     return
        // }
        const { ethnic, category, proverb, origin, videoLink, audioLink } = data;
        const payload = {
            // content : value,
            content: proverb,
            categories: retrieveCategoryArray(category),
            ethnic: ethnic,
            status: actionType == 'save' ? 'CREATED' : 'AWAITING',
            hidden: hidden,
            video_link: videoLink,
            audio_link: audioLink
        }

        if (actionType == 'saveanyway') {
            payload['approved'] = true;
            console.log(payload);
            dispatch(addProverb(payload));
            dispatch(clearLikelihood())
            reset()
            setValue('');
            return
        }
        if (origin) {
            payload["origin"] = origin;
        }
        // console.log(payload);
        dispatch(addProverb(payload));
    }


    const onSubmitUpdate = (data) => {
        const { category, proverb, ethnic, origin } = data;
        const payload = {
            content: proverb,
            categories: retrieveCategoryArray(category),
            ethnic: ethnic,
            status: updateData.status,
            hidden: hidden
        };
        const { id, slug } = updateData;

        if (origin) {
            payload["origin"] = origin;
        }
        console.log(payload);
        dispatch(updateProverb(payload, id, slug));
        // reset();
    };

    const inputProps = {
        placeholder: 'Start writing your proverb',
        value,
        onChange: onChange,
    };

    return (
        <div class="card">
            {msg ? <Alert payload={msg} /> : null}
            <div class="card-body">
                <h4 class="header-title">{requestType} Proverb</h4>
                <p class="sub-header">Kindly Fill All Fields Correctly</p>
                <form onSubmit={handleSubmit(updateData ? onSubmitUpdate : onSubmit)} noValidate autoComplete="off">
                    <div class="form-row">
                        <div class="form-group col-md-6">
                            <label for="inputState" class="col-form-label">Ethnic</label>
                            <Select name='ethnic' ref={register({ required: true })}>
                                {/* <option value=''>Choose</option> */}
                                {
                                    user && (
                                        user.ethnics.map(ethnic => (
                                            updateData && updateData.ethnic && updateData.ethnic.id == ethnic.id ?
                                                <option key={ethnic.id} value={ethnic.id} selected>{ethnic.name}</option>
                                                :
                                                <option key={ethnic.id} value={ethnic.id} >{ethnic.name}</option>
                                        ))
                                    )
                                }
                            </Select>
                            {errors.ethnic && <span className={classes.error}>This Field is Required</span>}
                        </div>
                        <div class="form-group col-md-6">
                            <label for="inputState" class="col-form-label">Category</label>
                            <Controller
                                control={control}
                                name="category"
                                defaultValue={updateData ? formatCategoryOptions(updateData.categories) : []}
                                rules={{
                                    validate: value => value.length > 0 || "A proverb Must Belong to One or More Category",
                                    required: true
                                }}
                                render={({ onChange, onBlur, value }) => (
                                    <MultiSelectComponent
                                        options={categories ? formatCategoryOptions(categories) : initialOption}
                                        value={value || ''}
                                        onChange={(category, delta, source, editor) => onChange(category)}
                                        labelledBy={"Select"}
                                        name='category'
                                        ref={register({ required: true })}
                                    />
                                )}
                            />
                            {errors.category && <span className={classes.error}>{errors.category.message}</span>}

                        </div>

                        <div class="form-group col-md-6">
                            <label for="inputState" class="col-form-label">Proverb Video Link</label>
                            <input type="text" name="videoLink" maxlength="100" parsley-trigger="change" required
                                placeholder="Proverb Video link eg. https://youtu.be/WzfDo2Wpxks" defaultValue={updateData ?  updateData.video_link : ""} class="form-control" id="ethnicregion"
                                ref={register({ required: false })} />
                        </div>

                        <div class="form-group col-md-6">
                            <label for="inputState" class="col-form-label">Proverb Audio Link</label>
                            <input type="text" name="audioLink" maxlength="100" parsley-trigger="change" required
                                placeholder="Proverb Audio link eg. https://youtu.be/WzfDo2Wpxks" defaultValue={updateData ?  updateData.audio_link : ""} class="form-control" id="ethnicregion"
                                ref={register({ required: false })} />
                        </div>

                        <div class="form-group col-md-12">
                            <label for="inputState" class="col-form-label">Proverb Details</label>
                            {/* <Autosuggest
                            suggestions={suggestions}
                            onSuggestionsFetchRequested={onSuggestionsFetchRequested}
                            onSuggestionsClearRequested={onSuggestionsClearRequested}
                            getSuggestionValue={getSuggestionValue}
                            renderSuggestion={renderSuggestion}
                            inputProps={inputProps}
                            theme={classes}
                            // renderInputComponent={renderInputComponent}
                        /> */}
                            <Controller
                                control={control}
                                name="proverb"
                                rules={{
                                    validate: value => htmlFilter(value).length > 0 || "Proverb Field Must not be empty",
                                    required: true
                                }}
                                defaultValue={updateData ? updateData.content : " "}
                                render={({ onChange, onBlur, value }) => (
                                    <ReactQuill
                                        theme="snow"
                                        onChange={(proverb, delta, source, editor) => onChange(proverb)}
                                        value={value || ''}

                                    />
                                )}
                            />
                            {errors.proverb && <span className={classes.error}>{errors.proverb.message}</span>}
                        </div>
                        {/* <div class="form-group col-md-6">
                            <label for="inputState" class="col-form-label">Proverb Origin Country <p>(optional)</p></label>
                            <CountryDropdown
                                value={state.country}
                                onChange={(val) => selectCountry(val)}
                                defaultOptionLabel="Select Country"
                                classes="form-control form-white"
                                name="country"
                                required
                            />

                        </div> */}
                        <div class="form-group col-md-6">
                            <label for="inputState" class="col-form-label">Proverb Origin/Region <p>(optional)</p></label>
                            <input type="text" name="origin" maxlength="100" parsley-trigger="change" required
                                placeholder="Proverb Origin e.g Nigeria, South East" defaultValue={updateData ? updateData.origin : ""} class="form-control" id="ethnicregion"
                                ref={register({ required: false })} />
                        </div>
                        <div class="form-group col-md-4 ml-3 pt-5">
                            <FormControlLabel
                                control={<CustomizedSwitch checked={hidden} onChange={(v) => setHidden(!hidden)} name="checkedB" />}
                                label="Hide Proverb"
                            />
                        </div>



                        <div class="form-group col-md-12">
                            {(likelihood === null) ?

                                updateData ?
                                    <>
                                        <button
                                            type="submit"
                                            // disabled={isLoading ? true : false}
                                            class="btn btn-purple waves-effect waves-light mr-2"
                                        >
                                            <span>Update Proverb</span>
                                            <i class="fa fa-globe-africa ml-1"></i>
                                        </button>
                                        <button
                                            onClick={closesUpdate}
                                            type="button"
                                            // disabled={isLoading ? true : false}
                                            class="btn btn-danger waves-effect waves-light"
                                        >
                                            <span>close</span>
                                            <i class="mdi mdi-window-close ml-1"></i>
                                        </button>
                                    </>
                                    :
                                    // <>
                                    //     <button type='submit' onClick={e => {
                                    //         setActionType('awaiting');
                                    //     }} disabled={isLoading ? true : false} class="btn btn-purple waves-effect waves-light mr-3"> {isLoading ? <CircularProgress size={16} color="white" /> : <span>Save And Submit Proverb for review</span>} <i class="fa fa-globe-africa ml-1"></i> </button>
                                    //     <button onClick={e => {
                                    //         setActionType('save');
                                    //     }} disabled={isLoading ? true : false} class="btn btn-purple waves-effect waves-light"> {isLoading ? <CircularProgress size={16} color="white" /> : <span>Save Proverb</span>} <i class="fa fa-globe-africa ml-1"></i> </button>
                                    // </>
                                    <>
                                        <button type='submit' onClick={e => {
                                            setActionType('awaiting');
                                        }} class="btn btn-purple waves-effect waves-light mr-3">  <span>Save And Submit Proverb for review</span> <i class="fa fa-globe-africa ml-1"></i> </button>
                                        <button onClick={e => {
                                            setActionType('save');
                                        }} class="btn btn-purple waves-effect waves-light">  <span>Save Proverb</span> <i class="fa fa-globe-africa ml-1"></i> </button>
                                    </>


                                : null}

                            {likelihood && likelihood.length > 0 ?
                                <>
                                    <button onClick={e => {
                                        setActionType('saveanyway');
                                    }} disabled={isLoading ? true : false} class="btn btn-purple waves-effect waves-light mr-3"> {isLoading ? <CircularProgress size={16} color="white" /> : <span>Save Anyway</span>} <i class="fa fa-globe-africa ml-1"></i> </button>
                                </>
                                : null}

                        </div>
                        {msg ? <Alert key={new Date()} payload={msg} /> : null}
                        <br />
                    </div>
                </form>
            </div>
        </div>
    )
}

const useStyles = makeStyles((theme) => ({
    error: {
        color: 'red',
        fontSize: 11
    },
    container: {
        flexGrow: 1,
        position: 'relative',

    },
    input: {
        width: "240px",
        height: "40px",
        width: '100%',
        padding: "10px 20px",
        fontFamily: "Helvetica, sans-serif",
        fontSize: "14px",
        border: "1px solid #ced4da",
        borderRadius: "0.2rem"
    },
    inputFocused: {
        outlineStyle: "none"
    },
    suggestionsList: {
        margin: 0,
        padding: 0,
        listStyleType: 'none',
        boxShadow: '0px 2px 2px 2px #E5E5E5'
    },
    suggestion: {
        display: 'block',
        margin: 5,
        cursor: 'pointer',
        padding: 7,
    },

}));

export default ProverbForm;