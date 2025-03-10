import { useRouter } from "next/router";
import React, { useEffect, useState } from 'react'
import Card from '../../components/UIElements/Card'
import Link from 'next/link'
import { Select, TextArea } from '../../components/UIElements/InputField'
import { useForm, Controller } from "react-hook-form";
import { makeStyles } from '@material-ui/core/styles';
import { useSelector, useDispatch } from 'react-redux'
import { deleteProverbComment, addProverbComment, updateProverbComment } from "../../store/actions/proverbActions";
import { convTime } from "../../utils/utilities";
import FormDialog from '../../components/widgets/Modal';
import ProverbModal from "../../components/widgets/ProverbModal";
import DialogContent from '@material-ui/core/DialogContent';
import { checkInterpretationUniqueness, checkPermission } from '../../utils/utilities'

const CommentForm = ({ closeModal, openModal, open, commentData, state, requestType, proverb}) => {
    const classes = useStyles()
    const [data, setData] = useState(null)
    const [msg, setMsg] = useState(null)

    const dispatch = useDispatch()

    const { handleSubmit, control, reset, register, errors } = useForm({
        mode: "onBlur"
    });
    const { handleSubmit: handleSubmit2, control: control2, reset: reset2, register: register2, errors: errors2 } = useForm({
        mode: "onBlur"
    });

    const onSubmit = (data) => {
        const payload = {
            comment: data.comment,
            proverb: proverb.id,
            state: state
        }
        dispatch(addProverbComment(payload))
        reset()
        // $("#add-comment").modal("hide");
        closeModal();
    }

    const onEditFormSubmit = (values) => {
        console.log(values);
        const payload = {
            comment: values.comment,
            proverb: proverb.id,
            state: state
        }
        console.log(payload);
        dispatch(updateProverbComment(payload, commentData.id))
        reset2()
        setData(null)
        closeModal();
    }


    return (
        <>

            <FormDialog clickClose={closeModal} clickOpen={openModal} open={open} action="Add Category" >
                <DialogContent>
                    <ProverbModal closeModal={closeModal} name={`${requestType} Comment`}>
                        <form onSubmit={handleSubmit2(commentData ? onEditFormSubmit : onSubmit)} noValidate autoComplete="off" role="form">
                        {msg ?
                                    <h5 className='text-danger' > {msg}</h5>
                                    : null
                                }
                                <div class="row">
                                    <div class="col-md-12 mb-1">
                                        <label class="control-label">Comment</label>
                                        <TextArea name='comment' defaultValue={commentData ? commentData.comment : ''} ref={register2({ required: true })} />
                                        {errors.comment && <span className={classes.error}>This Field is Required</span>}
                                    </div>
                                    <div class=" col-md-12">
                                        <button type='submit' class="btn btn-success waves-effect waves-light"> <span>{`${requestType} Comment`}</span> </button>
                                    </div>
                                </div>
                        </form>
                    </ProverbModal>
                </DialogContent>
            </FormDialog>
        </>

    )
}

const useStyles = makeStyles((theme) => ({
    error: {
        color: 'red',
        fontSize: 11
    }
}));

export default CommentForm;