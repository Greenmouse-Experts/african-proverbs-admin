import * as types from "./actionTypes";
import {toggleIsLoading} from './authActions';
import { FetchCategory, 
  CreateCategory, 
  UpdateCategory,
  DeleteCategory } from '../../services/categoryService';
import {alertMessage, logout} from './authActions';


export const getCategories = (data) => {
  return {
      type: types.FETCH_CATEGORY,
      payload: data
  }
}

export const createCategories = (data) => {
  return {
      type: types.CREATE_CATEGORY,
      payload: data
  }
}

export const updateCategories = (data) => {
  return {
      type: types.UPDATE_CATEGORY,
      payload: data
  }
}

export const deleteCategories = (data) => {
  return {
      type: types.DELETE_CATEGORY,
      payload: data
  }
}


export const fetchCategories = () => {
  console.log('<><><><><><><its hereer inside ctegriesnjjfjjf')
  return async dispatch => {
      await dispatch(toggleIsLoading())
      FetchCategory()
          .then(async result => {
            console.log(result)
            if (result.status===200){
              const data = result.data;
              await dispatch(getCategories(data))
              dispatch(toggleIsLoading()) 
            }else{
              dispatch(alertMessage('Error Fetching categories', 'FAILURE'));
            }
                      
          }).catch((error) => {
            console.log(error);
            dispatch(alertMessage('Error Fetching categories', 'FAILURE'));
            error
          });

  }
}


export const createCategory = (data) => {
  return async dispatch => {
      await dispatch(toggleIsLoading())
      CreateCategory(data)
          .then(async result => {
            // console.log("result",result);
              if (result.status === 201) {
                const data = result.data;
                // console.log(data)
                dispatch(createCategories(data))
                dispatch(toggleIsLoading())
                dispatch(alertMessage("Category created successfully", 'SUCCESS'));
            }else if (result.status === 401) {
              dispatch(logout('Unauthorized Access'));
              dispatch(toggleIsLoading());
            } 
            else{
                dispatch(alertMessage(result.data.name, 'FAILURE'));
                dispatch(toggleIsLoading())
            }
              
          }).catch((err) => {
            console.log("error", err);
            if(err && err.response.status == '401'){
              dispatch(alertMessage('Token Expired, Not Authorized', 'FAILURE'));
              dispatch(logout())
            }
            if(err && err.response.status == '400'){
              dispatch(alertMessage('Bad Request', 'FAILURE'));
            }
            dispatch(toggleIsLoading())
          });

  }
}

export const updateCategory = (data) => {
  console.log(data);
  return async dispatch => {
      await dispatch(toggleIsLoading());
      UpdateCategory(data)
          .then(async result => {
            console.log(result);
              if (result.status === 200) {
                const ndata = result.data;
                console.log(ndata)
                dispatch(updateCategories(ndata))
                dispatch(toggleIsLoading())
                dispatch(alertMessage("Category updated successfully", 'SUCCESS'));
            } else if (result.status === 401) {
              dispatch(logout('Unauthorized Access'));
              dispatch(toggleIsLoading());
            } else{
                dispatch(alertMessage(result.data.name, 'FAILURE'));
                dispatch(toggleIsLoading())
            }
              
          }).catch((err) => {
            if(err && err.response.status == '401'){
              dispatch(alertMessage('Token Expired, Not Authorized', 'FAILURE'));
              dispatch(logout())
            }
            if(err && err.response.status == '400'){
              dispatch(alertMessage('Bad Request', 'FAILURE'));
            }
            dispatch(toggleIsLoading())
          });
  }
}

export const deleteCategory = (data) => {
  console.log(data);
  return async dispatch => {
      await dispatch(toggleIsLoading())
      DeleteCategory(data)
          .then(async result => {
            if (result.status === 204) {
                dispatch(deleteCategories(data))
                dispatch(toggleIsLoading())
                dispatch(alertMessage("Category successfully deleted", 'SUCCESS'));
            } else if (result.status === 401) {
              dispatch(logout('Unauthorized Access'));
              dispatch(toggleIsLoading());
            } else{
                dispatch(toggleIsLoading())
                dispatch(alertMessage(result.data.name, 'FAILURE'));
            } 
          }).catch((err) => {
            if(err && err.response.status == '401'){
              dispatch(alertMessage('Token Expired, Not Authorized', 'FAILURE'));
              dispatch(logout())
            }
            if(err && err.response.status == '400'){
              dispatch(alertMessage('Bad Request', 'FAILURE'));
            }
            dispatch(toggleIsLoading())
          });
  }
}