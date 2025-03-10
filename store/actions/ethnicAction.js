import * as types from "./actionTypes";
import { toggleIsLoading } from './authActions';
import {
  FetchEthnic,
  FetchAffiliateLanguageByID,
  DeleteAffiliatedLanguage,
  CreateEthnic,
  UpdateEthnic,
  DeleteEthnic, CreateAffiliatedLanguage
} from '../../services/ethnicService';
import { alertMessage } from './authActions';
import { logout } from './authActions';

export const getEthnics = (data) => {
  return {
    type: types.FETCH_ETHNIC,
    payload: data
  }
}

export const getAffiliatedLanguagebyId = (data) => {
  return {
    type: types.FETCH_AFFILIATEDLANGUAGEBYID,
    payload: data
  }
}

export const resetAffiliate = () => ({
  type: types.RESET_AFFILIATE,
});


export const updateEthnics = (data) => {
  return {
    type: types.UPDATE_ETHNIC,
    payload: data
  }
}

export const deleteEthnics = (data) => {
  return {
    type: types.DELETE_ETHNIC,
    payload: data
  }
}



export const createAffiliatedLanguage = (data) => {
  return {
    type: types.CREATE_AFFILIATEDLANGUAGE,
    payload: data
  }
}

export const deleteAffiliatedLanguage = (affiliateId) => {
  return {
    type: types.DELETE_AFFILIATEDLANGUAGE,
    payload: affiliateId
  }
}


export const fetchEthnic = () => {
  return async dispatch => {
    await dispatch(toggleIsLoading())
    FetchEthnic()
      .then(async result => {

        if (result.status === 200) {
          const data = result.data;
          await dispatch(getEthnics(data));
          dispatch(toggleIsLoading());
        } else {
          dispatch(alertMessage('Error Fetching Ethnics', 'FAILURE'));
        }
      }).catch((err) => {
        if (err && err.response.status == '401') {
          dispatch(alertMessage('Token Expired, Not Authorized', 'FAILURE'));
          dispatch(logout())
        }
        if (err && err.response.status == '400') {
          dispatch(alertMessage('Bad Request', 'FAILURE'));
        }
        // else {
        //   dispatch(alertMessage('Error Fetching categories', 'FAILURE'));
        // }
        dispatch(toggleIsLoading())

      });
  }
}



export const fetchAffiliatedLanguagebyId = (id) => {
  return async (dispatch) => {
    try {
      dispatch(toggleIsLoading(true));

      const result = await FetchAffiliateLanguageByID(id);

      if (result.status === 200) {
        const data = result.data;
        dispatch(getAffiliatedLanguagebyId(data));
      } else {
        dispatch(alertMessage('Error Fetching Affiliated Language', 'FAILURE'));
      }
    } catch (err) {
      if (err && err.response) {
        if (err.response.status === 401) {
          dispatch(alertMessage('Token Expired, Not Authorized', 'FAILURE'));
          dispatch(logout());
        } else if (err.response.status === 400) {
          dispatch(alertMessage('Bad Request', 'FAILURE'));
        }
      } else {
        dispatch(alertMessage('Error Fetching Affiliated Language', 'FAILURE'));
      }
    } finally {
      dispatch(toggleIsLoading(false));
    }
  };
};


export const createEthnic = (data) => {
  return async dispatch => {
    await dispatch(toggleIsLoading());
    CreateEthnic(data)
      .then(async result => {
        // console.log(result);
        if (result.status === 201) {
          result.data['batchurl'] = "api/proverbs/ethnic/";
          dispatch({
            type: types.CREATE_ETHNIC,
            payload: result.data
          })
          dispatch(toggleIsLoading())
          dispatch(alertMessage("Ethnic created successfully", 'SUCCESS'));
        } else if (result.status === 401) {
          dispatch(logout('Unauthorized Access'));
          dispatch(toggleIsLoading());
        }

      }).catch((err) => {
        console.log("Err", err);
        if (err.response) {
          if (err.response.status === 401) {
            dispatch(alertMessage('Token Expired, Not Authorized', 'FAILURE'));
            dispatch(logout());
          } else if (err.response.status === 404) {
          
            dispatch(alertMessage('Language not found. Please check the ID and try again.', 'FAILURE'));
          } else if (err.response.status === 400) {
            dispatch(alertMessage('Bad Request', 'FAILURE'));
          } else if (err.response.status === 409) {
          
            dispatch(alertMessage('Operation failed due to a data integrity issue.', 'FAILURE'));
          }
        } else if (err.request) {
          dispatch(alertMessage('Error, Please contact Admin', 'FAILURE'));
        } else {
          dispatch(alertMessage('Error Connecting to the internet', 'FAILURE'));
        }
        dispatch(toggleIsLoading());
      });
  }
}

