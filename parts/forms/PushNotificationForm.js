import React, { useState, useEffect } from 'react';
import { Controller, useForm } from "react-hook-form";
import { createNotification } from "@/store/actions/notificationAction";
import { useDispatch, useSelector } from 'react-redux';
import { ToastContainer, toast } from "react-toastify";
import { makeStyles } from '@material-ui/core/styles';
import Alert from '@/components/UIElements/Alert';
import axios from 'axios';
import { FormControl } from '@material-ui/core';
import styles from "../../styles/Home.module.css";


import { getAccessToken, formatUserOptions } from '@/utils/utilities';
import { MultiSelectComponent } from '@/components/UIElements/InputField';


const PushNotificationForm = ({ requestType }) => {
    const classes = useStyles();
    const dispatch = useDispatch()
    const { handleSubmit, reset, control, register, errors } = useForm();
    const { user, msg } = useSelector(state => state.auth);
    const [selectedUserId, setSelectedUserId] = useState([]);
    const [subscribersData, setSubscribersData] = useState([]);
    const token = getAccessToken();


    const initialOption = [
        { label: "Choose a User", value: " ", disabled: true },

    ];




    useEffect(() => {
        const fetchSubcribersData = async () => {
            try {
                const response = await axios.get("https://dev-api.africanproverbs.com/api/packages/search", {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                setSubscribersData(response?.data?.content)

            } catch (error) {
                // Handle any errors here

                console.error('Error fetching data:', error);
            }
        };

        // Call the fetchData function to make the request
        fetchSubcribersData();
    }, []);

    const onSubmit = (data) => {
        // Ensure that the user_id field contains an array of user IDs
        const user_ids = selectedUserId.map(user => user.value);

        if (user_ids.length > 0 && data.title && data.body) {
            const payload = {
                user_id: user_ids,
                title: data.title,
                body: data.body,
                device_type: "WEB",
            };

            dispatch(createNotification(payload));
            reset();
        }
    }



    return (
        <div className="container mb-5">
            <ToastContainer position='top-center' />
            {msg ? <Alert payload={msg} /> : null}
            <div className="card">
                <div className="card-body">
                    <h1 className="header-title display-1">{requestType} Notification</h1>
                    <p className="sub-header">Kindly Fill All Fields Correctly</p>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div className="form-group">
                            <label htmlFor="title" className="col-form-label text-xxl">Subject/Title</label>
                            <input
                                type="text"
                                name="title"
                                placeholder="Enter subject/title"
                                className="form-control"
                                id="title"
                                ref={register({ required: true })}
                            />
                            {errors.title && <span className={classes.error}>This Field is Required</span>}
                        </div>
                        <div className="form-group">
                            <FormControl style={{ margin: 1, width: '100%', marginTop: 3 }}>
                                <label htmlFor="user_id" className="col-form-label text-xxl">Recipients (Users)</label>
                                <Controller
                                    control={control}
                                    name="user_id"
                                    defaultValue={[]}
                                    rules={{
                                        validate: value => value.length > 0 || "A proverb Must Belong to One or More Category",
                                        required: true
                                    }}
                                    render={({ onChange, onBlur, value }) => (
                                        <MultiSelectComponent
                                            options={subscribersData ? formatUserOptions(subscribersData) : initialOption}
                                            value={value || ''}
                                            onChange={(user, delta, source, editor) => {
                                                const selectedIds = user.map(u => u.value);


                                                setSelectedUserId(selectedIds);
                                                onChange(user);
                                            }}
                                            labelledBy={"Select"}
                                            name='user_id' // Correct the name here
                                            ref={register({ required: true })}
                                            className="border border-secondary rounded p-2 align-items-center"
                                        />
                                    )}
                                />
                            </FormControl>


                        </div>
                        <div className="form-group">
                            <label htmlFor="body" className="col-form-label text-xxl">Notificaion Message</label>
                            <textarea name="body" style={{ height: "150px" }} parsley-trigger="change" required
                                placeholder="Message" className="form-control" id="body"
                                ref={register({ required: true })} />
                        </div>
                        <div className="form-group col-md-12">
                            <button type='submit' className="btn col-md-12 btn-purple waves-effect waves-light mr-3">  <span>{requestType} Notification</span> <i className="fa fa-globe-africa ml-1"></i> </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};


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


export default PushNotificationForm;
