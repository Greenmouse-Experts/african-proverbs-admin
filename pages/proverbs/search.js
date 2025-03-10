import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import withAuth from "@/utils/withAuth";
import ProverbTable from "@/components/UIElements/DataTable";
import {
  fetchBatchProverbs,
  fetchProverbspreview,
  searchProverbs,
} from "@/store/actions/proverbActions";
import {
  proverbTableHeader,
  retrieveEtnicNames,
  checkWhoUserIs,
} from "@/utils/utilities";
import { Alert, SearchInput } from "@/components/UIElements";
import { useRouter } from "next/router";
import TableBody from "@/parts/proverbTable/ProverbTableBody";
import ProverbsTable from "@/parts/proverbTable/ProverbTable";

const Search = () => {
  const router = useRouter();
  const { search, page } = router.query;
  const dispatch = useDispatch();
  const { searchResult, links, isLoading, count } = useSelector(
    (state) => state.proverb,
  );
  const { user, msg } = useSelector((state) => state.auth);

  console.log(search)
  useEffect(() => {
    if (user) {
      getData();
    }
  }, [searchProverbs, user, search, page]);
  console.log("searchResult", searchResult);

  const getData = () => {
    var ethn = retrieveEtnicNames(user.ethnics);
    var nethnics = ethn.toString();
    dispatch(
      searchProverbs(
        user.roles,
        nethnics,
        decodeURIComponent(search).toString(),
        page,
      ),
    );
  };

  return (
    <div className="content">
      {msg && <Alert key={new Date()} payload={msg} />}
      <div className="container-fluid">
        <div className="row">
          <div className="col-xl-12 mb-5">
            {
              // !isLoading ?
              user && searchResult !== null ? (
                <>
                  {searchResult?.content?.length > 0 ? (
                    <>
                      <div className="row">
                        <div className="col-sm-12 col-md-5">
                          <div className="card-box">
                            <h4 className="header-title mt-0">
                              Search Proverbs
                            </h4>
                            <SearchInput
                              placeholder={"Search Proverb"}
                              routeSearch
                            />
                          </div>
                        </div>
                      </div>

                      <ProverbsTable
                        tableHeader={proverbTableHeader}
                        rows={searchResult?.content}
                        handleFetchProverbBatch={() => getData()}
                        roles={user.roles}
                        showButton={true}
                        links={searchResult?.batchurl}
                        rowLength={Number(searchResult?.totalElements)}
                        isLoading={isLoading}
                        type={"search"}
                      />

                      {/*<ProverbTable*/}
                      {/*  title="All Proverbs"*/}
                      {/*  tableHeader={proverbTableHeader}*/}
                      {/*  id='datatable-buttons'*/}
                      {/*  showButton={true}*/}
                      {/*  links={links}*/}
                      {/*  isLoading={isLoading}*/}
                      {/*  handleFetchProverbBatch={(url) => handleFetchProverbBatch(url)}*/}
                      {/*  roles={user.roles}*/}
                      {/*  goBack={true}*/}
                      {/*>*/}
                      {/*  {searchResult.content.map((value) => (*/}
                      {/*    <TableBody value={value} />*/}
                      {/*  ))}*/}
                      {/*</ProverbTable>*/}
                    </>
                  ) : (
                    checkWhoUserIs(user)
                  )}
                </>
              ) : (
                <div className="spinner">Loading...</div>
              )
            }
          </div>
        </div>
      </div>
    </div>
  );
};

export default withAuth(Search);
