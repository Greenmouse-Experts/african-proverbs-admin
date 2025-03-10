import * as actionTypes from "./actionTypes";
import {
  formatUrlByAuth,
  formatProcedureUrlByAuth,
} from "../../utils/utilities";
import Router from "next/router";
import {
  FetchProverbs,
  AddProverb,
  DeleteProverbTranslation,
  AddProverbTranslation,
  UpdateProverbCategory,
  AddProverbInterpretation,
  DeleteProverbInterpretation,
  UpdateProverbTranslation,
  UpdateProverbInterpretation,
  DeleteProverb,
  UpdateProverb,
  AddBatchProverbs,
  FetchSystemProverbs,
  fetchDashboardCount,
  FetchBatchProverbs,
  AddProverbReview,
  UpdateProverbReview,
  DeleteProverbReview,
  FetchSelectedProverbs,
  FetchProverbsView,
  SearchProverb,
  AddAudioRec,
  DeleteAudio,
  DownloadAudio,
  FetchProverbsViewPost,
} from "../../services/proverbService";
import { saveAs } from "file-saver";
import { logout, alertMessage } from "./authActions";
// import router from 'next/router';
import { useRouter } from "next/router";
import { useSelector } from "react-redux";

export const dashBoardCount = () => {
  return async (dispatch) => {
    await dispatch(toggleIsLoading());
    fetchDashboardCount()
      .then(async (result) => {
        dispatch(dashBoardAction(result.data));
        dispatch(toggleIsLoading());
      })
      .catch((err) => {
        if (err.response) {
          if (err.response.status == 401) {
            dispatch(alertMessage("Token Expired, Not Authorized", "FAILURE"));
            dispatch(logout());
          } else if (err.response.status == 400) {
            dispatch(alertMessage("Bad Request", "FAILURE"));
          }
        } else if (err.request) {
          dispatch(alertMessage("Error, Please contact Admin", "FAILURE"));
        } else {
          dispatch(alertMessage("Error Connecting to the internet", "FAILURE"));
        }
        dispatch(toggleIsLoading());
      });
  };
};

export const fetchDashboardProverbs = (data) => {
  return async (dispatch) => {
    dispatch(saveDashboardProverbs(data.splice(0, 5)));
    dispatch(toggleIsLoading());
  };
};

// export const fetchProverbs = (role, ethnics, dashboard) => {
//     return async (dispatch) => {
//         await dispatch(toggleIsLoading());
//         var url = formatUrlByAuth(role, ethnics)
//         FetchProverbs(url)
//             .then(async (result) => {
//                 if (result.status === 200) {
//                     result.data['batchurl'] = url;
//                     dispatch(saveProverbs(result.data));
//                     // if (dashboard) dispatch(fetchDashboardProverbs(result.data.content));
//                 } else if (result.status === 401) {
//                     dispatch(logout('Unauthorized Access'));
//                 } else {
//                     dispatch(alertMessage('COULD NOT FETCH DATA', 'ERROR'));
//                 }
//                 dispatch(toggleIsLoading());
//                 return;
//             })
//             .catch((err) => {
//                 if (err.response) {
//                     if (err.response.status == '401') {
//                         dispatch(alertMessage('Token Expired, Not Authorized', 'FAILURE'));
//                         dispatch(logout())
//                     } else if (err.response.status == '400') {
//                         dispatch(alertMessage('Bad Request', 'FAILURE'));
//                     }
//                 } else if (err.request) {
//                     dispatch(alertMessage('Error, Please contact Admin', 'FAILURE'));
//                 } else {
//                     dispatch(alertMessage('Error Connecting to the internet', 'FAILURE'));
//                 }
//                 dispatch(toggleIsLoading());
//             });
//     };
// };

export const searchProverbs = (roles, ethnics, search, page) => {
  console.log(roles, ethnics, search, page);
  return async (dispatch) => {
    await dispatch(toggleIsLoading());
    var url = formatProcedureUrlByAuth(roles, ethnics, "", search);
    // SearchProverb((url = `${url}&page=${Number(page || 0)}`))
    var payload = {
      page: 1,
      size: 100,
      ethnic_in: ethnics,
      //  status_in: filterStatus,
      q: search,
    };
    FetchProverbsViewPost(payload)
      .then(async (result) => {
        if (result.status === 200) {
          const data = result.data;
          // dispatch(saveProverbs(result.data));

          console.log(data);

          dispatch({
            type: actionTypes.SEARCH_PROVERB,
            payload: data,
          });
        } else if (result.status === 401) {
          dispatch(logout("Unauthorized Access"));
        } else {
          dispatch(alertMessage("COULD NOT FETCH DATA", "ERROR"));
        }
        dispatch(toggleIsLoading());
        return;
      })
      .catch((err) => {
        if (err.response) {
          if (err.response.status == 401) {
            dispatch(alertMessage("Token Expired, Not Authorized", "FAILURE"));
            dispatch(logout());
          } else if (err.response.status == 400) {
            dispatch(alertMessage("Bad Request", "FAILURE"));
          }
        } else if (err.request) {
          dispatch(alertMessage("Error, Please contact Admin", "FAILURE"));
        } else {
          dispatch(alertMessage("Error Connecting to the internet", "FAILURE"));
        }
        dispatch(toggleIsLoading());
      });
  };
};
// export const searchProverbs = (roles, ethnics, search, page) => {
//   return async (dispatch) => {
//     await dispatch(toggleIsLoading());
//     var url = formatProcedureUrlByAuth(roles, ethnics, "", search);
//     SearchProverb((url = `${url}&page=${Number(page || 0)}`))
//       .then(async (result) => {
//         if (result.status === 200) {
//           const data = result.data;

