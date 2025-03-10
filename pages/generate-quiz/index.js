import React, { useEffect, useState, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import withAuth from "@/utils/withAuth";
import Table from "@/components/UIElements/DataTable";


import QuestionAnswerIcon from '@material-ui/icons/QuestionAnswer';
import { checkPermission } from "@/utils/utilities";
import { Alert } from "@/components/UIElements";
import Divider from "@material-ui/core/Divider";
import { useRouter } from "next/router";
import ReactTooltip from "react-tooltip";

import GenerateQuiz from "@/components/Subscriber/GenerateQuiz";
import { subscriptionStyles } from "@/parts/subscriptions/styles";
import { useForm } from "react-hook-form";
import { Select } from "@/components/UIElements/InputField";
import {
    fetchAllQuestionPropery,
    GenerateQuestionsAllUsers
} from "@/store/actions/questionPropertyAction";
import { fetchSubscribers } from "@/store/actions/subscriberAction"


const header = [
    { id: "s/n", title: "S/N" },
    {
        id: "name",
        title: "Name",
    },
    {
        id: "registered_email",
        title: "Registered Email",
    },
    {
        id: "phone_number",
        title: "Phone Number",
    },
    {
        id: "date_registered",
        title: "Date Registered",
    },
    {
        id: "action",
        title: "Quiz For User",
    },
];






const QuizGenerating = () => {
    const dispatch = useDispatch();
    const router = useRouter();
    const [isLoading, setisLoading] = useState(true);
    const [showQuizGen, setShowQuizGen,] = useState(false);
    const [selectedUser, setSelectedUser] = useState(null)
    const { register, handleSubmit, reset, errors } = useForm();
    const [links, setlinks] = useState({ previous: false, next: true });

    const [page, setPage] = useState(1);
    const { subscribersData, isLoadingsubscribers, isUserUpdated } = useSelector(
        (state) => state.subscribers
    );
    const { contentData, } = useSelector((state) => state.questionProperty);
    const { user, msg } = useSelector((state) => state.auth);
    const [size, setSize] = useState(10);
    const [selectedValue, setSelectedValue] = useState("");

    const classes = subscriptionStyles();

    useEffect(() => {
        const query = { page };
        dispatch(fetchAllQuestionPropery(query));
    }, [dispatch]);

    const onSubmit = async (data) => {
        const formData = {
            questionPropertId: data.questionPropertId,
        }
        dispatch(GenerateQuestionsAllUsers(formData));
        reset()
    };
    const handleSelectChange = (event) => {
        setSelectedValue(event.target.value);
    };



    useEffect(() => {
        const query = { page, size };
        if (subscribersData.length === 0) {
            dispatch(fetchSubscribers(query));
        }
    }, [subscribersData, isUserUpdated]);



    useEffect(() => {
        const query = { page, size };
        dispatch(fetchSubscribers(query));
    }, [page]);

    const openModal = (userData) => {
        setShowQuizGen(true);
        setSelectedUser(userData);
    }

    const handlePaginate = (state) => {
        if (state === "previous") {
            const count = page - 1;
            if (count < 1) {
                setPage(1);
            } else {
                setPage(count);
            }
        } else {
            setPage(page + 1);
            if (page > 0) {
                setlinks({ next: true, previous: true });
            } else {
                setlinks({ next: true, previous: false });
            }
        }
    };


    useEffect(() => {
        setisLoading(false);
    }, []);

    return (
        <div className="content mt-2">
            {isLoadingsubscribers && subscribersData.length === 0 ? (
                <div class="spinner">Loading...</div>
            ) : (
                <>
                    {msg && <Alert key={new Date()} payload={msg} />}
                    <div className="container-fluid">
                        <div className="row">
                            <div className="col-xl-12 mb-5">
                                <>
                                    <div className="row">
                                        <div className="col-sm-12 col-md-7 mb-1">
                                            <div className="card-box">
                                                <h4 className="header-title mt-0">
                                                    Generate Quiz for all Users
                                                </h4>

                                                <div className="row">
                                                    <form onSubmit={handleSubmit(onSubmit)}>

                                                        <div class="">
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
                                                        </div>
                                                    </form>
                                                </div>
                                                <Divider
                                                    sx={{ height: 28, m: 0.5 }}
                                                    orientation="vertical"
                                                />
                                            </div>
                                        </div>

                                    </div>

                                    {user && subscribersData ? (
                                        <>
                                            {isLoading ? (
                                                <div className="spinner">Loading...</div>
                                            ) : (
                                                <div class="col-lg-12">
                                                    <Table
                                                        tableHeader={header}
                                                        title="Recent Subscribers"
                                                        showButton={true}
                                                        handleFetchProverbBatch={handlePaginate}
                                                        links={links}
                                                        id={2}
                                                        sub={true}
                                                    >
                                                        {subscribersData &&
                                                            subscribersData?.map(
                                                                (
                                                                    {
                                                                        id,
                                                                        firstName,
                                                                        lastName,
                                                                        email,
                                                                        phone_number,
                                                                        dateCreated,
                                                                        endDate,
                                                                        userId,
                                                                        otherName,
                                                                        phoneNumber,
                                                                        userType,
                                                                    },
                                                                    index
                                                                ) => {
                                                                    const userData = {
                                                                        id,
                                                                        firstName,
                                                                        lastName,
                                                                        email,
                                                                        phone_number,
                                                                        dateCreated,
                                                                        endDate,
                                                                        userId,
                                                                        otherName,
                                                                        phoneNumber,
                                                                        userType,
                                                                    };
                                                                    return (
                                                                        <tr key={id}>
                                                                            <td>{index + 1}</td>
                                                                            <td>
                                                                                {firstName} {lastName}
                                                                            </td>
                                                                            <td>{email}</td>
                                                                            <td>{phoneNumber}</td>
                                                                            <td>{dateCreated}</td>
                                                                            <td>
                                                                                <ul class="list-inline mb-0">
                                                                                    {user &&
                                                                                        user.roles &&
                                                                                        checkPermission(
                                                                                            user.roles,
                                                                                            "Author"
                                                                                        ) |
                                                                                        checkPermission(
                                                                                            user.roles,
                                                                                            "Admin"
                                                                                        ) |
                                                                                        checkPermission(
                                                                                            user.roles,
                                                                                            "SuperAdmin"
                                                                                        ) ? (
                                                                                        <>
                                                                                            <li class="list-inline-item">
                                                                                                <a
                                                                                                    data-tip
                                                                                                    data-for="quiz"
                                                                                                    onClick={() =>
                                                                                                        openModal(userData)
                                                                                                    }
                                                                                                >
                                                                                                    <QuestionAnswerIcon
                                                                                                        className="cursor-pointer"
                                                                                                        color="secondary"
                                                                                                    />
                                                                                                </a>
                                                                                                <ReactTooltip
                                                                                                    id="quiz"
                                                                                                    place="top"
                                                                                                    effect="solid"
                                                                                                >
                                                                                                    Generate Quiz
                                                                                                </ReactTooltip>
                                                                                            </li>

                                                                                        </>
                                                                                    ) : null}
                                                                                </ul>
                                                                            </td>
                                                                        </tr>
                                                                    );
                                                                }
                                                            )}
                                                    </Table>


                                                    {showQuizGen && (
                                                        <GenerateQuiz
                                                            selectedUser={selectedUser}
                                                            showQuiz={showQuizGen}
                                                            close={() => setShowQuizGen(false)}
                                                            cancel={setShowQuizGen}
                                                        />
                                                    )}


                                                </div>
                                            )}
                                        </>
                                    ) : (
                                        <div className="spinner">Loading...</div>
                                    )}
                                </>
                            </div>
                        </div>
                    </div>
                </>
            )}
        </div>
    );
};

export default withAuth(QuizGenerating);



