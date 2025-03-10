import { PieChart, TrafficOutlined } from "@material-ui/icons";
import Head from "next/head";
import Bar from "../components/widgets/BarChart";
import Columnchart from "../components/widgets/ColumnChart";
import ChartKick from "../components/widgets/ChartKick";
import Chart from "../components/widgets/PieChart";
import ProverbTable from "../components/UIElements/Table";
import StatCard from "../components/widgets/StatCard";
import withAuth from "../utils/withAuth";
import { useSelector, useDispatch } from "react-redux";
import React, { useEffect, useState, useRef } from "react";
import {
  dashBoardAction,
  dashBoardCount,
  fetchProverbspreview,
  toggleIsLoading,
} from "../store/actions/proverbActions";
import {
  proverbTableHeader,
  fetchFirstNthItems,
  retrieveEtnicNames,
  checkWhoUserIs,
  formatProcedureUrlByAuth,
} from "../utils/utilities";
import { Alert } from "../components/UIElements";
import CardLoader from "../components/UIElements/CardLoader";
import {
  PieData,
  BarData,
  ColumnChartData,
} from "../components/UIElements/dashboardData";
import TableBody from "@/parts/proverbTable/ProverbTableBody";
import { checkProverbAdmin } from "@/utils/utilities";
import MultiBarChart from "@/components/widgets/MultiBarChart";
import ProverbsCount from "@/components/widgets/ProverbsCount";
import {
  fetchDashboardCount,
  FetchProverbsView,
  FetchProverbsViewPost,
} from "@/services/proverbService";
import { alertMessage, logout } from "@/store/actions/authActions";
import * as actionTypes from "@/store/actions/actionTypes";
import ProverbsTable from "@/parts/proverbTable/ProverbTable";

