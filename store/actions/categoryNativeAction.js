import * as types from "./actionTypes";
import {toggleIsLoading} from './authActions';
import { FetchCategoryNativeName, 
    CreateCategoryNativeName, 
    UpdateCategoryNativeName,
  DeleteCategoryNativeName } from '../../services/categoryNativeService';
import {alertMessage} from './authActions';
import { logout } from './authActions';

export const getCategoryNativeNames = (data) => {
  return {
      type: types.ACTIVE_CATEGORY,
      payload: data
  }
}

export const createCategoryNativeNames = (data) => {
  return {
      type: types.CREATE_CATEGORY_NATIVE_NAME,
      payload: data
  }
}

export const updateCategoryNativeNames = (data) => {
  return {
      type: types.UPDATE_CATEGORY_NATIVE_NAME,
      payload: data
  }
}

export const deleteCategoryNativeNames = (data) => {
  return {
      type: types.DELETE_CATEGORY_NATIVE_NAME,
      payload: data
  }
}


export const fetchCategoryId = (payload) => {
  return async dispatch => {
    console.log(payload)
      await dispatch(toggleIsLoading())
      FetchCategoryNativeName(payload)
          .then(async result => {
              // console.log(result)
              if (result.status===200){
                const data = result.data;
                await dispatch(getCategoryNativeNames(data))
                dispatch(toggleIsLoading())
              }else{
                dispatch(alertMessage('Error Fetching category Native Names', 'FAILURE'));
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


export const createCategoryNativeName = (data) => {
  return async dispatch => {
      await dispatch(toggleIsLoading())
      CreateCategoryNativeName(data)
          .then(async result => {
            // console.log(result);
              if (result.status === 201) {
                const resdata = result.data;
                console.log(resdata)
                // const newdata = {
                //     id: resdata.id,
                //     name: resdata.name,
                //     language: resdata.language
                // }
                const newdata = resdata;
                console.log(newdata);
                dispatch(createCategoryNativeNames(newdata))
                dispatch(toggleIsLoading())
                dispatch(alertMessage("category Native Name created successfully", 'SUCCESS'));
            }else if(result.status === 400){
              dispatch(toggleIsLoading())
              dispatch(alertMessage("Duplicate not allowed", 'FAILURE'));
            }else if (result.status === 401) {
              dispatch(logout('Unauthorized Access'));
              dispatch(toggleIsLoading());
            } 
            else{
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

export const updateCategoryNativeName = (data) => {
  console.log(data);
  return async dispatch => {
      await dispatch(toggleIsLoading())
      UpdateCategoryNativeName(data)
          .then(async result => {
              if (result.status === 200) {
                console.log(result)
                const resdata = result.data;
              //   const newdata = {
              //     id: resdata.id,
              //     name: resdata.name,
              //     language: resdata.language
              // }
              const newdata = resdata;
                console.log(newdata);
                dispatch(updateCategoryNativeNames(newdata));
                dispatch(toggleIsLoading());
                dispatch(alertMessage("category Native Name updated successfully", 'SUCCESS'));
            }else if (result.status === 401) {
              dispatch(logout('Unauthorized Access'));
              dispatch(toggleIsLoading());
            } 
            else{
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

export const deleteCategoryNativeName = (data) => {
  console.log(data);
  return async dispatch => {
      await dispatch(toggleIsLoading())
      DeleteCategoryNativeName(data)
          .then(async result => {
            console.log(result)
              if (result.status === 204) {
                dispatch(deleteCategoryNativeNames(data));
                dispatch(toggleIsLoading());
                dispatch(alertMessage("category Native Name successfully deleted", 'SUCCESS'));
            } else if (result.status === 401) {
              dispatch(logout('Unauthorized Access'));
              dispatch(toggleIsLoading());
            } 
            else{
                dispatch(toggleIsLoading());
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