export const updateEthnic = (data, id) => {
  return async dispatch => {
    await dispatch(toggleIsLoading());
    UpdateEthnic(data, id)
      .then(async result => {
        if (result.status === 200) {
          const resdata = result.data;
          const newdata = resdata;
          // console.log(resdata)
          dispatch(updateEthnics(newdata));
          dispatch(toggleIsLoading());
          dispatch(alertMessage("Ethnic updated successfully", 'SUCCESS'));
        } else if (result.status === 401) {
          dispatch(logout('Unauthorized Access'));
          dispatch(toggleIsLoading());
        } else {
          dispatch(alertMessage(result.data.name, 'SUCCESS'));
          dispatch(toggleIsLoading());
        }
      }).catch((err) => {
        console.log("Err", err);

        if (err.response) {
          if (err.response.status === 401) {
            dispatch(alertMessage('Token Expired, Not Authorized', 'FAILURE'));
            dispatch(logout());
          } else if (err.response.status === 404) {
           
            dispatch(alertMessage('Language not found. Please check the ID and try again.', 'FAILURE'));
          } else if (err.response.status === 400) {
            dispatch(alertMessage('Bad Request', 'FAILURE'));
          } else if (err.response.status === 409) {
           
            dispatch(alertMessage('Operation failed due to a data integrity issue.', 'FAILURE'));
          }
        } else if (err.request) {
          dispatch(alertMessage('Error, Please contact Admin', 'FAILURE'));
        } else {
          dispatch(alertMessage('Error Connecting to the internet', 'FAILURE'));
        }
        dispatch(toggleIsLoading());
      });
  }
}

export const deleteEthnic = (data) => {
  // console.log(data);
  return async dispatch => {
    await dispatch(toggleIsLoading())
    DeleteEthnic(data)
      .then(async result => {
        // console.log(result)
        if (result.status === 204) {
          dispatch(deleteEthnics(data));
          dispatch(toggleIsLoading());
          dispatch(alertMessage("Ethnic successfully deleted", 'SUCCESS'));
        } else if (result.status === 401) {
          dispatch(logout('Unauthorized Access'));
          dispatch(toggleIsLoading());
        } else {
          dispatch(toggleIsLoading());
          dispatch(alertMessage(result.data.name, 'FAILURE'));
        }
      }).catch((err) => {
        if (err.response) {
          if (err.response.status == '401') {
            dispatch(alertMessage('Token Expired, Not Authorized', 'FAILURE'));
            dispatch(logout())
          } else if (err.response.status == '400') {
            dispatch(alertMessage('Bad Request', 'FAILURE'));
          }
        } else if (err.request) {
          dispatch(alertMessage('Error, Please contact Admin', 'FAILURE'));
        } else {
          dispatch(alertMessage('Error Connecting to the internet', 'FAILURE'));
        }
        dispatch(toggleIsLoading());
      });
  }
}


export const deleteAffiliateLanguage = (affiliateId) => {
  // console.log(data);
  return async dispatch => {
    await dispatch(toggleIsLoading())
    DeleteAffiliatedLanguage(affiliateId)
      .then(async result => {
        // console.log(result)
        if (result.status === 204 || result.status === 200) {
          dispatch(deleteAffiliatedLanguage(affiliateId));
          dispatch(toggleIsLoading());
          dispatch(alertMessage("Affiliated Language successfully deleted", 'SUCCESS'));
        } else if (result.status === 401) {
          dispatch(logout('Unauthorized Access'));
          dispatch(toggleIsLoading());
        } else {
          dispatch(toggleIsLoading());
          dispatch(alertMessage(result.data.name, 'FAILURE'));
        }
      }).catch((err) => {
        if (err.response) {
          if (err.response.status == '401') {
            dispatch(alertMessage('Token Expired, Not Authorized', 'FAILURE'));
            dispatch(logout())
          } else if (err.response.status == '400') {
            dispatch(alertMessage('Bad Request', 'FAILURE'));
          }
        } else if (err.request) {
          dispatch(alertMessage('Error, Please contact Admin', 'FAILURE'));
        } else {
          dispatch(alertMessage('Error Connecting to the internet', 'FAILURE'));
        }
        dispatch(toggleIsLoading());
      });
  }
}


export const createAffiliateLan = (data) => {
  return async dispatch => {
    await dispatch(toggleIsLoading());
    CreateAffiliatedLanguage(data)
      .then(async result => {
        if (result.status === 201 || result.status === 200) {
          const createdAffiliate = result.data;
          dispatch(createAffiliatedLanguage(createdAffiliate));
          dispatch(toggleIsLoading());
          dispatch(alertMessage("Affiliated Language created successfully", 'SUCCESS'));
        } else if (result.status === 401) {
          dispatch(logout('Unauthorized Access'));
          dispatch(toggleIsLoading());
        } else {
          dispatch(toggleIsLoading());
          dispatch(alertMessage(result.data.name, 'FAILURE'));
        }
      })
      .catch((err) => {
        if (err.response) {
          if (err.response.status === 401) {
            // Handle unauthorized access
          } else if (err.response.status === 404) {
            // console.log('Ethnic Language ID not Found');
            dispatch(alertMessage("Ethnic Language ID not Found", 'FAILURE'));
          } else if (err.response.status === 400) {
            dispatch(alertMessage(err.response.data.userMessages || 'Bad Request', 'FAILURE'));
          } else if (err.response.status == "500") {
            dispatch(alertMessage("Server down, Try Again", "FAILURE"));
          } else if (err.response.status === 409) {
            dispatch(alertMessage('Already Existed.', 'FAILURE'));
          }
        } else if (err.request) {
          dispatch(alertMessage('Error, Please contact Admin', 'FAILURE'));
        } else {
          dispatch(alertMessage('Error Connecting to the internet', 'FAILURE'));
        }

        dispatch(toggleIsLoading());
      });
  };
};
