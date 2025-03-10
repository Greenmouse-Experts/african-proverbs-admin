import React, { useEffect, useState, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import withAuth from "@/utils/withAuth";
import {
  fetchProverbspreview,
  searchProverb,
} from "@/store/actions/correctProverbActions";
import { tableHeader } from "@/utils/utilities";
import { Alert } from "@/components/UIElements";
import { alertMessage } from "@/store/actions/authActions";
import Divider from "@material-ui/core/Divider";
import ProverbsTable from "./Table";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const correctedProverbs = () => {
  const dispatch = useDispatch();
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(20);
  const [isLoading, setisLoading] = useState(true);
  const [startDate, setStartDate] = useState(new Date("2023-10-02"));
  const [endDate, setEndDate] = useState(new Date());
  const filterType = ["CATEGORY", "WISDOM", "TRANSLITERATION", "PROVERB"];
  const { proverbs } = useSelector((state) => state.correctProverbs);
  const { user, msg } = useSelector((state) => state.auth);

  const handleStartDateChange = (date) => {
    setStartDate(date);
  };

  const handleEndDateChange = (date) => {
    setEndDate(date);
  };

  const [filter, setfilter] = useState({
    type: "WISDOM",
    status: null,
  });

  const handleChangePage = (newPage) => {
    setCurrentPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setCurrentPage(1);
  };

  useEffect(() => {
    const fetchData = async () => {
      const payload = {
        startTime: startDate.toISOString().split("T")[0],
        startTime: startDate.toISOString().split("T")[0],
        endTime: endDate.toISOString().split("T")[0],
        status: "",
        correctionType: filter.type,
      };
      await dispatch(fetchProverbspreview(payload, currentPage));
      setisLoading(false);
    };

    fetchData();
  }, []);

  const filterProverbs = () => {
    setisLoading(true);
    const payload = {
      startTime: startDate.toISOString().split("T")[0],
      endTime: endDate.toISOString().split("T")[0],
      status: "",
      correctionType: filter.type,
    };

    if (!filter.type) {
      dispatch(alertMessage("correction type must be selected", "FAILURE"));
    } else {
      dispatch(fetchProverbspreview(payload, currentPage))
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
                <div className="row" style={{ zIndex: "1000" }}>
                  <div className="col-sm-12 col-md-7 mb-1">
                    <div className="card-box">
                      <h4 className="header-title mt-0">Filter Corrections</h4>

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
                            defaultValue={filter.type || "WISDOM"}
                          >
                            <>
                              <option value="">Filter By Type</option>
                              {user &&
                                filterType.map((stat, index) => (
                                  <option key={index} value={stat}>
                                    {stat}
                                  </option>
                                ))}
                            </>
                          </select>
                        </div>
                        <div
                          className="col-sm-4 col-md-4 mb-1"
                          style={{ zIndex: "10000" }}
                        >
                          <DatePicker
                            selected={startDate}
                            onChange={handleStartDateChange}
                            dateFormat="yyyy-MM-dd"
                            className="form-control form-control-sm"
                            placeholderText="Start Date"
                          />
                        </div>
                        <div
                          className="col-sm-4 col-md-4 mb-1"
                          style={{ zIndex: "10000" }}
                        >
                          <DatePicker
                            selected={endDate}
                            onChange={handleEndDateChange}
                            dateFormat="yyyy-MM-dd"
                            className="form-control form-control-sm"
                            placeholderText="End Date"
                          />
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
                {proverbs?.content ? (
                  <>
                    {proverbs?.content?.length > 0 ? (
                      <>
                        <ProverbsTable
                          tableHeader={tableHeader}
                          rows={proverbs?.content}
                          showButton={true}
                          rowLength={proverbs?.data?.length}
                          currentPage={currentPage}
                          rowsPerPage={rowsPerPage}
                          handleChangePage={handleChangePage}
                          handleChangeRowsPerPage={handleChangeRowsPerPage}
                          isLoading={isLoading}
                          type={"corrected-proverbs"}
                        />
                      </>
                    ) : (
                      <p>No Data At The Moment, Check Some Other Time</p>
                    )}
                  </>
                ) : (
                  <div className="spinner">Loading...</div>
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

export default withAuth(correctedProverbs);
