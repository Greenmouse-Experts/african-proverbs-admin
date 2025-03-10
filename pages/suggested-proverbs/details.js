import withAuth from "@/utils/withAuth";
import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  fetchProverbspreview,
  deleteProverb,
} from "@/store/actions/proverbActions";
import {
  PublishSuggestion,
  deleteSuggestion,
} from "@/store/actions/sugProvAction";
import { fetchCategories } from "@/store/actions/categoryAction";
import { useRouter } from "next/router";
import Translation from "@/parts/suggestedProverbs/Subpages/Transliteration";
import ProverbCategory from "@/parts/suggestedProverbs/Subpages/Category";
import InherentWisdom from "@/parts/suggestedProverbs/Subpages/InherentWisdom";
import { fetchLanguages } from "@/store/actions/languageAction";
import { checkPermission } from "@/utils/utilities";
import TextFieldsIcon from "@material-ui/icons/TextFields";
import FormatTextdirectionLToRIcon from "@material-ui/icons/FormatTextdirectionLToR";
import ClassIcon from "@material-ui/icons/Class";
import { Alert } from "@/components/UIElements";
import Actions from "./SuggestedProvActions";
import ProverbPopUp from "@/components/widgets/ProverbPopUp";
import UpdateSug from "@/parts/suggestedProverbs/Subpages/UpdateSug";
import Unauthorized from "@/parts/SubPages/Unauthorized";
import { toggleIsLoading } from "@/store/actions/authActions";

