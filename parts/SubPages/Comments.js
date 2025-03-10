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
import CommentForm from '../forms/CommentForm'


const ProverbReviews = ({ proverb, user }) => {
    const classes = useStyles()
    const [open, setOpen] = useState(false);
    const [openEdit, setOpenEdit] = useState(false);
    const [data, setData] = useState(null)
    const [msg, setMsg] = useState(null)
    const [editMsg, setEditMsg] = useState(null)

    const openModal = () => {
        setOpen(true);
    };

    const closeModal = () => {
        setData(null)
        setOpen(false);
    };

    const openModalEdit = (selectedComment) => {
        setData(selectedComment)
        setOpenEdit(true);
    };

    const closeModalEdit = () => {
        setData(null)
        setOpenEdit(false);
    };

    const dispatch = useDispatch()

    const { handleSubmit, control, reset, register, errors } = useForm({
        mode: "onBlur"
    });
    const { handleSubmit: handleSubmit2, control: control2, reset: reset2, register: register2, errors: errors2 } = useForm({
        mode: "onBlur"
    });

    const handleDelete = (id) => {
        dispatch(deleteProverbComment(id))
    }

    return (
        <>
            <div class="row">
                <div class="col-lg-12">
                    {
                        user && (checkPermission(user.roles, 'Reviewer')) | (checkPermission(user.roles, 'Author')) | (checkPermission(user.roles, 'Admin')) | (checkPermission(user.roles, 'SuperAdmin')) ?
                            <div class="col-lg-3 mt-2 mb-2">
                                <div class="widget">
                                    <div class="widget-body">
                                        <a href="#" data-toggle="modal" onClick={()=> openModal()} data-target="#add-comment" class="btn btn-lg btn-purple font-16 btn-block waves-effect waves-light">
                                            <i class="fa fa-plus mr-1"></i> Create New Comment
                                        </a>
                                        <CommentForm closeModal={closeModal} openModal={openModal} open={open} state="REVIEW" requestType="Create" proverb={proverb}/>
                                    </div>
                                </div>
                            </div>
                            : null
                    }

                    <div class="row">
                        {
                            proverb && proverb.proverbReview.length > 0 ?
                                proverb.proverbReview.map(review => review.state==="REVIEW" && (
                                    <div key={review.id} class="col-md-4">
                                        <Card
                                            body={review.comment}
                                            time={`Created: ${convTime(review.date_created)}`}
                                        >
                                            {
                                                user && (checkPermission(user.roles, 'Reviewer')) | (checkPermission(user.roles, 'Author')) | (checkPermission(user.roles, 'Admin')) | (checkPermission(user.roles, 'SuperAdmin')) ?
                                                    <>
                                                        <li class="list-inline-item">
                                                            <a onClick={() => openModal(review)} class="icon circle-icon text-info"><i class="mdi mdi-circle-edit-outline"></i></a>
                                                        </li>

                                                        <li class="list-inline-item">
                                                            <li class="list-inline-item">
                                                                <a onClick={() => handleDelete(review.id)} href='#' class="icon circle-icon text-danger"><i class="mdi mdi-delete"></i></a>
                                                            </li>
                                                        </li>
                                                    </>
                                                    :null
                                            }
                                        </Card>
                                    </div>
                                ))
                                :
                                <div class="col-md-6 offset-md-4">
                                    <p>No Proverb Comments added yet</p>
                                </div>

                        }

                    </div>
                </div>
            </div>
            <CommentForm closeModal={closeModalEdit} openModal={openModalEdit} open={openEdit} commentData={data} state="REVIEW" requestType="Edit" proverb={proverb}/>


            {/* <FormDialog clickClose={closeModal} clickOpen={openModal} open={open} action="Add Category" >
                <DialogContent>
                    <ProverbModal closeModal={closeModal} name='Edit Proverb Interpretation'>
                        <form onSubmit={handleSubmit2(onEditFormSubmit)} noValidate autoComplete="off" role="form">
                        {msg ?
                                    <h5 className='text-danger' > {msg}</h5>
                                    : null
                                }
                                <div class="row">
                                    <div class="col-md-12 mb-1">
                                        <label class="control-label">Comment</label>
                                        <TextArea name='updatecomment' defaultValue={data ? data.comment : ''} ref={register2({ required: true })} />
                                        {errors.updatecomment && <span className={classes.error}>This Field is Required</span>}
                                    </div>
                                    <div class=" col-md-12">
                                        <button type='submit' class="btn btn-success waves-effect waves-light"> <span>UpdateComment</span> </button>
                                    </div>
                                </div>
                        </form>
                    </ProverbModal>
                </DialogContent>
            </FormDialog> */}

            {/* <div class="modal fade none-border" id="add-comment">
                <div class="modal-dialog">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h4 class="modal-title mt-0"><strong>Create a New Comment </strong></h4>
                            <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
                        </div>

                        <div class="modal-body">
                            <form onSubmit={handleSubmit(onSubmit)} noValidate autoComplete="off" role="form">
                                {msg ?
                                    <h5 className='text-danger' > {msg}</h5>
                                    : null
                                }
                                <div class="row">
                                    <div class="col-md-12 mb-1">
                                        <label class="control-label">Comment</label>
                                        <TextArea name='comment' ref={register({ required: true })} placeholder="Add comment why the proverb is rejected" />
                                        {errors.comment && <span className={classes.error}>This Field is Required</span>}
                                    </div>
                                    <div class=" col-md-12">
                                        <button type='submit' class="btn btn-success waves-effect waves-light"> <span>Add Comment</span> </button>
                                    </div>
                                </div>

                            </form>
                        </div>
                    </div>
                </div>
            </div> */}
        </>

    )
}

const useStyles = makeStyles((theme) => ({
    error: {
        color: 'red',
        fontSize: 11
    }
}));

export default ProverbReviews;