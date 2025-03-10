import * as types from "../actions/actionTypes";

//helper function for deleting
const deleteFaq = (faqs = [], id) => {
  //confirm the faq is in the array of faqs
  const faQWithId = faqs.find((faq) => faq.id === id);

  //remove it if so
  if (faQWithId) {
    const faQsWithoutDeletedFaq = faqs.filter((faq) => faq.id !== id);
    return faQsWithoutDeletedFaq;
  }

  return faqs;
};

//helper function for ordering faq
const orderFaqs = (faqs = [], orderby) => {
  if (orderby === "created" || orderby === "modified") {
    const order = orderby === "created" ? "date_created" : "date_modified";
    return faqs.sort((a, b) => new Date(b[order]) - new Date(a[order]));
  } else if (orderby === "alphabet") {
    return faqs.sort((a, b) => b.question.localeCompare(a.question));
  } else if (orderby === "reset") {
    faqs.sort(
      (a, b) => new Date(a["date_created"]) - new Date(b["date_created"])
    );
    faqs.sort(
      (a, b) => new Date(a["date_modified"]) - new Date(b["date_modified"])
    );
    return faqs.sort((a, b) => a.question.localeCompare(b.question));
  }
  return faqs;
};

const initialState = {
  isLoading: false,
  faqs: [],
};

const faqReducer = (state = initialState, action) => {
  // console.log(action.type)
  switch (action.type) {
    case types.DELETE_FAQ:
      return { ...state, faqs: deleteFaq(state.faqs, action.payload) };
    case types.ORDER_FAQS:
      return { ...state, faqs: orderFaqs(state.faqs, action.payload) };
    case types.ADD_FETCHED_FAQS:
      //   console.log("hello", action.payload);
      return { ...state, faqs: action.payload.data };
    default:
      return state;
  }
};

export default faqReducer;
