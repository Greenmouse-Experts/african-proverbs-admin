import Head from 'next/head';
import Link from 'next/link';
import React, { useEffect, useState, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import withAuth from '@/utils/withAuth';
import ProverbTable from '../../components/UIElements/DataTable';
import {
  deleteProverb,
  updateProverb,
} from '../../store/actions/proverbActions';
import {
  trimText,
  htmlFilter,
  languageProverbTableHeader,
  fetchFirstNthItems,
  convTime,
  retrieveEtnicNames,
  checkPermission,
  checkWhoUserIs
} from '../../utils/utilities';
import { Alert } from '../../components/UIElements';

import { UpdateProverb } from '../../parts/SubPages';
import ReactTooltip from "react-tooltip";
import ProverbPopUp from '../../components/widgets/ProverbPopUp';
import Loader from '../../components/UIElements/Loader';
import { toggleIsLoading } from '../../store/actions/authActions';
import {fetchLanguageProverbs, fetchBatchLanguageProverbs} from '../../store/actions/languageAction';


const LanguageViewProverb = ({selectedProverbs, closeProverb}) => {
  const dispatch = useDispatch();
  const { isLoading } = useSelector((state) => state.proverb);
  const { languageProverb, links, languages, isLoadinglanguages } = useSelector(state => state.Languages);
  const { user } = useSelector((state) => state.auth);
  const [open, setOpen] = useState(false);
  const [proverbData, setProverbData] = useState(null);
  const [updateData, setUpdateData] = useState(null);


  useEffect(() => {
    if(isLoading){
        dispatch(toggleIsLoading())
    }
    dispatch(fetchLanguageProverbs(selectedProverbs));
  }, [user]);

  const updateProverbHandler = (value) => {
    setUpdateData(value);
  };

  const handleClickOpen = (id, slug) => {
    setProverbData({
      proverbId: id, slug
    })
    setOpen(true);
  };

  const handleClose = () => {
    setProverbData(null)
    setOpen(false);
  };

  // * update status
  const updateProverbStatusHandler = (status, proverb) => {
    const payload = {
      content: proverb.content,
      category: proverb.categories.map((val) => val.id),
      ethnic: proverb.ethnic.id,
      status: status,
    };

    const { slug, id } = proverb;
    if (status==="ACCEPTED" || status==="REJECTED"){
      payload['reviewer']=user.id;
    }else if(status==="PUBLISHED" || status==="UNPUBLISHED"){
      payload['publisher']=user.id;
    }
    dispatch(updateProverb(payload, id, slug));
  };

  // * Delete proverb
  const deleteProverbHandler = ({ proverbId, slug }) => {
    console.log(slug)
    console.log(proverbId)
    dispatch(deleteProverb(proverbId, slug));
    setProverbData(null)
    setOpen(false)
  };

  const handleFetchProverbBatch = (url) => {
    var ethn = retrieveEtnicNames(user.ethnics);
      var nethnics = ethn.toString();
    dispatch(fetchBatchLanguageProverbs( url))
  }

  // * Show updatePage
  if (updateData)
    return (
      <UpdateProverb
        updateData={updateData}
        closesUpdate={() => setUpdateData(null)}
      />
    );

  return (
        <div className="row">
          <div className="col-xl-12">
          <a onClick={() => closeProverb()} class='btn btn-primary button-last'><i class="mdi mdi-window-close text-danger"></i></a>
            {
              !isLoading ?
              user && languageProverb ? (
                languageProverb.content.length>0 ? (
                <>
                  <ProverbTable
                    title="All Proverbs"
                    tableHeader={languageProverbTableHeader}
                    id='datatable-buttons'
                    showButton = {true}
                    links={links}
                    isLoading={isLoading}
                    handleFetchProverbBatch={(url)=>handleFetchProverbBatch(url)}
                  >
                    
                      {languageProverb.content.map((value) => (
                        <tr key={value.id}>
                        <td>{htmlFilter(value.content)}</td>
                        <td>
                          {value.categories ? (
                            <>
                              {' '}
                              {fetchFirstNthItems(value.categories, 1).map(
                                (cat) => cat.name
                              ) + ' ... '}
                            </>
                          ) : (
                            '...'
                          )}
                        </td>
                        <td>{value.ethnic && value.ethnic.name}</td>
                        <td>
                          <span class={'badge badge-info'}>{value.status}</span>
                        </td>
                        <td>{convTime(value.date_created)}</td>
                      </tr>
                      ))}
                  </ProverbTable>
                  
                  <br />
                  <ProverbPopUp open={open} handleClose={handleClose} deleteProverbHandler={deleteProverbHandler} proverbData={proverbData} />
                </>)
                : (checkWhoUserIs(user))
                )
              : (<div class="spinner">Loading...</div>) : (<div class="spinner">Loading...</div>) }
          </div>
        </div>
  );
};

export default LanguageViewProverb;