const Dashboard = () => {
  const dispatch = useDispatch();
  const { user, msg } = useSelector((state) => state.auth);
  // const {user} = useSelector(state => state.auth);
  const [dashboardCount, setDashbboardCount] = useState(null);
  // const {msg, setMsg} = useState(null);
  const [result, setResult] = useState([]);
  const { dashboardProverbs, view_data } = useSelector(
    (state) => state.proverb
  );
  // const { result, dashboardCount, dashboardProverbs, view_data } = useSelector((state) => state.proverb);

  useEffect(() => {
    fetchDashboardCount()
      .then(async (result) => {
        setDashbboardCount(result.data);
        // console.log("Result.Data", result.data)
      })
      .catch((err) => {
        if (err.response) {
          if (err.response.status == 401) {
            dispatch(alertMessage("Token Expired, Not Authorized", "FAILURE"));
            dispatch(logout());
          } else if (err.response.status == 400) {
            dispatch(alertMessage("Bad Request", "FAILURE"));
          }
        } else if (err.request) {
          dispatch(alertMessage("Error, Please contact Admin", "FAILURE"));
        } else {
          dispatch(alertMessage("Error Connecting to the internet", "FAILURE"));
        }
      });

    // dispatch(dashBoardCount());
    if (user && user.user_type == "PROVERB_ADMIN" && result !== null) {
      // console.log(user.ethnics);
      var ethn = retrieveEtnicNames(user.ethnics);
      console.log(ethn);
      var nethnics = ethn.toString();
      // var url = formatProcedureUrlByAuth(user.roles, nethnics);
      var payload = {
        page: 1,
        size: 10,
        ethnic_in: nethnics,
        status_in: "AWAITING,ACCEPTED,REJECTED,PUBLISHED,UNPUBLISHED,CREATED",
      };
      // url = `${url}&size=5`;
      FetchProverbsViewPost(payload)
        .then(async (result) => {
          if (result.status === 200) {
            console.log("getting preview", result.data);
            const data = result.data;
            setResult(data["content"]);
            // dispatch(toggleIsLoading());

            // if (dashboard) dispatch(fetchDashboardProverbs(result.data.content));
          } else if (result.status === 401) {
            dispatch(logout("Unauthorized Access"));
          } else {
            dispatch(alertMessage("COULD NOT FETCH DATA", "ERROR"));
          }
          dispatch(toggleIsLoading());
          return;
        })
        .catch((err) => {
          if (err.response) {
            if (err.response.status == 401) {
              dispatch(
                alertMessage("Token Expired, Not Authorized", "FAILURE")
              );
              dispatch(logout());
            } else if (err.response.status == 400) {
              dispatch(alertMessage("Bad Request", "FAILURE"));
            }
          } else if (err.request) {
            dispatch(alertMessage("Error, Please contact Admin", "FAILURE"));
          } else {
            dispatch(
              alertMessage("Error Connecting to the internet", "FAILURE")
            );
          }
          dispatch(toggleIsLoading());
        });

      // dispatch(fetchProverbspreview(user.roles, nethnics));
    }
  }, []);

  return (
    <div className="content">
      {msg && <Alert key={new Date()} payload={msg} />}
      <div className="container-fluid">
        <div className="row">
          <div className="col-xl-3 col-md-6">
            {dashboardCount ? (
              <StatCard
                name="Proverbs"
                icon={<i className="mdi mdi-domain mdi-48px text-warning"></i>}
                value={dashboardCount ? dashboardCount.proverbs : "0"}
                color="text-warning"
                link="/proverbs/view-proverbs"
              />
            ) : (
              <CardLoader
                name="Proverbs"
                icon={<i className="mdi mdi-domain mdi-48px text-warning"></i>}
                color="text-warning"
              />
            )}
          </div>
          <div className="col-xl-3 col-md-6">
            {dashboardCount ? (
              <StatCard
                name="Users"
                icon={
                  <i className="mdi mdi-account-multiple-outline mdi-48px text-success"></i>
                }
                value={dashboardCount ? dashboardCount.users : "0"}
                color="text-success"
                link="/users"
              />
            ) : (
              <CardLoader
                name="Users"
                icon={
                  <i className="mdi mdi-account-multiple-outline mdi-48px text-success"></i>
                }
                color="text-success"
              />
            )}
          </div>
          <div className="col-xl-3 col-md-6">
            {dashboardCount ? (
              <StatCard
                name="Categories"
                icon={
                  <i className="mdi mdi-clipboard-list-outline mdi-48px text-primary"></i>
                }
                value={dashboardCount ? dashboardCount.categories : "0"}
                color="text-primary"
                link="/categories"
              />
            ) : (
              <CardLoader
                name="Categories"
                icon={
                  <i className="mdi mdi-clipboard-list-outline mdi-48px text-primary"></i>
                }
                color="text-primary"
              />
            )}
          </div>

          <div class="col-xl-3 col-md-6">
            {dashboardCount ? (
              <StatCard
                name="Family"
                icon={
                  <i className="mdi mdi-file-tree mdi-48px text-danger"></i>
                }
                value={2000}
                color="text-danger"
                link="#"
              />
            ) : (
              <CardLoader
                name="Family"
                icon={
                  <i className="mdi mdi-file-tree mdi-48px text-danger"></i>
                }
                color="text-danger"
              />
            )}
          </div>

          <div className="col-xl-3 col-md-6">
            {dashboardCount ? (
              <StatCard
                name="Ethnics"
                icon={<i className="mdi mdi-domain mdi-48px text-Purple"></i>}
                value={dashboardCount ? dashboardCount.ethnics : "0"}
                color="text-Purple"
                link="/ethnic"
              />
            ) : (
              <CardLoader
                name="Ethnics"
                icon={<i className="mdi mdi-domain mdi-48px text-Purple"></i>}
                color="text-Purple"
              />
            )}
          </div>

          <div className="col-xl-3 col-md-6">
            {dashboardCount ? (
              <StatCard
                name="Languages"
                icon={<i className="mdi mdi-domain mdi-48px text-Info"></i>}
                value={dashboardCount ? dashboardCount.languages : "0"}
                color="text-Info"
                link="/language"
              />
            ) : (
              <CardLoader
                name="Languages"
                icon={<i className="mdi mdi-domain mdi-48px text-Info"></i>}
                color="text-warning"
              />
            )}
          </div>
          <div className="col-xl-6 col-md-12">
            <div className="card-box" style={{ padding: "0.5em" }}>
              {dashboardCount ? (
                <ProverbsCount data={dashboardCount.proverbsByEthnicStatus} />
              ) : (
                <CardLoader
                  name="Languages"
                  icon={<i className="mdi mdi-domain mdi-48px text-Info"></i>}
                  color="text-warning"
                />
              )}
            </div>
          </div>
        </div>
        <div className="row">
          {/* <div className="col-xl-4">
            <div className="card-box">
              <ChartKick />
            </div>
          </div> */}
          <div className="col-xl-4">
            <div className="card-box">
              {dashboardCount ? (
                <Chart data={PieData(dashboardCount)} />
              ) : (
                <p>Loading data....</p>
              )}
            </div>
          </div>
          <div className="col-xl-4">
            <div className="card-box">
              {dashboardCount ? (
                <Bar bardata={BarData(dashboardCount)} />
              ) : (
                <p>Loading data....</p>
              )}
            </div>
          </div>
          <div className="col-xl-4">
            <div className="card-box">
              {dashboardCount ? (
                <Columnchart bardata={ColumnChartData(dashboardCount)} />
              ) : (
                <p>Loading data....</p>
              )}
            </div>
          </div>

          {/* <div className="col-xl-12">
            <div className="card-box">
              {dashboardCount ? <MultiBarChart
                data={dashboardCount ? dashboardCount.proverbsByEthnicStatus : []}
                id={"provebs-summary"} /> : <p>Loading data....</p>}
            </div>
          </div> */}
        </div>

        <div className="row">
          <div className="col-xl-12 pt-3">
            {user &&
              checkProverbAdmin(
                user,
                result ? (
                  <>
                    {result.length > 0 ? (
                      <ProverbsTable
                        tableHeader={proverbTableHeader}
                        rows={result}
                      />
                    ) : (
                      checkWhoUserIs(user)
                    )}
                  </>
                ) : (
                  <div className="spinner" style={{ height: "250px" }}>
                    Loading...
                  </div>
                )
              )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default withAuth(Dashboard);
