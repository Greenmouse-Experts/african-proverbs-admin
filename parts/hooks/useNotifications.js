import { useEffect, useState } from 'react';
import { useForm } from "react-hook-form";
import "react-toastify/dist/ReactToastify.min.css";

const useNotification = ()=>{
    const { handleSubmit, register,watch } = useForm(); 
    const [checked, setChecked] = useState(false);
    const [disabled, setDisabled] = useState(false)
    const [disableCheckbox,setDisableCheckbox] = useState(false)
    const [buttonDisabled,setButtonDisabled] = useState(true)

    const email = watch('email') 
    const title = watch('title') 
    const answer = watch('answer') 


    useEffect(()=>{
        if(email){
            setDisableCheckbox(true)
        }else{
            setDisableCheckbox(false)
        }
        },[email])


        useEffect(()=>{
            if(checked){
                setDisabled(true)
            }else{
                setDisabled(false)
            }
        },[checked]) 
        
        useEffect(()=>{
            if(email && answer && title){
                setButtonDisabled(false)
            }else if(answer && title && checked){
                setButtonDisabled(false)
            }
            else{
                setButtonDisabled(true)
        
            }
        },[email,answer,title,checked]) 

            // hanlder for checkbox input
    const handleChange = (event) => {
        setChecked(event.target.checked);
    };

    return {
        disabled,disableCheckbox,buttonDisabled,handleSubmit,register,checked,handleChange
    }
}


export default useNotification