//           dispatch({
//             type: actionTypes.SEARCH_PROVERB,
//             payload: data,
//           });
//         } else if (result.status === 401) {
//           dispatch(logout("Unauthorized Access"));
//         } else {
//           dispatch(alertMessage("COULD NOT FETCH DATA", "ERROR"));
//         }
//         dispatch(toggleIsLoading());
//         return;
//       })
//       .catch((err) => {
//         if (err.response) {
//           if (err.response.status == 401) {
//             dispatch(alertMessage("Token Expired, Not Authorized", "FAILURE"));
//             dispatch(logout());
//           } else if (err.response.status == 400) {
//             dispatch(alertMessage("Bad Request", "FAILURE"));
//           }
//         } else if (err.request) {
//           dispatch(alertMessage("Error, Please contact Admin", "FAILURE"));
//         } else {
//           dispatch(alertMessage("Error Connecting to the internet", "FAILURE"));
//         }
//         dispatch(toggleIsLoading());
//       });
//   };
// };

export const fetchProverbspreview = (role, ethnics, dashboard) => {
  return async (dispatch) => {
    await dispatch(toggleIsLoading());
    var url = formatProcedureUrlByAuth(role, ethnics);
    var url = `${formatProcedureUrlByAuth(role, ethnics)}&size=500`;
    console.log(url);
    // var payload = {
    //   page: 1,
    //   size: 10,
    //   ethnic_in: ethnics,
    //   status_in: "AWAITING,ACCEPTED,REJECTED,PUBLISHED,UNPUBLISHED",
    // };
    FetchProverbsView(url)
      .then(async (result) => {
        if (result.status === 200) {
          console.log("getting preview", result.data);
          const data = result.data;
          data["batchurl"] = url;
          dispatch({
            // type: actionTypes.SAVE_PROVERBS_VIEW,
            type: actionTypes.SAVE_PROVERBS,
            payload: data,
          });
          // if (dashboard) dispatch(fetchDashboardProverbs(result.data.content));
        } else if (result.status === 401) {
          dispatch(logout("Unauthorized Access"));
        } else {
          dispatch(alertMessage("COULD NOT FETCH DATA", "ERROR"));
        }
        dispatch(toggleIsLoading());
        return;
      })
      .catch((err) => {
        if (err.response) {
          if (err.response.status == 401) {
            dispatch(alertMessage("Token Expired, Not Authorized", "FAILURE"));
            dispatch(logout());
          } else if (err.response.status == 400) {
            dispatch(alertMessage("Bad Request", "FAILURE"));
          }
        } else if (err.request) {
          dispatch(alertMessage("Error, Please contact Admin", "FAILURE"));
        } else {
          dispatch(alertMessage("Error Connecting to the internet", "FAILURE"));
        }
        dispatch(toggleIsLoading());
      });
  };
};

export const fetchProverbStatus = (payload) => {
  return async (dispatch) => {
    await dispatch(toggleIsLoading());
    // var url = formatProcedureUrlByAuth(role, ethnics, status);
    // console.log(url);
    // var payload = {
    //   page: 1,
    //   size: 100,
    //   ethnic_in: ethnics,
    //   status_in: status,
    // };
    FetchProverbs(payload)
      .then((result) => {
        if (result.status === 200) {
          console.log(result);
          // result.data["batchurl"] = url;
          // dispatch(saveProverbs(result.data));
          // dispatch(toggleIsLoading());
        } else if (result.status === 401) {
          dispatch(logout("Unauthorized Access"));
          dispatch(toggleIsLoading());
        } else {
          dispatch(alertMessage("COULD NOT FETCH DATA", "ERROR"));
          dispatch(toggleIsLoading());
        }
      })
      .catch((err) => {
        if (err && err.response?.status == "401") {
          dispatch(alertMessage("Token Expired, Not Authorized", "FAILURE"));
          dispatch(logout());
        }
        if (err && err.response.status == "400") {
          dispatch(alertMessage("Bad Request", "FAILURE"));
        }
        dispatch(toggleIsLoading());
      });
  };
};

export const fetchSelectProverbs = (slug) => {
  return async (dispatch) => {
    await dispatch({
      type: actionTypes.CLEAR_SELECTED,
    });
    await dispatch(toggleIsLoading());
    FetchSelectedProverbs(slug)
      .then(async (result) => {
        // console.log(result);
        if (result.status === 200) {
          dispatch(saveSelectedProverbs(result.data));
          dispatch(toggleIsLoading());
        } else if (result.status === 401) {
          dispatch(logout("Unauthorized Access"));
          dispatch(toggleIsLoading());
        } else {
          dispatch(alertMessage("COULD NOT FETCH DATA", "ERROR"));
          dispatch(toggleIsLoading());
        }
      })
      .catch((err) => {
        if (err && err.response.status == "401") {
          dispatch(alertMessage("Token Expired, Not Authorized", "FAILURE"));
          dispatch(logout());
        }
        if (err && err.response.status == "400") {
          dispatch(alertMessage("Bad Request", "FAILURE"));
        }
        dispatch(toggleIsLoading());
      });
  };
};

