import React, { useEffect, useState, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import withAuth from "@/utils/withAuth";
import ProverbTable from "@/components/UIElements/DataTable";
import {
  fetchBatchProverbs,
  fetchProverbStatus,
  saveProverbs,
} from "@/store/actions/proverbActions";
import {
  proverbTableHeader,
  retrieveEtnicNames,
  checkWhoUserIs,
  filterStatus,
  retrieveEtnicId,
} from "@/utils/utilities";
import { Alert, SearchInput } from "@/components/UIElements";
import { UpdateProverb } from "@/parts/SubPages";
import { toggleIsLoading, alertMessage } from "@/store/actions/authActions";
import Divider from "@material-ui/core/Divider";
import TableBody from "@/parts/proverbTable/ProverbTableBody";
import ProverbsTable from "@/parts/proverbTable/ProverbTable";
import Router, { useRouter } from "next/router";
import { FetchProverbs, FetchProverbsView } from "@/services/proverbService";

const ViewProverb = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const [isLoading, setisLoading] = useState(false);
  const [page, setPage] = React.useState(1);
  const [rowsPerPage, setRowsPerPage] = React.useState(100);
  const { result, links, batchurl, count } = useSelector(
    (state) => state.proverb
  );

  // console.log(page)
  const { user, msg } = useSelector((state) => state.auth);
  // const { ethnic, status, newPage: queryPage, rowsPerPage } = router.query;

  const [filter, setfilter] = useState({
    status: "ALL",
    ethnic: "ALL",
  });

  useEffect(() => {
    if (user) {
      filterProverbs();
    }
  }, [page]);

  const filterProverbs = () => {
    setisLoading(true);
    var status = filter.status;
    var ethnic = filter.ethnic;
    if (!status && !ethnic) {
      dispatch(alertMessage("Status or Ethnic must be selected", "FAILURE"));
      return;
    }
    var ethn = retrieveEtnicNames(user.ethnics);
    var nethnics = ethn.toString();
    if (ethnic || status) {
      var ethnics =
        filter.ethnic == "ALL" ||
          filter.ethnic == null ||
          filter.ethnic == undefined
          ? nethnics
          : filter.ethnic;

      var filterStatus =
        status == "ALL" || status == null || status == undefined
          ? "AWAITING,ACCEPTED,REJECTED,PUBLISHED,UNPUBLISHED,CREATED"
          : status;

      var payload = {
        page: page,
        size: "100",
        size: rowsPerPage,
        ethnic_in: ethnics,
        status_in: filterStatus
      };

      if (filter.audio === "true") {
        payload.hasRecordedAudio = true;
      } else if (filter.audio === "false") {
        payload.hasRecordedAudio = false;
      }

      FetchProverbs(payload).then((result) => {
        if (result.status === 200) {
          dispatch(saveProverbs(result.data));
          dispatch(toggleIsLoading());
          setisLoading(false);
        }
      });
    }
  };

  const audioData = [
    {
      name: "AUDIO",
      state: true,
    },
    {
      name: "NO AUDIO",
      state: false,
    },
  ];

  return (
    <div className="content">
      {msg && <Alert key={new Date()} payload={msg} />}
      <div className="container-fluid">
        <div className="row">
          <div className="col-xl-12 mb-5">
            {/* {!isLoading ? ( */}
            <>
              <div className="row">
                <div className="col-sm-12 col-md-7 mb-1">
                  <div className="card-box">
                    <h4 className="header-title mt-0">Filter Proverbs</h4>

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
                            <option value="">Filter Status</option>
                            {user &&
                              filterStatus(user.roles).map((stat, index) => (
                                <option key={index} value={stat}>
                                  {stat}
                                </option>
                              ))}
                          </>
                        </select>
                      </div>
                      <div className="col-sm-4 col-md-4 mb-1">
                        <select
                          name="audio"
                          onChange={(e) => {
                            const selectedValue = e.target.value;
                            console.log("Selected Value:", selectedValue);
                            setfilter({
                              ...filter,
                              [e.target.name]: e.target.value,
                            });
                          }}
                          className="form-control form-control-sm mr-1"
                          defaultValue={filter.audio || ""}
                        >
                          <>
                            <option defaultValue={"ALL"} value="">
                              Filter Audio
                            </option>
                            {audioData.map((audioType, index) => (
                              <option key={index} value={audioType.state}>
                                {audioType.name}
                              </option>
                            ))}
                          </>
                        </select>
                      </div>

                      <div className="col-sm-4 col-md-4 mb-1">
                        <select
                          name="ethnic"
                          onChange={(e) =>
                            setfilter({
                              ...filter,
                              [e.target.name]: e.target.value,
                            })
                          }
                          className="form-control form-control-sm mr-1"
                          defaultValue={filter.ethnic || ""}
                        >
                          <>
                            <option defaultValue={"ALL"} value="">
                              Filter Ethnic
                            </option>
                            <option value="ALL">All</option>
                            {user &&
                              user.ethnics.map((stat, index) => (
                                <option key={index} value={stat.name}>
                                  {stat.name}
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
                <div className="col-sm-12 col-md-5">
                  <div className="card-box">
                    <h4 className="header-title mt-0">Search Proverbs</h4>
                    <SearchInput placeholder={"Search Proverb"} routeSearch />
                  </div>
                </div>
              </div>

              {isLoading ? (
                <div className="spinner">Loading...</div>
              ) : user && result !== null ? (
                <ProverbsTable
                  page={page}
                  setPage={setPage}
                  rowsPerPage={rowsPerPage}
                  setRowsPerPage={setRowsPerPage}
                  tableHeader={proverbTableHeader}
                  rows={result}
                  handleFetchProverbBatch={(url) =>
                    handleFetchProverbBatch(url)
                  }
                  roles={user.roles}
                  showButton={true}
                  links={links}
                  rowLength={Number(count)}
                  isLoading={isLoading}
                  type={"view-proverbs"}
                />
              ) : (
                checkWhoUserIs(user)
              )}

              {/* {user && result !== null ? (
                <ProverbsTable
                  tableHeader={proverbTableHeader}
                  rows={result}
                  handleFetchProverbBatch={(url) =>
                    handleFetchProverbBatch(url)
                  }
                  roles={user.roles}
                  showButton={true}
                  links={links}
                  rowLength={Number(count)}
                  isLoading={isLoading}
                  type={"view-proverbs"}
                />
              ) : (
                checkWhoUserIs(user)
              )} */}
            </>
          </div>
        </div>
      </div>
    </div>
  );
};

export default withAuth(ViewProverb);
