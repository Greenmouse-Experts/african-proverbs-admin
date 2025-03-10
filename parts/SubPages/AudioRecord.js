import React, { useState, useEffect } from 'react';
// import Card from '../../components/UIElements/InputField';
import { useDispatch, useSelector } from 'react-redux'
import { checkPermission } from '@/utils/utilities';
import { Select } from '../../components/UIElements/InputField'
import FormDialog from '@/components/widgets/Modal';
import ProverbModal from '@/components/widgets/ProverbModal';
import DialogContent from '@material-ui/core/DialogContent';
import { makeStyles } from '@material-ui/core/styles';
import AudioReactRecorder, { RecordState } from 'audio-react-recorder';
import 'audio-react-recorder/dist/index.css';
import { addProverbAudioRecord, DeleteProverbAudioRecord } from "../../store/actions/proverbActions"
import { useForm, Controller } from "react-hook-form";
import { getAccessToken } from '../../utils/utilities';
import axios from 'axios';



const AudioRecord = ({ user, proverb }) => {
    const dispatch = useDispatch()
    const [counter, setCounter] = useState(0);
    const [pausedCounter, setPausedCounter] = useState(0);
    const [buttonText, setButtonText] = useState('Save Audio');
    const [counterActive, setCounterActive] = useState(false);
    const [open, setOpen] = useState(false);
    const [msg, setMsg] = useState(null)
    const [editMsg, setEditMsg] = useState(null);
    const [recordState, setRecordState] = useState(null);
    const [audioData, setAudioData] = useState(null);

    const { selectedProverb } = useSelector(state => state.proverb)


    // console.log("HIII",selectedProverb)

    useEffect(() => {
        let interval;
        if (counterActive) {
            interval = setInterval(() => {
                setCounter((prevCounter) => prevCounter + 1);
            }, 1000);
        } else {
            clearInterval(interval);
        }
        return () => {
            clearInterval(interval);
        };
    }, [counterActive]);

    const formatTime = (timeInSeconds) => {
        const hours = Math.floor(timeInSeconds / 3600);
        const minutes = Math.floor((timeInSeconds % 3600) / 60);
        const seconds = timeInSeconds % 60;

        const displayHours = hours > 0 ? `${hours} hr ` : '';
        const displayMinutes = minutes > 0 ? `${minutes} min ` : '';
        const displaySeconds = `${seconds} sec`;

        return displayHours + displayMinutes + displaySeconds;
    };

    const roundBasedOnDecimal = (number) => {
        const decimalPart = number % 1;
        return decimalPart >= 0.5 ? Math.ceil(number) : Math.floor(number);
    }



    const openModal = () => {
        setAudioData(null);
        setOpen(true);
    };

    const closeModal = () => {
        setOpen(false);
        setCounter(0);
    };
    const start = () => {
        try {
            if (recordState === RecordState.PAUSE) {
                // If resuming from pause, use the pausedCounter as the starting point
                setCounter(pausedCounter);
            } else {
                // If starting from scratch, reset the counter
                setCounter(0);
            }

            setRecordState(RecordState.START);
            setCounterActive(true);
        } catch (error) {
            console.error('Error starting recording:', error);
            // Handle the error, for example, show an error message to the user
        }
    };

    const pause = () => {
        try {
            setRecordState(RecordState?.PAUSE);
            setCounterActive(false);
            setPausedCounter(counter);
        } catch (error) {
            console.error('Error pausing recording:', error);
            // Handle the error
        }
    };

    const stop = () => {
        try {
            if (recordState === RecordState?.START) {
                setRecordState(RecordState?.STOP);
                setCounterActive(false);

            } else {
                console.warn('No active recording to stop.');
            }
        } catch (error) {
            console.error('Error stopping recording:', error);
            // Handle the error
        }
    };


    const onStop = (data) => {
        try {
            setAudioData(data);
            const url = data.url;
            const audio = new Audio(url);

            // Ensure the audio is loaded before calculating its duration
            audio.onloadedmetadata = () => {
                const duration = audio.duration;
                setCounter(duration);
                setCounterActive(false);
            };
        } catch (error) {
            console.error('Error handling recording data:', error);
            // Handle the error
        }
    };





    const { handleSubmit, control, errors, register } = useForm({
        mode: 'onBlur',
    });


    const onSubmit = async (data, e) => {
        e.preventDefault();
        setButtonText('Saving...');
        var formData = new FormData();
        formData.append('voice_type', data.voice_type);
        if (audioData) {
            // Convert the audioData blob to a file
            const audioFile = new File([audioData.blob], 'audio.mp3', {
                type: 'audio/mp3',
                lastModified: Date.now(),
            });
            formData.append('file', audioFile);
        }

        try {
            // Dispatch the action and wait for it to complete
            await dispatch(addProverbAudioRecord(formData, proverb?.id));
            // If successful, close the modal
            closeModal();
        } catch (error) {
            console.error('Error submitting audio record:', error);
            // Handle errors, show an error message, etc.
        } finally{
            setButtonText('Save Audio');
        }
    };











    const handleDeleteAudio = (id) => {

        dispatch(DeleteProverbAudioRecord(id));
    };
    const handleDownloadAudio = async (id) => {
        const token = getAccessToken();

        try {
            // Make an Axios GET request to the download endpoint with headers
            const response = await axios.get(`${process.env.baseUrl}api/proverbs/download-audio/${id}`, {
                responseType: 'arraybuffer', // Set the response type to arraybuffer for binary data
                headers: {
                    Authorization: `Bearer ${token}`, // Add Authorization header with the token
                },
            });

            // Convert the array buffer to a Blob
            const audioBlob = new Blob([response.data], { type: 'audio/wav' });

            // Create a temporary link element
            const link = document.createElement('a');
            link.href = window.URL.createObjectURL(audioBlob);
            link.download = `${id}.mp3`;

            // Append the link to the document
            document.body.appendChild(link);

            // Trigger a click event on the link to start the download
            link.click();

            // Remove the link from the document
            document.body.removeChild(link);

        } catch (error) {
            // Handle any errors that occur during the request
            console.error('Error while downloading audio:', error);
        }
    };



    const classes = useStyles();

    return (
        <>
            <div class="row" key={proverb.id}>
                {selectedProverb?.recordedAudio !== null && selectedProverb?.recordedAudio !== "" ? (
                    // Render existing audio files
                    <div class="col-lg-12 mt-2 mb-2">
                        <div class="widget">
                            <div className="widget-body">
                                <a
                                    href="#"
                                    onClick={() => handleDownloadAudio(proverb.id)}
                                    className="btn btn-primary mr-2"
                                >
                                    <i className="fa fa-download"></i> Download Audio
                                </a>

                                <a
                                    href="#"
                                    onClick={() => handleDeleteAudio(proverb.id)}
                                    className="btn btn-danger"
                                >
                                    <i className="fa fa-trash"></i> Delete
                                </a>
                            </div>

                        </div>
                    </div>
                ) : (
                    // Render the recording button if recordedAudio is null
                    <div class="col-lg-12">
                        {user && (checkPermission(user?.roles, 'Author') || checkPermission(user?.roles, 'Admin') || checkPermission(user?.roles, 'SuperAdmin')) ? (
                            <div class="col-lg-4 mt-2 mb-2">
                                <div class="widget">
                                    <div class="widget-body">
                                        {selectedProverb?.status === 'PUBLISHED' ? (
                                            <a href="#" data-toggle="modal" onClick={() => openModal()} data-target="#add-audio" class="btn btn-lg btn-purple font-16 btn-block waves-effect waves-light">
                                                <i class="fa fa-microphone mr-1"></i> Start New Recording
                                            </a>
                                        ) : (
                                            <button class="btn btn-lg btn-purple font-16 btn-block waves-effect waves-light" disabled>
                                                <i class="fa fa-microphone mr-1"></i> Start New Recording (Disabled)
                                            </button>
                                        )}
                                    </div>
                                </div>
                            </div>
                        ) : null}
                    </div>

                )}
            </div>





            {/* Modal for recording interface */}

            <FormDialog clickClose={closeModal} clickOpen={openModal} open={open} action="Add Audio">
                <DialogContent>
                    <ProverbModal closeModal={closeModal} name={"Proverb Audio Recording"}>


                        <form onSubmit={handleSubmit(onSubmit)} encType="multipart/form-data">

                            {msg ?
                                <h5 className='text-danger' > {editMsg}</h5>
                                : null
                            }

                            <div class="row">
                                <div class="col-md-12">
                                    <label class="control-label"> Voice Type </label>
                                    <Controller
                                        name="voice_type"
                                        control={control}
                                        defaultValue=""
                                        rules={{ required: 'Voice type is required' }}
                                        render={({ onChange, onBlur, value }) => (
                                            <>
                                                <Select
                                                    value={value || ''}
                                                    onChange={(e) => onChange(e.target.value)}
                                                >
                                                    <option value="">Choose</option>
                                                    <option value="Male">Male</option>
                                                    <option value="Female">Female</option>
                                                </Select>
                                                {errors && errors.voice_type && (
                                                    <span className="text-danger">{errors.voice_type.message}</span>
                                                )}
                                            </>
                                        )}
                                    />


                                    <br />
                                </div>
                                <div className=" col-md-12">
                                    <AudioReactRecorder
                                        className="w-32"
                                        state={recordState}
                                        onStop={(data) => {

                                            onStop(data);
                                        }}
                                        type="audio/wav"
                                        canvasWidth={500}
                                        canvasHeight={100}
                                        foregroundColor="rgb(0,0,0)"
                                        backgroundColor="rgb(255, 255, 255)"
                                    />

                                    <div className="d-flex justify-content-between align-items-center mb-2">
                                        <audio
                                            id="audio"
                                            controls
                                            controlsList="nodownload"
                                            src={audioData ? audioData.url : null}
                                            className="ml-2"
                                        >


                                        </audio>

                                        {/* Add a file input field */}
                                        <input
                                            type="file"
                                            name="file"
                                            accept="audio/wav"
                                            style={{ display: 'none' }}
                                            ref={register}
                                        />

                                        <div className="d-flex ml-2 justify-content-center align-items-center">
                                            <i
                                                className="fa fa-microphone mr-3 cursor-pointer fa-2x"
                                                id="record"
                                                onClick={() => {
                                                    start();

                                                }}
                                                style={{ cursor: 'pointer' }}
                                                data-toggle="tooltip"
                                                data-placement="top"
                                                title="Start Recording"
                                            ></i>
                                            <i
                                                className="fa fa-pause mr-3 cursor-pointer fa-2x"
                                                id="pause"
                                                onClick={() => {
                                                    pause();

                                                }}
                                                style={{ cursor: 'pointer' }}
                                                data-toggle="tooltip"
                                                data-placement="top"
                                                title="Pause Recording"
                                            ></i>
                                            <i
                                                className="fa fa-stop cursor-pointer fa-2x"
                                                id="stop"
                                                onClick={() => {
                                                    stop();

                                                }}
                                                style={{ color: 'red', cursor: 'pointer' }}
                                                data-toggle="tooltip"
                                                data-placement="top"
                                                title="Stop Recording"
                                            ></i>
                                        </div>


                                    </div>
                                    <div className="mb-2">
                                        Recording Time: {formatTime(roundBasedOnDecimal(counter))}
                                    </div>

                                </div>
                                <div class=" col-md-12">
                                    <button type='submit' class="btn btn-success waves-effect waves-light">
                                        <span>{buttonText}</span>
                                    </button>
                                </div>
                            </div>
                        </form>
                    </ProverbModal>
                </DialogContent>

            </FormDialog>

        </>
    );
};

const useStyles = makeStyles((theme) => ({
    error: {
        color: 'red',
        fontSize: 11,
    },
}));

export default AudioRecord;
