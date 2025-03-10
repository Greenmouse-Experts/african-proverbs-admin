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

const ProverbModal = ({closeModal, name, children}) => {
    // const classes = useStyles();
    // const dispatch = useDispatch();
    

    // const onSubmit = (data) => {
        
    //     closeModal();
    // }

    // const onSubmitEdit = async (data) => {
       
    //     closeModal();
    // }

    return (
        
        <div class="modal-content no-border">
            <div class="modal-header">
                <h4 class="modal-title mt-0">{name}</h4>
                <button type="button" onClick={closeModal} class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
            </div>
            <div class="modal-body">
                    <div class="row">
                        {children}
                    </div>
            </div>
        </div>
    );
}

export default ProverbModal;