const Details = () => {
  const router = useRouter();
  const { q } = router.query;
  if (q) {
    const dispatch = useDispatch();
    const { isLoading } = useSelector((state) => state.proverb);
    const { proverbs } = useSelector((state) => state.sugProverbs);
    const { user, msg } = useSelector((state) => state.auth);
    const { languages } = useSelector((state) => state.Languages);

    const [open, setOpen] = useState(false);
    const [proverbData, setProverbData] = useState(null);
    const [updateData, setUpdateData] = useState(null);

    const selectedProverb = proverbs?.data?.find((item) => item?.id === q);

    useEffect(() => {
      const fetchData = async () => {
        if (!proverbs) {
          await dispatch(fetchProverbspreview());
        }
      };

      if (isLoading) {
        dispatch(toggleIsLoading());
      }
      fetchData();
    }, [proverbs]);

    useEffect(() => {
      dispatch(fetchLanguages());
      dispatch(fetchCategories());
    }, [fetchLanguages]);

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

    const deleteProverbHandler = (value) => {
      setProverbData(value);
      dispatch(deleteSuggestion(value?.id));
      setProverbData(null);
      setOpen(false);
      setTimeout(() => {
        router.push("/suggested-proverbs");
      }, 3000);
    };

    const updateProverbHandler = (value) => {
      setUpdateData(value);
    };

    const publishSuggestion = () => {
      const payload = {
        category_id: selectedProverb?.category_id,
        language_id: selectedProverb?.language_id,
        content: selectedProverb?.content,
        english_interpretation: selectedProverb?.english_interpretation,
        english_transliteration: selectedProverb?.english_transliteration,
        status: "AWAITING",
        email: user?.email,
        name: user?.author_profile?.first_name || "Admin",
      };
      const id = selectedProverb?.id;
      dispatch(PublishSuggestion(payload, id));
      setTimeout(() => {
        router.push("/suggested-proverbs");
      }, 3000);
    };

    if (updateData) {
      return (
        <UpdateSug
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
              {selectedProverb ? (
                <div className="card">
                  <div className="card-body">
                    <h5 className="mb-3">
                      Proverb status: &emsp;
                      <span
                        class={`badge ${
                          selectedProverb?.status === "AWAITING"
                            ? "badge-danger"
                            : "badge-info"
                        } `}
                      >
                        {selectedProverb?.status
                          ? selectedProverb?.status
                          : "AWAITING"}
                      </span>
                    </h5>

                    <div className="mb-3">
                      <div class="d-flex justify-content-between">
                        <div className="alert fade show">
                          <p>
                            {selectedProverb?.content
                              ? selectedProverb?.content
                              : "N/A"}
                          </p>
                        </div>
                        <Actions
                          value={selectedProverb}
                          openDelete={handleClickOpen}
                          updateProverbHandler={updateProverbHandler}
                          publish={publishSuggestion}
                        />
                      </div>
                    </div>

                    <ul className="nav nav-tabs">
                      <li className="nav-item">
                        <a
                          href="#translation"
                          data-toggle="tab"
                          aria-expanded="false"
                          className="nav-link active"
                        >
                          <span className="d-block d-sm-none">
                            {/* <i className="mdi carbon-text-annotation-toggle"></i> */}
                            <TextFieldsIcon color="secondary" />
                          </span>
                          <span className="d-none d-sm-block">
                            <TextFieldsIcon color="secondary" /> Transliteration
                          </span>
                        </a>
                      </li>
                      <li className="nav-item">
                        <a
                          href="#interpretation"
                          data-toggle="tab"
                          aria-expanded="true"
                          className="nav-link"
                        >
                          <span className="d-block d-sm-none">
                            {/* <i classNameName="mdi mdi-file-text"></i> */}
                            <FormatTextdirectionLToRIcon color="action" />
                          </span>
                          <span className="d-none d-sm-block">
                            <FormatTextdirectionLToRIcon color="action" />{" "}
                            Interpretation
                          </span>
                        </a>
                      </li>
                      <li className="nav-item">
                        <a
                          href="#category"
                          data-toggle="tab"
                          aria-expanded="false"
                          className="nav-link"
                        >
                          <span className="d-block d-sm-none">
                            {/* <i classNameName="far fa-envelope"></i> */}
                            <ClassIcon />
                          </span>
                          <span className="d-none d-sm-block">
                            <ClassIcon /> Categories
                          </span>
                        </a>
                      </li>
                    </ul>

                    <div className="tab-content">
                      <div
                        role="tabpanel"
                        className="tab-pane fade show active"
                        id="translation"
                      >
                        {checkPermission(user?.roles, "Author") ||
                        checkPermission(user?.roles, "Reviewer") ||
                        checkPermission(user?.roles, "Admin") ||
                        checkPermission(user?.roles, "SuperAdmin") ? (
                          <Translation
                            proverb={selectedProverb}
                            user={user}
                            languages={languages}
                          />
                        ) : null}
                      </div>
                      <div
                        role="tabpanel"
                        className="tab-pane fade"
                        id="interpretation"
                      >
                        {checkPermission(user?.roles, "Author") ||
                        checkPermission(user?.roles, "Reviewer") ||
                        checkPermission(user?.roles, "Admin") ||
                        checkPermission(user?.roles, "SuperAdmin") ? (
                          <InherentWisdom
                            user={user}
                            languages={languages}
                            proverb={selectedProverb}
                          />
                        ) : null}
                      </div>
                      <div
                        role="tabpanel"
                        className="tab-pane fade"
                        id="category"
                      >
                        {checkPermission(user?.roles, "Author") ||
                        checkPermission(user?.roles, "Reviewer") ||
                        checkPermission(user?.roles, "Admin") ||
                        checkPermission(user?.roles, "SuperAdmin") ? (
                          <ProverbCategory
                            user={user}
                            proverb={selectedProverb}
                          />
                        ) : null}
                      </div>
                    </div>

                    <br />
                  </div>
                  <br />
                </div>
              ) : (
                <div className="spinner">Loading...</div>
              )}
            </div>
          </div>

          <ProverbPopUp
            open={open}
            handleClose={handleClose}
            deleteProverbHandler={deleteProverbHandler}
            proverbData={selectedProverb}
          />
        </div>
      </div>
    );
  } else {
    return (
      <Unauthorized>
        <h1 class="text-error">404</h1>
        <h3 class="mt-3 mb-2">Page not found</h3>
      </Unauthorized>
    );
  }
};

export default withAuth(Details);
