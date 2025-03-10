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
import { checkInterpretationUniqueness, 
    checkPermission } from '../../utils/utilities'

const InterpretationForm = ({ closeModal, openModal, open, interpretationData, languages, requestType, proverb}) => {
    const classes = useStyles()
    const [msg, setMsg] = useState(null)
    const [editMsg, setEditMsg] = useState(null)


    const dispatch = useDispatch()

    const { handleSubmit, control, reset, register, errors } = useForm({
        mode: "onBlur"
    });
    const { handleSubmit: handleSubmit2, control: control2, reset: reset2, register: register2, errors: errors2 } = useForm({
        mode: "onBlur"
    });



    const onSubmit = (data) => {
        console.log(data)
        const { interpretation, languageID } = data
        const checkSum = checkInterpretationUniqueness(proverb.interpretation, languageID)
        if (checkSum) {
            setMsg('Interpretation for the language selected already exist')
            setTimeout(() => {
                setMsg(null)
            }, 5000)
            return
        }

        // const selectedLanguage = languages.find(lang => lang.id === parseInt(language))
        const payload = {
            content: interpretation,
            proverb: proverb.id,
            language: languageID,
        }
        dispatch(addProverbInterpretation(payload))
        reset()
        closeModal();
    }

    const onEditFormSubmit = (values) => {
        const { interpretation, languageID } = values
        const checkSum = checkInterpretationUniqueness(proverb.interpretation, languageID, interpretationData.id)
        if (checkSum) {
            setEditMsg('Interpretation for the language selected already exist')
            setTimeout(() => {
                setEditMsg(null)
            }, 5000)
            return
        }
        const payload = {
            content: interpretation,
            proverb: proverb.id,
            language: languageID,
        }
        dispatch(updateProverbInterpretation(payload, interpretationData.id))
        reset()
        // setData(null)
        closeModal();
    }
    return (
        <>
            <FormDialog clickClose={closeModal} clickOpen={openModal} open={open} action={`${requestType} Category` }>
                <DialogContent>
                    <ProverbModal closeModal={closeModal} name={`${requestType} Proverb Interpretation`}>
                        <form onSubmit={handleSubmit2(interpretationData ? onEditFormSubmit : onSubmit)} noValidate autoComplete="off" role="form">
                            {msg ?
                                <h5 className='text-danger' > {editMsg}</h5>
                                : null
                            }
                            <div class="row">
                                <div class="col-md-12 mb-1">
                                    <label class="control-label">Interpretation</label>
                                    <TextArea name='interpretation' defaultValue={interpretationData ? interpretationData.content : ''} ref={register2({ required: true })} />
                                    {errors2.interpretation && <span className={classes.error}>This Field is Required</span>}
                                </div>
                                <div class="col-md-12">
                                    <label class="control-label">Select A Language </label>
                                    <Select name='languageID' ref={register2({ required: true })}>
                                        <option value=''>Choose</option>
                                        {
                                            languages && (
                                                languages.map(lang => (
                                                    interpretationData && interpretationData.language.id == lang.id ?
                                                        <option value={lang.id} selected>{lang.name}</option>
                                                        :
                                                        <option value={lang.id} >{lang.name}</option>
                                                ))
                                            )
                                        }
                                    </Select>
                                    {errors2.UpdatedLanguage && <span className={classes.error}>This Field is Required</span>}
                                    <br />
                                </div>
                                <div class=" col-md-12">
                                    <button type='submit' class="btn btn-success waves-effect waves-light"> <span>{requestType} Interpretation</span> </button>
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

export default InterpretationForm;