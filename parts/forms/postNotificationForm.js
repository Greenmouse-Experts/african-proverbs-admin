import Alert from '@/components/UIElements/Alert';
import { sendPostNotification } from '@/services/subscribersService';
import { Checkbox } from '@material-ui/core';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import { useSelector } from 'react-redux';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.min.css";
import useNotification from '../hooks/useNotifications'
import CircularProgress from '@material-ui/core/CircularProgress';
import { useState } from 'react';








const PostNotificationForm = () => {

    const {disabled,disableCheckbox,buttonDisabled,handleSubmit,register,checked,handleChange} = useNotification()
    const [isLoading,setIsLoading ]= useState(false)


    const { msg } = useSelector(state => state.auth); 
 

const onSubmit = (data) => {
    const { title,answer,email } = data;
     setIsLoading(true)
        const payload = {
            "email": checked ? []:[`${email}`],
            "title":title,
            "body": answer,
            "device_type": "WEB"
        }
        sendPostNotification(payload)
        .then(()=>{
            toast.success("Message sent successfully")}
        ).catch(err=>toast.error("Unable to send post notification to this user") )
        .finally(()=>{
            setIsLoading(false)
        })
    }


    return (
        <div className="card container mb-5">
          <ToastContainer position='top-center'/>
          {msg ? <Alert payload={msg} /> : null}
            <div className="card-body">
                <h1 className="header-title display-1">Send Post Notifcations</h1>
                <p className="sub-header">Kindly Fill All Fields Correctly</p>
                <form onSubmit={handleSubmit(onSubmit)} noValidate autoComplete="off">
                    <div className="form-row">
                    <div className="form-group col-md-12">
                            <label for="inputState" className="col-form-label text-xxl">Receiver's Email</label>
                            <input type="text" name="email" parsley-trigger="change"  disabled={disabled}
                                placeholder="Enter recepient's email adress"  className="form-control" id="email"
                                ref={register()} />
                        </div>

                        <div className="form-group col-md-12">
                        <FormControlLabel
      control={
        <Checkbox
          checked={checked}
          onChange={handleChange}
          name="myCheckbox"
          disabled={disableCheckbox}
          color="primary" // You can change the color to 'secondary' or 'default'
        />
      }
      label="Send to All Users"
    />


                                </div>

                        <div className="form-group col-md-12">
                            <label for="inputState" className="col-form-label text-xxl">Subject/Title</label>
                            <input type="text" name="title" parsley-trigger="change" required
                                placeholder="Enter title of message"  className="form-control" id="title"
                                ref={register({ required: true })} />
                     
                        </div>

                        <div className="form-group col-md-12 mb-4">
                            <label for="inputState" className="col-form-label text-lg">Message</label>
                            <textarea  name="answer" style={{height:"150px"}} parsley-trigger="change" required
                                placeholder="Enter message" defaultValue="" className="form-control" id="answer"
                                ref={register({ required: true })} />
                        </div>


                        {/* <div className="form-group col-md-12 mb-2"> */}
                            {/* <h1 className="header-title display-1 col-form-label">Select User to send Notification To</h1> */}
                            {/* <SubScribedUSerList handleSelectUserid={handleSelectUserid}/> */}
                        {/* </div>  */}
                        <div className="form-group col-md-12 mt-4">
                            <button disabled={buttonDisabled} type='submit' className="btn col-md-12 btn-purple waves-effect waves-light mr-3">{isLoading ? (
                            <CircularProgress size={16} color="white" />):null}  <span>Send Push Notification</span> </button>
                        </div>
                        <br />
                    </div>
                </form>
                {msg ? <Alert key={new Date()} payload={msg} /> : null}
            </div>
        </div>
    )
}


export default PostNotificationForm;