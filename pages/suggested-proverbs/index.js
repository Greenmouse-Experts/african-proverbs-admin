import React, { useEffect, useState, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import withAuth from "@/utils/withAuth";
import {
  fetchProverbspreview,
  searchProverb,
} from "@/store/actions/sugProvAction";
import { tableHeader } from "@/utils/utilities";
import { Alert } from "@/components/UIElements";
import { alertMessage } from "@/store/actions/authActions";
import Divider from "@material-ui/core/Divider";
import ProverbsTable from "@/parts/suggestedProverbs/Table";
import Router, { useRouter } from "next/router";

const suggestedProverbs = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const [isLoading, setisLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(20);
  const { proverbs } = useSelector((state) => state.sugProverbs);
  const { user, msg } = useSelector((state) => state.auth);
  const totalElements = proverbs.totalElements;

  const filterStatus = ["AWAITING", "PUBLISHED"];

  const [filter, setfilter] = useState({
    status: "AWAITING",
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
    dispatch(fetchProverbspreview(filter.status, currentPage));
  }, [currentPage, setCurrentPage]);

  useEffect(() => {
    const fetchData = async () => {
      await dispatch(fetchProverbspreview(filter.status, currentPage));
      setisLoading(false);
    };

    fetchData();
  }, []);

  const filterProverbs = () => {
    setisLoading(true);
    const status = filter.status;
    const ethnic = filter.ethnic;

    if (!status) {
      dispatch(alertMessage("Status must be selected", "FAILURE"));
    } else {
      dispatch(searchProverb(status, currentPage))
        .then(() => {
          Router.push({
            pathname: "/suggested-proverbs",
          });
        })
        .catch((error) => {
          console.log(error);
        });
    }
    setisLoading(false);
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
                      <h4 className="header-title mt-0">
                        Filter Suggested Proverbs
                      </h4>

                      <div className="row">
                        <div className="col-sm-4 col-md-4 mb-1">
                          <select
                            name="status"
                            onChange={(e) =>
                              setfilter({
                                ...filter,
                                [e.target.name]: e.target.value,
                              })
                            }
                            className="form-control form-control-sm mr-1"
                            defaultValue={filter.status || ""}
                          >
                            <>
                              <option value="">Filter By Status</option>
                              {user &&
                                filterStatus.map((stat, index) => (
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
                            onClick={filterProverbs}
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
                </div>

                {proverbs?.data ? (
                  <>
                    {proverbs?.data?.length > 0 ? (
                      <>
                        <ProverbsTable
                          tableHeader={tableHeader}
                          rows={proverbs?.data}
                          showButton={true}
                          totalElements={totalElements}
                          rowLength={proverbs?.data?.length}
                          currentPage={currentPage}
                          rowsPerPage={rowsPerPage}
                          handleChangePage={handleChangePage}
                          handleChangeRowsPerPage={handleChangeRowsPerPage}
                          isLoading={isLoading}
                          type={"suggested-proverbs"}
                        />
                      </>
                    ) : (
                      <p>No Data At The Moment, Check Some Other Time</p>
                    )}
                  </>
                ) : (
                  <p>No Data At The Moment, Check Some Other Time</p>
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

export default withAuth(suggestedProverbs);
