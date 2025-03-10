import React from 'react';
import { useForm } from "react-hook-form";
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import DialogActions from '@material-ui/core/DialogActions';
import {createCategory, updateCategory} from '../../store/actions/categoryAction';
import {useDispatch} from 'react-redux';

const useStyles = makeStyles({
    detail: {
        borderTop: "4px solid green",
      },
      button: {
          margin: "10px",
      },
  });

const CategoryForm = ({closeModal, requestType, categorydata}) => {
    const classes = useStyles();
    const { register, handleSubmit, errors } = useForm();
    const dispatch = useDispatch();

    const onSubmit = async (data) => {
        console.log(data.category);
        const alldata = {
            name: data.category
        };
        await dispatch(createCategory(alldata));
        closeModal();
    }

    const onSubmitEdit = async (data) => {
        const alldata = {
            id: categorydata.id,
            name: data.category
        };
        console.log(alldata);
        await dispatch(updateCategory(alldata))
        closeModal();
    }


    return (
        <div>
            <div class="modal-header">
                <h4 class="modal-title mt-0"><strong>{requestType} category </strong></h4>
                <button type="button" onClick={closeModal} class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
            </div>
            <form role="form" className={classes.form} onSubmit={handleSubmit(requestType==="Edit" ? onSubmitEdit : onSubmit)} noValidate>
                <div class="modal-body">
                    <div class="row">
                        <div class="col-md-12">
                            <div class="form-group">
                                <label for="category">{requestType} Category* </label>
                                <input type="text" name="category" maxlength="100" parsley-trigger="change" required
                                        placeholder={`${requestType} Category`} defaultValue={categorydata ? categorydata.name : ""} class="form-control" id="category" 
                                        ref={register({ required: true })} />
                                        {errors.category && <span style={{color:"red"}}>This field is required</span>}
                            </div>
                        </div>
                    </div>
                </div>
            <div class="modal-footer">
                {/* <button type="button" class="btn btn-light waves-effect" data-dismiss="modal">Close</button>
                <input type="submit" class="btn btn-danger waves-effect waves-light save-category" value="Submit"/> */}
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

export default CategoryForm;
