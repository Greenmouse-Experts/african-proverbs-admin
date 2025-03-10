import React, { useEffect, useState} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  fetchProverbspreview,
} from '@/store/actions/proverbActions';
import {
htmlFilter,
  fetchFirstNthItems,
  convTime,
  retrieveEtnicNames,
} from '@/utils/utilities';
import ReactTooltip from "react-tooltip";
import { toggleIsLoading } from '@/store/actions/authActions';
import Router from 'next/router'


const TableBody = ({value}) => {
  const dispatch = useDispatch();
  const { result, isLoading } = useSelector((state) => state.proverb);
  const { user } = useSelector((state) => state.auth);


  useEffect(() => {
    if(result && isLoading){
        dispatch(toggleIsLoading())
    }
    if (user && result==null) {
      var ethn = retrieveEtnicNames(user.ethnics);
      var nethnics = ethn.toString();
      dispatch(fetchProverbspreview(user.roles, nethnics));
    }
  }, [user]);


  return (
    <>
    {value && (<tr  key={value.id}>
      <td>{htmlFilter(value.content)}</td>
      <td>
        {value.categories ? (
          // <>
          //   {' '}
          //   {fetchFirstNthItems(value.categories, 1).map(
          //     (cat) => cat.name
          //   ) + ' ... '}
          // </>

          <>
            {' '}
            {fetchFirstNthItems(value.categories.split(","), 1) + ' ... '}
          </>
        ) : (
          '...'
        )}
      </td>
      <td>{value.ethnic && value.ethnic}</td>
      <td>{value.origin && value.origin}</td>
      <td>
        <span class={'badge badge-info'}>{value.status}</span>
      </td>
      <td>{convTime(value.date_created)}</td>
      <td>
      <ul className="list-inline mb-0">
          <li className="list-inline-item">
              <a
                data-tip
                data-for="view"
                className="icon circle-icon "
                onClick={() => Router.push({pathname: '/proverbs/details',query: {q: value.id}}) }
              >
                <i className="mdi mdi-eye text-purple"></i>
              </a>
            {/* </Link> */}
            <ReactTooltip id="view" place="top" effect="solid">
              View Proverb
            </ReactTooltip>
          </li>
        </ul>
      </td>
    </tr>)
                      }
    </>
    );
};

export default TableBody;