export const fetchBatchProverbs = (url, batchurl) => {
  console.log(url);
  return async (dispatch) => {
    await dispatch(toggleIsLoading());
    FetchBatchProverbs(url)
      .then(async (result) => {
        if (result.status === 200) {
          console.log(result);
          result.data["batchurl"] = batchurl;
          dispatch(saveProverbs(result.data));
          dispatch(toggleIsLoading());
        } else if (result.status === 401) {
          dispatch(logout("Unauthorized Access"));
          dispatch(toggleIsLoading());
        } else {
          dispatch(alertMessage("COULD NOT FETCH DATA", "ERROR"));
          dispatch(toggleIsLoading());
        }
      })
      .catch((err) => {
        if (err && err?.response?.status == "401") {
          dispatch(alertMessage("Token Expired, Not Authorized", "FAILURE"));
          dispatch(logout());
        }
        if (err && err?.response?.status == "400") {
          dispatch(alertMessage("Bad Request", "FAILURE"));
        }
        dispatch(toggleIsLoading());
      });
  };
};

export const updateProverbCategory = (payload, id) => {
  return async (dispatch) => {
    await dispatch(toggleIsLoading());
    UpdateProverbCategory(payload, id)
      .then(async (result) => {
        if (result.status === 200) {
          const { data } = result;
          console.log(result);
          dispatch(updateCategory(data));
          dispatch(
            alertMessage("Proverb Category Successfully Added", "SUCCESS")
          );
          setTimeout(() => {
            dispatch(clearProverbMsg());
          }, 3000);
        } else if (result.status === 401) {
          dispatch(logout("Unauthorized Access"));
        } else {
          setTimeout(() => {
            dispatch(clearProverbMsg());
          }, 2000);
          dispatch(alertMessage("ERROR UPDATING PROVERB CATEGORIES", "ERROR"));
        }
        await dispatch(toggleIsLoading());
      })
      .catch((err) => {
        if (err && err.response.status == "401") {
          dispatch(alertMessage("Token Expired, Not Authorized", "FAILURE"));
          dispatch(logout());
        }
        if (err && err.response.status == "400") {
          dispatch(alertMessage("Bad Request", "FAILURE"));
        }
        dispatch(toggleIsLoading());
      });
  };
};

export const addProverbInterpretation = (payload) => {
  return async (dispatch) => {
    await dispatch(toggleIsLoading());
    try {
      const result = await AddProverbInterpretation(payload);

      if (result && result.status === 201) {
        const { data } = result;
        dispatch(addNewInterpretation(data));
        dispatch(alertMessage("Proverb's Interpretation Successfully Added", "SUCCESS"));
        setTimeout(() => {
          dispatch(clearProverbMsg());
        }, 3000);
      } else if (result && result.status === 401) {
        dispatch(logout("Unauthorized Access"));
        dispatch(toggleIsLoading());
      } else {
        setTimeout(() => {
          dispatch(clearProverbMsg());
        }, 2000);
        dispatch(alertMessage("ERROR ADDING PROVERB INTERPRETATION", "ERROR"));
      }
    } catch (err) {
      console.log("Interpretation", err);

      if (err && err.response && err.response.status === 401) {
        dispatch(alertMessage("Token Expired, Not Authorized", "FAILURE"));
        dispatch(logout());
      }
      if (err && err.response && err.response.status === 400) {
        dispatch(alertMessage("Bad Request", "FAILURE"));
      }
      dispatch(toggleIsLoading());
    }
  };
};


export const addProverbAudioRecord = (payload, id) => {
  return async (dispatch) => {
    try {
      dispatch(toggleIsLoading(true)); // Start loading
      const result = await AddAudioRec(payload, id);

      if (result.status === 200) {
        const { data } = result;
        dispatch(addAudiRecording(data, id));
        dispatch(alertMessage("AUDIO SUCCESSFULLY ADDED", "SUCCESS"));
        setTimeout(() => {
          dispatch(clearProverbMsg());
        }, 3000);
      } else if (result.status === 401) {
        dispatch(logout("Unauthorized Access"));
      } else {
        setTimeout(() => {
          dispatch(clearProverbMsg());
        }, 2000);
        dispatch(alertMessage("ERROR ADDING PROVERB AUDIO", "ERROR"));
      }
    } catch (err) {
      if (err && err.response && err.response.status === 401) {
        dispatch(alertMessage("Token Expired, Not Authorized", "FAILURE"));
        dispatch(logout());
      }
      if (err && err.response && err.response.status === 400) {
        dispatch(alertMessage("Bad Request", "FAILURE"));
      }
    } finally {
      dispatch(toggleIsLoading(false)); // Stop loading, whether successful or not
    }
  };
};

// export const DownloadProverbAudioRecord = (id) => {
//     return async (dispatch, getState) => {
//         try {
//             await dispatch(toggleIsLoading());
//             const result = await DownloadAudio(id);
//             if (result && result.status === 200) {

