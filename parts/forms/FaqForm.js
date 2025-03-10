import { createFAQ, updateFAQ, updateFaqsFromBackend } from '@/store/actions/faqActions';
import { FormControl, Radio, RadioGroup } from '@material-ui/core';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import { makeStyles } from '@material-ui/core/styles';
import { uniqueId } from 'lodash';
import { useEffect, useState } from 'react';
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from 'react-redux';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.min.css";
import Alert from '@/components/UIElements/Alert'
import { useRouter } from 'next/router';







const FaqForm = ({ requestType,faqId=""}) => {
    const [radioValue,setRadioValue] = useState('ACTIVE')
    const [initialData,setInitialData] = useState(null)


    const classes = useStyles()
    const { handleSubmit, reset, register, errors } = useForm();  
    const { faqs } = useSelector(state => state.faqs)
    const dispatch = useDispatch()
    const { user, msg } = useSelector(state => state.auth);
    const router = useRouter();


    useEffect(()=>{
        if(requestType ==="Update" && faqId){
            const faqData = faqs.find((faq)=> faq.id === faqId)
            setInitialData(faqData)
        }
    },[requestType])

// ------hanlders-----

// hanlder for radio input
 const handleRadioChangeEvent = (event)=>{
        setRadioValue(event.target.value)
    }

//handler for creating  new faqs
    const onSubmit = (data) => {
        const { question, answer  } = data;
        if(question && question && radioValue){
            const payload = {
                question,
                answer,
                faqStatus:radioValue
            } 
            dispatch(createFAQ(payload))
            reset()
        }

    }

//hanlder for updating faq 
   const onSubmitUpdate =(data)=>{
    const { question, answer  } = data;
       if (answer && question){
        const payload ={
            faqStatus: radioValue,
            id:initialData.id,
            answer,
            question
        }
        dispatch(updateFaqsFromBackend(payload)).then(() => {
            // After the async action is done, navigate to the desired page.
            router.push('/faqs');
          })
       }
   }

    return (
        <div className="card container mb-5">
          <ToastContainer position='top-center'/>
          {msg ? <Alert payload={msg} /> : null}
            <div className="card-body">
                <h1 className="header-title display-1">{requestType} FAQ</h1>
                <p className="sub-header">Kindly Fill All Fields Correctly</p>
                <form onSubmit={handleSubmit(requestType==="Update" ? onSubmitUpdate : onSubmit)} noValidate autoComplete="off">
                    <div className="form-row">
                        <div className="form-group col-md-12">
                            <label for="inputState" className="col-form-label text-xxl">Question</label>
                            <input type="text" name="question" parsley-trigger="change" required
                                placeholder="Enter question" defaultValue={requestType==="Update"?initialData && initialData.question:""} className="form-control" id="question"
                                ref={register({ required: true })} />
                                {errors.question && <span className={classes.error}>This Field is Required</span>}
                        </div>

                        <div className="form-group col-md-12 mb-2">
                            <label for="inputState" className="col-form-label text-lg">Answer</label>
                            <textarea  name="answer" style={{height:"150px"}} parsley-trigger="change" required
                                placeholder="Enter answer" defaultValue={requestType==="Update"?initialData && initialData.answer:""} className="form-control" id="answer"
                                ref={register({ required: true })} />
                                {errors.question && <span className={classes.error}>This Field is Required</span>}
                            {errors.answer && <span className={classes.error}>{errors.answer.message}</span>}
                        </div>  
                   <div className="form-group col-md-4 ">
                            <FormControl component="fieldset">
                            <label for="inputState" className="col-form-label text-lg">status</label>
                                <RadioGroup
                                    row
                                    aria-label="faqStatus"
                                    name="faqStatus"
                                    defaultValue={requestType==="Update"? initialData &&initialData.faqStatus :radioValue}
                                    value={radioValue}
                                    onChange={handleRadioChangeEvent}
                                >
                                    <FormControlLabel
                                    value="ACTIVE"
                                    control={<Radio color="primary" />}
                                    label="ACTIVE"
                                    />
                                    <FormControlLabel
                                    value="INACTIVE"
                                    control={<Radio color="primary" />}
                                    label="INACTIVE"
                                    />
                                </RadioGroup>
                            </FormControl>
                        </div>
                        <div className="form-group col-md-12">
                            <button type='submit' className="btn col-md-12 btn-purple waves-effect waves-light mr-3">  <span>{requestType} FAQ</span> <i className="fa fa-globe-africa ml-1"></i> </button>
                        </div>
                        <br />
                    </div>
                </form>
                {msg ? <Alert key={new Date()} payload={msg} /> : null}
            </div>
        </div>
    )
}

const useStyles = makeStyles((theme) => ({
    error: {
        color: 'red',
        fontSize: 11
    },
    container: {
        flexGrow: 1,
        position: 'relative',

    },
    input: {
        width: "240px",
        height: "40px",
        width: '100%',
        padding: "10px 20px",
        fontFamily: "Helvetica, sans-serif",
        fontSize: "14px",
        border: "1px solid #ced4da",
        borderRadius: "0.2rem"
    },
    inputFocused: {
        outlineStyle: "none"
    },
    suggestionsList: {
        margin: 0,
        padding: 0,
        listStyleType: 'none',
        boxShadow: '0px 2px 2px 2px #E5E5E5'
    },
    suggestion: {
        display: 'block',
        margin: 5,
        cursor: 'pointer',
        padding: 7,
    },

}));

export default FaqForm;