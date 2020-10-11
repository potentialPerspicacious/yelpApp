const initialState = {
    description: {}
};

export default function (state = initialState, action) {
    switch (action.type) {
        case 'CUSTOMER_SIGNUP':
            return {
                ...state,
                description: action.payload
            };
        case 'RESTAURANT_SIGNUP':
            return {
                ...state,
                description: action.payload
            };
        default:
            return state;
    }
};