//                 dispatch(downloadAudiRecording(id));

//                 dispatch(
//                     alertMessage(
//                         "Audio Successfully Downloaded",
//                         'SUCCESS'
//                     )
//                 );
//                 setTimeout(() => {
//                     dispatch(clearProverbMsg());
//                 }, 3000);
//             } else if (result && result.status === 401) {
//                 dispatch(logout('Unauthorized Access'));
//             } else {
//                 setTimeout(() => {
//                     dispatch(clearProverbMsg());
//                 }, 2000);
//                 dispatch(
//                     alertMessage('ERROR CANNOT DOWNLOAD AUDIO', 'ERROR')
//                 );
//             }
//         } catch (error) {
//             // Handle errors if needed
//             console.error("Error:", error);
//             dispatch(
//                 alertMessage('An unexpected error occurred', 'ERROR')
//             );
//         } finally {
//             dispatch(toggleIsLoading());
//         }
//     };
// };

export const DeleteProverbAudioRecord = (id) => {
  return async (dispatch) => {
    await dispatch(toggleIsLoading());
    DeleteAudio(id)
      .then(async (result) => {
        // console.log(result)
        if (result.status === 200) {
          // Handle successful deletion
          dispatch(deleteAudiRecording(id));
          dispatch(alertMessage("Audio Successfully DELETED", "SUCCESS"));

          setTimeout(() => {
            dispatch(clearProverbMsg());
          }, 3000);
        } else if (result.status === 401) {
          // Handle unauthorized access
          dispatch(logout("Unauthorized Access"));
          dispatch(toggleIsLoading());
        } else {
          // Handle other error cases
          setTimeout(() => {
            dispatch(clearProverbMsg());
          }, 2000);
          dispatch(alertMessage("ERROR DELETING PROVERB AUDIO", "ERROR"));
        }
      })
      .catch((err) => {
        if (err.response) {
          if (err.response.status == "401") {
            dispatch(alertMessage("Token Expired, Not Authorized", "FAILURE"));
            dispatch(logout());
          } else if (err.response.status == "400") {
            dispatch(alertMessage("Bad Request", "FAILURE"));
          }
        } else if (err.request) {
          dispatch(alertMessage("Error, Please contact Admin", "FAILURE"));
        } else {
          dispatch(alertMessage("Error Connecting to the internet", "FAILURE"));
        }
        dispatch(toggleIsLoading());
      });
  };
};

export const addProverbComment = (payload) => {
  return async (dispatch) => {
    await dispatch(toggleIsLoading());
    AddProverbReview(payload)
      .then(async (result) => {
        if (result.status === 201) {
          const { data } = result;
          // const payload = {
          //   id: data.id,
          //   comment: data.comment,
          //   date_created: data.date_created,
          //   date_modified: data.date_modified,
          // };
          // const proverbId = data.proverb;
          dispatch(addNewComment(data));
          dispatch(
            alertMessage("Proverb's Comment Successfully Added", "SUCCESS")
          );
          setTimeout(() => {
            dispatch(clearProverbMsg());
          }, 3000);
        } else if (result.status === 401) {
          dispatch(logout("Unauthorized Access"));
          dispatch(toggleIsLoading());
        } else {
          setTimeout(() => {
            dispatch(clearProverbMsg());
          }, 2000);
          dispatch(alertMessage("ERROR ADDING PROVERB COMMENT", "ERROR"));
        }
      })
      .catch((err) => {
        if (err && err.response.status == "401") {
          dispatch(alertMessage("Token Expired, Not Authorized", "FAILURE"));
          dispatch(logout());
        }
        if (err && err.response.status == "400") {
          dispatch(alertMessage("Bad Request", "FAILURE"));
        }
        dispatch(toggleIsLoading());
      });
  };
};

export const addProverb = (payload) => {
  // const router = useRouter();

  return async (dispatch) => {
    await dispatch(toggleIsLoading());
    AddProverb(payload)
      .then(async (result) => {
        if (result.status === 201) {
          const { data } = result;
          if (data.likelihood) {
            dispatch(saveLikelihoodProverbs(result.data.likelihood));
            // dispatch(alertMessage('Token Expired, Not Authorized', 'FAILURE'));
            dispatch(alertMessage("Proverb already exists", "ERROR"));
            // dispatch(toggleIsLoading());
          } else {
            // dispatch(addNewProverb(data));
            dispatch({
              type: actionTypes.CLEAR_PROVERBS,
            });
            // dispatch(alertMessage('Token Expired, Not Authorized', 'FAILURE'));
            dispatch(alertMessage("Proverb Successfully Added", "SUCCESS"));
            setTimeout(() => {
              dispatch(clearProverbMsg());
            }, 20000);
            // window.location.href = `${process.env.appBaseUrl}/proverbs/${data.slug}`;
            // window.location.href = `${process.env.appBaseUrl}/proverbs/details`;
            // await Router.push({pathname: '/proverbs/[slug].js', query: {slug: data.slug}})
            Router.push({
              pathname: "/proverbs/details",
              query: { q: data.id },
            });
            // dispatch(toggleIsLoading());
          }
        }
      })
      .catch((err) => {
        console.log(err);
        if (err.response) {
          if (err.response.status == "401") {
            dispatch(alertMessage("Token Expired, Not Authorized", "FAILURE"));
            dispatch(logout());
          } else if (err.response.status == "400") {
            dispatch(alertMessage("Bad Request", "FAILURE"));
          }
        } else if (err.request) {
          dispatch(alertMessage("Error, Please contact Admin", "FAILURE"));
        } else {
          dispatch(alertMessage("Error Connecting to the internet", "FAILURE"));
        }
        dispatch(toggleIsLoading());
      });
  };
};

