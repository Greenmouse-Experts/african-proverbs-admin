import withAuth from '@/utils/withAuth'
import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { fetchSelectProverbs, deleteProverb } from '@/store/actions/proverbActions'
import { htmlFilter } from '@/utils/utilities'
import { useRouter } from 'next/router'
import Translation from '@/parts/SubPages/Translation';
import ProverbCategory from '@/parts/SubPages/Category';
import AudioRecord from '@/parts/SubPages/AudioRecord';
import Interpretation from '@/parts/SubPages/Interpretation'
import ProverbReviews from '@/parts/SubPages/Comments'
import PublisherReviews from '@/parts/SubPages/PublisherReview'
import { fetchLanguages } from '@/store/actions/languageAction'
import { checkPermission, retrieveEtnicNames } from '../../utils/utilities'
import TextFieldsIcon from '@material-ui/icons/TextFields';
import FormatTextdirectionLToRIcon from '@material-ui/icons/FormatTextdirectionLToR';
import ClassIcon from '@material-ui/icons/Class';
import KeyboardVoiceIcon from '@material-ui/icons/KeyboardVoice';
import { Alert } from '@/components/UIElements';
import ProverbActions from '@/parts/usersWidget/ProverbActions'
import ProverbPopUp from '@/components/widgets/ProverbPopUp'
import UpdateProverb from '@/parts/SubPages/UpdateProverb';
import Unauthorized from '@/parts/SubPages/Unauthorized';
import { toggleIsLoading } from '@/store/actions/authActions';

