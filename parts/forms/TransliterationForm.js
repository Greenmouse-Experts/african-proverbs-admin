import { useRouter } from "next/router";
import React, { useEffect, useState } from 'react'
import Card from '../../components/UIElements/Card'
import Link from 'next/link'
import { Select, MultiSelectComponent, TextArea } from '../../components/UIElements/InputField'
import { useForm, Controller } from "react-hook-form";
import { makeStyles } from '@material-ui/core/styles';
import { fetchEthnic } from '../../store/actions/ethnicAction'
import { useSelector, useDispatch } from 'react-redux'
import { addProverbTranslation, 
    deleteProverbTranslation, 
    updateProverbTranslation } from "../../store/actions/proverbActions";
import { convTime } from "../../utils/utilities";
import FormDialog from '../../components/widgets/Modal';
import ProverbModal from "../../components/widgets/ProverbModal";
import DialogContent from '@material-ui/core/DialogContent';
import { checkTransliterationUniqueness, 
    checkPermission } from '../../utils/utilities'




const TransliterationForm = ({ closeModal, openModal, open, transliterationData, languages, requestType, proverb}) => {

    const classes = useStyles()
    // const [open, setOpen] = useState(false);
    
    const [msg, setMsg] = useState(null)

    const dispatch = useDispatch()
    const { handleSubmit, control, reset, register, errors } = useForm({
        mode: "onBlur"
    });
    // const { handleSubmit: handleSubmit, control: control2, reset: reset2, register: register2, errors: errors2 } = useForm({
    //     mode: "onBlur"
    // });

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
        // $("#add-translation").modal("hide");
        closeModal();
    }

    const onEditFormSubmit = (values) => {
        console.log("editing form");
        const { transliteration, languageID } = values
        const checkSum = checkTransliterationUniqueness(proverb.transliteration, languageID, transliterationData.id)
        if (checkSum) {
            setEditMsg('Transliteration for the language selected already exist')
            setTimeout(() => {
                setEditMsg(null)
            }, 5000)
            return
        }
        const payload = {
            content: transliteration,
            proverb: proverb.id,
            language: languageID,
        }
        dispatch(updateProverbTranslation(payload, transliterationData.id))
        reset()
        // setData(null)
        // setOpen(false);
        closeModal();
    }


    return (
        <>
            <FormDialog clickClose={closeModal} clickOpen={openModal} open={open} action="Add Category" >
                <DialogContent>
                    <ProverbModal closeModal={closeModal} name={`${requestType} Proverb Transliteration`}>
                        <form onSubmit={handleSubmit(transliterationData ? onEditFormSubmit : onSubmit)} noValidate autoComplete="off" role="form">
                            {msg ?
                                <h5 className='text-danger' > {msg}</h5>
                                : null
                            }
                            <div class="row">
                                <div class="col-md-12 mb-1">
                                    <label class="control-label">Transliteration</label>
                                    <TextArea name='transliteration' defaultValue={transliterationData ? transliterationData.content : ''} ref={register({ required: true })} />
                                    {errors.transliteration && <span className={classes.error}>This Field is Required</span>}
                                </div>
                                <div class="col-md-12">
                                    <label class="control-label">Select A Language </label>
                                    <Select name='languageID' ref={register({ required: true })}>
                                        <option value=''>Choose</option>
                                        {
                                            languages && (
                                                languages.map(lang => (
                                                    transliterationData && transliterationData.language.id == lang.id ?
                                                        <option value={lang.id} selected>{lang.name}</option>
                                                        :
                                                        <option value={lang.id} >{lang.name}</option>
                                                ))
                                            )
                                        }
                                    </Select>
                                    {errors.languageID && <span className={classes.error}>This Field is Required</span>}
                                    <br />
                                </div>
                                <div class=" col-md-12">
                                    <button type='submit' class="btn btn-success waves-effect waves-light"> <span>Update Transliteration</span> </button>
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

export default TransliterationForm;