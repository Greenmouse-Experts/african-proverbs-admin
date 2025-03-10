import React, {useState} from 'react';
import { useForm } from "react-hook-form";
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import DialogActions from '@material-ui/core/DialogActions';
import {useDispatch} from 'react-redux';
import {createEthnic, updateEthnic} from '../../store/actions/ethnicAction';
import { CountryDropdown, RegionDropdown } from 'react-country-region-selector';


const useStyles = makeStyles({
    detail: {
        borderTop: "4px solid green",
      },
      button: {
          margin: "10px",
      },
  });

const EthnicForm = ({closeModal, requestType, ethnicEditdata, languages}) => {
    const classes = useStyles();
    const [state, setstate] = useState({ country: '', region: '' });
    const { register, handleSubmit, errors } = useForm();
    const dispatch = useDispatch();

    const onSubmit = (ethnicdata) => {
        const all_data = {
            name: ethnicdata.ethnicname,
            language: ethnicdata.language,
            state: state.region+ ', ' +state.country 
        };
        console.log(all_data);
        dispatch(createEthnic(all_data));
        closeModal();
    }

    const onSubmitEdit = async (ethnicdata) => {
        const all_data = {
            id: ethnicEditdata.slug,
            name: ethnicdata.ethnicname,
            language: ethnicdata.language,
            state: state.country + ', ' + state.region
        };
        // const nid = ethnicEditdata.id
        console.log(all_data);
        await dispatch(updateEthnic(all_data));
        closeModal();
    }


    const selectRegion = (val) => {
        setstate({...state, region: val });
        }

    const selectCountry = (val) => {
        setstate({...state, country: val });
        }

    return (
        <div>
            <div class="modal-header">
                <h4 class="modal-title mt-0"><strong>{requestType} Ethnic </strong></h4>
                <button type="button" onClick={closeModal} class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
            </div>
                <form  role="form" data-parsley-validate onSubmit={handleSubmit(requestType==="Edit" ? onSubmitEdit : onSubmit)} noValidate>
                    <div class="modal-body">
                        <div class="row">
                            <div class="col-md-12">
                                <div class="form-group">
                                    <label for="ethnicname">Name* </label>
                                    <input type="text" name="ethnicname" maxlength="100" parsley-trigger="change" required
                                            placeholder="Enter Ethnic name" defaultValue={ethnicEditdata ? ethnicEditdata.name : ""} class="form-control" id="ethnicname"
                                            ref={register({ required: true })} />
                                            {errors.ethnicname && <span style={{color:"red"}}>This field is required</span>}
                                </div>
                                <div class="form-group">
                                    <label class="control-label">Language</label>
                                        <select class="form-control form-white" data-placeholder="Select Language"
                                            name="language"
                                        ref={register({ required: true })}>
                                            <option value="">Language** </option>
                                            {/* <option selected disabled>
                                                Select function
                                            </option> */}
                                            { languages && languages.map((language, index) => (
                                                <option key={index} value={language.id}>{language.name}</option>
                                            ))}
                                        </select>
                                    {errors.language && <span style={{color:"red"}}>This field is required</span>}
                                </div>

                                <div class="form-group">
                                <label for="location">Select Ethnic Region* </label>
                                    <CountryDropdown
                                        value={state.country}
                                        onChange={(val) => selectCountry(val)}
                                        defaultOptionLabel	="Select Country"
                                        classes="form-control form-white"
                                        name="country"
                                        required={true}
                                        />
                                    <label for="location"></label>
                                    <RegionDropdown
                                        disableWhenEmpty={true}
                                        country={state.country}
                                        value={state.region}
                                        onChange={(val) => selectRegion(val)}
                                        classes="form-control form-white"
                                        />
                                </div>

                                <div class="modal-footer">
                                    <DialogActions>
                                        <Button onClick={closeModal} color="primary">
                                            Cancel
                                        </Button>
                                        <Button type="submit" color="primary">
                                            Submit
                                        </Button>
                                    </DialogActions>
                                </div>
                            </div>
                        </div>
                    </div>
                </form>
        </div>
    );
}

export default EthnicForm;