export const fetchSystemProverbs = () => {
  return async (dispatch) => {
    FetchSystemProverbs()
      .then(async (result) => {
        if (result.status === 200) {
          const { data } = result;
          dispatch(addFetchedProverbs(data));
        } else if (result.status === 401) {
          dispatch(logout("Unauthorized Access"));
        } else {
          setTimeout(() => {
            dispatch(clearProverbMsg());
          }, 2000);
          dispatch(
            alertMessage("ERROR ADDING PROVERB INTERPRETATION", "ERROR")
          );
        }
      })
      .catch((err) => {
        if (err.response) {
          if (err.response.status == "401") {
            dispatch(alertMessage("Token Expired, Not Authorized", "FAILURE"));
            dispatch(logout());
          } else if (err.response.status == "400") {
            dispatch(alertMessage("Bad Request", "FAILURE"));
          }
        } else if (err.request) {
          dispatch(alertMessage("Error, Please contact Admin", "FAILURE"));
        } else {
          dispatch(alertMessage("Error Connecting to the internet", "FAILURE"));
        }
        dispatch(toggleIsLoading());
      });
  };
};

export const setAlert = (msg, type) => {
  return async (dispatch) => {
    dispatch(alertMessage(msg, type));
  };
};

export const addBatchProverbs = (payload) => {
  return async (dispatch) => {
    await dispatch(toggleIsLoading());
    AddBatchProverbs(payload)
      .then(async (result) => {
        if (result.status === 201) {
          dispatch(
            alertMessage("Batch Proverbs Successfully Processed", "SUCCESS")
          );
          setTimeout(() => {
            window.location.href = `${process.env.appBaseUrl}/proverbs/view-proverbs`;
            //window.location.href = 'http://localhost:3000/dashboard';
            dispatch(clearProverbMsg());
          }, 4000);
        } else if (result.status === 401) {
          dispatch(logout("Unauthorized Access"));
          dispatch(toggleIsLoading());
        } else {
          setTimeout(() => {
            dispatch(clearProverbMsg());
          }, 4000);
          dispatch(alertMessage("ERROR ADDING BATCH PROVERBS", "ERROR"));
        }
        dispatch(toggleIsLoading());
      })
      .catch((err) => {
        if (err.response.status == 500) {
          dispatch(
            alertMessage(
              "Error Processing the file uploaded. Kindly Ensure it follows the right format",
              "ERROR"
            )
          );
          setTimeout(() => {
            dispatch(clearProverbMsg());
          }, 4000);
          dispatch(toggleIsLoading());
        }
        if (err && err.response.status == "401") {
          dispatch(alertMessage("Token Expired, Not Authorized", "FAILURE"));
          dispatch(logout());
          dispatch(toggleIsLoading());
        }
        if (err && err.response.status == "400") {
          dispatch(alertMessage("Bad Request", "FAILURE"));
        }
        dispatch(toggleIsLoading());
      });
  };
};

export const addProverbTranslation = (payload) => {
  return async (dispatch) => {
    try {
      dispatch(toggleIsLoading());
      const result = await AddProverbTranslation(payload);

      if (result.status === 201) {
        const { data } = result;
        dispatch(addNewTransliteration(data));
        dispatch(alertMessage("Transliteration Successfully Added", "SUCCESS"));

        setTimeout(() => {
          dispatch(clearProverbMsg());
        }, 3000);
      } else if (result.status === 401) {
        dispatch(logout("Unauthorized Access"));
      } else {
        setTimeout(() => {
          dispatch(clearProverbMsg());
        }, 2000);
        dispatch(alertMessage("ERROR ADDING PROVERB INTERPRETATION", "ERROR"));
      }
    } catch (err) {
    
      if (err.response) {
        if (err.response.status == "401") {
          dispatch(alertMessage("Token Expired, Not Authorized", "FAILURE"));
          dispatch(logout());
        } else if (err.response.status == "400") {
          dispatch(alertMessage("Bad Request", "FAILURE"));
        }
      } else if (err.request) {
        dispatch(alertMessage("Error, Please contact Admin", "FAILURE"));
      } else {
        dispatch(alertMessage("Error Connecting to the internet", "FAILURE"));
      }
    } finally {
      dispatch(toggleIsLoading());
    }
  };
};


