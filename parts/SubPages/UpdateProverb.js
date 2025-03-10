import Head from 'next/head';
import React, { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import {
  Select,
  MultiSelectComponent,
} from '../../components/UIElements/InputField';
import { useForm, Controller } from 'react-hook-form';
import { makeStyles, IconButton } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import { fetchEthnic } from '../../store/actions/ethnicAction';
import { fetchCategories } from '../../store/actions/categoryAction';
import { updateProverb } from '../../store/actions/proverbActions';
import {
  formatCategoryOptions,
  retrieveCategoryArray,
} from '../../utils/utilities';
import ProverbForm from '../forms/ProverbForm'

const ReactQuill = dynamic(() => import('react-quill'), { ssr: false });

const UpdateProverb = ({ closesUpdate, updateData }) => {
  
  
  const initialOption = [
    { label: "Choose a category", value: " ", disabled: true }, 
  ];
  

  const dispatch = useDispatch();
  const { ethnics } = useSelector((state) => state.Ethnics);
  const { categories } = useSelector((state) => state.Categories);
  const { isLoading } = useSelector((state) => state.proverb);
  // const formatSelectedCategory  = formatCategoryOptions(updateData.categories)
  // const [selected, setSelected] = useState(formatSelectedCategory);
  const [hidden, setHidden] = useState(updateData.hidden ? updateData.hidden : true);
  const { user, msg } = useSelector(state => state.auth);
  const [state, setstate] = useState({ country: '', region: '' });


  useEffect(() => {
    if (!ethnics) {
      dispatch(fetchEthnic());
    }
    if (!categories) {
      dispatch(fetchCategories());
    }
  }, []);


  return (
    <div class="content">
      <div class="container-fluid">
        <div class="row">
          <div class="col-md-12">
            <ProverbForm requestType="Update" updateData={updateData} closesUpdate={closesUpdate}/>
          </div>
        </div>
      </div>
    </div>
  );
};

const useStyles = makeStyles((theme) => ({
  error: {
    color: 'red',
    fontSize: 11,
  },
}));

export default UpdateProverb;
