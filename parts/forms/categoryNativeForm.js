import React from 'react';
import { useForm } from "react-hook-form";
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import DialogActions from '@material-ui/core/DialogActions';
import {useDispatch} from 'react-redux';
import {fetchCategoryId, 
    createCategoryNativeName, updateCategoryNativeName} from '../../store/actions/categoryNativeAction';

const useStyles = makeStyles({
    detail: {
        borderTop: "4px solid green",
      },
      button: {
          margin: "10px",
      },
  });

const CategoryNativeForm = ({closeModal, requestType, categorynativedata, languages, categoryId}) => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const { register, handleSubmit, errors } = useForm();

    // console.log(id);

    const onSubmit = (data) => {
        let selectedlanguage = languages.find(
            (language)=> language.id===parseInt(data.language))
        const all_data = {
            name: data.nativename,
            language: data.language,
            category: categoryId.id,};
        dispatch(createCategoryNativeName(all_data));
        closeModal();
    }

    const onSubmitEdit = async (data) => {
        let selectedlanguage = languages.find(
            (language)=> language.id===parseInt(data.language))
        // console.log(selectedlanguage);
        const all_data = {
            categorynativeID: categorynativedata.id,
            name: data.nativename,
            language: data.language,
            category: categoryId.id,}
        dispatch(updateCategoryNativeName(all_data));
        closeModal();
    }


    return (
        <div>
            <div class="modal-header">
                <h4 class="modal-title mt-0"><strong>{requestType} category Native Name </strong></h4>
                <button type="button" onClick={closeModal} class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
            </div>
            <form role="form" className={classes.form} onSubmit={handleSubmit(requestType==="Edit" ? onSubmitEdit : onSubmit)} noValidate>
                <div class="modal-body">
                        <div class="row">
                            <div class="col-md-12">
                                <label class="control-label">Category Native Name</label>
                                <input class="form-control form-white" placeholder="Category Native Name" defaultValue={categorynativedata ? categorynativedata.name : ""} type="text" name="nativename"
                                ref={register({ required: true })}/>
                                {errors.nativename && <span style={{color:"red"}}>This field is required</span>}
                            </div>
                            <div class="col-md-6">
                                <label class="control-label">Language</label>
                                    <select class="form-control form-white" data-placeholder="Select Language"
                                        name="language"
                                    ref={register({ required: true })}>
                                        <option value="">Language** </option>
                                        {/* <option selected disabled>
                                            Select function
                                        </option> */}
                                        {languages && languages.map((language, index) => (
                                            <option key={index} value={language.id}>{language.name}</option>
                                        ))}
                                    </select>
                                {errors.language && <span style={{color:"red"}}>This field is required</span>}
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

export default CategoryNativeForm;
