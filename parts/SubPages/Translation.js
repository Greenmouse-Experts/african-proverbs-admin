import { useRouter } from "next/router";
import React, { useEffect, useState } from 'react'
import Card from '../../components/UIElements/Card'
import { useForm, Controller } from "react-hook-form";
import { makeStyles } from '@material-ui/core/styles';
import { useDispatch } from 'react-redux'
import { addProverbTranslation, 
    deleteProverbTranslation, 
    updateProverbTranslation } from "../../store/actions/proverbActions";
import { convTime } from "../../utils/utilities";
import { checkTransliterationUniqueness, 
    checkPermission } from '../../utils/utilities'
import TransliterationForm from '../forms/TransliterationForm'



const Translation = ({ proverb, languages, user }) => {

    const classes = useStyles()
    const [open, setOpen] = useState(false);
    const [openEdit, setOpenEdit] = useState(false);
    const [data, setData] = useState(null)
    const [msg, setMsg] = useState(null)
    const [editMsg, setEditMsg] = useState(null)

    const openModalEdit = (selectedTransliteration) => {
        setData(selectedTransliteration)
        setOpenEdit(true);
    };

    const openModal = () => {
        setOpen(true);
    };

    const closeModal = () => {
        setOpen(false);
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

    const onSubmit = (data) => {
        const { transliteration, languageID } = data
        const checkSum = checkTransliterationUniqueness(proverb.transliteration, languageID)
        if (checkSum) {
            setMsg('Transliteration for the language selected already exist')
            setTimeout(() => {
                setMsg(null)
            }, 5000)
            return
        }
        // const selectedLanguage = languages.find(lang => lang.id === language)
        const payload = {
            content: transliteration,
            proverb: proverb.id,
            language: languageID,
        }
        dispatch(addProverbTranslation(payload))
        reset()
        $("#add-translation").modal("hide");
    }

    const onEditFormSubmit = (values) => {
        const { updateTransliteration, updateLanguageID } = values
        const checkSum = checkTransliterationUniqueness(proverb.transliteration, updateLanguageID, data.id)
        if (checkSum) {
            setEditMsg('Transliteration for the language selected already exist')
            setTimeout(() => {
                setEditMsg(null)
            }, 5000)
            return
        }
        const payload = {
            content: updateTransliteration,
            proverb: proverb.id,
            language: updateLanguageID,
        }
        dispatch(updateProverbTranslation(payload, data.id))
        reset2()
        setData(null)
        setOpen(false);
    }

    const handleDelete = (id) => {
        dispatch(deleteProverbTranslation(id))
    }

    const searchData = (data, searchedValue) => {
        return data.find(dat => dat.id === parseInt(searchedValue))
    }

    return (
        <>
            <div class="row">
                <div class="col-lg-12">
                    {
                        user && (checkPermission(user.roles, 'Author')) | (checkPermission(user.roles, 'Admin')) | (checkPermission(user.roles, 'SuperAdmin')) ?
                            <div class='col-lg-3 mt-2 mb-2'>
                                <div class="widget">
                                    <div class="widget-body">
                                        <a href="#" data-toggle="modal" onClick={()=> openModal()} data-target="#add-translation" class="btn btn-lg btn-success font-16 btn-block waves-effect waves-light">
                                            <i class="fa fa-plus mr-1"></i> Create New
                                    </a>
                                    <TransliterationForm proverb={proverb} closeModal={closeModal} openModal={openModal} open={open} languages={languages} requestType="Create"/>
                                    </div>
                                    
                                </div>
                            </div>
                            : null
                    }

                    <div class="row">
                        {
                            proverb && proverb.transliteration.length > 0 ?
                                proverb.transliteration.map(translt => (
                                    <div key={translt.id} class="col-md-4">
                                        <Card title={`${translt.language.name} Transliteration`}
                                            body={translt.content}
                                            time={`Created: ${convTime(translt.date_created)}`}
                                        >
                                            {
                                                user && (checkPermission(user.roles, 'Author')) | (checkPermission(user.roles, 'Publisher')) | (checkPermission(user.roles, 'Reviewer')) | (checkPermission(user.roles, 'Admin')) | (checkPermission(user.roles, 'SuperAdmin')) ?
                                                    <>
                                                        <li class="list-inline-item">
                                                            <a onClick={() => openModalEdit(translt)} class="icon circle-icon text-info"><i class="mdi mdi-circle-edit-outline"></i></a>
                                                        </li>

                                                        <li class="list-inline-item">
                                                            <a onClick={() => handleDelete(translt.id)} href='#' class="icon circle-icon text-danger"><i class="mdi mdi-delete"></i></a>
                                                        </li>
                                                    </>
                                                    :null
                                            }

                                        </Card>
                                    </div>
                                ))
                                :
                                <div class="col-md-6 offset-md-4">
                                    <p>No Proverb Transliteration added yet</p>
                                </div>
                        }
                    </div>
                </div>
            </div>
            <TransliterationForm closeModal={closeModalEdit} openModal={openModalEdit} open={openEdit} transliterationData={data} languages={languages} requestType="Edit" proverb={proverb}/>

        </>

    )
}

const useStyles = makeStyles((theme) => ({
    error: {
        color: 'red',
        fontSize: 11
    }
}));

export default Translation;