const ViewProverb = () => {
    const router = useRouter()
    const { q } = router.query;
    if (q) {
        const dispatch = useDispatch()
        const { isLoading } = useSelector(state => state.proverb)
        const { selectedProverb } = useSelector(state => state.proverb)
        const { user, msg } = useSelector(state => state.auth)
        const { languages } = useSelector(state => state.Languages);


        const [open, setOpen] = useState(false);
        const [proverbData, setProverbData] = useState(null);
        const [updateData, setUpdateData] = useState(null);


        useEffect(() => {
            if (user) {
                dispatch(fetchSelectProverbs(q))
            }

            if (isLoading) {
                dispatch(toggleIsLoading())
            }

            if (!languages) {
                dispatch(fetchLanguages())
            }
        }, [])

        const handleClickOpen = (id, slug) => {
            setProverbData({
                proverbId: id,
                slug,
            });
            setOpen(true);
        };

        const handleClose = () => {
            setProverbData(null);
            setOpen(false);
        };

        const deleteProverbHandler = ({ proverbId, slug }) => {
            dispatch(deleteProverb(proverbId, slug));
            setProverbData(null);
            setOpen(false);
        };

        const updateProverbHandler = (value) => {
            setUpdateData(value);
        };

        if (updateData) {
            return (
                <UpdateProverb
                    updateData={updateData}
                    closesUpdate={() => setUpdateData(null)}
                />
            );
        }



        return (

            <div className="content">
                {msg ? <Alert payload={msg} /> : null}
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-xl-12">
                            {
                                user && selectedProverb ?

                                    <div className="card">
                                        <div className="card-body">
                                            <h5 className="mb-3">Proverb status: &emsp;<span class={'badge badge-info'}>{selectedProverb.status}</span></h5>

                                            <div className="mb-3">
                                                <div class="d-flex justify-content-between">
                                                    <div className="alert fade show">
                                                        <p>
                                                            {htmlFilter(selectedProverb.content)}
                                                        </p>
                                                    </div>
                                                    <ProverbActions value={selectedProverb} openDelete={handleClickOpen} updateProverbHandler={updateProverbHandler} />
                                                </div>
                                            </div>


                                            <ul className="nav nav-tabs">
                                                <li className="nav-item">
                                                    <a href="#translation" data-toggle="tab" aria-expanded="false" className="nav-link active">
                                                        {/* <span className="d-block d-sm-none"><i className="mdi carbon-text-annotation-toggle"></i></span> */}
                                                        <span className="d-block d-sm-none"><i className="mdi carbon-text-annotation-toggle"></i></span>
                                                        <span className="d-none d-sm-block"><TextFieldsIcon color="secondary" /> Transliteration</span>
                                                    </a>
                                                </li>
                                                <li className="nav-item">
                                                    <a href="#interpretation" data-toggle="tab" aria-expanded="true" className="nav-link">
                                                        <span className="d-block d-sm-none"><i classNameName="mdi mdi-file-text"></i></span>
                                                        <span className="d-none d-sm-block"><FormatTextdirectionLToRIcon color="action" /> Interpretation</span>
                                                    </a>
                                                </li>
                                                <li className="nav-item">
                                                    <a href="#category" data-toggle="tab" aria-expanded="false" className="nav-link">
                                                        <span className="d-block d-sm-none"><i classNameName="far fa-envelope"></i></span>
                                                        <span className="d-none d-sm-block"><ClassIcon /> Categories</span>
                                                    </a>
                                                </li>
                                                <li className="nav-item">
                                                    <a href="#audio" data-toggle="tab" aria-expanded="false" className="nav-link">
                                                        <span className="d-block d-sm-none"><i classNameName="far fa-envelope"></i></span>
                                                        <span className="d-none d-sm-block"><KeyboardVoiceIcon /> Record Proverb Audio</span>
                                                    </a>
                                                </li>
                                                {(checkPermission(user.roles, 'Author')) | (checkPermission(user.roles, 'Reviewer')) | (checkPermission(user.roles, 'Admin')) | (checkPermission(user.roles, 'SuperAdmin')) ? (
                                                    <li className="nav-item">
                                                        <a href="#comments" data-toggle="tab" aria-expanded="false" className="nav-link">
                                                            <span className="d-block d-sm-none"><i className="far fa-envelope"></i></span>
                                                            <span className="d-none d-sm-block">Reviewer <span className="mdi mdi-chat" ></span> Author Comments</span>
                                                        </a>
                                                    </li>) : null}
                                                {(checkPermission(user.roles, 'Publisher')) | (checkPermission(user.roles, 'Reviewer')) | (checkPermission(user.roles, 'Admin')) | (checkPermission(user.roles, 'SuperAdmin')) ? (
                                                    <li className="nav-item">
                                                        <a href="#pcomments" data-toggle="tab" aria-expanded="false" className="nav-link">
                                                            <span className="d-block d-sm-none"><i className="far fa-envelope"></i></span>
                                                            <span className="d-none d-sm-block">Publisher <span className="mdi mdi-chat" ></span> Reviewer Comments</span>
                                                        </a>
                                                    </li>) : null}


                                            </ul>

                                            <div className="tab-content">
                                                <div role="tabpanel" className="tab-pane fade show active" id="translation">
                                                    <Translation proverb={selectedProverb} user={user} languages={languages} />
                                                </div>
                                                <div role="tabpanel" className="tab-pane fade" id="interpretation">
                                                    <Interpretation user={user} languages={languages} proverb={selectedProverb} />
                                                </div>
                                                <div role="tabpanel" className="tab-pane fade" id="category">
                                                    <ProverbCategory user={user} proverb={selectedProverb} />
                                                </div>
                                                <div role="tabpanel" className="tab-pane fade" id="audio">
                                                    <AudioRecord user={user} proverb={selectedProverb} />
                                                </div>
                                                {(checkPermission(user.roles, 'Author')) | (checkPermission(user.roles, 'Reviewer')) | (checkPermission(user.roles, 'Admin')) | (checkPermission(user.roles, 'SuperAdmin')) ? (
                                                    <div role="tabpanel" className="tab-pane fade" id="comments">
                                                        <ProverbReviews user={user} proverb={selectedProverb} />
                                                    </div>
                                                ) : null}
                                                {(checkPermission(user.roles, 'Publisher')) | (checkPermission(user.roles, 'Reviewer')) | (checkPermission(user.roles, 'Admin')) | (checkPermission(user.roles, 'SuperAdmin')) ? (
                                                    <div role="tabpanel" className="tab-pane fade" id="pcomments">
                                                        <PublisherReviews user={user} proverb={selectedProverb} />
                                                    </div>) : null}
                                            </div>
                                            <br />
                                        </div>
                                        <br />
                                    </div>
                                    :
                                    <div className="spinner">Loading...</div>
                            }

                        </div>
                    </div>

                    <ProverbPopUp
                        open={open}
                        handleClose={handleClose}
                        deleteProverbHandler={deleteProverbHandler}
                        proverbData={proverbData}
                    />
                </div>

            </div>

        )
    } else {
        return (
            <Unauthorized>
                <h1 class="text-error">404</h1>
                <h3 class="mt-3 mb-2">Page not found</h3>
            </Unauthorized>
        )
    }
}

export default withAuth(ViewProverb);