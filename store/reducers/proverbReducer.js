import * as types from '../actions/actionTypes';

const initialState = {
  isLoading: false,
  links: null,
  count: null,
  dashboardCount: null,
  pageSize: null,
  result: null,
  batchurl: null,
  selectedProverb: null,
  proverbMsg: null,
  proverbs: null,
  likelihood: null,
  dashboardProverbs: null,
  view_data: null,
  searchResult: null
};

const proverbReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.TOGGLE_ISLOADING:
      return {
        ...state,
        isLoading: !state.isLoading,
      };

    case types.CLEAR_PROVERB_MSG:
      return {
        ...state,
        proverbMsg: null,
      };

    case types.CLEAR_LIKELIHOOD_PROVERBS:
      return {
        ...state,
        likelihood: null,
      };

    case types.CLEAR_PROVERBS:
      return {
        ...state,
        result: null,
      };

    case types.DASHBOARD_COUNT:
      return {
        ...state,
        dashboardCount: action.payload,
      };

    case types.SAVE_PROVERBS:
      const { first, last, page, totalElements, size, content, batchurl } = action.payload;
      return {
        ...state,
        links: {
          previous: first ? "" : `${process.env.baseUrl}${batchurl}&page=${page - 1}`,
          next: last ? "" : `${process.env.baseUrl}${batchurl}&page=${page + 1}`
        },
        count: totalElements,
        pageSize: size,
        first: first,
        last: last,
        page: page,
        result: content,
        batchurl: batchurl
      };

    case types.SEARCH_PROVERB:
      return {
        ...state,
        searchResult: action.payload
      };

    case types.SAVE_PROVERBS_VIEW:
      return {
        ...state,
        view_data: action.payload,
      };

    case types.SAVE_LIKELIHOOD_PROVERBS:
      return {
        ...state,
        likelihood: action.payload,
      };

    case types.FETCH_DASHBOARD_PROVERBS:
      return {
        ...state,
        dashboardProverbs: action.payload,
      };

    case types.ACTIVE_PROVERBS:
      return {
        ...state,
        selectedProverb: action.payload,
      };

    case types.CLEAR_SELECTED:
      return {
        ...state,
        selectedProverb: null,
      };

    case types.ADD_FETCHED_PROVERBS:
      return {
        ...state,
        proverbs: action.payload,
      };

    case types.ADD_NEW_PROVERB:
      const { payload } = action;
      const newProArray = state.result;
      if (newProArray != null) {
        newProArray.unshift(payload);
        return {
          ...state,
          result: newProArray,
        };
      }

    // case types.PROVERB_ALERT:
    //   return {
    //     ...state,
    //     proverbMsg: action.payload,
    //     isLoading: false,
    //   };

    // case types.UPDATE_PROVERB_CATEGORY:
    //   const index = state.result.findIndex(
    //     (proverb) => proverb.id === action.payload.proverbId
    //   );
    //   const newArray = [...state.result];
    //   newArray[index].categories = action.payload.categories;
    //   return {
    //     ...state,
    //     result: newArray,
    //   };

    case types.UPDATE_PROVERB_CATEGORY:
      return {
        ...state,
        selectedProverb: action.payload,
      };

    // case types.UPDATE_PROVERB_TRANSLITERATION:
    //   const updIndex = state.result.findIndex(
    //     (proverb) => proverb.id === action.payload.proverbId
    //   );
    //   const newUpdArray = [...state.result];
    //   newUpdArray[updIndex].transliteration = newUpdArray[
    //     updIndex
    //   ].transliteration.filter(
    //     (trans) => trans.id !== action.payload.transliteration.id
    //   );
    //   newUpdArray[updIndex].transliteration = [
    //     ...newUpdArray[updIndex].transliteration,
    //     action.payload.transliteration,
    //   ];
    //   return {
    //     ...state,
    //     result: newUpdArray,
    //   };

    case types.UPDATE_PROVERB_TRANSLITERATION:
      let proverbTransliterationCopy = state.selectedProverb.transliteration;
      let newIndex = proverbTransliterationCopy.findIndex((x) => x.id === action.payload.id);
      const clonedtransliteration = proverbTransliterationCopy.find((data) => data.id === action.payload.id);
      let newUpdate = { ...clonedtransliteration, ...action.payload }
      proverbTransliterationCopy[newIndex] = newUpdate;

      return {
        ...state,
        selectedProverb: { ...state.selectedProverb, transliteration: proverbTransliterationCopy },
      };


    case types.UPDATE_PROVERB_COMMENT:
      let proverbCommentCopy = state.selectedProverb.proverbReview;
      let newComIndex = proverbCommentCopy.findIndex((x) => x.id === action.payload.id);
      const clonedComment = proverbCommentCopy.find((data) => data.id === action.payload.id);
      let newComUpdate = { ...clonedComment, ...action.payload }
      proverbCommentCopy[newComIndex] = newComUpdate;

      return {
        ...state,
        selectedProverb: { ...state.selectedProverb, proverbReview: proverbCommentCopy },
      };

    // case types.UPDATE_PROVERB_INTERPRETATION:
    //   const updProvIndex = state.result.findIndex(
    //     (proverb) => proverb.id === action.payload.proverbId
    //   );
    //   const newUpdPrvArray = [...state.result];
    //   newUpdPrvArray[updProvIndex].interpretation = newUpdPrvArray[
    //     updProvIndex
    //   ].interpretation.filter(
    //     (interp) => interp.id !== action.payload.interpretation.id
    //   );
    //   newUpdPrvArray[updProvIndex].interpretation = [
    //     ...newUpdPrvArray[updProvIndex].interpretation,
    //     action.payload.interpretation,
    //   ];

    //   return {
    //     ...state,
    //     result: newUpdPrvArray,
    //   };

    case types.UPDATE_PROVERB_INTERPRETATION:
      let proverbInterpretationCopy = state.selectedProverb.interpretation;
      let newintIndex = proverbInterpretationCopy.findIndex((x) => x.id === action.payload.id);
      const cloneinterpretation = proverbInterpretationCopy.find((data) => data.id === action.payload.id);
      let newintUpdate = { ...cloneinterpretation, ...action.payload }
      proverbInterpretationCopy[newintIndex] = newintUpdate;

      return {
        ...state,
        selectedProverb: { ...state.selectedProverb, interpretation: proverbInterpretationCopy },
      };

    // case types.ADD_NEW_PROVERB_INTERPRETATION:
    //   const proverbIndex = state.result.findIndex(
    //     (proverb) => proverb.id === action.payload.proverbId
    //   );
    //   const newProverbArray = [...state.result];
    //   newProverbArray[proverbIndex].interpretation.push(
    //     action.payload.interpretation
    //   );
    //   console.log(newProverbArray);
    //   return {
    //     ...state,
    //     result: newProverbArray,
    //   };

    case types.ADD_NEW_PROVERB_COMMENT:
      state.selectedProverb.proverbReview.push(action.payload);
      return {
        ...state,
        selectedProverb: { ...state.selectedProverb },
      };

    case types.ADD_NEW_PROVERB_INTERPRETATION:
      state.selectedProverb.interpretation.push(action.payload);
      return {
        ...state,
        selectedProverb: { ...state.selectedProverb },
      };

    // case types.ADD_NEW_PROVERB_TRANSLITERATION:
    //   const proverbTransliterationIndex = state.result.findIndex(
    //     (proverb) => proverb.id === action.payload.proverbId
    //   );
    //   const newClonedArray = [...state.result];
    //   newClonedArray[proverbTransliterationIndex].transliteration.push(
    //     action.payload.transliteration
    //   );
    //   console.log(newClonedArray);
    //   return {
    //     ...state,
    //     result: newClonedArray,
    //   };

    case types.ADD_NEW_PROVERB_TRANSLITERATION:
      state.selectedProverb.transliteration.push(action.payload);
      return {
        ...state,
        selectedProverb: { ...state.selectedProverb },
      };



    // Handle adding a new audio file
    case types.ADD_PROVERBS_AUDIO:
      const { id, newAudioFile } = action.payload;
      // Check if the selected proverb's ID matches the one we want to update
      if (state.selectedProverb.id === id) {
        return {
          ...state,
          selectedProverb: {
            ...state.selectedProverb,
            recordedAudio: newAudioFile, 
          },
        };
      }

   








    // Handle deleting an audio file
    case types.DELETE_AUDIO:
      const selectedProverbCopy = { ...state.selectedProverb };
      const audioToDelete = action.payload;
      // Check if the audio filename matches the one to be deleted
      if (selectedProverbCopy.id === audioToDelete) {
        selectedProverbCopy.recordedAudio = ''; // Set to an empty string
      } else {
        selectedProverbCopy.recordedAudio = null; // Set to null if it doesn't match
      }

      return {
        ...state,
        selectedProverb: selectedProverbCopy,
      };








    // case types.DELETE_PROVERB_TRANSLITERATION:
    //   const prvIndex = state.result.findIndex(
    //     (proverb) => proverb.id === action.payload.proverbId
    //   );
    //   const prvArray = [...state.result];
    //   prvArray[prvIndex].transliteration = prvArray[
    //     prvIndex
    //   ].transliteration.filter(
    //     (trans) => trans.id !== action.payload.transliterationId
    //   );
    //   console.log(prvArray);
    //   return {
    //     ...state,
    //     result: prvArray,
    //   };

    case types.DELETE_PROVERB_TRANSLITERATION:
      let proverbTranCopy = [...state.selectedProverb.transliteration]
      const updatedTransliterationcopy = proverbTranCopy.filter(
        (x) => x.id !== action.payload.transliterationId
      )
      return {
        ...state,
        selectedProverb: { ...state.selectedProverb, transliteration: updatedTransliterationcopy },
      };


    // case types.DELETE_PROVERB_INTERPRETATION:
    //   const prvInterpretationIndex = state.result.findIndex(
    //     (proverb) => proverb.id === action.payload.proverbId
    //   );
    //   const prvInterpretationArray = [...state.result];
    //   prvInterpretationArray[
    //     prvInterpretationIndex
    //   ].interpretation = prvInterpretationArray[
    //     prvInterpretationIndex
    //   ].interpretation.filter(
    //     (trans) => trans.id !== action.payload.interpretationId
    //   );
    //   console.log(prvInterpretationArray);
    //   return {
    //     ...state,
    //     result: prvInterpretationArray,
    //   };

    case types.DELETE_PROVERB_INTERPRETATION:
      let proverbIntCopy = [...state.selectedProverb.interpretation]
      const updatedInterpretationcopy = proverbIntCopy.filter(
        (x) => x.id !== action.payload.interpretationId
      )
      return {
        ...state,
        selectedProverb: { ...state.selectedProverb, interpretation: updatedInterpretationcopy },
      };


    case types.DELETE_PROVERB_COMMENT:
      let proverbComCopy = [...state.selectedProverb.proverbReview]
      const updatedReviewcopy = proverbComCopy.filter(
        (x) => x.id !== action.payload
      )
      return {
        ...state,
        selectedProverb: { ...state.selectedProverb, proverbReview: updatedReviewcopy },
      };


    case types.UPDATE_PROVERB:
      const { data } = action.payload;
      return {
        ...state,
        selectedProverb: data
      };

    case types.DELETE_PROVERB:
      console.log(action.payload);
      console.log(state.result.filter((data) => data.id !== action.payload));
      return {
        ...state,
        result: state.result.filter((data) => data.id !== action.payload),
        loading: false,
      };

    case types.CLEAR_MSG:
      return {
        ...state,
        proverbMsg: null,
        isloading: false,
      };

    default:
      return state;
  }
};

export default proverbReducer;
