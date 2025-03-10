import * as types from '../actions/actionTypes';





const initialState = {
  isLoading: false,
  subscribers: []
};

const changeActiveStatus =(userID,userdata)=>{
    const findUser = userdata.find(({id})=> id === userID)


    if(findUser){
         return userdata.map(user=>{
              if(user.id === findUser.id){
                return{
                  ...user,
                  active:!user.active
                }
              }else{
                return user
              }
         })
    }
}


const subscribersReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.FETCH_ACTIVE_SUBSCRIBERS:
        return {...state,subscribers: action.payload};
    case types.ADD_ACTIVE_SUBSCRIBERS_STATUS:
      
      return {...state,subscribers: changeActiveStatus(action.payload,state.subscribers)};
    default:
      return state;
  }
};

export default subscribersReducer;
