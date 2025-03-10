import Head from 'next/head';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import withAuth from '@/utils/withAuth';
import ProverbTable from '../../components/UIElements/DataTable';
import { fetchEthnic } from '../../store/actions/ethnicAction';
import { proverbDataHeader } from '../../utils/utilities';


const EthnicData = () => {
    const { ethnics} = useSelector(state => state.Ethnics);
    const dispatch = useDispatch()

  useEffect(() => {
    if (!ethnics) {
        dispatch(fetchEthnic());
    }
  }, []);

  return (
    <div class="content">
      <div class="container-fluid">
        <div class="row">
          <div class="col-xl-12">
            {ethnics && ethnics.length > 0 ?  (
              <>
                <ProverbTable
                  title="Ethnicities"
                  tableHeader={proverbDataHeader}
                  id='datatable-buttons'
                >
                  {ethnics.map((value) => (
                   <tr key={value.id}>
                     
                      <td>{value.id}</td>
                      <td>{value.name}</td>
                      <td>{value.slug}</td>
                      <td>{value.date_created}</td>
                      <td>{value.date_modified}</td>

                 </tr>
                  ))}
                </ProverbTable>
                <br />
              </>
            ) : (
              <p>Loading</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default withAuth(EthnicData);
