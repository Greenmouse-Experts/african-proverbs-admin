import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import withAuth from "@/utils/withAuth";
import { questionsHeader } from "@/utils/utilities";
import { Alert } from "@/components/UIElements";
import SearchQuestion from "./SearchQuestion";
import { alertMessage } from "@/store/actions/authActions";
import Divider from "@material-ui/core/Divider";
import QuestionsTable from "@/components/factQuestions/questionsTable";
import Router, { useRouter } from "next/router";
import {
  fetchQuestions,
  searchQuestions,
  SearchByKeyword,
  fetchModifiedQuestions,
} from "@/store/actions/factQuestionAction";

const factQuestions = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const [isLoading, setisLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(20);
  const { questions } = useSelector((state) => state.questions);
  const { user, msg } = useSelector((state) => state.auth);
  const totalElements = questions.totalElements;

  const filterType = ["GENERAL", "ETHNIC"];

  const [filter, setfilter] = useState({
    type: "GENERAL",
    ethnic: null,
  });

  const handleChangePage = (newPage) => {
    setCurrentPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setCurrentPage(1);
  };

  useEffect(() => {
    setisLoading(true);
    const fetchData = async () => {
      if (router.query.updatedQuestion === "true") {
        console.log("update triggered");
        await dispatch(fetchModifiedQuestions(currentPage, filter.type));
      } else {
        console.log("normal questions fetched");
        await dispatch(fetchQuestions(currentPage, filter.type));
      }
      setisLoading(false);
    };
    fetchData();
  }, [currentPage, setCurrentPage, filter.type, router.query.updatedQuestion]);

  const filterQuestions = async () => {
    setisLoading(true);
    const type = filter.type;
    const ethnic = filter.ethnic;

    try {
      if (!type && !ethnic) {
        dispatch(alertMessage("Type or Ethnic must be selected", "FAILURE"));
      } else {
        await dispatch(searchQuestions(currentPage, type));
        Router.push({
          pathname: "/fact-questions",
        });
      }
    } catch (error) {
      console.error(error);
    } finally {
      setisLoading(false);
    }
  };

  const handleSearch = async (keyword) => {
    setisLoading(true);
    try {
      if (keyword && filter.type) {
        await dispatch(SearchByKeyword(currentPage, keyword, filter.type));
        // Router.push({
        //   pathname: "/fact-questions",
        // });
      } else {
        dispatch(
          alertMessage("Keyword and type  must be available", "FAILURE")
        );
      }
    } catch (error) {
      console.error(error);
    } finally {
      setisLoading(false);
    }
  };

  return (
    <div className="content">
      {msg && <Alert key={new Date()} payload={msg} />}
      <div className="container-fluid">
        <div className="row">
          <div className="col-xl-12 mb-5">
            {!isLoading ? (
              <>
                <div className="row">
                  <div className="col-sm-12 col-md-7 mb-1">
                    <div className="card-box">
                      <h4 className="header-title mt-0">Filter Questions</h4>

                      <div className="row">
                        <div className="col-sm-4 col-md-4 mb-1">
                          <select
                            name="type"
                            onChange={(e) =>
                              setfilter({
                                ...filter,
                                [e.target.name]: e.target.value,
                              })
                            }
                            className="form-control form-control-sm mr-1"
                            defaultValue={filter.type || "GENERAL"}
                          >
                            <>
                              <option value="">Filter By Status</option>
                              {user &&
                                filterType.map((stat, index) => (
                                  <option key={index} value={stat}>
                                    {stat}
                                  </option>
                                ))}
                            </>
                          </select>
                        </div>
                        <div className="col-sm-4 col-md-4 mb-1">
                          <button
                            type="button"
                            onClick={filterQuestions}
                            className="btn btn-info btn-rounded waves-effect width-md waves-light"
                          >
                            Filter Proverbs
                          </button>
                        </div>
                      </div>
                      <Divider
                        sx={{ height: 28, m: 0.5 }}
                        orientation="vertical"
                      />
                    </div>
                  </div>
                  <div className="col-sm-12 col-md-5">
                    <div className="card-box">
                      <h4 className="header-title mt-0">Search Question</h4>
                      <SearchQuestion
                        handleSearch={handleSearch}
                        currentPage={currentPage}
                      />
                    </div>
                  </div>
                </div>

                {questions.content ? (
                  <>
                    {questions?.content.length > 0 ? (
                      <>
                        <QuestionsTable
                          tableHeader={questionsHeader}
                          rows={questions || []}
                          showButton={true}
                          rowLength={questions?.content?.length}
                          isLoading={isLoading}
                          totalElements={totalElements}
                          currentPage={currentPage}
                          rowsPerPage={rowsPerPage}
                          handleChangePage={handleChangePage}
                          handleChangeRowsPerPage={handleChangeRowsPerPage}
                          type={"fact-questions"}
                        />
                      </>
                    ) : (
                      <p>Could Not Find Related Question(s)</p>
                    )}
                  </>
                ) : (
                  <p>
                    No Question Available At The Moment, Check Some Other Time
                  </p>
                )}
              </>
            ) : (
              <div className="spinner">Loading...</div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default withAuth(factQuestions);
