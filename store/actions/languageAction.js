import * as types from "./actionTypes";
import {alertMessage, toggleIsLoading, logout} from './authActions';
import { FetchLanguages, 
  CreateLanguage, 
  UpdateLanguage, 
  DeleteLanguage,
  FetchLanguageEthnics,
  FetchLanguageProverbs} from '../../services/languageService';
import {
    FetchBatchProverbs,
  } from '../../services/proverbService';

export const getlanguages = (data) => {
  return {
      type: types.FETCH_LANGUAGE,
      payload: data
  }
}

export const getlanguageProverbs = (data) => {
  return {
      type: types.FETCH_LANGUAGE_PROVERBS,
      payload: data
  }
}

export const getlanguageEthnics = (data) => {
  return {
      type: types.FETCH_LANGUAGE_ETHNICS,
      payload: data
  }
}

export const createLanguages = (data) => {
  return {
      type: types.CREATE_LANGUAGE,
      payload: data
  }
}

export const updateLanguages = (data) => {
  return {
      type: types.UPDATE_LANGUAGE,
      payload: data
  }
}

export const deleteLanguages = (data) => {
  return {
      type: types.DELETE_LANGUAGE,
      payload: data
  }
}



export const fetchLanguages = () => {
  return async dispatch => {
      await dispatch(toggleIsLoading())
      FetchLanguages()
          .then(async result => {
            // console.log(result)
              const data = result.data;
              await dispatch(getlanguages(data))
              dispatch(toggleIsLoading())         
          }).catch((err) => {
            if(err && err.response.status == '401'){
              dispatch(alertMessage('Token Expired, Not Authorized', 'FAILURE'));
              dispatch(logout())
            }
            if(err && err.response.status == '400'){
              dispatch(alertMessage('Bad Request', 'FAILURE'));
            }
            else{
              alertMessage("error fetching languages") 
            }
            dispatch(toggleIsLoading())
            });

  }
}


export const fetchLanguageProverbs = (selectedEthnics) => {
  return async dispatch => {
      await dispatch(toggleIsLoading())
      FetchLanguageProverbs(selectedEthnics)
          .then(async result => {
            console.log(result)
              const data = result.data;
              await dispatch(getlanguageProverbs(data))
              dispatch(toggleIsLoading())         
          }).catch((err) => {
            if(err && err.response.status == '401'){
              dispatch(alertMessage('Token Expired, Not Authorized', 'FAILURE'));
              dispatch(logout())
            }
            if(err && err.response.status == '400'){
              dispatch(alertMessage('Bad Request', 'FAILURE'));
            }
            else{
              alertMessage("error fetching languages") 
            }
            dispatch(toggleIsLoading())
            });

  }
}

export const fetchBatchLanguageProverbs = (url) => {
  return async (dispatch) => {
    await dispatch(toggleIsLoading());
    FetchBatchProverbs(url)
      .then(async (result) => {
        console.log(result);
        if (result.status === 200) {
          dispatch(getlanguageProverbs(result.data));
          dispatch(toggleIsLoading());
        } else if (result.status === 401) {
          dispatch(logout('Unauthorized Access'));
          dispatch(toggleIsLoading());
        } else {
          dispatch(alertMessage('COULD NOT FETCH DATA', 'ERROR'));
          dispatch(toggleIsLoading());
        }
      })
      .catch((err) => {
        if(err && err.response.status == '401'){
          dispatch(alertMessage('Token Expired, Not Authorized', 'FAILURE'));
          dispatch(logout())
        }
        if(err && err.response.status == '400'){
          dispatch(alertMessage('Bad Request', 'FAILURE'));
        }
        dispatch(toggleIsLoading());
      });
  };
};


export const fetchLanguageEthnics = (selectedEthnics) => {
  return async dispatch => {
      await dispatch(toggleIsLoading())
      FetchLanguageEthnics(selectedEthnics)
          .then(async result => {
            console.log(result)
              const data = result.data;
              await dispatch(getlanguageEthnics(data))
              dispatch(toggleIsLoading())         
          }).catch((err) => {
            if(err && err.response.status == '401'){
              dispatch(alertMessage('Token Expired, Not Authorized', 'FAILURE'));
              dispatch(logout())
            }
            if(err && err.response.status == '400'){
              dispatch(alertMessage('Bad Request', 'FAILURE'));
            }
            else{
              alertMessage("error fetching languages") 
            }
            dispatch(toggleIsLoading())
            });

  }
}

export const createLanguage = (data) => {
  return async dispatch => {
      await dispatch(toggleIsLoading());
      CreateLanguage(data)
          .then(async result => {
            console.log(result);
              if (result.status === 201) {
                const resdata = result.data;
                const newdata = resdata;
                dispatch(createLanguages(newdata))
                dispatch(toggleIsLoading())
                dispatch(alertMessage("Ethnic created successfully", 'SUCCESS'));
            }else if (result.status === 401) {
              dispatch(logout('Unauthorized Access'));
              dispatch(toggleIsLoading());
            }
              
          }).catch((err) => {
            if(err && err.response.status == '401'){
              dispatch(alertMessage('Token Expired, Not Authorized', 'FAILURE'));
              dispatch(logout())
            }
            if(err && err.response.status == '400'){
              dispatch(alertMessage('Bad Request', 'FAILURE'));
            }
            else{
              dispatch(alertMessage('unable to create Ethnic', 'FAILURE'));
            }
            dispatch(toggleIsLoading())
            
          });
  }
}

export const updateLanguage = (data) => {
  return async dispatch => {
      await dispatch(toggleIsLoading());
      UpdateLanguage(data)
          .then(async result => {
              if (result.status === 200) {
                const resdata = result.data;
                // console.log(resdata)
                dispatch(updateLanguages(resdata));
                dispatch(toggleIsLoading());
                dispatch(alertMessage("Ethnic updated successfully", 'SUCCESS'));
            } else if (result.status === 401) {
              dispatch(logout('Unauthorized Access'));
              dispatch(toggleIsLoading());
            } else{
              dispatch(alertMessage(result.data.name, 'SUCCESS'));
                dispatch(toggleIsLoading());
            }
          }).catch((err) => {
            if(err && err.response.status == '401'){
              dispatch(alertMessage('Token Expired, Not Authorized', 'FAILURE'));
              dispatch(logout())
            }
            if(err && err.response.status == '400'){
              dispatch(alertMessage('Bad Request', 'FAILURE'));
            }
            else{
              dispatch(alertMessage("Unable to update successfully", 'FAILURE'));
            }
            dispatch(toggleIsLoading())
          });
  }
}

export const deleteLanguage = (data) => {
  console.log(data);
  return async dispatch => {
      await dispatch(toggleIsLoading())
      DeleteLanguage(data)
          .then(async result => {
            console.log(result)
              if (result.status === 204) {
                dispatch(deleteLanguages(data));
                dispatch(toggleIsLoading());
                dispatch(alertMessage("Ethnic successfully deleted", 'SUCCESS'));
            } else if (result.status === 401) {
              dispatch(logout('Unauthorized Access'));
              dispatch(toggleIsLoading());
            } else{
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
            else{
              dispatch(alertMessage("unable to delete successfully", 'FAILURE'));
            }
            dispatch(toggleIsLoading())
          });
  }
}