export const updateProverbTranslation = (payload, id) => {
  return async (dispatch) => {
    await dispatch(toggleIsLoading());
    UpdateProverbTranslation(payload, id)
      .then(async (result) => {
        if (result.status === 200) {
          const { data } = result;
          // const payload = {
          //   id: data.id,
          //   language: selectedLanguage,
          //   content: data.content,
          //   date_created: data.date_created,
          //   date_modified: data.date_modified,
          // };
          // const proverbId = data.proverb;
          dispatch(updateTransliteration(data));
          dispatch(
            alertMessage("Transliteration Successfully Updated", "SUCCESS")
          );

          setTimeout(() => {
            dispatch(clearProverbMsg());
          }, 3000);
        } else if (result.status === 401) {
          dispatch(logout("Unauthorized Access"));
          dispatch(toggleIsLoading());
        } else {
          setTimeout(() => {
            dispatch(clearProverbMsg());
          }, 2000);
          dispatch(
            alertMessage("ERROR Updating PROVERB TRANSLITERATION", "ERROR")
          );
        }
      })
      .catch((err) => {
        if (err.response) {
          if (err.response.status == "401") {
            dispatch(alertMessage("Token Expired, Not Authorized", "FAILURE"));
            dispatch(logout());
          } else if (err.response.status == "400") {
            dispatch(alertMessage("Bad Request", "FAILURE"));
          }
        } else if (err.request) {
          dispatch(alertMessage("Error, Please contact Admin", "FAILURE"));
        } else {
          dispatch(alertMessage("Error Connecting to the internet", "FAILURE"));
        }
        dispatch(toggleIsLoading());
      });
  };
};

export const updateProverbInterpretation = (payload, id) => {
  return async (dispatch) => {
    await dispatch(toggleIsLoading());
    UpdateProverbInterpretation(payload, id)
      .then(async (result) => {
        if (result.status === 200) {
          const { data } = result;
          dispatch(updateInterpretation(data));
          dispatch(
            alertMessage("Interpretation Successfully Updated", "SUCCESS")
          );

          setTimeout(() => {
            dispatch(clearProverbMsg());
          }, 3000);
        } else if (result.status === 401) {
          dispatch(logout("Unauthorized Access"));
          dispatch(toggleIsLoading());
        } else {
          setTimeout(() => {
            dispatch(clearProverbMsg());
          }, 2000);
          dispatch(
            alertMessage("ERROR Updating PROVERB TRANSLITERATION", "ERROR")
          );
        }
      })
      .catch((err) => {
        if (err.response) {
          if (err.response.status == "401") {
            dispatch(alertMessage("Token Expired, Not Authorized", "FAILURE"));
            dispatch(logout());
          } else if (err.response.status == "400") {
            dispatch(alertMessage("Bad Request", "FAILURE"));
          }
        } else if (err.request) {
          dispatch(alertMessage("Error, Please contact Admin", "FAILURE"));
        } else {
          dispatch(alertMessage("Error Connecting to the internet", "FAILURE"));
        }
        dispatch(toggleIsLoading());
      });
  };
};

export const updateProverbComment = (payload, id) => {
  return async (dispatch) => {
    await dispatch(toggleIsLoading());
    UpdateProverbReview(payload, id)
      .then(async (result) => {
        if (result.status === 200) {
          const { data } = result;
          console.log(data);
          dispatch(updateComment(data));
          dispatch(
            alertMessage("Interpretation Successfully Updated", "SUCCESS")
          );

          setTimeout(() => {
            dispatch(clearProverbMsg());
          }, 3000);
        } else if (result.status === 401) {
          dispatch(logout("Unauthorized Access"));
          dispatch(toggleIsLoading());
        } else {
          setTimeout(() => {
            dispatch(clearProverbMsg());
          }, 2000);
          dispatch(
            alertMessage("ERROR Updating PROVERB TRANSLITERATION", "ERROR")
          );
        }
      })
      .catch((err) => {
        if (err.response) {
          if (err.response.status == "401") {
            dispatch(alertMessage("Token Expired, Not Authorized", "FAILURE"));
            dispatch(logout());
          } else if (err.response.status == "400") {
            dispatch(alertMessage("Bad Request", "FAILURE"));
          }
        } else if (err.request) {
          dispatch(alertMessage("Error, Please contact Admin", "FAILURE"));
        } else {
          dispatch(alertMessage("Error Connecting to the internet", "FAILURE"));
        }
        dispatch(toggleIsLoading());
      });
  };
};

export const deleteProverbTranslation = (transliterationId) => {
  return async (dispatch) => {
    await dispatch(toggleIsLoading());
    DeleteProverbTranslation(transliterationId)
      .then(async (result) => {
        if (result.status === 204) {
          dispatch(deleteTransliteration(transliterationId));
          dispatch(
            alertMessage("Transliteration Successfully DELETED", "SUCCESS")
          );

          setTimeout(() => {
            dispatch(clearProverbMsg());
          }, 3000);
        } else if (result.status === 401) {
          dispatch(logout("Unauthorized Access"));
          dispatch(toggleIsLoading());
        } else {
          setTimeout(() => {
            dispatch(clearProverbMsg());
          }, 2000);
          dispatch(
            alertMessage("ERROR DELETING PROVERB TRANSLITERATION", "ERROR")
          );
        }
      })
      .catch((err) => {
        if (err.response) {
          if (err.response.status == "401") {
            dispatch(alertMessage("Token Expired, Not Authorized", "FAILURE"));
            dispatch(logout());
          } else if (err.response.status == "400") {
            dispatch(alertMessage("Bad Request", "FAILURE"));
          }
        } else if (err.request) {
          dispatch(alertMessage("Error, Please contact Admin", "FAILURE"));
        } else {
          dispatch(alertMessage("Error Connecting to the internet", "FAILURE"));
        }
        dispatch(toggleIsLoading());
      });
  };
};

