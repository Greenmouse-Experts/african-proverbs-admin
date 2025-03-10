import { useRouter } from "next/router";
import React, { useEffect, useState } from 'react'
import Card from '../../components/UIElements/Card'
import Link from 'next/link'
import { Select, TextArea } from '../../components/UIElements/InputField'
import { useForm, Controller } from "react-hook-form";
import { makeStyles } from '@material-ui/core/styles';
import { useSelector, useDispatch } from 'react-redux'
import { deleteProverbInterpretation, addProverbInterpretation, updateProverbInterpretation } from "../../store/actions/proverbActions";
import { convTime } from "../../utils/utilities";
import FormDialog from '../../components/widgets/Modal';
import ProverbModal from "../../components/widgets/ProverbModal";
import DialogContent from '@material-ui/core/DialogContent';
import {
    checkInterpretationUniqueness,
    checkPermission
} from '../../utils/utilities';
import InterpretationForm from '../forms/InterpretationForm'

const Interpretation = ({ proverb, languages, user }) => {
    const classes = useStyles()
    const [open, setOpen] = useState(false);
    const [openEdit, setOpenEdit] = useState(false);
    const [data, setData] = useState(null)

    const openModalEdit = (selectedInterpretation) => {
        setData(selectedInterpretation)
        setOpenEdit(true);
    };

    const closeModalEdit = () => {
        setData(null)
        setOpenEdit(false);
    };

    const openModal = () => {
        setOpen(true);
    };

    const closeModal = () => {
        setOpen(false);
    };

    const dispatch = useDispatch()


    const handleDelete = (id) => {
        dispatch(deleteProverbInterpretation(id))
    }

    return (
        <>
            <div class="row">
                <div class="col-lg-12">
                    {
                        // user && user.role == 'Author' | user.role == 'Admin' | user.role == 'SuperAdmin' ?
                        user && (checkPermission(user.roles, 'Author')) | (checkPermission(user.roles, 'Admin')) | (checkPermission(user.roles, 'SuperAdmin')) ?
                            <div class="col-lg-3 mt-2 mb-2">
                                <div class="widget">
                                    <div class="widget-body">
                                        <a href="#" data-toggle="modal" onClick={() => openModal()} data-target="#add-interpretation" class="btn btn-lg btn-purple font-16 btn-block waves-effect waves-light">
                                            <i class="fa fa-plus mr-1"></i> Create New
                                        </a>
                                        <InterpretationForm proverb={proverb} closeModal={closeModal} openModal={openModal} open={open} languages={languages} requestType="Create" />
                                    </div>
                                </div>
                            </div>
                            : null
                    }

                    <div class="row">
                        {
                            proverb && proverb.interpretation.length > 0 ?
                                proverb.interpretation.map(interprt => (
                                    <div key={interprt.id} class="col-md-4">
                                        <Card title={`${interprt.language.name} Interpretation`}
                                            body={interprt.content}
                                            time={`Created: ${convTime(interprt.date_created)}`}
                                        >
                                            {
                                                user && (checkPermission(user.roles, 'Author')) | (checkPermission(user.roles, 'Publisher')) | (checkPermission(user.roles, 'Reviewer')) | (checkPermission(user.roles, 'Admin')) | (checkPermission(user.roles, 'SuperAdmin')) ?
                                                    <>
                                                        <li class="list-inline-item">
                                                            <a onClick={() => openModalEdit(interprt)} class="icon circle-icon text-info"><i class="mdi mdi-circle-edit-outline"></i></a>
                                                        </li>

                                                        <li class="list-inline-item">
                                                            <li class="list-inline-item">
                                                                <a onClick={() => handleDelete(interprt.id)} href='#' class="icon circle-icon text-danger"><i class="mdi mdi-delete"></i></a>
                                                            </li>
                                                        </li>
                                                    </>
                                                    : null
                                            }
                                        </Card>
                                    </div>
                                ))
                                :
                                <div class="col-md-6 offset-md-4">
                                    <p>No Proverb Interpretation added yet</p>
                                </div>
                        }
                    </div>
                </div>
            </div>

            <InterpretationForm closeModal={closeModalEdit} openModal={openModalEdit} open={openEdit} interpretationData={data} languages={languages} proverb={proverb} requestType="Edit" />

        </>

    )
}

const useStyles = makeStyles((theme) => ({
    error: {
        color: 'red',
        fontSize: 11
    }
}));

export default Interpretation;