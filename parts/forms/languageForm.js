import React from 'react';
import { useForm } from "react-hook-form";
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import DialogActions from '@material-ui/core/DialogActions';
import {createLanguage, updateLanguage} from '../../store/actions/languageAction';
import {useDispatch} from 'react-redux';

const useStyles = makeStyles({
    detail: {
        borderTop: "4px solid green",
      },
      button: {
          margin: "10px",
      },
  });

const LanguageForm = ({closeModal, requestType, languagedata}) => {
    const classes = useStyles();
    const { register, handleSubmit, errors } = useForm();
    const dispatch = useDispatch();

    const onSubmit = async (data) => {
        console.log(data.language);
        const alldata = {
            name: data.language
        };
        await dispatch(createLanguage(alldata));
        closeModal();
    }

    const onSubmitEdit = async (data) => {
        const alldata = {
            id: languagedata.id,
            name: data.language
        };
        console.log(alldata);
        await dispatch(updateLanguage(alldata));
        closeModal();
    }


    return (
        <div>
            <div class="modal-header">
                <h4 class="modal-title mt-0"><strong>{requestType} Language </strong></h4>
                <button type="button" onClick={closeModal} class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
            </div>
            <form role="form" className={classes.form} onSubmit={handleSubmit(requestType==="Edit" ? onSubmitEdit : onSubmit)} noValidate>
                <div class="modal-body">
                    <div class="row">
                        <div class="col-md-12">
                            <div class="form-group">
                                <label for="language">{requestType} Language* </label>
                                <input type="text" name="language" maxlength="100" parsley-trigger="change" required
                                    placeholder={`${requestType} Language`} defaultValue={languagedata ? languagedata.name : ""} class="form-control" id="language" 
                                    ref={register({ required: true })} />
                                    {errors.language && <span style={{color:"red"}}>This field is required</span>}
                            </div>
                        </div>
                    </div>
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
        </form>
        </div>
    );
}

export default LanguageForm;