export const deleteProverbInterpretation = (interpretationId) => {
  return async (dispatch) => {
    await dispatch(toggleIsLoading());
    DeleteProverbInterpretation(interpretationId)
      .then(async (result) => {
        if (result.status === 204) {
          dispatch(deleteInterpretation(interpretationId));
          dispatch(
            alertMessage("Interpretation Successfully DELETED", "SUCCESS")
          );

          setTimeout(() => {
            dispatch(clearProverbMsg());
          }, 3000);
        } else if (result.status === 401) {
          dispatch(logout("Unauthorized Access"));
          dispatch(toggleIsLoading());
        } else {
          setTimeout(() => {
            dispatch(clearProverbMsg());
          }, 2000);
          dispatch(
            alertMessage("ERROR DELETING PROVERB Interpretation", "ERROR")
          );
        }
      })
      .catch((err) => {
        if (err.response) {
          if (err.response.status == "401") {
            dispatch(alertMessage("Token Expired, Not Authorized", "FAILURE"));
            dispatch(logout());
          } else if (err.response.status == "400") {
            dispatch(alertMessage("Bad Request", "FAILURE"));
          }
        } else if (err.request) {
          dispatch(alertMessage("Error, Please contact Admin", "FAILURE"));
        } else {
          dispatch(alertMessage("Error Connecting to the internet", "FAILURE"));
        }
        dispatch(toggleIsLoading());
      });
  };
};

export const deleteProverbComment = (commentId) => {
  return async (dispatch) => {
    await dispatch(toggleIsLoading());
    DeleteProverbReview(commentId)
      .then(async (result) => {
        if (result.status === 204) {
          dispatch(deleteComment(commentId));
          dispatch(alertMessage("Comment Successfully DELETED", "SUCCESS"));

          setTimeout(() => {
            dispatch(clearProverbMsg());
          }, 3000);
        } else if (result.status === 401) {
          dispatch(logout("Unauthorized Access"));
          dispatch(toggleIsLoading());
        } else {
          setTimeout(() => {
            dispatch(clearProverbMsg());
          }, 2000);
          dispatch(alertMessage("ERROR DELETING PROVERB Comment", "ERROR"));
        }
      })
      .catch((err) => {
        if (err.response) {
          if (err.response.status == "401") {
            dispatch(alertMessage("Token Expired, Not Authorized", "FAILURE"));
            dispatch(logout());
          } else if (err.response.status == "400") {
            dispatch(alertMessage("Bad Request", "FAILURE"));
          }
        } else if (err.request) {
          dispatch(alertMessage("Error, Please contact Admin", "FAILURE"));
        } else {
          dispatch(alertMessage("Error Connecting to the internet", "FAILURE"));
        }
        dispatch(toggleIsLoading());
      });
  };
};

// Desc: Delete Proverb Content
// Method: DELETE
export const deleteProverb = (id, slug) => {
  return async (dispatch) => {
    DeleteProverb(id)
      .then(async (result) => {
        await dispatch({
          type: actionTypes.DELETE_PROVERB,
          payload: id,
        });
        dispatch(alertMessage("Proverb Deleted Successfully", "SUCCESS"));
        setTimeout(() => {
          dispatch(clearProverbMsg());
        }, 3000);
        window.location.href = `${process.env.appBaseUrl}/proverbs/view-proverbs`;
      })
      .catch((err) => {
        if (err.response) {
          if (err.response.status == "401") {
            dispatch(alertMessage("Token Expired, Not Authorized", "FAILURE"));
            dispatch(logout());
          } else if (err.response.status == "400") {
            dispatch(alertMessage("Bad Request", "FAILURE"));
          }
        } else if (err.request) {
          dispatch(alertMessage("Error, Please contact Admin", "FAILURE"));
        } else {
          dispatch(alertMessage("Error Connecting to the internet", "FAILURE"));
        }
        dispatch(toggleIsLoading());
      });
  };
};

// export const addProverbTranslation = (payload) => {
//   return async (dispatch) => {
//     await dispatch(toggleIsLoading());
//     AddProverbTranslation(payload)
//       .then(async (result) => {
//         if (result.status === 201) {
//           const { data } = result;
//           // dispatch(addNewProverb(data))
//           console.log(data);
//           dispatch(alertMessage('Translation Successfully Added', 'SUCCESS'));

//           setTimeout(() => {
//             dispatch(clearProverbMsg());
//           }, 3000);
//         } else if (result.status === 401) {
//           dispatch(logout('Unauthorized Access'));
//           dispatch(toggleIsLoading());
//         } else {
//           setTimeout(() => {
//             dispatch(clearProverbMsg());
//           }, 2000);
//           dispatch(alertMessage('ERROR ADDING PROVERB', 'ERROR'));
//         }
//       })
//       .catch((err) => {
//         dispatch(toggleIsLoading());
//       });
//   };
// };

