import React, { useEffect, useState } from "react";
import Modal from "@material-ui/core/Modal";
import { Select } from "@/components/UIElements/InputField"
import {
    makeStyles,
    Box,
    Typography,
} from "@material-ui/core";
import {
    fetchAllQuestionPropery,
    GenerateQuestions
} from "@/store/actions/questionPropertyAction";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
;

const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 500,
    bgcolor: "background.paper",
    boxShadow: 24,
    p: 4,
};

const GenerateQuiz = ({
    selectedUser,
    close,
    showQuiz,
    cancel,
}) => {
    const dispatch = useDispatch();
    const { register, handleSubmit, errors } = useForm();
    const [page] = useState(1);
    const classes = useStyles();
    const { contentData, } = useSelector((state) => state.questionProperty);
    const [selectedValue, setSelectedValue] = useState("");

    useEffect(() => {
        const query = { page };
        dispatch(fetchAllQuestionPropery(query));
    }, [page]);

    const handleSelectChange = (event) => {
        setSelectedValue(event.target.value);
    };

    const onSubmit = async (data) => {
        const formData = {
            questionPropertId: data.questionPropertId,
        }
        dispatch(GenerateQuestions(formData, selectedUser.userId));
        
    };


    return (
        <Modal
            open={showQuiz}
            onClose={close}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box sx={style}>
                <Box display="flex" mb={1}>
                    <Typography variant="h5" component="h5">
                        Generate Quiz for {selectedUser?.name}
                    </Typography>
                </Box>
                <Box display="flex">
                    <form onSubmit={handleSubmit(onSubmit)}>

                        <div class="">

                            <label htmlFor="questionPropertId"> Quiz Property </label>
                            <Select
                                name="questionPropertId"
                                value={selectedValue}
                                onChange={handleSelectChange}
                                ref={register({ required: true })}
                            >
                                <option>Choose Quiz Property</option>
                                {contentData &&
                                    contentData.map((data) => (
                                        <option key={data.id} value={data.id}>
                                            {data.name}
                                        </option>
                                    ))}

                            </Select>
                            {errors.questionPropertId && (
                                <span className={classes.error}>This Field is Required</span>
                            )}
                        </div>


                        <div class="mt-2">
                            <button
                                type="submit"
                                disabled={!selectedValue}
                                class="btn btn-success waves-effect waves-light mr-2"
                            >
                                <span>{"Generate"}</span>
                                <i class="fa fa-globe-africa ml-1"></i>
                            </button>

                            <button
                                onClick={() => cancel(false)}
                                class="btn btn-outline-danger waves-effect waves-light"
                            >
                                <span>Close</span>
                                <i class="fa fa-times ml-1"></i>
                            </button>
                        </div>
                    </form>
                </Box>
            </Box>
        </Modal>
    );
};

const useStyles = makeStyles((theme) => ({
    root: {
        marginBottom: theme.spacing(8),
        "& .MuiCard-root": {
            marginBottom: theme.spacing(2),
        },
        "& .MuiDivider-root": {
            margin: theme.spacing(1, 0),
        },
        "& .mdi": {
            fontSize: "15px",
        },
        [theme.breakpoints.down("md")]: {
            width: 300,
        },
    },
}));

export default GenerateQuiz;
