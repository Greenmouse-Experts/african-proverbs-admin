import Head from 'next/head';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import withAuth from '@/utils/withAuth';
import ProverbTable from '../../components/UIElements/DataTable';
import { fetchCategories } from '../../store/actions/categoryAction';
import { proverbDataHeader } from '../../utils/utilities';


const CategoryData = () => {
    const { categories } = useSelector(state => state.Categories);
  
    const dispatch = useDispatch()

  useEffect(() => {

    if (!categories) {
        dispatch(fetchCategories());
    }
  }, []);

  return (
    <div class="content">
      <div class="container-fluid">
      
        <div class="row">
          <div class="col-xl-12">
            { categories && categories.length > 0 ?  (
              <>
                <ProverbTable
                  title="Categories"
                  tableHeader={proverbDataHeader}
                  id='datatable-buttons-1'
                >
                  {categories.map((value) => (
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

export default withAuth(CategoryData);