export const clearLikelihood = () => {
  return async (dispatch) => {
    await dispatch(clearAllLikelihood());
  };
};

export const updateCategory = (payload, id) => {
  return {
    type: actionTypes.UPDATE_PROVERB_CATEGORY,
    payload: payload,
  };
};

export const addNewInterpretation = (payload, id) => {
  return {
    type: actionTypes.ADD_NEW_PROVERB_INTERPRETATION,
    payload: payload,
  };
};

export const addAudiRecording = (newAudioFile, id) => {
  return {
    type: actionTypes.ADD_PROVERBS_AUDIO,
    payload: {
      id: id,
      payload: newAudioFile,
    },
  };
};

// export const downloadAudiRecording = (id) => {
//     return {
//         type: actionTypes.DOWNLOAD_PROVERBS_AUDIO,
//         // payload: payload,
//         id: id,
//     };
// };

export const deleteAudiRecording = (payload, id) => {
  return {
    type: actionTypes.DELETE_AUDIO,
    payload: payload,
  };
};

export const addNewComment = (payload) => {
  return {
    type: actionTypes.ADD_NEW_PROVERB_COMMENT,
    payload: payload,
  };
};

export const updateTransliteration = (payload) => {
  return {
    type: actionTypes.UPDATE_PROVERB_TRANSLITERATION,
    payload: payload,
  };
};

export const updateInterpretation = (payload, id) => {
  return {
    type: actionTypes.UPDATE_PROVERB_INTERPRETATION,
    payload: payload,
  };
};

export const updateComment = (payload) => {
  return {
    type: actionTypes.UPDATE_PROVERB_COMMENT,
    payload: payload,
  };
};

export const deleteTransliteration = (transliterationId) => {
  return {
    type: actionTypes.DELETE_PROVERB_TRANSLITERATION,
    payload: {
      transliterationId,
    },
  };
};

export const deleteInterpretation = (interpretationId) => {
  return {
    type: actionTypes.DELETE_PROVERB_INTERPRETATION,
    payload: {
      interpretationId,
    },
  };
};

export const deleteComment = (commentId) => {
  return {
    type: actionTypes.DELETE_PROVERB_COMMENT,
    payload: commentId,
  };
};

export const addNewTransliteration = (payload) => {
  return {
    type: actionTypes.ADD_NEW_PROVERB_TRANSLITERATION,
    payload: payload,
  };
};

export const clearProverbMsg = () => {
  return {
    type: actionTypes.CLEAR_PROVERB_MSG,
  };
};

export const saveProverbs = (payload) => {
  return {
    type: actionTypes.SAVE_PROVERBS,
    payload: payload,
  };
};

export const saveDashboardProverbs = (payload) => {
  return {
    type: actionTypes.FETCH_DASHBOARD_PROVERBS,
    payload: payload,
  };
};

export const saveLikelihoodProverbs = (payload) => {
  return {
    type: actionTypes.SAVE_LIKELIHOOD_PROVERBS,
    payload: payload,
  };
};

export const clearAllLikelihood = () => {
  return {
    type: actionTypes.CLEAR_LIKELIHOOD_PROVERBS,
  };
};

export const saveSelectedProverbs = (payload) => {
  return {
    type: actionTypes.ACTIVE_PROVERBS,
    payload: payload,
  };
};

export const addFetchedProverbs = (payload) => {
  return {
    type: actionTypes.ADD_FETCHED_PROVERBS,
    payload: payload,
  };
};

export const updateProverbs = (payload) => {
  return {
    type: actionTypes.UPDATE_PROVERB,
    payload: payload,
  };
};

export const dashBoardAction = (payload) => {
  return {
    type: actionTypes.DASHBOARD_COUNT,
    payload: payload,
  };
};

export const updateProverb = (payload, id) => {
  return async (dispatch) => {
    UpdateProverb(payload, id)
      .then(async (result) => {
        dispatch(updateProverbs({ data: result.data }));
        dispatch(alertMessage("proverb Updated Successfully", "SUCCESS"));
        dispatch({
          type: actionTypes.CLEAR_PROVERBS,
        });
        // setTimeout(() => {
        //   window.location.href = `${process.env.appBaseUrl}/proverbs/details/?q=${result.data.slug}`;
        // }, 2000);
      })
      .catch((err) => {
        if (err.response) {
          if (err.response.status == "401") {
            dispatch(alertMessage("Token Expired, Not Authorized", "FAILURE"));
            dispatch(logout());
          } else if (err.response.status == "400") {
            dispatch(alertMessage("Bad Request", "FAILURE"));
          }
        } else if (err.request) {
          dispatch(alertMessage("Error, Please contact Admin", "FAILURE"));
        } else {
          dispatch(alertMessage("Error Connecting to the internet", "FAILURE"));
        }
        dispatch(toggleIsLoading());
      });
  };
};

// @Desc: Clear an alert message for an update
export const clearMsg = () => {
  return {
    type: actionTypes.CLEAR_MSG,
  };
};

export const addNewProverb = (proverb) => {
  return {
    type: actionTypes.ADD_NEW_PROVERB,
    payload: proverb,
  };
};

export const toggleIsLoading = () => {
  return {
    type: actionTypes.TOGGLE_ISLOADING,
  };
};
