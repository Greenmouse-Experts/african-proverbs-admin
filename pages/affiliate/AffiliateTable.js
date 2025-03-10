import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useForm, Controller } from "react-hook-form";
import { Link } from "next/link";
import ReactTooltip from "react-tooltip";
import { Alert } from "@/components/UIElements";
import { checkPermission } from "@/utils/utilities";
import { useRouter } from "next/router";
import { fetchEthnic, fetchAffiliatedLanguagebyId, deleteAffiliateLanguage } from "@/store/actions/ethnicAction";
import { toggleIsLoading } from '@/store/actions/authActions';
import { fetchLanguages } from "@/store/actions/languageAction";

const header = [
    { id: "s/n", title: "S/N" },
    {
        id: "Affiliated Language",
        title: "Affiliated Language",
    },
    {
        id: "Date Created",
        title: "Date Created",
    },
    {
        id: "Actions",
        title: "Actions",
    },
];

const AffiliateTable = () => {
    const dispatch = useDispatch();
    const router = useRouter();
    const { user, msg } = useSelector((state) => state.auth);
    const { languages, isLoadinglanguages } = useSelector((state) => state.Languages);
    const { ethnics, affiliate } = useSelector(state => state.Ethnics)
    const { isLoading, likelihood } = useSelector(state => state.proverb);

    const [selectedLanguage, setSelectedLanguage] = useState("");
    const { handleSubmit, control, reset, register, errors } = useForm();


    useEffect(() => {
        dispatch(fetchLanguages());
    }, [fetchLanguages]);

    useEffect(() => {

        if (!ethnics) {
            dispatch(fetchEthnic())
        }
        if (isLoading) {
            dispatch(toggleIsLoading())
        }

    }, [])

    const handleDelete = (id) => {
        dispatch(deleteAffiliateLanguage(id))
    }


    useEffect(() => {
        // Fetch affiliated language data based on the selected language
        if (selectedLanguage) {
            dispatch(fetchAffiliatedLanguagebyId(selectedLanguage));

        }

        return () => {
            dispatch({ type: 'RESET_AFFILIATE' });
        }
    }, [selectedLanguage, dispatch]);

    const handleLanguageChange = (e) => {
        setSelectedLanguage(e.target.value);
    };


    // Date String
    const formatDateString = (dateString) => {
        const options = { day: 'numeric', month: 'long', year: 'numeric' };
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', options);
    };

    const sortAffiliateAlphabetically = (arr) => {
        return arr.slice().sort((a, b) => a.ethnicName.localeCompare(b.ethnicName));
    };



    return (
        <div className="content mt-2">
            {msg ? <Alert payload={msg} /> : null}
            <div className="row mx-auto">
                {/* Dropdown Section */}
                <div className="form-group col-md-6">
                    <label for="inputState" class="col-form-label">Ethnic Language </label>
                    <select
                        class="form-control form-white"
                        data-placeholder="Select Language"
                        name="language"
                        onChange={handleLanguageChange}
                        ref={register({ required: true })}>
                        <option>Select Language</option>
                        {user && user.ethnics.map((language, index) => (
                            <option key={index} value={language.id}>{language.name}</option>
                        ))}
                    </select>

                </div>

                {/* Table Section */}
                <div className="col-lg-12" style={{ overflow: "auto" }}>
                    {affiliate && affiliate.length > 0 ? (
                        <table className="table table-bordered">
                            <thead>
                                <tr>
                                    {header.map((item) => (
                                        <th key={item.id}>{item.title}</th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody>
                                {sortAffiliateAlphabetically(affiliate).map((value, index) => (
                                    <tr key={value.id}>
                                        <td>{index + 1}</td>
                                        <td>{value.ethnicName}</td>
                                        <td>{formatDateString(value.dateCreated)}</td>
                                        <td>
                                            <ul className="float-right mb-0">
                                                {user &&
                                                    user.roles &&
                                                    (checkPermission(user.roles, "Author") ||
                                                        checkPermission(user.roles, "Admin") ||
                                                        checkPermission(user.roles, "SuperAdmin")) ? (
                                                    <>

                                                        <li
                                                            className="list-inline-item"
                                                            style={{ position: "relative" }}
                                                        >
                                                            <span
                                                                onClick={() => handleDelete(value.id)}
                                                                className="icon circle-icon"
                                                                data-tip
                                                                data-for="delete"
                                                            >
                                                                <i className="mdi mdi-delete text-danger"></i>
                                                            </span>
                                                            <ReactTooltip
                                                                id="delete"
                                                                place="top"
                                                                effect="solid"
                                                            >
                                                                Delete Affiliated Language
                                                            </ReactTooltip>
                                                        </li>
                                                    </>
                                                ) : null}
                                            </ul>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    ) : (
                        <p>No Affiliated Language available.</p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default AffiliateTable;
