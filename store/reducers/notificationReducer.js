// reducer.js

const initialState = {
    notification: [],

};

const notificationReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'SEND_NOTIFICATION_REQUEST':
            return { ...state, notification: action.payload };
        default:
            return state;
    }
};

export default notificationReducer;
